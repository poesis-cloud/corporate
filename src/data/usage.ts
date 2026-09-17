/**
 * usage.ts — the usage side of the model.
 *
 * Cases own their direct platform type, actors, addressed pains and realized
 * values. Platform support is projected inversely through those explicit links,
 * with missing constituent support retained in composite delivery status.
 *
 * This module is also the only place where platform references are proven to
 * resolve — see `validateUsage`, invoked on import.
 */
import { platformSolutions, affordances, affordanceStatus, capabilityStatus, commitmentStatus, solutionHref, typeIcons, type Affordance, type Capability, type DeliveryState, type Feature, type Product, type SemanticEdge, type Solution } from './poesis-platform.ts';
import { actorTypes } from './usage-actors.ts';
import { usagePains, type UsagePain } from './usage-pains.ts';
import { usageValues, valueAnchor, type Value } from './usage-values.ts';
import catalog from './catalog/poesis-usage.json' with { type: 'json' };

export { usageValues, valueAnchor, valueAliases, solutionValueAnchor } from './usage-values.ts';
export type { Value } from './usage-values.ts';

export interface UseCase {
  /** Stable public identity; also the `/usage/<slug>` route. */
  slug: string;
  name: string;
  goal: string;
  actorTypes: string[];
  addressedPains: string[];
  features?: string[];
  capabilities?: string[];
  affordances?: string[];
  values: string[];
}
export interface UsageGraph { actorTypes: typeof actorTypes; pains: UsagePain[]; useCases: UseCase[] }

export const useCases: UseCase[] = catalog.useCases;

export const poesisUsage: UsageGraph = { actorTypes, pains: usagePains, useCases };

export interface UsageFeature { slug: string; solution: Solution; product: Product; feature: Feature }
export interface UsageCapability { slug: string; solution: Solution; capability: Capability }
export interface UsageAffordance { slug: string; affordance: Affordance }

/** Every feature, flattened under its `<solution>/<product>/<feature>` identity. */
export const usageFeatures: UsageFeature[] = platformSolutions.flatMap((solution) => solution.products.flatMap((product) => product.features.map((feature) => ({ slug: `${solution.slug}/${product.slug}/${feature.slug}`, solution, product, feature }))));
/** Every capability, flattened under its `<solution>/<capability>` identity. */
export const usageCapabilities: UsageCapability[] = platformSolutions.flatMap((solution) => solution.capabilities.map((capability) => ({ slug: `${solution.slug}/${capability.slug}`, solution, capability })));
export const usageAffordances: UsageAffordance[] = affordances.map((affordance) => ({ slug: affordance.slug, affordance }));
const usageFeatureBySlug = new Map(usageFeatures.map((entry) => [entry.slug, entry]));
const usageCapabilityBySlug = new Map(usageCapabilities.map((entry) => [entry.slug, entry]));
const usageAffordanceBySlug = new Map(usageAffordances.map((entry) => [entry.slug, entry]));

function supportReferences(useCase: Pick<UseCase, 'features' | 'capabilities' | 'affordances'>): { kind: 'feature' | 'capability' | 'affordance' | undefined; refs: string[] } {
  const levels: Array<{ kind: 'feature' | 'capability' | 'affordance'; refs: string[] | undefined }> = [
    { kind: 'feature', refs: useCase.features },
    { kind: 'capability', refs: useCase.capabilities },
    { kind: 'affordance', refs: useCase.affordances },
  ];
  const active = levels.filter((level) => (level.refs ?? []).length);
  if (active.length === 0) return { kind: undefined, refs: [] };
  if (active.length > 1) throw new Error(`Mixed support levels on use case: ${(useCase as Pick<UseCase, 'slug'>).slug ?? '<unknown>'}`);
  return { kind: active[0].kind, refs: [...active[0].refs!] };
}

function useCaseBySlug(slug: string): UseCase | undefined {
  return useCases.find((useCase) => useCase.slug === slug);
}

export interface ValueSupport { type: 'feature' | 'capability' | 'affordance'; slug: string; name: string; href: string; state: DeliveryState }

export function featureHref(entry: UsageFeature): string { return `${solutionHref(entry.solution)}/products/${entry.product.slug}#${entry.feature.slug}`; }
export function capabilityHref(entry: UsageCapability): string { return `${solutionHref(entry.solution)}#${entry.capability.slug}`; }
export function affordanceHref(entry: UsageAffordance): string { return `/#affordance-${entry.affordance.slug}`; }

/** Use cases that explicitly realize this independent value. */
export function useCasesForValue(slug: string): UseCase[] {
  return useCases.filter((useCase) => useCase.values.includes(slug));
}

/** Platform items supporting any constituent case, deduplicated in type order. */
export function valueSupports(slug: string): ValueSupport[] {
  const supports: ValueSupport[] = [];
  const seen = new Set<string>();
  for (const useCase of useCasesForValue(slug)) {
    for (const entry of featuresForUseCase(useCase.slug)) {
      const key = `feature:${entry.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      supports.push({ type: 'feature', slug: entry.slug, name: entry.feature.name, href: featureHref(entry), state: entry.feature.delivery.state });
    }
    for (const entry of capabilitiesForUseCase(useCase.slug)) {
      const key = `capability:${entry.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      supports.push({ type: 'capability', slug: entry.slug, name: entry.capability.name, href: capabilityHref(entry), state: capabilityStatus(entry.solution, entry.capability) });
    }
    for (const entry of affordancesForUseCase(useCase.slug)) {
      const key = `affordance:${entry.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      supports.push({ type: 'affordance', slug: entry.slug, name: entry.affordance.name, href: affordanceHref(entry), state: affordanceStatus(entry.affordance) });
    }
  }
  return supports;
}
export function valueCoverage(slug: string) {
  return useCasesForValue(slug).map((useCase) => ({ useCase, state: useCaseStatus(useCase) }));
}
export function valueStatus(slug: string): DeliveryState | undefined {
  const states = valueCoverage(slug).map((entry) => entry.state);
  if (!states.some(Boolean)) return undefined;
  return commitmentStatus(states.map((state) => state ?? 'planned'));
}

function valueOwner(slug: string): string[] { return slug.replace(/^value:/, '').split('/'); }
/** Where this value is rendered: the platform page, a solution page or a product page. */
export function valueHref(value: Pick<Value, 'slug'>): string {
  const [owner, ...rest] = valueOwner(value.slug);
  if (!rest.length) return `/catalog/values#${valueAnchor(value)}`;
  if (owner === 'platform') return `/#${valueAnchor(value)}`;
  const base = solutionHref({ slug: owner });
  return rest.length === 2 ? `${base}/products/${rest[0]}#${valueAnchor(value)}` : `${base}#${valueAnchor(value)}`;
}

export const platformValues: Value[] = usageValues.filter((value) => value.slug.startsWith('value:platform/'));
export function solutionValues(solutionSlug: string): Value[] { return usageValues.filter((value) => { const parts = valueOwner(value.slug); return parts.length === 2 && parts[0] === solutionSlug; }); }
export function productValues(solutionSlug: string, productSlug: string): Value[] { return usageValues.filter((value) => { const parts = valueOwner(value.slug); return parts.length === 3 && parts[0] === solutionSlug && parts[1] === productSlug; }); }
export function valueBySlug(slug: string): Value | undefined { return usageValues.find((value) => value.slug === slug); }

export function featuresForUseCase(slug: string): UsageFeature[] {
  return (useCaseBySlug(slug)?.features ?? []).map((reference) => usageFeatureBySlug.get(reference)).filter(Boolean) as UsageFeature[];
}
export function capabilitiesForUseCase(slug: string): UsageCapability[] {
  return (useCaseBySlug(slug)?.capabilities ?? []).map((reference) => usageCapabilityBySlug.get(reference)).filter(Boolean) as UsageCapability[];
}
export function affordancesForUseCase(slug: string): UsageAffordance[] {
  return (useCaseBySlug(slug)?.affordances ?? []).map((reference) => usageAffordanceBySlug.get(reference)).filter(Boolean) as UsageAffordance[];
}
export type UsageItem = Feature | Capability | Affordance;
/** Direct inverse of the one platform level authored by each use case. */
export function useCasesForItem(item: UsageItem): UseCase[] {
  const feature = usageFeatures.find((entry) => entry.feature === item);
  if (feature) return useCases.filter((useCase) => (useCase.features ?? []).includes(feature.slug));
  const capability = usageCapabilities.find((entry) => entry.capability === item);
  if (capability) return useCases.filter((useCase) => (useCase.capabilities ?? []).includes(capability.slug));
  const affordance = usageAffordances.find((entry) => entry.affordance === item);
  if (affordance) return useCases.filter((useCase) => (useCase.affordances ?? []).includes(affordance.slug));
  throw new Error(`Unknown platform relationship source: ${item.slug}`);
}

/** Values explicitly composing this use case, independently of platform support. */
export function valuesForUseCase(slug: string): Value[] {
  const references = new Set(useCases.find((useCase) => useCase.slug === slug)?.values ?? []);
  return usageValues.filter((value) => references.has(value.slug));
}
/**
 * Explicit remediation only. Occurrence does not establish an addressing link.
 */
export function painsForUseCase(slug: string): UsagePain[] {
  const references = new Set(useCases.find((useCase) => useCase.slug === slug)?.addressedPains ?? []);
  return usagePains.filter((pain) => references.has(pain.slug));
}
export function useCaseStatus(useCase: Pick<UseCase, 'slug'>): DeliveryState | undefined {
  const resolved = useCaseBySlug(useCase.slug);
  if (!resolved) return undefined;
  const support = supportReferences(resolved);
  const states = support.kind === 'feature'
    ? support.refs.map((reference) => usageFeatureBySlug.get(reference)?.feature.delivery.state).filter(Boolean) as DeliveryState[]
    : support.kind === 'capability'
      ? support.refs.map((reference) => usageCapabilityBySlug.get(reference)).filter(Boolean).map((entry) => capabilityStatus(entry!.solution, entry!.capability))
      : support.kind === 'affordance'
        ? support.refs.map((reference) => usageAffordanceBySlug.get(reference)?.affordance).filter(Boolean).map((entry) => affordanceStatus(entry!))
        : [];
  return states.length ? commitmentStatus(states) : undefined;
}

export function useCasesForPain(painSlug: string): UseCase[] { return useCases.filter((useCase) => painsForUseCase(useCase.slug).some((pain) => pain.slug === painSlug)); }
export function useCasesForFeature(reference: string): UseCase[] {
  return usageFeatureBySlug.has(reference) ? useCases.filter((useCase) => (useCase.features ?? []).includes(reference)) : [];
}
export function useCasesForProduct(solutionSlug: string, productSlug: string): UseCase[] {
  const prefix = `${solutionSlug}/${productSlug}/`;
  return useCases.filter((useCase) => (useCase.features ?? []).some((reference) => reference.startsWith(prefix)));
}
export function useCasesForSolution(solutionSlug: string): UseCase[] {
  const featurePrefix = `${solutionSlug}/`;
  return useCases.filter((useCase) =>
    (useCase.features ?? []).some((reference) => reference.startsWith(featurePrefix))
    || (useCase.capabilities ?? []).some((reference) => reference.startsWith(featurePrefix))
    || (useCase.affordances ?? []).some((reference) => usageAffordanceBySlug.get(reference)?.affordance.relations.capabilities.some((capability) => capability.startsWith(featurePrefix))),
  );
}

/** Card icons for usage items, so a use case, pain or value is recognisable wherever it is shown. */
export const usageIcons = { useCase: 'target', pain: 'alert', value: typeIcons.value };

export interface RelationPreview { label: string; href: string; state?: DeliveryState }
/** `href` is the filtered catalog view; a group with no view of its own omits it. */
export interface RelationGroup { label: string; qualifier: string; href?: string; previews: RelationPreview[] }

export function painsForItem(item: UsageItem): UsagePain[] {
  const references = new Set(useCasesForItem(item).flatMap((useCase) => useCase.addressedPains));
  return usagePains.filter((pain) => references.has(pain.slug));
}
export function valuesForItem(item: UsageItem): Value[] {
  const references = new Set(useCasesForItem(item).flatMap((useCase) => useCase.values));
  return usageValues.filter((value) => references.has(value.slug));
}

/**
 * Item-to-value edges. They live here rather than in poesis-platform.ts because
 * their scope is the value body, and the platform module does not read values.
 */
export const valueEdges: SemanticEdge[] = usageValues.flatMap((value) => valueSupports(value.slug).map((support) => ({ id: `${support.type}:${support.slug}->${value.slug}`, source: `${support.type}:${support.slug}`, target: value.slug, kind: 'supports-benefit' as const, scope: value.body })));

/** How much of the platform is reachable from at least one use case. */
export function usageCoverage(): { features: number; capabilities: number; affordances: number } {
  return {
    features: usageFeatures.filter((entry) => useCasesForItem(entry.feature).length).length,
    capabilities: usageCapabilities.filter((entry) => useCasesForItem(entry.capability).length).length,
    affordances: usageAffordances.filter((entry) => useCasesForItem(entry.affordance).length).length,
  };
}

function unique(values: string[], label: string): void { if (new Set(values).size !== values.length) throw new Error(`Duplicate ${label}`); }

export function validateUsage(graph: UsageGraph = poesisUsage, values: Value[] = usageValues): void {
  unique(graph.useCases.map((useCase) => useCase.slug), 'use case');
  unique(graph.actorTypes.map((actor) => actor.slug), 'actor type');
  unique(graph.pains.map((pain) => pain.slug), 'pain');
  unique(values.map((value) => value.slug), 'value');

  const actorSlugs = new Set(graph.actorTypes.map((actor) => actor.slug));
  const painSlugs = new Set(graph.pains.map((pain) => pain.slug));
  const valueSlugs = new Set(values.map((value) => value.slug));

  for (const value of values) {
    if (!/^value:(?:[a-z0-9]+(?:-[a-z0-9]+)*|platform\/[a-z0-9-]+|[a-z0-9-]+(?:\/[a-z0-9-]+)?\/[0-9]{2})$/.test(value.slug) || value.slug.endsWith('/00')) throw new Error(`Invalid value identity: ${value.slug}`);
    if (!value.originalTitle.trim() || !value.title.trim() || !value.body.trim()) throw new Error(`Empty value claim: ${value.slug}`);
  }
  for (const useCase of graph.useCases) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(useCase.slug)) throw new Error(`Invalid use case slug: ${useCase.slug}`);
    if (!useCase.name.trim() || !useCase.goal.trim()) throw new Error(`Incomplete use case: ${useCase.slug}`);
    if (!useCase.actorTypes.length) throw new Error(`Unattributed use case: ${useCase.slug}`);
    const refs = [
      ['features', useCase.features],
      ['capabilities', useCase.capabilities],
      ['affordances', useCase.affordances],
    ] as const;
    const declared = refs.filter(([, references]) => references !== undefined);
    for (const [label, references] of declared) {
      if (!references?.length) throw new Error(`Empty ${label} support on ${useCase.slug}`);
      unique(references, `${label} support on ${useCase.slug}`);
      const known = label === 'features' ? usageFeatureBySlug : label === 'capabilities' ? usageCapabilityBySlug : usageAffordanceBySlug;
      for (const reference of references) if (!known.has(reference)) throw new Error(`Unknown ${label} support: ${reference}`);
    }
    if (declared.length > 1) throw new Error(`Mixed support levels on use case: ${useCase.slug}`);
    unique(useCase.actorTypes, `use case actor on ${useCase.slug}`);
    unique(useCase.addressedPains, `addressed pain on ${useCase.slug}`);
    unique(useCase.values, `realized value on ${useCase.slug}`);
    for (const reference of useCase.addressedPains) if (!painSlugs.has(reference)) throw new Error(`Unknown addressed pain: ${reference}`);
    for (const reference of useCase.values) if (!valueSlugs.has(reference)) throw new Error(`Unknown realized value: ${reference}`);
    for (const actor of useCase.actorTypes) if (!actorSlugs.has(actor)) throw new Error(`Unknown actor type: ${actor}`);
  }

  unique(valueEdges.map((edge) => edge.id), 'value edge');
}
validateUsage();

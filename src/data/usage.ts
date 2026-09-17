/**
 * usage.ts — the usage side of the model.
 *
 * Platform items reference only use cases. Cases address independent pains;
 * values compose cases. Support is projected through those explicit links,
 * with missing constituent support retained in composite delivery status.
 *
 * This module is also the only place where platform references are proven to
 * resolve — see `validateUsage`, invoked on import.
 */
import { platformSolutions, affordances, affordanceStatus, capabilityStatus, commitmentStatus, solutionHref, typeIcons, type Affordance, type Capability, type DeliveryState, type Feature, type Product, type SemanticEdge, type Solution, type UsageRefs } from './poesis-platform.ts';
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

export interface ValueSupport { type: 'feature' | 'capability' | 'affordance'; slug: string; name: string; href: string; state: DeliveryState }

export function featureHref(entry: UsageFeature): string { return `${solutionHref(entry.solution)}/products/${entry.product.slug}#${entry.feature.slug}`; }
export function capabilityHref(entry: UsageCapability): string { return `${solutionHref(entry.solution)}#${entry.capability.slug}`; }
export function affordanceHref(entry: UsageAffordance): string { return `/#affordance-${entry.affordance.slug}`; }

/** Platform items supporting any constituent case, deduplicated in type order. */
export function valueSupports(slug: string): ValueSupport[] {
  const references = valueBySlug(slug)?.useCases ?? [];
  return [
    ...usageFeatures.filter((entry) => entry.feature.useCases.some((reference) => references.includes(reference))).map((entry) => ({ type: 'feature' as const, slug: entry.slug, name: entry.feature.name, href: featureHref(entry), state: entry.feature.delivery.state })),
    ...usageCapabilities.filter((entry) => entry.capability.useCases.some((reference) => references.includes(reference))).map((entry) => ({ type: 'capability' as const, slug: entry.slug, name: entry.capability.name, href: capabilityHref(entry), state: capabilityStatus(entry.solution, entry.capability) })),
    ...usageAffordances.filter((entry) => entry.affordance.useCases.some((reference) => references.includes(reference))).map((entry) => ({ type: 'affordance' as const, slug: entry.slug, name: entry.affordance.name, href: affordanceHref(entry), state: affordanceStatus(entry.affordance) })),
  ];
}
export function valueCoverage(slug: string) {
  return (valueBySlug(slug)?.useCases ?? []).map((reference) => ({ useCase: useCases.find((item) => item.slug === reference)!, state: useCaseStatus({ slug: reference }) }));
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
  if (!rest.length) return `/values#${valueAnchor(value)}`;
  if (owner === 'platform') return `/#${valueAnchor(value)}`;
  const base = solutionHref({ slug: owner });
  return rest.length === 2 ? `${base}/products/${rest[0]}#${valueAnchor(value)}` : `${base}#${valueAnchor(value)}`;
}

export const platformValues: Value[] = usageValues.filter((value) => value.slug.startsWith('value:platform/'));
export function solutionValues(solutionSlug: string): Value[] { return usageValues.filter((value) => { const parts = valueOwner(value.slug); return parts.length === 2 && parts[0] === solutionSlug; }); }
export function productValues(solutionSlug: string, productSlug: string): Value[] { return usageValues.filter((value) => { const parts = valueOwner(value.slug); return parts.length === 3 && parts[0] === solutionSlug && parts[1] === productSlug; }); }
export function valueBySlug(slug: string): Value | undefined { return usageValues.find((value) => value.slug === slug); }

export function featuresForUseCase(slug: string): UsageFeature[] { return usageFeatures.filter((entry) => entry.feature.useCases.includes(slug)); }
export function capabilitiesForUseCase(slug: string): UsageCapability[] { return usageCapabilities.filter((entry) => entry.capability.useCases.includes(slug)); }
export function affordancesForUseCase(slug: string): UsageAffordance[] { return usageAffordances.filter((entry) => entry.affordance.useCases.includes(slug)); }
/** Values explicitly composing this use case, independently of platform support. */
export function valuesForUseCase(slug: string): Value[] {
  return usageValues.filter((value) => value.useCases.includes(slug));
}
/**
 * Explicit remediation only. Occurrence does not establish an addressing link.
 */
export function painsForUseCase(slug: string): UsagePain[] {
  const references = new Set(useCases.find((useCase) => useCase.slug === slug)?.addressedPains ?? []);
  return usagePains.filter((pain) => references.has(pain.slug));
}
export function useCaseStatus(useCase: Pick<UseCase, 'slug'>): DeliveryState | undefined {
  const features = featuresForUseCase(useCase.slug);
  const states = features.length ? features.map((entry) => entry.feature.delivery.state) : [
    ...capabilitiesForUseCase(useCase.slug).map((entry) => capabilityStatus(entry.solution, entry.capability)),
    ...affordancesForUseCase(useCase.slug).map((entry) => affordanceStatus(entry.affordance)),
  ];
  return states.length ? commitmentStatus(states) : undefined;
}

export function useCasesForPain(painSlug: string): UseCase[] { return useCases.filter((useCase) => painsForUseCase(useCase.slug).some((pain) => pain.slug === painSlug)); }
export function useCasesForFeature(reference: string): UseCase[] { const entry = usageFeatures.find((candidate) => candidate.slug === reference); return entry ? useCases.filter((useCase) => entry.feature.useCases.includes(useCase.slug)) : []; }
export function useCasesForProduct(solutionSlug: string, productSlug: string): UseCase[] {
  const references = new Set(usageFeatures.filter((entry) => entry.solution.slug === solutionSlug && entry.product.slug === productSlug).flatMap((entry) => entry.feature.useCases));
  return useCases.filter((useCase) => references.has(useCase.slug));
}
export function useCasesForSolution(solutionSlug: string): UseCase[] {
  const references = new Set([...usageFeatures.filter((entry) => entry.solution.slug === solutionSlug).flatMap((entry) => entry.feature.useCases), ...usageCapabilities.filter((entry) => entry.solution.slug === solutionSlug).flatMap((entry) => entry.capability.useCases)]);
  return useCases.filter((useCase) => references.has(useCase.slug));
}

/** Card icons for usage items, so a use case, pain or value is recognisable wherever it is shown. */
export const usageIcons = { useCase: 'target', pain: 'alert', value: typeIcons.value };

export interface RelationLink { label: string; href: string; state?: DeliveryState }
export interface RelationGroup { label: string; links: RelationLink[] }

/**
 * The usage relatives a platform item declares, in pain → use case → value order.
 * Empty groups are dropped, so a card never shows a relation it does not have.
 */
export function usageRelations(item: UsageRefs): RelationGroup[] {
  return [
    { label: 'Pain points', links: painsForItem(item).map((pain) => ({ label: pain.pain, href: `/pains#${pain.slug}` })) },
    { label: 'Use cases', links: useCases.filter((useCase) => item.useCases.includes(useCase.slug)).map((useCase) => ({ label: useCase.name, href: `/usage/${useCase.slug}`, state: useCaseStatus(useCase) })) },
    { label: 'Values', links: valuesForItem(item).map((value) => ({ label: value.title, href: valueHref(value), state: valueStatus(value.slug) })) },
  ].filter((group) => group.links.length);
}

export function painsForItem(item: UsageRefs): UsagePain[] {
  const references = new Set(item.useCases.flatMap((slug) => painsForUseCase(slug).map((pain) => pain.slug)));
  return usagePains.filter((pain) => references.has(pain.slug));
}
export function valuesForItem(item: UsageRefs): Value[] {
  return usageValues.filter((value) => value.useCases.some((slug) => item.useCases.includes(slug)));
}

/**
 * Item-to-value edges. They live here rather than in poesis-platform.ts because
 * their scope is the value body, and the platform module does not read values.
 */
export const valueEdges: SemanticEdge[] = usageValues.flatMap((value) => valueSupports(value.slug).map((support) => ({ id: `${support.type}:${support.slug}->${value.slug}`, source: `${support.type}:${support.slug}`, target: value.slug, kind: 'supports-benefit' as const, scope: value.body })));

/** How much of the platform is reachable from at least one use case. */
export function usageCoverage(): { features: number; capabilities: number; affordances: number } {
  return {
    features: usageFeatures.filter((entry) => entry.feature.useCases.length).length,
    capabilities: usageCapabilities.filter((entry) => entry.capability.useCases.length).length,
    affordances: usageAffordances.filter((entry) => entry.affordance.useCases.length).length,
  };
}

function unique(values: string[], label: string): void { if (new Set(values).size !== values.length) throw new Error(`Duplicate ${label}`); }

export function validateUsage(graph: UsageGraph = poesisUsage, values: Value[] = usageValues): void {
  unique(graph.useCases.map((useCase) => useCase.slug), 'use case');
  unique(graph.actorTypes.map((actor) => actor.slug), 'actor type');
  unique(graph.pains.map((pain) => pain.slug), 'pain');
  unique(values.map((value) => value.slug), 'value');

  const caseSlugs = new Set(graph.useCases.map((useCase) => useCase.slug));
  const actorSlugs = new Set(graph.actorTypes.map((actor) => actor.slug));
  const painSlugs = new Set(graph.pains.map((pain) => pain.slug));

  for (const useCase of graph.useCases) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(useCase.slug)) throw new Error(`Invalid use case slug: ${useCase.slug}`);
    if (!useCase.name.trim() || !useCase.goal.trim()) throw new Error(`Incomplete use case: ${useCase.slug}`);
    if (!useCase.actorTypes.length) throw new Error(`Unattributed use case: ${useCase.slug}`);
    unique(useCase.actorTypes, `use case actor on ${useCase.slug}`);
    unique(useCase.addressedPains, `addressed pain on ${useCase.slug}`);
    for (const reference of useCase.addressedPains) if (!painSlugs.has(reference)) throw new Error(`Unknown addressed pain: ${reference}`);
    for (const actor of useCase.actorTypes) if (!actorSlugs.has(actor)) throw new Error(`Unknown actor type: ${actor}`);
  }
  for (const pain of graph.pains) {
    if (!pain.actorTypes.length) throw new Error(`Unattributed pain: ${pain.slug}`);
    for (const actor of pain.actorTypes) if (!actorSlugs.has(actor)) throw new Error(`Unknown actor type: ${actor}`);
    for (const reference of pain.occursIn ?? []) if (!caseSlugs.has(reference)) throw new Error(`Unknown pain use case: ${reference}`);
  }
  for (const value of values) {
    if (!/^value:(?:[a-z0-9]+(?:-[a-z0-9]+)*|platform\/[a-z0-9-]+|[a-z0-9-]+(?:\/[a-z0-9-]+)?\/[0-9]{2})$/.test(value.slug) || value.slug.endsWith('/00')) throw new Error(`Invalid value identity: ${value.slug}`);
    if (!value.originalTitle.trim() || !value.title.trim() || !value.body.trim()) throw new Error(`Empty value claim: ${value.slug}`);
    if (!value.useCases.length) throw new Error(`Empty value composition: ${value.slug}`);
    unique(value.useCases, `constituent use case on ${value.slug}`);
    for (const reference of value.useCases) if (!caseSlugs.has(reference)) throw new Error(`Unknown constituent use case: ${reference}`);
  }

  const check = (label: string, item: UsageRefs) => {
    if ('values' in item || 'pains' in item) throw new Error(`Independent usage references on ${label}`);
    unique(item.useCases, `use case on ${label}`);
    for (const reference of item.useCases) if (!caseSlugs.has(reference)) throw new Error(`Unknown use case reference on ${label}: ${reference}`);
  };
  for (const entry of usageFeatures) check(`feature ${entry.slug}`, entry.feature);
  for (const entry of usageCapabilities) check(`capability ${entry.slug}`, entry.capability);
  for (const entry of usageAffordances) check(`affordance ${entry.slug}`, entry.affordance);

  unique(valueEdges.map((edge) => edge.id), 'value edge');
}
validateUsage();

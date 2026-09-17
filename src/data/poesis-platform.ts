export const CLAUSE_URL = 'https://docs.poesis.cloud/milestones/';
import catalog from './catalog/poesis-platform.json' with { type: 'json' };
export type DeliveryState = 'planned' | 'partial' | 'delivered';
export type Requirement = { ref: string } | { all: Requirement[] } | { any: Requirement[] };
export type RelationKind = 'contributes-to' | 'specifies' | 'informs' | 'consumes' | 'requires' | 'realizes' | 'supports-benefit';
export type ItemType = 'solution' | 'affordance' | 'capability' | 'product' | 'feature' | 'value';
export const typeIcons: Record<ItemType, string> = { solution: 'compass', affordance: 'grid', capability: 'spark', product: 'briefcase', feature: 'list', value: 'lightbulb' };
export const deliveryLabels: Record<DeliveryState, string> = { planned: 'Planned', partial: 'Partial', delivered: 'Implemented' };
export function commitmentStatus(states: DeliveryState[]): DeliveryState {
  if (!states.length || states.every((state) => state === 'planned')) return 'planned';
  return states.every((state) => state === 'delivered') ? 'delivered' : 'partial';
}
/** Only items with nothing implemented yet are de-emphasised; partial coverage is not. */
export function plannedClass(state: DeliveryState | undefined): string | undefined { return state === 'planned' ? 'is-planned' : undefined; }
export const relationQualifiers = {
  platformValueAffordances: () => 'Realized by affordances',
  affordanceCapabilities: (_count: number) => 'Contributing capabilities',
  solutionValueCapabilities: () => 'Realized by capabilities',
  capabilityAffordance: () => 'Contributes to platform affordance',
  capabilityFeatures: (_count: number) => 'Supporting product features',
  productFeatures: () => 'Product features',
  productValueFeatures: () => 'Realized by features',
};
export interface FeatureMilestone { version: string; label: string; shipped?: boolean; ga?: boolean }
export interface Delivery { state: DeliveryState; scope: string; kind: 'implementation' | 'specification' | 'content' | 'research' }
export interface Feature { slug: string; name: string; blurb: string; delivery: Delivery; milestone: FeatureMilestone }
export interface Capability { slug: string; name: string; blurb: string; delivery: Delivery; relations: { features: string[] }; optional: string[] }
export interface Affordance { slug: string; name: string; title: string; blurb: string; delivery: Delivery; relations: { capabilities: string[] } }
export interface Product {
  slug: string; name: string; excerpt: string; tagline: string; description: string; currentVersion: string;
  valuesHeadline: string; featuresHeadline: string; features: Feature[]; qualities: string[];
  docs?: { href: string; label: string }[]; repos?: { href: string; label: string }[];
}
export interface Solution {
  slug: string; name: string; fullName: string; excerpt: string; tags: string[];
  tagline: string; description: string; capabilities: Capability[]; products: Product[]; qualities: string[];
}

/** The canonical solution route. Solutions no longer store a href to drift from. */
export function solutionHref(solution: Pick<Solution, 'slug'>): string { return `/solutions/${solution.slug}`; }
export function milestoneStatus(product: Pick<Product, 'features'>, milestone: FeatureMilestone): DeliveryState {
  return commitmentStatus(product.features.filter((feature) => feature.milestone.version === milestone.version).map((feature) => feature.delivery.state));
}

function delivery(state: DeliveryState, scope: string, kind: Delivery['kind'] = 'implementation'): Delivery { return { state, scope, kind }; }
function feature(slug: string, name: string, blurb: string, state: DeliveryState, milestone: FeatureMilestone, kind: Delivery['kind'] = 'implementation'): Feature {
  return { slug, name, blurb, delivery: delivery(state, blurb, kind), milestone };
}
function capability(slug: string, name: string, blurb: string, state: DeliveryState, features: string[], kind: Delivery['kind'] = 'implementation', optional: string[] = []): Capability {
  return { slug, name, blurb, delivery: delivery(state, blurb, kind), relations: { features }, optional };
}
function affordance(slug: string, name: string, title: string, blurb: string, state: DeliveryState, scope: string, capabilities: string[]): Affordance {
  return { slug, name, title, blurb, delivery: delivery(state, scope), relations: { capabilities } };
}
function product(owner: string, slug: string, name: string, currentVersion: string, tagline: string, description: string, features: Feature[], repos: string[] = [], qualities: string[] = []): Product {
  const relatedDocs = slug === 'operator'
    ? [{ href: '/insights/agentic-ai-governance-that-executes/', label: 'Agentic AI governance that executes' }]
    : slug === 'agentic-harness'
      ? [{ href: '/insights/what-is-an-agentic-harness/', label: 'What is an agentic harness?' }]
      : [];
  return {
    slug, name, currentVersion, excerpt: tagline, tagline, description, features, qualities,
    valuesHeadline: 'Value delivered by the product', featuresHeadline: 'Implemented and planned features',
    docs: [{ href: `https://docs.poesis.cloud/${owner}/${slug === 'specifications' ? '' : `${slug}/`}`, label: `${slug === 'specifications' ? 'GSM' : name} documentation` }, ...relatedDocs],
    repos: repos.map((repo) => ({ href: `https://github.com/poesis-cloud/${repo}`, label: repo }))
  };
}
interface AuthoredFeature { slug: string; name: string; blurb: string; state: DeliveryState; kind: Delivery['kind']; milestone: FeatureMilestone }
interface AuthoredCapability { slug: string; name: string; blurb: string; state: DeliveryState; kind: Delivery['kind']; features: string[]; optional?: string[] }
interface AuthoredProduct { slug: string; name: string; currentVersion: string; tagline: string; description: string; repos?: string[]; qualities?: string[]; features: AuthoredFeature[] }
interface AuthoredSolution { slug: string; name: string; fullName: string; tags: string[]; excerpt: string; tagline: string; description: string; qualities?: string[]; capabilities: AuthoredCapability[]; products: AuthoredProduct[] }
interface AuthoredAffordance { slug: string; name: string; title: string; blurb: string; state: DeliveryState; scope: string; capabilities: string[] }
interface AuthoredPlatform {
  solutions: AuthoredSolution[]; affordances: AuthoredAffordance[]; platformQualities: string[];
  realizationRequirements: Record<string, DeliveryState | Requirement>; realizations: Realization[];
  capabilityRealizationContracts: Record<string, string>;
  affordanceRealizationContracts: Record<string, { scope: string; requires: Requirement }>;
}
/** Authored catalog data; derived fields are rebuilt by the constructors below. */
const authored = catalog as unknown as AuthoredPlatform;

export const platformSolutions: Solution[] = authored.solutions.map((entry) => ({
  slug: entry.slug, name: entry.name, fullName: entry.fullName, tags: entry.tags,
  excerpt: entry.excerpt, tagline: entry.tagline, description: entry.description, qualities: entry.qualities ?? [],
  capabilities: entry.capabilities.map((item) => capability(item.slug, item.name, item.blurb, item.state, item.features, item.kind, item.optional ?? [])),
  products: entry.products.map((item) => product(entry.slug, item.slug, item.name, item.currentVersion, item.tagline, item.description,
    item.features.map((candidate) => feature(candidate.slug, candidate.name, candidate.blurb, candidate.state, candidate.milestone, candidate.kind)), item.repos ?? [], item.qualities ?? [])),
}));
export const platformQualityRefs: string[] = authored.platformQualities;
export const affordances: Affordance[] = authored.affordances.map((item) => affordance(item.slug, item.name, item.title, item.blurb, item.state, item.scope, item.capabilities));
export const poesisPlatform = { affordances, solutions: platformSolutions };
export const solutionLinks = platformSolutions.map((solution) => ({ href: solutionHref(solution), label: solution.fullName }));
/** What the platform is, as a catalog item type. Poesis is its name, not its type. */
export const PLATFORM_TYPE_LABEL = 'Organization Intelligence Platform';
/** How a subject (`platform`, `<solution>`, `<solution>/<product>`) is named and reached. */
export function subjectLabel(subject: string): string | undefined {
  if (subject === 'platform') return PLATFORM_TYPE_LABEL;
  const [owner, ...rest] = subject.split('/');
  const solution = platformSolutions.find((candidate) => candidate.slug === owner);
  if (!solution || rest.length > 1) return undefined;
  if (!rest.length) return solution.name;
  const product = solution.products.find((candidate) => candidate.slug === rest[0]);
  return product ? `${solution.name} · ${product.name}` : undefined;
}
export function subjectHref(subject: string): string {
  if (subject === 'platform') return '/';
  const [owner, ...rest] = subject.split('/');
  return rest.length ? `/solutions/${owner}/products/${rest[0]}` : `/solutions/${owner}`;
}
export function capabilityRealizations(solution: Solution, capability: Capability): { product: Product; feature: Feature }[] {
  return capability.relations.features.map((reference) => { const [productSlug, featureSlug] = exactRef(reference, 2); const product = solution.products.find((candidate) => candidate.slug === productSlug); const feature = product?.features.find((candidate) => candidate.slug === featureSlug); if (!product || !feature) throw new Error(`Unknown feature: ${reference}`); return { product, feature }; });
}
export function capabilityAffordances(solution: Solution, capability: Capability): Affordance[] { return affordances.filter((affordance) => affordance.relations.capabilities.includes(`${solution.slug}/${capability.slug}`)); }
export function capabilityAffordance(solution: Solution, capability: Capability): Affordance { return capabilityAffordances(solution, capability)[0]; }
export function affordanceRealizations(affordance: Affordance): { solution: Solution; capability: Capability }[] {
  return affordance.relations.capabilities.map((reference) => { const [solutionSlug, slug] = exactRef(reference, 2); const solution = platformSolutions.find((candidate) => candidate.slug === solutionSlug); const capability = solution?.capabilities.find((candidate) => candidate.slug === slug); if (!solution || !capability) throw new Error(`Unknown capability: ${reference}`); return { solution, capability }; });
}
export function featureStatus(feature: Feature): { version: string; shipped: boolean; state: DeliveryState; label: string } { return { version: feature.milestone.version, shipped: feature.delivery.state === 'delivered', state: feature.delivery.state, label: deliveryLabels[feature.delivery.state] }; }
export function productStatus(product: Product): DeliveryState { const states = product.features.map((feature) => feature.delivery.state); return states.length && states.every((state) => state === 'delivered') ? 'delivered' : states.every((state) => state === 'planned') ? 'planned' : 'partial'; }
export function productShipped(product: Product): boolean { return productStatus(product) === 'delivered'; }
/** A capability is only as implemented as the features that prove it. */
export function capabilityStatus(solution: Solution, capability: Capability): DeliveryState {
  return commitmentStatus(capabilityRealizations(solution, capability).map((realization) => realization.feature.delivery.state));
}
/** An affordance is only as implemented as the capabilities contributing to it. */
export function affordanceStatus(affordance: Affordance): DeliveryState {
  return commitmentStatus(affordanceRealizations(affordance).map((realization) => capabilityStatus(realization.solution, realization.capability)));
}
/** A solution is only as implemented as the capabilities it commits to. */
export function solutionStatus(solution: Solution): DeliveryState {
  return commitmentStatus(solution.capabilities.map((capability) => capabilityStatus(solution, capability)));
}
export function capabilityShipped(solution: Solution, capability: Capability): boolean { return capabilityStatus(solution, capability) === 'delivered'; }
export function productTimeline(product: Product): FeatureMilestone[] {
  const versions = new Map<string, FeatureMilestone>(); for (const feature of product.features) versions.set(feature.milestone.version, feature.milestone);
  return [...versions.values()].sort((left, right) => { const parts = (version: string) => { const [core, pre] = version.split('-'); const result = core.split('.').map((part) => part === 'x' ? Infinity : Number(part)); while (result.length < 3) result.push(0); return [...result, pre ? 0 : 1]; }; const leftParts = parts(left.version); const rightParts = parts(right.version); for (let index = 0; index < leftParts.length; index++) if (leftParts[index] !== rightParts[index]) return leftParts[index] - rightParts[index]; return 0; });
}
export function evaluateRequirement(requirement: Requirement, states: Record<string, DeliveryState | Requirement>, visiting = new Set<string>()): DeliveryState {
  if (!requirement || typeof requirement !== 'object' || Array.isArray(requirement)) throw new Error('Invalid requirement');
  if (Object.keys(requirement).length !== 1) throw new Error('Ambiguous requirement');
  if (Object.hasOwn(requirement, 'ref') && 'ref' in requirement) { if (typeof requirement.ref !== 'string' || !requirement.ref.trim()) throw new Error('Invalid requirement reference'); if (visiting.has(requirement.ref)) throw new Error(`Cyclic requirement: ${requirement.ref}`); if (!Object.hasOwn(states, requirement.ref)) throw new Error(`Unknown requirement: ${requirement.ref}`); const state = states[requirement.ref]; if (typeof state === 'string') { if (!Object.hasOwn(deliveryLabels, state)) throw new Error('Invalid state'); return state; } return evaluateRequirement(state, states, new Set([...visiting, requirement.ref])); }
  const isAll = Object.hasOwn(requirement, 'all') && 'all' in requirement;
  const children = isAll ? requirement.all : Object.hasOwn(requirement, 'any') && 'any' in requirement ? requirement.any : []; if (!Array.isArray(children) || !children.length) throw new Error('Empty requirement bundle');
  const results = Array.from(children, (child, index) => { if (!Object.hasOwn(children, index)) throw new Error('Invalid requirement child'); return evaluateRequirement(child, states, visiting); });
  if (isAll) return results.every((state) => state === 'delivered') ? 'delivered' : results.every((state) => state === 'planned') ? 'planned' : 'partial';
  return results.includes('delivered') ? 'delivered' : results.includes('partial') ? 'partial' : 'planned';
}
export interface Realization { slug: string; scope: string; mode: 'local' | 'api' | 'hosted' | 'content'; requires: Requirement; optional: string[]; acceptance: DeliveryState }
const ref = (ref: string): Requirement => ({ ref });
export const realizationRequirements: Record<string, DeliveryState | Requirement> = authored.realizationRequirements;
export const realizations: Realization[] = authored.realizations;
export function realizationStatus(realization: Realization, states = realizationRequirements): DeliveryState { return evaluateRequirement({ all: [realization.requires, ref('$acceptance')] }, { ...states, $acceptance: realization.acceptance }); }
export const capabilityRealizationContracts: Record<string, string> = authored.capabilityRealizationContracts;
export const affordanceRealizationContracts: Record<string, { scope: string; requires: Requirement }> = authored.affordanceRealizationContracts;
export function operationalVerdictStatus(states = realizationRequirements, verdict = realizations[1]): DeliveryState {
  return evaluateRequirement({ all: [verdict.requires, ref('observations'), ref('$acceptance')] }, { ...states, $acceptance: verdict.acceptance });
}
export interface SemanticEdge { id: string; source: string; target: string; kind: RelationKind; scope: string }
export function capabilityRelationKind(solution: Solution, capability: Capability): RelationKind { if (solution.slug === 'gsm') return capability.delivery.kind === 'research' ? 'informs' : capability.delivery.kind === 'specification' ? 'specifies' : 'contributes-to'; return capability.slug === 'model-grounded-it-reasoning' ? 'consumes' : 'contributes-to'; }
/**
 * Structural edges only. Item-to-value `supports-benefit` edges need value bodies
 * for their scope, so they are assembled in usage.ts as `valueEdges`.
 */
export const semanticEdges: SemanticEdge[] = [
  ...['governance-fabric', 'norm-evaluation'].map((slug) => ({ id: `affordance:${slug}->requires:governed-context`, source: `affordance:${slug}`, target: 'affordance:governed-context', kind: 'requires' as const, scope: 'Authorized, pinned input context is required; definition acquisition may be direct or sourced.' })),
  ...affordances.flatMap((affordance) => affordanceRealizations(affordance).map(({ solution, capability }) => ({ id: `capability:${solution.slug}/${capability.slug}->affordance:${affordance.slug}`, source: `capability:${solution.slug}/${capability.slug}`, target: `affordance:${affordance.slug}`, kind: capabilityRelationKind(solution, capability), scope: capability.blurb }))),
  ...platformSolutions.flatMap((solution) => solution.capabilities.flatMap((capability) => capabilityRealizations(solution, capability).map(({ product, feature }) => ({ id: `feature:${solution.slug}/${product.slug}/${feature.slug}->capability:${solution.slug}/${capability.slug}`, source: `feature:${solution.slug}/${product.slug}/${feature.slug}`, target: `capability:${solution.slug}/${capability.slug}`, kind: (feature.delivery.kind === 'research' ? 'informs' : feature.delivery.kind === 'specification' ? 'specifies' : 'contributes-to') as RelationKind, scope: feature.blurb })))),
];
function exactRef(reference: string, count: number): string[] { const parts = reference.split('/'); if (parts.length !== count || parts.some((part) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(part))) throw new Error(`Invalid reference: ${reference}`); return parts; }
function unique(values: string[], label: string): void { if (new Set(values).size !== values.length) throw new Error(`Duplicate ${label}`); }
function validateDelivery(claim: Delivery): void {
  if (!claim || typeof claim !== 'object' || !['scope', 'state', 'kind'].every((key) => Object.hasOwn(claim, key)) || typeof claim.scope !== 'string' || !claim.scope.trim() || typeof claim.state !== 'string' || !Object.hasOwn(deliveryLabels, claim.state) || !['implementation', 'specification', 'content', 'research'].includes(claim.kind)) throw new Error('Invalid delivery claim');
}
function validateNoUsageRefs(item: object, label: string): void {
  for (const key of ['useCases', 'values', 'pains']) if (key in item) throw new Error(`Independent usage references on ${label}`);
}
export function validatePortfolio(solutions = platformSolutions, platformAffordances = affordances): void {
  const identities: string[] = [];
  const add = (prefix: string, slug: string) => { exactRef(slug, slug.split('/').length); identities.push(`${prefix}:${slug}`); };
  for (const solution of solutions) {
    add('solution', solution.slug);
    if (!solution.tags.length || solution.tags.some((tag) => !tag.trim())) throw new Error('Invalid solution tags');
    const featureRefs = new Set<string>();
    for (const product of solution.products) {
      add('product', `${solution.slug}/${product.slug}`);
      if (!/^\d+\.\d+(?:\.\d+)?(?:-[a-z0-9.]+)?$/.test(product.currentVersion)) throw new Error('Invalid current version');
      const versions = new Map<string, string>();
      for (const feature of product.features) {
        add('feature', `${solution.slug}/${product.slug}/${feature.slug}`); featureRefs.add(`${product.slug}/${feature.slug}`);
        validateDelivery(feature.delivery);
        validateNoUsageRefs(feature, `feature ${solution.slug}/${product.slug}/${feature.slug}`);
        if (!/^\d+\.(?:\d+|x)(?:\.\d+)?(?:-[a-z0-9.]+)?$/.test(feature.milestone.version) || !feature.milestone.label.trim()) throw new Error('Invalid milestone');
        if (!feature.blurb || feature.delivery.scope !== feature.blurb || !Object.hasOwn(deliveryLabels, feature.delivery.state)) throw new Error('Invalid feature claim');
        const encoded = JSON.stringify(feature.milestone); if (versions.has(feature.milestone.version) && versions.get(feature.milestone.version) !== encoded) throw new Error('Inconsistent milestone'); versions.set(feature.milestone.version, encoded);
      }
    }
    for (const capability of solution.capabilities) {
      validateDelivery(capability.delivery);
      validateNoUsageRefs(capability, `capability ${solution.slug}/${capability.slug}`);
      unique(capability.optional, 'optional feature');
      const contractId = capabilityRealizationContracts[`${solution.slug}/${capability.slug}`];
      if (contractId && capability.delivery.state === 'delivered' && realizationStatus(realizations.find((realization) => realization.slug === contractId)!) !== 'delivered') throw new Error('Unaccepted capability realization');
      add('capability', `${solution.slug}/${capability.slug}`); if (!capability.relations.features.length || !capability.delivery.scope) throw new Error('Unsupported capability'); unique(capability.relations.features, 'feature edge');
      for (const reference of capability.relations.features) { exactRef(reference, 2); if (!featureRefs.has(reference)) throw new Error(`Unknown capability feature: ${reference}`); }
      for (const reference of capability.optional) if (!capability.relations.features.includes(reference)) throw new Error('Unknown optional feature');
      const required = capability.relations.features.filter((reference) => !capability.optional.includes(reference)); if (!required.length) throw new Error('Empty capability requirement');
      if (capability.delivery.state === 'delivered') for (const reference of required) { const [productSlug, slug] = reference.split('/'); if (solution.products.find((product) => product.slug === productSlug)!.features.find((feature) => feature.slug === slug)!.delivery.state !== 'delivered') throw new Error('Contradictory delivered capability'); }
    }
    for (const reference of featureRefs) if (!solution.capabilities.some((capability) => capability.relations.features.includes(reference))) throw new Error(`Orphan feature: ${solution.slug}/${reference}`);
  }
  for (const affordance of platformAffordances) { validateDelivery(affordance.delivery); validateNoUsageRefs(affordance, `affordance ${affordance.slug}`); add('affordance', affordance.slug); if (!affordance.relations.capabilities.length) throw new Error('Unsupported affordance'); unique(affordance.relations.capabilities, 'capability edge'); for (const reference of affordance.relations.capabilities) { const [solutionSlug, slug] = exactRef(reference, 2); if (!solutions.find((solution) => solution.slug === solutionSlug)?.capabilities.some((capability) => capability.slug === slug)) throw new Error(`Unknown affordance capability: ${reference}`); } }
  const capabilityStates = Object.fromEntries(solutions.flatMap((solution) => solution.capabilities.map((capability) => [`${solution.slug}/${capability.slug}`, capability.delivery.state])));
  for (const affordance of platformAffordances) {
    if (affordance.delivery.state !== 'delivered') continue;
    const contract = Object.hasOwn(affordanceRealizationContracts, affordance.slug) ? affordanceRealizationContracts[affordance.slug] : undefined;
    const supportingStates = Object.fromEntries(affordance.relations.capabilities.map((reference) => [reference, capabilityStates[reference]]));
    if (!contract || evaluateRequirement(contract.requires, supportingStates) !== 'delivered') throw new Error('Unaccepted affordance realization');
  }
  unique(identities, 'identity');
}
validatePortfolio();
unique(semanticEdges.map((edge) => edge.id), 'semantic edge');
for (const realization of realizations) { realizationStatus(realization); for (const optional of realization.optional) if (!Object.hasOwn(realizationRequirements, optional)) throw new Error(`Unknown optional requirement: ${optional}`); }
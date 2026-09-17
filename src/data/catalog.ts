import { affordanceStatus, capabilityStatus, PLATFORM_TYPE_LABEL, platformQualityRefs, platformSolutions, productStatus, solutionHref, solutionStatus } from './poesis-platform.ts';
import { qualityCategories, qualitiesPublishedBy, qualityHref, qualitySubject, type Quality } from './qualities.ts';
import { affordanceHref, capabilityHref, featureHref, usageFeatures, usageCapabilities, usageAffordances, useCases, usageValues, poesisUsage, useCaseStatus, useCasesForItem, useCasesForPain, useCasesForValue, useCasesForProduct, useCasesForSolution, valueHref, valueStatus, type RelationGroup, type RelationPreview, type UseCase, type UsageItem } from './usage.ts';
import { homepagePainGroups } from './pains.ts';
import { catalogTypes, catalogHref, type CatalogType, type CatalogSnapshot, type CatalogSource } from './catalog-query.ts';

const platform = [
  ...usageFeatures.map((entry) => ({ source: `feature:${entry.slug}`, slug: entry.slug, name: entry.feature.name, type: 'features' as const, item: entry.feature })),
  ...usageCapabilities.map((entry) => ({ source: `capability:${entry.slug}`, slug: entry.slug, name: entry.capability.name, type: 'capabilities' as const, item: entry.capability })),
  ...usageAffordances.map((entry) => ({ source: `affordance:${entry.slug}`, slug: entry.slug, name: entry.affordance.name, type: 'affordances' as const, item: entry.affordance })),
];
/** Every product, flattened under its `<solution>/<product>` identity. */
const platformProducts = platformSolutions.flatMap((solution) => solution.products.map((product) => ({ slug: `${solution.slug}/${product.slug}`, solution, product })));
const catalogQualities = qualityCategories.flatMap((category) => qualitiesPublishedBy(category.slug));
const targets = (values: Partial<CatalogSource['targets']> = {}): CatalogSource['targets'] => Object.fromEntries(catalogTypes.map((type) => [type, [...(values[type] ?? [])]])) as CatalogSource['targets'];
const caseActors = (references: string[]) => [...new Set(useCases.filter((item) => references.includes(item.slug)).flatMap((item) => item.actorTypes))];
const casePains = (references: string[]) => [...new Set(useCases.filter((item) => references.includes(item.slug)).flatMap((item) => item.addressedPains))];
const caseValues = (references: string[]) => [...new Set(useCases.filter((item) => references.includes(item.slug)).flatMap((item) => item.values))];
const caseSlugs = (cases: UseCase[]) => cases.map((useCase) => useCase.slug);
const casesForActor = (slug: string) => useCases.filter((useCase) => useCase.actorTypes.includes(slug));

/** Platform items that explicitly name at least one of these use cases. */
function platformSupport(references: string[]): Pick<CatalogSource['targets'], 'features' | 'capabilities' | 'affordances'> {
  const serves = (item: UsageItem) => useCasesForItem(item).some((useCase) => references.includes(useCase.slug));
  return {
    features: usageFeatures.filter((entry) => serves(entry.feature)).map((entry) => entry.slug),
    capabilities: usageCapabilities.filter((entry) => serves(entry.capability)).map((entry) => entry.slug),
    affordances: usageAffordances.filter((entry) => serves(entry.affordance)).map((entry) => entry.slug),
  };
}

/** Usage records directly named by these use cases. */
function usageTargets(references: string[]): CatalogSource['targets'] {
  return targets({
    actors: caseActors(references),
    pains: casePains(references),
    usage: [...references],
    values: caseValues(references),
  });
}

export function buildCatalogSnapshot(): CatalogSnapshot {
  const snapshot: CatalogSnapshot = {
    actors: poesisUsage.actorTypes.map((actor) => actor.slug), pains: poesisUsage.pains.map((pain) => pain.slug), sources: Object.create(null),
    records: {
      actors: poesisUsage.actorTypes.map((actor) => { const references = caseSlugs(casesForActor(actor.slug)); return { slug: actor.slug, actors: [actor.slug], pains: casePains(references) }; }),
      usage: useCases.map((item) => ({ slug: item.slug, actors: item.actorTypes, pains: item.addressedPains })),
      pains: poesisUsage.pains.map((pain) => { const references = caseSlugs(useCasesForPain(pain.slug)); return { slug: pain.slug, actors: caseActors(references), pains: [pain.slug] }; }),
      values: usageValues.map((value) => { const references = caseSlugs(useCasesForValue(value.slug)); return { slug: value.slug, actors: caseActors(references), pains: casePains(references) }; }),
      solutions: platformSolutions.map((solution) => { const references = useCasesForSolution(solution.slug).map((useCase) => useCase.slug); return { slug: solution.slug, actors: caseActors(references), pains: casePains(references) }; }),
      products: platformProducts.map((entry) => { const references = useCasesForProduct(entry.solution.slug, entry.product.slug).map((useCase) => useCase.slug); return { slug: entry.slug, actors: caseActors(references), pains: casePains(references) }; }),
      qualities: catalogQualities.map((quality) => ({ slug: quality.slug, actors: [], pains: [] })),
      features: [], capabilities: [], affordances: [],
    },
  };
  for (const entry of platform) {
    const references = caseSlugs(useCasesForItem(entry.item));
    snapshot.records[entry.type].push({ slug: entry.slug, actors: caseActors(references), pains: casePains(references) });
    const related = usageTargets(references);
    if (entry.type === 'capabilities') {
      const capability = usageCapabilities.find((candidate) => candidate.slug === entry.slug)!;
      related.features = capability.capability.relations.features.map((reference) => `${capability.solution.slug}/${reference}`);
    }
    if (entry.type === 'affordances') related.capabilities = entry.item.relations.capabilities;
    snapshot.sources[entry.source] = { label: `${entry.type === 'features' ? 'Feature' : entry.type === 'capabilities' ? 'Capability' : 'Affordance'}: ${entry.name}`, targets: related };
  }
  snapshot.sources.platform = { label: `${PLATFORM_TYPE_LABEL}: Poesis`, targets: targets({ affordances: usageAffordances.map((entry) => entry.slug), qualities: platformQualityRefs, solutions: platformSolutions.map((solution) => solution.slug) }) };
  for (const actor of poesisUsage.actorTypes) {
    const references = caseSlugs(casesForActor(actor.slug));
    snapshot.sources[`actor:${actor.slug}`] = { label: `Actor type: ${actor.name}`, targets: targets({ ...platformSupport(references), pains: casePains(references), usage: references }) };
  }
  for (const pain of poesisUsage.pains) {
    const references = caseSlugs(useCasesForPain(pain.slug));
    snapshot.sources[`pain:${pain.slug}`] = { label: `Pain point: ${pain.pain}`, targets: targets({ ...platformSupport(references), actors: caseActors(references), usage: references }) };
  }
  for (const useCase of useCases) {
    snapshot.sources[`usage:${useCase.slug}`] = { label: `Use case: ${useCase.name}`, targets: targets({ ...platformSupport([useCase.slug]), actors: useCase.actorTypes, pains: useCase.addressedPains, values: useCase.values }) };
  }
  for (const value of usageValues) {
    const references = caseSlugs(useCasesForValue(value.slug));
    snapshot.sources[`value:${value.slug}`] = { label: `Value: ${value.title}`, targets: targets({ ...platformSupport(references), usage: references }) };
  }
  for (const solution of platformSolutions) {
    snapshot.sources[`solution:${solution.slug}`] = { label: `Solution: ${solution.name}`, targets: targets({ capabilities: solution.capabilities.map((capability) => `${solution.slug}/${capability.slug}`), qualities: solution.qualities, products: solution.products.map((product) => `${solution.slug}/${product.slug}`) }) };
  }
  for (const entry of platformProducts) {
    snapshot.sources[`product:${entry.slug}`] = { label: `Product: ${entry.product.name}`, targets: targets({ features: entry.product.features.map((feature) => `${entry.slug}/${feature.slug}`), qualities: entry.product.qualities }) };
  }
  for (const quality of catalogQualities) {
    const owner = qualitySubject(quality);
    snapshot.sources[`quality:${quality.slug}`] = { label: `Quality: ${quality.name}`, targets: targets(owner.scope === 'solution' ? { solutions: [owner.ref] } : owner.scope === 'product' ? { products: [owner.ref] } : {}) };
  }
  for (const group of homepagePainGroups) snapshot.sources[`homepage:${group.slug}`] = { label: group.lead, targets: { ...targets(), pains: [...group.pains] } };
  return snapshot;
}

export const catalogSnapshot = buildCatalogSnapshot();
const labels: Record<CatalogType, string> = { actors: 'Actor types', pains: 'Pain points', usage: 'Use cases', values: 'Values', features: 'Features', capabilities: 'Capabilities', affordances: 'Affordances', qualities: 'Qualities', solutions: 'Solutions', products: 'Products' };
type RelationSourceType = 'platform' | 'solution' | 'product' | 'affordance' | 'capability' | 'feature' | 'actor' | 'pain' | 'usage' | 'value' | 'quality';
interface RelationRule { qualifier: string; targets: CatalogType[] }
const platformAlternatives = (qualifier: string): RelationRule => ({ qualifier, targets: ['affordances', 'capabilities', 'features'] });

/** Direct relation contract, in card display order. No transitive or self edges. */
export const relationRules: Record<RelationSourceType, RelationRule[]> = {
  affordance: [
    { qualifier: 'Addresses', targets: ['pains'] }, { qualifier: 'Supports', targets: ['values'] },
    { qualifier: 'Serves', targets: ['usage'] }, { qualifier: 'Used by', targets: ['actors'] },
    { qualifier: 'Realized by', targets: ['capabilities'] },
  ],
  capability: [
    { qualifier: 'Addresses', targets: ['pains'] }, { qualifier: 'Supports', targets: ['values'] },
    { qualifier: 'Serves', targets: ['usage'] }, { qualifier: 'Used by', targets: ['actors'] },
    { qualifier: 'Realized by', targets: ['features'] },
  ],
  feature: [
    { qualifier: 'Addresses', targets: ['pains'] }, { qualifier: 'Supports', targets: ['values'] },
    { qualifier: 'Serves', targets: ['usage'] }, { qualifier: 'Used by', targets: ['actors'] },
  ],
  platform: [
    { qualifier: 'Offers', targets: ['affordances'] }, { qualifier: 'Characterized by', targets: ['qualities'] },
    { qualifier: 'Composed of', targets: ['solutions'] },
  ],
  solution: [
    { qualifier: 'Provides', targets: ['capabilities'] }, { qualifier: 'Characterized by', targets: ['qualities'] },
    { qualifier: 'Contains', targets: ['products'] },
  ],
  product: [
    { qualifier: 'Implements', targets: ['features'] }, { qualifier: 'Characterized by', targets: ['qualities'] },
  ],
  actor: [platformAlternatives('Supported by'), { qualifier: 'Experiences', targets: ['pains'] }, { qualifier: 'Pursues', targets: ['usage'] }],
  pain: [platformAlternatives('Addressed by'), { qualifier: 'Experienced by', targets: ['actors'] }, { qualifier: 'Addressed through', targets: ['usage'] }],
  usage: [platformAlternatives('Supported by'), { qualifier: 'Addresses', targets: ['pains'] }, { qualifier: 'Realizes', targets: ['values'] }, { qualifier: 'Performed by', targets: ['actors'] }],
  value: [platformAlternatives('Supported by'), { qualifier: 'Realized through', targets: ['usage'] }],
  quality: [{ qualifier: 'Borne by', targets: ['solutions', 'products'] }],
};

function sourceType(source: string): RelationSourceType {
  const type = source === 'platform' ? source : source.slice(0, source.indexOf(':'));
  if (!Object.hasOwn(relationRules, type)) throw new Error(`Unknown catalog relationship source type: ${source}`);
  return type as RelationSourceType;
}

function relationPreview(type: CatalogType, slug: string): RelationPreview {
  if (type === 'actors') {
    const actor = poesisUsage.actorTypes.find((candidate) => candidate.slug === slug);
    if (actor) return { label: actor.name, href: `/catalog/actors#${actor.slug}` };
  }
  if (type === 'pains') {
    const pain = poesisUsage.pains.find((candidate) => candidate.slug === slug);
    if (pain) return { label: pain.pain, href: `/catalog/pains#${pain.slug}` };
  }
  if (type === 'usage') {
    const useCase = useCases.find((candidate) => candidate.slug === slug);
    if (useCase) return { label: useCase.name, href: `/usage/${useCase.slug}`, state: useCaseStatus(useCase) };
  }
  if (type === 'values') {
    const value = usageValues.find((candidate) => candidate.slug === slug);
    if (value) return { label: value.title, href: valueHref(value), state: valueStatus(value.slug) };
  }
  if (type === 'features') {
    const entry = usageFeatures.find((candidate) => candidate.slug === slug);
    if (entry) return { label: entry.feature.name, href: featureHref(entry), state: entry.feature.delivery.state };
  }
  if (type === 'capabilities') {
    const entry = usageCapabilities.find((candidate) => candidate.slug === slug);
    if (entry) return { label: entry.capability.name, href: capabilityHref(entry), state: capabilityStatus(entry.solution, entry.capability) };
  }
  if (type === 'affordances') {
    const entry = usageAffordances.find((candidate) => candidate.slug === slug);
    if (entry) return { label: entry.affordance.name, href: affordanceHref(entry), state: affordanceStatus(entry.affordance) };
  }
  if (type === 'qualities') {
    const quality = catalogQualities.find((candidate) => candidate.slug === slug);
    if (quality) return { label: quality.name, href: qualityHref(quality), state: quality.state };
  }
  if (type === 'solutions') {
    const solution = platformSolutions.find((candidate) => candidate.slug === slug);
    if (solution) return { label: solution.fullName, href: solutionHref(solution), state: solutionStatus(solution) };
  }
  if (type === 'products') {
    const entry = platformProducts.find((candidate) => candidate.slug === slug);
    if (entry) return { label: entry.product.name, href: `${solutionHref(entry.solution)}/products/${entry.product.slug}`, state: productStatus(entry.product) };
  }
  throw new Error(`Unknown ${type} relationship target: ${slug}`);
}

/** Qualified links to direct relatives only, in the contract's display order. */
export function catalogRelations(source: string): RelationGroup[] {
  const resolved = catalogSnapshot.sources[source];
  if (!resolved) throw new Error(`Unknown catalog relationship source: ${source}`);
  return relationRules[sourceType(source)].flatMap((rule) => rule.targets.flatMap((target) => {
    const slugs = resolved.targets[target];
    return slugs.length ? [{
      label: labels[target],
      qualifier: rule.qualifier,
      href: catalogHref(target, source),
      previews: slugs.map((slug) => relationPreview(target, slug)),
    }] : [];
  }));
}

export function platformRelations(item: UsageItem): RelationGroup[] {
  const entry = platform.find((entry) => entry.item === item);
  if (!entry) throw new Error('Unknown platform relationship source');
  return catalogRelations(entry.source);
}

/** The platform bears qualities directly, and it is not a catalog type of its own. */
export function qualityRelations(quality: Pick<Quality, 'slug'>): RelationGroup[] {
  const owner = qualitySubject(quality);
  return owner.scope === 'platform'
    ? [{ label: PLATFORM_TYPE_LABEL, qualifier: 'Borne by', previews: [{ label: 'Poesis', href: owner.href }] }]
    : catalogRelations(`quality:${quality.slug}`);
}
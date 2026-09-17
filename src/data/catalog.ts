import { semanticEdges, type UsageRefs } from './poesis-platform.ts';
import { usageFeatures, usageCapabilities, usageAffordances, useCases, usageValues, poesisUsage, painsForItem, valuesForItem, useCasesForPain, type RelationGroup } from './usage.ts';
import { homepagePainGroups } from './pains.ts';
import { catalogTypes, catalogHref, type CatalogType, type CatalogSnapshot, type CatalogSource } from './catalog-query.ts';

const platform = [
  ...usageFeatures.map((entry) => ({ source: `feature:${entry.slug}`, slug: entry.slug, name: entry.feature.name, type: 'features' as const, item: entry.feature })),
  ...usageCapabilities.map((entry) => ({ source: `capability:${entry.slug}`, slug: entry.slug, name: entry.capability.name, type: 'capabilities' as const, item: entry.capability })),
  ...usageAffordances.map((entry) => ({ source: `affordance:${entry.slug}`, slug: entry.slug, name: entry.affordance.name, type: 'affordances' as const, item: entry.affordance })),
];
const targets = (): CatalogSource['targets'] => ({ actors: [], pains: [], usage: [], values: [], features: [], capabilities: [], affordances: [] });
const caseActors = (references: string[]) => [...new Set(useCases.filter((item) => references.includes(item.slug)).flatMap((item) => item.actorTypes))];
const casePains = (references: string[]) => painsForItem({ useCases: references }).map((pain) => pain.slug);
const actorPains = (slug: string) => poesisUsage.pains.filter((pain) => pain.actorTypes.includes(slug)).map((pain) => pain.slug);

/** Everything reachable from a set of use cases, in every catalog direction. */
function fromUseCases(references: string[]): CatalogSource['targets'] {
  const declares = (item: UsageRefs) => item.useCases.some((slug) => references.includes(slug));
  return {
    actors: caseActors(references),
    pains: casePains(references),
    usage: [...references],
    values: valuesForItem({ useCases: references }).map((value) => value.slug),
    features: usageFeatures.filter((entry) => declares(entry.feature)).map((entry) => entry.slug),
    capabilities: usageCapabilities.filter((entry) => declares(entry.capability)).map((entry) => entry.slug),
    affordances: usageAffordances.filter((entry) => declares(entry.affordance)).map((entry) => entry.slug),
  };
}

export function buildCatalogSnapshot(): CatalogSnapshot {
  const snapshot: CatalogSnapshot = {
    actors: poesisUsage.actorTypes.map((actor) => actor.slug), pains: poesisUsage.pains.map((pain) => pain.slug), sources: Object.create(null),
    records: {
      actors: poesisUsage.actorTypes.map((actor) => ({ slug: actor.slug, actors: [actor.slug], pains: actorPains(actor.slug) })),
      usage: useCases.map((item) => ({ slug: item.slug, actors: item.actorTypes, pains: item.addressedPains })),
      pains: poesisUsage.pains.map((pain) => ({ slug: pain.slug, actors: pain.actorTypes, pains: [pain.slug] })),
      values: usageValues.map((value) => ({ slug: value.slug, actors: caseActors(value.useCases), pains: casePains(value.useCases) })),
      features: [], capabilities: [], affordances: [],
    },
  };
  for (const entry of platform) {
    snapshot.records[entry.type].push({ slug: entry.slug, actors: caseActors(entry.item.useCases), pains: casePains(entry.item.useCases) });
    const related = targets();
    related.actors = caseActors(entry.item.useCases);
    related.usage = [...entry.item.useCases];
    related.pains = casePains(entry.item.useCases);
    related.values = valuesForItem(entry.item).map((value) => value.slug);
    const neighbors = new Set(semanticEdges.filter((edge) => edge.source === entry.source || edge.target === entry.source).map((edge) => edge.source === entry.source ? edge.target : edge.source));
    for (const neighbor of platform) if (neighbors.has(neighbor.source)) related[neighbor.type].push(neighbor.slug);
    snapshot.sources[entry.source] = { label: `${entry.type === 'features' ? 'Feature' : entry.type === 'capabilities' ? 'Capability' : 'Affordance'}: ${entry.name}`, targets: related };
  }
  // Usage items are relationship sources too, so every card can offer the same
  // type links a platform card does. A card never links back to its own catalog.
  for (const actor of poesisUsage.actorTypes) {
    const related = fromUseCases(useCases.filter((useCase) => useCase.actorTypes.includes(actor.slug)).map((useCase) => useCase.slug));
    snapshot.sources[`actor:${actor.slug}`] = { label: `Actor type: ${actor.name}`, targets: { ...related, actors: [], pains: [...new Set([...related.pains, ...actorPains(actor.slug)])] } };
  }
  for (const pain of poesisUsage.pains) {
    const related = fromUseCases(useCasesForPain(pain.slug).map((useCase) => useCase.slug));
    snapshot.sources[`pain:${pain.slug}`] = { label: `Pain point: ${pain.pain}`, targets: { ...related, pains: [], actors: [...new Set([...related.actors, ...pain.actorTypes])] } };
  }
  for (const useCase of useCases) {
    snapshot.sources[`usage:${useCase.slug}`] = { label: `Use case: ${useCase.name}`, targets: { ...fromUseCases([useCase.slug]), usage: [] } };
  }
  for (const value of usageValues) {
    snapshot.sources[`value:${value.slug}`] = { label: `Value: ${value.title}`, targets: { ...fromUseCases(value.useCases), values: [] } };
  }
  for (const group of homepagePainGroups) snapshot.sources[`homepage:${group.slug}`] = { label: group.lead, targets: { ...targets(), pains: [...group.pains] } };
  return snapshot;
}

export const catalogSnapshot = buildCatalogSnapshot();
const labels: Record<CatalogType, string> = { actors: 'Actor types', pains: 'Pain points', usage: 'Use cases', values: 'Values', features: 'Features', capabilities: 'Capabilities', affordances: 'Affordances' };

/** One source-scoped link per catalog type this source actually reaches. */
export function catalogRelations(source: string): RelationGroup[] {
  const resolved = catalogSnapshot.sources[source];
  if (!resolved) throw new Error(`Unknown catalog relationship source: ${source}`);
  return catalogTypes.filter((type) => resolved.targets[type].length).map((type) => ({ label: labels[type], links: [{ label: labels[type], href: catalogHref(type, source) }] }));
}

export function platformRelations(item: UsageRefs): RelationGroup[] {
  const entry = platform.find((entry) => entry.item === item);
  if (!entry) throw new Error('Unknown platform relationship source');
  return catalogRelations(entry.source);
}
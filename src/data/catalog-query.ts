export const catalogTypes = ['actors', 'pains', 'usage', 'values', 'features', 'capabilities', 'affordances', 'solutions', 'products'] as const;
export type CatalogType = typeof catalogTypes[number];
export interface CatalogRecord { slug: string; actors: string[]; pains: string[] }
export interface CatalogSource { label: string; targets: Record<CatalogType, string[]> }
export interface CatalogSnapshot { sources: Record<string, CatalogSource>; records: Record<CatalogType, CatalogRecord[]>; actors: string[]; pains: string[] }

export function catalogHref(type: CatalogType, source: string): string {
  return `/${type}?${new URLSearchParams({ source })}`;
}

export function filterCatalog(snapshot: CatalogSnapshot, type: CatalogType, query: URLSearchParams) {
  const source = query.get('source');
  const actor = query.get('actor');
  const pain = query.get('pain');
  const resolved = source && Object.hasOwn(snapshot.sources, source) ? snapshot.sources[source] : undefined;
  const invalid = (source !== null && !resolved) || (actor !== null && !snapshot.actors.includes(actor)) || (pain !== null && !snapshot.pains.includes(pain)) || ['source', 'actor', 'pain'].some((key) => query.getAll(key).length > 1);
  const matches = invalid ? [] : snapshot.records[type].filter((record) =>
    (!resolved || resolved.targets[type].includes(record.slug)) &&
    (!actor || record.actors.includes(actor)) && (!pain || record.pains.includes(pain)));
  return { slugs: matches.map((record) => record.slug), invalid, sourceLabel: resolved?.label ?? source, active: source !== null || actor !== null || pain !== null };
}
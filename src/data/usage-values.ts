/**
 * usage-values.ts — the single value ledger.
 *
 * A value is an independent desired benefit and owns no graph references.
 * Use cases declare the values they realize; inverse lookups and delivery
 * status are derived in usage.ts.
 *
 * Slug grammar preserves editorial placement, not exclusive support ownership:
 *
 *   value:platform/<name>           platform page
 *   value:<solution>/<nn>           solution page
 *   value:<solution>/<product>/<nn> product page
 *
 * Slugs are public identity: they drive page anchors and must never be
 * renumbered or reworded.
 */
import catalog from './catalog/poesis-usage.json' with { type: 'json' };

export interface Value {
  /** Stable public identity and anchor source. */
  slug: string;
  /** Wording this value shipped with before the current title; kept as a legacy anchor alias. */
  originalTitle: string;
  title: string;
  body: string;
}

export const usageValues: Value[] = catalog.values;

/** Legacy anchor form derived from a value title, kept so old deep links still resolve. */
export function solutionValueAnchor(title: string): string {
  return `value-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
}

/** Canonical anchor for a value, derived from its slug. */
export function valueAnchor(value: Pick<Value, 'slug'>): string {
  return value.slug.replace(/[:/]/g, '-');
}

/** Legacy title-derived anchors kept alongside the canonical one. */
export function valueAliases(value: Pick<Value, 'originalTitle' | 'title'>): string[] {
  return [...new Set([solutionValueAnchor(value.originalTitle), solutionValueAnchor(value.title)])];
}

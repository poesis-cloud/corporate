import { usagePains, type UsagePain } from './usage-pains.ts';
import { usageFeatures, painsForItem } from './usage.ts';
import catalog from './catalog/poesis-usage.json' with { type: 'json' };

export interface FeatureRef { solution: string; product: string; feature: string }
/**
 * Independent pain records with feature support projected through use cases.
 */
export type Pain = UsagePain & { addressedBy: FeatureRef[] };
export const pains: Pain[] = usagePains
  .map((pain) => ({ ...pain, addressedBy: usageFeatures.filter((entry) => painsForItem(entry.feature).some((candidate) => candidate.slug === pain.slug)).map((entry) => ({ solution: entry.solution.slug, product: entry.product.slug, feature: entry.feature.slug })) }));
export function resolveFeatureRef(ref: FeatureRef) {
  const resolved = usageFeatures.find((feature) => feature.slug === `${ref.solution}/${ref.product}/${ref.feature}`);
  if (!resolved) throw new Error('pains.ts: unknown feature reference');
  return resolved;
}
export type ResolvedFeature = ReturnType<typeof resolveFeatureRef>;
export const painsForProduct = (solutionSlug: string, productSlug: string): Pain[] => pains.filter((pain) => pain.addressedBy.some((ref) => ref.solution === solutionSlug && ref.product === productSlug));
export const painRelations = pains.flatMap((pain) => pain.addressedBy.map((reference) => ({
  id: `feature:${reference.solution}/${reference.product}/${reference.feature}->pain:${pain.slug}`,
  kind: 'mitigates' as const, judgment: 'hypothesis' as const, scope: resolveFeatureRef(reference).feature.blurb, ...reference, pain: pain.slug,
})));

export const homepagePainGroups = catalog.painGroups;
for (const group of homepagePainGroups) {
  if (!group.pains.length || new Set(group.pains).size !== group.pains.length) throw new Error(`Invalid homepage group: ${group.slug}`);
  for (const slug of group.pains) if (!usagePains.some((pain) => pain.slug === slug)) throw new Error(`Unknown homepage pain: ${slug}`);
}
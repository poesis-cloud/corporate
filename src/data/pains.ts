import { usagePains, type UsagePain } from './usage-pains.ts';
import { usageFeatures } from './usage.ts';

export interface FeatureRef { solution: string; product: string; feature: string }
/**
 * The pain view, inverted from the features that declare which pains they
 * address. Only pains with at least one addressing feature appear here; the
 * homepage bottleneck diagram and the product pages both read this view.
 */
export type Pain = UsagePain & { addressedBy: FeatureRef[] };
export const pains: Pain[] = usagePains
  .map((pain) => ({ ...pain, addressedBy: usageFeatures.filter((entry) => entry.feature.pains.includes(pain.slug)).map((entry) => ({ solution: entry.solution.slug, product: entry.product.slug, feature: entry.feature.slug })) }))
  .filter((pain) => pain.addressedBy.length);
export function resolveFeatureRef(ref: FeatureRef) {
  const resolved = usageFeatures.find((feature) => feature.slug === `${ref.solution}/${ref.product}/${ref.feature}`);
  if (!resolved) throw new Error('pains.ts: unknown feature reference');
  return resolved;
}
export type ResolvedFeature = ReturnType<typeof resolveFeatureRef>;
export const painsForPhase = (phase: Pain['phase']): Pain[] => pains.filter((pain) => pain.phase === phase);
export const painsForProduct = (solutionSlug: string, productSlug: string): Pain[] => pains.filter((pain) => pain.addressedBy.some((ref) => ref.solution === solutionSlug && ref.product === productSlug));
export const painRelations = pains.flatMap((pain) => pain.addressedBy.map((reference) => ({
  id: `feature:${reference.solution}/${reference.product}/${reference.feature}->pain:${pain.slug}`,
  kind: 'mitigates' as const, judgment: 'hypothesis' as const, scope: resolveFeatureRef(reference).feature.blurb, ...reference, pain: pain.slug,
})));
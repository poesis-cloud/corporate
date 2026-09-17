/**
 * catalog-card.ts — the one card model.
 *
 * Every catalog item is projected here into the same shape, so a card reads
 * identically wherever it is rendered:
 *
 *   TYPE · STATUS          the shared identity and delivery vocabulary
 *   heading                the item's own identity, linked to its canonical page
 *   hook                   an optional qualifier, never the identity
 *   body                   the elaboration
 *   tags                   concise themes, never relation summaries or state
 *   relations              one source-scoped link per catalog type it reaches
 *
 * Pains and values carry no name in the data — only a statement. The statement
 * is their identity, and the type label is what tells the reader so.
 */
import { commitmentStatus, solutionHref, solutionStatus, productStatus, capabilityStatus, affordanceStatus, type DeliveryState, type Product, type Solution } from './poesis-platform.ts';
import { catalogRelations, platformRelations, qualityRelations } from './catalog.ts';
import {
  affordanceHref, capabilityHref, featureHref, painsForUseCase, useCaseStatus, useCases, useCasesInReach, useCasesForPain, useCasesForProduct, useCasesForSolution, useCasesForValue, valueAnchor, valueAliases, valueHref, valueStatus,
  type RelationGroup, type UsageAffordance, type UsageCapability, type UsageFeature, type UseCase, type Value,
} from './usage.ts';
import { qualityAnchor, qualityCategoryNames, qualityHref, type Quality } from './qualities.ts';
import { type Service } from './services.ts';
import type { ActorType } from './usage-actors.ts';
import type { UsagePain } from './usage-pains.ts';

export type CatalogItemType =
  | 'actor' | 'pain' | 'usage' | 'value'
  | 'affordance' | 'capability' | 'feature'
  | 'solution' | 'product' | 'quality' | 'service';

export const cardTypeLabels = {
  actor: 'Actor type', pain: 'Pain point', usage: 'Use case', value: 'Value',
  affordance: 'Affordance', capability: 'Capability', feature: 'Feature',
  solution: 'Solution', product: 'Product', quality: 'Quality', service: 'Service',
} as const satisfies Record<CatalogItemType, string>;

/** One icon per type: a card icon says what kind of thing this is, never which one. */
export const cardTypeIcons = {
  actor: 'users', pain: 'alert', usage: 'target', value: 'trending-up',
  affordance: 'grid', capability: 'bolt', feature: 'list',
  solution: 'compass', product: 'briefcase', quality: 'check-badge', service: 'handshake',
} as const satisfies Record<CatalogItemType, string>;

export interface CatalogCard {
  type: CatalogItemType;
  anchor: string;
  /** Legacy anchors kept so old deep links still resolve. */
  aliases?: string[];
  /** Filter identity, matched by the catalog filter script. */
  slug?: string;
  /** Canonical location of the item, linked from the heading. */
  href?: string;
  heading: string;
  hook?: string;
  body: string;
  /** Set when the body is authored as markup rather than plain text. */
  bodyHtml?: boolean;
  status: DeliveryState;
  tags: string[];
  relations?: RelationGroup[];
  data?: Record<string, string>;
}

function aggregateUseCaseStatus(entries: UseCase[]): DeliveryState {
  return commitmentStatus(entries.map((entry) => useCaseStatus(entry) ?? 'planned'));
}

/**
 * Themes come from the pain vocabulary an item is about. They are ranked by how
 * often a theme recurs across the item's reach, so a broad item keeps the few
 * concerns that actually characterise it rather than an arbitrary first four.
 * An item with no theme shows none: a filler tag every item shares says nothing.
 */
function rankThemes(tags: string[]): string[] {
  const counts = new Map<string, number>();
  for (const tag of tags) if (tag) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts].sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0])).slice(0, 4).map(([tag]) => tag);
}

function useCaseTags(entries: UseCase[]): string[] {
  return entries.flatMap((entry) => painsForUseCase(entry.slug).flatMap((pain) => pain.tags));
}

export function actorCard(actor: ActorType): CatalogCard {
  return {
    type: 'actor',
    anchor: actor.slug,
    slug: actor.slug,
    heading: actor.name,
    hook: actor.hook,
    body: actor.body,
    status: aggregateUseCaseStatus(useCases.filter((useCase) => useCase.actorTypes.includes(actor.slug))),
    tags: rankThemes(actor.tags),
    relations: catalogRelations(`actor:${actor.slug}`),
  };
}

export function painCard(pain: UsagePain): CatalogCard {
  return {
    type: 'pain',
    anchor: pain.slug,
    slug: pain.slug,
    heading: pain.pain,
    body: pain.cost,
    status: aggregateUseCaseStatus(useCasesForPain(pain.slug)),
    tags: rankThemes(pain.tags),
    relations: catalogRelations(`pain:${pain.slug}`),
    data: { 'data-usage-pain': pain.slug },
  };
}

export function useCaseCard(useCase: UseCase): CatalogCard {
  return {
    type: 'usage',
    anchor: useCase.slug,
    slug: useCase.slug,
    href: `/usage/${useCase.slug}`,
    heading: useCase.name,
    body: useCase.goal,
    status: useCaseStatus(useCase) ?? 'planned',
    tags: rankThemes(useCaseTags([useCase])),
    relations: catalogRelations(`usage:${useCase.slug}`),
    data: { 'data-usage-case': useCase.slug, 'data-actors': useCase.actorTypes.join(' ') },
  };
}

export function valueCard(value: Value): CatalogCard {
  return {
    type: 'value',
    anchor: valueAnchor(value),
    aliases: valueAliases(value),
    slug: value.slug,
    href: valueHref(value),
    heading: value.title,
    body: value.body,
    bodyHtml: true,
    status: valueStatus(value.slug) ?? 'planned',
    tags: rankThemes(useCaseTags(useCasesForValue(value.slug))),
    relations: catalogRelations(`value:${value.slug}`),
    data: { 'data-usage-value': value.slug },
  };
}

export function affordanceCard(entry: UsageAffordance): CatalogCard {
  return {
    type: 'affordance',
    anchor: `affordance-${entry.slug}`,
    slug: entry.slug,
    href: affordanceHref(entry),
    heading: entry.affordance.name,
    hook: entry.affordance.title,
    body: entry.affordance.blurb,
    status: affordanceStatus(entry.affordance),
    tags: rankThemes(useCaseTags(useCasesInReach(entry.affordance))),
    relations: platformRelations(entry.affordance),
  };
}

export function capabilityCard(entry: UsageCapability): CatalogCard {
  return {
    type: 'capability',
    anchor: `capability-${entry.slug.replace(/\//g, '-')}`,
    slug: entry.slug,
    href: capabilityHref(entry),
    heading: entry.capability.name,
    body: entry.capability.blurb,
    status: capabilityStatus(entry.solution, entry.capability),
    tags: rankThemes(useCaseTags(useCasesInReach(entry.capability))),
    relations: platformRelations(entry.capability),
  };
}

export function featureCard(entry: UsageFeature): CatalogCard {
  const { delivery } = entry.feature;
  return {
    type: 'feature',
    anchor: `feature-${entry.slug.replace(/\//g, '-')}`,
    slug: entry.slug,
    href: featureHref(entry),
    heading: entry.feature.name,
    body: entry.feature.blurb,
    status: delivery.state,
    tags: rankThemes(useCaseTags(useCasesInReach(entry.feature))),
    relations: platformRelations(entry.feature),
  };
}

export function solutionCard(solution: Solution): CatalogCard {
  return {
    type: 'solution',
    anchor: `solution-${solution.slug}`,
    slug: solution.slug,
    href: solutionHref(solution),
    heading: solution.fullName,
    hook: solution.tagline,
    body: solution.description,
    status: solutionStatus(solution),
    tags: rankThemes(useCaseTags(useCasesForSolution(solution.slug))),
    relations: catalogRelations(`solution:${solution.slug}`),
  };
}

export function productCard(entry: { solution: Solution; product: Product }): CatalogCard {
  const { solution, product } = entry;
  return {
    type: 'product',
    anchor: `product-${solution.slug}-${product.slug}`,
    slug: `${solution.slug}/${product.slug}`,
    href: `${solutionHref(solution)}/products/${product.slug}`,
    heading: product.name,
    hook: product.tagline,
    body: product.description,
    status: productStatus(product),
    tags: rankThemes(useCaseTags(useCasesForProduct(solution.slug, product.slug))),
    relations: catalogRelations(`product:${solution.slug}/${product.slug}`),
  };
}

// A quality is atomic and states no use cases, so it carries a claim rather than
// relations, and its categories are the grouping it is listed under.
export function qualityCard(quality: Quality): CatalogCard {
  return {
    type: 'quality',
    anchor: qualityAnchor(quality),
    slug: quality.slug,
    href: qualityHref(quality),
    heading: quality.name,
    hook: quality.claim,
    body: quality.body,
    status: quality.state ?? 'delivered',
    tags: rankThemes(qualityCategoryNames(quality)),
    relations: qualityRelations(quality),
  };
}

export function serviceCard(service: Service): CatalogCard {
  return {
    type: 'service',
    anchor: `service-${service.slug}`,
    slug: service.slug,
    href: service.href,
    heading: service.label,
    hook: service.title,
    body: service.summary,
    status: service.availability === 'Planned' ? 'planned' : 'delivered',
    tags: rankThemes([service.category]),
  };
}

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
 *   tags                   ownership, grouping, version, and count metadata
 *   relations              one source-scoped link per catalog type it reaches
 *
 * Pains and values carry no name in the data — only a statement. The statement
 * is their identity, and the type label is what tells the reader so.
 */
import { commitmentStatus, subjectLabel, solutionHref, solutionStatus, productStatus, capabilityStatus, affordanceStatus, type DeliveryState, type Product, type Solution } from './poesis-platform.ts';
import { catalogRelations, platformRelations } from './catalog.ts';
import {
  affordanceHref, capabilityHref, featureHref, useCaseStatus, useCases, useCasesForPain, valueAnchor, valueAliases, valueCoverage, valueHref, valueStatus,
  type RelationGroup, type UsageAffordance, type UsageCapability, type UsageFeature, type UseCase, type Value,
} from './usage.ts';
import { qualityAnchor, qualityCategoryNames, qualityHref, qualityScopeLabel, type Quality } from './qualities.ts';
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

function useCaseSupportTag(useCase: UseCase): string {
  if (useCase.features?.length) return `${useCase.features.length} feature${useCase.features.length === 1 ? '' : 's'}`;
  if (useCase.capabilities?.length) return `${useCase.capabilities.length} capabilit${useCase.capabilities.length === 1 ? 'y' : 'ies'}`;
  if (useCase.affordances?.length) return `${useCase.affordances.length} affordance${useCase.affordances.length === 1 ? '' : 's'}`;
  return 'No platform support';
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
    tags: [actor.kind === 'human' ? 'Human' : 'System', ...actor.tags],
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
    tags: pain.tags,
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
    tags: [
      `${useCase.actorTypes.length} actor type${useCase.actorTypes.length === 1 ? '' : 's'}`,
      `${useCase.addressedPains.length} pain${useCase.addressedPains.length === 1 ? '' : 's'}`,
      `${useCase.values.length} value${useCase.values.length === 1 ? '' : 's'}`,
      useCaseSupportTag(useCase),
    ],
    relations: catalogRelations(`usage:${useCase.slug}`),
    data: { 'data-usage-case': useCase.slug, 'data-actors': useCase.actorTypes.join(' ') },
  };
}

/** Where the value is published: the platform, a solution, or one of its products. */
function valueOwnerLabel(value: Value): string {
  return subjectLabel(value.slug.replace(/^value:/, '').split('/').slice(0, -1).join('/')) ?? 'Independent';
}

export function valueCard(value: Value): CatalogCard {
  const coverage = valueCoverage(value.slug);
  const supported = coverage.filter((entry) => entry.state).length;
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
    tags: [
      valueOwnerLabel(value),
      `${coverage.length} constituent use case${coverage.length === 1 ? '' : 's'}`,
      supported ? `${supported}/${coverage.length} with platform support` : 'No platform support',
    ],
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
    tags: ['Cross-solution', `${entry.affordance.relations.capabilities.length} contributing capabilities`],
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
    tags: [entry.solution.name, `${entry.capability.relations.features.length} supporting features`, entry.capability.delivery.kind],
    relations: platformRelations(entry.capability),
  };
}

export function featureCard(entry: UsageFeature): CatalogCard {
  const { milestone, delivery } = entry.feature;
  return {
    type: 'feature',
    anchor: `feature-${entry.slug.replace(/\//g, '-')}`,
    slug: entry.slug,
    href: featureHref(entry),
    heading: entry.feature.name,
    body: entry.feature.blurb,
    status: delivery.state,
    tags: [entry.solution.name, entry.product.name, `${milestone.shipped ? 'Released' : 'Milestone'} ${milestone.version}`, delivery.kind],
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
    tags: [...solution.tags, `${solution.capabilities.length} capabilities`, `${solution.products.length} products`, `${solution.qualities.length} qualities`],
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
    tags: [solution.name, `Current v${product.currentVersion}`, `${product.features.length} features`, `${product.qualities.length} qualities`],
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
    tags: [qualityScopeLabel(quality), ...qualityCategoryNames(quality)],
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
    tags: [service.category, service.availability, service.availabilityNote],
  };
}

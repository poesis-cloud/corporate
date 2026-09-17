/**
 * catalog-card.ts — the one card model.
 *
 * Every catalog item is projected here into the same shape, so a card reads
 * identically wherever it is rendered:
 *
 *   TYPE · CATEGORY        the type always first, the category only when the
 *                          whole type has one
 *   heading                the item's own identity, linked to its canonical page
 *   hook                   an optional qualifier, never the identity
 *   body                   the elaboration
 *   relations              one source-scoped link per catalog type it reaches
 *
 * Pains and values carry no name in the data — only a statement. The statement
 * is their identity, and the type label is what tells the reader so.
 */
import { platformSolutions, type DeliveryState } from './poesis-platform.ts';
import { catalogRelations, platformRelations } from './catalog.ts';
import {
  affordanceHref, capabilityHref, featureHref, useCaseStatus, valueAnchor, valueAliases, valueCoverage, valueHref, valueStatus,
  type RelationGroup, type UsageAffordance, type UsageCapability, type UsageFeature, type UseCase, type Value,
} from './usage.ts';
import { capabilityStatus, affordanceStatus } from './poesis-platform.ts';
import type { ActorType } from './usage-actors.ts';
import type { UsagePain } from './usage-pains.ts';

export type CatalogItemType = 'actor' | 'pain' | 'usage' | 'value' | 'affordance' | 'capability' | 'feature';

export const cardTypeLabels = {
  actor: 'Actor type', pain: 'Pain point', usage: 'Use case', value: 'Value',
  affordance: 'Affordance', capability: 'Capability', feature: 'Feature',
} as const satisfies Record<CatalogItemType, string>;

/** One icon per type: a card icon says what kind of thing this is, never which one. */
export const cardTypeIcons = {
  actor: 'users', pain: 'alert', usage: 'target', value: 'trending-up',
  affordance: 'grid', capability: 'bolt', feature: 'list',
} as const satisfies Record<CatalogItemType, string>;

export interface CatalogCard {
  type: CatalogItemType;
  /** Rendered after the type, behind a `·`. Omitted when the type has no category. */
  category?: string;
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
  status?: DeliveryState;
  meta?: string;
  relations?: RelationGroup[];
  data?: Record<string, string>;
}

export function actorCard(actor: ActorType): CatalogCard {
  return {
    type: 'actor',
    category: actor.kind === 'human' ? 'Human' : 'System',
    anchor: actor.slug,
    slug: actor.slug,
    heading: actor.name,
    hook: actor.hook,
    body: actor.body,
    meta: actor.tags.join(' · '),
    relations: catalogRelations(`actor:${actor.slug}`),
  };
}

export function painCard(pain: UsagePain): CatalogCard {
  return {
    type: 'pain',
    category: pain.tags.join(' · '),
    anchor: pain.slug,
    slug: pain.slug,
    heading: pain.pain,
    body: pain.cost,
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
    status: useCaseStatus(useCase),
    relations: catalogRelations(`usage:${useCase.slug}`),
    data: { 'data-usage-case': useCase.slug, 'data-actors': useCase.actorTypes.join(' ') },
  };
}

/** Where the value is published: the platform, a solution, or one of its products. */
function valueCategory(value: Value): string | undefined {
  const [owner, ...rest] = value.slug.replace(/^value:/, '').split('/');
  if (!rest.length) return undefined;
  if (owner === 'platform') return 'Platform';
  const solution = platformSolutions.find((candidate) => candidate.slug === owner);
  if (!solution) return undefined;
  const product = rest.length === 2 ? solution.products.find((candidate) => candidate.slug === rest[0]) : undefined;
  return product ? `${solution.name} · ${product.name}` : solution.name;
}

export function valueCard(value: Value): CatalogCard {
  const coverage = valueCoverage(value.slug);
  const supported = coverage.filter((entry) => entry.state).length;
  return {
    type: 'value',
    category: valueCategory(value),
    anchor: valueAnchor(value),
    aliases: valueAliases(value),
    slug: value.slug,
    href: valueHref(value),
    heading: value.title,
    body: value.body,
    bodyHtml: true,
    status: valueStatus(value.slug),
    // A value states its own coverage, so an unsupported one says so rather
    // than looking like every other card.
    meta: supported
      ? `${supported} of ${coverage.length} constituent use cases with platform support`
      : `No platform support declared for any of the ${coverage.length} constituent use cases`,
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
    relations: platformRelations(entry.affordance),
  };
}

export function capabilityCard(entry: UsageCapability): CatalogCard {
  return {
    type: 'capability',
    category: entry.solution.name,
    anchor: `capability-${entry.slug.replace(/\//g, '-')}`,
    slug: entry.slug,
    href: capabilityHref(entry),
    heading: entry.capability.name,
    body: entry.capability.blurb,
    status: capabilityStatus(entry.solution, entry.capability),
    relations: platformRelations(entry.capability),
  };
}

export function featureCard(entry: UsageFeature): CatalogCard {
  const { milestone, delivery } = entry.feature;
  return {
    type: 'feature',
    category: `${entry.solution.name} · ${entry.product.name}`,
    anchor: `feature-${entry.slug.replace(/\//g, '-')}`,
    slug: entry.slug,
    href: featureHref(entry),
    heading: entry.feature.name,
    body: entry.feature.blurb,
    status: delivery.state,
    meta: `${milestone.shipped ? 'Released' : 'Milestone'} ${milestone.version}`,
    relations: platformRelations(entry.feature),
  };
}

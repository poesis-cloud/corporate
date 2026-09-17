/**
 * qualities.ts — the quality ledger.
 *
 * A quality is one atomic attribute: a name, a claim, and the boundary that
 * claim excludes. Unlike a value it is not composed from use cases.
 *
 * A quality never states what bears it. The subject declares its qualities —
 * `platformQualities` for the platform, `solution.qualities`, `product.qualities` —
 * exactly as a capability declares its features. Ownership is exclusive: one
 * quality is referenced by one subject, so its anchor and page stay unambiguous.
 * Affordances, capabilities and features bear no qualities.
 *
 * A category is a grouping, never a quality: it has no subject and no delivery
 * state of its own. A quality may belong to several categories; the first is
 * where it is published and rendered, the rest are cross-listings.
 */
import catalog from './catalog/poesis-platform.json' with { type: 'json' };
import { platformQualityRefs, platformSolutions, subjectHref, subjectLabel, type DeliveryState } from './poesis-platform.ts';

export type QualityScope = 'platform' | 'solution' | 'product';

export interface QualityCategory {
    slug: string;
    /** Legacy page anchor kept so existing deep links still resolve. */
    anchor?: string;
    name: string;
    lead: string;
    note?: string;
    noteState?: DeliveryState;
}

/** What bears a quality, resolved from the reference the subject declares. */
export interface QualitySubject {
    ref: string;
    scope: QualityScope;
    label: string;
    href: string;
}

export interface Quality {
    slug: string;
    name: string;
    categories: string[];
    icon: string;
    claim: string;
    body: string;
    state?: DeliveryState;
}

export const qualityCategories: QualityCategory[] = catalog.qualityCategories as QualityCategory[];
export const qualities: Quality[] = catalog.qualities as Quality[];

function subject(ref: string): QualitySubject {
    const scope: QualityScope = ref === 'platform' ? 'platform' : ref.includes('/') ? 'product' : 'solution';
    return { ref, scope, label: subjectLabel(ref)!, href: subjectHref(ref) };
}

/** Quality slug to the subject that declares it. Built once, so a second claim is a load error. */
const subjects = new Map<string, QualitySubject>();
for (const [ref, refs] of [
    ['platform', platformQualityRefs] as const,
    ...platformSolutions.flatMap((solution) => [
        [solution.slug, solution.qualities] as const,
        ...solution.products.map((product) => [`${solution.slug}/${product.slug}`, product.qualities] as const),
    ]),
]) {
    for (const slug of refs) {
        const claimed = subjects.get(slug);
        if (claimed) throw new Error(`Quality ${slug} is claimed by both ${claimed.ref} and ${ref}`);
        subjects.set(slug, subject(ref));
    }
}

export function qualityBySlug(slug: string): Quality | undefined {
    return qualities.find((quality) => quality.slug === slug);
}

export function qualitySubject(quality: Pick<Quality, 'slug'>): QualitySubject {
    const owner = subjects.get(quality.slug);
    if (!owner) throw new Error(`Unowned quality: ${quality.slug}`);
    return owner;
}

export function qualityScope(quality: Pick<Quality, 'slug'>): QualityScope {
    return qualitySubject(quality).scope;
}

export function qualityAnchor(quality: Pick<Quality, 'slug'>): string {
    return `quality-${quality.slug}`;
}

/** An authored category anchor wins, so old homepage links survive. */
export function categoryAnchor(category: Pick<QualityCategory, 'slug' | 'anchor'>): string {
    return category.anchor ?? `quality-category-${category.slug}`;
}

/** Where the quality is rendered: the homepage, a solution page or a product page. */
export function qualityHref(quality: Pick<Quality, 'slug'>): string {
    const owner = qualitySubject(quality);
    return `${owner.href === '/' ? '/' : `${owner.href}`}#${qualityAnchor(quality)}`;
}

/** What bears the quality, rendered as the card category. */
export function qualityScopeLabel(quality: Pick<Quality, 'slug'>): string {
    return qualitySubject(quality).label;
}

export function categoryBySlug(slug: string): QualityCategory | undefined {
    return qualityCategories.find((category) => category.slug === slug);
}

export function qualityCategoryNames(quality: Pick<Quality, 'categories'>): string[] {
    return quality.categories.map((slug) => categoryBySlug(slug)!.name);
}

export function qualitiesInCategory(categorySlug: string, scope?: QualityScope): Quality[] {
    return qualities.filter((quality) => quality.categories.includes(categorySlug) && (!scope || qualityScope(quality) === scope));
}

/** Qualities a category publishes — the ones it renders, so an anchor stays unique. */
export function qualitiesPublishedBy(categorySlug: string, scope?: QualityScope): Quality[] {
    return qualities.filter((quality) => quality.categories[0] === categorySlug && (!scope || qualityScope(quality) === scope));
}

/** Resolved in the order the subject declares them. */
export function qualitiesOf(refs: string[]): Quality[] {
    return refs.map((slug) => qualityBySlug(slug)!).filter(Boolean);
}

export const platformQualities: Quality[] = qualitiesOf(platformQualityRefs);
export function solutionQualities(solutionSlug: string): Quality[] {
    return qualitiesOf(platformSolutions.find((candidate) => candidate.slug === solutionSlug)?.qualities ?? []);
}
export function productQualities(solutionSlug: string, productSlug: string): Quality[] {
    const solution = platformSolutions.find((candidate) => candidate.slug === solutionSlug);
    return qualitiesOf(solution?.products.find((candidate) => candidate.slug === productSlug)?.qualities ?? []);
}

function unique(values: string[], label: string): void { if (new Set(values).size !== values.length) throw new Error(`Duplicate ${label}`); }

export function validateQualities(entries: Quality[] = qualities, categories: QualityCategory[] = qualityCategories): void {
    unique(categories.map((category) => category.slug), 'quality category');
    unique(categories.map(categoryAnchor), 'quality category anchor');
    unique(entries.map((quality) => quality.slug), 'quality');
    for (const category of categories) {
        if (!category.name.trim() || !category.lead.trim()) throw new Error(`Empty quality category: ${category.slug}`);
        if (category.noteState && !category.note) throw new Error(`Unattached category note state: ${category.slug}`);
        if (!entries.some((quality) => quality.categories[0] === category.slug)) throw new Error(`Quality category publishes nothing: ${category.slug}`);
    }
    for (const quality of entries) {
        if (!/^[a-z0-9-]+$/.test(quality.slug)) throw new Error(`Invalid quality identity: ${quality.slug}`);
        if (!quality.name.trim() || !quality.claim.trim() || !quality.body.trim() || !quality.icon.trim()) throw new Error(`Incomplete quality: ${quality.slug}`);
        if (!quality.categories.length) throw new Error(`Uncategorized quality: ${quality.slug}`);
        unique(quality.categories, `category on ${quality.slug}`);
        for (const slug of quality.categories) if (!categories.some((category) => category.slug === slug)) throw new Error(`Unknown quality category ${slug} on ${quality.slug}`);
        // Every quality is borne by something; the subject index proves the claim resolves.
        qualitySubject(quality);
    }
    for (const slug of subjects.keys()) if (!entries.some((quality) => quality.slug === slug)) throw new Error(`Subject claims unknown quality: ${slug}`);
}
validateQualities();

/**
 * Poesis profiles — the per-domain buyer/user profiles featured in "Who it's for" grids.
 * Derived from the GTM catalog (.bmad-output/implementation-artifacts/gtm-domain-sales-profiles.md);
 * cards today, standalone profile pages tomorrow render from this same source.
 */

export interface Profile {
    id: string;
    domainSlug: 'it';
    name: string;
    tag: string;
    /** Icon name from components/Icon.astro. */
    icon: string;
    hook: string;
    body: string;
    cta: { href: string; label: string };
}

export const profiles: Profile[] = [
    {
        id: 'it-cto',
        domainSlug: 'it',
        name: 'CTO / CIO',
        tag: 'Executive',
        icon: 'briefcase',
        hook: 'One governed source of truth for your entire IT estate — and the foundation your AI strategy is missing.',
        body: 'EA, compliance automation, impact analysis, artifact generation, and truth sourcing become facets of one governed model — one budget line instead of five drifting tools, on a vendor-neutral standard.',
        cta: { href: '/contact', label: 'Talk to us' },
    },
    {
        id: 'it-architect',
        domainSlug: 'it',
        name: 'Enterprise Architect',
        tag: 'Architecture',
        icon: 'compass',
        hook: 'An EA repository that cannot drift — sourced from what actually runs.',
        body: 'The inventory is continuously sourced from code, contracts, SBOMs, and infrastructure; impact is simulated through typed relations; ADR packs, baselines, and roadmaps are generated, each traceable to its definitions.',
        cta: { href: '/solutions/itip', label: 'Explore ITIP' },
    },
    {
        id: 'it-ciso',
        domainSlug: 'it',
        name: 'CISO / Security leadership',
        tag: 'Security & compliance',
        icon: 'shield',
        hook: 'NIS2, DORA, GDPR, ISO — observed continuously, proven on demand.',
        body: 'Continuous appraisal indicators compute your posture from the model — audit-ready every day, with findings that trace to the exact definitions and revisions they derive from.',
        cta: { href: '/insights/continuous-regulatory-compliance', label: 'Read: continuous regulatory compliance' },
    },
    {
        id: 'it-platform',
        domainSlug: 'it',
        name: 'Platform / Ops / SRE lead',
        tag: 'Platform',
        icon: 'layers',
        hook: 'Kubernetes reconciles your infrastructure. Poesis reconciles everything that governs it.',
        body: 'The declare-and-reconcile principle you already trust, extended to architectures, obligations, and processes — an API and an operator, Helm-deployed on your cluster, not a document store.',
        cta: { href: 'https://docs.poesis.cloud/itip/', label: 'Read the docs' },
    },
    {
        id: 'it-head-of-ai',
        domainSlug: 'it',
        name: 'Head of AI',
        tag: 'AI enablement',
        icon: 'spark',
        hook: 'Your AI agents are only as trustworthy as the truth you give them.',
        body: 'Agents and humans reason over the same governed, typed definitions; deterministic governance evaluations wrap agent action — accountable, traceable autonomy in the estate.',
        cta: { href: '/contact', label: 'Talk to us' },
    },
];

export const profilesForDomain = (domainSlug: Profile['domainSlug']): Profile[] =>
    profiles.filter((p) => p.domainSlug === domainSlug);

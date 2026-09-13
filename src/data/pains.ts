/**
 * Poesis pain graph — the systemic mapping between buyer pain points and the
 * features / products / solutions that address them, per domain.
 *
 * This is the coherence spine of the site's information architecture:
 *   Domain → Pains (why) → addressedBy → Features (what) → Products → Solutions.
 *
 * Domain pages render pains (pain-first cards, each linking to the addressing
 * features); product pages render the reverse lookup ("pain points this product
 * addresses", linking back to the domain page). All edges are validated at
 * module load — a dangling reference fails the build.
 */
import { poesisPortfolio, type Solution, type ProductDef, type Feature } from './poesis-portfolio.ts';
import { domains } from './domains.ts';

export interface FeatureRef {
    solution: string;
    product: string;
    feature: string;
}

export interface Pain {
    id: string;
    domainSlug: 'it';
    /** Which thesis phase the pain surfaces in: the historical THINK pathology, or its GenAI-era form. */
    phase: 'legacy' | 'genai';
    /** Practice/concern label — mirrors the domain page card tags. */
    tag: string;
    /** The pain, stated in the buyer's words. Card title. */
    pain: string;
    /** What the pain costs today. */
    cost: string;
    /** The outcome once governed definitions address it. */
    remedy: string;
    addressedBy: FeatureRef[];
}

export interface ResolvedFeature {
    solution: Solution;
    product: ProductDef;
    feature: Feature;
}

export const pains: Pain[] = [
    // ---- Poesis for IT ----------------------------------------------------
    {
        id: 'it-ea-drift',
        domainSlug: 'it',
        phase: 'legacy',
        tag: 'Enterprise architecture',
        pain: 'The architecture repository is out of date the day it\u2019s written.',
        cost: 'Hand-maintained models detach from the territory the moment delivery moves on \u2014 and every decision made on them inherits the drift.',
        remedy: 'The landscape becomes a governed inventory of typed definitions, sourced from the code, contracts, and infrastructure that actually run.',
        addressedBy: [
            { solution: 'itip', product: 'web-application', feature: 'definitions-management' },
            { solution: 'itip', product: 'definition-blackboard-code-sourcer', feature: 'automatic-sourcing-from-code-repos' },
        ],
    },
    {
        id: 'it-audit-reconstruction',
        domainSlug: 'it',
        phase: 'legacy',
        tag: 'Compliance automation',
        pain: 'Compliance is reconstructed in spreadsheets before every audit.',
        cost: 'Posture exists only at audit time; between audits, nobody can answer what is actually covered.',
        remedy: 'Continuous appraisal indicators compute measures and findings from the model \u2014 GDPR, NIS2, DORA, ISO as a live dashboard.',
        addressedBy: [
            { solution: 'itip', product: 'web-application', feature: 'it-compliance-evaluation' },
            { solution: 'itip', product: 'web-application', feature: 'ontology-management' },
        ],
    },
    {
        id: 'it-blind-change',
        domainSlug: 'it',
        phase: 'legacy',
        tag: 'Impact analysis',
        pain: 'Impact analysis is a guess made in a meeting.',
        cost: 'Coupling is discovered in incident reviews, after the change shipped.',
        remedy: 'Changes ripple through typed relations, so impact is simulated from the model \u2014 traced through the definitions it touches.',
        addressedBy: [
            { solution: 'itip', product: 'web-application', feature: 'it-impact-simulation' },
        ],
    },
    {
        id: 'it-handcrafted-deliverables',
        domainSlug: 'it',
        phase: 'legacy',
        tag: 'Artifact generation',
        pain: 'Every deliverable is hand-crafted, again and again.',
        cost: 'ADR packs, evidence, baselines, and roadmaps are rebuilt by hand \u2014 and stale against each other by the time they ship.',
        remedy: 'Deliverables are generated from the definitions, each artifact traceable back to the exact definitions it derives from.',
        addressedBy: [
            { solution: 'itip', product: 'web-application', feature: 'it-artifact-factory' },
        ],
    },
    {
        id: 'it-truth-drift',
        domainSlug: 'it',
        phase: 'legacy',
        tag: 'Truth sourcing',
        pain: 'Governance drifts from what actually runs.',
        cost: 'The declared estate and the running estate diverge silently \u2014 until an audit or an incident exposes the gap.',
        remedy: 'A bench of knowledge sources continuously reads repositories, API contracts, SBOMs, and infrastructure and posts evidence-backed, confidence-scored contributions.',
        addressedBy: [
            { solution: 'itip', product: 'definition-blackboard-code-sourcer', feature: 'automatic-sourcing-from-code-repos' },
            { solution: 'itip', product: 'web-application', feature: 'definitions-truth-sourcing-management' },
        ],
    },
    {
        id: 'it-ai-blindness',
        domainSlug: 'it',
        phase: 'genai',
        tag: 'AI-ready governance',
        pain: 'AI agents act on stale wikis and tribal knowledge.',
        cost: 'Without a trustworthy machine-readable source of truth, agent autonomy is either blocked or reckless.',
        remedy: 'Every definition is typed by a GSM Archetype \u2014 humans and AI agents reason and generate from the same governed account of what your systems are and must do.',
        addressedBy: [
            { solution: 'itip', product: 'web-application', feature: 'definitions-management' },
            { solution: 'sie', product: 'definition-manager', feature: 'definitions-management-api' },            { solution: 'sie', product: 'definition-manager', feature: 'mcp' },
        ],
    },
    {
        id: 'it-ungoverned-change',
        domainSlug: 'it',
        phase: 'legacy',
        tag: 'Change governance',
        pain: 'Anything can change anything — there is no approval trail.',
        cost: 'Definitions, standards, and obligations mutate without review; who approved what, and when, is unanswerable.',
        remedy: 'Every governed change is a validated lifecycle transition — proposed, approved, activated, retired — with the full history retained as the audit trail.',
        addressedBy: [
            { solution: 'sie', product: 'definition-manager', feature: 'definitions-lifecycle-enforcement' },
            { solution: 'sie', product: 'definition-manager', feature: 'definitions-retention' },
        ],
    },
    {
        id: 'it-framework-collision',
        domainSlug: 'it',
        phase: 'legacy',
        tag: 'Framework composition',
        pain: 'Every framework lives in its own silo — and they collide on your desk.',
        cost: 'TOGAF, ISO, GDPR, and NIS2 each demand their own registry and their own reconciliation; overlaps and conflicts are discovered by accident.',
        remedy: 'Source models are represented in one typed ontology catalogue and composed through the governance layer — overlaps and conflicts surface in the composer, not in audits.',
        addressedBy: [
            { solution: 'itip', product: 'web-application', feature: 'ontology-management' },
            { solution: 'gsm', product: 'ontology', feature: 'togaf' },
        ],
    },
    {
        id: 'it-governance-lockin',
        domainSlug: 'it',
        phase: 'legacy',
        tag: 'Vendor neutrality',
        pain: 'Your governance model is trapped in a vendor’s proprietary format.',
        cost: 'Obligations, architecture, and compliance mappings live in tool-specific silos — migrating tools means re-authoring your governance.',
        remedy: 'Definitions follow a vendor-neutral standard — typed, portable, and machine-readable across tools — so the model outlives any product choice, and the unlock compounds with every vendor that adopts it.',
        addressedBy: [
            { solution: 'gsm', product: 'specifications', feature: 'primitives' },
            { solution: 'gsm', product: 'specifications', feature: 'archetyping' },
        ],
    },
    {
        id: 'it-tool-silos',
        domainSlug: 'it',
        phase: 'legacy',
        tag: 'Interoperability',
        pain: 'Architecture, compliance, and quality tools don’t speak to each other.',
        cost: 'Each tool keeps its own model of the same IT reality; integrations are bespoke mappings that rot, and knowledge stays siloed per tool and per team.',
        remedy: 'One vendor-neutral vocabulary and grammar — the OpenTelemetry move, applied to THINK: tools and solutions interoperate through the same typed definitions, and the silos between them fall.',
        addressedBy: [
            { solution: 'gsm', product: 'specifications', feature: 'primitives' },
            { solution: 'gsm', product: 'specifications', feature: 'archetyping' },
            { solution: 'gsm', product: 'specifications', feature: 'dna-grammar' },
        ],
    },
    {
        id: 'it-ungoverned-agents',
        domainSlug: 'it',
        phase: 'genai',
        tag: 'Agentic delivery',
        pain: 'AI agents ship work nobody scoped, gated, or can replay.',
        cost: 'Agentic delivery state is trapped in chat sessions; pull requests appear without a mandate; there is no event log and no human authority at the layer where it matters.',
        remedy: 'Delivery runs as governed workflows with a human gate at every layer — every step authorized, every artifact validated, every action journaled in your own git history.',
        addressedBy: [
            { solution: 'saf', product: 'agentic-harness', feature: 'step-authorization' },
            { solution: 'saf', product: 'agentic-harness', feature: 'artifact-validation' },
            { solution: 'saf', product: 'safe-agentic-organization', feature: 'workflows' },        ],
    },
];

/** Resolve a feature reference to its full solution/product/feature objects. Throws on dangling refs. */
export function resolveFeatureRef(ref: FeatureRef): ResolvedFeature {
    const solution = poesisPortfolio.find((s) => s.slug === ref.solution);
    if (!solution) throw new Error(`pains.ts: unknown solution '${ref.solution}'`);
    const product = solution.products.find((p) => p.slug === ref.product);
    if (!product) throw new Error(`pains.ts: unknown product '${ref.solution}/${ref.product}'`);
    const feature = product.features.find((f) => f.slug === ref.feature);
    if (!feature) throw new Error(`pains.ts: unknown feature '${ref.solution}/${ref.product}#${ref.feature}'`);
    return { solution, product, feature };
}

export const painsForDomain = (domainSlug: Pain['domainSlug']): Pain[] =>
    pains.filter((p) => p.domainSlug === domainSlug);

/** The pains that surface in a given thesis phase, for the THINK bottleneck diagram. */
export const painsForPhase = (phase: Pain['phase']): Pain[] =>
    pains.filter((p) => p.phase === phase);

/** Reverse lookup: the pains a given product addresses (via any of its features). */
export const painsForProduct = (solutionSlug: string, productSlug: string): Pain[] =>
    pains.filter((p) =>
        p.addressedBy.some((ref) => ref.solution === solutionSlug && ref.product === productSlug)
    );

export const domainHref = (domainSlug: Pain['domainSlug']): string => {
    const domain = domains.find((d) => d.slug === domainSlug);
    if (!domain) throw new Error(`pains.ts: unknown domain '${domainSlug}'`);
    return domain.href;
};

// ---- Coherence gate (runs at build time) -----------------------------------
for (const pain of pains) {
    if (pain.addressedBy.length === 0) {
        throw new Error(`pains.ts: pain '${pain.id}' is addressed by no feature`);
    }
    domainHref(pain.domainSlug);
    for (const ref of pain.addressedBy) {
        resolveFeatureRef(ref);
        const domain = domains.find((d) => d.slug === pain.domainSlug);
        if (domain?.solutions && !domain.solutions.includes(ref.solution)) {
            throw new Error(
                `pains.ts: pain '${pain.id}' (domain '${pain.domainSlug}') references solution '${ref.solution}' not delivered in that domain`
            );
        }
    }
}

// Every feature must be grounded: referenced by >=1 product value or >=1 pain.
for (const sol of poesisPortfolio) {
    for (const prod of sol.products) {
        for (const feat of prod.features) {
            const inValue = prod.values.some((v) => v.relations.features.includes(feat.slug));
            const inPain = pains.some((p) =>
                p.addressedBy.some((r) => r.solution === sol.slug && r.product === prod.slug && r.feature === feat.slug)
            );
            if (!inValue && !inPain) {
                throw new Error(
                    `pains.ts: feature '${sol.slug}/${prod.slug}#${feat.slug}' is referenced by no value and no pain — ground it or remove it`
                );
            }
        }
    }
}

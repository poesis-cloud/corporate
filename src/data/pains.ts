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
import { solutions, type Solution, type ProductDef, type Feature } from './solutions.ts';
import { domains } from './domains.ts';

export interface FeatureRef {
    solution: string;
    product: string;
    feature: string;
}

export interface Pain {
    id: string;
    domainSlug: 'it' | 'research';
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
        tag: 'Compliance automation',
        pain: 'Compliance is reconstructed in spreadsheets before every audit.',
        cost: 'Posture exists only at audit time; between audits, nobody can answer what is actually covered.',
        remedy: 'Continuous appraisal indicators compute measures and findings from the model \u2014 GDPR, NIS2, DORA, ISO as a live dashboard.',
        addressedBy: [
            { solution: 'itip', product: 'web-application', feature: 'it-compliance-evaluation' },
            { solution: 'itip', product: 'web-application', feature: 'frameworks-management' },
        ],
    },
    {
        id: 'it-blind-change',
        domainSlug: 'it',
        tag: 'Impact analysis',
        pain: 'The blast radius of a change is guessed in a meeting.',
        cost: 'Coupling is discovered in incident reviews, after the change shipped.',
        remedy: 'Changes ripple through typed relations, so impact is simulated from the model \u2014 traced through the definitions it touches.',
        addressedBy: [
            { solution: 'itip', product: 'web-application', feature: 'it-impact-simulation' },
        ],
    },
    {
        id: 'it-handcrafted-deliverables',
        domainSlug: 'it',
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
        tag: 'AI-ready governance',
        pain: 'AI agents act on stale wikis and tribal knowledge.',
        cost: 'Without a trustworthy machine-readable source of truth, agent autonomy is either blocked or reckless.',
        remedy: 'Every definition is typed by a GSM Archetype \u2014 humans and AI agents reason and generate from the same governed account of what your systems are and must do.',
        addressedBy: [
            { solution: 'itip', product: 'web-application', feature: 'definitions-management' },
            { solution: 'sie', product: 'definition-manager', feature: 'definitions-management-api' },
        ],
    },
    // ---- Poesis for Research ----------------------------------------------
    {
        id: 'rs-no-ontology',
        domainSlug: 'research',
        tag: 'Ontology',
        pain: 'Semantics carried only in prose bind no one.',
        cost: 'What a hypothesis, a budget, a review, or a deadline is must be defined before any process can be held to it.',
        remedy: 'GSM supplies the explicit ontology and governance grammar \u2014 the definitions obligations are expressed against.',
        addressedBy: [
            { solution: 'gsm', product: 'specifications', feature: 'primitives' },
            { solution: 'gsm', product: 'specifications', feature: 'dna-grammar' },
        ],
    },
    {
        id: 'rs-lost-identity',
        domainSlug: 'research',
        tag: 'Identity & lifecycle',
        pain: 'Hypotheses are silently abandoned \u2014 retirement leaves no record.',
        cost: 'Research objects die with the trajectory or the context window that held them.',
        remedy: 'Research objects persist with attributable, ordered state changes \u2014 what was retired remains a re-openable identity.',
        addressedBy: [
            { solution: 'sie', product: 'definition-manager', feature: 'definitions-lifecycle-enforcement' },
            { solution: 'sie', product: 'definition-manager', feature: 'definitions-retention' },
        ],
    },
    {
        id: 'rs-unqualified-claims',
        domainSlug: 'research',
        tag: 'Qualified evidence',
        pain: 'Claims enter the record without provenance or confidence.',
        cost: 'Every downstream decision inherits unqualified evidence as if it were fact.',
        remedy: 'An observation enters the institution with its confidence and provenance attached \u2014 qualification makes a claim governable.',
        addressedBy: [
            { solution: 'sie', product: 'definition-blackboard-manager', feature: 'ks-contributions-management-api' },
        ],
    },
    {
        id: 'rs-unevaluable-rules',
        domainSlug: 'research',
        tag: 'Evaluable norms',
        pain: 'Deviation and violation are indistinguishable until someone judges.',
        cost: 'An hour of idleness violates nothing; chronic neglect of a mandate does \u2014 prose rules cannot tell them apart.',
        remedy: 'Norms carry temporal tolerance and render the difference as a verdict, not an impression.',
        addressedBy: [
            { solution: 'sie', product: 'operator', feature: 'norms-evaluation-api' },
        ],
    },
    {
        id: 'rs-self-judging',
        domainSlug: 'research',
        tag: 'Separation of powers',
        pain: 'The process measures, judges, and enforces itself.',
        cost: 'A self-evaluating loop is precisely the ungoverned condition being remedied.',
        remedy: 'Measurement, judgment, and enforcement are distinct primitives, by design \u2014 evaluated and dispatched separately.',
        addressedBy: [
            { solution: 'sie', product: 'operator', feature: 'norms-evaluation-api' },
            { solution: 'sie', product: 'operator', feature: 'mechanisms-execution-api' },
        ],
    },
    {
        id: 'rs-unrecomputable-record',
        domainSlug: 'research',
        tag: 'Deterministic record',
        pain: 'Whether an obligation was met is archaeology over logs.',
        cost: 'The history of decisions, evidence, and verdicts is scattered across chat scrollback and dashboards.',
        remedy: 'Verdicts have exactly one answer, computable from the definitions and the record \u2014 the substrate\u2019s own queryable state.',
        addressedBy: [
            { solution: 'sie', product: 'definition-manager', feature: 'definitions-retention' },
            { solution: 'sie', product: 'definition-blackboard-manager', feature: 'ks-contributions-retention' },
        ],
    },
];

/** Resolve a feature reference to its full solution/product/feature objects. Throws on dangling refs. */
export function resolveFeatureRef(ref: FeatureRef): ResolvedFeature {
    const solution = solutions.find((s) => s.slug === ref.solution);
    if (!solution) throw new Error(`pains.ts: unknown solution '${ref.solution}'`);
    const product = solution.products.find((p) => p.slug === ref.product);
    if (!product) throw new Error(`pains.ts: unknown product '${ref.solution}/${ref.product}'`);
    const feature = product.features.find((f) => f.slug === ref.feature);
    if (!feature) throw new Error(`pains.ts: unknown feature '${ref.solution}/${ref.product}#${ref.feature}'`);
    return { solution, product, feature };
}

export const painsForDomain = (domainSlug: Pain['domainSlug']): Pain[] =>
    pains.filter((p) => p.domainSlug === domainSlug);

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

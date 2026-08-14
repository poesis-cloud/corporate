/**
 * Poesis alternative/comparison pages — one entry per named competitor, rendered at
 * /it/alternatives/{slug}/. Claims are category-level (how the tool class approaches the
 * problem), never feature-by-feature assertions about the competitor's product. Each page
 * claims one "X alternative" keyword in strategy/seo.md — update the register in the same change.
 */

export interface CompareRow {
    dimension: string;
    them: string;
    poesis: string;
}

export interface Alternative {
    slug: string;
    name: string;
    trademarkNote: string;
    category: string;
    keyword: string;
    title: string;
    description: string;
    h1: string;
    lead: string;
    strengths: string;
    differenceIntro: string;
    themLabel: string;
    rows: CompareRow[];
    whenThem: string;
    whenPoesis: string;
    /** When set, the page closes on an integrate-rather-than-compete callout. */
    integrationNote?: string;
}

export const alternatives: Alternative[] = [
    {
        slug: 'leanix',
        name: 'LeanIX',
        trademarkNote:
            'LeanIX is a trademark of LeanIX GmbH (an SAP company). Poesis is not affiliated with, endorsed by, or sponsored by LeanIX or SAP.',
        category: 'enterprise architecture management',
        keyword: 'LeanIX alternative',
        title: 'LeanIX Alternative — IT Governance Platform',
        description:
            'Considering a LeanIX alternative? Compare the EA-repository approach with Poesis: definitions sourced from what actually runs, continuously evaluated against obligations.',
        h1: 'A LeanIX alternative where the repository cannot drift',
        lead:
            'EA management tools like LeanIX gave enterprise architecture a shared repository and a common language. Poesis for IT starts from a different premise: the architecture model should be a governed definition of the estate — sourced from the systems that actually run, and continuously evaluated against the obligations that bind them.',
        strengths:
            'The EA-repository category — of which LeanIX is a leading example — excels at giving architects a curated inventory, portfolio reports, and a shared vocabulary for application landscapes. If your need is an architect-maintained catalog with strong reporting, the category serves it well.',
        differenceIntro:
            'The difference is not feature count — it is what the model *is*. A repository describes the landscape as architects record it; a governed definition is typed, sourced from reality, and evaluated continuously.',
        themLabel: 'EA repository approach',
        rows: [
            {
                dimension: 'Source of truth',
                them: 'Inventory recorded and maintained by architects (surveys, imports, curation)',
                poesis: 'Definitions continuously sourced from code, API contracts, SBOMs, and infrastructure — with confidence and provenance',
            },
            {
                dimension: 'Drift',
                them: 'Detected when someone notices the map no longer matches the territory',
                poesis: 'Observed the moment it appears — declared definitions are reconciled against the running system',
            },
            {
                dimension: 'Obligations',
                them: 'Standards and policies referenced as documents alongside the model',
                poesis: 'Directives and Norms are governed definitions — machine-evaluable, with verdicts computed from the model',
            },
            {
                dimension: 'Impact of change',
                them: 'Read from diagrams and dependency views',
                poesis: 'Simulated through typed relations — blast radius traced before you commit',
            },
            {
                dimension: 'AI-readiness',
                them: 'Reports and exports for human consumption',
                poesis: 'Every definition typed by a GSM Archetype — a governed context humans and AI agents act on',
            },
        ],
        whenThem:
            'If you want a curated, architect-owned application portfolio with mature reporting and a large ecosystem, the established EA category is a safe choice.',
        whenPoesis:
            'If you need the model to stay true to what actually runs, obligations to be evaluated continuously rather than audited annually, and a source of truth AI agents can act on — that is what Poesis for IT is built for.',
        integrationNote:
            'For many estates this is not either/or: an EA repository is a curated account of intent, and intent is an input. Poesis can treat it as a knowledge source — checked continuously against what the code, contracts, and infrastructure say is actually true.',
    },
    {
        slug: 'vanta',
        name: 'Vanta',
        trademarkNote:
            'Vanta is a trademark of Vanta Inc. Poesis is not affiliated with, endorsed by, or sponsored by Vanta.',
        category: 'compliance automation',
        keyword: 'Vanta alternative',
        title: 'Vanta Alternative — Continuous Compliance From the Model',
        description:
            'Considering a Vanta alternative? Compare checklist-based compliance automation with Poesis: posture computed continuously from a governed model of your estate — GDPR, NIS2, DORA, ISO.',
        h1: 'A Vanta alternative where compliance is computed, not checked',
        lead:
            'Compliance automation tools like Vanta made audit preparation dramatically less painful by automating evidence collection against control checklists. Poesis for IT goes one layer deeper: your regulatory posture is computed continuously from a governed definition of the estate itself.',
        strengths:
            'The compliance-automation category — of which Vanta is a leading example — excels at streamlining certification audits: integrations that collect evidence, prebuilt control frameworks, and auditor workflows. For getting to a SOC 2 or ISO 27001 attestation fast, the category serves that intent well.',
        differenceIntro:
            'The difference is the object being checked. Checklist automation verifies that declared controls have evidence; Poesis evaluates whether the system, as defined and observed, satisfies its obligations.',
        themLabel: 'Compliance-automation approach',
        rows: [
            {
                dimension: 'Unit of compliance',
                them: 'A control on a checklist, with evidence attached',
                poesis: 'A Norm bound to governed definitions — machine-evaluable, with deterministic verdicts',
            },
            {
                dimension: 'Coverage model',
                them: 'Prebuilt certification frameworks (SOC 2, ISO 27001, …)',
                poesis: 'A composable catalog of frameworks sourced into GSM — GDPR, NIS2, DORA, ISO — evaluated on the same model',
            },
            {
                dimension: 'Relation to the estate',
                them: 'Integrations sample evidence from tools',
                poesis: 'The estate itself is defined and sourced — findings trace to the exact definitions and revisions they derive from',
            },
            {
                dimension: 'Between audits',
                them: 'Monitors control status for the next attestation',
                poesis: 'Appraisal indicators computed continuously — posture is a live dashboard, not an audit artifact',
            },
            {
                dimension: 'Beyond compliance',
                them: 'Purpose-built for certification',
                poesis: 'The same governed model drives architecture, impact simulation, artifact generation, and AI-agent context',
            },
        ],
        whenThem:
            'If your goal is a fast, well-supported path to a specific attestation, the compliance-automation category is purpose-built for it.',
        whenPoesis:
            'If compliance is one facet of governing your estate — and you want posture computed from the same governed model that drives architecture and AI enablement — that is Poesis for IT.',
    },
    {
        slug: 'backstage',
        name: 'Backstage',
        trademarkNote:
            'Backstage is an open-source project created by Spotify and hosted by the CNCF. Poesis is not affiliated with, endorsed by, or sponsored by Spotify or the CNCF.',
        category: 'internal developer portal',
        keyword: 'Backstage alternative',
        title: 'Backstage Alternative — Governed Definitions, Not Just a Catalog',
        description:
            'Considering a Backstage alternative — or a governance layer above it? Compare the developer-portal catalog with Poesis: typed, governed definitions with lifecycle, obligations, and verdicts.',
        h1: 'Beyond the service catalog: definitions that govern',
        lead:
            'Internal developer portals like Backstage gave platform teams a service catalog and a home for golden paths. Poesis for IT addresses the layer a catalog does not: what services are *obliged* to be — typed definitions with lifecycle, ownership, and machine-evaluable obligations.',
        strengths:
            'The developer-portal category — of which Backstage is the reference open-source example — excels at developer experience: a searchable service catalog, scaffolding templates, and plugin-based tooling integration. As a developer home page, the category serves that intent well.',
        differenceIntro:
            'The difference is descriptive versus definitional. A catalog entry describes a service for humans browsing it; a governed definition types it, binds obligations to it, and is evaluated against how the service actually behaves. The two can coexist — a catalog is a natural sourcing input.',
        themLabel: 'Developer-portal approach',
        rows: [
            {
                dimension: 'Catalog entry',
                them: 'Metadata registered per service, maintained by teams',
                poesis: 'Typed definitions sourced from code, contracts, SBOMs, and infrastructure — evidence-backed, confidence-scored',
            },
            {
                dimension: 'Governance',
                them: 'Conventions and scorecards layered on top',
                poesis: 'Directives and Norms are first-class governed definitions with lifecycle and deterministic verdicts',
            },
            {
                dimension: 'Audience',
                them: 'Developers navigating the platform',
                poesis: 'Every IT profile — architects, ops, security, compliance — and AI agents, on one governed model',
            },
            {
                dimension: 'Compliance',
                them: 'Out of scope',
                poesis: 'Continuous appraisal against GDPR, NIS2, DORA, ISO — computed from the same model',
            },
            {
                dimension: 'Coexistence',
                them: '—',
                poesis: 'A portal catalog can serve as a knowledge source feeding the governed model',
            },
        ],
        whenThem:
            'If you need a developer home page — catalog, templates, docs — the developer-portal category is the right tool, and it can feed Poesis.',
        whenPoesis:
            'If you need the governance layer — obligations with owners, posture computed continuously, definitions AI agents can act on — that is Poesis for IT, alongside or above your portal.',
        integrationNote:
            'Backstage is less an alternative than a neighbor: the catalog teams already maintain is a natural knowledge source for the governed model, and golden paths can consume governed definitions. Keep the portal — Poesis governs what it describes.',
    },
    {
        slug: 'servicenow',
        name: 'ServiceNow',
        trademarkNote:
            'ServiceNow is a trademark of ServiceNow, Inc. Poesis is not affiliated with, endorsed by, or sponsored by ServiceNow.',
        category: 'ITSM / CMDB platform',
        keyword: 'ServiceNow CMDB alternative',
        title: 'ServiceNow CMDB Alternative — Governed Definitions, Not Configuration Items',
        description:
            'Looking at ServiceNow CMDB alternatives for configuration truth and governance? Compare CI records with Poesis: typed, governed definitions sourced from what actually runs.',
        h1: 'A CMDB alternative where the record is a governed definition',
        lead:
            'ITSM platforms like ServiceNow run the operational workflows of IT — incidents, changes, requests — around a CMDB of configuration items. Poesis for IT addresses what the CI record cannot carry: a typed, governed definition of the estate with obligations, lifecycle, and machine-evaluable verdicts.',
        strengths:
            'The ITSM category — of which ServiceNow is the leading example — excels at operational workflow at enterprise scale: incident, change, and request management with a CMDB at the center and a vast integration ecosystem. For running IT operations processes, the category is the established choice.',
        differenceIntro:
            'The difference is what the central record *is*. A configuration item describes an asset for workflow routing; a governed definition types the asset, binds its obligations, and is continuously evaluated against how the estate actually runs. The two can coexist — workflows can consume the governed model.',
        themLabel: 'ITSM / CMDB approach',
        rows: [
            {
                dimension: 'Unit of record',
                them: 'A configuration item — discovered or registered, described for workflow routing',
                poesis: 'A typed, governed definition with identity, lifecycle, and ownership',
            },
            {
                dimension: 'How truth arrives',
                them: 'Discovery scans and manual registration — famously prone to staleness',
                poesis: 'Continuous sourcing from code, API contracts, SBOMs, and infrastructure — confidence-scored, provenance-backed',
            },
            {
                dimension: 'Obligations',
                them: 'Policies encoded in workflow rules and approval chains',
                poesis: 'Directives and Norms as governed definitions — machine-evaluable, with deterministic verdicts',
            },
            {
                dimension: 'Change',
                them: 'CAB workflows and approval gates',
                poesis: 'Impact simulated through typed relations before the change is committed',
            },
            {
                dimension: 'Compliance',
                them: 'GRC modules reporting on declared controls',
                poesis: 'Posture computed continuously from the governed model — GDPR, NIS2, DORA, ISO',
            },
            {
                dimension: 'Coexistence',
                them: '—',
                poesis: 'ITSM workflows can operate on — and stay consistent with — the governed model',
            },
        ],
        whenThem:
            'If you need enterprise-scale operational workflows — incidents, changes, requests — the ITSM category is purpose-built for it.',
        whenPoesis:
            'If the question is what your estate is and what it must comply with — answered continuously, from reality, in a form AI agents can act on — that is Poesis for IT, beside your ITSM.',
        integrationNote:
            'In practice Poesis completes an ITSM estate rather than competing with it: the governed model gives workflows a definition layer to operate on, and a CMDB is a natural knowledge source to reconcile against reality. Keep the workflows — Poesis governs what they act on.',
    },
];

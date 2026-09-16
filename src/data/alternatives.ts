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
            'Considering a LeanIX alternative? Compare your EA requirements with Poesis definition foundations and planned sourcing, appraisal and analysis.',
        h1: 'LeanIX Alternative — IT Governance Platform',
        lead:
            'Evaluate an established EA offering against your requirements and the bounded Poesis roadmap. ITIP inventory, sourcing, appraisal and simulation are planned; inspectable foundations are not an operated replacement.',
        strengths:
            'The EA-repository category — of which LeanIX is a leading example — excels at giving architects a curated inventory, portfolio reports, and a shared vocabulary for application landscapes. If your need is an architect-maintained catalog with strong reporting, the category serves it well.',
        differenceIntro:
            'Poesis explores explicit typed intent and evidence-linked definitions. The comparison dimensions below are evaluation questions, not verified limitations of any current vendor edition.',
        themLabel: 'EA repository approach',
        rows: [
            {
                dimension: 'Source of truth',
                them: 'Inventory recorded and maintained by architects (surveys, imports, curation)',
                poesis: 'Planned direct authoring or reviewed repository sourcing; code and configuration are not deployed observations',
            },
            {
                dimension: 'Drift',
                them: 'Verify discovery, freshness and reconciliation coverage for the selected edition and integrations',
                poesis: 'Planned correspondence checks need deployment identity, freshness, observation coverage and unknown-state handling',
            },
            {
                dimension: 'Obligations',
                them: 'Standards and policies referenced as documents alongside the model',
                poesis: 'Selected vocabulary exists; binding and complete supplied-instance Norm verdicts remain planned',
            },
            {
                dimension: 'Impact of change',
                them: 'Read from diagrams and dependency views',
                poesis: 'Planned bounded impact analysis; reachability is not causal simulation',
            },
            {
                dimension: 'AI-readiness',
                them: 'Verify current APIs, context interfaces and authorization contracts',
                poesis: 'Typed definition foundations; authorized read-only context and copilot integration remain planned',
            },
        ],
        whenThem:
            'If you want a curated, architect-owned application portfolio with mature reporting and a large ecosystem, the established EA category is a safe choice.',
        whenPoesis:
            'Consider a bounded pilot when explicit intent, provenance and typed context are the hypothesis to test, with capacity to integrate planned workflows and measure results.',
        integrationNote:
            'An EA repository could be a curated input. A connector, identity mapping, authorization and review contract would need implementation; no live integration is asserted.',
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
            'Considering a Vanta alternative? Evaluate compliance requirements against Poesis selected obligation content and planned evidence-linked appraisal.',
        h1: 'Vanta Alternative — Continuous Compliance From the Model',
        lead:
            'Continuous compliance is a Poesis target, not an available legal assurance. Selected content exists; applicability, evidence collection, appraisal and scheduling need integration and acceptance.',
        strengths:
            'The compliance-automation category — of which Vanta is a leading example — excels at streamlining certification audits: integrations that collect evidence, prebuilt control frameworks, and auditor workflows. For getting to a SOC 2 or ISO 27001 attestation fast, the category serves that intent well.',
        differenceIntro:
            'Compare obligation applicability, evidence lineage and unknown-state handling. Vendor capabilities require current, edition-specific verification; Poesis source content alone does not establish those workflows.',
        themLabel: 'Compliance-automation approach',
        rows: [
            {
                dimension: 'Unit of compliance',
                them: 'A control on a checklist, with evidence attached',
                poesis: 'Planned supported Norm evaluation of identified inputs; no legal conclusion beyond the evaluated contract',
            },
            {
                dimension: 'Coverage model',
                them: 'Prebuilt certification frameworks (SOC 2, ISO 27001, …)',
                poesis: 'Selected GDPR/NIS2 templates and ISO quality vocabulary; DORA and integrated appraisal remain planned',
            },
            {
                dimension: 'Relation to the estate',
                them: 'Integrations sample evidence from tools',
                poesis: 'Planned provenance-linked findings; observed state must be joined to definitions explicitly',
            },
            {
                dimension: 'Between audits',
                them: 'Monitors control status for the next attestation',
                poesis: 'Planned continuous appraisal with coverage, delay and unavailable evidence visible',
            },
            {
                dimension: 'Beyond compliance',
                them: 'Purpose-built for certification',
                poesis: 'Shared definitions are intended to support planned architecture, analysis, generation and AI context routes',
            },
        ],
        whenThem:
            'If your goal is a fast, well-supported path to a specific attestation, the compliance-automation category is purpose-built for it.',
        whenPoesis:
            'Consider a scoped research or integration pilot when evidence-linked definitions are the target; do not substitute planned appraisal for an operated assurance workflow.',
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
        h1: 'Backstage Alternative — Governed Definitions, Not Just a Catalog',
        lead:
            'Poesis explores explicit definitions and obligation contracts alongside developer portals. Definition controls are partial; sourcing, complete verdicts and portal integrations remain planned.',
        strengths:
            'The developer-portal category — of which Backstage is the reference open-source example — excels at developer experience: a searchable service catalog, scaffolding templates, and plugin-based tooling integration. As a developer home page, the category serves that intent well.',
        differenceIntro:
            'Compare the contracts required by your portal and governance tasks. Plugins and local extensions vary; this is not evidence that Backstage cannot support a particular governance requirement.',
        themLabel: 'Developer-portal approach',
        rows: [
            {
                dimension: 'Catalog entry',
                them: 'Metadata registered per service, maintained by teams',
                poesis: 'Planned typed authoring and reviewed sourcing with scoped evidence and uncertainty',
            },
            {
                dimension: 'Governance',
                them: 'Conventions and scorecards layered on top',
                poesis: 'Directive/Norm vocabulary and partial lifecycle controls; complete verdict and authority integration remains planned',
            },
            {
                dimension: 'Audience',
                them: 'Developers navigating the platform',
                poesis: 'Intended shared context for selected IT and AI tasks; end-to-end workflows need acceptance',
            },
            {
                dimension: 'Compliance',
                them: 'Verify installed plugins, integrations and evidence contracts',
                poesis: 'Planned appraisal against selected applicable obligations, not automatic regulatory compliance',
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
            'Consider Poesis for a bounded definition-governance pilot; treat continuous appraisal and authorized AI context as planned integrations.',
        integrationNote:
            'A portal catalogue could supply candidate context, and templates could consume accepted definitions. Connectors, pinning and authority boundaries must be implemented and tested first.',
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
            'Looking at ServiceNow CMDB alternatives? Compare your record and evidence requirements with Poesis definition foundations and planned integration routes.',
        h1: 'ServiceNow CMDB Alternative — Governed Definitions, Not Configuration Items',
        lead:
            'Poesis explores typed definitions and explicit obligations beside ITSM workflows. It is not an operated replacement for incident, change or configuration management; integrations and complete verdicts remain planned.',
        strengths:
            'The ITSM category — of which ServiceNow is the leading example — excels at operational workflow at enterprise scale: incident, change, and request management with a CMDB at the center and a vast integration ecosystem. For running IT operations processes, the category is the established choice.',
        differenceIntro:
            'Evaluate record identity, provenance, obligation binding and workflow authority. Current ServiceNow editions and integrations require independent verification; no categorical limitation is inferred from a product label.',
        themLabel: 'ITSM / CMDB approach',
        rows: [
            {
                dimension: 'Unit of record',
                them: 'A configuration item — discovered or registered, described for workflow routing',
                poesis: 'A typed, governed definition with identity, lifecycle, and ownership',
            },
            {
                dimension: 'How truth arrives',
                them: 'Verify discovery and registration freshness for your configured sources',
                poesis: 'Planned reviewed sourcing; source state and deployed observations remain distinct',
            },
            {
                dimension: 'Obligations',
                them: 'Policies encoded in workflow rules and approval chains',
                poesis: 'Selected obligation vocabulary; binding and complete supported verdicts remain planned',
            },
            {
                dimension: 'Change',
                them: 'CAB workflows and approval gates',
                poesis: 'Planned bounded impact analysis with explicit assumptions and validation',
            },
            {
                dimension: 'Compliance',
                them: 'GRC modules reporting on declared controls',
                poesis: 'Planned evidence-linked appraisal; vocabulary availability does not establish legal coverage',
            },
            {
                dimension: 'Coexistence',
                them: '—',
                poesis: 'A potential integration route requiring tested identity, authority and synchronization contracts',
            },
        ],
        whenThem:
            'If you need enterprise-scale operational workflows — incidents, changes, requests — the ITSM category is purpose-built for it.',
        whenPoesis:
            'Consider a bounded pilot for explicit intent and evidence-linked context beside existing ITSM, with planned features and integration effort included in the decision.',
        integrationNote:
            'A CMDB could be a curated source and workflows could consume accepted definitions. That coexistence is a design option, not a delivered consistency guarantee.',
    },
];

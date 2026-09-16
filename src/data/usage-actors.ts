export interface ActorType {
    /** Stable public identity, used in query parameters and derived anchors. */
    slug: string;
    kind: 'human' | 'system';
    domainSlug: 'it';
    name: string;
    tags: string[];
    /** Icon name from components/Icon.astro. */
    icon: string;
    hook: string;
    body: string;
}

export const actorTypes: ActorType[] = [
    {
        slug: 'it-service-owner', kind: 'human', domainSlug: 'it', name: 'IT service owner',
        tags: ['Service management', 'Accountability'], icon: 'briefcase',
        hook: 'Accept service commitments against dependencies and evidence.',
        body: 'Own service outcomes, agree operating boundaries, and coordinate affected owners during changes, incidents and recovery reviews.',
    },
    {
        slug: 'it-application-owner', kind: 'human', domainSlug: 'it', name: 'Application owner',
        tags: ['Application management', 'Accountability'], icon: 'layers',
        hook: 'Keep application responsibilities and service dependencies explicit.',
        body: 'Maintain application commitments and lifecycle decisions, identify consuming services, and transfer responsibility with accepted evidence.',
    },
    {
        slug: 'it-risk-owner', kind: 'human', domainSlug: 'it', name: 'IT risk owner',
        tags: ['Risk management', 'Exceptions'], icon: 'shield',
        hook: 'Own the consequences of a bounded risk decision.',
        body: 'Assess exposure, propose compensating controls, and provide evidence for exception renewal or closure without assuming approval authority.',
    },
    {
        slug: 'it-exception-approver', kind: 'human', domainSlug: 'it', name: 'Exception approver',
        tags: ['Risk management', 'Approval'], icon: 'shield',
        hook: 'Decide whether a scoped, time-bound exception is acceptable.',
        body: 'Review justification, authority, expiry and compensating-control evidence before granting, renewing or revoking an exception.',
    },
    {
        slug: 'it-api-product-owner', kind: 'human', domainSlug: 'it', name: 'API product owner',
        tags: ['API management', 'Compatibility'], icon: 'repos',
        hook: 'Evolve a shared interface with its consumers.',
        body: 'Review contract changes, identify affected consumers, and agree migration and deprecation conditions supported by compatibility evidence.',
    },
    {
        slug: 'it-knowledge-owner', kind: 'human', domainSlug: 'it', name: 'Operational knowledge owner',
        tags: ['Knowledge management', 'Handover'], icon: 'book-open',
        hook: 'Transfer decisions and unresolved obligations with the service.',
        body: 'Curate authoritative decisions, operating evidence and open questions so the receiving owner can explicitly accept a handover.',
    },
    {
        slug: 'it-vulnerability-manager', kind: 'human', domainSlug: 'it', name: 'Vulnerability manager',
        tags: ['Security', 'Remediation'], icon: 'shield',
        hook: 'Prioritize vulnerabilities in the context of affected services.',
        body: 'Reconcile findings with deployed components, assess exposure and business criticality, and route remediation to accountable owners.',
    },
    {
        slug: 'it-product-security-engineer', kind: 'human', domainSlug: 'it', name: 'Product security engineer',
        tags: ['Security', 'Verification'], icon: 'shield',
        hook: 'Demonstrate whether a mitigation addresses the relevant exposure.',
        body: 'Investigate applicability, propose fixes or compensating controls, and inspect verification evidence before closing a finding.',
    },
    {
        slug: 'it-procurement-manager', kind: 'human', domainSlug: 'it', name: 'IT procurement manager',
        tags: ['Procurement', 'Suppliers'], icon: 'briefcase',
        hook: 'Compare supplier commitments against the services that depend on them.',
        body: 'Review contractual changes, renewal conditions and exit obligations with service and risk owners before committing a purchase.',
    },
    {
        slug: 'it-third-party-risk-analyst', kind: 'human', domainSlug: 'it', name: 'Third-party risk analyst',
        tags: ['Suppliers', 'Assurance'], icon: 'search',
        hook: 'Connect supplier evidence to the scope of actual dependence.',
        body: 'Assess assurance scope, evidence age, subcontractor dependencies and concentration exposure while preserving unresolved questions.',
    },
    {
        slug: 'it-resilience-manager', kind: 'human', domainSlug: 'it', name: 'IT resilience manager',
        tags: ['Resilience', 'Service continuity'], icon: 'layers',
        hook: 'Assess whether recovery evidence supports service commitments.',
        body: 'Review disruption scenarios and exercise results with service and business owners, and record gaps between targets and demonstrated recovery.',
    },
    {
        slug: 'it-recovery-coordinator', kind: 'human', domainSlug: 'it', name: 'Disaster-recovery coordinator',
        tags: ['Recovery', 'Operations'], icon: 'compass',
        hook: 'Coordinate recovery in a dependency-aware order.',
        body: 'Prepare exercise sequences, identify shared-resource conflicts, and collect timed recovery and data-restoration evidence for review.',
    },
    {
        slug: 'it-data-owner', kind: 'human', domainSlug: 'it', name: 'Data owner',
        tags: ['Data governance', 'Accountability'], icon: 'briefcase',
        hook: 'Accept data commitments with producers and consumers.',
        body: 'Decide acceptable uses and quality expectations, resolve conflicting consumer requirements, and approve contract changes within authority.',
    },
    {
        slug: 'it-data-steward', kind: 'human', domainSlug: 'it', name: 'Data steward',
        tags: ['Data governance', 'Quality'], icon: 'search',
        hook: 'Make data-quality evidence and contract differences inspectable.',
        body: 'Maintain definitions and lineage evidence, assess quality findings, and prepare changes for accountable owner and consumer review.',
    },
    {
        slug: 'it-incident-commander', kind: 'human', domainSlug: 'it', name: 'Incident commander',
        tags: ['Incident management', 'Business impact'], icon: 'compass',
        hook: 'Trace a software incident to affected business activities.',
        body: 'Coordinate response from observed disruption through deployed components and services to business processes and owners, distinguishing confirmed impact from possible exposure.',
    },
    {
        slug: 'it-business-process-owner', kind: 'human', domainSlug: 'it', name: 'Business-process owner',
        tags: ['Business operations', 'IT dependence'], icon: 'briefcase',
        hook: 'Make the business consequences of an IT disruption explicit.',
        body: 'Identify critical activities and service dependencies, confirm business disruption, agree workarounds, and set recovery priorities with incident and service owners.',
    },
    {
        slug: 'it-cto',
        kind: 'human',
        domainSlug: 'it',
        name: 'CTO / CIO',
        tags: ['Executive'],
        icon: 'briefcase',
        hook: 'Evaluate a shared definition model for a bounded IT decision.',
        body: 'A pilot can compare reconciliation work, decision quality and governance costs. Integrated inventory, appraisal and generation remain planned; whole-estate savings are not assumed.',
    },
    {
        slug: 'it-architect',
        kind: 'human',
        domainSlug: 'it',
        name: 'Enterprise Architect',
        tags: ['Architecture'],
        icon: 'compass',
        hook: 'Trace definitions to accepted intent and inspected evidence.',
        body: 'Explore planned authoring, dependency analysis and artifact generation. Source revisions, deployed observations and simulation assumptions remain distinct evidence boundaries.',
    },
    {
        slug: 'it-ciso',
        kind: 'human',
        domainSlug: 'it',
        name: 'CISO / Security leadership',
        tags: ['Security & compliance'],
        icon: 'shield',
        hook: 'Make a stated appraisal scope and its missing evidence visible.',
        body: 'Selected GDPR/NIS2 templates and quality vocabularies exist; binding, observations and appraisal are planned integrations. Measure coverage and reconstruction effort, not automatic legal compliance.',
    },
    {
        slug: 'it-platform',
        kind: 'human',
        domainSlug: 'it',
        name: 'Platform / Ops / SRE lead',
        tags: ['Platform'],
        icon: 'layers',
        hook: 'Inspect the boundary between definitions and operations.',
        body: 'API and execution source can support a bounded integration experiment. Observation identity, effect authority, failure receipts and recovery must be accepted for the selected environment.',
    },
    {
        slug: 'it-head-of-ai',
        kind: 'human',
        domainSlug: 'it',
        name: 'Head of AI',
        tags: ['AI enablement'],
        icon: 'spark',
        hook: 'Evaluate AI answers against authorized, attributable context.',
        body: 'Planned read-only context and copilot routes need citation, abstention and injection tests. Direct authoring is valid without sourcing; typed context alone does not make action safe.',
    },
    {
        slug: 'specification-reader', kind: 'human', domainSlug: 'it',
        name: 'Specification reader / modeler', tags: ['Modeling'], icon: 'book-open',
        hook: 'Compare a system description with a declared modeling contract.',
        body: 'Read source specifications and sourced vocabularies, inspect examples and record interpretation limits before choosing an implementation.',
    },
    {
        slug: 'research-reviewer', kind: 'human', domainSlug: 'it',
        name: 'Research reviewer', tags: ['Research'], icon: 'search',
        hook: 'Distinguish a research hypothesis from an accepted requirement.',
        body: 'Compare explanations, inspect case evidence and follow decision records before proposing a specification change.',
    },
    {
        slug: 'integration-client', kind: 'system', domainSlug: 'it',
        name: 'Authorized integration client', tags: ['Integration'], icon: 'repos',
        hook: 'Exchange identified definitions within an explicit access boundary.',
        body: 'A consuming service or tool requests pinned context, publishes reviewed drafts or consumes committed changes under its own authenticated identity.',
    },
    {
        slug: 'assessment-runner', kind: 'system', domainSlug: 'it',
        name: 'Assessment runner', tags: ['Assessment'], icon: 'shield',
        hook: 'Evaluate identified inputs and retain unknown results.',
        body: 'A scheduler or appraisal client supplies pinned rules and instances, requests pure verdicts and routes findings to an accountable reviewer.',
    },
    {
        slug: 'delivery-agent', kind: 'system', domainSlug: 'it',
        name: 'Delivery agent', tags: ['Delivery'], icon: 'spark',
        hook: 'Produce artifacts under declared grants and review boundaries.',
        body: 'A host-bound software agent receives a scoped task, resolves instructions and submits artifacts for checks and human review without assuming authority to deploy.',
    },
];

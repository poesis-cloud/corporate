export interface UsagePain {
    /** Stable public identity, used in derived anchors and diagram lookups. */
    slug: string;
    /** Which thesis phase the pain surfaces in: the historical THINK pathology, or its GenAI-era form. */
    phase: 'legacy' | 'genai';
    /** Practice/concern labels. */
    tags: string[];
    /** The pain, stated in the buyer's words. Card title. */
    pain: string;
    /** What the pain costs today. */
    cost: string;
    actorTypes: string[];
    occursIn?: string[];
}

export const usagePains: UsagePain[] = [
    { slug: 'it-acquisition-blind-spots', phase: 'legacy', tags: ['Sourcing', 'Evidence freshness'], pain: 'Collection scope, incomplete runs and stale evidence are mistaken for current coverage.', cost: 'Reviews rely on uninspected or outdated inputs and repeat work when collection failures emerge late.', actorTypes: ['it-platform', 'it-architect', 'it-service-owner'], occursIn: ['configure-collection-boundaries', 'recover-incomplete-collection', 'review-evidence-refresh'] },
    { slug: 'it-access-assignment-drift', phase: 'legacy', tags: ['Identity', 'Authorization'], pain: 'Access assignments drift from responsibilities and identity-provider changes.', cost: 'Excess privileges persist while legitimate work is blocked by missing or stale assignments.', actorTypes: ['it-ciso', 'it-platform'], occursIn: ['review-operation-privileges', 'restore-identity-synchronization'] },
    { slug: 'it-fragmented-review-context', phase: 'legacy', tags: ['Governance review', 'Scope'], pain: 'Reviewers work from different selections and lose related decisions across meeting notes.', cost: 'Decisions cannot be compared or reconstructed against the same agenda, subject set and evidence boundaries.', actorTypes: ['it-architect', 'it-service-owner', 'it-exception-approver'], occursIn: ['conduct-governance-session', 'reuse-review-lens', 'inspect-subject-perspectives'] },
    { slug: 'it-unactionable-governance-findings', phase: 'legacy', tags: ['Review', 'Remediation'], pain: 'A blocking finding identifies a problem without a clear route to correction and renewed review.', cost: 'Rejected proposals and uncovered obligations remain unresolved while reviewers repeat the same checks.', actorTypes: ['it-architect', 'it-application-owner', 'it-ciso', 'it-risk-owner'], occursIn: ['resolve-blocked-change', 'propose-appraisal-remediation'] },
    { slug: 'it-assumed-governance-coverage', phase: 'legacy', tags: ['Ontology', 'Applicability'], pain: 'Selected vocabulary and unbound templates are mistaken for complete, applicable obligations.', cost: 'Subjects or concerns are omitted and requirements are applied without a justified adopting scope.', actorTypes: ['it-architect', 'it-ciso', 'specification-reader', 'it-service-owner'], occursIn: ['reuse-governance-selection', 'inspect-vocabulary-coverage', 'bind-obligations-to-scope'] },
    { slug: 'it-unverified-generated-output', phase: 'genai', tags: ['Artifacts', 'Generation quality'], pain: 'Incorrect bindings, unsupported narrative and partial files pass for completed deliverables.', cost: 'Reviews discover missing evidence and output errors only after reports have been distributed.', actorTypes: ['it-knowledge-owner', 'it-architect', 'it-platform', 'it-head-of-ai'], occursIn: ['maintain-artifact-bindings', 'preview-artifact-bindings', 'constrain-generated-narrative', 'operate-recurring-reports', 'investigate-artifact-failure'] },
    { slug: 'it-stale-dependent-eligibility', phase: 'legacy', tags: ['Lifecycle', 'Dependencies'], pain: 'Dependent definitions remain trusted after a foundation is invalidated.', cost: 'Continued use relies on obsolete eligibility and bypasses the renewed review required by changed foundations.', actorTypes: ['it-architect', 'it-platform'], occursIn: ['assess-invalidated-dependencies'] },
    { slug: 'it-unjustified-evidence-retention', phase: 'legacy', tags: ['Retention', 'Evidence'], pain: 'Evidence is discarded too early or retained indefinitely without a justified preservation policy.', cost: 'Historical decisions become unreviewable or unnecessary retained information creates avoidable exposure.', actorTypes: ['it-ciso', 'it-knowledge-owner', 'it-risk-owner'], occursIn: ['agree-evidence-preservation'] },
    { slug: 'it-unexamined-rule-regressions', phase: 'legacy', tags: ['Evaluation', 'Rule evolution'], pain: 'A rule revision changes established verdicts without an inspected explanation.', cost: 'New false positives, missed violations and unknown outcomes alter decisions before their causes are understood.', actorTypes: ['assessment-runner', 'it-ciso', 'it-architect'], occursIn: ['qualify-rule-revision'] },
    { slug: 'it-unqualified-agent-runtime', phase: 'genai', tags: ['Agentic delivery', 'Compatibility'], pain: 'Host or model selection changes behavior without verifying workload quality, instruction delivery or disclosure limits.', cost: 'Required guidance and checks disappear or unsuitable model routes produce costly, untrustworthy work.', actorTypes: ['it-platform', 'it-head-of-ai'], occursIn: ['qualify-model-routing', 'qualify-host-instructions'] },
    { slug: 'it-conflicting-agent-artifacts', phase: 'genai', tags: ['Collaboration', 'Artifacts'], pain: 'Individually valid parallel agent outputs overwrite or contradict accepted work.', cost: 'Combined artifacts lose coherence and attribution despite each isolated output passing its checks.', actorTypes: ['it-platform', 'delivery-agent'], occursIn: ['reconcile-parallel-agent-outputs'] },
    {
        slug: 'it-service-accountability-gap', phase: 'legacy', tags: ['Service ownership', 'Accountability'],
        pain: 'Service commitments have no agreed map of dependencies and accountable owners.',
        cost: 'Changes and ownership transfers leave obligations unassigned and affected services overlooked.',
        actorTypes: ['it-service-owner', 'it-application-owner', 'it-business-process-owner'],
        occursIn: ['accept-service-baseline', 'transfer-service-ownership'],
    },
    {
        slug: 'it-permanent-temporary-exceptions', phase: 'legacy', tags: ['Risk acceptance', 'Exceptions'],
        pain: 'Temporary exceptions remain in force after their justification or controls expire.',
        cost: 'Exposure accumulates without a current decision, a responsible risk owner or proof that compensating controls still work.',
        actorTypes: ['it-risk-owner', 'it-exception-approver', 'it-service-owner'],
        occursIn: ['review-time-bound-exception', 'renew-or-close-exception'],
    },
    {
        slug: 'it-unknown-contract-consumers', phase: 'legacy', tags: ['API evolution', 'Compatibility'],
        pain: 'A shared API changes before all affected consumers and migration conditions are known.',
        cost: 'Uncoordinated upgrades and deprecations disrupt dependent services and force emergency compatibility work.',
        actorTypes: ['it-api-product-owner', 'it-application-owner', 'it-architect'],
        occursIn: ['review-breaking-api-change', 'coordinate-api-deprecation'],
    },
    {
        slug: 'it-context-free-vulnerability-queue', phase: 'legacy', tags: ['Vulnerability management', 'Service exposure'],
        pain: 'Security findings are ranked without reliable deployed-service context or mitigation evidence.',
        cost: 'Teams spend effort on the wrong exposure and close findings without establishing that affected services are protected.',
        actorTypes: ['it-vulnerability-manager', 'it-product-security-engineer', 'it-service-owner'],
        occursIn: ['prioritize-service-vulnerabilities', 'verify-vulnerability-mitigation'],
    },
    {
        slug: 'it-detached-supplier-assurance', phase: 'legacy', tags: ['Suppliers', 'Assurance'],
        pain: 'Supplier assurances and exit promises are detached from the services that depend on them.',
        cost: 'Procurement and renewal decisions accept obligations or transition risks that service owners cannot substantiate.',
        actorTypes: ['it-procurement-manager', 'it-third-party-risk-analyst', 'it-service-owner'],
        occursIn: ['assess-supplier-service-change', 'review-supplier-exit-readiness'],
    },
    {
        slug: 'it-unproven-recovery-commitments', phase: 'legacy', tags: ['Recovery', 'Resilience'],
        pain: 'Recovery targets assume dependency sequences and restoration results that exercises have not demonstrated.',
        cost: 'Services miss recovery commitments when shared resources, upstream dependencies or data restoration behave differently than assumed.',
        actorTypes: ['it-resilience-manager', 'it-recovery-coordinator', 'it-service-owner', 'it-business-process-owner'],
        occursIn: ['review-service-recovery-exercise', 'resolve-recovery-dependency-conflicts'],
    },
    {
        slug: 'it-data-contract-expectation-gap', phase: 'legacy', tags: ['Data contracts', 'Quality'],
        pain: 'Data producers and consumers discover incompatible meanings or quality expectations only after a change.',
        cost: 'Downstream decisions and integrations fail while teams reconstruct what each party believed the data contract guaranteed.',
        actorTypes: ['it-data-owner', 'it-data-steward', 'it-application-owner'],
        occursIn: ['review-data-contract-change', 'resolve-data-quality-requirements'],
    },
    {
        slug: 'it-incident-business-impact-blindness', phase: 'legacy', tags: ['Incident management', 'Business impact'],
        pain: 'We know which software failed, but not which business processes are disrupted or whom to notify.',
        cost: 'Response priorities follow technical alarms instead of confirmed business consequences, delaying workarounds and recovery for critical activities.',
        actorTypes: ['it-incident-commander', 'it-service-owner', 'it-application-owner', 'it-business-process-owner', 'it-platform'],
        occursIn: ['trace-incident-business-impact'],
    },
    // ---- Poesis for IT ----------------------------------------------------
    {
        slug: 'it-ea-drift',
        phase: 'legacy',
        tags: ['Enterprise architecture'],
        pain: 'The architecture repository is out of date the day it\u2019s written.',
        cost: 'Hand-maintained models detach from the territory the moment delivery moves on \u2014 and every decision made on them inherits the drift.',
        actorTypes: ['it-architect', 'it-cto'],
    },
    {
        slug: 'it-audit-reconstruction',
        phase: 'legacy',
        tags: ['Compliance automation'],
        pain: 'Compliance is reconstructed in spreadsheets before every audit.',
        cost: 'Posture exists only at audit time; between audits, nobody can answer what is actually covered.',
        actorTypes: ['it-ciso', 'it-architect', 'assessment-runner'],
        occursIn: ['retrieve-decision-basis'],
    },
    {
        slug: 'it-blind-change',
        phase: 'legacy',
        tags: ['Impact analysis'],
        pain: 'Impact analysis is a guess made in a meeting.',
        cost: 'Coupling is discovered in incident reviews, after the change shipped.',
        actorTypes: ['it-architect', 'it-platform', 'it-cto'],
        occursIn: ['assess-application-retirement'],
    },
    {
        slug: 'it-handcrafted-deliverables',
        phase: 'legacy',
        tags: ['Artifact generation'],
        pain: 'Every deliverable is hand-crafted, again and again.',
        cost: 'ADR packs, evidence, baselines, and roadmaps are rebuilt by hand \u2014 and stale against each other by the time they ship.',
        actorTypes: ['it-architect', 'it-cto', 'delivery-agent'],
        occursIn: ['maintain-artifact-bindings', 'operate-recurring-reports'],
    },
    {
        slug: 'it-truth-drift',
        phase: 'legacy',
        tags: ['Truth sourcing'],
        pain: 'Governance drifts from what actually runs.',
        cost: 'The declared estate and the running estate diverge silently \u2014 until an audit or an incident exposes the gap.',
        actorTypes: ['it-platform', 'it-architect', 'integration-client'],
    },
    {
        slug: 'it-ai-blindness',
        phase: 'genai',
        tags: ['AI-ready governance'],
        pain: 'AI agents act on stale wikis and tribal knowledge.',
        cost: 'Without a trustworthy machine-readable source of truth, agent autonomy is either blocked or reckless.',
        actorTypes: ['it-head-of-ai', 'integration-client'],
    },
    {
        slug: 'it-ungoverned-change',
        phase: 'genai',
        tags: ['Change governance'],
        pain: 'Anything can change anything — there is no approval trail.',
        cost: 'Definitions, standards, and obligations mutate without review; who approved what, and when, is unanswerable.',
        actorTypes: ['it-ciso', 'it-platform', 'integration-client'],
    },
    {
        slug: 'it-framework-collision',
        phase: 'legacy',
        tags: ['Framework composition'],
        pain: 'Every framework lives in its own silo — and they collide on your desk.',
        cost: 'TOGAF, ISO, GDPR, and NIS2 each demand their own registry and their own reconciliation; overlaps and conflicts are discovered by accident.',
        actorTypes: ['it-ciso', 'it-architect', 'specification-reader'],
        occursIn: ['resolve-competing-obligations'],
    },
    {
        slug: 'it-governance-lockin',
        phase: 'legacy',
        tags: ['Vendor neutrality'],
        pain: 'Your governance model is trapped in a vendor’s proprietary format.',
        cost: 'Obligations, architecture, and compliance mappings live in tool-specific silos — migrating tools means re-authoring your governance.',
        actorTypes: ['it-cto', 'it-architect', 'specification-reader', 'integration-client'],
        occursIn: ['qualify-processor-interchange'],
    },
    {
        slug: 'it-tool-silos',
        phase: 'legacy',
        tags: ['Interoperability'],
        pain: 'Architecture, compliance, and quality tools don’t speak to each other.',
        cost: 'Each tool keeps its own model of the same IT reality; integrations are bespoke mappings that rot, and knowledge stays siloed per tool and per team.',
        actorTypes: ['it-platform', 'it-architect', 'integration-client', 'specification-reader'],
        occursIn: ['agree-domain-typing-contract', 'qualify-processor-interchange'],
    },
    {
        slug: 'it-ungoverned-agents',
        phase: 'genai',
        tags: ['Agentic delivery'],
        pain: 'AI agents ship work nobody scoped, gated, or can replay.',
        cost: 'Agentic delivery state is trapped in chat sessions; pull requests appear without a mandate; there is no event log and no human authority at the layer where it matters.',
        actorTypes: ['it-head-of-ai', 'it-platform', 'delivery-agent'],
        occursIn: ['approve-agent-mandate'],
    },
    {
        slug: 'model-assumption-gap', phase: 'legacy', tags: ['Model evidence'],
        pain: 'A modeling decision cites an example as though it were an executed test.',
        cost: 'A reviewer cannot distinguish a plausible explanation from evidence that rules out alternatives.',
        actorTypes: ['research-reviewer', 'specification-reader'],
        occursIn: ['review-model-evidence', 'propose-grammar-extension'],
    },
    {
        slug: 'manual-decision-handoff', phase: 'legacy', tags: ['Decision handoffs'],
        pain: 'The reason for a decision stays in an email thread instead of reaching the next reviewer.',
        cost: 'In a manual handoff, the next reviewer repeats interviews to recover assumptions and unresolved objections.',
        actorTypes: ['it-architect', 'it-cto', 'it-knowledge-owner', 'it-service-owner'],
        occursIn: ['handover-operational-evidence', 'transfer-service-ownership'],
    },
];

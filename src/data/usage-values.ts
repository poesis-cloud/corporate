/**
 * usage-values.ts — the single value ledger.
 *
 * A value states a benefit a reader gets. It is usage-side on purpose: it does
 * not know which platform item delivers it. Platform items (features,
 * capabilities, affordances) carry the references instead, so a value's
 * delivery status is always derived from its supporting items and never
 * declared here — see `valueStatus` in usage.ts.
 *
 * Slug grammar, which is also the ownership grammar enforced by validateUsage:
 *
 *   value:platform/<name>           realized by affordances
 *   value:<solution>/<nn>           realized by that solution's capabilities
 *   value:<solution>/<product>/<nn> realized by that product's features
 *
 * Slugs are public identity: they drive page anchors and must never be
 * renumbered or reworded.
 */
export interface Value {
  /** Stable public identity and anchor source. */
  slug: string;
  /** Wording this value shipped with before the current title; kept as a legacy anchor alias. */
  originalTitle: string;
  title: string;
  body: string;
}

export const usageValues: Value[] = [
  { slug: 'value:inspectable-acquisition-coverage', originalTitle: 'Inspect acquisition scope and freshness', title: 'Inspect acquisition scope and freshness', body: 'Distinguish inspected revisions from missing, failed or stale collection before relying on source evidence.' },
  { slug: 'value:least-privilege-collaboration', originalTitle: 'Align access with responsibilities', title: 'Align access with responsibilities', body: 'Review action-specific permissions and identity synchronization against current responsibilities, with revocation and failures explicitly verified.' },
  { slug: 'value:repeatable-review-boundaries', originalTitle: 'Repeatable review boundaries', title: 'Repeatable review boundaries', body: 'Reuse explicit selection and traversal rules so reviewers can compare decisions against identified subjects and snapshot boundaries.' },
  { slug: 'value:coherent-review-sessions', originalTitle: 'Coherent records of related decisions', title: 'Coherent records of related decisions', body: 'Retain agendas, participation and per-revision decisions together while keeping discussion, voting and authorized lifecycle decisions distinct.' },
  { slug: 'value:actionable-governance-findings', originalTitle: 'Carry findings into corrective decisions', title: 'Carry findings into corrective decisions', body: 'Connect blocking findings and uncovered obligations to owned corrections, renewed review and subsequent evidence of resolution.' },
  { slug: 'value:explicit-obligation-applicability', originalTitle: 'Make obligation applicability explicit', title: 'Make obligation applicability explicit', body: 'Separate reusable templates and vocabulary coverage from the subjects, conditions and accountable interpretation that establish applicable obligations.' },
  { slug: 'value:inspectable-artifact-completion', originalTitle: 'Distinguish generated output from accepted completion', title: 'Distinguish generated output from accepted completion', body: 'Inspect binding resolution, grounding constraints, missing inputs and job outcomes before accepting or reusing a generated deliverable.' },
  { slug: 'value:proportionate-evidence-preservation', originalTitle: 'Proportionate evidence preservation', title: 'Proportionate evidence preservation', body: 'Agree justified preservation periods, access and disposal constraints while keeping policy decisions distinct from verified retention enforcement.' },
  { slug: 'value:known-rule-revision-effects', originalTitle: 'Understand verdict changes before rule adoption', title: 'Understand verdict changes before rule adoption', body: 'Compare rule revisions on pinned reference inputs and inspect changed and unknown results before accepting their effect on decisions.' },
  { slug: 'value:qualified-runtime-selection', originalTitle: 'Qualify delivery hosts and model routes', title: 'Qualify delivery hosts and model routes', body: 'Evaluate host instruction delivery and model routes against explicit workload quality, cost and disclosure criteria rather than assuming interchangeable behavior.' },
  { slug: 'value:service-accountability', originalTitle: 'Clear accountability for service commitments', title: 'Clear accountability for service commitments', body: 'Establish who accepts each service commitment and dependency, including responsibilities transferred to a new owner.' },
  { slug: 'value:time-bounded-risk-acceptance', originalTitle: 'Time-bounded risk acceptance', title: 'Time-bounded risk acceptance', body: 'Keep accepted exposure tied to accountable decisions, expiry and current compensating-control evidence rather than indefinite exceptions.' },
  { slug: 'value:predictable-interface-evolution', originalTitle: 'Predictable evolution of shared interfaces', title: 'Predictable evolution of shared interfaces', body: 'Coordinate contract changes and consumer migration against explicit compatibility evidence and retirement prerequisites.' },
  { slug: 'value:usable-knowledge-transfer', originalTitle: 'Transfer usable operational knowledge', title: 'Transfer usable operational knowledge', body: 'Carry authoritative decisions, unresolved obligations and inspected evidence into a handover the receiving service owner can accept.' },
  { slug: 'value:exposure-led-remediation', originalTitle: 'Remediation focused on consequential exposure', title: 'Remediation focused on consequential exposure', body: 'Direct security effort toward affected deployed services and business consequences, with mitigation effectiveness reviewed before closure.' },
  { slug: 'value:service-grounded-supplier-decisions', originalTitle: 'Supplier decisions grounded in service exposure', title: 'Supplier decisions grounded in service exposure', body: 'Assess supplier changes and exits using dependent-service commitments, scoped assurance evidence and unresolved transition obligations.' },
  { slug: 'value:evidence-backed-recovery', originalTitle: 'Recovery commitments supported by evidence', title: 'Recovery commitments supported by evidence', body: 'Distinguish stated recovery targets from observed exercise results, dependency constraints and scenarios that remain untested.' },
  { slug: 'value:dependable-data-handoffs', originalTitle: 'Dependable data handoffs', title: 'Dependable data handoffs', body: 'Agree the meaning and quality of exchanged data with its consumers, making contract changes and conflicting requirements explicit before adoption.' },
  { slug: 'value:business-informed-incident-response', originalTitle: 'Prioritize incident response by business consequences', title: 'Prioritize incident response by business consequences', body: 'Connect observed software disruption to affected business processes and accountable owners, separating confirmed impact from possible exposure so response and communication follow justified priorities.' },
  // Platform values — realized by affordances.
  { slug: 'value:platform/analysis-power', originalTitle: 'Decision insight', title: 'Reduce uncertainty about a specified change', body: 'Bring relevant context and affected definitions into a shared review, making dependency paths and missing evidence visible before deciding.' },
  { slug: 'value:platform/continuous-evaluation', originalTitle: 'Earlier nonconformance awareness', title: 'Reduce time that nonconformance remains unknown', body: 'Use planned scoped evaluation to surface findings earlier, with observation coverage, freshness and unknown states visible to reviewers.' },
  { slug: 'value:platform/governed-authority', originalTitle: 'Attributable decisions', title: 'Keep consequential changes attributable', body: 'Connect consequential changes to identity, policy and revision-bound decisions as authenticated governance controls are completed.' },
  { slug: 'value:platform/accountable-autonomy', originalTitle: 'Accountable delegation', title: 'Delegate bounded work with evidence and recourse', body: 'Build toward delegated workflows with explicit obligations, decision boundaries and controlled effects, retaining evidence for intervention and recovery.' },
  { slug: 'value:platform/resource-economy', originalTitle: 'Reduced repeated work', title: 'Reduce avoidable reconstruction and rework', body: 'Reuse shared context and generated artifacts so effort can shift from repeated assembly to curation and review. Net savings depend on the workflow and compute costs.' },
  { slug: 'value:platform/audit-readiness', originalTitle: 'Audit preparation', title: 'Reduce evidence reconstruction effort', body: 'Bring linked snapshots, decisions and provenance into a stated audit scope, with completeness assessed against that review rather than inferred from history alone.' },
  // ITIP — realized by itip capabilities.
  { slug: 'value:itip/01', originalTitle: 'Governance that stops drifting.', title: 'Keep governance closer to its evidence.', body: 'Bring shared definitions, reviewed candidates and scoped appraisal together to simplify reconciliation. For running systems, keep observation coverage and freshness visible.' },
  { slug: 'value:itip/02', originalTitle: 'A source of truth AI can act on.', title: 'Give AI attributable context.', body: 'Ground planned read-only answers in authorized, versioned definitions, with citations and abstention for review. Build that context through direct authoring or reviewed sourcing.' },
  { slug: 'value:itip/03', originalTitle: 'Every profile, every deliverable, one model.', title: 'Coordinate IT work around shared definitions.', body: 'Reuse common inputs across appraisal, analysis and document generation so profiles can review decisions against the same definitions. Outputs and scenarios remain subject to review.' },
  { slug: 'value:itip/04', originalTitle: 'Ontologies composed, not siloed.', title: 'Review obligations together.', body: 'Reuse selected packages in one scoped review, with applicability, conflicting obligations and missing evidence visible for resolution.' },
  // Web Application — realized by itip/web-application features.
  { slug: 'value:itip/web-application/01', originalTitle: 'One place every IT profile works.', title: 'A shared workspace for IT decisions.', body: 'Author and review a common inventory through planned integrated workflows and scoped permissions, reducing handoffs between separate representations.' },
  { slug: 'value:itip/web-application/02', originalTitle: 'Compliance observed, not reconstructed.', title: 'Make scoped appraisal inspectable.', body: 'Prepare reviews from versioned findings with visible coverage, observation age and unknown results. Legal interpretation stays with the reviewer.' },
  { slug: 'value:itip/web-application/03', originalTitle: 'Deliverables fall out of the model.', title: 'Reduce repeated document assembly.', body: 'Generate reviewable document families from reusable definitions and templates, then focus effort on review, correction and template upkeep.' },
  { slug: 'value:itip/web-application/04', originalTitle: 'See the impact before you commit.', title: 'Inspect possible effects before deciding.', body: 'Follow dependency and obligation paths to affected definitions. Timing, probability and causal predictions belong to the further simulation scope.' },
  { slug: 'value:itip/web-application/05', originalTitle: 'Ask the model, not the wiki.', title: 'Check answers against sources.', body: 'Use the planned copilot to find relevant definitions and inspect cited evidence, snapshot age and uncertainty alongside each answer.' },
  // Definition Blackboard Code Sourcer — realized by itip/definition-blackboard-code-sourcer features.
  { slug: 'value:itip/definition-blackboard-code-sourcer/01', originalTitle: 'Definitions author themselves.', title: 'Reduce manual candidate authoring.', body: 'Prepare proposals through staged analysis and optional inference so experts can focus on reconciliation and acceptance.' },
  { slug: 'value:itip/definition-blackboard-code-sourcer/02', originalTitle: 'The model reflects what actually runs.', title: 'Relate definitions to inspected revisions.', body: 'Reconcile definitions against pinned source evidence. Relating them to running systems additionally requires deployed identity, configuration and fresh observations.' },
  { slug: 'value:itip/definition-blackboard-code-sourcer/03', originalTitle: 'Every definition is explainable.', title: 'Inspect the basis of proposals.', body: 'Review provenance and confidence alongside retained tool details, source revisions and competing evidence.' },
  { slug: 'value:itip/definition-blackboard-code-sourcer/04', originalTitle: 'Private by design.', title: 'Control sourcing data exposure.', body: 'Bound the planned sourcing workflow with explicit policies for tool/model egress, credentials, telemetry and retention, including any data leaving the local process.' },
  // SIE — realized by sie capabilities.
  { slug: 'value:sie/01', originalTitle: 'A governed AI context.', title: 'Make shared context attributable.', body: 'Build toward policy-filtered snapshots that people and AI can inspect. Direct API authoring is independent of sourcing, with MCP planned as an additional interface.' },
  { slug: 'value:sie/02', originalTitle: 'Harnessed operations.', title: 'Constrain operations at declared boundaries.', body: 'Combine eligibility, caller authority and adapter contracts to bound effectful execution. Keep pure verdict evaluation separate from actions that change a system.' },
  { slug: 'value:sie/03', originalTitle: 'One closed self-sustaining loop.', title: 'Build toward bounded feedback loops.', body: 'Connect definitions, observations, evaluation, authorized response and re-observation in future domain-specific loops, with explicit boundaries for each integration.' },
  { slug: 'value:sie/04', originalTitle: 'Reality feeds governance.', title: 'Use evidence to inform revisions.', body: 'Carry reviewed candidates into authorized revisions with promotion lineage. Collection, approval and confirmation against running systems remain distinct steps.' },
  // Definition Manager — realized by sie/definition-manager features.
  { slug: 'value:sie/definition-manager/01', originalTitle: 'Governance you can’t corrupt.', title: 'Make transitions inspectable.', body: 'Check lifecycle advancement against defined transitions, with authentication, policy and current grammar alignment completing the governance boundary.' },
  { slug: 'value:sie/definition-manager/02', originalTitle: 'An API, not a document store.', title: 'Access snapshots programmatically.', body: 'Reuse structured snapshots across tools instead of manually exchanging documents, within each route\'s validated isolation, pagination and performance scope.' },
  { slug: 'value:sie/definition-manager/03', originalTitle: 'Audit-ready by construction.', title: 'Reuse retained lifecycle evidence.', body: 'Start review from retained version history. Linking actors, rationale and retention policy completes the evidence needed for a stated audit scope.' },
  { slug: 'value:sie/definition-manager/04', originalTitle: 'The model announces its own changes.', title: 'React to committed changes.', body: 'Use planned change notifications to replace repeated polling, with replay and recovery for missed events.' },
  // Operator — realized by sie/operator features.
  { slug: 'value:sie/operator/01', originalTitle: 'Governance that executes.', title: 'Connect eligible definitions to bounded action.', body: 'Use defined mechanisms for named operations, adding verdicts, scheduling and feedback when building a complete domain loop.' },
  { slug: 'value:sie/operator/02', originalTitle: 'Sandboxed, reproducible verdicts.', title: 'Make pure verdicts reproducible.', body: 'Replay planned pure evaluations against pinned rules, inputs and time, independently of effectful execution.' },
  { slug: 'value:sie/operator/03', originalTitle: 'Only the model decides what runs.', title: 'Make eligibility and authority explicit.', body: 'Bound operations through governed eligibility together with caller and adapter policy as execution controls are completed.' },
  { slug: 'value:sie/operator/04', originalTitle: 'Always the current governed version.', title: 'Identify the snapshot used.', body: 'Trace execution to requested definition IDs. Coherent pinning will distinguish latest, historical and eligible snapshot policies explicitly.' },
  // Definition Blackboard Manager — realized by sie/definition-blackboard-manager features.
  { slug: 'value:sie/definition-blackboard-manager/01', originalTitle: 'The whole picture, from every partial view.', title: 'Compare contributed partial views.', body: 'Bring conflicting candidates into shared panels so reviewers can compare evidence and identify gaps in the collected views.' },
  { slug: 'value:sie/definition-blackboard-manager/02', originalTitle: 'Thinking here, deciding there.', title: 'Separate exploration from acceptance.', body: 'Collect candidates on the board, reconcile them in a client and govern promoted drafts in the Definition Manager through an explicit integration handoff.' },
  { slug: 'value:sie/definition-blackboard-manager/03', originalTitle: 'You can always answer “why is this in the model?”', title: 'Trace retained proposal evidence.', body: 'Revisit captured actors and sources, with reducer decisions and Ascription links extending the trail from proposal to accepted definition.' },
  // GSM — realized by gsm capabilities.
  { slug: 'value:gsm/01', originalTitle: 'What OpenTelemetry is to RUN, GSM is to THINK.', title: 'Build toward shared definition semantics.', body: 'Give compatible tools a common vocabulary for definitions, analogous to shared observability conventions. Interchange depends on implemented profiles and independent consumer compatibility.' },
  { slug: 'value:gsm/02', originalTitle: 'Kubernetes defines infrastructure to operate it. GSM defines the world to govern it.', title: 'Make governed intent explicit.', body: 'Describe a chosen domain through typed definitions, explicit obligations and a governed lifecycle, bringing declarative intent to scoped system modeling.' },
  { slug: 'value:gsm/03', originalTitle: 'Governance as code, composed with policy as code.', title: 'Connect governance and policy tools.', body: 'Use shared definitions and obligations as inputs to planned policy, attestation, observation and delivery integrations, with dedicated adapters for each tool.' },
  { slug: 'value:gsm/04', originalTitle: 'Trust the standard, not the vendor.', title: 'Inspect the model and its sources.', body: 'Evaluate adoption against versioned content, source mappings and visible research questions. Neutral stewardship remains a stated direction, distinct from consortium endorsement.' },
  // Specifications — realized by gsm/specifications features.
  { slug: 'value:gsm/specifications/01', originalTitle: 'Tools that interoperate, silos that fall.', title: 'Reduce bespoke semantic translation.', body: 'Reuse shared vocabulary and profiles when connecting tools that implement compatible contracts.' },
  { slug: 'value:gsm/specifications/02', originalTitle: 'Lock-in ends where the standard begins.', title: 'Make portability requirements explicit.', body: 'Compare migration routes against declared conformance requirements. Complete transfer still depends on nonconformant DRAFT preservation and independent endpoint compatibility.' },
  { slug: 'value:gsm/specifications/03', originalTitle: 'The governance grammar keeps deepening.', title: 'Adapt grammar through evidence.', body: 'Address demonstrated modeling limits through planned, reviewed extensions with explicit compatibility decisions.' },
  { slug: 'value:gsm/specifications/04', originalTitle: 'Built for neutral stewardship.', title: 'Build toward neutral stewardship.', body: 'Pursue consortium stewardship through a visible model and reviewed evolution, with ownership, licensing and publication stated separately.' },
  // Ontology — realized by gsm/ontology features.
  { slug: 'value:gsm/ontology/01', originalTitle: 'Day-one governance, not a blank page.', title: 'Start from reusable vocabulary.', body: 'Build on selected sourced content, then focus authoring effort on installation, interpretation and bindings for your domain.' },
  { slug: 'value:gsm/ontology/02', originalTitle: 'The authority’s own taxonomy, clause by clause.', title: 'Inspect source mappings.', body: 'Review concepts in the source taxonomy with available clause references, checking coverage and legal applicability for your scope.' },
  { slug: 'value:gsm/ontology/03', originalTitle: 'Ontologies that compose, not collide.', title: 'Review composition explicitly.', body: 'Combine selected vocabularies through GSM governance, with reference resolution and obligation conflicts handled in review.' },
  { slug: 'value:gsm/ontology/04', originalTitle: 'Every claim carries where it came from.', title: 'Represent attribution explicitly.', body: 'Record attribution in typed facets and connect it to consumer-verified actors and populated lineage.' },
  { slug: 'value:gsm/ontology/05', originalTitle: 'Maintained as the real world changes.', title: 'Review evolving requirements.', body: 'Use planned source monitoring and versioned updates to review changing requirements before choosing governed upgrades.' },
  // Research Lab — realized by gsm/research-lab features.
  { slug: 'value:gsm/research-lab/01', originalTitle: 'The standard is tested before it is frozen.', title: 'Challenge assumptions explicitly.', body: 'Compare alternative explanations through research records and cases, distinguishing conceptual exploration from executed testing.' },
  { slug: 'value:gsm/research-lab/02', originalTitle: 'Research and specification never blur.', title: 'Separate hypotheses from requirements.', body: 'Keep exploratory records separate from normative requirements and promote findings through specification governance.' },
  { slug: 'value:gsm/research-lab/03', originalTitle: 'Open questions have stable names.', title: 'Track open questions consistently.', body: 'Reference the same research question across cases and decisions using stable identifiers and visible status.' },
  // SAF — realized by saf capabilities.
  { slug: 'value:saf/01', originalTitle: 'Definitions that generate systems.', title: 'Build toward traceable delivery.', body: 'Generate reviewable artifacts through bounded workflows, then carry evidence forward through separate build, deployment and re-observation stages.' },
  { slug: 'value:saf/02', originalTitle: 'A method, run by agents, as a harness.', title: 'Make agentic work reviewable.', body: 'Combine role contracts, workflow decisions and artifact evidence, with planned authenticated human gates bound to exact revisions.' },
  { slug: 'value:saf/03', originalTitle: 'Local orchestrations, one organization.', title: 'Coordinate through shared artifacts.', body: 'Collaborate through versioned contracts and Git-backed artifacts, reconciling separate journals, merges and version differences explicitly.' },
  { slug: 'value:saf/04', originalTitle: 'Open, local-first, sovereign.', title: 'Control local delivery data.', body: 'Choose local tools and Git workflows, with explicit policies for model/tool egress, telemetry, remotes and backups.' },
  { slug: 'value:saf/05', originalTitle: 'Delivery history becomes governed context.', title: 'Reuse delivery evidence.', body: 'Derive candidates from pinned artifacts and journals through the planned bridge, then review and promote them through a client-owned stage.' },
  // Agentic Harness — realized by saf/agentic-harness features.
  { slug: 'value:saf/agentic-harness/01', originalTitle: 'Deterministic rails for probabilistic agents.', title: 'Inspect control decisions.', body: 'Review persisted step and write-authorization decisions within mediated execution, alongside separate checks for output quality and human approval.' },
  { slug: 'value:saf/agentic-harness/02', originalTitle: 'Invalid bytes never land.', title: 'Catch invalid declared artifacts earlier.', body: 'Check matched schemas before mediated writes so declared structural errors surface early. Coverage follows the supported parser, contract and transaction boundaries.' },
  { slug: 'value:saf/agentic-harness/03', originalTitle: 'One method, any host.', title: 'Reuse methods on supported hosts.', body: 'Carry plain-file methods between supported host/model adapters, with explicit compatibility and mediation boundaries.' },
  // SAFe Agentic Organization — realized by saf/safe-agentic-organization features.
  { slug: 'value:saf/safe-agentic-organization/01', originalTitle: 'An org chart, not a swarm.', title: 'Clarify responsibilities.', body: 'Assign orchestration and specialist work to named roles, making ownership and handoffs visible in each workflow.' },
  { slug: 'value:saf/safe-agentic-organization/02', originalTitle: 'A method agents must implement.', title: 'Make expectations inspectable.', body: 'Review deliverables against shared templates, practices and workflow contracts, with executable checks supplied by supported harness bindings.' },
  { slug: 'value:saf/safe-agentic-organization/03', originalTitle: 'Agents propose, humans dispose.', title: 'Keep decisions attributable.', body: 'Bind advancement to authenticated human decisions on exact revisions and scope through the planned approval workflow.' },
  // Agentic Workspace — realized by saf/agentic-workspace features.
  { slug: 'value:saf/agentic-workspace/01', originalTitle: 'Your files, your history, your state.', title: 'Keep artifacts in a chosen working tree.', body: 'Own the Git working tree and its artifact history, with separate disclosure policies for journals, remotes, tools, models and backups.' },
  { slug: 'value:saf/agentic-workspace/02', originalTitle: 'Install once, deliver governed.', title: 'Make supported setup repeatable.', body: 'Use the planned installer for pinned setup, reruns, upgrades and rollback while preserving existing work.' },
  { slug: 'value:saf/agentic-workspace/03', originalTitle: 'The same gates run in CI.', title: 'Reuse declared checks in CI.', body: 'Carry pinned artifact checks into planned CI pipelines, with environment validation and human decisions handled explicitly.' },
  // SAF SIE Bridge — realized by saf/saf-sie-bridge features.
  { slug: 'value:saf/saf-sie-bridge/01', originalTitle: 'What agents actually did, made governed context.', title: 'Reuse captured delivery evidence.', body: 'Make captured delivery evidence available for review and further reasoning through planned sourcing, with missing records and uncertainty kept visible.' },
];

/** Legacy anchor form derived from a value title, kept so old deep links still resolve. */
export function solutionValueAnchor(title: string): string {
  return `value-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
}

/** Canonical anchor for a value, derived from its slug. */
export function valueAnchor(value: Pick<Value, 'slug'>): string {
  return value.slug.replace(/[:/]/g, '-');
}

/** Legacy title-derived anchors kept alongside the canonical one. */
export function valueAliases(value: Pick<Value, 'originalTitle' | 'title'>): string[] {
  return [...new Set([solutionValueAnchor(value.originalTitle), solutionValueAnchor(value.title)])];
}

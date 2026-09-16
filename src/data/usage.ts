/**
 * usage.ts — the usage side of the model.
 *
 * Direction of ownership: platform items declare which values they realize,
 * which pains they address and which use cases they serve. Nothing here is
 * declared twice. Everything a reader sees on a value page or a use-case page
 * is derived by inverting those declarations, which is why a value can never
 * claim a delivery status its supporting items do not already justify.
 *
 * This module is also the only place where platform references are proven to
 * resolve — see `validateUsage`, invoked on import.
 */
import { platformSolutions, affordances, commitmentStatus, solutionHref, type Affordance, type Capability, type DeliveryState, type Feature, type Product, type SemanticEdge, type Solution } from './poesis-platform.ts';
import { actorTypes } from './usage-actors.ts';
import { usagePains, type UsagePain } from './usage-pains.ts';
import { usageValues, valueAnchor, type Value } from './usage-values.ts';

export { usageValues, valueAnchor, valueAliases, solutionValueAnchor } from './usage-values.ts';
export type { Value } from './usage-values.ts';

export interface UseCase {
  /** Stable public identity; also the `/usage/<slug>` route. */
  slug: string;
  name: string;
  goal: string;
  actorTypes: string[];
}
export interface UsageGraph { actorTypes: typeof actorTypes; pains: UsagePain[]; useCases: UseCase[] }

export const useCases: UseCase[] = [
  { slug: 'configure-collection-boundaries', name: 'Configure repository collection boundaries', goal: 'Select repository branches, paths and revision boundaries so inspected evidence matches the intended acquisition scope.', actorTypes: ['it-platform', 'it-architect'] },
  { slug: 'recover-incomplete-collection', name: 'Diagnose and recover incomplete collection', goal: 'Identify failed or partial acquisition runs, correct their causes and resume collection without presenting missing evidence as complete coverage.', actorTypes: ['it-platform'] },
  { slug: 'review-evidence-refresh', name: 'Set and review evidence-refresh expectations', goal: 'Agree refresh expectations and inspect source age, failed refreshes and coverage limits before using collected evidence.', actorTypes: ['it-platform', 'it-service-owner'] },
  { slug: 'review-operation-privileges', name: 'Review operation-specific privileges', goal: 'Review tenant, object and action permissions against assigned responsibilities and remove unnecessary authority.', actorTypes: ['it-ciso', 'it-platform'] },
  { slug: 'restore-identity-synchronization', name: 'Restore identity-provider synchronization', goal: 'Reconcile external identity and group changes with local access assignments, inspect synchronization failures and verify revoked access is no longer granted.', actorTypes: ['it-platform', 'it-ciso'] },
  { slug: 'conduct-governance-session', name: 'Prepare and conduct a multi-item governance session', goal: 'Prepare a related decision agenda, record participation and retain each revision-bound decision and condition without treating a meeting vote as authorization by itself.', actorTypes: ['it-architect', 'it-exception-approver', 'it-service-owner'] },
  { slug: 'resolve-blocked-change', name: 'Resolve a blocked change request', goal: 'Inspect blocking validation and lifecycle findings, correct the proposal and submit the revised scope for renewed review.', actorTypes: ['it-architect', 'it-application-owner'] },
  { slug: 'retrieve-decision-basis', name: 'Retrieve the basis of a historical decision', goal: 'Retrieve the decided revision, recorded identity, supporting evidence and conditions relevant to a historical decision, retaining attribution gaps.', actorTypes: ['it-ciso', 'it-knowledge-owner'] },
  { slug: 'reuse-review-lens', name: 'Define and reuse a scoped review lens', goal: 'Save explicit subject-selection and dependency-traversal rules and reuse them with visible snapshot boundaries across reviews.', actorTypes: ['it-architect', 'it-service-owner'] },
  { slug: 'inspect-subject-perspectives', name: 'Inspect one subject across framework perspectives', goal: 'Compare architecture, security and quality classifications of the same identified subject without confusing classification with obligation applicability.', actorTypes: ['it-architect', 'it-ciso', 'it-data-steward'] },
  { slug: 'reuse-governance-selection', name: 'Compose and reuse a governance selection', goal: 'Save a pinned selection of governance packages and reuse it while separately reviewing applicability for each adopting scope.', actorTypes: ['it-architect', 'it-ciso'] },
  { slug: 'resolve-competing-obligations', name: 'Resolve competing obligations before adoption', goal: 'Compare overlapping requirements, record interpretations and obtain an accountable resolution of incompatible obligations before adoption.', actorTypes: ['it-ciso', 'it-risk-owner', 'it-exception-approver'] },
  { slug: 'inspect-vocabulary-coverage', name: 'Identify gaps in selected vocabulary coverage', goal: 'Compare selected vocabulary against an explicit subject and concern inventory, exposing uncovered areas without claiming legal completeness.', actorTypes: ['it-architect', 'specification-reader'] },
  { slug: 'maintain-artifact-bindings', name: 'Author and maintain reusable output bindings', goal: 'Define versioned template fields and source bindings that produce consistent named artifact families from pinned definitions.', actorTypes: ['it-knowledge-owner', 'it-architect'] },
  { slug: 'preview-artifact-bindings', name: 'Preview bindings before generating an artifact', goal: 'Inspect sample binding resolution and missing inputs before accepting a template for document generation.', actorTypes: ['it-knowledge-owner', 'it-architect'] },
  { slug: 'constrain-generated-narrative', name: 'Set grounding constraints for generated narrative', goal: 'Specify source requirements and editorial constraints for generated fields, then review citations and unsupported statements before accepting output.', actorTypes: ['it-knowledge-owner', 'it-head-of-ai'] },
  { slug: 'operate-recurring-reports', name: 'Operate recurring report production', goal: 'Schedule version-pinned report production and detect failed or late runs before a review depends on the output.', actorTypes: ['it-knowledge-owner', 'it-platform'] },
  { slug: 'investigate-artifact-failure', name: 'Investigate partial or failed generation', goal: 'Inspect job completion, errors and partial outputs to decide what can be reused and what must be regenerated and reviewed.', actorTypes: ['it-knowledge-owner', 'it-platform'] },
  { slug: 'propose-appraisal-remediation', name: 'Turn uncovered obligations into corrective proposals', goal: 'Turn scoped findings into owned definition-change proposals and verify resolution through a subsequent appraisal rather than merely closing a task.', actorTypes: ['it-ciso', 'it-risk-owner', 'it-architect'] },
  { slug: 'bind-obligations-to-scope', name: 'Bind selected obligations to an organizational scope', goal: 'Establish the subjects, conditions and accountable interpretation that make selected obligations applicable to a specific adopting scope.', actorTypes: ['it-ciso', 'it-service-owner'] },
  { slug: 'assess-invalidated-dependencies', name: 'Assess dependent definitions after foundation invalidation', goal: 'Inspect dependent definition eligibility after a referenced foundation is invalidated and determine which continued uses require renewed review.', actorTypes: ['it-architect', 'it-platform'] },
  { slug: 'agree-evidence-preservation', name: 'Agree evidence-preservation requirements', goal: 'Agree retention purpose, duration, access and disposal constraints for decision evidence, distinguishing agreed policy from demonstrated enforcement.', actorTypes: ['it-ciso', 'it-knowledge-owner', 'it-risk-owner'] },
  { slug: 'qualify-rule-revision', name: 'Qualify a rule revision against reference cases', goal: 'Compare old and proposed rule verdicts on pinned reference inputs, investigate changed or unknown results and record acceptance before adoption.', actorTypes: ['assessment-runner', 'it-ciso', 'it-architect'] },
  { slug: 'agree-domain-typing-contract', name: 'Agree a reusable domain typing contract', goal: 'Agree a versioned vocabulary and its constraints with adopters, using examples and counterexamples to expose incompatible interpretations.', actorTypes: ['specification-reader', 'it-data-steward', 'it-architect'] },
  { slug: 'qualify-processor-interchange', name: 'Qualify transfer between independent processors', goal: 'Compare exported and imported definitions against an explicit conformance profile, including identity, lifecycle meaning and nonconformant draft preservation.', actorTypes: ['integration-client', 'specification-reader', 'it-platform'] },
  { slug: 'approve-agent-mandate', name: 'Approve an agent resource and action mandate', goal: 'Authorize only the resources and actions required by a bounded assignment, with explicit expiry, review boundaries and prohibited effects.', actorTypes: ['it-head-of-ai', 'it-exception-approver', 'it-platform'] },
  { slug: 'qualify-model-routing', name: 'Qualify model routing for a workload', goal: 'Compare candidate model routes against workload-specific quality, cost and disclosure criteria using retained evaluation evidence.', actorTypes: ['it-head-of-ai', 'it-platform'] },
  { slug: 'qualify-host-instructions', name: 'Qualify instruction delivery on another host', goal: 'Verify that a target host receives the pinned instructions and declared checks, distinguishing delivery from model adherence before migration.', actorTypes: ['it-platform', 'it-head-of-ai'] },
  { slug: 'reconcile-parallel-agent-outputs', name: 'Reconcile conflicting parallel agent outputs', goal: 'Resolve overlapping edits against a shared baseline while retaining attribution and revalidating the combined artifacts before acceptance.', actorTypes: ['it-platform', 'delivery-agent'] },
  { slug: 'assess-application-retirement', name: 'Assess application decommissioning prerequisites', goal: 'Identify dependent consumers, retained obligations and missing evidence before approving an application retirement boundary; execution remains a separate operation.', actorTypes: ['it-application-owner', 'it-service-owner', 'it-architect'] },
  { slug: 'accept-service-baseline', name: 'Accept a service responsibility baseline', goal: 'Agree service commitments, application dependencies and accountable owners against a dated evidence baseline.', actorTypes: ['it-service-owner', 'it-application-owner', 'it-business-process-owner'] },
  { slug: 'transfer-service-ownership', name: 'Transfer service ownership', goal: 'Obtain explicit acceptance of service responsibilities, active exceptions and unresolved obligations by the receiving owner.', actorTypes: ['it-service-owner', 'it-application-owner', 'it-knowledge-owner'] },
  { slug: 'review-time-bound-exception', name: 'Review a time-bound risk exception', goal: 'Decide a scoped exception with explicit authority, expiry, risk ownership and compensating-control evidence.', actorTypes: ['it-risk-owner', 'it-exception-approver', 'it-service-owner'] },
  { slug: 'renew-or-close-exception', name: 'Renew or close a risk exception', goal: 'Review current exposure and control evidence before renewing, revoking or closing an exception at its review boundary.', actorTypes: ['it-risk-owner', 'it-exception-approver'] },
  { slug: 'review-breaking-api-change', name: 'Review a breaking API contract change', goal: 'Identify affected consumers and inspect compatibility evidence before accepting an interface change and migration conditions.', actorTypes: ['it-api-product-owner', 'it-architect', 'it-application-owner'] },
  { slug: 'coordinate-api-deprecation', name: 'Coordinate an API deprecation', goal: 'Agree consumer migration and retirement prerequisites while making unknown consumers and unresolved compatibility visible.', actorTypes: ['it-api-product-owner', 'it-application-owner'] },
  { slug: 'handover-operational-evidence', name: 'Hand over operational decisions and evidence', goal: 'Give a receiving service owner authoritative decisions, source evidence and unresolved questions sufficient to review and accept a handover.', actorTypes: ['it-knowledge-owner', 'it-service-owner', 'it-platform'] },
  { slug: 'prioritize-service-vulnerabilities', name: 'Prioritize vulnerabilities by service exposure', goal: 'Relate findings to deployed components, affected services and business criticality to assign justified remediation priorities and owners.', actorTypes: ['it-vulnerability-manager', 'it-product-security-engineer', 'it-service-owner'] },
  { slug: 'verify-vulnerability-mitigation', name: 'Review vulnerability mitigation evidence', goal: 'Decide whether observed verification supports closure of a finding or requires a separately approved, time-bound exception.', actorTypes: ['it-product-security-engineer', 'it-vulnerability-manager', 'it-risk-owner'] },
  { slug: 'assess-supplier-service-change', name: 'Assess a supplier change against service commitments', goal: 'Review changed supplier terms and assurance evidence against dependent services, accountable owners and unresolved exposure.', actorTypes: ['it-procurement-manager', 'it-third-party-risk-analyst', 'it-service-owner'] },
  { slug: 'review-supplier-exit-readiness', name: 'Review supplier exit readiness', goal: 'Assess replacement dependencies, portability evidence and retained obligations before accepting a supplier exit plan.', actorTypes: ['it-procurement-manager', 'it-third-party-risk-analyst', 'it-service-owner'] },
  { slug: 'review-service-recovery-exercise', name: 'Review a service recovery exercise', goal: 'Compare observed recovery time and data restoration with service and business commitments, retaining untested scenarios and evidence gaps.', actorTypes: ['it-resilience-manager', 'it-recovery-coordinator', 'it-service-owner', 'it-business-process-owner'] },
  { slug: 'resolve-recovery-dependency-conflicts', name: 'Resolve recovery dependency conflicts', goal: 'Identify incompatible recovery sequences and shared-resource assumptions before agreeing a service recovery exercise plan.', actorTypes: ['it-recovery-coordinator', 'it-resilience-manager', 'it-platform'] },
  { slug: 'review-data-contract-change', name: 'Review a data contract change', goal: 'Review schema, meaning and quality changes with affected producers and consumers before accepting migration conditions.', actorTypes: ['it-data-owner', 'it-data-steward', 'it-application-owner'] },
  { slug: 'resolve-data-quality-requirements', name: 'Resolve competing data-quality requirements', goal: 'Agree scoped quality expectations and evidence requirements when consumers need different freshness, completeness or accuracy.', actorTypes: ['it-data-owner', 'it-data-steward', 'it-service-owner'] },
  { slug: 'trace-incident-business-impact', name: 'Trace a software incident to affected business processes', goal: 'Trace an observed software incident through identified deployed components and service dependencies to affected business processes and owners, distinguishing confirmed disruption, possible exposure and missing evidence to prioritize response.', actorTypes: ['it-incident-commander', 'it-service-owner', 'it-application-owner', 'it-business-process-owner', 'it-platform'] },
  { slug: 'read-governance-model', name: 'Read and model a governance decision', goal: 'Produce a reviewable model sketch with explicit types, obligations and lifecycle boundaries.', actorTypes: ['specification-reader', 'it-architect'] },
  { slug: 'describe-service-contract', name: 'Describe a service contract and its attribution', goal: 'Draft a typed HTTP service description that identifies the IT subject and the source of each assertion.', actorTypes: ['specification-reader', 'it-architect'] },
  { slug: 'describe-mixed-protocol-boundaries', name: 'Describe payment request and notification boundaries', goal: 'Review how payment submission, request failure and later status notifications differ at the customer boundary.', actorTypes: ['specification-reader', 'it-platform'] },
  { slug: 'describe-payment-settlement-boundaries', name: 'Describe payment settlement and recovery boundaries', goal: 'Review the handoff from a committed payment instruction to a recoverable settlement job.', actorTypes: ['specification-reader', 'it-platform'] },
  { slug: 'review-sourced-obligations', name: 'Review sourced obligations before binding them', goal: 'Prepare a source-linked shortlist of architecture, quality and regulatory requirements for a bounded IT review.', actorTypes: ['it-ciso', 'it-architect', 'specification-reader'] },
  { slug: 'upgrade-governance-packages', name: 'Review a governance package upgrade', goal: 'Adopt changed financial resilience, delivery and service-management requirements without silently changing accepted obligations.', actorTypes: ['it-ciso', 'it-architect', 'it-platform'] },
  { slug: 'review-model-evidence', name: 'Review a model research question', goal: 'Trace a non-normative modeling question to its explanations and recorded decision status.', actorTypes: ['research-reviewer', 'specification-reader'] },
  { slug: 'propose-grammar-extension', name: 'Test and propose a grammar extension', goal: 'Turn a demonstrated modeling limit into a reviewable compatibility-aware Change Proposal.', actorTypes: ['research-reviewer', 'specification-reader'] },
  { slug: 'incorporate-accepted-grammar-extension', name: 'Incorporate an accepted grammar extension', goal: 'Incorporate an approved grammar change with explicit compatibility and migration boundaries.', actorTypes: ['specification-reader', 'research-reviewer'] },
  { slug: 'author-reviewed-definition', name: 'Author and approve a shared definition', goal: 'Replace a document-only change with an attributable, revision-bound definition decision.', actorTypes: ['it-architect', 'it-ciso'] },
  { slug: 'reconcile-code-evidence', name: 'Reconcile code evidence into reviewed definitions', goal: 'Turn competing source-revision candidates into attributable definition drafts for review.', actorTypes: ['it-architect', 'it-platform', 'integration-client'] },
  { slug: 'consume-authorized-context', name: 'Consume authorized definition context', goal: 'Give an integration client a policy-filtered, pinned context snapshot without granting authority to change systems.', actorTypes: ['integration-client', 'it-head-of-ai'] },
  { slug: 'react-to-definition-change', name: 'React to a committed definition change', goal: 'Refresh a downstream view from committed changes without repeated full polling.', actorTypes: ['integration-client', 'it-platform'] },
  { slug: 'review-scoped-appraisal', name: 'Review a scoped IT appraisal', goal: 'Review versioned findings with explicit applicability, input identity and missing evidence.', actorTypes: ['it-ciso', 'assessment-runner', 'it-architect'] },
  { slug: 'review-recurring-service-appraisal', name: 'Review recurring patient-portal appraisal', goal: 'Review successive operational findings for a named portal deployment with visible observation coverage and freshness.', actorTypes: ['it-ciso', 'it-platform', 'assessment-runner'] },
  { slug: 'inspect-change-impact', name: 'Inspect a change before committing to it', goal: 'Trace affected definitions and obligations, then record what remains unknown before deciding.', actorTypes: ['it-architect', 'it-cto', 'it-platform'] },
  { slug: 'ask-cited-it-question', name: 'Ask an IT question and inspect its sources', goal: 'Obtain a read-only answer whose claims can be checked against authorized definition snapshots.', actorTypes: ['it-head-of-ai', 'it-architect'] },
  { slug: 'generate-decision-pack', name: 'Generate and review an architecture decision pack', goal: 'Assemble an ADR pack and evidence summary from the same pinned inputs, then review the substantive result.', actorTypes: ['it-architect', 'it-cto'] },
  { slug: 'execute-bounded-response', name: 'Execute a bounded response and inspect the receipt', goal: 'Perform a named authorized operation and retain enough evidence to decide whether recovery is needed.', actorTypes: ['it-platform', 'integration-client', 'assessment-runner'] },
  { slug: 'deliver-reviewed-artifact', name: 'Deliver a reviewed artifact through a local workflow', goal: 'Produce a scoped artifact through an attributable local method, checks and human review.', actorTypes: ['delivery-agent', 'it-platform', 'it-head-of-ai'] },
  { slug: 'install-and-publish-workspace', name: 'Set up a workspace and publish checked artifacts', goal: 'Reproduce a pinned local delivery environment and carry the same declared artifact checks into controlled CI publication.', actorTypes: ['it-platform', 'delivery-agent'] },
  { slug: 'reuse-delivery-evidence', name: 'Reuse captured delivery evidence as definition proposals', goal: 'Turn a pinned artifact and its captured journal into inspectable candidates without confusing generated work with deployed behavior.', actorTypes: ['integration-client', 'it-architect'] },
];

export const poesisUsage: UsageGraph = { actorTypes, pains: usagePains, useCases };

export interface UsageFeature { slug: string; solution: Solution; product: Product; feature: Feature }
export interface UsageCapability { slug: string; solution: Solution; capability: Capability }
export interface UsageAffordance { slug: string; affordance: Affordance }

/** Every feature, flattened under its `<solution>/<product>/<feature>` identity. */
export const usageFeatures: UsageFeature[] = platformSolutions.flatMap((solution) => solution.products.flatMap((product) => product.features.map((feature) => ({ slug: `${solution.slug}/${product.slug}/${feature.slug}`, solution, product, feature }))));
/** Every capability, flattened under its `<solution>/<capability>` identity. */
export const usageCapabilities: UsageCapability[] = platformSolutions.flatMap((solution) => solution.capabilities.map((capability) => ({ slug: `${solution.slug}/${capability.slug}`, solution, capability })));
export const usageAffordances: UsageAffordance[] = affordances.map((affordance) => ({ slug: affordance.slug, affordance }));

export interface ValueSupport { type: 'feature' | 'capability' | 'affordance'; slug: string; name: string; href: string; state: DeliveryState }

export function featureHref(entry: UsageFeature): string { return `${solutionHref(entry.solution)}/products/${entry.product.slug}#${entry.feature.slug}`; }
export function capabilityHref(entry: UsageCapability): string { return `${solutionHref(entry.solution)}#${entry.capability.slug}`; }
export function affordanceHref(entry: UsageAffordance): string { return `/#affordance-${entry.affordance.slug}`; }

/** Platform items that claim to realize this value, in feature → capability → affordance order. */
export function valueSupports(slug: string): ValueSupport[] {
  return [
    ...usageFeatures.filter((entry) => entry.feature.values.includes(slug)).map((entry) => ({ type: 'feature' as const, slug: entry.slug, name: entry.feature.name, href: featureHref(entry), state: entry.feature.delivery.state })),
    ...usageCapabilities.filter((entry) => entry.capability.values.includes(slug)).map((entry) => ({ type: 'capability' as const, slug: entry.slug, name: entry.capability.name, href: capabilityHref(entry), state: entry.capability.delivery.state })),
    ...usageAffordances.filter((entry) => entry.affordance.values.includes(slug)).map((entry) => ({ type: 'affordance' as const, slug: entry.slug, name: entry.affordance.name, href: affordanceHref(entry), state: entry.affordance.delivery.state })),
  ];
}
export function valueStatus(slug: string): 'planned' | 'delivered' | undefined {
  const supports = valueSupports(slug);
  return supports.length ? commitmentStatus(supports.map((support) => support.state)) : undefined;
}

function valueOwner(slug: string): string[] { return slug.replace(/^value:/, '').split('/'); }
/** Where this value is rendered: the platform page, a solution page or a product page. */
export function valueHref(value: Pick<Value, 'slug'>): string {
  const [owner, ...rest] = valueOwner(value.slug);
  if (!rest.length) return `/values#${valueAnchor(value)}`;
  if (owner === 'platform') return `/#${valueAnchor(value)}`;
  const base = solutionHref({ slug: owner });
  return rest.length === 2 ? `${base}/products/${rest[0]}#${valueAnchor(value)}` : `${base}#${valueAnchor(value)}`;
}

export const platformValues: Value[] = usageValues.filter((value) => value.slug.startsWith('value:platform/'));
export function solutionValues(solutionSlug: string): Value[] { return usageValues.filter((value) => { const parts = valueOwner(value.slug); return parts.length === 2 && parts[0] === solutionSlug; }); }
export function productValues(solutionSlug: string, productSlug: string): Value[] { return usageValues.filter((value) => { const parts = valueOwner(value.slug); return parts.length === 3 && parts[0] === solutionSlug && parts[1] === productSlug; }); }
export function valueBySlug(slug: string): Value | undefined { return usageValues.find((value) => value.slug === slug); }

export function featuresForUseCase(slug: string): UsageFeature[] { return usageFeatures.filter((entry) => entry.feature.useCases.includes(slug)); }
export function capabilitiesForUseCase(slug: string): UsageCapability[] { return usageCapabilities.filter((entry) => entry.capability.useCases.includes(slug)); }
export function affordancesForUseCase(slug: string): UsageAffordance[] { return usageAffordances.filter((entry) => entry.affordance.useCases.includes(slug)); }
/** Values reachable from every platform item serving this use case. */
export function valuesForUseCase(slug: string): Value[] {
  const references = new Set([...featuresForUseCase(slug).flatMap((entry) => entry.feature.values), ...capabilitiesForUseCase(slug).flatMap((entry) => entry.capability.values), ...affordancesForUseCase(slug).flatMap((entry) => entry.affordance.values)]);
  return usageValues.filter((value) => references.has(value.slug));
}
/**
 * Pains reachable from the items serving this use case, plus pains that name the
 * case directly through `occursIn` — a pain can be felt in a case that no
 * current feature addresses yet.
 */
export function painsForUseCase(slug: string): UsagePain[] {
  const references = new Set([...featuresForUseCase(slug).flatMap((entry) => entry.feature.pains), ...capabilitiesForUseCase(slug).flatMap((entry) => entry.capability.pains), ...affordancesForUseCase(slug).flatMap((entry) => entry.affordance.pains)]);
  return usagePains.filter((pain) => references.has(pain.slug) || (pain.occursIn ?? []).includes(slug));
}
export function useCaseStatus(useCase: Pick<UseCase, 'slug'>): 'planned' | 'delivered' | undefined {
  const features = featuresForUseCase(useCase.slug);
  const states = features.length ? features.map((entry) => entry.feature.delivery.state) : [
    ...capabilitiesForUseCase(useCase.slug).map((entry) => entry.capability.delivery.state),
    ...affordancesForUseCase(useCase.slug).map((entry) => entry.affordance.delivery.state),
  ];
  return states.length ? commitmentStatus(states) : undefined;
}

export function useCasesForPain(painSlug: string): UseCase[] { return useCases.filter((useCase) => painsForUseCase(useCase.slug).some((pain) => pain.slug === painSlug)); }
export function useCasesForFeature(reference: string): UseCase[] { const entry = usageFeatures.find((candidate) => candidate.slug === reference); return entry ? useCases.filter((useCase) => entry.feature.useCases.includes(useCase.slug)) : []; }
export function useCasesForProduct(solutionSlug: string, productSlug: string): UseCase[] {
  const references = new Set(usageFeatures.filter((entry) => entry.solution.slug === solutionSlug && entry.product.slug === productSlug).flatMap((entry) => entry.feature.useCases));
  return useCases.filter((useCase) => references.has(useCase.slug));
}
export function useCasesForSolution(solutionSlug: string): UseCase[] {
  const references = new Set([...usageFeatures.filter((entry) => entry.solution.slug === solutionSlug).flatMap((entry) => entry.feature.useCases), ...usageCapabilities.filter((entry) => entry.solution.slug === solutionSlug).flatMap((entry) => entry.capability.useCases)]);
  return useCases.filter((useCase) => references.has(useCase.slug));
}

/**
 * Item-to-value edges. They live here rather than in poesis-platform.ts because
 * their scope is the value body, and the platform module does not read values.
 */
export const valueEdges: SemanticEdge[] = usageValues.flatMap((value) => valueSupports(value.slug).map((support) => ({ id: `${support.type}:${support.slug}->${value.slug}`, source: `${support.type}:${support.slug}`, target: value.slug, kind: 'supports-benefit' as const, scope: value.body })));

/** How much of the platform is reachable from at least one use case. */
export function usageCoverage(): { features: number; capabilities: number; affordances: number } {
  return {
    features: usageFeatures.filter((entry) => entry.feature.useCases.length).length,
    capabilities: usageCapabilities.filter((entry) => entry.capability.useCases.length).length,
    affordances: usageAffordances.filter((entry) => entry.affordance.useCases.length).length,
  };
}

function unique(values: string[], label: string): void { if (new Set(values).size !== values.length) throw new Error(`Duplicate ${label}`); }

export function validateUsage(graph: UsageGraph = poesisUsage, values: Value[] = usageValues): void {
  unique(graph.useCases.map((useCase) => useCase.slug), 'use case');
  unique(graph.actorTypes.map((actor) => actor.slug), 'actor type');
  unique(graph.pains.map((pain) => pain.slug), 'pain');
  unique(values.map((value) => value.slug), 'value');

  const caseSlugs = new Set(graph.useCases.map((useCase) => useCase.slug));
  const actorSlugs = new Set(graph.actorTypes.map((actor) => actor.slug));
  const painSlugs = new Set(graph.pains.map((pain) => pain.slug));
  const valueSlugs = new Set(values.map((value) => value.slug));

  for (const useCase of graph.useCases) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(useCase.slug)) throw new Error(`Invalid use case slug: ${useCase.slug}`);
    if (!useCase.name.trim() || !useCase.goal.trim()) throw new Error(`Incomplete use case: ${useCase.slug}`);
    if (!useCase.actorTypes.length) throw new Error(`Unattributed use case: ${useCase.slug}`);
    unique(useCase.actorTypes, `use case actor on ${useCase.slug}`);
    for (const actor of useCase.actorTypes) if (!actorSlugs.has(actor)) throw new Error(`Unknown actor type: ${actor}`);
  }
  for (const pain of graph.pains) {
    if (!pain.actorTypes.length) throw new Error(`Unattributed pain: ${pain.slug}`);
    for (const actor of pain.actorTypes) if (!actorSlugs.has(actor)) throw new Error(`Unknown actor type: ${actor}`);
    for (const reference of pain.occursIn ?? []) if (!caseSlugs.has(reference)) throw new Error(`Unknown pain use case: ${reference}`);
  }
  for (const value of values) {
    if (!/^value:(?:[a-z0-9]+(?:-[a-z0-9]+)*|platform\/[a-z0-9-]+|[a-z0-9-]+(?:\/[a-z0-9-]+)?\/[0-9]{2})$/.test(value.slug) || value.slug.endsWith('/00')) throw new Error(`Invalid value identity: ${value.slug}`);
    if (!value.originalTitle.trim() || !value.title.trim() || !value.body.trim()) throw new Error(`Empty value claim: ${value.slug}`);
  }

  const check = (label: string, item: { values: string[]; pains: string[]; useCases: string[] }) => {
    for (const reference of item.values) if (!valueSlugs.has(reference)) throw new Error(`Unknown value reference on ${label}: ${reference}`);
    for (const reference of item.pains) if (!painSlugs.has(reference)) throw new Error(`Unknown pain reference on ${label}: ${reference}`);
    for (const reference of item.useCases) if (!caseSlugs.has(reference)) throw new Error(`Unknown use case reference on ${label}: ${reference}`);
  };
  for (const entry of usageFeatures) check(`feature ${entry.slug}`, entry.feature);
  for (const entry of usageCapabilities) check(`capability ${entry.slug}`, entry.capability);
  for (const entry of usageAffordances) check(`affordance ${entry.slug}`, entry.affordance);

  // A value's slug states who may realize it; anything else would make the
  // prefix-based rendering on solution and product pages dishonest.
  for (const value of values) {
    const parts = valueOwner(value.slug);
    if (parts.length === 1) continue;
    for (const support of valueSupports(value.slug)) {
      const owner = support.slug.split('/');
      const valid = parts[0] === 'platform'
        ? support.type === 'affordance'
        : parts.length === 2
          ? support.type === 'capability' && owner[0] === parts[0]
          : support.type === 'feature' && owner[0] === parts[0] && owner[1] === parts[1];
      if (!valid) throw new Error(`Invalid value identity: ${support.type}:${support.slug} does not own ${value.slug}`);
    }
  }

  unique(valueEdges.map((edge) => edge.id), 'value edge');
}
validateUsage();

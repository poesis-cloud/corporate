/**
 * Machine-readable mirror of the canonical roadmap register
 * (strategy/roadmap.md → public page docs.poesis.cloud/milestones/).
 * Every corporate surface that shows delivery state renders from this file —
 * change the register first, then this mirror in the same change set.
 */

export interface VersionMilestone {
  version: string;
  label: string;
  shipped?: boolean;
  ga?: boolean;
}

export interface ProductRoadmap {
  solution: string;
  product: string;
  /** Current version of the product line. */
  current: string;
  milestones: VersionMilestone[];
  /** Feature slug (solutions.ts) → version that delivers it. */
  featureVersions: Record<string, string>;
}

export const CLAUSE_URL = 'https://docs.poesis.cloud/milestones/';

export const roadmaps: ProductRoadmap[] = [
  {
    solution: 'itip',
    product: 'web-application',
    current: '0.1',
    milestones: [
      { version: '0.1', label: 'First pre-GA increment — application & BFF foundation', shipped: true },
      { version: '1.0', label: 'MVP/GA — GSM Definitions & Ontology management, RBAC/ABAC, hardened', ga: true },
      { version: '1.1', label: 'IT artifact factory' },
      { version: '1.2', label: 'Truth sourcing management' },
      { version: '1.3', label: 'IT compliance evaluation' },
      { version: '1.4', label: 'IT Copilot' },
      { version: '1.5', label: 'IT impact simulation' },
    ],
    featureVersions: {
      'definitions-management': '1.0',
      'ontology-management': '1.0',
      'rbac-abac': '1.0',
      'it-artifact-factory': '1.1',
      'definitions-truth-sourcing-management': '1.2',
      'it-compliance-evaluation': '1.3',
      'it-copilot': '1.4',
      'it-impact-simulation': '1.5',
    },
  },
  {
    solution: 'itip',
    product: 'definition-blackboard-code-sourcer',
    current: '0.0',
    milestones: [
      { version: '0.x', label: 'Pre-GA increments' },
      { version: '1.0', label: 'MVP/GA — GSM Definitions automatic sourcing from code repos', ga: true },
    ],
    featureVersions: {
      'automatic-sourcing-from-code-repos': '1.0',
    },
  },
  {
    solution: 'sie',
    product: 'definition-manager',
    current: '1.0',
    milestones: [
      { version: '1.0', label: 'MVP/GA — Definitions management API, lifecycle enforcement, retention', shipped: true, ga: true },
      { version: '1.1', label: 'GSM Definitions lifecycle events mediation' },
      { version: '1.2', label: 'MCP' },
    ],
    featureVersions: {
      'definitions-management-api': '1.0',
      'definitions-lifecycle-enforcement': '1.0',
      'definitions-retention': '1.0',
      'lifecycle-events-mediation': '1.1',
      mcp: '1.2',
    },
  },
  {
    solution: 'sie',
    product: 'operator',
    current: '0.1',
    milestones: [
      { version: '0.1', label: 'Basic Mechanism runtime', shipped: true },
      { version: '1.0', label: 'MVP/GA — GSM Norms evaluation API', ga: true },
      { version: '1.1', label: 'GSM Mechanism execution foundations' },
      { version: '1.x', label: 'GSM Mechanism execution technos integrations (ongoing, unordered)' },
    ],
    featureVersions: {
      'norms-evaluation-api': '1.0',
      'mechanism-execution-foundations': '1.1',
      'mechanism-execution-technos-integrations': '1.x',
    },
  },
  {
    solution: 'sie',
    product: 'definition-blackboard-manager',
    current: '1.0',
    milestones: [
      { version: '1.0', label: 'MVP/GA — contributions API, seal lifecycle, audit ledger', shipped: true, ga: true },
    ],
    featureVersions: {
      'ks-contributions-management-api': '1.0',
      'ks-contributions-lifecycle-enforcement': '1.0',
      'ks-contributions-retention': '1.0',
    },
  },
  {
    solution: 'gsm',
    product: 'specifications',
    current: '1.0',
    milestones: [
      { version: '1.0', label: 'Normative content frozen — Systemic Primitives, DNA grammar, Archetyping, lifecycle (publication of the document set pending)', shipped: true, ga: true },
      { version: '1.1', label: 'Enhanced Directives and Norms model' },
    ],
    featureVersions: {
      primitives: '1.0',
      'dna-grammar': '1.0',
      archetyping: '1.0',
      'systemic-lifecycle-management': '1.0',
    },
  },
  {
    solution: 'gsm',
    product: 'ontology',
    current: '0.1',
    milestones: [
      { version: '0.1', label: 'First ontologies sourced', shipped: true },
      { version: '1.0', label: 'MVP/GA — HTTP, TOGAF, IT, ISO 25010, ISO 25012, and PROV complete & validated', ga: true },
      { version: '1.x', label: 'Remaining protocols (gRPC, GraphQL, Kafka, AMQP, JDBC, WebSocket) · GDPR · NIS2 · SCAP · DORA · SAFe · ITIL (unordered)' },
    ],
    featureVersions: {
      http: '1.0',
      togaf: '1.0',
      it: '1.0',
      'iso-25010': '1.0',
      'iso-25012': '1.0',
      prov: '1.0',
      grpc: '1.x',
      graphql: '1.x',
      kafka: '1.x',
      amqp: '1.x',
      jdbc: '1.x',
      websocket: '1.x',
      gdpr: '1.x',
      nis2: '1.x',
      scap: '1.x',
      dora: '1.x',
      safe: '1.x',
      itil: '1.x',
      'catalogue-update-stream': '1.x',
    },
  },
  {
    solution: 'gsm',
    product: 'research-lab',
    current: '1.0.0-beta.1',
    milestones: [
      { version: '1.0.0-beta.1', label: 'Generative Governance program extracted — causal model, governance chain, DNA production, cases, decision register', shipped: true },
      { version: '1.0', label: 'MVP/GA — research protocol, published programs, promotion path into GSM Change Proposals', ga: true },
    ],
    featureVersions: {
      'causal-model': '1.0.0-beta.1',
      'governance-chain': '1.0.0-beta.1',
      'dna-production': '1.0.0-beta.1',
      cases: '1.0.0-beta.1',
      'decision-register': '1.0.0-beta.1',
    },
  },
  {
    solution: 'saf',
    product: 'agentic-harness',
    current: '1.0',
    milestones: [
      { version: '1.0', label: 'MVP/GA — resolution, injection, LLM routing, validation, authorization, logging', shipped: true, ga: true },
    ],
    featureVersions: {
      'workflows-steps-resolution': '1.0',
      'skills-instructions-prompt-injection': '1.0',
      'llm-resolution': '1.0',
      'artifact-validation': '1.0',
      'step-authorization': '1.0',
      logging: '1.0',
    },
  },
  {
    solution: 'saf',
    product: 'safe-agentic-organization',
    current: '0.1',
    milestones: [
      { version: '0.1', label: 'First pre-GA increment — framework scaffold', shipped: true },
      { version: '1.0', label: 'MVP/GA — agents, skills, workflows, instructions, artifacts', ga: true },
    ],
    featureVersions: {
      agents: '1.0',
      skills: '1.0',
      workflows: '1.0',
      instructions: '1.0',
      artifacts: '1.0',
    },
  },
  {
    solution: 'saf',
    product: 'agentic-workspace',
    current: '0.0',
    milestones: [
      { version: '0.x', label: 'Pre-GA increments' },
      { version: '1.0', label: 'MVP/GA — workspace data plane, installer, CI/CD artifact pipelines', ga: true },
    ],
    featureVersions: {
      'workspace-data-plane': '1.0',
      installer: '1.0',
      'cicd-pipelines': '1.0',
    },
  },
  {
    solution: 'saf',
    product: 'saf-sie-bridge',
    current: '0.0',
    milestones: [
      { version: '0.x', label: 'Pre-GA increments' },
      { version: '1.0', label: 'MVP/GA — harness history sourcing into GSM contributions on the Definition Blackboard Manager', ga: true },
    ],
    featureVersions: {
      'harness-history-sourcing': '1.0',
    },
  },
];

export function roadmapFor(solution: string, product: string): ProductRoadmap | undefined {
  return roadmaps.find((r) => r.solution === solution && r.product === product);
}

/** Version pill data for a feature: version + whether that batch has shipped. */
export function featureStatus(
  roadmap: ProductRoadmap | undefined,
  featureSlug: string
): { version: string; shipped: boolean } | undefined {
  const version = roadmap?.featureVersions[featureSlug];
  if (!roadmap || !version) return undefined;
  const m = roadmap.milestones.find((x) => x.version === version);
  return { version, shipped: m?.shipped === true };
}

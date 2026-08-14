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
      { version: '1.0', label: 'MVP/GA — GSM Definitions & Frameworks management, hardened', ga: true },
      { version: '1.x', label: 'Truth sourcing · artifact factory · compliance evaluation · impact simulation (unordered)' },
    ],
    featureVersions: {
      'definitions-management': '1.0',
      'frameworks-management': '1.0',
      'definitions-truth-sourcing-management': '1.x',
      'it-artifact-factory': '1.x',
      'it-compliance-evaluation': '1.x',
      'it-impact-simulation': '1.x',
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
    ],
    featureVersions: {
      'definitions-management-api': '1.0',
      'definitions-lifecycle-enforcement': '1.0',
      'definitions-retention': '1.0',
    },
  },
  {
    solution: 'sie',
    product: 'operator',
    current: '0.1',
    milestones: [
      { version: '0.1', label: 'Basic Mechanism runtime', shipped: true },
      { version: '1.0', label: 'MVP/GA — GSM Norms evaluation API', ga: true },
      { version: '1.x', label: 'GSM Mechanisms execution API' },
    ],
    featureVersions: {
      'norms-evaluation-api': '1.0',
      'mechanisms-execution-api': '1.x',
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
      { version: '1.0', label: 'Normative content frozen — primitives, DNA grammar, Archetyping, lifecycle (publication of the document set pending)', shipped: true, ga: true },
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
    product: 'frameworks',
    current: '0.1',
    milestones: [
      { version: '0.1', label: 'First frameworks sourced', shipped: true },
      { version: '1.0', label: 'MVP/GA — HTTP, TOGAF, and ITIP domain archetypes complete & validated', ga: true },
      { version: '1.x', label: 'Remaining protocol semantics · ISO 25010 · ISO 25012 · GDPR · NIS2 · SCAP · DORA · SAFe · ITIL (unordered)' },
    ],
    featureVersions: {
      http: '1.0',
      togaf: '1.0',
      'itip-domain-archetypes': '1.0',
      'protocol-semantics': '1.x',
      'iso-25010': '1.x',
      'iso-25012': '1.x',
      gdpr: '1.x',
      nis2: '1.x',
      scap: '1.x',
      dora: '1.x',
      safe: '1.x',
      itil: '1.x',
    },
  },
  {
    solution: 'saf',
    product: 'agentic-harness',
    current: '0.1',
    milestones: [
      { version: '0.1', label: 'First pre-GA increment — core scaffold', shipped: true },
      { version: '1.0', label: 'MVP/GA — resolution, injection, LLM routing, validation, authorization, logging', ga: true },
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
    current: '0.1',
    milestones: [
      { version: '0.1', label: 'First pre-GA increment — workspace scaffold', shipped: true },
      { version: '1.0', label: 'MVP/GA — installer + CI/CD artifact pipelines', ga: true },
    ],
    featureVersions: {
      installer: '1.0',
      'cicd-pipelines': '1.0',
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

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
    current: '0.0',
    milestones: [
      { version: '0.1', label: 'Definition authoring core' },
      { version: '0.2', label: 'Frameworks management' },
      { version: '0.3', label: 'Truth sourcing management' },
      { version: '0.4', label: 'Deliverables & admin' },
      { version: '1.0', label: 'GA — all v1 capabilities, hardened', ga: true },
      { version: '1.x', label: 'Evaluation, simulation, lenses, review, dashboards' },
    ],
    featureVersions: {
      'definitions-management': '0.1',
      'frameworks-management': '0.2',
      'definitions-truth-sourcing-management': '0.3',
      'it-artifact-factory': '0.4',
      'it-compliance-evaluation': '1.x',
      'it-impact-simulation': '1.x',
    },
  },
  {
    solution: 'itip',
    product: 'definition-blackboard-code-sourcer',
    current: '0.1',
    milestones: [
      { version: '0.1', label: 'Blackboard contribution path', shipped: true },
      { version: '0.2', label: 'Core sourcing pipeline' },
      { version: '0.3', label: 'IT-domain source adapters' },
      { version: '1.0', label: 'GA — pipeline + adapters production-ready', ga: true },
      { version: '1.x', label: 'Legal, regulatory & standards adapters' },
    ],
    featureVersions: {
      'automatic-sourcing-from-code-repos': '0.2',
    },
  },
  {
    solution: 'sie',
    product: 'definition-manager',
    current: '0.1',
    milestones: [
      { version: '0.1', label: 'API, GSM core, lifecycle, retention', shipped: true },
      { version: '0.2', label: 'Descriptive analytics, assurance, presets' },
      { version: '0.3', label: 'Prescriptive analytics' },
      { version: '0.4', label: 'Diagnostic + predictive analytics' },
      { version: '1.0', label: 'GA — conformant to GSM 1.0, hardened', ga: true },
    ],
    featureVersions: {
      'definitions-management-api': '0.1',
      'definitions-lifecycle-enforcement': '0.1',
      'definitions-retention': '0.1',
    },
  },
  {
    solution: 'sie',
    product: 'operator',
    current: '0.1',
    milestones: [
      { version: '0.1', label: 'Norms evaluation, Mechanisms execution, sandbox', shipped: true },
      { version: '0.2', label: 'Closed-loop control maturation' },
      { version: '1.0', label: 'GA — conformant runtime for GSM 1.0', ga: true },
    ],
    featureVersions: {
      'norms-evaluation-api': '0.1',
      'mechanisms-execution-api': '0.1',
    },
  },
  {
    solution: 'sie',
    product: 'definition-blackboard-manager',
    current: '0.1',
    milestones: [
      { version: '0.1', label: 'Seal lifecycle, validation, audit ledger', shipped: true },
      { version: '0.2', label: 'Promotion path maturation' },
      { version: '1.0', label: 'GA — stable client contract', ga: true },
    ],
    featureVersions: {
      'ks-contributions-management-api': '0.1',
      'ks-contributions-lifecycle-enforcement': '0.1',
      'ks-contributions-retention': '0.1',
    },
  },
  {
    solution: 'gsm',
    product: 'specifications',
    current: '0.1',
    milestones: [
      { version: '0.1', label: 'Working Draft', shipped: true },
      { version: '0.2', label: 'Public publication of the document set' },
      { version: '1.0', label: 'Standard GA — normative content frozen', ga: true },
    ],
    featureVersions: {
      primitives: '0.1',
      'dna-grammar': '0.1',
      archetyping: '0.1',
      'systemic-lifecycle-management': '0.1',
    },
  },
  {
    solution: 'gsm',
    product: 'frameworks',
    current: '0.1',
    milestones: [
      { version: '0.1', label: 'Sourced vocabularies + legal Directives & Norms', shipped: true },
      { version: '0.2', label: 'Catalogue docs, executable Mechanisms' },
      { version: '1.0', label: 'GA — $id stability contract', ga: true },
    ],
    featureVersions: {
      'domain-vocabularies': '0.1',
      'standard-vocabularies': '0.1',
      'legal-vocabularies': '0.1',
      'legal-directives-norms': '0.1',
      'standard-mechanisms': '0.2',
    },
  },
  {
    solution: 'saf',
    product: 'agentic-harness',
    current: '0.1',
    milestones: [
      { version: '0.1', label: 'Deterministic core + VS Code adapter', shipped: true },
      { version: '0.2', label: 'Additional host adapters' },
      { version: '1.0', label: 'GA — stable CLI contract, multi-host parity', ga: true },
    ],
    featureVersions: {
      'workflows-steps-resolution': '0.1',
      'skills-instructions-prompt-injection': '0.1',
      'llm-resolution': '0.1',
      'artifact-validation': '0.1',
      'step-authorization': '0.1',
      logging: '0.1',
    },
  },
  {
    solution: 'saf',
    product: 'safe-agentic-organization',
    current: '0.1',
    milestones: [
      { version: '0.1', label: 'Orchestrators, bench, workflows, schemas', shipped: true },
      { version: '0.2', label: 'Ceremony coverage expansion' },
      { version: '1.0', label: 'GA — complete SAFe layer coverage', ga: true },
    ],
    featureVersions: {
      agents: '0.1',
      skills: '0.1',
      workflows: '0.1',
      instructions: '0.1',
      artifacts: '0.1',
    },
  },
  {
    solution: 'saf',
    product: 'agentic-workspace',
    current: '0.1',
    milestones: [
      { version: '0.1', label: 'Workspace data plane', shipped: true },
      { version: '0.2', label: 'Installer' },
      { version: '0.3', label: 'CI/CD artifact pipelines' },
      { version: '1.0', label: 'GA — turnkey governed workspace', ga: true },
    ],
    featureVersions: {
      installer: '0.2',
      'cicd-pipelines': '0.3',
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

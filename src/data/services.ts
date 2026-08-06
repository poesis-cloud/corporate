export interface ServicePoint {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  href: string;
  label: string;
  category: string;
  title: string;
  summary: string;
  lead: string;
  proposition: string;
  outcomes: ServicePoint[];
  stages: ServicePoint[];
}

export const services: Service[] = [
  {
    slug: 'consulting',
    href: '/services/consulting',
    label: 'Consulting',
    category: 'Transformation',
    title: 'Transform the operating system of IT.',
    summary: 'AI-generative and agentic transformation, grounded in systemic governance and focused first on the organization of IT.',
    lead: 'Move from isolated AI experiments to an operating model in which definitions, decisions, and agentic work remain connected to accountable governance.',
    proposition: 'Poesis consulting joins systems thinking, enterprise architecture, and agentic engineering around a concrete transformation path. IT is the first proving ground because it exposes the organization\'s structures, constraints, dependencies, and delivery feedback loops.',
    outcomes: [
      {
        title: 'A governable target model',
        description: 'Make decision rights, systemic definitions, constraints, and human disposition explicit before automating consequential work.',
      },
      {
        title: 'A focused AI portfolio',
        description: 'Select use cases by systemic leverage and evidence potential, rather than by novelty or model availability alone.',
      },
      {
        title: 'An executable first proof',
        description: 'Turn the target model into a bounded implementation that can be evaluated against operational outcomes.',
      },
    ],
    stages: [
      {
        title: 'Diagnose',
        description: 'Map the current operating system of IT, its governing definitions, friction points, and feedback gaps.',
      },
      {
        title: 'Design',
        description: 'Shape the target governance, architecture, and agentic workflows using the Poesis reference design where it fits.',
      },
      {
        title: 'Prove',
        description: 'Implement a controlled slice, collect evidence, and use the result to direct the next transformation increment.',
      },
    ],
  },
  {
    slug: 'saas',
    href: '/services/saas',
    label: 'SaaS',
    category: 'Managed cloud',
    title: 'Run Poesis as a managed service.',
    summary: 'A managed cloud path for owning the Poesis stack without operating its underlying platform engineering.',
    lead: 'Use the Poesis stack as a managed capability while retaining authority over the definitions, constraints, and decisions that govern your systems.',
    proposition: 'The SaaS service is designed for organizations that want durable access to Poesis capabilities, continuous platform evolution, and a clear operating boundary between their governance and the managed technical substrate.',
    outcomes: [
      {
        title: 'Managed platform operations',
        description: 'Reduce the infrastructure and lifecycle burden of operating the Poesis stack as its components evolve.',
      },
      {
        title: 'Faster learning cycles',
        description: 'Move from definition and configuration to governed experiments without first assembling a platform team.',
      },
      {
        title: 'Visible operating boundaries',
        description: 'Keep tenant definitions and human authority distinct from the technical responsibilities of the managed service.',
      },
    ],
    stages: [
      {
        title: 'Shape the environment',
        description: 'Agree tenancy, identity, data boundaries, integrations, and the initial governed use cases.',
      },
      {
        title: 'Connect the estate',
        description: 'Integrate approved sources and systems through explicit interfaces and controlled access paths.',
      },
      {
        title: 'Operate and evolve',
        description: 'Run the service, observe outcomes, and evolve definitions and capabilities through governed increments.',
      },
    ],
  },
  {
    slug: 'on-prem-integration-administration',
    href: '/services/on-prem-integration-administration',
    label: 'On-prem integration & administration',
    category: 'Sovereign deployment',
    title: 'Keep governed AI inside your control boundary.',
    summary: 'Deployment, integration, and administration of Poesis products in regulated, sovereign, and enterprise environments.',
    lead: 'Place the Poesis stack within the infrastructure, security, and operational boundaries your organization is accountable for.',
    proposition: 'On-premises delivery makes deployment sovereignty an architectural property rather than a marketing claim. We adapt the reference stack to enterprise controls while preserving the separation between governed definitions, execution, and operational administration.',
    outcomes: [
      {
        title: 'Control-boundary alignment',
        description: 'Map platform components, model endpoints, data paths, and identities to the organization\'s security zones.',
      },
      {
        title: 'Enterprise integration',
        description: 'Connect Poesis products to approved repositories, platforms, observability, and identity services.',
      },
      {
        title: 'Operable ownership',
        description: 'Establish administration, maintenance, evidence, and escalation practices for the deployed estate.',
      },
    ],
    stages: [
      {
        title: 'Architect',
        description: 'Define the target topology, trust boundaries, integration contracts, and operational responsibilities.',
      },
      {
        title: 'Deploy and integrate',
        description: 'Install the selected components and connect them through environment-specific, testable interfaces.',
      },
      {
        title: 'Administer',
        description: 'Operate the platform with runbooks, observability, lifecycle controls, and a clear support boundary.',
      },
    ],
  },
  {
    slug: 'certification',
    href: '/services/certification',
    label: 'Certification',
    category: 'Capability building',
    title: 'Build trusted delivery capability around Poesis.',
    summary: 'A Poesis-owned certification path for practitioners and partners delivering systemic, governed AI transformation.',
    lead: 'Create a shared threshold for the knowledge, applied judgment, and delivery evidence required to work credibly with Poesis.',
    proposition: 'Certification is designed to scale delivery without diluting the systemic and governance principles behind the products. It joins conceptual fluency with applied work, so recognition depends on demonstrated capability rather than attendance alone.',
    outcomes: [
      {
        title: 'Practitioner assurance',
        description: 'Make the expected knowledge of GSM, the Poesis stack, and governed agentic delivery explicit and assessable.',
      },
      {
        title: 'Partner consistency',
        description: 'Give implementation partners a common delivery baseline while preserving room for domain specialization.',
      },
      {
        title: 'Evidence-led progression',
        description: 'Connect recognition and renewal to applied work, continuing learning, and accountable practice.',
      },
    ],
    stages: [
      {
        title: 'Learn the foundations',
        description: 'Develop fluency in systemic governance, GSM semantics, and the roles of SIE, ITIP, and the delivery framework.',
      },
      {
        title: 'Demonstrate practice',
        description: 'Apply the concepts to realistic cases and produce reviewable evidence of sound judgment and execution.',
      },
      {
        title: 'Maintain standing',
        description: 'Keep certification current through continued practice, product evolution, and periodic reassessment.',
      },
    ],
  },
];
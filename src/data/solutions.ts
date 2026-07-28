/**
 * Poesis portfolio — the Solutions → Products → Features single source of truth.
 * SAFe mapping: the biggest boxes are Solutions (what the value streams deliver);
 * each Solution contains Products (the fundable, releasable units); each Product
 * lists Features (PI-sized behaviors). THINK / BUILD / RUN are context zones.
 */

export interface Feature {
  slug: string;
  name: string;
  blurb: string;
}

export interface ProductDef {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: Feature[];
  docs?: { href: string; label: string }[];
  repos?: { href: string; label: string }[];
}

export interface Solution {
  slug: string;
  name: string;
  fullName: string;
  tag: string;
  zone: 'THINK' | 'BUILD';
  href: string;
  tagline: string;
  description: string;
  products: ProductDef[];
}

export const solutions: Solution[] = [
  {
    slug: 'itip',
    name: 'ITIP',
    fullName: 'IT Intelligence Platform',
    tag: 'Domain Intelligence Platform',
    zone: 'THINK',
    href: '/solutions/itip',
    tagline: 'The IT Intelligence Platform — for IT organizations to define, govern, regulate, supervise their IT landscape as a single source of truth, and generate automatically any sort of IT artifacts from.',
    description:
      'ITIP is where every IT profile converges — architects, developers, ops, security and compliance — to define, govern, and visualize the IT landscape through a single governed source of truth. The first domain application built on SIE.',
    products: [
      {
        slug: 'web-application',
        name: 'Web Application',
        tagline: 'The platform every IT profile works in — definition, governance, generation.',
        description:
          'The web application and its backend-for-frontend: the governed definition inventory, the framework catalog & composer, artifact generation, and evaluation dashboards — one place where the IT landscape is defined, governed, and visualized.',
        features: [
          { slug: 'it-artifact-factory', name: 'IT artifact factory', blurb: 'Generate any IT deliverable from the definitions — ADR packs, compliance evidence, architecture baselines, roadmaps — each artifact traceable to its definitions.' },
          { slug: 'it-compliance-evaluation', name: 'IT compliance evaluation', blurb: 'Continuous governance indicators — measures and findings computed from the model, so compliance is observed, not reconstructed before each audit.' },
          { slug: 'it-impact-simulation', name: 'IT impact simulation', blurb: 'Simulate the ripple effect of a change through typed relations before it happens — impact you can trace, not guess.' },
          { slug: 'definitions-truth-sourcing-management', name: 'GSM Definitions truth sourcing management', blurb: 'Manage and review the sourcing pipelines that keep the model anchored to the real, running system.' },
          { slug: 'definitions-management', name: 'GSM Definitions management', blurb: 'Architecture, dependencies, obligations, and constraints live as one governed inventory — a single source of truth.' },
          { slug: 'frameworks-management', name: 'GSM Frameworks management', blurb: 'Browse, attach, and compose the published catalogue of frameworks sourced into GSM — a coherent governance fabric from day one.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/itip/', label: 'ITIP documentation' }],
        repos: [
          { href: 'https://github.com/poesis-cloud/itip-web-frontend', label: 'itip-web-frontend' },
          { href: 'https://github.com/poesis-cloud/itip-web-backend', label: 'itip-web-backend' },
        ],
      },
      {
        slug: 'repository-definition-sourcer',
        name: 'Definition Blackboard Code Sourcer',
        tagline: 'Truth sourcing — the model reflects reality, continuously.',
        description:
          'The sourcing pipeline that reads real IT artifacts — source code, API contracts, infrastructure — and posts them as evidence-backed contributions to the SIE Definition Blackboard Manager, so the definition stays anchored to the real system instead of drifting from it.',
        features: [
          { slug: 'automatic-sourcing-from-code-repos', name: 'Automatic sourcing of GSM Definitions from code repos', blurb: 'Source repositories, API contracts, SBOMs, and infrastructure into governed GSM definitions — the model reflects what actually runs, continuously.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/itip-blackboard-sourcer/', label: 'Sourcer documentation' }],
        repos: [{ href: 'https://github.com/poesis-cloud/itip-definition-blackboard-repository-sourcer', label: 'itip-definition-blackboard-repository-sourcer' }],
      },
    ],
  },
  {
    slug: 'sie',
    name: 'SIE',
    fullName: 'Systemic Intelligence Engine',
    tag: 'Engine',
    zone: 'THINK',
    href: '/solutions/sie',
    tagline: 'The Systemic Intelligence Engine — reference implementation of GSM, manage definitions and their lifecycle; execute definitions; powers every domain application above it.',
    description:
      'SIE is the engine that implements and leverages the GSM standard — it stores governed definitions, enforces their lifecycle, and turns them into a governed AI context that every domain application above it operates on.',
    products: [
      {
        slug: 'definition-manager',
        name: 'Definition Manager',
        tagline: 'The authoritative store of every governed definition — the heart of the engine.',
        description:
          'The Definition Manager hosts GSM, manages the Ascription lifecycle, and enforces the DNA governance grammar across tenant schemas. It is the authoritative store of every governed definition.',
        features: [
          { slug: 'definitions-management-api', name: 'GSM Definitions management RESTful API', blurb: 'A RESTful API to create, read, update, and query every governed GSM definition — the authoritative interface to the model.' },
          { slug: 'definitions-lifecycle-enforcement', name: 'GSM Definitions lifecycle enforcement', blurb: 'DRAFT → PROPOSED → APPROVED → ACTIVE → DEPRECATED — every governed change is a validated state transition, auditable end to end.' },
          { slug: 'definitions-retention', name: 'GSM Definitions retention', blurb: 'Definitions and their history are retained and versioned — nothing governed is silently overwritten or lost.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/sie-definition/', label: 'SIE Definition documentation' }],
        repos: [
          { href: 'https://github.com/poesis-cloud/sie-definition-manager', label: 'sie-definition-manager' },
          { href: 'https://github.com/poesis-cloud/sie-definition-database', label: 'sie-definition-database' },
        ],
      },
      {
        slug: 'operator',
        name: 'Operator',
        tagline: 'The rule runtime — definitions become a running control loop.',
        description:
          'The Operator evaluates Norms and Directives against the observed state, dispatches effectors, and turns governed definitions into continuous enforcement — the THINK layer acting on the RUN layer.',
        features: [
          { slug: 'norms-evaluation-api', name: 'GSM Norms evaluation API', blurb: 'An API to evaluate machine-evaluable Norms against observed state — governance as a control loop, not a review meeting.' },
          { slug: 'mechanisms-execution-api', name: 'GSM Mechanisms execution API', blurb: 'An API to execute governed Mechanisms — verdicts and rules become dispatched, effector-driven actions.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/sie-definition/', label: 'SIE documentation' }],
        repos: [{ href: 'https://github.com/poesis-cloud/sie-operator', label: 'sie-operator' }],
      },
      {
        slug: 'definition-blackboard-manager',
        name: 'Definition Blackboard Manager',
        tagline: 'Collaborative definition-sourcing with provenance intact.',
        description:
          'The Definition Blackboard Manager is a collaborative definition-sourcing service: contributors post evidence-backed contributions over declared panels, the board is sealed to a byte-stable state, and every mutation lands in an append-only audit ledger.',
        features: [
          { slug: 'ks-contributions-management-api', name: 'KS Contributions management RESTful API', blurb: 'A RESTful API for knowledge sources to declare panels and post schema-validated contributions — collaborative sourcing with server-owned structure.' },
          { slug: 'ks-contributions-lifecycle-enforcement', name: 'KS Contributions lifecycle enforcement', blurb: 'OPEN → SEALED → BYTE_STABLE — sealed boards are immutable, and the contribution stream is byte-stable for reproducible promotion.' },
          { slug: 'ks-contributions-retention', name: 'KS Contributions retention', blurb: 'Every contribution and its provenance envelope is retained — an append-only, auditable record of how each definition was sourced.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/sie-blackboard/', label: 'Definition Blackboard Manager documentation' }],
        repos: [
          { href: 'https://github.com/poesis-cloud/sie-definition-blackboard-manager', label: 'sie-definition-blackboard-manager' },
          { href: 'https://github.com/poesis-cloud/sie-definition-blackboard-database', label: 'sie-definition-blackboard-database' },
        ],
      },
    ],
  },
  {
    slug: 'gsm',
    name: 'GSM',
    fullName: 'Generative System Model',
    tag: 'Standard',
    zone: 'THINK',
    href: '/solutions/gsm',
    tagline: 'The Generative System Model — the vendor-neutral standard for defining systems; grounded in systemics; being to THINK what OpenTelemetry semantic convention is to RUN.',
    description:
      'GSM is a vendor-neutral standard for defining and governing software-intensive systems — the THINK layer that the BUILD and RUN layers enforce and measure against. Publicly readable, prepared for neutral stewardship.',
    products: [
      {
        slug: 'specification',
        name: 'Specifications',
        tagline: 'The core spec — eight primitives, DNA grammar, Archetyping, and the systemic lifecycle.',
        description:
          'The GSM specification: eight systemic primitives, the DNA governance grammar, Archetyping as the open type system, and systemic lifecycle management — the published artifact every implementation is measured against.',
        features: [
          { slug: 'primitives', name: 'Eight systemic primitives', blurb: 'Structure, Mechanism, Effector, Receptor, Interaction, Archetype, Directive, Norm — a small, fixed core that composes any system.' },
          { slug: 'dna-grammar', name: 'DNA grammar', blurb: 'Directives, Norms, and Ascriptions — the three-tempo grammar for how intent becomes an evaluable, bound obligation.' },
          { slug: 'archetyping', name: 'Archetyping', blurb: 'Typed JSON Schema domain schemas that carry vocabulary, grammar, and semantics — meaning travels with the type.' },
          { slug: 'systemic-lifecycle-management', name: 'Systemic lifecycle management', blurb: 'A normative Ascription lifecycle governs how every definition is drafted, approved, activated, and deprecated.' },
        ],
        docs: [
          { href: 'https://docs.poesis.cloud/gsm/', label: 'GSM documentation' },
          { href: 'https://docs.poesis.cloud/gsm/conformance/', label: 'Conformance' },
        ],
        repos: [{ href: 'https://github.com/poesis-cloud/gsm', label: 'gsm' }],
      },
      {
        slug: 'frameworks',
        name: 'Frameworks',
        tagline: 'Domain, standard, and legal vocabularies — sourced into GSM, ready to enforce.',
        description:
          'The published, versioned catalogue of vocabularies and governance content sourced into GSM-compatible schemas: domain and standard semantics, legal vocabularies, evaluable Directives and Norms, and executable Mechanisms. Surfaced in ITIP through the Framework Catalog & Composer.',
        features: [
          { slug: 'domain-vocabularies', name: 'Domain vocabularies & semantics', blurb: 'Domain-specific concepts and meaning sourced as typed Archetypes — the vocabulary of a business or technical domain, machine-readable.' },
          { slug: 'standard-vocabularies', name: 'Standard vocabularies & semantics', blurb: 'Architecture and quality standards — TOGAF, ISO 25010 / 25012, and peers — sourced as typed Archetypes.' },
          { slug: 'legal-vocabularies', name: 'Legal vocabularies & semantics', blurb: 'Regulatory concepts — GDPR, NIS2, DORA, and peers — sourced as typed Archetypes, legal vocabulary made machine-readable.' },
          { slug: 'legal-directives-norms', name: 'Legal Directives & Norms (evaluable)', blurb: 'Regulatory obligations sourced into evaluable Directives and Norms — each clause traceable to its source, coverage continuous and provable.' },
          { slug: 'standard-mechanisms', name: 'Standard Mechanisms (executable)', blurb: 'Standard behaviors sourced into executable Mechanisms — governance that runs, not just documents.' },
        ],
        repos: [{ href: 'https://github.com/poesis-cloud/gsm-frameworks', label: 'gsm-frameworks' }],
      },
    ],
  },
  {
    slug: 'framework',
    name: 'Agentic Framework',
    fullName: 'SAFe Agentic Framework',
    tag: 'Framework + Portfolio',
    zone: 'THINK',
    href: '/solutions/framework',
    tagline: 'The Agentic Framework — for any IT profile to deliver through local agentic orchestrations yielding standard and homogeneous artifacts synchronized on a central shared repo contextualizing other local agentic orchestrations — a safe way — complementing ITIP and integrating with SIE.',
    description:
      'SAFe-shaped multi-agent orchestration spanning THINK — portfolio, product, and team workflows — down to the BUILD hand-off, where code is generated from governed GSM definitions and deployed; a human ★ gate at every layer closes THINK → BUILD → RUN.',
    products: [
      {
        slug: 'harness',
        name: 'Agentic Harness',
        tagline: 'Gates, conditions, and a ledger that keep probabilistic agents on rails.',
        description:
          'The workflow step graphs are validated by a deterministic harness — methodology- and host-agnostic, so the same method runs unchanged on any agent host, and work state lives in your own files and git history.',
        features: [
          { slug: 'workflows-steps-resolution', name: 'Workflows & steps resolution', blurb: 'Workflow and step graphs are resolved deterministically from plain files — the same method runs unchanged on any agent host.' },
          { slug: 'skills-instructions-prompt-injection', name: 'Skills and instructions prompt injection', blurb: 'Skills and instructions are injected into the agent\u2019s context at the right step — knowledge arrives exactly when it\u2019s needed.' },
          { slug: 'llm-resolution', name: 'LLM resolution', blurb: 'The harness resolves which model backs each step — swappable, host-agnostic, no hard-wired vendor lock-in.' },
          { slug: 'artifact-validation', name: 'Artifact validation', blurb: 'Every artifact produced by a step is validated against its schema before the step is considered complete.' },
          { slug: 'step-authorization', name: 'Step authorization', blurb: 'Pre, invariant, and post conditions gate every step — agents move through evidence and sequence, not vibes.' },
          { slug: 'logging', name: 'Logging', blurb: 'Every step execution is journaled — the delivery history is an auditable event log, not a chat scrollback.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/safe-agentic-framework/', label: 'Framework overview' }],
        repos: [{ href: 'https://github.com/poesis-cloud/safe-agentic-framework', label: 'safe-agentic-framework' }],
      },
      {
        slug: 'orchestration',
        name: 'SAFe Agentic Organization',
        tagline: 'Portfolio → program → iteration — an org chart of agents, not a flat swarm.',
        description:
          'Three orchestrators — one per SAFe layer — run role agents from a single entry point: the portfolio layer tests the strategic bet, the program layer tests the feature shape, the iteration layer tests the code that ships.',
        features: [
          { slug: 'agents', name: 'Agents', blurb: 'Role agents — architect, developer, QA, product, security — dispatched into each SAFe ceremony as stateless subagents.' },
          { slug: 'skills', name: 'Skills', blurb: 'Reusable, tested capabilities agents load on demand — domain knowledge and refined workflows, not ad hoc prompting.' },
          { slug: 'workflows', name: 'Workflows', blurb: 'SAFe ceremonies as governed workflows — portfolio, program, and iteration — producing typed artifacts, not prose.' },
          { slug: 'instructions', name: 'Instructions', blurb: 'Persistent conventions and rules that shape how agents write and edit — the org\u2019s engineering standards, enforced at every step.' },
          { slug: 'artifacts', name: 'Artifacts', blurb: 'Epics, features, stories, ADRs — schema-validated outputs every ceremony produces and every gate checks.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/safe-agentic-framework/distributed-agentic-safe/', label: 'Distributed Agentic SAFe' }],
        repos: [{ href: 'https://github.com/poesis-cloud/safe-agentic-framework', label: 'safe-agentic-framework' }],
      },
      {
        slug: 'portfolio',
        name: 'Agentic Workspace',
        tagline: 'Wire the framework into your working tree and your pipelines.',
        description:
          'The distribution layer: an installer that wires the Agentic Harness, the SAFe Agentic Organization, and your chosen artifacts into a working tree, plus CI/CD pipelines that validate and publish what agents produce.',
        features: [
          { slug: 'installer', name: 'Installer', blurb: 'One installer wires the harness, agents, skills, and workflows into your working tree — local-first, sovereign, no lock-in.' },
          { slug: 'cicd-pipelines', name: 'CI/CD pipelines of artifacts', blurb: 'CI/CD pipelines validate and publish the artifacts agents produce — the same gates that run locally, run in the pipeline.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/safe-agentic-framework/', label: 'Framework documentation' }],
        repos: [{ href: 'https://github.com/poesis-cloud/safe-agentic-framework', label: 'safe-agentic-framework' }],
      },
    ],
  },
];

/** Flat nav list (Solutions menu). */
export const solutionLinks = solutions.map((s) => ({ href: s.href, label: s.fullName }));

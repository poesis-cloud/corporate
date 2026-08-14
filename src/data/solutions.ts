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

export interface Value {
  title: string;
  body: string;
}

export interface ProductDef {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  values: Value[];
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
    tagline: 'The IT Intelligence Platform — for IT organizations to define, govern, regulate, supervise their IT landscape as a single source of truth, and generate automatically any sort of IT artifacts from, simulate various types of impacts, and evaluate IT compliance to any governance and regulation.',
    description:
      'ITIP is where every IT profile converges — architects, developers, ops, security and compliance — to define, govern, and visualize the IT landscape through a single governed source of truth. The first domain application built on SIE.',
    products: [
      {
        slug: 'web-application',
        name: 'Web Application',
        tagline: 'The application every IT profile works in — for defining, governing, regulating, and supervising their IT landscape.',
        description:
          'The web application and its backend-for-frontend: the governed definition inventory, the framework catalog & composer, artifact generation, and evaluation dashboards — one place where the IT landscape is defined, governed, and visualized.',
        values: [
          { title: 'One place every IT profile works.', body: 'Architects author structures and directives, developers consult specifications, ops watch compliance drift, security audits regulatory coverage — all on the same governed definitions, with no translation silos between them.' },
          { title: 'Compliance observed, not reconstructed.', body: 'Continuous appraisal indicators are computed from the model across meta-governance and governance zones — your compliance posture is a live dashboard, not a spreadsheet rebuilt before each audit.' },
          { title: 'Deliverables fall out of the model.', body: 'ADR packs, compliance evidence, architecture baselines, roadmaps — generated from the definitions, each artifact traceable back to the exact definitions it derives from.' },
          { title: 'See the impact before you commit.', body: 'Changes ripple through typed relations, so the blast radius of a decision is simulated from the model — traced, not guessed in a meeting.' },
        ],
        features: [
          { slug: 'it-artifact-factory', name: 'IT artifact factory', blurb: 'Generate any IT deliverable from the definitions — ADR packs, compliance evidence, architecture baselines, roadmaps — each artifact traceable to its definitions.' },
          { slug: 'it-compliance-evaluation', name: 'IT compliance evaluation', blurb: 'Continuous governance indicators — measures and findings computed from the model, so compliance is observed, not reconstructed before each audit.' },
          { slug: 'it-impact-simulation', name: 'IT impact simulation', blurb: 'Simulate the ripple effect of a change through typed relations before it happens — impact you can trace, not guess.' },
          { slug: 'definitions-truth-sourcing-management', name: 'GSM Definitions truth sourcing management', blurb: 'Manage and review the sourcing pipelines that keep the model anchored to the real, running system.' },
          { slug: 'definitions-management', name: 'GSM Definitions management', blurb: 'Architecture, dependencies, obligations, and constraints live as one governed inventory — a single source of truth.' },
          { slug: 'frameworks-management', name: 'GSM Frameworks management', blurb: 'Browse, attach, and compose the published catalogue of frameworks sourced into GSM — a coherent governance fabric from day one.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/itip/web-application/', label: 'Web Application documentation' }],
        repos: [
          { href: 'https://github.com/poesis-cloud/itip-web-frontend', label: 'itip-web-frontend' },
          { href: 'https://github.com/poesis-cloud/itip-web-backend', label: 'itip-web-backend' },
        ],
      },
      {
        slug: 'definition-blackboard-code-sourcer',
        name: 'Definition Blackboard Code Sourcer',
        tagline: 'Truth sourcing — for IT information to reflect reality, continuously, as GSM Definitions.',
        description:
          'The sourcing pipeline that reads real IT artifacts — source code, API contracts, infrastructure — and posts them as evidence-backed contributions to the SIE Definition Blackboard Manager, so the definition stays anchored to the real system instead of drifting from it.',
        values: [
          { title: 'The model reflects what actually runs.', body: 'A bench of knowledge sources — code index, property graph, SBOM, dependency analysis, inference — continuously reads your repositories and sources them into governed GSM definitions, so governance never drifts from implementation.' },
          { title: 'Every definition is explainable.', body: 'Each identification is posted with a confidence score and a full provenance envelope — which source, which revision, which tools — never as an unexplained fact.' },
          { title: 'Private by design.', body: 'Deterministic tool outputs stay in-memory inside the sourcer process; only confidence-bearing contributions ever leave it, sealed and audited on the blackboard.' },
        ],
        features: [
          { slug: 'automatic-sourcing-from-code-repos', name: 'GSM Definitions automatic sourcing from code repos', blurb: 'Source repositories, API contracts, SBOMs, and infrastructure into governed GSM definitions — the model reflects what actually runs, continuously.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/itip/definition-blackboard-code-sourcer/', label: 'Sourcer documentation' }],
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
    tagline: 'The Systemic Intelligence Engine — reference implementation of GSM. What Kubernetes is to software infrastructures, the Systemic Intelligence Engine is to the world. Both are declarative reconciliation engines: you define the desired state as typed, versioned, API-managed objects, and the engine continuously evaluates the real world against that definition and acts to close the gap. From virtualized and managed computing resources to virtualized and managed world resources. This is the logical and natural evolution path as we enter the generative AI era. The key to this evolution path is the systemics model: GSM. This evolution enables generative AI to operate a capable and trustworthy synthetic autopoiesis.',
    description:
      'SIE is the engine that implements and leverages the GSM standard — it stores governed definitions, enforces their lifecycle, and turns them into a governed AI context that every domain application and frameworks above it operates on.',
    products: [
      {
        slug: 'definition-manager',
        name: 'Definition Manager',
        tagline: 'The authoritative API, lifecycle enforcer, and store of every governed GSM Definition — the heart of the engine.',
        description:
          'The Definition Manager hosts GSM, manages the Ascription lifecycle, and enforces the DNA governance grammar across tenant schemas. It is the authoritative store of every governed definition.',
        values: [
          { title: 'Governance you can\u2019t corrupt.', body: 'The Ascription lifecycle is a validated state machine with referee preconditions — invalid transitions, malformed grammar, and orphaned references never enter the model.' },
          { title: 'An API, not a document store.', body: 'Definitions are served through a RESTful API with live OpenAPI and structured problem responses — machine-operable at scale, across isolated tenant schemas.' },
          { title: 'Audit-ready by construction.', body: 'Every governed change is a retained, versioned state transition — the history of the model is the audit trail, not a report assembled after the fact.' },
        ],
        features: [
          { slug: 'definitions-management-api', name: 'GSM Definitions management RESTful API', blurb: 'A RESTful API to create, read, update, and query every governed GSM definition — the authoritative interface to the model.' },
          { slug: 'definitions-lifecycle-enforcement', name: 'GSM Definitions lifecycle enforcement', blurb: 'DRAFT → PROPOSED → APPROVED → ACTIVE → DEPRECATED — every governed change is a validated state transition, auditable end to end.' },
          { slug: 'definitions-retention', name: 'GSM Definitions retention', blurb: 'Definitions and their history are retained and versioned — nothing governed is silently overwritten or lost.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/sie/definition-manager/', label: 'Definition Manager documentation' }],
        repos: [
          { href: 'https://github.com/poesis-cloud/sie-definition-manager', label: 'sie-definition-manager' },
          { href: 'https://github.com/poesis-cloud/sie-definition-database', label: 'sie-definition-database' },
        ],
      },
      {
        slug: 'operator',
        name: 'Operator',
        tagline: 'The GSM Definition runtime — for evaluating and executing GSM Definitions such as Norms and Mechanisms.',
        description:
          'The Operator evaluates Norms and Directives against the observed state, dispatches effectors, and turns governed definitions into continuous enforcement — the THINK layer acting on the RUN layer.',
        values: [
          { title: 'A runtime for governance.', body: 'Like a JVM for definitions: the Operator resolves a Mechanism, type-checks its inputs against Archetype schemas, evaluates its rule, and dispatches typed effects — five deterministic phases, every boundary validated.' },
          { title: 'Sandboxed, reproducible verdicts.', body: 'Rules run in a step-limited sandbox with no ambient authority and no side effects — the same inputs always produce the same verdict, so enforcement is trustworthy by construction.' },
          { title: 'The model stays analyzable.', body: 'Effectors and receptors are derived from the rule code itself, not declared by hand — the governance topology is always exactly what the rules actually do.' },
        ],
        features: [
          { slug: 'norms-evaluation-api', name: 'GSM Norms evaluation API', blurb: 'An API to evaluate machine-evaluable Norms against observed state — governance as a control loop, not a review meeting.' },
          { slug: 'mechanisms-execution-api', name: 'GSM Mechanisms execution API', blurb: 'An API to execute governed Mechanisms — verdicts and rules become dispatched, effector-driven actions.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/sie/operator/', label: 'Operator documentation' }],
        repos: [{ href: 'https://github.com/poesis-cloud/sie-operator', label: 'sie-operator' }],
      },
      {
        slug: 'definition-blackboard-manager',
        name: 'Definition Blackboard Manager',
        tagline: 'Collaborative agentic Definition-sourcing pipeline — for following and tracking automatic sourcing of GSM Definitions.',
        description:
          'The Definition Blackboard Manager is a collaborative definition-sourcing service: contributors post evidence-backed contributions over declared panels, the board is sealed to a byte-stable state, and every mutation lands in an append-only audit ledger.',
        values: [
          { title: 'Evidence, never guesses.', body: 'Every contribution carries a confidence score and a provenance envelope — probabilistic identifications are labeled as such, and deterministic facts never masquerade as contributions.' },
          { title: 'Sealed means sealed.', body: 'OPEN → SEALED → BYTE_STABLE, no way back — a sealed board is immutable and its contribution stream byte-stable, so promotion into governed definitions is reproducible.' },
          { title: 'Every mutation on the ledger.', body: 'Contributions, seals, panel updates — each one produces an immutable audit entry, transactional with the mutation it records. The sourcing history cannot be rewritten.' },
        ],
        features: [
          { slug: 'ks-contributions-management-api', name: 'KS Contributions management RESTful API', blurb: 'A RESTful API for knowledge sources to declare panels and post schema-validated contributions — collaborative sourcing with server-owned structure.' },
          { slug: 'ks-contributions-lifecycle-enforcement', name: 'KS Contributions lifecycle enforcement', blurb: 'OPEN → SEALED → BYTE_STABLE — sealed boards are immutable, and the contribution stream is byte-stable for reproducible promotion.' },
          { slug: 'ks-contributions-retention', name: 'KS Contributions retention', blurb: 'Every contribution and its provenance envelope is retained — an append-only, auditable record of how each definition was sourced.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/sie/definition-blackboard-manager/', label: 'Definition Blackboard Manager documentation' }],
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
    tag: 'Standard Model',
    zone: 'THINK',
    href: '/solutions/gsm',
    tagline: 'The Generative System Model — the vendor-neutral standard for defining systems — being to the world\'s THINK-BUILD-RUN of itself what OpenTelemetry semantic convention is to IT\'s systems observability — grounded in systemics, synthesizing Beer\u2019s cybernetics Viable System Model, von Bertalanffy\u2019s General System Theory, Wiener and Ashby\u2019s cybernetic feedback and requisite variety, and Maturana and Varela\u2019s biological theory of autopoiesis into a single generative definition of systems.',
    description:
      'GSM is a vendor-neutral standard for defining and governing software-intensive systems — the THINK layer that the BUILD and RUN layers enforce and measure against. Publicly readable, prepared for neutral stewardship.',
    products: [
      {
        slug: 'specifications',
        name: 'Specifications',
        tagline: 'The core spec — eight primitives, DNA grammar, Archetyping, and the systemic lifecycle.',
        description:
          'The GSM specification: eight systemic primitives, the DNA governance grammar, Archetyping as the open type system, and systemic lifecycle management — the published artifact every implementation is measured against.',
        values: [
          { title: 'One published contract for every implementation.', body: 'SIE, ITIP, blackboard sourcers, and third-party tools all read the same specification — the GSM primitives, DNA grammar, Archetyping, and lifecycle are not reinterpreted per vendor. Like OpenTelemetry semantic conventions give RUN a shared vocabulary, GSM Specifications give THINK one.' },
          { title: 'Conformance is testable, not assumed.', body: 'The specification is the yardstick: an implementation can be checked against the primitives, grammar rules, and lifecycle transitions it defines. Builders and auditors both point to the same artifact.' },
          { title: 'Built for neutral stewardship.', body: 'The spec is maintained as a public, versioned publication — ready for foundation governance such as CNCF sandbox incubation — rather than living as vendor documentation. Standards live longest when no single product owns them.' },
        ],
        features: [
          { slug: 'primitives', name: 'Eight systemic primitives', blurb: 'Structure, Mechanism, Effector, Receptor, Interaction, Archetype, Directive, Norm — a small, fixed core that composes any system.' },
          { slug: 'dna-grammar', name: 'DNA grammar', blurb: 'Directives, Norms, and Ascriptions — the three-tempo grammar for how intent becomes an evaluable, bound obligation.' },
          { slug: 'archetyping', name: 'Archetyping', blurb: 'Typed JSON Schema domain schemas that carry vocabulary, grammar, and semantics — meaning travels with the type.' },
          { slug: 'systemic-lifecycle-management', name: 'Systemic lifecycle management', blurb: 'A normative state machine governs how every definition is drafted, proposed, approved, activated, deprecated, and retired — accordingly to related dependent definitions.' },
        ],
        docs: [
          { href: 'https://docs.poesis.cloud/gsm/', label: 'GSM documentation' },
        ],
      },
      {
        slug: 'frameworks',
        name: 'Frameworks',
        tagline: 'Domain, standard, and legal vocabularies — sourced into GSM, ready to enforce.',
        description:
          'The published, versioned catalogue of vocabularies and governance content sourced into GSM-compatible schemas: domain and standard semantics, legal vocabularies, evaluable Directives and Norms, and executable Mechanisms. Surfaced in ITIP through the Framework Catalog & Composer.',
        values: [
          { title: 'Day-one governance, not a blank page.', body: 'TOGAF, ISO 25000-series, GDPR, NIS2, and more — over a hundred sourced schemas you attach instead of authoring from scratch. The expertise is already in the catalogue.' },
          { title: 'The authority\u2019s own taxonomy, clause by clause.', body: 'Each framework is organized by its own structure and every sourced Directive and Norm cites the clause it derives from — provenance you can hand to an auditor.' },
          { title: 'Frameworks that compose, not collide.', body: 'A quality model, an architecture framework, and a regulation govern the same subject without schema conflicts — they compose through the GSM governance layer into one coherent fabric.' },
          { title: 'Maintained as the real world changes.', body: 'The catalogue is continuously updated as standards, regulations, and legal texts evolve — the organization using it always governs against current requirements, not a frozen snapshot.' },
        ],
        features: [
          { slug: 'domain-vocabularies', name: 'Domain vocabularies & semantics', blurb: 'Domain-specific concepts and meaning sourced as typed Archetypes — the vocabulary of a business or technical domain, machine-readable.' },
          { slug: 'standard-vocabularies', name: 'Standard vocabularies & semantics', blurb: 'Architecture and quality standards — TOGAF, ISO 25010 / 25012, and peers — sourced as typed Archetypes.' },
          { slug: 'legal-vocabularies', name: 'Legal vocabularies & semantics', blurb: 'Regulatory concepts — GDPR, NIS2, DORA, and peers — sourced as typed Archetypes, legal vocabulary made machine-readable.' },
          { slug: 'legal-directives-norms', name: 'Legal Directives & Norms (evaluable)', blurb: 'Regulatory obligations sourced into evaluable Directives and Norms — each clause traceable to its source, coverage continuous and provable.' },
          { slug: 'standard-mechanisms', name: 'Standard Mechanisms (executable)', blurb: 'Standard behaviors sourced into executable Mechanisms — governance that runs, not just documents.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/gsm/frameworks/', label: 'Frameworks documentation' }],
        repos: [{ href: 'https://github.com/poesis-cloud/gsm-frameworks', label: 'gsm-frameworks' }],
      },
    ],
  },
  {
    slug: 'saf',
    name: 'SAF',
    fullName: 'Systemic Agentic Framework',
    tag: 'Systemic Agentic Framework',
    zone: 'THINK',
    href: '/solutions/saf',
    tagline: 'The Systemic Agentic Framework — for any IT profile to deliver through local agentic orchestrations yielding standard and homogeneous artifacts synchronized on a central shared repo contextualizing other local agentic orchestrations — a safe way — complementing ITIP and integrating with SIE.',
    description:
      'SAFe-shaped multi-agent orchestration spanning THINK — portfolio, product, and team workflows — down to the BUILD hand-off, where code is generated from governed GSM definitions and deployed; a human ★ gate at every layer closes THINK → BUILD → RUN.',
    products: [
      {
        slug: 'agentic-harness',
        name: 'Agentic Harness',
        tagline: 'Deterministic resolutions, validations, and traceability of agentic workflows, keeping probabilistic agents on rails.',
        description:
          'The workflow step graphs are validated by a deterministic harness — methodology- and host-agnostic, so the same method runs unchanged on any agent host, and work state lives in your own files and git history.',
        values: [
          { title: 'Deterministic rails for probabilistic agents.', body: 'Every step passes precondition, authorization, and postcondition checks grounded in persisted configuration — agents advance through evidence and sequence, not vibes.' },
          { title: 'Invalid bytes never land.', body: 'Agents stage writes in the working tree; the harness validates artifacts against their schemas before commit — invalid output is discarded and restored, so committed state is always clean.' },
          { title: 'One method, any host.', body: 'The harness is a stable CLI over plain files — the same workflows run in your IDE today and a CI runner tomorrow, with no relearning and no lock-in.' },
        ],
        features: [
          { slug: 'workflows-steps-resolution', name: 'Workflow & step resolution', blurb: 'Workflow and step graphs are resolved deterministically from plain files — the same method runs unchanged on any agent host.' },
          { slug: 'skills-instructions-prompt-injection', name: 'Skill and instruction prompt injection', blurb: 'Skills and instructions are injected into the agent\u2019s context at the right step — knowledge arrives exactly when it\u2019s needed.' },
          { slug: 'llm-resolution', name: 'LLM resolution', blurb: 'The harness resolves which model backs each step — swappable, host-agnostic, no hard-wired vendor lock-in.' },
          { slug: 'artifact-validation', name: 'Artifact validation', blurb: 'Every artifact produced by a step is validated against its schema before the step is considered complete.' },
          { slug: 'step-authorization', name: 'Agent authorization', blurb: 'Pre, invariant, and post conditions gate every step — agents move through evidence and sequence, not vibes.' },
          { slug: 'logging', name: 'Logging', blurb: 'Every step execution is journaled — the delivery history is an auditable event log, not a chat scrollback.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/saf/agentic-harness/', label: 'Agentic Harness documentation' }],
        repos: [{ href: 'https://github.com/poesis-cloud/saf-agentic-harness', label: 'saf-agentic-harness' }],
      },
      {
        slug: 'safe-agentic-organization',
        name: 'SAFe Agentic Organization',
        tagline: 'Portfolio → program → iteration — a preset, IT-scaled agile org chart of agents — for operating efficiently on day-to-day strategic, tactical, and technical concerns.',
        description:
          'Three orchestrators — one per SAFe layer — run role agents from a single entry point: the portfolio layer tests the strategic bet, the program layer tests the feature shape, the iteration layer tests the code that ships.',
        values: [
          { title: 'An org chart, not a swarm.', body: 'Portfolio, program, and iteration orchestrators dispatch a bench of specialist role agents — each one small, bounded, and well-specified, which is exactly when probabilistic models are most reliable and cheapest.' },
          { title: 'A method agents must implement.', body: 'SAFe ceremonies become governed workflows producing typed, schema-validated artifacts — the method is an enforceable contract between human and machine, not a suggestion.' },
          { title: 'Agents propose, humans dispose.', body: 'Every layer ends at a human ★ gate — agents bring evidence through checks and sequence; the decision that matters stays yours.' },
        ],
        features: [
          { slug: 'agents', name: 'Agents', blurb: 'Role agents — architect, developer, QA, product, security — dispatched into each SAFe ceremony as stateless subagents.' },
          { slug: 'skills', name: 'Skills', blurb: 'Reusable, tested capabilities agents load on demand — domain knowledge and refined workflows, not ad hoc prompting.' },
          { slug: 'workflows', name: 'Workflows', blurb: 'SAFe ceremonies as governed workflows — portfolio, program, and iteration — producing typed artifacts, not prose.' },
          { slug: 'instructions', name: 'Instructions', blurb: 'Persistent conventions and rules that shape how agents write and edit — the org\u2019s engineering standards, enforced at every step.' },
          { slug: 'artifacts', name: 'Artifacts', blurb: 'Epics, features, stories, ADRs — schema-validated outputs every ceremony produces and every gate checks.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/saf/safe-agentic-organization/', label: 'SAFe Agentic Organization documentation' }],
        repos: [{ href: 'https://github.com/poesis-cloud/saf-agentic-organization', label: 'saf-agentic-organization' }],
      },
      {
        slug: 'agentic-workspace',
        name: 'Agentic Workspace',
        tagline: 'A shared remote workspace storing local agentic workflow artifacts, enabling local personal agents to operate on the required inputs of other local personal agents — for an end-to-end decentralized agentic workflow model.',
        description:
          'The distribution layer: an installer that wires the Agentic Harness, the SAFe Agentic Organization, and your chosen artifacts into a working tree, plus CI/CD pipelines that validate and publish what agents produce.',
        values: [
          { title: 'Your files, your history, your state.', body: 'Work state lives in plain files under your own git history — the event log is your repository, not a vendor\u2019s cloud. Sensitive context never leaves your machine.' },
          { title: 'Install once, deliver governed.', body: 'One installer wires the harness, agents, skills, and workflows into any working tree — a governed agentic delivery organization, minutes after clone.' },
          { title: 'The same gates run in CI.', body: 'The pipelines validate and publish the artifacts agents produce with the same deterministic checks that run locally — what passed on your machine passes in the pipeline.' },
        ],
        features: [
          { slug: 'installer', name: 'Installer', blurb: 'One installer wires the harness, agents, skills, and workflows into your working tree — local-first, sovereign, no lock-in.' },
          { slug: 'cicd-pipelines', name: 'CI/CD artifacts pipelines', blurb: 'CI/CD pipelines validate and publish the artifacts agents produce — the same gates that run locally, run in the pipeline.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/saf/agentic-workspace/', label: 'Agentic Workspace documentation' }],
        repos: [{ href: 'https://github.com/poesis-cloud/saf-agentic-workspace', label: 'saf-agentic-workspace' }],
      },
    ],
  },
];

/** Flat nav list (Solutions menu). */
export const solutionLinks = solutions.map((s) => ({ href: s.href, label: s.fullName }));

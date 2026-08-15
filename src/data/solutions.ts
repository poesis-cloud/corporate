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
  /** Feature slugs (this product) that deliver this value. */
  features: string[];
  /** True for values that are properties of the product, not feature-delivered. */
  vision?: boolean;
}

export interface SolutionValue {
  title: string;
  /** May contain inline HTML (em/strong). */
  body: string;
  /** Product slugs (this solution) whose interaction yields this value. */
  products: string[];
  /** True when the value emerges from product interaction rather than summing them. */
  emergent?: boolean;
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
  values: SolutionValue[];
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
    values: [
      { title: 'Governance that stops drifting.', products: ['web-application', 'definition-blackboard-code-sourcer'], emergent: true, body: 'Architecture wikis, compliance spreadsheets, and review boards drift from reality the moment they are written. ITIP makes the <em>definition</em> the living source of truth — sourced from the real system, governed continuously, and never reconstructed under audit pressure.' },
      { title: 'A source of truth AI can act on.', products: ['web-application'], emergent: true, body: 'Every definition is typed by a GSM Archetype, so its meaning is explicit and machine-readable. Humans and AI agents reason and generate from the same governed account of what your systems <em>are</em>, what they <em>must</em> do, and <em>why</em>.' },
      { title: 'Every IT profile converges.', products: ['web-application'], body: 'Architects define, developers consult, ops watch drift, project managers track state, security audits coverage — one platform, one governed inventory, no translation silos between the people who run your IT.' },
      { title: 'Frameworks stacked, not siloed.', products: ['web-application'], body: 'TOGAF, ISO 25000-series, GDPR, NIS2, DORA — attached from the catalogue and composed into one enforceable governance fabric, so regulations and quality models inform every decision instead of living in separate lists.' },
    ],
    products: [
      {
        slug: 'web-application',
        name: 'Web Application',
        tagline: 'The application every IT profile works in — for defining, governing, regulating, and supervising their IT landscape.',
        description:
          'The web application and its backend-for-frontend: the governed definition inventory, the framework catalog & composer, artifact generation, and evaluation dashboards — one place where the IT landscape is defined, governed, and visualized.',
        values: [
          { title: 'One place every IT profile works.', features: ['definitions-management', 'rbac-abac'], body: 'Architects author structures and directives, developers consult specifications, ops watch compliance drift, security audits regulatory coverage — all on the same governed definitions, with no translation silos between them.' },
          { title: 'Compliance observed, not reconstructed.', features: ['it-compliance-evaluation'], body: 'Continuous appraisal indicators are computed from the model across meta-governance and governance zones — your compliance posture is a live dashboard, not a spreadsheet rebuilt before each audit.' },
          { title: 'Deliverables fall out of the model.', features: ['it-artifact-factory'], body: 'ADR packs, compliance evidence, architecture baselines, roadmaps — generated from the definitions, each artifact traceable back to the exact definitions it derives from.' },
          { title: 'See the impact before you commit.', features: ['it-impact-simulation'], body: 'Changes ripple through typed relations, so the blast radius of a decision is simulated from the model — traced, not guessed in a meeting.' },
        ],
        features: [
          { slug: 'it-artifact-factory', name: 'IT artifact factory', blurb: 'Generate any IT deliverable from the definitions — ADR packs, compliance evidence, architecture baselines, roadmaps — each artifact traceable to its definitions.' },
          { slug: 'it-compliance-evaluation', name: 'IT compliance evaluation', blurb: 'Continuous governance indicators — measures and findings computed from the model, so compliance is observed, not reconstructed before each audit.' },
          { slug: 'it-impact-simulation', name: 'IT impact simulation', blurb: 'Simulate the ripple effect of a change through typed relations before it happens — impact you can trace, not guess.' },
          { slug: 'definitions-truth-sourcing-management', name: 'GSM Definitions truth sourcing management', blurb: 'Manage and review the sourcing pipelines that keep the model anchored to the real, running system.' },
          { slug: 'definitions-management', name: 'GSM Definitions management', blurb: 'Architecture, dependencies, obligations, and constraints live as one governed inventory — a single source of truth.' },
          { slug: 'frameworks-management', name: 'GSM Frameworks management', blurb: 'Browse, attach, and compose the published catalogue of frameworks sourced into GSM — a coherent governance fabric from day one.' },
          { slug: 'rbac-abac', name: 'RBAC and ABAC', blurb: 'Role- and attribute-based access control — every IT profile works on the same governed inventory, each seeing and touching exactly what their role and attributes allow.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/itip/web-application/', label: 'Web Application documentation' }],
        repos: [{ href: 'https://github.com/poesis-cloud/itip-web-frontend', label: 'itip-web-frontend' }],
      },
      {
        slug: 'definition-blackboard-code-sourcer',
        name: 'Definition Blackboard Code Sourcer',
        tagline: 'Truth sourcing — for IT information to reflect reality, continuously, as GSM Definitions.',
        description:
          'The sourcing pipeline that reads real IT artifacts — source code, API contracts, infrastructure — and posts them as evidence-backed contributions to the SIE Definition Blackboard Manager, so the definition stays anchored to the real system instead of drifting from it.',
        values: [
          { title: 'The model reflects what actually runs.', features: ['automatic-sourcing-from-code-repos'], body: 'A bench of knowledge sources — code index, property graph, SBOM, dependency analysis, inference — continuously reads your repositories and sources them into governed GSM definitions, so governance never drifts from implementation.' },
          { title: 'Every definition is explainable.', features: ['automatic-sourcing-from-code-repos'], body: 'Each identification is posted with a confidence score and a full provenance envelope — which source, which revision, which tools — never as an unexplained fact.' },
          { title: 'Private by design.', features: ['automatic-sourcing-from-code-repos'], body: 'Deterministic tool outputs stay in-memory inside the sourcer process; only confidence-bearing contributions ever leave it, sealed and audited on the blackboard.' },
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
    values: [
      { title: 'A governed AI context.', products: ['definition-manager'], emergent: true, body: 'SIE leverages the definitions as a typed, machine-readable context — each one carrying its Archetype’s meaning — that applications, humans, and agents can reason and generate from directly. It is the governed account generative models rarely have: what a system <em>is</em>, what it <em>must</em> do, and <em>why</em>.' },
      { title: 'Harnessed operations.', products: ['definition-manager', 'operator'], emergent: true, body: 'Operations on that context are harnessed by the definitions themselves: Directives and Norms bound what AI and agentic actions may do, so every operation stays governed, checked, and trustworthy — intuition proposes, the model disposes.' },
      { title: 'One closed self-sustaining loop.', products: ['definition-manager', 'operator', 'definition-blackboard-manager'], emergent: true, body: 'Define → realize → evaluate → refine: definitions are stored and lifecycle-enforced, executed against observed state, and refreshed from collaborative sourcing — the system continuously regenerates itself against its own definition, and every divergence surfaces immediately, not at audit time.' },
      { title: 'Reality feeds governance.', products: ['definition-blackboard-manager'], body: 'The Definition Blackboard Manager lets code sourcers, manual authors, and external frameworks contribute evidence-backed identifications — sealed, audited, and promoted into governed definitions, so the model tracks the real system.' },
    ],
    products: [
      {
        slug: 'definition-manager',
        name: 'Definition Manager',
        tagline: 'The authoritative API, lifecycle enforcer, and store of every governed GSM Definition — the heart of the engine.',
        description:
          'The Definition Manager hosts GSM, manages the Ascription lifecycle, and enforces the DNA governance grammar across tenant schemas. It is the authoritative store of every governed definition.',
        values: [
          { title: 'Governance you can\u2019t corrupt.', features: ['definitions-lifecycle-enforcement'], body: 'The Ascription lifecycle is a validated state machine with referee preconditions — invalid transitions, malformed grammar, and orphaned references never enter the model.' },
          { title: 'An API, not a document store.', features: ['definitions-management-api'], body: 'Definitions are served through a RESTful API with live OpenAPI and structured problem responses — machine-operable at scale, across isolated tenant schemas.' },
          { title: 'Audit-ready by construction.', features: ['definitions-retention'], body: 'Every governed change is a retained, versioned state transition — the history of the model is the audit trail, not a report assembled after the fact.' },
        ],
        features: [
          { slug: 'definitions-management-api', name: 'GSM Definitions management RESTful API', blurb: 'A RESTful API to create, read, update, and query every governed GSM definition — the authoritative interface to the model.' },
          { slug: 'definitions-lifecycle-enforcement', name: 'GSM Definitions lifecycle enforcement', blurb: 'DRAFT → PROPOSED → APPROVED → ACTIVE → DEPRECATED — every governed change is a validated state transition, auditable end to end.' },
          { slug: 'definitions-retention', name: 'GSM Definitions retention', blurb: 'Definitions and their history are retained and versioned — nothing governed is silently overwritten or lost.' },
          { slug: 'definitions-tooling-serving', name: 'GSM Definitions and tooling serving', blurb: 'The governed model and its tooling served to AI applications and agents (MCP) — definitions as typed, trustworthy context instead of stale wikis.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/sie/definition-manager/', label: 'Definition Manager documentation' }],
        repos: [{ href: 'https://github.com/poesis-cloud/sie-definition-manager', label: 'sie-definition-manager' }],
      },
      {
        slug: 'operator',
        name: 'Operator',
        tagline: 'The GSM Definition runtime — for evaluating and executing GSM Definitions such as Norms and Mechanisms.',
        description:
          'What a language runtime is to code, the Operator is to governed definitions: it runs them exactly as defined — evaluating Norms into verdicts and executing Mechanisms into actions, fresh from the model on every run — the THINK layer acting on your organization\u2019s operations, and on the model itself.',
        values: [
          { title: 'Governance that executes.', features: ['norms-evaluation-api', 'mechanisms-execution-api'], body: 'Norms stop being documents someone must remember to check: the Operator evaluates them into deterministic verdicts, and Mechanisms carry the resulting actions — enforcement becomes a control loop that runs, not a review meeting that lags.' },
          { title: 'Sandboxed, reproducible verdicts.', features: ['norms-evaluation-api', 'mechanisms-execution-api'], body: 'Rules run in an isolated sandbox with no ambient authority and no side effects — the same definitions and the same inputs always produce the same verdict, so every judgment can be replayed, audited, and trusted.' },
          { title: 'Nothing runs unless the model says so.', features: ['mechanisms-execution-api'], body: 'Only definitions the lifecycle has activated can execute, and only where the model explicitly wires them to an Operator — execution rights are governed facts in the model, not configuration on a server.' },
          { title: 'Always the current governed version.', features: ['norms-evaluation-api', 'mechanisms-execution-api'], body: 'The Operator stores nothing: every run resolves the definition fresh from the Definition Manager and discards its context afterwards — what executes is always the version governance approved, never a stale copy.' },
        ],
        features: [
          { slug: 'norms-evaluation-api', name: 'GSM Norms evaluation API', blurb: 'An API to evaluate machine-evaluable Norms against observed state in a sandboxed, reproducible rule runtime — governance as a control loop, not a review meeting.' },
          { slug: 'mechanisms-execution-api', name: 'GSM Mechanisms execution API', blurb: 'An API to execute governed Mechanisms in the same sandboxed, reproducible rule runtime — verdicts and rules become dispatched, effector-driven actions.' },
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
          { title: 'Evidence, never guesses.', features: ['ks-contributions-management-api'], body: 'Every contribution carries a confidence score and a provenance envelope — probabilistic identifications are labeled as such, and deterministic facts never masquerade as contributions.' },
          { title: 'Sealed means sealed.', features: ['ks-contributions-lifecycle-enforcement'], body: 'OPEN → SEALED → BYTE_STABLE, no way back — a sealed board is immutable and its contribution stream byte-stable, so promotion into governed definitions is reproducible.' },
          { title: 'Every mutation on the ledger.', features: ['ks-contributions-retention'], body: 'Contributions, seals, panel updates — each one produces an immutable audit entry, transactional with the mutation it records. The sourcing history cannot be rewritten.' },
        ],
        features: [
          { slug: 'ks-contributions-management-api', name: 'KS Contributions management RESTful API', blurb: 'A RESTful API for knowledge sources to declare panels and post schema-validated contributions — collaborative sourcing with server-owned structure.' },
          { slug: 'ks-contributions-lifecycle-enforcement', name: 'KS Contributions lifecycle enforcement', blurb: 'OPEN → SEALED → BYTE_STABLE — sealed boards are immutable, and the contribution stream is byte-stable for reproducible promotion.' },
          { slug: 'ks-contributions-retention', name: 'KS Contributions retention', blurb: 'Every contribution and its provenance envelope is retained — an append-only, auditable record of how each definition was sourced.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/sie/definition-blackboard-manager/', label: 'Definition Blackboard Manager documentation' }],
        repos: [{ href: 'https://github.com/poesis-cloud/sie-definition-blackboard-manager', label: 'sie-definition-blackboard-manager' }],
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
    values: [
      { title: 'What OpenTelemetry is to RUN, GSM is to THINK.', products: ['specifications'], body: 'OTel set one open, vendor-neutral standard for how systems are <em>observed</em>. GSM does the same for how they are <em>defined and governed</em> — so every obligation is portable across tools instead of trapped in proprietary silos. RUN measures reality; THINK defines intent; both reference the same object.' },
      { title: 'Kubernetes defines infrastructure to operate it. GSM defines the world to govern it.', products: ['specifications'], body: 'Kubernetes proved infrastructure is best declared and driven to a desired state by control loops. GSM generalizes that exact pattern — schema-typed Archetypes, reconciling Mechanisms, an explicit governance grammar and lifecycle — lifted off containers and onto any governed subject. A CRD <em>is</em> an Archetype.' },
      { title: 'Governance as code, composed with policy as code.', products: ['specifications', 'frameworks'], emergent: true, body: 'GSM holds the definition; the cloud-native ecosystem realizes it — OPA / Kyverno compile enforcement from Directives and Norms, sigstore / SLSA supply attestation evidence, OpenTelemetry / Prometheus supply the measurements Norms are evaluated against, Argo realizes delivery guardrails.' },
      { title: 'Vendor-neutral by design.', products: ['specifications'], body: 'GSM is being prepared for neutral, multi-stakeholder stewardship (a CNCF-style path), with conformance defined so independent implementations interoperate — the reference implementation holds no privileged status in the specification.' },
    ],
    products: [
      {
        slug: 'specifications',
        name: 'Specifications',
        tagline: 'The core spec — eight primitives, DNA grammar, Archetyping, and the systemic lifecycle.',
        description:
          'The GSM specification: eight systemic primitives, the DNA governance grammar, Archetyping as the open type system, and systemic lifecycle management — the published artifact every implementation is measured against.',
        values: [
          { title: 'One published contract for every implementation.', features: ['primitives', 'dna-grammar', 'archetyping'], body: 'SIE, ITIP, blackboard sourcers, and third-party tools all read the same specification — the GSM primitives, DNA grammar, Archetyping, and lifecycle are not reinterpreted per vendor. Like OpenTelemetry semantic conventions give RUN a shared vocabulary, GSM Specifications give THINK one.' },
          { title: 'Conformance is testable, not assumed.', features: ['systemic-lifecycle-management', 'primitives'], body: 'The specification is the yardstick: an implementation can be checked against the primitives, grammar rules, and lifecycle transitions it defines. Builders and auditors both point to the same artifact.' },
          { title: 'Built for neutral stewardship.', vision: true, features: [], body: 'The spec is maintained as a public, versioned publication — ready for foundation governance such as CNCF sandbox incubation — rather than living as vendor documentation. Standards live longest when no single product owns them.' },
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
          { title: 'Day-one governance, not a blank page.', features: ['togaf', 'iso-25010', 'iso-25012', 'gdpr', 'nis2', 'scap'], body: 'TOGAF, ISO 25000-series, GDPR, NIS2, and more — over a hundred sourced schemas you attach instead of authoring from scratch. The expertise is already in the catalogue.' },
          { title: 'The authority\u2019s own taxonomy, clause by clause.', features: ['gdpr', 'nis2', 'togaf'], body: 'Each framework is organized by its own structure and every sourced Directive and Norm cites the clause it derives from — provenance you can hand to an auditor.' },
          { title: 'Frameworks that compose, not collide.', features: ['http', 'protocol-semantics', 'itip'], body: 'A quality model, an architecture framework, and a regulation govern the same subject without schema conflicts — they compose through the GSM governance layer into one coherent fabric.' },
          { title: 'Maintained as the real world changes.', features: ['catalogue-update-stream', 'dora', 'safe', 'itil'], body: 'The catalogue is continuously updated as standards, regulations, and legal texts evolve — the organization using it always governs against current requirements, not a frozen snapshot.' },
        ],
        features: [
          { slug: 'http', name: 'HTTP', blurb: 'HTTP interaction semantics sourced as typed Archetypes — methods, status, caching, content negotiation, machine-readable.' },
          { slug: 'togaf', name: 'TOGAF', blurb: 'Enterprise-architecture vocabulary sourced as typed Archetypes — organized by the framework’s own taxonomy, clause by clause.' },
          { slug: 'itip', name: 'ITIP', blurb: 'The IT-domain vocabulary and semantics ITIP governs with — structures, mechanisms, interactions, typed.' },
          { slug: 'protocol-semantics', name: 'Protocol semantics', blurb: 'gRPC, GraphQL, Kafka, AMQP, JDBC, WebSocket — further interaction vocabularies sourced as typed Archetypes.' },
          { slug: 'iso-25010', name: 'ISO 25010', blurb: 'The software quality model sourced as typed Archetypes — quality characteristics as machine-readable vocabulary.' },
          { slug: 'iso-25012', name: 'ISO 25012', blurb: 'The data quality model sourced as typed Archetypes.' },
          { slug: 'gdpr', name: 'GDPR', blurb: 'Regulation vocabulary plus evaluable Directives and Norms, each citing the clause it derives from.' },
          { slug: 'nis2', name: 'NIS2', blurb: 'Directive vocabulary plus evaluable Directives and Norms with clause provenance.' },
          { slug: 'scap', name: 'SCAP', blurb: 'Security content automation vocabularies — identification schemes made machine-readable.' },
          { slug: 'dora', name: 'DORA', blurb: 'Digital operational resilience regulation sourcing — planned.' },
          { slug: 'safe', name: 'SAFe', blurb: 'Scaled-agile framework sourcing — planned.' },
          { slug: 'itil', name: 'ITIL', blurb: 'IT service-management framework sourcing — planned.' },
          { slug: 'catalogue-update-stream', name: 'Catalogue update stream', blurb: 'The catalogue is continuously re-sourced as standards, regulations, and legal texts evolve — you govern against current requirements, not a frozen snapshot.' },
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
    values: [
      { title: 'Definitions that generate systems.', products: ['agentic-harness', 'safe-agentic-organization'], emergent: true, body: 'The framework orchestrates the whole THINK space — portfolio, product, and team workflows — and BUILD is its last orchestration layer: governed GSM definitions become running systems, making GSM’s promise, “definitions that generate systems”, literally true, and closing THINK → BUILD → RUN as one loop.' },
      { title: 'A method, run by agents, as a harness.', products: ['agentic-harness', 'safe-agentic-organization'], emergent: true, body: 'AI runs on intuition — exactly like we do — and methods are how intuition becomes reliable. SAFe, run by agents with a human ★ gate at every layer, is the cognitive harness that makes agentic delivery trustworthy. You don’t wait for a smarter model; you make it implement a method.' },
      { title: 'Many small agents beat one big one.', products: ['safe-agentic-organization'], body: 'A probabilistic model is most reliable — and cheapest — when its task is small, bounded, and well-specified. SAFe’s portfolio → program → iteration hierarchy decomposes delivery once, so every agent stays focused and every layer adds a check.' },
      { title: 'Open, local-first, sovereign.', products: ['agentic-harness', 'agentic-workspace'], emergent: true, body: 'Apache-2.0, running on your machine against your working tree — work state lives in your own files and git history, not a vendor’s cloud. Standard, homogeneous artifacts synchronize through your shared repo, contextualizing every other local orchestration.' },
    ],
    products: [
      {
        slug: 'agentic-harness',
        name: 'Agentic Harness',
        tagline: 'Deterministic resolutions, validations, and traceability of agentic workflows, keeping probabilistic agents on rails.',
        description:
          'The workflow step graphs are validated by a deterministic harness — methodology- and host-agnostic, so the same method runs unchanged on any agent host, and work state lives in your own files and git history.',
        values: [
          { title: 'Deterministic rails for probabilistic agents.', features: ['workflows-steps-resolution', 'step-authorization'], body: 'Every step passes precondition, authorization, and postcondition checks grounded in persisted configuration — agents advance through evidence and sequence, not vibes.' },
          { title: 'Invalid bytes never land.', features: ['artifact-validation'], body: 'Agents stage writes in the working tree; the harness validates artifacts against their schemas before commit — invalid output is discarded and restored, so committed state is always clean.' },
          { title: 'One method, any host.', features: ['workflows-steps-resolution', 'llm-resolution', 'logging', 'skills-instructions-prompt-injection'], body: 'The harness is a stable CLI over plain files — the same workflows run in your IDE today and a CI runner tomorrow, with no relearning and no lock-in.' },
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
          { title: 'An org chart, not a swarm.', features: ['agents', 'workflows'], body: 'Portfolio, program, and iteration orchestrators dispatch a bench of specialist role agents — each one small, bounded, and well-specified, which is exactly when probabilistic models are most reliable and cheapest.' },
          { title: 'A method agents must implement.', features: ['workflows', 'artifacts', 'skills', 'instructions'], body: 'SAFe ceremonies become governed workflows producing typed, schema-validated artifacts — the method is an enforceable contract between human and machine, not a suggestion.' },
          { title: 'Agents propose, humans dispose.', features: ['workflows'], body: 'Every layer ends at a human ★ gate — agents bring evidence through checks and sequence; the decision that matters stays yours.' },
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
          { title: 'Your files, your history, your state.', features: ['workspace-data-plane'], body: 'Work state lives in plain files under your own git history — the event log is your repository, not a vendor\u2019s cloud. Sensitive context never leaves your machine.' },
          { title: 'Install once, deliver governed.', features: ['installer'], body: 'One installer wires the harness, agents, skills, and workflows into any working tree — a governed agentic delivery organization, minutes after clone.' },
          { title: 'The same gates run in CI.', features: ['cicd-pipelines'], body: 'The pipelines validate and publish the artifacts agents produce with the same deterministic checks that run locally — what passed on your machine passes in the pipeline.' },
        ],
        features: [
          { slug: 'workspace-data-plane', name: 'Workspace data plane', blurb: 'Committed state is workspace state — one validated write, one commit, attributed to the acting session; your git history is the event log.' },
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

// ---- Value coherence gates (run at module load / build time) ----------------
for (const sol of solutions) {
  const productSlugs = sol.products.map((p) => p.slug);
  for (const sv of sol.values) {
    if (sv.products.length === 0) throw new Error(`solutions.ts: solution value '${sv.title}' (${sol.slug}) references no product`);
    for (const ps of sv.products) {
      if (!productSlugs.includes(ps)) throw new Error(`solutions.ts: solution value '${sv.title}' (${sol.slug}) references unknown product '${ps}'`);
    }
    // Solution values are synthesized product values in scope and/or emergent
    // interaction values; single-product synthesis is allowed.
  }
  for (const p of sol.products) {
    const featureSlugs = p.features.map((f) => f.slug);
    for (const v of p.values) {
      if (!v.vision && v.features.length === 0) throw new Error(`solutions.ts: value '${v.title}' (${sol.slug}/${p.slug}) is delivered by no feature — formalize the feature or mark it vision`);
      for (const fs of v.features) {
        if (!featureSlugs.includes(fs)) throw new Error(`solutions.ts: value '${v.title}' (${sol.slug}/${p.slug}) references unknown feature '${fs}'`);
      }
    }
  }
}

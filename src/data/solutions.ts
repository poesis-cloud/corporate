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
  zoneLabel: string;
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
    zoneLabel: 'apply',
    href: '/solutions/itip',
    tagline: 'The IT Intelligence Platform — govern and define the IT landscape as a single source of truth, and generate IT artifacts.',
    description:
      'ITIP is where every IT profile converges — architects, developers, ops, security and compliance — to define, govern, and visualize the IT landscape through a single governed source of truth. The first domain application built on SIE.',
    products: [
      {
        slug: 'web-application',
        name: 'ITIP Web Application',
        tagline: 'The platform every IT profile works in — definition, governance, generation.',
        description:
          'The web application and its backend-for-frontend: the governed definition inventory, the framework catalog & composer, artifact generation, and evaluation dashboards — one place where the IT landscape is defined, governed, and visualized.',
        features: [
          { slug: 'definition-inventory', name: 'Definition inventory', blurb: 'Architecture, dependencies, obligations, and constraints live as one governed inventory — a single source of truth, with impact you can trace through typed relations.' },
          { slug: 'framework-catalog-composer', name: 'Framework Catalog & Composer', blurb: 'The published catalogue of frameworks sourced into GSM — TOGAF, ISO 25010 / 25012, GDPR, NIS2, DORA and more — attach them and compose them into one coherent, enforceable governance fabric on day one.' },
          { slug: 'artifactory', name: 'Artifactory', blurb: 'Generate any IT deliverable from the definitions — ADR packs, compliance evidence, architecture baselines, roadmaps — from Archetype-bound templates, each artifact traceable to its definitions.' },
          { slug: 'evaluation-dashboard', name: 'Evaluation Dashboard', blurb: 'Continuous governance indicators — measures and findings computed from the model, so coverage and conformance are observed, not reconstructed before each audit.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/itip/', label: 'ITIP documentation' }],
        repos: [
          { href: 'https://github.com/poesis-cloud/itip-web-frontend', label: 'itip-web-frontend' },
          { href: 'https://github.com/poesis-cloud/itip-web-backend', label: 'itip-web-backend' },
        ],
      },
      {
        slug: 'repository-definition-sourcer',
        name: 'Repository Definition Sourcer',
        tagline: 'Truth sourcing — the model reflects reality, continuously.',
        description:
          'The sourcing pipeline that reads real IT artifacts — source code, API contracts, infrastructure — and posts them as evidence-backed contributions to the SIE Definition Blackboard Manager, so the definition stays anchored to the real system instead of drifting from it.',
        features: [
          { slug: 'truth-sourcing', name: 'Code, API & infra sourcing', blurb: 'Source repositories, API contracts, SBOMs, and infrastructure into governed GSM definitions — the model reflects what actually runs.' },
          { slug: 'knowledge-sources', name: 'Knowledge-source pipeline', blurb: 'A bench of knowledge sources — code index, property graph, dependency analysis, inference — each contributing what it knows, staged over shared panels.' },
          { slug: 'provenance', name: 'Confidence & provenance', blurb: 'Every contribution carries a confidence score and a provenance envelope — which source, which revision, which tools — so every definition is explainable.' },
          { slug: 'contribution-flow', name: 'Blackboard contribution flow', blurb: 'Contributions post to the SIE Definition Blackboard Manager, are validated, sealed byte-stable, and promoted into governed definitions with the audit trail intact.' },
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
    zoneLabel: 'operate',
    href: '/solutions/sie',
    tagline: 'The Systemic Intelligence Engine — implements GSM, operates the definitions, enforces their lifecycle; powers every domain application above it.',
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
          { slug: 'gsm-hosting', name: 'GSM hosting', blurb: 'The reference implementation of the GSM standard — the eight primitives, Archetype schemas, and governance grammar, served as a live model.' },
          { slug: 'ascription-lifecycle', name: 'Ascription lifecycle', blurb: 'DRAFT → PROPOSED → APPROVED → ACTIVE → DEPRECATED — every governed change is a state transition, auditable end to end.' },
          { slug: 'dna-enforcement', name: 'DNA grammar enforcement', blurb: 'Directives, Norms, and Ascriptions are validated against the governance grammar at write time — malformed governance never enters the model.' },
          { slug: 'tenancy', name: 'Multi-tenant schemas', blurb: 'Each tenant\u2019s definitions live in isolated schemas with shared archetypes — one engine, many governed worlds.' },
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
          { slug: 'rule-evaluation', name: 'Norm & Directive evaluation', blurb: 'Machine-evaluable assertions checked continuously against reality — governance as a control loop, not a review meeting.' },
          { slug: 'rule-sandbox', name: 'Sandboxed rule runtime', blurb: 'Rules run in a sandboxed, deterministic profile — no ambient authority, reproducible verdicts.' },
          { slug: 'effector-dispatch', name: 'Effector dispatch', blurb: 'Verdicts trigger typed effectors through protocol dispatchers — enforcement actions are themselves governed definitions.' },
          { slug: 'enforcement-loop', name: 'Continuous enforcement', blurb: 'Observed state in, verdicts and actions out — the loop that keeps the landscape converging to its definition.' },
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
          { slug: 'panels', name: 'Panels & contributions', blurb: 'Contributors declare panels and post schema-validated contributions — collaborative sourcing with server-owned structure.' },
          { slug: 'seal-lifecycle', name: 'Seal lifecycle', blurb: 'OPEN → SEALED → BYTE_STABLE — sealed boards are immutable, and the contribution stream is byte-stable for reproducible promotion.' },
          { slug: 'validation', name: 'Contribution validation', blurb: 'Confidence scores and provenance envelopes are validated before persistence — invalid evidence never enters the board.' },
          { slug: 'audit-ledger', name: 'Append-only audit ledger', blurb: 'Every mutation produces an immutable audit entry, transactional with the mutation it records.' },
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
    zoneLabel: 'define',
    href: '/solutions/gsm',
    tagline: 'The Generative System Model — the vendor-neutral standard for defining and governing systems; the top of every funnel.',
    description:
      'GSM is a vendor-neutral standard for defining and governing software-intensive systems — the THINK layer that the BUILD and RUN layers enforce and measure against. Publicly readable, prepared for neutral stewardship.',
    products: [
      {
        slug: 'specification',
        name: 'The Specification',
        tagline: 'A small fixed core, an open type system — machine-checkable meaning.',
        description:
          'The GSM specification: eight primitives, the DNA governance grammar, the open Archetype type system, and a normative lifecycle with defined conformance — the published artifact every implementation is measured against.',
        features: [
          { slug: 'primitives', name: 'Eight primitives', blurb: 'Structure, Mechanism, Effector, Receptor, Interaction, Archetype, Directive, Norm — a small, fixed core that composes any system.' },
          { slug: 'grammar', name: 'DNA governance grammar', blurb: 'Directives (intent), Norms (machine-evaluable assertions), Ascriptions (typed instances bound to subjects) — a three-tempo grammar for how obligations bind.' },
          { slug: 'archetypes', name: 'Archetypes — the type system', blurb: 'Typed JSON Schema domain schemas that carry vocabulary, grammar, and semantics — meaning travels with the type; frameworks extend GSM without forking it.' },
          { slug: 'interop', name: 'Lifecycle, conformance & portability', blurb: 'A normative Ascription lifecycle, conformance for documents / producers / consumers / processors, sandboxed expression profiles, canonical JSON interchange.' },
        ],
        docs: [
          { href: 'https://docs.poesis.cloud/gsm/', label: 'GSM documentation' },
          { href: 'https://docs.poesis.cloud/gsm/conformance/', label: 'Conformance' },
        ],
        repos: [{ href: 'https://github.com/poesis-cloud/gsm', label: 'gsm' }],
      },
      {
        slug: 'frameworks',
        name: 'GSM Frameworks',
        tagline: 'Established bodies of knowledge, sourced into GSM — ready to enforce.',
        description:
          'The published, versioned catalogue of governance, compliance, architecture, and regulatory frameworks sourced into GSM-compatible schemas — ready-made Archetypes, Directives, and Norms you attach instead of authoring from scratch. Surfaced in ITIP through the Framework Catalog & Composer.',
        features: [
          { slug: 'architecture-frameworks', name: 'Architecture frameworks', blurb: 'TOGAF and peers sourced as typed Archetypes — the architecture vocabulary lives in the type system, not in someone\u2019s head.' },
          { slug: 'quality-models', name: 'Quality models', blurb: 'ISO 25010 / 25012 quality characteristics as measurable Norms — \u201creliability\u201d means the same thing in every review.' },
          { slug: 'regulations', name: 'Regulations', blurb: 'GDPR, NIS2, DORA sourced into Directives and Norms — each clause traceable to its source, coverage continuous and provable.' },
          { slug: 'composition', name: 'Composable governance fabric', blurb: 'Every framework speaks the same DNA grammar, so a regulation, a quality model, and an architecture framework layer into one coherent fabric — overlaps merged, no silos.' },
        ],
        repos: [{ href: 'https://github.com/poesis-cloud/gsm-frameworks', label: 'gsm-frameworks' }],
      },
    ],
  },
  {
    slug: 'framework',
    name: 'SAFe Agentic',
    fullName: 'SAFe Agentic Framework',
    tag: 'Framework + Portfolio',
    zone: 'THINK',
    zoneLabel: 'orchestrate · generate',
    href: '/solutions/framework',
    tagline: 'The SAFe Agentic Framework — open (Apache-2.0) agentic orchestration across portfolio, program, and iteration; BUILD is its last orchestration layer.',
    description:
      'SAFe-shaped multi-agent orchestration spanning THINK — portfolio, product, and team workflows — down to the BUILD hand-off, where code is generated from governed GSM definitions and deployed; a human ★ gate at every layer closes THINK → BUILD → RUN.',
    products: [
      {
        slug: 'orchestration',
        name: 'Orchestration Framework',
        tagline: 'Portfolio → program → iteration — an org chart of agents, not a flat swarm.',
        description:
          'Three orchestrators — one per SAFe layer — run role agents from a single entry point: the portfolio layer tests the strategic bet, the program layer tests the feature shape, the iteration layer tests the code that ships.',
        features: [
          { slug: 'orchestrators', name: 'Three-layer orchestration', blurb: 'Portfolio, program, and iteration orchestrators run the show — with a human ★ gate at every layer.' },
          { slug: 'bench', name: 'Specialist bench', blurb: 'Product, architecture, security, QA, UX, DevOps specialists dispatched into each ceremony as stateless subagents — division of labor makes each agent small and accurate.' },
          { slug: 'ceremonies', name: 'Ceremonies & artifacts', blurb: 'SAFe ceremonies as governed workflows producing typed artifacts — epics, features, stories, ADRs — validated against schemas, not vibes.' },
          { slug: 'human-gates', name: 'Human ★ gates', blurb: 'Every layer ends at a human decision point — agents propose through evidence; humans dispose.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/safe-agentic-framework/distributed-agentic-safe/', label: 'Distributed Agentic SAFe' }],
        repos: [{ href: 'https://github.com/poesis-cloud/safe-agentic-framework', label: 'safe-agentic-framework' }],
      },
      {
        slug: 'harness',
        name: 'Deterministic Harness',
        tagline: 'Gates, conditions, and a ledger that keep probabilistic agents on rails.',
        description:
          'The workflow step graphs are validated by a deterministic harness — methodology- and host-agnostic, so the same method runs unchanged on any agent host, and work state lives in your own files and git history.',
        features: [
          { slug: 'gates', name: 'Step gates & conditions', blurb: 'Pre, invariant, and post conditions checked deterministically at every step — agents move through evidence and sequence, not vibes.' },
          { slug: 'ledger', name: 'Append-only ledger', blurb: 'Every step execution is journaled — the delivery history is an auditable event log, not a chat scrollback.' },
          { slug: 'portable', name: 'Portable across hosts', blurb: 'The harness resolves, checks, injects, and records against plain files and a stable CLI — VS Code today, another IDE or CI runner tomorrow, no lock-in.' },
          { slug: 'local-first', name: 'Local-first & sovereign', blurb: 'The agent loop runs on your machine against your working tree — sensitive information never leaves; state lives in your files and git history.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/safe-agentic-framework/', label: 'Framework overview' }],
        repos: [{ href: 'https://github.com/poesis-cloud/safe-agentic-framework', label: 'safe-agentic-framework' }],
      },
      {
        slug: 'portfolio',
        name: 'Agentic Portfolio',
        tagline: 'The SAFe portfolio itself, as governed files — epics to stories, synced.',
        description:
          'The portfolio artifact layer: epic / feature / story templates, kanbans, and sprint plans as typed, schema-validated files in git — with synchronization to GitHub Projects, so orchestration state is inspectable and versioned.',
        features: [
          { slug: 'artifacts', name: 'Typed SAFe artifacts', blurb: 'Epics, features, stories, retros, PI objectives as schema-validated artifacts — the backlog is data, not prose.' },
          { slug: 'kanbans', name: 'Kanbans & sprints', blurb: 'Portfolio and iteration kanbans as files in git — state transitions are commits, history is the audit trail.' },
          { slug: 'sync', name: 'GitHub Projects sync', blurb: 'The file-based portfolio syncs to GitHub Projects — one source of truth, visible where teams already work.' },
        ],
        docs: [{ href: 'https://docs.poesis.cloud/safe-agentic-framework/', label: 'Framework documentation' }],
        repos: [{ href: 'https://github.com/poesis-cloud/safe-agentic-framework', label: 'safe-agentic-framework' }],
      },
    ],
  },
];

/** Flat nav list (Solutions menu). */
export const solutionLinks = solutions.map((s) => ({ href: s.href, label: s.fullName }));

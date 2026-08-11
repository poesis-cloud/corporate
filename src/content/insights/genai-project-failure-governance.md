---
title: 'The missing layer behind GenAI project failure'
category: 'Research'
date: 2026-08-11
summary: 'Gartner reports that at least 50% of GenAI projects were abandoned after proof of concept, citing unclear value, unready data, escalating costs, inadequate risk controls, and poor change management. Read structurally, these are five expressions of one problem: institutional commitments that stay in documents instead of becoming executable governance.'
---

# The missing layer behind GenAI project failure

In January 2026, Gartner reported that [by the end of 2025, at least 50% of generative AI projects had been abandoned after proof of concept](https://www.gartner.com/en/articles/genai-project-failure). Its analysis identifies five recurring failure points:

1. **Lack of business value** — initiatives without prioritization frameworks or success metrics become difficult to defend when budgets tighten.
2. **Data isn't ready** — uncurated and poorly governed data produces unreliable outputs and weak retrieval-augmented generation.
3. **Escalating total cost of ownership** — projects that appear viable in a proof of concept become uneconomic at production scale.
4. **Responsible AI is an afterthought** — missing controls around safety, privacy, accountability, and fairness create regulatory and reputational exposure.
5. **Poor change management** — technically capable tools see little adoption when they do not fit real work or earn users' trust.

Gartner's diagnosis is direct: *"the biggest obstacle isn't the technology itself — it's how organizations approach implementation."* We agree. We also think the five failure points reveal a common structural problem.

## Five symptoms, one missing layer

Each failure begins with an institutional obligation that exists only as prose: a business case in a presentation, a data-quality objective in a policy, a cost assumption in a spreadsheet, an AI ethics charter on the intranet, or an adoption target in a rollout plan.

The obligation has been stated, but it has not become part of the operating system of the initiative. It has no machine-readable definition, no continuously evaluated measure, no explicit owner, and no reliable consequence when reality diverges from intent.

That is the shared failure beneath Gartner's five categories: **institutional commitments are being carried by artifacts that cannot enforce them**.

The Poesis stack is designed to supply that missing layer. It treats governance rules as versioned, measurable, and executable definitions rather than instructions that a project may or may not honor. This does not replace portfolio judgment, data engineering, FinOps, responsible-AI expertise, or organizational change. It gives those disciplines a common substrate in which their obligations can be expressed, evaluated, and traced.

## From policy documents to executable governance

The Poesis stack separates three responsibilities that are often collapsed into a single policy statement:

1. A **Mechanism measures** an institutional fact and materializes it as structured evidence.
2. A **Norm evaluates** that evidence deterministically and produces a verdict.
3. A reacting **Mechanism enacts** an allowed consequence through typed interfaces.

Measurement, judgment, and enforcement remain distinct. That separation makes it possible to challenge the evidence, revise the standard, or change the response without silently changing all three at once.

The architecture is built from several related components:

- **GSM (Generative System Model)** defines the vocabulary for structures, behavior, governance intent, measurable norms, and versioned ascriptions. It is a published, vendor-neutral specification with a public [conformance catalog](https://docs.poesis.cloud/gsm/specifications/conformance/), developed as a candidate for future contribution as an open standard.
- **SIE (Systemic Intelligence Engine)** is the reference implementation of GSM and its AI context platform. It is designed to make organizational context a governed, typed, versioned, provenance-backed, and queryable asset for AI reasoning, deterministic evaluation, and action.
- **The SIE [Definition Manager](https://github.com/poesis-cloud/sie-definition-manager)** is the authoritative API for GSM definitions and enforces their lifecycle and identity rules.
- **The SIE [Operator](https://github.com/poesis-cloud/sie-operator)** executes typed Mechanisms in a deterministic, sandboxed runtime, connecting governed context to evaluation and permitted action.
- **The Definition Blackboard**, currently in development, is one collaborative sourcing path into SIE. It is designed to reconcile contributions from heterogeneous knowledge sources while preserving confidence, provenance, validation, and an immutable seal lifecycle.
- **ITIP**, also in active development, applies the model to IT governance through sourced frameworks, appraisal indicators, and governance views.

Today, the [GSM specification](https://docs.poesis.cloud/gsm/) and sourced framework definitions are published, and the Definition Manager and Operator are implemented engine services with public repositories. The broader context plane, the integrated Blackboard workflow, operational appraisal dashboards, and the end-to-end continuous-governance experience remain under development. We make that distinction because inspectable maturity is itself part of credible governance.

## 1. Business value must become a governed state

Gartner's first recommendation is to prioritize use cases and continuously track measurable outcomes. The important word is *continuously*. A business case reviewed only at funding gates cannot expose a value gap while there is still time to correct it.

In GSM, a GenAI initiative can be modeled as a typed **Structure**. Its definition remains stable while successive **Ascriptions** record governed versions of its state through the lifecycle `DRAFT → PROPOSED → APPROVED → ACTIVE`, followed when appropriate by `SUSPENDED`, `DEPRECATED`, or a terminal outcome.

A portfolio-governance Structure can then establish a Directive over the initiative, naming the viability dimension it governs:

> AiPortfolioGovernance MUST ENSURE MeasurableValue ON GenAiInitiative

The Norm operationalizes that same dimension inside the governed scope: it is evaluated on `GenAiInitiative` and constrains the `MeasurableValue` qualifier the Directive opened.

> GenAiInitiative ON MeasurableValue: WHEN `MeasurableValue.deploymentAgeDays > 90` ASSERT `measuredOutcomes > 0 && baselineDelta > 0.0` (INSTANTANEOUS)

This is a design example, not a universal ROI formula. Its value is that the owner, evidence shape, evaluation rule, and result are explicit. "Unclear business value" becomes a visible condition of the initiative rather than a conclusion reached during a budget review.

## 2. Data readiness needs governed context, not another document index

Gartner calls for data that is curated, accurate, enriched, and well governed. Most retrieval architectures answer a narrower question: *which passages resemble this prompt?* Similarity does not establish which definition is currently in effect, which policy governs this scope, whether two sources disagree, or which action is permitted.

The Poesis stack treats context itself as governed material. SIE is designed to assemble and serve four related forms of it:

- **Observed context** — evidence about the current state of the governed system.
- **Asserted context** — approved definitions, policies, rules, schemas, and their scopes.
- **Derived context** — evaluations, deviations, impact projections, and feasibility assessments.
- **Provenance context** — why something is believed, approved, and currently applicable.

Asserted context is served today by the Definition Manager; the observation and derivation planes are still in development. Where a domain is modeled and its definitions are in effect, this can replace retrieval rather than supplement it — the model receives the organization's current meaning instead of reconstructing it from document chunks. Where the task is open-ended discovery across unmodeled material, conventional retrieval remains the right tool, and can feed candidates into the governed model.

The fair objection is effort, because modeling costs something. That is why frameworks such as NIS2, DORA, TOGAF and the ISO 25000 series are sourced once into reusable definitions, and why the Definition Blackboard exists: a collaborative path for agentic and human sourcers to propose definitions with confidence and provenance attached, which deterministic reduction and governance review then accept or reject. Those envelopes do not guarantee truth — a source can be confidently wrong — but they make a claim inspectable enough to be governed.

We develop this argument separately in [governed context or document retrieval](/insights/governed-context-versus-retrieval).

## 3. Cost visibility must be connected to decisions

Gartner's third failure point is familiar to anyone who has moved from a demonstration to production: small per-request costs compound across users, workflows, models, and environments. Monitoring spend is necessary, but a dashboard alone does not govern it.

In the Poesis stack, a metering Mechanism can materialize cost telemetry as structured evidence such as spend rate, budget consumption, and forecast overrun. As before, a Directive opens the scope and names the dimension:

> AiPortfolioGovernance MUST MAINTAIN CostUtilization ON GenAiInitiative

A sustained Norm inside that scope then distinguishes a temporary spike from a persistent trend:

> GenAiInitiative ON CostUtilization: WHEN `true` ASSERT `forecastOverrun <= 0.1` (SUSTAINED, temporalWindow P7D, temporalAggregation AVG, sustainedThreshold 0.8)

The exact threshold belongs to the organization. The architectural point is that the threshold, time window, aggregation method, owner, and verdict are inspectable. A separate Mechanism can then route a persistent violation to review, model substitution, workload throttling, or a scale-up gate.

That is the difference between observing cost and connecting cost evidence to governed decisions.

## 4. Responsible AI must be part of the operating architecture

Gartner organizes responsible AI around safety, privacy, accountability, and fairness. These concerns fail when they remain principles without operational ownership or evidence.

The Poesis stack maps them onto distinct governance responsibilities:

- **Accountability** begins with a Directive that identifies the governing Structure and the governed purpose.
- **Safety boundaries** can be expressed as measurable Norms and enforced by gate Mechanisms before consequential effects are dispatched.
- **Privacy and fairness** can be evaluated over materialized evidence such as data-handling records and sampled output assessments.
- **Auditability** comes from preserving definition versions, verdicts, provenance, and lifecycle transitions as primary governance records.

The same model can source obligations from frameworks such as NIS2 and DORA and express them as governed definitions. Our [continuous compliance reference model](/insights/itip-compliance-proof) presents that design pattern. It describes the intended end-to-end experience, not a customer production deployment.

As AI regulation develops, the useful capability is not merely storing another policy. It is maintaining a traceable relationship between an obligation, the organizational structure that owns it, the evidence used to evaluate it, and the decision produced from that evaluation.

## 5. Change management needs both human work and institutional evidence

No governance layer can perform change management on behalf of an organization. Leaders still need to involve users, understand how work and professional identity will change, integrate AI into real workflows, and redesign the initiative when evidence contradicts the plan.

The Poesis stack can improve the conditions for that work in two ways.

First, adoption can become an observed institutional fact. Usage trends, workflow integration, user-reported outcomes, and abandonment can be materialized as evidence and evaluated over time. A persistent decline can trigger a UX review or an honest retirement decision while there is still budget and trust left to preserve.

Second, inspectability can support trust. Employees should be able to know what an AI-enabled process may do, which decisions remain human, what evidence is retained, who owns an escalation, and how a disputed result can be challenged. Explicit rules and traceable decisions do not create trust automatically, but they provide stronger grounds for trust than assurances about an opaque system.

## What we hold ourselves to

We build the stack the way we argue GenAI initiatives should be run. Our own delivery runs on a governed portfolio: work is defined before it is built, changes pass explicit review gates, epics close with retrospectives, and the artifacts are versioned in the open rather than reconstructed afterwards. GSM's own criterion for systemness is reflexivity — a structure becomes a system when its mechanisms produce its own governance — and we would have little standing to propose executable governance to a CIO if our own commitments lived in slide decks.

## From pilot capability to institutional commitment

A proof of concept demonstrates that a capability can work. Production makes an institutional commitment: the initiative now has owners, users, budgets, obligations, evidence, and consequences.

Many GenAI projects fail even when the underlying technology works, because the surrounding institutional commitments never become operational. Business value remains a presentation. Data quality remains an aspiration. Cost remains a dashboard. Responsible AI remains a policy. Adoption remains a hope.

The Poesis stack is being built to turn those commitments into an explicit governance model: Directives with owners, Norms with measurable verdicts, Ascriptions with governed lifecycles, evidence with confidence and provenance, and Mechanisms that connect decisions to permitted action.

For CIOs, CDAOs, AI governance leaders, and enterprise architects, the practical question is not only *which GenAI use case should we fund?* It is also:

> What must be true for this initiative to remain valuable, affordable, responsible, and trusted — and how will we know when it is no longer true?

That is the question a pilot-to-production governance assessment should answer. The Poesis stack provides the model for making that answer explicit, evaluable, and traceable before the proof of concept becomes another abandoned statistic. If you are carrying a GenAI pilot toward production, [talk to us](/contact) — or read the [GSM specification](https://docs.poesis.cloud/gsm/) and judge the model on its own terms.

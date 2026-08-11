---
title: 'Why half of GenAI projects fail — a governance reading'
category: 'Research'
date: 2026-08-11
summary: 'Gartner reports that at least 50% of GenAI projects are abandoned after proof of concept, and names five failure points: unclear business value, unready data, escalating costs, responsible AI as an afterthought, and poor change management. Read structurally, all five are symptoms of the same missing layer — and it is the layer the Poesis stack ships.'
---

# Why half of GenAI projects fail — a governance reading

In January 2026, Gartner published a widely cited analysis of GenAI project failure: [by the end of 2025, at least 50% of generative AI projects were abandoned after proof of concept](https://www.gartner.com/en/articles/genai-project-failure), citing poor data quality, inadequate risk controls, escalating costs, and unclear business value. From hundreds of implementations, the analysis distills five failure points:

1. **Lack of business value** — projects without prioritization frameworks or success metrics become easy targets when budgets tighten.
2. **Data isn't ready** — uncurated, ungoverned data produces unreliable outputs and failed RAG implementations.
3. **Escalating total cost of ownership** — projects viable in proof of concept become budget black holes in production.
4. **Responsible AI is an afterthought** — missing controls around safety, privacy, accountability and fairness end in regulatory exposure and shutdowns.
5. **Poor change management** — technically excellent tools see minimal adoption and quietly die.

Gartner's own summary points at the diagnosis: *"the biggest obstacle isn't the technology itself — it's how organizations approach implementation."* We agree, and we want to push the diagnosis one step further.

## The reframing: five symptoms, one missing layer

Look at the five failure points structurally rather than as a checklist. Each one describes an institutional fact that existed only as prose — a business case in a slide deck, a data-quality aspiration in a policy document, a cost assumption in a spreadsheet, an AI ethics charter on the intranet, an adoption hope in a rollout plan. In every case the fact was **stated but not governed**: nobody could evaluate it mechanically, nothing enforced it, and no system recorded when reality diverged from it.

That is not five independent gaps. It is one gap seen from five angles: GenAI projects are **institutional undertakings run without institutional semantics**. The remedies Gartner prescribes — prioritization frameworks, data governance, FinOps, responsible-AI pillars, adoption tracking — are all governance structures. The question the article leaves open is *where those structures live*. In most organizations they live in documents and meetings, which is precisely why they fail to bind.

The Poesis stack is a **governance substrate**: a layer in which the rules of an initiative are first-class, machine-evaluated objects rather than prose that a project may or may not honor. What follows maps each failure point onto the stack's real machinery.

## What the stack actually provides

A brief inventory, because the mapping only means something if the machinery is concrete:

- **GSM (Generative System Model)** — a definitional ontology of eight sealed primitives (Structure, Mechanism, Effector, Receptor, Interaction, Archetype, Directive, Norm). Its governance grammar runs on three tempos: a **Directive** opens a governance scope (`{structure} {modal} {verb} {qualifier} ON {purpose}`); **Norms** make the scope measurable — each Norm is a deterministic CEL assertion over the properties of exactly one qualifier Archetype, with explicit tolerance semantics (instantaneous, aggregated over a temporal window, or sustained above a threshold); **Ascriptions** bind governed, versioned snapshots to subjects, each moving through an enforced lifecycle.
- **The Definition Manager** — the SIE core that hosts GSM and refuses incoherent states: identity-bound properties cannot mutate, lifecycle transitions outside the state machine are rejected, cascades propagate or block by rule.
- **The SIE Operator** — a deterministic runtime: sandboxed, step-limited rule evaluation over typed frames, producing reproducible verdicts and dispatching typed effects. Same definitions, same inputs, same verdict.
- **The Definition Blackboard** — collaborative sourcing of definitions from heterogeneous knowledge sources, where every contribution carries a **confidence envelope** (strictly below 1.0 — certainty is a fact, not a contribution) and a full **provenance envelope** (source, revision, tools, rule snapshot). Sealed blackboards are immutable, backed by an append-only audit ledger.
- **ITIP** — the IT Intelligence Platform, a domain application that translates GSM for IT organizations: sourced regulatory and architecture frameworks (NIS2, DORA, TOGAF, ISO 25000 series), appraisal indicators, and live compliance dashboards over the governed model.

One discipline recurs throughout: governing an institutional fact always takes three separate primitives. A measuring Mechanism **materializes** the fact as an instance of a qualifier Archetype; a Norm **asserts** over that instance and renders a verdict; a reacting Mechanism **enacts** consequences through typed Effectors. Measurement, judgment, and enforcement never collapse into one another — which is exactly what happens in a slide deck, where the same paragraph is supposed to do all three.

Now the five failure points, one by one.

## Failure 1 — business value, or: a use case is a governed Definition

Gartner's first failure point is the most fundamental: initiatives without success metrics are indefensible when executives demand proof of ROI. The prescription is a prioritization framework with continuously tracked, measurable outcomes.

In the stack, that framework is not a spreadsheet — it is the model itself. Each GenAI use case is a **Definition** whose current state is a versioned, lifecycle-managed **Ascription**: proposed, drafted, in effect, deprecated, retired — each transition an explicit, recorded governance event. A use case cannot be silently half-alive, and killing one is a decision with an owner and a timestamp, not a budget-cycle casualty.

The business case itself becomes evaluable. A Directive names the scope and its owner — *AiPortfolioGovernance MUST ENSURE MeasurableValue ON GenAiInitiative*. A measuring Mechanism reduces the initiative's telemetry into a qualifier Archetype, say `InitiativeValue`, with properties like `deploymentAgeDays`, `measuredOutcomes`, `baselineDelta`. Then the standard "every deployed initiative must demonstrate measured value within a quarter" is a Norm:

> AiPortfolioGovernance ON InitiativeValue: WHEN `InitiativeValue.deploymentAgeDays > 90` ASSERT `measuredOutcomes > 0 && baselineDelta > 0.0` (INSTANTANEOUS)

Deterministic, reproducible, and — crucially — *visible before budgets tighten*. An initiative with no measurable Norms attached to its Directive shows up as a coverage gap on the dashboard, not as a surprise in a steering committee. "Unclear business value" stops being a post-mortem finding and becomes a queryable state of the portfolio.

## Failure 2 — data readiness, or: confidence and provenance are structural

Gartner's second failure point: poor-quality data produces unreliable outputs and failed RAG implementations, and the remedy is data that is "curated, accurate, enriched and well-governed" — including knowledge graphs to organize retrieval.

This is the Definition Blackboard's home ground. In the stack, knowledge does not enter the governed model as raw text. Every contribution from every source — a repository scanner, an SBOM analysis, a human expert, an LLM — arrives on the blackboard carrying a **confidence envelope** (`score` strictly below 1.0, with the `method` and `factors` that produced it) and a **provenance envelope** (which knowledge source, which indexed revision, which tools, which rule snapshot). Contributions are validated against typed panel schemas before persistence; invalid knowledge is rejected at the door, not discovered in production.

The consequence for GenAI specifically: when a model's output is one contribution among others rather than an oracle, hallucination changes category. An unsupported claim is a *low-confidence contribution with inspectable provenance*, sitting next to higher-confidence contributions from deterministic tools — and the reduction into the governed model weighs them accordingly. The "knowledge graph" Gartner recommends is not an add-on to this architecture; the governed definitional model, typed by GSM's ontology, *is* the graph, and it is curated by construction because nothing enters it without confidence, provenance, and validation.

Data readiness also becomes measurable rather than aspirational: coverage, confidence distributions and staleness are properties of qualifier Archetypes that Norms assert over — *DataGovernance ON PanelCoverage: ASSERT `meanConfidence >= 0.7 && staleContributionRatio <= 0.1`* — so "our data isn't ready" is a verdict with evidence, not an intuition voiced too late.

## Failure 3 — cost, or: budgets are governed quantities

Gartner's third failure point is the quiet killer: negligible per-token costs become a TCO nightmare at scale, and projects die abruptly because nobody had visibility into how costs compound. The prescribed remedy is FinOps from day one.

FinOps *is* governance applied to spend — so it maps directly onto the stack's three-step recipe. A metering Mechanism materializes cost telemetry into a qualifier Archetype `CostUtilization` — `spendRate`, `budgetRatio`, `forecastOverrun`. Norms assert over it with tolerance semantics built for exactly this temporal shape:

> AiPortfolioGovernance ON CostUtilization: WHEN `true` ASSERT `forecastOverrun <= 0.1` (SUSTAINED, temporalWindow P7D, sustainedThreshold 0.8)

The tolerance vocabulary matters. An `INSTANTANEOUS` assertion would flag every usage spike as noise; `SUSTAINED` over a seven-day window says *chronic* overrun trajectory is the violation. A demo week that spikes spend violates nothing; a production workload that trends 10% over forecast for a sustained week is a governance event — with a verdict, an owner (the Directive names the governing Structure), and an audit-ledger entry — months before it becomes a cancellation memo.

And where spend should be *prevented* rather than observed, a gate Mechanism carries the hard stop: scale-up requests flow through a sandboxed, step-limited rule in the Operator that only emits the provisioning effect when the cost snapshot passes. The difference between "we monitor costs" and "costs are governed" is precisely the difference between a dashboard and a gate.

## Failure 4 — responsible AI, or: the afterthought is the architecture

Gartner's fourth failure point is the one boards care about: responsible AI bolted on after the fact ends in regulatory violations, brand damage and shutdowns. The prescription is four pillars — safety, privacy, accountability, fairness — plus "compliance tracking and audit trails" and explicit definitions of where GenAI must not be used.

This is not a feature of the Poesis stack. It is the stack's reason to exist — and the four pillars map onto primitives rather than policies:

- **Accountability** is what a Directive *is*: every governance scope names the Structure that owns it. There is no unowned obligation in the model, because the grammar does not parse one.
- **Safety** — "define where GenAI should not be used" — is a gate Mechanism: the sensitive act flows through a rule that only emits the effect when the governing Norms pass. Non-compliant output is not flagged after the fact; the effect is never dispatched.
- **Privacy and fairness** are Norms over materialized evidence — data-handling snapshots, output-audit samples — evaluated deterministically in the Operator, with explicit tolerance windows separating incidents from systemic violations.
- **Audit** is not a logging add-on: every mutation in the substrate lands in an append-only ledger, every service method emits telemetry by an enforced observability floor, and every audit-relevant branch is covered or explicitly waived. "Compliance tracking" is a query, not a quarterly reconstruction project.

We have demonstrated this end-to-end in the IT domain: NIS2 and DORA sourced into GSM as Directives and Norms, attached to a real architecture, with coverage watched continuously on the ITIP dashboard — a live model rather than a pre-audit spreadsheet (see our [continuous compliance case study](/insights/itip-compliance-proof)). The same sourcing pattern extends to AI-specific regulation as it hardens: a regulatory clause becomes a Directive, its measurable obligations become Norms, and compliance becomes a standing verdict.

## Failure 5 — change management, or: trust needs an inspectable substrate

Gartner's fifth failure point is the human one: without change management, adoption withers, employees feel threatened, and the organization captures a fraction of the value. The prescriptions — empathy, workflow-native deployment, piloting with real users — are human work, and we will not pretend a substrate performs them.

What a substrate changes is the *conditions* under which that human work succeeds, in two ways.

First, **adoption becomes an observed, governed fact rather than a hope**. Usage telemetry materializes into a qualifier Archetype — `AdoptionHealth`, with `activeUserRatio`, `usageTrend`, `workflowIntegrationDepth` — and a Norm with a sustained tolerance window distinguishes a slow week from the silent decline Gartner describes: usage "dropping over time" is a measured, sustained violation that triggers a reaction Mechanism — a UX review, a workflow redesign, an honest retirement decision — while there is still budget and goodwill left to act on it.

Second, and less obviously: **the substrate is itself a trust instrument**. Much of the resistance Gartner attributes to employees feeling "threatened rather than empowered" is rational distrust of opaque systems. In a governed deployment, the rules under which AI operates are explicit, versioned, and inspectable; the boundaries of what it may do are enforced gates, not promises; and every consequential action carries provenance a human can dispute. Telling employees "the AI is governed" is change-management prose. *Showing* them the Directives, the Norms, the verdicts and the audit ledger is evidence. People extend trust to institutions whose rules they can read — that is as true of AI deployments as of any institution before them.

## The odds, restated

Gartner's framing is that organizations mastering these fundamentals "turn pilots into production at twice the rate." Our reading of why: the fundamentals are all the same fundamental. A pilot is a demonstration of capability; production is an institutional commitment — with owners, budgets, obligations, evidence, and audit. The 50% that fail are not failing at capability. They are attempting to carry an institutional commitment on a substrate — slide decks, spreadsheets, policy PDFs, prompt text — that cannot hold one.

The Poesis stack does not select your use case, clean your data, cheapen your tokens, or manage your people. What it does is give every one of those concerns the same thing: a place to live as a first-class, machine-evaluated, enforceable object — a Directive with an owner, a Norm with a verdict, a lifecycle with recorded transitions, evidence with confidence and provenance, and an audit trail that exists before anyone asks for it.

GenAI projects don't fail because the technology is weak. They fail because they are institutions built without institutional semantics. Beating the odds starts with the substrate.

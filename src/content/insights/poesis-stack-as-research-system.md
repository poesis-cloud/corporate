---
title: 'The Poesis stack as a research system'
category: 'Research'
date: 2026-08-06
summary: 'The NormalTech shadow evaluations show frontier agents failing at open-ended AI research. Read closely, all five failure modes are governance failures — and each one maps to machinery the Poesis stack already ships: governed lifecycles, measurable Norms, deterministic verdicts, and provenance-carrying evidence.'
---

# The Poesis stack as a research system

In August 2026, Kapoor, Narayanan and colleagues published [early evidence that frontier AI agents cannot yet conduct open-ended AI research](https://www.normaltech.ai/p/ai-agents-cant-yet-do-open-ended). They ran "shadow evaluations": agents were given the main research questions of two unpublished AI papers, thousands of dollars of API credits, and six days of wall-clock time. The original authors reviewed the agents' papers — and unambiguously rejected both.

The team spent over a hundred hours in the logs and distilled five failure modes:

1. The agents **lacked judgment** — they proposed directions experts found impressive, then abandoned them based on low-quality or synthetic data.
2. The agents **were unaware of their resources** — both runs ended with less than half the budget spent and hours to spare.
3. The agents **did not creatively respond to feedback** — their own self-reviews surfaced the issues the experts later raised, yet they added caveats and doubled down.
4. The agents **did not backtrack** — the most ambitious targets were retired on day one and never revisited.
5. The agents **did not follow concrete instructions** — explicit rules on exploration time, review cadence, and paper length were ignored.

The paper reads these as capability gaps, and asks how fast better models and better scaffolds will close them. We propose a different reading.

## The reframing: ungoverned processes doing institutional work

Open-ended research is not a workflow. It is an **institutional process**: hypotheses have owners and lifecycles, evidence has provenance and weight, budgets carry obligations, feedback binds, and instructions are constraints — not suggestions. The shadow evaluations asked ungoverned, semantically unstructured processes to perform institutional-grade work, with all of the institution's semantics compressed into prompts.

So the failure is not only in the agents. It is in the absence of a **governance substrate** — a layer where the rules of the research process are first-class, machine-evaluated objects rather than prose the agent may or may not honor. One reviewer of the study made the point precisely: the harness *is* the agent's executive function, and it was invisible, unversioned, and unenforced.

The Poesis stack is our attempt to build exactly that layer. Not an agent framework — the governance substrate agent frameworks lack. What follows maps each observed failure mode onto machinery the stack already defines, using its real primitives rather than governance vocabulary in the abstract.

## What the stack actually provides

A brief inventory, because the mapping only means something if the machinery is concrete:

- **GSM (Generative System Model)** — a definitional ontology of eight sealed primitives (Structure, Mechanism, Effector, Receptor, Interaction, Archetype, Directive, Norm). Its governance grammar runs on three tempos: a **Directive** opens a governance scope (`{structure} {modal} {verb} {qualifier} ON {purpose}` — e.g. *ResearchGovernance MUST ENSURE EpistemicRigor ON ResearchProgram*); **Norms** make the scope measurable — each Norm is a CEL assertion over the properties of exactly one qualifier Archetype, in the grammar `{structure} ON {qualifier}: WHEN {applicability} ASSERT {assertion} ({toleranceMode})`, with explicit tolerance semantics (instantaneous, aggregated over a temporal window, or sustained above a threshold); **Ascriptions** bind governed, versioned snapshots to subjects, each moving through an enforced nine-status lifecycle.
- **The Definition Manager** — the SIE core that hosts GSM and refuses incoherent states: identity-bound properties cannot mutate, lifecycle transitions outside the state machine are rejected, cascades propagate or block by rule.
- **The SIE Operator** — a deterministic runtime: sandboxed, step-limited rule evaluation over typed frames, producing reproducible verdicts and dispatching typed effects. Same definitions, same inputs, same verdict.
- **The Definition Blackboard** — collaborative sourcing of definitions from heterogeneous knowledge sources, where every contribution carries a **confidence envelope** (strictly below 1.0 — certainty is a fact, not a contribution) and a full **provenance envelope** (source, revision, tools, rule snapshot). Sealed blackboards are immutable, backed by an append-only audit ledger.
- **An observability floor** — every service method emits spans and entry/exit/exception telemetry; every audit-relevant branch is covered or explicitly waived. Governance-relevant behavior is never unobserved.

One design discipline matters for everything below. A Norm cannot inspect an agent's run, its logs, or its lifecycle events — its assertion ranges over the properties of **one qualifier Archetype**, nothing else, and it renders a verdict, not a command. So governing an institutional fact always takes the same three steps:

1. **Materialize** the fact as an instance of a qualifier Archetype, produced by a measuring Mechanism (typically reducing blackboard contributions or telemetry into a snapshot).
2. **Assert** over that instance with a Norm — deterministic, side-effect-free CEL.
3. **React** through a Mechanism whose Starlark rule receives the relevant payload and dispatches consequences through typed Effectors.

Measurement, judgment, and enforcement are three different primitives — deliberately. That separation is precisely what the shadow-evaluation harness lacked: it had none of the three, so "encouragement" had to do the work of all of them.

Now the five failure modes, one by one.

## Failure 1 — judgment, or: hypothesis retirement is a governed decision

The agents abandoned promising directions on the strength of synthetic data. In stack terms, four pieces of machinery were missing at once.

**Hypotheses are Ascriptions.** A research direction is a Definition whose current state is a governed, versioned Ascription. Abandoning it is an explicit lifecycle event — DEPRECATE, then RETIRE — recorded by the Definition Manager. Silent abandonment structurally does not exist. Note what GSM deliberately does *not* do: it does not let you bolt arbitrary domain preconditions onto the lifecycle transition itself. The judgment about whether retirement is warranted belongs to governance, expressed by the next three pieces.

**Evidence carries confidence and provenance.** On the blackboard, a synthetic-data experiment is a contribution whose confidence envelope says so — `score` well below 1.0, `factors` recording that the data was synthetic, provenance recording exactly which tool produced it. The claim "this direction is unpromising" is then a *derived* judgment whose evidential basis is inspectable, not a vibe encoded in a context window.

**Sufficiency is measured, then asserted.** A Norm cannot ask "what did the agent do?" — it asserts over a qualifier Archetype. So a measuring Mechanism reduces the direction's contributions into an instance of a qualifier Archetype, say `RetirementEvidence`, with properties like `initialPromise`, `independentEvaluations`, `nonSyntheticEvaluations`. "Synthetic data may support exploration but cannot be the sole basis for rejecting a high-potential direction" then becomes a valid Norm:

> ResearchProgram ON RetirementEvidence: WHEN `RetirementEvidence.initialPromise == "HIGH"` ASSERT `nonSyntheticEvaluations >= 3` (INSTANTANEOUS)

— axis-predicate applicability, bare-property CEL assertion, boolean verdict. Deterministic, reproducible, disputable on evidence.

**Enforcement is a Mechanism, not the Norm.** If retirement should actually be *prevented* pending evidence, the retirement request flows through a gate Mechanism whose Starlark rule only effects the decision when the evidence passes:

```python
req = sys.receive("RetirementRequest")
if req["initialPromise"] != "HIGH" or req["nonSyntheticEvaluations"] >= 3:
    sys.effect("RetirementDecision", {"direction": req["direction"], "approved": True})
else:
    sys.effect("EscalationNotice", {"direction": req["direction"], "reason": "insufficient non-synthetic evidence"})
```

running sandboxed and step-limited in the Operator, with the Effector and Receptor auto-derived from the rule itself.

None of this makes the agent smarter. It makes the *epistemic process* governed — the fact is materialized, the standard is asserted, the consequence is enacted, and each lives in the primitive built for it.

## Failure 2 — resources, or: budgets are governed quantities

The agents left more than half the budget unspent despite being able to monitor usage and being encouraged to spend it. Monitoring without governance is exactly the gap the stack's Norm semantics were built for — via the same three-step recipe.

First, materialize: a metering Mechanism periodically emits instances of a qualifier Archetype `BudgetUtilization` — `spentRatio`, `phase`, `elapsedRatio` — sourced from the run's telemetry. Encouragement is prose; a Norm over that Archetype is measurable:

> ResearchProgram ON BudgetUtilization: WHEN `BudgetUtilization.phase == "EXPLORATION"` ASSERT `spentRatio >= 0.4 * elapsedRatio` (SUSTAINED, temporalWindow P1D, sustainedThreshold 0.8)

The tolerance vocabulary exists precisely because resource obligations are temporal: `INSTANTANEOUS` would flag every idle hour as noise, but `SUSTAINED` over a one-day window with a 0.8 threshold says *chronic* under-spending is the violation. Leaving 10% idle for an hour is nothing; leaving 50% idle across six days is a sustained violation — a governance event with a verdict and an audit trail, not a quirk discovered post-mortem in the logs.

Then react: a Mechanism of the governing Structure receives the utilization snapshots and dispatches consequences — an exploration-phase extension, a reallocation request, an escalation — through typed Effectors. The deeper point: in the shadow evaluations, under-spending was *observable but not actionable* because no layer owned the obligation. In a governed run the obligation has an owner — the Directive names the governing Structure — and a Mechanism carries the consequence.

## Failure 3 — feedback, or: reviews are binding events, not advice

The most striking finding: the agents' own self-reviews surfaced the very issues the expert reviewers later raised — and nothing happened. Feedback was text in a loop, structurally indistinguishable from any other token.

In the stack, feedback becomes binding through three distinct pieces of machinery — wiring, measurement, and reaction — none of which is rhetoric.

**Wiring.** A reviewer Mechanism emits findings through an Effector typed by a `ReviewFinding` Archetype; the plan-owning Mechanism's rule *begins* with `finding = sys.receive("ReviewFinding")`, so the Operator triggers it on every finding — receiving feedback is not optional when the coupling is a governed Interaction. GSM deliberately eliminated "channels" as a primitive in favor of exactly this: the coupling is an Interaction, and its service properties (review cadence, delivery latency) are Norms *on the Interaction*.

**Measurement.** "Blocking feedback was ignored" must be materialized before it can be judged: a measuring Mechanism reduces findings and plan revisions into a qualifier Archetype `FeedbackResponsiveness` — `openBlockingFindings`, `oldestOpenFindingHours`. Then:

> ResearchProgram ON FeedbackResponsiveness: WHEN `true` ASSERT `openBlockingFindings == 0` (SUSTAINED, temporalWindow PT12H, sustainedThreshold 0.9)

A finding open for an hour while a revision is drafted violates nothing; blocking findings persistently open across half a day is a sustained violation.

**Reaction.** A Mechanism of the governing Structure receives the responsiveness snapshots and, on violation, effects the consequence — a plan-revision demand, a role reassignment, an escalation to a human role.

Adding caveats and doubling down — the observed behavior — is then not a stylistic weakness; it is a measured, sustained violation with a timestamped verdict. And the disagreement the study's own coauthors report (creativity deficit vs. "epistemic lock-in") becomes empirically separable, because the governed system records which findings were delivered, which plans were revised in response, and which verdicts fired.

## Failure 4 — backtracking, or: the Definition outlives the retirement

The agents retired their most ambitious targets within the first day and never fundamentally shifted approach. Two properties of the stack address this directly.

**Retired is terminal — but only for the Ascription.** In the lifecycle, RETIRED is a permanent status: that snapshot of the direction never comes back. The **Definition**, however, is the stable identity across versions, and it survives. Revisiting a retired direction means authoring a *new* DRAFT Ascription of the same Definition — full version lineage intact, including exactly what evidence retired the previous one, at what confidence, from which sources. The context-window branch the agents lost is, here, a first-class re-openable record by construction.

**Exploration contracts follow the recipe.** "Re-evaluate retired high-potential directions when the active portfolio goes cold" is not something a Norm can command — Norms render verdicts. So: a measuring Mechanism reduces the portfolio's in-effect and retired direction-Ascriptions into a qualifier Archetype `ExplorationHealth` — `activePromisingDirections`, `retiredHighPotentialUnderReview` — and a Norm asserts the invariant:

> ResearchProgram ON ExplorationHealth: WHEN `ExplorationHealth.activePromisingDirections == 0` ASSERT `retiredHighPotentialUnderReview > 0` (INSTANTANEOUS)

When the portfolio goes cold and nothing retired is under re-evaluation, the Norm is violated — and a Mechanism of the governing Structure reacts by effecting re-evaluation requests (new DRAFT Ascriptions of the highest-potential retired Definitions). This is the kind of cross-cutting, stateful invariant no per-step agent loop maintains, because it is a property of the *institution's* state, not of any single trajectory.

Exploration/exploitation balance is a systemic invariant. Systemic invariants need a systemic layer to live in.

## Failure 5 — instructions, or: compliance needs an enforcer

The agents ignored explicit rules on exploration time, review cadence, and paper length. This is the least surprising failure and the most diagnostic one: an instruction in a prompt is a *preference expressed to* the process, while a Norm in the substrate is a *constraint evaluated on* the process.

The stack's posture here is strict by design, and the division of labor is the same as everywhere above. Each instruction becomes a Norm over a materialized qualifier Archetype — a `PublicationReadiness` snapshot with `pageCount`, `selfReviewCount`, `explorationHoursRatio`, emitted by a measuring Mechanism:

> ResearchProgram ON PublicationReadiness: WHEN `true` ASSERT `pageCount <= 8 && selfReviewCount >= 2` (INSTANTANEOUS)

And the *hard stop* is a gate Mechanism: the submission act itself flows through a rule that receives the readiness snapshot and only emits the submission effect when it passes — evaluated sandboxed and step-limited in the Operator, so "did the run comply?" has exactly one answer, computable by anyone holding the definitions and the telemetry. Paper length exceeding the limit doesn't produce a longer paper with an apology; the gate never emits the effect. And because every mutation lands in an append-only audit ledger, non-compliance is not something a hundred hours of log archaeology must excavate — it is a queryable fact the moment it occurs.

The study's authors had to *reconstruct* the governance history of each run from raw logs. A governance substrate makes that history a primary artifact.

## Shadow evaluations are ungoverned institutional simulations

Step back and the shadow evaluation format itself comes into focus. It asks an agent to *simulate an institution*: propose hypotheses, design experiments, steward resources, run review cycles, produce a publication. But it supplies no institutional semantics — no ontology of what a hypothesis, a budget, a review, or a deadline *is*, and no runtime in which those things have force.

In stack terms, a governed shadow evaluation would be modeled as a Structure whose Mechanisms carry the research capabilities, wired through typed Interactions, governed by Directives along explicit viability dimensions — epistemic rigor, resource stewardship, responsiveness, compliance — each operationalized by measurable Norms, with every hypothesis and plan living as a lifecycle-managed Ascription and every piece of evidence entering through the blackboard with confidence and provenance attached. The harness — the "executive function" the study's reviewers wished were published — stops being an implicit prompt graph and becomes a versioned, inspectable, enforced definition. Reproducibility is then not an aspiration of the evaluation; it is a property of the substrate.

The NormalTech results are, on this reading, a beautifully documented demonstration of what happens when you run an institutional process without institutional semantics.

## RSI and Amdahl's law: making bottlenecks governed objects

The article's larger stake is recursive self-improvement: if agents cannot do open-ended research, RSI is bottlenecked, and Amdahl's law caps the payoff of speeding up only the verifiable parts.

A governance substrate does not remove bottlenecks. Its contribution is more austere and more useful: it makes bottlenecks **explicit, attributed, and measurable**. When the research process is a governed system, you can state — as definitions, not opinions — which capabilities are delegated to agents and which are reserved to human roles, which constraints bind each stage, and where verdicts show the process actually stalling. "Which world are we in?" — the easily-resolved-bottlenecks world or the many-hard-bottlenecks world — becomes a question you answer by reading the system's own governance telemetry rather than by forecasting.

That also reframes RSI itself: from a mystical loop of agents improving agents into a governed institutional process whose degree of automation, at every point, is a defined, versioned, auditable fact.

## The reflexive note

One reason we hold this thesis with some confidence: the stack applies it to itself. GSM's own criterion for systemness is reflexivity — a Structure becomes a System when its mechanisms produce its own governance DNA — and the Poesis stack is built that way, from the self-typing seed Archetype at the root of its type system to the governed portfolio process (definitions, review gates, retrospectives, audit trails) through which agentic teams deliver it. The failure modes NormalTech documented are the ones our own delivery process is instrumented against, for the same reason and with the same machinery.

## Conclusion

The path to open-ended AI research is not only better agents. The five failure modes — judgment, resource awareness, feedback integration, backtracking, compliance — are not five independent capability gaps to be hill-climbed away; they are one gap seen from five angles: **the work was institutional and the process was ungoverned**.

Better models will help, and better scaffolds will help more — the study's own reviewers noted that the scaffold is where the executive function lives. But a scaffold that matters is a governance layer, and a governance layer worth trusting is explicit, typed, deterministic, and auditable. That is what the Poesis stack is: not a replacement for agents but the substrate that governs them; not a replacement for human institutions but their formalization; not a solution to RSI but the layer in which RSI can finally be posed as a measurable, governed question.

The agents didn't fail at research. They failed at *being an institution* — because nobody gave them one.

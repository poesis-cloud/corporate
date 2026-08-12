---
title: 'Deterministic governance execution with the SIE Operator'
category: 'Research'
date: 2026-08-12
summary: 'How step-limited sandbox evaluation, typed effectors, and lifecycle-enforced definitions produce reproducible verdicts.'
---

# Deterministic governance execution

Probabilistic models propose; governance disposes. That division of labor only works if the disposing side is actually dependable — if the same governed definitions, evaluated against the same input, always produce the same verdict. The [SIE Operator](https://github.com/poesis-cloud/sie-operator) is the runtime built to provide that property.

This piece describes how it does so: what the Operator executes, how its evaluation pipeline is structured, and which specific design decisions remove the usual sources of irreproducibility. It also states plainly where nondeterminism remains, because a claim of determinism is only useful when its boundary is explicit.

## A runtime for mechanisms, not a service with rules

The Operator is best understood by analogy to a language runtime — the JVM, the CLR, BEAM. A runtime does not own the programs it runs; it provides a disciplined environment in which programs execute predictably. The Operator does the same for GSM **Mechanisms**: causal logic units whose behavior is written as Starlark rules and whose inputs and outputs are typed by Archetype schemas, all governed through [GSM](https://docs.poesis.cloud/gsm/), the published specification underneath the stack.

Two architectural choices follow from this framing.

**The Operator is stateless.** Every operation request is self-contained. The execution context is resolved fresh, the sandbox is created fresh, and nothing persists between invocations. There is no cache of prior verdicts to drift, no accumulated session state to make the ten-thousandth evaluation differ from the first.

**The Operator does not own definitions.** It queries the [Definition Manager](https://github.com/poesis-cloud/sie-definition-manager) at runtime for the mechanism, its ports, and their schemas. What executes is therefore always a governed, versioned, lifecycle-managed definition — never a local copy that quietly diverged from what the organization approved.

## The evaluation pipeline

Every operation passes through the same phases, in the same order, with validation gates between them.

**Frame resolution.** The Operator fetches the mechanism from the Definition Manager and assembles its operation frame: the rule source, the receptor and effector ports, and the Archetype schema typing each port. Two governance checks happen here. First, lifecycle enforcement: only definitions in the `ACTIVE` or `DEPRECATED` state may execute — a `DRAFT` mechanism is rejected outright, and a deprecated one executes with a warning on record. Second, operability: the mechanism must be explicitly wired, through a governed Interaction, to this Operator. Execution rights are declared in the model, not assumed by deployment topology.

**Type checking.** The operation input is validated against the receptor schemas before any rule logic runs. Malformed input never reaches evaluation; it is rejected with a descriptive error. This is the same discipline a typed language applies at a function boundary, applied at the governance boundary.

**Rule evaluation.** The rule executes in a freshly created [Starlark](https://github.com/bazelbuild/starlark) sandbox. Starlark — the configuration language of the Bazel build system — was designed for exactly this problem: it is hermetic and deterministic by construction. A rule has no file system, no network, no clock, no imports, and no ambient authority. Its only channel to the world is an explicit API: `sys.receive()` to take the typed input, `sys.effect()` to declare typed outputs. Evaluation is bounded by a step limit, so every rule terminates — a rule that exceeds its budget fails cleanly rather than hanging enforcement.

**Effector dispatch.** Effects declared by the rule are handed to protocol dispatchers through a protocol-neutral interface. An HTTP dispatcher performs outbound calls; a Relay dispatcher propagates effects in-process. When an effect is closed-loop — the rule awaits a response — the feedback is validated against its declared schema before the rule may act on it. Typed on the way out, typed on the way back in.

**Response.** The verdict — success, the emitted effects, or a structured error — is returned to the caller.

## Where determinism actually comes from

None of the phases above is exotic on its own. The reproducibility claim rests on how they compound:

- **Governed inputs to evaluation.** The rule that runs is a specific version of a definition with a lifecycle state, fetched from the system of record at execution time. "Which policy evaluated this?" has an exact, versioned answer.
- **A hermetic evaluation language.** Starlark rules cannot read anything they were not given or affect anything they did not declare. The evaluation is a pure function of the frame and the input, plus any closed-loop feedback — each of which is captured in the operation record.
- **Schema-validated boundaries.** Inputs, outputs, and feedback are all checked against Archetype schemas. Nothing untyped crosses into or out of an evaluation.
- **Fresh state, bounded steps.** Per-invocation sandboxes eliminate cross-invocation interference; the step limit eliminates unbounded execution. Together they make each evaluation an isolated, terminating event.

The precise claim is this: **given the same definitions, the same input, and the same feedback responses, the Operator produces the same verdict and the same effects.** Evaluation is replayable.

## Where nondeterminism remains — deliberately

Three things sit outside that boundary, and it would be dishonest to elide them.

The sandbox exposes a small set of host functions, two of which touch the outside world: `now()` returns the current timestamp, and `uuid7()` generates a time-sorted identifier. These exist because governance rules legitimately need to reason about time and mint identities. They are the *only* nondeterministic surface inside evaluation — explicit, enumerable, and visible in any rule that uses them, rather than smuggled in through ambient APIs.

The world beyond the effectors is, of course, nondeterministic. An HTTP call may fail, time out, or return something different tomorrow. The Operator does not pretend otherwise; it draws the line so that the *decision logic* is deterministic and the *world's responses* re-enter only through validated, recorded feedback. What varies is captured; how it is judged does not.

And the language model layer above all of this remains probabilistic by nature. That is precisely the point of the architecture: models are excellent at proposing — candidate definitions, interpretations, courses of action — and poorly suited to being the last word on what an organization requires. The Operator exists so that the last word is computed, not sampled. This is the same division we draw in [governed context versus retrieval](/insights/governed-context-versus-retrieval): the probabilistic layer explores, the governed layer decides.

## Why this matters for enforcement

A governance verdict is only as trustworthy as its reproducibility. When a compliance appraisal flags a gap — a Directive with no operationalizing Norms, say — the question that follows is *why*, and the answer must survive scrutiny: this rule version, this input, this evaluation, this verdict, and anyone re-running it gets the same result. Deterministic execution is what turns a governance outcome from an assertion into evidence. That evidentiary chain is developed further in [how ITIP proves compliance](/insights/itip-compliance-proof).

It also changes the economics of trust. A reviewer does not need to audit every verdict; auditing the definition and spot-replaying evaluations suffices, because nothing else can have influenced the outcome. That is a property no amount of prompt engineering can retrofit onto a probabilistic pipeline.

## What is implemented, and what is not

In keeping with how we write about the stack: the pipeline described here — lifecycle-checked frame resolution, schema validation, step-limited sandbox evaluation, and HTTP and Relay effector dispatch — is implemented and tested in the [sie-operator](https://github.com/poesis-cloud/sie-operator) repository. Operation *chains* — ordered sequences of mechanism frames linked by Relay interactions, the Operator's analogue of a call stack — are designed but not yet implemented, and additional protocol dispatchers (Kafka, AMQP, gRPC, and others) are reserved but not built. A piece arguing for verifiable execution should itself be verifiable; the code is public, and the gap between design and implementation is stated rather than smoothed over.

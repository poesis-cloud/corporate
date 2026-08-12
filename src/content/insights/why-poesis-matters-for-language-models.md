---
title: 'Better context beats bigger models: why Poesis matters for language models'
category: 'Research'
date: 2026-08-12
summary: 'Language models are asked to infer organisational reality, authority, and permission from prose on every request. Poesis changes the environment: models propose against governed definitions, while deterministic and human governance decides what may become action. Smaller models may benefit most — a hypothesis the architecture makes testable.'
---

Language models are becoming more capable, but enterprise deployment still asks them to solve the wrong problem. Before answering a question or proposing an action, a model must reconstruct the organisation from fragments: which system exists, which policy is current, which dependency matters, who has authority, and what action is permitted. Larger models compensate for that ambiguity with more learned structure and stronger inference. They do not remove it.

Poesis starts from a different premise: **do not require the model to carry the organisation inside its weights. Give it governed, machine-readable context connecting operative definitions, governing intent, realized behavior, and evidence.** This benefits every language model: even the largest cannot know from its weights which definition is currently in effect, who holds authority, or what is permitted — those are context problems, not capability problems. It matters disproportionately for smaller models, because explicit relations replace part of the world-modeling burden that scale would otherwise absorb.

This is a conceptual architecture claim, not a benchmark result. Its value is that it produces a testable proposition: for bounded enterprise tasks, better governed context may matter more than a larger general-purpose model.

## The missing layer is not another model

Poesis is not alone in making organisational knowledge machine-readable. Policy-as-code engines evaluate rules. Semantic-web technologies type concepts and relationships. Compliance formats encode controls. Declarative infrastructure reconciles desired and observed state. Digital twins model operational systems.

Poesis extends and combines these ideas around a different centre: the **governed definition**. Its Generative System Model (GSM) joins five concerns — each served by at least one of these approaches, yet rarely connected:

- what a subject is and how it is structured;
- how it behaves and interacts;
- what governs it and why that authority is legitimate;
- which version is currently in effect;
- how proposed changes become accepted, rejected, superseded, or retired.

The claim is not that no other initiative addresses any of these concerns. The claim is that connecting them through one definitional and governance grammar creates a context layer suited to both enterprise governance and machine intelligence.

## A governed world reduces what the model must infer

GSM provides a **closed structural metamodel with an open, governed domain vocabulary**. Eight primitive classes define the kinds of systemic things that can exist; Archetypes extend them with domain-specific meaning. The structural grammar remains stable while the vocabulary can grow from finance to healthcare, public administration, or IT.

For a language model, that arrangement changes the task.

Instead of inferring an unconstrained ontology from documents, the model maps evidence into governed structural roles. Instead of deciding which policy is authoritative, it can query which definition is in effect. Instead of inventing a constraint, it must connect the constraint to the governance relationship that legitimates it. Instead of treating every retrieved passage as equally plausible, it can distinguish observation, proposal, approved definition, and executable rule.

The model still reasons; it simply reasons over better material. Poesis does not make a model truthful by surrounding it with schemas. It makes unsupported structure, stale authority, and invalid transitions easier to detect and harder to mistake for governed reality.

## Bounded languages move judgment into the environment

Enterprise AI becomes dangerous when fluent generation is confused with permitted action. GSM therefore expresses governance assertions and causal mechanisms in bounded, analyzable languages with typed inputs and outputs. SIE, the Systemic Intelligence Engine, is the runtime architecture that serves and evaluates those definitions.

This does not eliminate model error. It changes where error is contained. A model may propose a rule, classification, remediation, or action; the environment can then evaluate structural validity, applicable constraints, lifecycle state, and required evidence independently of the model that produced it.

That is the load-bearing partnership:

> **Models propose. Governed systems dispose.**

Human authority remains decisive where judgment and accountability require it. Deterministic evaluation handles what can be decided mechanically. The model contributes interpretation and synthesis without becoming the source of institutional truth.

## Probabilistic contribution becomes governable material

Language models are probabilistic sources. Treating their outputs as if they were facts is the category error behind many enterprise AI failures. Poesis instead treats uncertain contributions as candidates that must carry enough context to be inspected, compared, and governed.

The conceptual pattern is simple:

- contributions declare their uncertainty rather than impersonating certainty;
- provenance preserves who or what produced them, from which material and under which conditions;
- typed boundaries reject structurally invalid material;
- reduction and review remain explicit processes rather than hidden prompt behavior;
- accepted definitions enter a governed lifecycle, while rejected proposals remain evidence rather than truth.

This pattern is the working contract of Poesis's collaborative definition-sourcing components, not an aspiration. Confidence and provenance do not make a contribution correct. They make it possible to challenge, reproduce, compare, and dispose of the contribution responsibly. This is the difference between using a language model as an oracle and using it as a participant in a governed knowledge process.

## Governed context is stronger than document similarity where authority matters

A language model cannot memorize every organisation's current policies, dependencies, exceptions, and decisions, regardless of parameter count. Conventional retrieval helps it find relevant documents, but similarity cannot determine by itself which statement is current, applicable, legitimate, or permitted.

Poesis sources regulatory, architectural, operational, and protocol knowledge into typed, versioned definitions with provenance and governed relationships. Composition happens at the governance layer, where conflicts can be surfaced and disposed of, rather than hidden inside cross-linked schemas or competing passages.

Retrieval remains valuable for discovery and unmodeled material. Governed context becomes stronger where an answer must support action. Retrieval proposes what may be relevant; the definition layer establishes what the organisation currently accepts. The distinction is developed further in [Governed context or document retrieval](/insights/governed-context-versus-retrieval/).

## The enterprise case: governed change rather than plausible advice

Consider a model asked whether a proposed change to a regulated service may proceed.

A document-grounded assistant retrieves policies, architecture records, control descriptions, and previous decisions. It can produce an excellent explanation, but it must infer which sources are current, which obligations apply, whether an exception remains valid, and who may authorise the result.

In a governed definitional loop, the model can relate the in-effect service definition and its operative code to observed dependencies, applicable obligations, approved exceptions, and authority boundaries. It proposes an impact analysis and remediation. Deterministic checks — SIE evaluating Norms, lifecycle states, and structural validity — settle what is mechanically decidable. Accountable humans dispose of the remaining judgment. The resulting decision keeps its evidence and rationale.

The commercial value is not merely fewer hallucinations. It is a shorter path from model output to authorised enterprise action — with less repeated interpretation, clearer accountability, and reusable evidence.

## Agentic organisations can exploit heterogeneous models

The same principle applies to the organisation of model work. SAF, Poesis's agentic delivery framework, separates a deterministic harness from the agentic organisation it executes and the shared workspace it governs. The current reference organisation is SAFe-shaped, but the harness is methodology-independent: another organisation can declare different roles, workflows, gates, and artifacts without changing the execution principle.

This matters because enterprises will not run one model for every task. They will use heterogeneous fleets: frontier models where open-ended reasoning justifies their cost, smaller or specialised models where work is bounded and data or deployment must remain under enterprise control, and deterministic software wherever generation is unnecessary.

Declared roles narrow the model's responsibility. Artifact contracts constrain what it may produce. Workflow gates establish when work can advance. Capability-based qualification creates a path to selecting the least costly model supported by evidence rather than defaulting every task to the largest available model. Verification attaches to the resulting evidence and process, not merely to confidence in the producer.

Smaller models are therefore not the subject of a separate architecture. They are the strongest economic consequence of the same architecture: as the environment becomes more explicit and the task more bounded, less general capability must be purchased for every step.

## Why this matters to model providers

The relationship is reciprocal. Model providers supply interpretation, extraction, synthesis, and planning. Poesis supplies governed organisational context, tool surfaces, evaluation criteria, and a disposition layer between proposal and action.

This creates several partnership opportunities without coupling GSM to one vendor:

- grounded inference over current organisational definitions;
- tool-mediated inspection and proposal rather than unsupported answer generation;
- governed evaluation and workload qualification;
- model-assisted sourcing of candidate definitions;
- later, where evidence supports it, specialisation over governed traces whose ownership and usage rights are explicit.

The near-term claim is inference and governance, not automatic training uplift. Whether governed definitions improve model quality, permit smaller models to match larger ones on bounded tasks, or create valuable specialisation corpora must be proven against strong baselines. The architecture makes those questions measurable; it does not answer them by assertion.

## A credible research agenda

Three propositions carry the thesis and should be tested independently:

1. **Grounding:** governed definitions reduce unsupported claims and authority errors compared with document-only retrieval on tasks where scope, currency, and permission matter.
2. **Disposition:** independent structural and governance checks catch consequential model errors before proposal becomes action.
3. **Substitution:** on sufficiently bounded tasks, governed context and explicit workflows allow smaller or cheaper models to reach the useful performance of larger models at lower operational cost.

The third proposition is the boldest and the reason small models remain central to the story. It should become a result only when measured. Until then, it is a disciplined hypothesis with unusually concrete architectural support.

## Conclusion

The prevailing question — how do we make models larger and smarter? — is incomplete. Enterprises should also ask: **how do we make the world models act within more explicit, authoritative, and governable?**

Poesis answers with a governed definitional loop: stable systemic structure, open domain vocabulary, explicit intent, operationalized Norms, realized behavior, descriptive evidence, provenance, lifecycle, and accountable disposition. It does not replace model capability. It stops spending that capability on repeatedly reconstructing these relations from prose.

Better context can make every model more useful. If it also lets enterprises deploy smaller, sovereign, specialised, and less expensive models for more of their work, then governance is not only a control on AI. It becomes a source of AI capability and economic advantage.

---
title: 'Spec-driven development without spec drift'
category: 'Research'
date: 2026-08-15
summary: 'Spec-driven development got the instinct right: when code is generated, the spec becomes the primary artifact. Then it kept the spec as a markdown file — untyped, unversioned in any governed sense, unevaluated — and re-inherited the oldest problem in software at higher stakes: drift, in an artifact that now generates the system. The fix is not a better template. It is giving the spec a lifecycle.'
---

**Spec-driven development** went mainstream fast: spec kits, spec-first agent workflows, the "Software 3.0" argument that natural-language specifications are becoming the primary programming artifact. The instinct is right, and it is the same inversion this stack is built on — when implementation is cheap and generated, the *definition* of what to build becomes the thing of value, [the generative inversion](/insights/the-generative-inversion/) arriving in developer tooling.

Then the movement made a quiet, fatal concession: it kept the spec as a text file.

## Promotion without governance

Spec-driven development promotes the spec to source-of-truth status without giving it any of the properties sources of truth need. A markdown spec has no schema — nothing checks that it is complete, well-formed, or even internally consistent. It has no lifecycle — nothing distinguishes a draft from an approved commitment, or records who approved it. It has no binding to obligations — nothing connects it to the security posture, regulation, or architectural decisions it must respect. And it has no tie to reality — nothing updates it when the system it generated evolves.

The result is **spec drift**, in two directions at once. The spec drifts from the *system*: code moves on, the spec stays, and within weeks the primary artifact is a historical document. And the spec drifts from *intent*: specs multiply across teams, quietly contradict each other and the rules above them, and nobody is checking — because prose cannot be checked.

Software has met this failure before. It used to be called documentation. Spec-driven development re-inherits it at far higher stakes, because this time the drifting artifact **generates the system**.

## The spec as a governed definition

The fix is not a better template. It is changing what a spec *is*: not a file that describes the system, but a **governed definition** the system is generated from.

Concretely, in [GSM](/solutions/gsm) terms: the spec is **typed** — an Archetype's schema says what a complete specification of this kind must contain, so validity is checked, not hoped for. It is **lifecycle-managed** — drafted, proposed, approved, activated; what generates is always the approved version, never a stale copy or an unreviewed edit. It is **bound to obligations** — Directives and Norms attach the rules the spec must respect, and those are evaluated continuously rather than remembered occasionally. And every generated artifact is **traceable** to the exact definitions it derives from.

Both drifts then close mechanically, because both directions of the loop are governed. Downstream, generation runs under a [harness](/insights/what-is-an-agentic-harness/): agents implement from the governed definitions, every artifact is validated against its schema before it lands, and a human gate closes each layer — the [Systemic Agentic Framework](/solutions/saf)'s whole shape. Upstream, truth sourcing reads the running system — repositories, contracts, infrastructure — back into definition proposals, so when reality moves, the definition is confronted with it instead of ignoring it.

## Definition-driven, honestly

What this amounts to is spec-driven development completing its own argument. If the spec is primary, it deserves what primary artifacts get: types, versions, approval, evaluation, provenance. Define → generate → evaluate → refine — the same loop that made infrastructure declarative, applied to the artifacts developers now write in English.

A spec with a lifecycle stops being documentation that happens to be read by machines. It becomes the system's law — kept, checked, and enforced. That is the difference between writing specs and being governed by them; and for teams staking their delivery on generated code, it is the difference between a methodology and a wish.

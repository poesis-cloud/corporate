---
title: 'Spec-driven development without spec drift'
category: 'Research'
date: 2026-08-15
summary: 'We watched spec-driven development emerge with a sense of recognition: it is the same inversion we bet on — when implementation is generated, the definition becomes the artifact of value. This note explores the question the movement will meet next, one every practitioner already knows from documentation: what keeps the spec true? We share the answer we converged on — give the spec a lifecycle — and how it closes drift in both directions.'
---

**Spec-driven development** went mainstream fast — spec kits, spec-first agent workflows, the "Software 3.0" observation that natural-language specifications are becoming a primary programming artifact. We watched it happen with a sense of recognition, because it is the same inversion our whole stack is a bet on: when implementation is cheap and generated, the *definition* of what to build becomes the artifact of value — [the generative inversion](/insights/the-generative-inversion/), arriving in developer tooling. The movement's instinct is right, and the tooling emerging around it is doing real good.

Like every good idea, it now gets to meet its hardest question — one practitioners will recognize immediately, because software has met it before.

## The question the movement inherits

Every team that has maintained documentation knows the failure mode: the artifact that describes the system and the system itself part ways quietly, and by the time anyone notices, the description is a historical document. **Drift** is not a tooling defect; it is what happens to any authoritative artifact that nothing keeps true.

Spec-driven development raises the stakes on that old problem in a specific way: the spec is no longer *describing* the system — it is **generating** it. That makes drift double-ended. The spec can drift from the *system*, as code evolves past it. And the spec can drift from *intent*, as specs multiply across teams and quietly diverge from each other and from the obligations above them. The more central the spec becomes, the more these questions matter — which is exactly why the movement's success forces them.

We have been working on this question from the governance side for some time, and we can share where our reasoning led.

## What a primary artifact deserves

Our conclusion, compressed: if the spec is the primary artifact, it deserves the properties primary artifacts have always needed — and prose alone cannot carry them. In [GSM](/solutions/gsm) terms, a spec becomes a **governed definition**:

- **Typed** — a schema states what a complete specification of this kind contains, so validity is checked rather than hoped for.
- **Lifecycle-managed** — drafted, proposed, approved, activated; what generates is always the approved version, and the difference between a draft and a commitment is a recorded fact.
- **Bound to obligations** — the security posture, regulations, and architectural decisions a spec must respect are attached as evaluable Directives and Norms, checked continuously.
- **Traceable** — every generated artifact points back to the exact definitions it derives from.

With that in place, both directions of drift close as a loop rather than a discipline. Downstream, generation runs under a [harness](/insights/what-is-an-agentic-harness/): agents implement from governed definitions, artifacts are validated against their schemas before they land, and a human gate closes each layer — the shape of the [Systemic Agentic Framework](/solutions/saf). Upstream, truth sourcing reads the running system — repositories, contracts, infrastructure — back into definition proposals, so when reality moves, the definition is confronted with the change rather than left behind by it.

## Completing the argument

We read this not as a correction to spec-driven development but as its own argument, completed. The movement established that the spec is primary; what follows is giving it what primary artifacts get — types, versions, approval, evaluation, provenance — so that *spec-driven* can mean **governed by the spec**, not merely started from one. Define → generate → evaluate → refine: the loop that made infrastructure declarative, offered to the artifacts developers now write in English.

Spec-first developers are natural allies of everything argued on these pages, and the loop above is one worked answer, not the only conceivable one. If you are solving spec drift another way, we would sincerely like to compare notes — the question is young, and it is the right one to be asking.

---
title: 'The digital twin of an organization starts with its IT landscape'
category: 'Research'
date: 2026-08-15
summary: 'The digital twin is one of engineering''s most trusted patterns: a live model, continuously fed from the real asset, that you act on before touching reality. Extending it to the organization itself is the right ambition — and it inherits a hard question the physical version never had to ask: what are the sensors, and what is the physics? We share what we learned building one, and why the answer begins in IT.'
---

The **digital twin** is one of engineering's most trusted patterns, and it earned that trust the hard way. NASA maintained physical twins of its capsules to reason about spacecraft it could no longer touch; Michael Grieves gave the idea its modern product-lifecycle formulation; and today jet engines, factories, and buildings run alongside live digital counterparts — models continuously fed from the real asset, on which you simulate a change before committing it to reality. When Gartner extended the ambition to the enterprise itself — the **digital twin of an organization** — it named something genuinely worth wanting.

The extension also inherits a question the physical pattern never had to ask.

## Sensors and physics

Physical twins work because two ingredients come with the territory. The asset emits **telemetry** — sensors stream its actual state into the model, so the twin cannot quietly diverge from the thing it mirrors. And the domain supplies **physics** — equations that make simulation meaningful, so acting on the twin genuinely predicts acting on the asset.

An organization has neither in the obvious sense. There is no thermocouple for an architecture, no strain gauge on an obligation. So the first generation of organizational twins was, understandably, built by hand — modeled in workshops, maintained by analysts — and many stalled the same way: the model drifted from the organization the moment attention moved elsewhere, and simulation on a drifted model answers questions about a company that no longer exists. That is not a failure of the pattern. It is a missing substrate.

## What we learned building one

Working on this for the IT domain, we converged on four properties the organizational twin needs — each one answering an ingredient the physical pattern got for free:

- **Sourced** — the sensor bench exists; it just isn't physical. Repositories, API contracts, SBOMs, and infrastructure are continuously read by truth sourcers into evidence-backed model contributions, so the twin is fed from reality rather than from memory.
- **Typed** — the physics is semantics. Every element of the twin carries a schema that states what it is and how it relates, which is what makes simulation meaningful: impact propagates through typed relations, not through a diagram's good intentions.
- **Governed** — here the organizational twin genuinely differs from the physical one. A jet engine's twin only has to be *accurate*; an institution's twin also has to be *authoritative* — versioned, owned, moved through an explicit lifecycle — because part of what it mirrors is decisions. This is the [governed world model](/insights/the-governed-world-model/) argument, applied to twins: standing cannot be sensed, it must be conferred.
- **Operable** — the point of the pattern, preserved: simulate a change before committing it, evaluate compliance continuously against the twin, generate deliverables from it. What is digitalized becomes operable.

[ITIP](/solutions/itip) is this construction for the IT landscape — the twin, its sourcing bench, and the governed model underneath, in one platform.

## Why IT first

There is a practical reason to start the organizational twin in IT rather than anywhere else: it is the one domain where the twin can be **sourced rather than authored**. Machine-readable evidence is densest there — code, contracts, bills of materials, deployment manifests — so the drift problem that stalled hand-built twins is answerable from day one. From that anchored core, the twin grows outward domain by domain, each adding its vocabulary to the same governed model — the same patient sequence by which [the autonomous enterprise](/insights/the-autonomous-enterprise/) becomes buildable at all.

The digital twin gave industry its most reliable way to act on complex systems without breaking them. Give the pattern a sourced, typed, governed substrate, and it can finally reach the most complex system an enterprise operates: itself — starting with the landscape that runs it.

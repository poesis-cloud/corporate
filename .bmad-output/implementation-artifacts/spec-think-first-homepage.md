---
title: 'Reframe the homepage around the THINK bottleneck'
type: 'feature'
created: '2026-09-11'
status: 'done'
baseline_commit: '58a42fdbc1dbe2d0777df21ef07033c4ce2698ef'
context:
  - '{project-root}/../strategy/Website Poesis.cloud Commercial adjustment 10092026.md'
  - '{project-root}/../strategy/roadmap.md'
  - '{project-root}/../strategy/seo.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The homepage opens with Poesis's philosophical vocabulary and portfolio structure, forcing new visitors to infer the business problem. The historical bottleneck is THINK: organizations cannot build or run reliably when intent, architecture, policy, and constraints remain ambiguous; generative AI worsens this by accelerating probabilistic BUILD without resolving the upstream ambiguity.

**Approach:** Replace the homepage with a problem-first narrative showing the historical THINK bottleneck, how generative AI amplifies it, and how Poesis uses AI upstream to form governed definitions from which BUILD and RUN can be accelerated, automated, controlled, and traced. Express the causal contrast as one compact two-lane comparison rather than repeating the same flow three times. Reveal products only after the mechanism and outcomes are understood.

## Boundaries & Constraints

**Always:** Keep the homepage in English. Preserve the existing Deep Field identity while making sections lighter, quieter, and easier to scan. Show THINK as an enabler of accelerated or automated BUILD/RUN, not as an isolated layer. Represent human intent and observed reality as inputs to governed definitions. Keep product responsibilities accurate and preserve SAF as the parent of Agentic Harness. Use verifiable shipped proof and truthful maturity labels. Make diagrams semantic, responsive, keyboard-independent, and understandable without animation.

**Ask First:** Navigation restructuring, new routes, changes to secondary pages, new dependencies, or claims that alter the canonical roadmap.

**Never:** Claim deterministic perfection, zero failure, automatic truth, or that AI alone governs. Present Agentic Harness as a fifth platform peer. Present planned ITIP, Operator, SAF Organization, Workspace, or Bridge capabilities as shipped. Use the former philosophical hero above the fold.

</frozen-after-approval>

## Code Map

- `src/pages/index.astro` -- homepage sections, copy, calls to action, proof, and product reveal.
- `src/components/ThinkBottleneckDiagram.astro` -- semantic before/after diagrams for the historical bottleneck and generative-AI amplification.
- `src/styles/global.css` -- shared visual tokens plus homepage-specific diagram, outcome, platform, and responsive styling.
- `src/layouts/BaseLayout.astro` -- homepage title, description, and social metadata defaults.
- `src/data/poesis-portfolio.ts` -- canonical product names, maturity, and feature claims; read-only source of truth.

## Tasks & Acceptance

**Execution:**
- [x] `src/components/ThinkBottleneckDiagram.astro` -- create one accessible two-lane comparison between the amplified THINK bottleneck and the Poesis inversion.
- [x] `src/pages/index.astro` -- replace the current portfolio-first homepage with hero, pain, diagrams, mechanism, outcomes, platform, deployment, proof, pilot, and final vision sections.
- [x] `src/styles/global.css` -- add restrained homepage layouts with stable responsive dimensions, clear flow relationships, and reduced-motion support.
- [x] `src/layouts/BaseLayout.astro` -- update homepage metadata to the THINK-first commercial promise while retaining the organization slogan in structured data.

**Acceptance Criteria:**
- Given a first-time visitor sees only the hero and following section, when they scan the page, then they can identify the THINK bottleneck, its worsening under generative AI, and Poesis's role without knowing GSM, SIE, ITIP, or SAF.
- Given the comparison at desktop or 320px mobile width, when it renders, then both causal lanes remain ordered, legible, and free of overlap or horizontal scrolling.
- Given the platform section, when product responsibilities are read, then GSM defines the model, SIE manages and executes definitions, ITIP is the IT organizational twin and human surface, and SAF organizes governed agentic work with Agentic Harness nested beneath it.
- Given the proof section, when release claims are checked against the roadmap, then only Agentic Harness, Definition Manager, and Definition Blackboard Manager are labeled shipped at 1.0.
- Given a visitor chooses the primary commercial action, when they activate Run a Pilot, then they reach the existing contact route with demo CTA tracking.

## Design Notes

The causal story is the visual anchor: historically, ambiguous THINK throttles BUILD and RUN; generative AI widens BUILD throughput but creates a larger review, rework, and governance burden because THINK remains ambiguous. One comparison presents this as two parallel lanes: the amplified bottleneck without governed THINK, then the Poesis path from intent and observed reality through governed definitions to bounded BUILD and RUN. Use HTML/CSS flows with real text rather than SVG decoration so the argument remains accessible and responsive.

## Verification

**Commands:**
- `npm run build` -- expected: Astro and Pagefind complete successfully with no route or type errors.

**Manual checks:**
- Inspect the homepage at 320px, 768px, 1024px, and 1440px for overlap, clipping, hierarchy, and coherent diagram flow.
- Verify the first two viewport heights communicate problem, amplification, and solution before exposing product taxonomy.
- Verify all CTA destinations and maturity claims against the existing route map and roadmap.
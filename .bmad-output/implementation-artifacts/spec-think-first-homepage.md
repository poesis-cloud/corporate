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

**Problem:** The homepage opens with Poesis's philosophical vocabulary and portfolio structure, forcing new visitors to infer the business problem. THINK should constrain BUILD and RUN through purpose, rules, and limits; the historical bottleneck is how organizations perform THINK: critical intent and judgment remain implicit, so people must repeatedly explain, align, review, and correct downstream work. Generative AI makes that human articulation bottleneck unacceptable by producing faster than implicit understanding can be reconstructed.

**Approach:** Replace the homepage with a problem-first narrative expressed consistently through THINK, BUILD, and RUN. Use one synthetic three-phase graphic: historically, THINK constrained BUILD and RUN through an implicit manual process; AI applied only to BUILD and RUN makes that capacity gap unacceptable and displaces THINK into prompts, reviews, corrections, and harnesses inside BUILD; Poesis applies human and AI capacity upstream to governed THINK so BUILD and RUN share reusable, machine-operable definitions. Connect the inversion to resource economy and AI governance by design. Schematize the longer horizon as Poesis scanning organizational DNA to generate an executable organizational twin, with Organization as a Service and Product as a Service as human-interface views of that same model, putting governed productive capacity directly in people's hands. Reveal the complete portfolio only after the mechanism and outcomes are understood, using an interactive solutions → products → features map with concise commercial excerpts.

## Boundaries & Constraints

**Always:** Keep the homepage in English. Preserve the existing Deep Field identity while making sections lighter, quieter, and easier to scan. Show THINK as an enabler of accelerated or automated BUILD/RUN, not as an isolated layer. Represent human intent and observed reality as inputs to governed definitions. Keep humans as the governors of what becomes authoritative; scale the reach and reuse of their decisions rather than implying that Poesis replaces them. Keep product responsibilities accurate and preserve SAF as the parent of Agentic Harness. Use verifiable shipped proof and truthful maturity labels. Make diagrams semantic, responsive, keyboard-independent, and understandable without animation.

**Ask First:** Navigation restructuring, new routes, changes to secondary pages, new dependencies, or claims that alter the canonical roadmap.

**Never:** Claim deterministic perfection, zero failure, automatic truth, or that AI alone governs. Present Agentic Harness as a fifth platform peer. Present planned ITIP, Operator, SAF Organization, Workspace, or Bridge capabilities as shipped. Use the former philosophical hero above the fold.

</frozen-after-approval>

## Code Map

- `src/pages/index.astro` -- homepage sections, copy, calls to action, proof, and product reveal.
- `src/components/ThinkBottleneckDiagram.astro` -- semantic three-phase graphic for the historical bottleneck, downstream AI amplification, and the Poesis inversion.
- `src/components/OrganizationTwinDiagram.astro` -- executable organizational twin loop from sourced DNA through OaaS/ProdaaS human interfaces and back through RUN evidence.
- `src/components/ArchMap.astro` -- interactive portfolio map rendering solution and product excerpts with expandable feature detail.
- `src/styles/global.css` -- shared visual tokens plus homepage-specific diagram, outcome, platform, and responsive styling.
- `src/layouts/BaseLayout.astro` -- homepage title, description, and social metadata defaults.
- `src/data/poesis-portfolio.ts` -- canonical product names, concise excerpts, maturity, and feature claims.

## Tasks & Acceptance

**Execution:**

- [x] `src/components/ThinkBottleneckDiagram.astro` -- create one accessible three-phase explanation linking the historical THINK bottleneck, AI in BUILD/RUN, and AI-assisted governed THINK.
- [x] `src/components/OrganizationTwinDiagram.astro` -- schematize the executable organizational twin, its human-facing service views, and the governed realization/evidence loop.
- [x] `src/pages/index.astro` -- replace the current portfolio-first homepage with hero, unified THINK-BUILD-RUN inversion, mechanism, outcomes, platform, deployment, proof, pilot, and final vision sections.
- [x] `src/components/ArchMap.astro` -- restore the interactive portfolio reveal and render concise excerpts instead of long taglines.
- [x] `src/data/poesis-portfolio.ts` -- require and populate a commercial excerpt for every solution and product.
- [x] `src/styles/global.css` -- add restrained homepage layouts with stable responsive dimensions, clear flow relationships, and reduced-motion support.
- [x] `src/layouts/BaseLayout.astro` -- update homepage metadata to the THINK-first commercial promise while retaining the organization slogan in structured data.

**Acceptance Criteria:**

- Given a first-time visitor sees only the hero and following section, when they scan the page, then they can identify the THINK bottleneck, its worsening under generative AI, and Poesis's role without knowing GSM, SIE, ITIP, or SAF.
- Given a visitor reads the unified graphic, when they follow its three phases, then they understand that THINK historically constrained BUILD/RUN, downstream AI makes the gap unacceptable, and Poesis makes the gap tractable by applying people and AI to governed THINK.
- Given a visitor interprets the historical phase, when they assess the constraint, then they understand that THINK constraining BUILD and RUN is necessary and the problem is its implicit, manual, repeated implementation.
- Given a visitor reads the AI-in-BUILD/RUN phase, when they interpret harnessing, then they understand prompts, reviews, corrections, and controls as displaced THINK inside BUILD rather than the resolution of the THINK bottleneck.
- Given a visitor reads the Poesis phase, when they interpret the human role, then they understand that people retain purpose and authority while AI increases THINK capacity.
- Given a visitor follows the consequence rail, when they scan beyond immediate throughput, then they see resource economy and AI governance by design alongside the executable twin, OaaS, and ProdaaS as three views of one compounding model.
- Given a visitor reaches the digital twin vision, when they follow the graphic, then they understand that Poesis sources organizational DNA into an executable organizational twin; OaaS and ProdaaS are human-interface views of the same model; governed BUILD/RUN realizes it; RUN evidence returns to THINK; and the compounding horizon is a human-governed autonomous enterprise.
- Given the graphic at desktop or 320px mobile width, when it renders, then all three phases remain ordered, legible, and free of overlap or horizontal scrolling.
- Given the platform section, when product responsibilities are read, then GSM defines the model, SIE manages and executes definitions, ITIP is the IT organizational twin and human surface, and SAF organizes governed agentic work with Agentic Harness nested beneath it.
- Given the interactive portfolio map loads, when a visitor scans or expands it, then all four solutions and twelve products use concise excerpts while feature groups, versions, and detail links remain available.
- Given the proof section, when release claims are checked against the roadmap, then only Agentic Harness, Definition Manager, and Definition Blackboard Manager are labeled shipped at 1.0.
- Given a visitor chooses the primary commercial action, when they activate Run a Pilot, then they reach the existing contact route with demo CTA tracking.

## Design Notes

The causal story is the visual anchor: THINK has always constrained BUILD and RUN because critical intent and judgment remained implicit and human-held. AI applied only to BUILD and RUN expands their capacity while human harnessing reintroduces THINK late inside BUILD. The Poesis inversion applies human and AI capacity upstream to governed THINK, reducing repeated effort while making governance intrinsic to AI-enabled BUILD and RUN. Use HTML/CSS flows with real text rather than SVG decoration so the argument remains accessible and responsive.

## Verification

**Commands:**

- `npm run build` -- expected: Astro and Pagefind complete successfully with no route or type errors.

**Manual checks:**

- Inspect the homepage at 320px, 768px, 1024px, and 1440px for overlap, clipping, hierarchy, and coherent diagram flow.
- Verify the first two viewport heights communicate problem, amplification, and solution before exposing product taxonomy.
- Verify all CTA destinations and maturity claims against the existing route map and roadmap.

## Suggested Review Order

### Commercial Thesis

- The hero positions governed THINK as the prerequisite for accelerating BUILD and RUN.
  [`index.astro:24`](../../src/pages/index.astro#L24)

- The unified section shows the historical bottleneck, downstream AI mismatch, and Poesis inversion as one visual progression.
  [`index.astro:38`](../../src/pages/index.astro#L38)

- The three-phase graphic names harnessing as displaced THINK and carries the consequences through the executable twin, OaaS, and ProdaaS.
  [`ThinkBottleneckDiagram.astro:1`](../../src/components/ThinkBottleneckDiagram.astro#L1)

### Interactive Portfolio

- The restored hierarchy exposes solutions, products, versions, and expandable feature groups.
  [`ArchMap.astro:1`](../../src/components/ArchMap.astro#L1)

- Required excerpts keep map copy concise without weakening detail-page descriptions.
  [`poesis-portfolio.ts:48`](../../src/data/poesis-portfolio.ts#L48)

- The map replaces duplicate platform cards and restores the shared portfolio anchor.
  [`index.astro:93`](../../src/pages/index.astro#L93)

### Discovery Metadata

- Homepage metadata carries the longstanding-problem framing beyond the visible page.
  [`BaseLayout.astro:29`](../../src/layouts/BaseLayout.astro#L29)

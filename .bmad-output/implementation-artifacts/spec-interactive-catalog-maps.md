---
title: 'Interactive platform and usage maps on catalog index'
type: 'feature'
created: '2026-09-17'
status: 'done'
baseline_commit: 'd977d3038dd192b0b8c73b71d6db91cf23d4effa'
context: []
---

<!-- markdownlint-disable-next-line MD033 -- Required workflow intent-lock marker. -->
<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The catalog index reduces Platform and Usage to explanatory cards, forcing visitors to leave the page before they can understand either structure. Platform already has a richer interactive map on the homepage, while Usage lacks an equivalent overview.

**Approach:** Reuse the authoritative homepage `ArchMap` unchanged in the Platform catalog section. Introduce a parallel Usage map that presents actors, pains, use cases and values as connected peer lanes with closed native disclosures, canonical item links, delivery state where meaningful and direct links to each complete catalog inventory.

## Boundaries & Constraints

**Always:** Reuse `ArchMap` rather than fork it. Preserve direct-only usage semantics, stable item order, canonical destinations, delivery-state derivation, keyboard-operable native disclosures and responsive wrapping. Keep all complete inventory catalog routes reachable from their lane headings. Keep Services as the existing compact catalog entry.

**Ask First:** Any need to alter authored platform or usage data, infer relations not already projected by `usage.ts`, truncate inventories, or change public routes.

**Never:** Model actors, pains, use cases or values as containment children of one another; duplicate the homepage platform map implementation; require client JavaScript; remove access to individual catalog inventories; edit externally changed schema or portfolio-test files unless validation proves it necessary.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
| ---------- | --------------- | --------------------------- | ---------------- |
| Platform section | Existing platform graph | Same interactive solution/product/feature map as homepage | Shared component prevents drift |
| Usage overview | Actors, pains, cases and values | Four connected peer lanes with grouped, closed disclosures and complete item lists | Empty groups are omitted |
| Unsupported case | Use case has no direct platform support | Appears under Unregistered with no invented status | Preserve explicit gap |
| Narrow viewport | Mobile catalog | Lanes stack in causal reading order without horizontal overflow | Labels wrap; controls retain stable hit areas |

</frozen-after-approval>

## Code Map

- `src/components/ArchMap.astro` -- existing authoritative Platform map, reused unchanged.
- `src/components/UsageMap.astro` -- new direct Usage overview and canonical navigation.
- `src/pages/catalog.astro` -- replaces Platform and Usage entry grids with maps while retaining Services.
- `src/styles/global.css` -- responsive Usage map visual language aligned with `ArchMap`.
- `scripts/usage.test.mjs` -- built-page structure, semantics, links and closed-state regressions.

## Tasks & Acceptance

**Execution:**

- [x] `src/components/UsageMap.astro` -- derive and render grouped actor, pain, use-case and value lanes from current canonical data.
- [x] `src/pages/catalog.astro` -- embed shared Platform and Usage maps and simplify index-only entry metadata.
- [x] `src/styles/global.css` -- implement connected desktop lanes and stacked mobile flow using existing map tokens.
- [x] `scripts/usage.test.mjs` -- verify map reuse, complete inventory counts, canonical links, unsupported cases and native closed disclosures.

**Acceptance Criteria:**

- Given `/catalog`, when Platform renders, then it contains the same shared architecture map structure and destinations as the homepage.
- Given `/catalog`, when Usage renders, then actors, pains, use cases and values are distinct peer lanes connected in reading order, not nested ownership.
- Given a user expands any Usage group, when scanning items, then each item is complete, directly linked and carries only meaningful minimal metadata.
- Given a mobile viewport, when both maps render, then their content stacks without horizontal page overflow.

## Spec Change Log

- 2026-09-17: Adversarial review exposed inaccessible connector semantics and a non-landmark map wrapper. Added a labeled region, exposed flow labels to assistive technology and disabled the new chevron transition under reduced motion. KEEP the peer-lane model and native closed disclosures.
- 2026-09-17: Review found grouping-aware tests could mask omitted records and assumed an Unregistered group would always exist. Added independent exact-membership assertions and conditional empty-group handling. KEEP delivery-state grouping and complete inventories.
- 2026-09-17: Restored singular/plural Services grammar. Rejected proposed mixed-support and unknown-state handling because `validateUsage` already excludes those states; rejected `ArchMap` structural findings as pre-existing shared-component concerns outside this change.

## Design Notes

Usage is a relationship flow, not a tree. The four lanes communicate the reading sequence “actors experience pains and pursue use cases; use cases address pains and realize values” while grouping only within each record type: actors by human/system kind, cases by derived delivery state, and values by editorial ownership scope. This preserves ontology while keeping 68 cases and 65 values initially compact.

## Verification

**Commands:**

- `npx tsc --noEmit` -- all map consumers type-check.
- `npm run test:usage` -- source-level usage invariants pass.
- `npm run build` -- production catalog builds.
- `CHECK_WORKSPACE_PORTFOLIO=1 CHECK_BUILT_USAGE=1 npm run test:usage` -- built map regressions and full usage checks pass.
- `git diff --check` -- no whitespace defects.

**Manual checks:**

- In Edge at desktop and 390 x 844, expand representative groups in both maps; verify ordering, links, keyboard semantics and absence of horizontal overflow.

## Implementation Evidence

- `/catalog` renders the same `ArchMap` component used by the homepage; built assertions prove matching scope count and destinations.
- Usage renders four peer lanes in semantic order: Actor types, Pain points, Use cases and Values. Inventory groups are closed by default and links remain canonical.
- Unsupported use cases remain in an explicit Unregistered group with no invented platform status.
- Edge desktop showed four aligned lanes with no overflow. Edge at 390 x 844 showed ordered stacked lanes, wrapped labels and no page or map overflow.
- The live Usage map is an accessible region and its relationship connectors are exposed to assistive technology.
- `npx tsc --noEmit`: passed.
- `npm run test:portfolio`: 15 passed, 0 failed, 8 opt-in checks skipped.
- `npm run build`: passed; 131 pages built. Existing Pagefind notices remain limited to redirect pages without outer HTML.
- `CHECK_WORKSPACE_PORTFOLIO=1 CHECK_BUILT_USAGE=1 npm run test:usage`: 27 passed, 0 failed, 0 skipped.
- Source diagnostics passed. No protected schema or portfolio-test file was modified by this feature.

## Suggested Review Order

### Catalog Composition

- Start where [both authoritative maps replace the former explanatory card grids](../../src/pages/catalog.astro#L32).

- Confirm [Platform delegates to the exact homepage map component](../../src/pages/catalog.astro#L39).

- Follow the [new Usage map integration and section framing](../../src/pages/catalog.astro#L43).

### Usage Structure

- Review [grouping as presentation over canonical peer ledgers, never ownership](../../src/components/UsageMap.astro#L21).

- Inspect [accessible flow semantics and complete inventory lanes](../../src/components/UsageMap.astro#L49).

- Verify [status-grouped cases preserve unsupported gaps explicitly](../../src/components/UsageMap.astro#L96).

### Responsive Interaction

- Review [desktop lane geometry, disclosure controls and compact item rows](../../src/styles/global.css#L1810).

- Check the [breakpoint converting the relationship flow into stacked reading order](../../src/styles/global.css#L1985).

### Regression Coverage

- Finish with [shared-map parity, complete membership and canonical-link assertions](../../scripts/usage.test.mjs#L620).

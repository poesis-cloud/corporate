---
title: 'Exclusive use-case typing and mobile catalog presentation'
type: 'refactor'
created: '2026-09-17'
status: 'done'
baseline_commit: '834f034eaea05e806e6ac67b8e288c2b04317565'
context: []
---

<!-- markdownlint-disable-next-line MD033 -- Required workflow intent-lock marker. -->
<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The homepage split hero overlaps its title on mobile, relation groups run together in catalog card footers, and the usage actor picker has a redundant visible label. More fundamentally, platform items currently own duplicated use-case backlinks at feature, capability and affordance levels, so a use case is not typed by one direct platform level.

**Approach:** Correct the responsive hero order and presentation details, then invert platform usage ownership: each supported use case owns one nonempty list among `features`, `capabilities` or `affordances`; unsupported use cases own none and remain explicit gaps. Migrate existing support to the most specific authored level available: feature before capability before affordance.

## Boundaries & Constraints

**Always:** Preserve all public slugs, routes, prose, values, pains, actors and delivery evidence. A supported case must have exactly one nonempty platform-reference property; all references must resolve. Derive platform-card inverse use-case relations from use-case ownership. Keep the 16 currently unsupported cases untyped with no registered status. On mobile, render the former right hero pane after the lead content and immediately before the CTA. Keep “Who is it for” as the accessible name of the actor picker.

**Ask First:** Any case whose most-specific existing relation cannot preserve its current status or catalog discoverability; any need to invent a platform relation for an unsupported case; any public route or identity change.

**Never:** Retain `useCases` backlinks on features, capabilities or affordances; infer additional case types through platform ancestry; allow more than one of `features`, `capabilities` or `affordances` on a use case; hide unsupported cases; commit or push.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
| ---------- | --------------- | --------------------------- | ---------------- |
| Feature-typed case | Existing feature, capability and affordance backlinks | Case owns only the matching feature reference; inverse capability/affordance support is not fabricated | Reject unknown, duplicate or mixed-level references |
| Capability-only case | Existing capability and affordance backlinks | Case owns only the capability reference | Reject mixed-level references |
| Unsupported case | No existing platform backlink | No type property; status remains unregistered | Do not manufacture planned support |
| Mobile hero | Viewport at or below 960px | Promise follows lead copy and precedes CTA without title overlap | Responsive regression test and browser check |
| Card relations | Multiple relation groups | Each qualifier/relation group begins on a new line; links within a group remain readable | Built HTML preserves ordered links |
| Actor picker | Homepage usage section | “Who is it for” visually and accessibly labels the select; “Actor type” is absent | Accessible-name assertion |

</frozen-after-approval>

## Code Map

- `src/data/catalog/poesis-usage.json` and `src/data/catalog/schemas/poesis-usage.schema.json` -- authored exclusive use-case references and schema contract.
- `src/data/catalog/poesis-platform.json`, `src/data/poesis-platform.ts` -- remove platform-side use-case backlinks while preserving structural relations and delivery evidence.
- `src/data/usage.ts`, `src/data/catalog.ts`, `src/data/pilot-catalog.ts` -- resolve owned case types and derive inverse card, status, filter and pilot projections.
- `src/pages/usage/[slug].astro` -- render the one direct platform support level.
- `src/pages/index.astro`, `src/styles/global.css` -- mobile hero order and actor-picker accessible labeling.
- `src/components/ItemRelations.astro` -- line-separated relation groups.
- `scripts/usage.test.mjs`, `scripts/portfolio-claims.test.mjs` -- ownership, exclusivity, status, rendered HTML and responsive regressions.

## Tasks & Acceptance

**Execution:**

- [x] Migrate authored data and schemas to optional, mutually exclusive use-case platform references; remove platform backlinks.
- [x] Rewrite usage resolution and all inverse consumers around use-case ownership while preserving statuses and gaps.
- [x] Correct mobile hero grid placement, relation-group wrapping and actor-picker labeling.
- [x] Update focused and built-output regressions; build and inspect desktop/mobile rendering in Edge.

**Acceptance Criteria:**

- Given a supported use case, when validating data, then exactly one of `features`, `capabilities` or `affordances` is present and nonempty, and every reference resolves.
- Given an unsupported use case, when rendered or exported, then it remains visible with no registered platform support.
- Given a platform item card, when relations are derived, then its use cases are the inverse of direct case-owned references only.
- Given a mobile homepage, when the hero stacks, then the promise is below the lead content, above the CTA and never overlaps the title.
- Given any catalog card with multiple relation groups, when rendered, then each qualifier starts a separate footer line.
- Given the homepage actor picker, when read visually or by assistive technology, then “Who is it for” is its label and “Actor type” is not shown.

## Design Notes

The existing graph contains 68 cases: 51 currently appear at feature, capability and affordance levels; one appears at capability and affordance levels; 16 have no support. Those upper-level links are inherited duplicates. Migrating to the most-specific existing direct relation preserves the supported cases without converting unsupported work into platform commitments.

## Verification

**Commands:**

- `npx tsc --noEmit` -- no type errors.
- `npm run test:portfolio` -- platform invariants remain green.
- `npm run build` -- production site builds.
- `CHECK_WORKSPACE_PORTFOLIO=1 CHECK_BUILT_USAGE=1 npm run test:usage` -- exclusive typing, direct inverse relations and rendered output pass.

**Manual checks:**

- Open the local production preview in Edge; inspect the homepage at desktop and mobile widths for hero order, actor-picker labeling and line-separated card relation groups.

## Spec Change Log

- 2026-09-17: Review removed runtime-mutated platform backlinks in favor of pure inverse lookup, added fail-fast handling for noncanonical item instances, and added negative exclusivity plus mobile-order regression coverage. KEEP the authored case ownership, 16 unsupported gaps, direct-only card relations and requested UI presentation.
- 2026-09-17: The owner accepted capability typing for `qualify-processor-interchange`; its status is now Implemented under the approved most-specific rule, producing 11 Implemented and 18 Partial use cases.

## Implementation Evidence

- Migrated 52 supported use cases to one direct level: 51 feature-typed and one capability-typed. Sixteen unsupported cases remain untyped gaps.
- Removed `useCases` from authored schemas, platform JSON, platform entity types and runtime objects. Platform cards and filters use pure inverse case lookup.
- At 390 x 844 in Edge, the hero promise starts below both leads, ends before the CTA, clears the title and causes no horizontal overflow.
- A five-relation capability card renders five block rows with distinct vertical positions and no horizontal overflow.
- `npx tsc --noEmit`: passed.
- `npm run test:portfolio`: 15 passed, 0 failed, 8 opt-in checks skipped.
- `npm run build`: passed; 131 pages built. Existing Pagefind notices remain limited to redirect pages without outer HTML.
- `CHECK_WORKSPACE_PORTFOLIO=1 CHECK_BUILT_USAGE=1 npm run test:usage`: 26 passed, 0 failed, 0 skipped.
- Production preview is open in Edge at <http://localhost:4333/>. No commit or push was performed.

## Suggested Review Order

### Ownership And Validation

- Start with the [exclusive type resolver and status semantics](../../src/data/usage.ts#L51).

- Follow [pure inverse lookup from platform items to case ownership](../../src/data/usage.ts#L139).

- Check [runtime rejection of empty, unknown, duplicate and mixed support](../../src/data/usage.ts#L236).

- Confirm [schema-level exclusivity permits one direct type or an unsupported gap](../../src/data/catalog/schemas/poesis-usage.schema.json#L73).

### Presentation

- Review the [accessible “Who is it for” select labeling](../../src/pages/index.astro#L86).

- Verify [mobile hero row order places promise immediately before CTA](../../src/styles/global.css#L3274).

- Inspect [one block per qualified relation group](../../src/components/ItemRelations.astro#L17).

- Check the [corresponding stacked-footer styling](../../src/styles/global.css#L2911).

### Regression Coverage

- Review [ownership, inverse resolution and unsupported-gap assertions](../../scripts/usage.test.mjs#L157).

- Review [negative support-reference validation paths](../../scripts/usage.test.mjs#L387).

- Finish with [built-page and accessibility assertions](../../scripts/usage.test.mjs#L657).

---
title: 'Use-case-composed values and contextual catalog navigation'
type: 'refactor'
created: '2026-09-16'
status: 'done'
baseline_commit: 'c2dc9c455eb4dc3acca9d4482b3fd7fd8cf339bd'
context: []
---

```text
<frozen-after-approval reason="User approved the chat plan and added homepage simplification">
```

## Intent

**Problem:** Platform items independently declare pains, values and use cases, creating redundant ownership and oversized relation footers. Values currently exist without constituent use cases. The homepage embeds long lists of domain pains beneath six main pain statements and assigns an editorial phase to domain records.

**Approach:** Make use cases the sole usage-side reference of affordances, capabilities and features. Values explicitly compose nonempty sets of use cases. Pains remain independent; use cases explicitly identify pains they address. Replace enumerated relations in platform cards with one source-parameterized catalog link per related entity type. Keep only the six existing main homepage pain statements, linked to their respective grouped pain catalog results; remove phase from pain records.

## Boundaries & Constraints

**Always:** Preserve public record slugs, value aliases and public destinations where practical. Keep existing platform-to-platform relationships and delivery evidence. Derive platform pain/value relationships through explicit use cases. Preserve unsupported pains and use cases. A partially supported composite is not fully delivered. Reuse Astro components, catalog pages, existing styling and Node 22 tests. Preserve homepage main-bullet wording and section headings; editorial grouping belongs to the homepage, not pain metadata.

**Ask First:** New conceptual entity types, removing catalog records, changing public identities, or changing the meaning of existing use cases beyond their explicit pain associations.

**Never:** Infer semantic relationships merely from common actors or form a blanket cross-product from old platform references. Treat pain occurrence as proof of remediation. Require equal counts of pains, use cases and values. Claim delivery from missing evidence. Commit, push, or touch archives.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
| ---------- | --------------- | --------------------------- | ---------------- |
| Platform navigation | Capability card with many related records | One catalog link per nonempty relation type, filtered by typed source identity | Unknown source produces an explicit empty/invalid state, not all results |
| Shared membership | Two use cases share one pain or value | Results are deduplicated without altering record ownership | Reject duplicate stored references |
| Composite coverage | A value has multiple cases, some unsupported | No fully implemented claim; coverage gaps remain visible | Reject empty or unknown constituent references |
| Independent pain | Pain has no addressing use case | Pain remains in the catalog, without invented support | Empty related-case state |
| URL navigation | Reload, back/forward, existing actor/pain filters, clear | Matching results and counts stay consistent with URL | Validate canonical filter identities |
| Homepage group | Click one of the six main pain bullets | Pain catalog shows exactly that bullet's existing children | Validate group references independently of platform support |

```text
</frozen-after-approval>
```

## Code Map

- `src/data/usage.ts`: use-case contract, reverse lookup, support status, relations and validation.
- `src/data/usage-values.ts`: stable value identities and explicit constituent use-case membership.
- `src/data/usage-pains.ts`, `src/data/pains.ts`: independent pain records and derived platform projections; remove phase.
- `src/data/poesis-platform.ts`: platform constructors, usage references and platform relationships.
- `src/components/ItemRelations.astro`, `CatalogDirectory.astro`, `SolutionCapabilityCards.astro`, `ThinkTherapyDiagram.astro`: shared relation navigation and card callers.
- `src/components/ThinkBottleneckDiagram.astro`: six existing editorial pain groups and nested homepage lists.
- `src/layouts/CatalogLayout.astro`, `src/pages/{usage,values,pains,affordances,capabilities,features}`: shared catalog filtering and source context.
- `src/pages/solutions/[solution]/products/[product].astro`: product feature cards.
- `src/data/pilot-catalog.ts`, `pilot.ts`: existing consumers of usage relationships and coverage.
- `scripts/usage.test.mjs`, `scripts/portfolio-claims.test.mjs`: focused regression gates.
- `src/data/catalog.ts`, `src/data/catalog-query.ts`: shared typed source graph, canonical links and pure query filtering.
- `src/components/ValueComposition.astro`, `PlatformValues.astro`, `SolutionValueCards.astro`, `UsageCases.astro`: constituent coverage and consistent catalog identities.

## Tasks & Acceptance

**Execution:**

- [x] Migrate data contracts and curate explicit value/use-case and use-case/pain associations; remove platform pain/value storage.
- [x] Update relationship projections, semantic edges, independent pain views, status aggregation and validation.
- [x] Implement shared source-aware catalog filtering, compact card links and active-filter controls; update all relevant card callers.
- [x] Remove phase and nested homepage pain lists; link existing main bullets to their exact explicit pain groups.
- [x] Update pilot and other affected consumers without broad unrelated rewrites; retain stable routes and aliases.
- [x] Update focused tests and run usage/portfolio/build gates, including built-HTML regressions.
- [x] Parent review: check browser behavior across desktop/mobile, actual clear/reload/back navigation and responsive fit.

**Acceptance Criteria:**

- Given a platform item, when inspecting its usage declarations, then it contains use-case references only; displayed pains and values derive through those cases.
- Given any value, when validating, then it has at least one existing constituent use case; given an unsupported pain, it remains a valid independent record.
- Given a platform card, when rendered, then individual relationship names no longer expand its footer; each relation type navigates to matching catalog results scoped by that specific item.
- Given the homepage, when rendered, then the two problem boxes retain their existing main bullets as links and display no nested pain lists; pain records contain no phase attribute.
- Given a composed value with incomplete use-case support, when summarized, then partial coverage does not masquerade as complete implementation.

## Spec Change Log

- 2026-09-16: Recorded the approved chat plan with the user's homepage addition before implementation; no source changes had been made.

## Design Notes

Use a typed canonical source, for example `capability:itip/automatic-it-truth-sourcing`, serialized with URLSearchParams as `source` on the target catalog URL. Query parameters must operate client-side because Astro generates static pages. Keep filters and counts accessible, preserve existing actor/pain selection behavior, and avoid prototype-key lookup hazards. Homepage groups may have stable local group identities; these describe editorial selections rather than pain phases. Curate memberships from actual goals and benefit descriptions; old platform mappings are clues, not automatic truth.

## Verification

- `npm run test:usage`: new graph invariants, source filtering, independent pains, composite coverage, homepage simplification and pilot behavior pass.
- `npm run test:portfolio`: existing platform ownership and delivery claims remain coherent.
- `npm run build`: static rendering, references and Pagefind indexing succeed.
- Browser: use the running localhost:4331 server if healthy; verify real footer navigation, source clear/reset, reload/back navigation, homepage group selection, and responsive fit at desktop and mobile sizes. Report any unavailable validation explicitly.

## Implementation Evidence

- Implemented sequentially without delegates, commits, remote operations or additional workflow artifacts. Status remains `in-progress` for parent-owned review/browser verification.
- Preserved 84 values, 68 use cases, 32 independent pains, 67 features, 25 capabilities and 6 affordances. The 16 unsupported use cases remain unsupported; composing values do not manufacture platform delivery.
- Curated memberships from goals and benefit descriptions, not legacy cross-products. `occursIn` remains occurrence-only: for example, reusable governance selection does not itself remediate assumed obligation applicability. Sourcing privacy composes collection boundaries, disclosure-aware model-route qualification and evidence preservation. Stewardship composes model review and proposed grammar evolution, without claiming consortium endorsement.
- Value prefixes retain editorial placement and legacy anchors, not exclusive support ownership. Value cards now show constituent coverage; missing support cannot result in an Implemented composite badge. Pilot exports disclose constituent support as well.
- Shared source resolution covers all six catalogs and both usage/platform footer relations. Unknown, duplicate and prototype-key sources yield no matches. Actor/pain filters intersect source selection; URL updates use history entries and restoration handles `popstate`.
- Homepage groups preserve exactly the six approved child sets; independent ungrouped pains remain valid. The six main links replace all nested homepage pain lists.
- `npm run build`: PASS; 126 pages built and indexed. Pagefind retains the existing notice that the insight redirect page lacks an outer HTML element and is not indexed.
- `CHECK_BUILT_USAGE=1 npm run test:usage`: PASS; 25 passed, 0 failed, 1 opt-in workspace SEO check skipped. Includes serialized source payloads, every platform footer on catalog/owner pages, canonical destinations, aliases, constituent status and pilot regressions.
- `CHECK_BUILT_PORTFOLIO=1 npm run test:portfolio`: PASS; 19 passed, 0 failed, 4 opt-in workspace checks skipped. Built claims, status icons, platform relationships, routes and legacy anchors verified.
- Fresh strict TypeScript program for all changed data modules: PASS, 0 diagnostics. Astro template compilation and `git diff --check`: PASS. Editor test discovery was unavailable, so Node executed the repository test files directly.
- Remaining review: actual browser interaction and desktop/mobile fit are deliberately unverified by this implementation pass. Review the curated privacy/stewardship memberships as scoped contributions, not proof of whole-benefit delivery or external endorsement. No implementation/build/test blocker remains.

## Final Review Evidence

- Three independent reviewers completed blind, edge-case and acceptance review. The only actionable finding was removed legacy homepage pain anchors; restored as empty anchors inside the main links, covered by built-HTML regression checks.
- Browser screenshots exposed extra grid children from the initial compatibility fix. Nesting the anchors inside each link restored the two-column bullet layout; all six links now occupy 468px at 1440px viewport and 290px at 390px viewport, with no horizontal overflow.
- Production preview runs at <http://localhost:4332/>. The existing development server at port 4331 had Vite WebSocket and Pagefind loading issues, so final acceptance used the built preview.
- Real capability footer navigation selected three pains; its use-case filter selected four of 68 cases. Clear selected all 68, browser Back restored four, and reload retained four. Unknown source selected zero pains with an explicit invalid-filter message.
- Mobile homepage main-bullet navigation selected exactly its eight grouped pains. Both boxes retain three main links each and no nested pain lists. Legacy `/#it-truth-drift` resolves to one retained anchor.
- Final build and built usage tests passed after the compatibility/layout fix: 25 passed, one opt-in workspace check skipped. Portfolio gate already passed: 19 passed, four opt-in workspace checks skipped. No commits or remote operations performed.

## Suggested Review Order

- Start with explicit use-case ownership and derived composition: [usage.ts:21](../../src/data/usage.ts#L21).
- Inspect constituent membership while preserving stable value identities: [usage-values.ts:1](../../src/data/usage-values.ts#L1).
- Follow typed source relationships into catalog filtering: [catalog.ts:1](../../src/data/catalog.ts#L1).
- Check invalid input handling and source-filter intersections: [catalog-query.ts:11](../../src/data/catalog-query.ts#L11).
- Inspect browser URL restoration and clear-filter behavior: [CatalogLayout.astro:45](../../src/layouts/CatalogLayout.astro#L45).
- Review collapsed homepage bullets and retained legacy anchors: [ThinkBottleneckDiagram.astro:36](../../src/components/ThinkBottleneckDiagram.astro#L36).
- Finish with graph, browser-payload and built-page regression coverage: [usage.test.mjs:1](../../scripts/usage.test.mjs#L1).

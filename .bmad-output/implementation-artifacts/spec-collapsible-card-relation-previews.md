---
title: 'Collapsible relation previews on catalog cards'
type: 'feature'
created: '2026-09-17'
status: 'done'
baseline_commit: '834f034eaea05e806e6ac67b8e288c2b04317565'
context: []
---

<!-- markdownlint-disable-next-line MD033 -- Required workflow intent-lock marker. -->
<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Catalog cards currently state which relation types exist but make users open a filtered catalog before they can see the related items. Dense cards need an in-place overview without becoming permanently long or losing their catalog navigation.

**Approach:** Render each direct relation type as a compact native disclosure, visually aligned with the feature lists in the platform map. Its closed summary shows the qualified relation type and item count; opening it reveals minimal linked item rows and a distinct action to open the complete filtered catalog result.

## Boundaries & Constraints

**Always:** Preserve the existing ordered direct-relation grammar, direct-only semantics, canonical item destinations, delivery-status indicators, and source-filtered catalog destinations. Keep disclosures closed by default, keyboard-operable through native semantics, and usable without client JavaScript. Show every directly related item in the expanded list; the filtered catalog action remains available for richer browsing and filtering.

**Ask First:** Any proposal to truncate relation previews, open disclosures by default, infer transitive items, or alter relation qualifiers/order.

**Never:** Nest a link or button inside `<summary>`; use a whole-card click target; hide related items behind hover; recreate relations in the component; replace canonical item links with filtered-catalog links.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
| ---------- | --------------- | --------------------------- | ---------------- |
| Typical relation | One direct relation type with several items | Closed summary shows qualifier, plural type and count; expansion shows compact item links, optional statuses and “View all” filtered action | No client script required |
| Multiple support types | One qualifier reaches features, capabilities or affordances | Each nonempty type gets its own disclosure and count in established type order | Empty types produce no disclosure |
| Single item | Relation type contains one item | Summary uses a count of 1; item remains visible only after expansion | Preserve singular/plural label supplied by model |
| Long labels/mobile | Narrow card or long item name | Rows wrap within the card without horizontal overflow; status stays associated with its item | Do not clip content |

</frozen-after-approval>

## Code Map

- `src/data/usage.ts` -- relation view model for a qualified type, filtered destination and minimal item previews.
- `src/data/catalog.ts` -- resolves direct target slugs into ordered canonical preview records without ancestry inference.
- `src/components/ItemRelations.astro` -- shared native disclosure markup for every card surface.
- `src/styles/global.css` -- compact map-inspired summary, item-row and catalog-action treatment.
- `scripts/usage.test.mjs` -- relation semantics and built HTML/accessibility regressions.

## Tasks & Acceptance

**Execution:**

- [x] `src/data/usage.ts`, `src/data/catalog.ts` -- project each nonempty direct target type into one relation group containing qualifier, type label, filtered catalog href and ordered minimal item records.
- [x] `src/components/ItemRelations.astro`, `src/styles/global.css` -- replace the flat footer with closed native disclosures, compact canonical item rows and a separate filtered “View all” action.
- [x] `scripts/usage.test.mjs` -- prove direct item order, canonical item links, filtered catalog links, native disclosure structure, default closed state and mobile-safe classes.

**Acceptance Criteria:**

- Given a card with direct relations, when first rendered, then each relation type is represented by a closed, keyboard-operable summary showing its qualifier, label and count.
- Given a user expands a relation, when scanning its contents, then all and only directly related items appear as compact canonical links with delivery state where available.
- Given an expanded relation, when the user selects its catalog action, then the corresponding source-filtered catalog page opens.
- Given a card on a narrow viewport, when disclosures are expanded, then labels wrap without card or page horizontal overflow.

## Spec Change Log

- 2026-09-17: Implemented native closed-by-default relation disclosures with complete canonical item previews, delivery states and distinct source-filtered catalog actions.
- 2026-09-17: Edge mobile verification at 390 x 844 confirmed expansion, wrapping and navigation without horizontal overflow; the tested feature action opened `/catalog/features?source=usage%3Aretrieve-decision-basis`.

## Design Notes

The disclosure boundary is the relation type, not the broader qualifier. This keeps mixed platform alternatives ergonomic: “Supported by Features”, “Supported by Capabilities”, and “Supported by Affordances” are independently expandable and each has an unambiguous filtered destination. The summary itself is only a toggle; navigation remains inside the expanded content.

## Verification

**Commands:**

- `npx tsc --noEmit` -- relation model and Astro consumers type-check.
- `npm run build` -- all card surfaces render successfully.
- `CHECK_WORKSPACE_PORTFOLIO=1 CHECK_BUILT_USAGE=1 npm run test:usage` -- relation semantics and built disclosure assertions pass.

**Manual checks:**

- In Edge, expand a dense card on desktop and mobile; verify scanability, keyboard focus, wrapping, canonical item links and the filtered “View all” action.

## Implementation Evidence

- The tested mobile disclosure exposed `GSM Definitions retention` as a canonical item link and `View all Features` as a separate filtered-catalog action.
- The summary contained no nested interactive element, remained keyboard-operable through native `<details>/<summary>`, and reported the direct item count.
- The expanded 333.6 px-wide disclosure had no horizontal overflow at a 390 px viewport.
- Type checking, focused usage tests and the 131-page production build passed.
- Source diagnostics and `git diff --check` passed. No commit or push was performed.

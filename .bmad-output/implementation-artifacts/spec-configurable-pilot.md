---
title: Configurable pilot brief and homepage entry
type: feature
created: 2026-09-16
status: done
baseline_commit: 193233488bdf383711b1b7c40c0aee4d1a37630d
context: []
---

<frozen-after-approval reason="human-owned intent">

## Intent

**Problem:** The homepage pilot section presents three manually authored examples and sends visitors to generic contact. It does not let a prospect assemble an evaluation around registered usage, distinguish implemented support from future scope, or bring a concrete brief to the first conversation.

**Approach:** Add `/pilot` as a lightweight, interactive pilot-brief builder led by registered values and/or pain points, with complementary use cases suggested through existing graph relationships. Replace the homepage pilot block with a concise explanation and invitation to configure a pilot. Visitors tailor their evaluation context and leave with a useful brief for discussion. Assume both ITIP and SIE SaaS in the pilot; keep scope flexible rather than selling fixed packages or prescribing a duration.

## Boundaries & Constraints

**Always:** Reuse existing actors, use cases, goals, pains, values and platform relations. Keep the canonical usage schema unchanged. Derive support and delivery states through existing helpers. Assume an ITIP + SIE SaaS evaluation environment while preserving current feature status and confirming selected scope before kickoff. User-entered evaluation details are private draft content, not additions to the platform catalog. Retain existing site typography, icons, colors and layout conventions. Preserve `#pilot` and CTA tracking attributes.

**Ask First:** New commercial terms, fixed pilot offers, promised availability, additional catalog records, new canonical attributes, external form services, analytics collection or persistent storage of prospect details.

**Never:** Invent products, capabilities, customer results, completion metrics, launch dates or prices. Treat unsupported cases as implemented. Send the brief without an explicit user action. Imply a configured brief books a pilot, provisions SaaS or confirms acceptance. Rewrite unrelated homepage copy or delivery semantics.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
| --- | --- | --- | --- |
| Scope selection | Existing values and/or pains, optional actor, search and use-case selections | Related cases show original names, goals and current support; selections persist across filtering | Clear no-results state with filter reset; never fabricate relationships |
| Partial support | Selected case has partial or planned support | Keep it selectable, show source-derived status and scope needing confirmation in the brief | Never silently promote status |
| No registered support | Selected case has no incoming platform references | Explicitly distinguish unregistered support from planned delivery | No invented platform links or badge |
| Tailoring | Visitor supplies context, target, baseline, evidence, timing and constraints | Live brief combines those details with selected canonical records | Render entered text as text, not HTML |
| Invalid deep link | Unknown or repeated use-case identifiers | Ignore unknown entries and deduplicate valid entries | Page remains usable with an honest empty selection |
| Export | At least one selected value, pain or case | Copy or download a readable brief containing goals, support, limitations and entered details | Clipboard failure leaves download and selectable text available |
| Empty draft | No selected values, pains or cases | Clear empty summary; no misleading ready-to-send state | Export and handoff require a registered selection |
| Disabled JavaScript | Static page | Useful introduction and contact route remain available | No unusable form presented as operational |

</frozen-after-approval>

## Code Map

- `src/pages/index.astro`: owns current `#pilot` block and hero pilot CTA.
- `src/data/usage.ts`: canonical use cases and inverse platform relationship helpers.
- `src/data/usage-actors.ts`: canonical actor names and identities.
- `src/data/poesis-platform.ts`: platform support, links and delivery aggregation.
- `src/pages/contact.astro`: established email handoff destination; no submission backend exists.
- `src/layouts/BaseLayout.astro` and `src/components/Icon.astro`: shared page and visual conventions.
- `scripts/usage.test.mjs`: existing data and built-page regression suite.
- `../strategy/saas-acquisition-and-conversion.md`: advisory evaluation boundaries, not an availability register.

## Tasks & Acceptance

**Execution:**

- [x] `src/pages/pilot.astro` and `src/scripts/pilot.ts`: responsive needs-first picker, optional cases, tailoring and live brief with copy, Markdown download and explicit email handoff.
- [x] `src/data/pilot.ts` and `src/data/pilot-catalog.ts`: pure client helpers and server-side projection over canonical graph; shared public delivery labels without client graph duplication.
- [x] `src/pages/index.astro` and `src/components/Nav.astro`: concise value/pain-led invitation, ITIP + SIE SaaS context and `/pilot` CTAs with existing tracking identity.
- [x] `scripts/usage.test.mjs`: normalization, support fidelity, serialization, empty/partial/unmapped cases, built identity and homepage links.
- [x] `../strategy/saas-acquisition-and-conversion.md`: reviewed; unchanged. User-approved SaaS assumption is recorded here; no new commercial terms or catalog semantics need a strategy rewrite.

**Acceptance Criteria:**

- Given the homepage, when a visitor follows the pilot CTA, then the page starts with values and pains, followed by related use cases and editable evaluation details. Canonical deep links may preselect values, pains or use cases without carrying personal details.
- Given multiple use cases, when selections change, then the brief updates goals and deduplicated supporting items without assigning new usage relationships.
- Given an evaluation draft, when the visitor exports it, then it clearly distinguishes registered support, visitor-proposed criteria and items still to agree, including operating readiness and commercial terms.
- Given completed tailoring fields, when the visitor follows email handoff, then the existing contact destination is used and no success message claims the email was sent. A long brief remains downloadable rather than relying on an oversized mailto URL.
- Given desktop or narrow mobile width, when visitors select, edit or export, then labels, controls and the brief remain readable and keyboard-accessible without horizontal overflow.

## Spec Change Log

- 2026-09-16: User approved implementation with values/pains before or complementary to use cases, a simple explanatory homepage entry, and both ITIP + SIE SaaS assumed. Preserve flexible criteria, evidence, timing and constraints; no new offer data or canonical relationships.
- 2026-09-16: Independent acceptance, blind and edge-case reviews completed. Fixed the existing anchor-only CTA listener to recognize the new email button, preserving consent handling and excluding brief contents from analytics.

## Design Notes

Use the registered goal as the starting outcome, not a claimed customer result. Optional fields cover organizational scope, current baseline, desired observation, evidence, participants, timing, access constraints and exclusions. No fabricated defaults. Summarize unresolved operating readiness, hosting, responsibilities, terms and exit arrangements as points for agreement. Keep entered details in memory only; no account or mandatory contact form is needed to draft a brief. Use explicit controls and visible action feedback. Homepage and pilot page share data, not separate curated offers.

## Verification

**Commands:**

- `npx tsc --noEmit -p tsconfig.json`: no new type errors.
- `npm run build`: static generation and existing data gates pass.
- `CHECK_WORKSPACE_PORTFOLIO=1 CHECK_BUILT_USAGE=1 npm run test:usage`: existing and pilot tests pass.
- `CHECK_BUILT_PORTFOLIO=1 npm run test:portfolio:workspace`: delivery claims remain consistent.
- `git diff --check`: no whitespace errors.

**Browser checks:** Existing local server; desktop and 390px mobile screenshots; filtering, multi-selection, removal, deep links, keyboard navigation, export contents, clipboard fallback, literal handling of markup input, and JavaScript-disabled contact fallback. No email is actually sent during verification.

## Verification Results

- Build, TypeScript and whitespace checks passed. Code diagnostics clean.
- Built/workspace usage: 20 passed. Built standalone portfolio: 19 passed, four workspace-only checks skipped.
- Full workspace portfolio: 22 passed, one failed because `strategy/portfolio-audit/inventory.json` is absent; unrelated historical fixture left unchanged.
- Browser: desktop and 390px mobile, no horizontal overflow; need-led suggestions, canonical query normalization, selection persistence, literal markup handling, keyboard selection/removal and restored focus passed.
- Clipboard-denied fallback passed. Intercepted download Blob contents match the live brief and filename; integrated browser did not expose a native download event, so actual filesystem download completion was not verified.
- Email handoff and CTA event verified without sending email or loading analytics. JavaScript-disabled contact fallback passed.
- Required workflow approval marker retains a Markdown MD033 warning. No suppression added.
- No commit or push: current request authorizes implementation, not publication.

## Suggested Review Order

1. Needs-first interaction and SaaS evaluation framing: [pilot.astro:8](../../src/pages/pilot.astro#L8).
2. Canonical graph projection without new relationships: [pilot-catalog.ts:5](../../src/data/pilot-catalog.ts#L5).
3. Selection and safe brief serialization: [pilot.ts:49](../../src/data/pilot.ts#L49).
4. Browser state, accessible controls and export: [scripts/pilot.ts:1](../../src/scripts/pilot.ts#L1).
5. Homepage entry: [index.astro:177](../../src/pages/index.astro#L177).
6. Consent-preserving CTA tracking: [BaseLayout.astro:139](../../src/layouts/BaseLayout.astro#L139).
7. Pilot regression coverage: [usage.test.mjs:48](../../scripts/usage.test.mjs#L48).

---
title: Integrate the audited portfolio into the corporate site
type: feature
created: 2026-09-15
status: done
baseline_commit: 2dcdda976291f5b87d8d3a3ec9ac17ffbfe2060a
context:
  - ../../../strategy/portfolio-claim-target-model.md
  - ../../../strategy/portfolio-audit/platform-and-rendering.md
  - ../../../strategy/seo.md
---

<!-- markdownlint-disable-next-line MD033 -- Required workflow intent-lock marker. -->
<frozen-after-approval reason="human-owned intent">

## Intent

**Problem:** The existing platform, solution and product pages conflate delivered features with broader capability promises. Their relationships and literal copy do not consistently reflect the completed evidence audit. The user wants to understand the proposed model by viewing it on the actual site, not by reading another standalone diagram.

**Approach:** Integrate the audited claim boundaries and relationships into the existing Astro portfolio graph and its presentations. Preserve implementable promises as explicitly planned alongside delivered functionality. Display partial scope honestly without converting implementation prerequisites into additional commercial products or features. Retain the site's visual language and existing navigation.

## Boundaries & Constraints

**Always:** Treat planned offers as legitimate. Apply the target model's scoped alternatives: direct authoring need not require sourcing, local delivery need not require SaaS, and supplied-instance evaluation need not require deployed observations. Preserve product/solution/feature identities, existing URLs and historical release facts. Distinguish claim delivery from release metadata and expected benefits from measured outcomes. Preserve current user edits.

**Ask First:** Adding a commercial product or feature beyond the approved inventory; removing a feasible promise; inventing dates, numerical benefit claims or a SaaS availability commitment; publishing, committing or pushing.

**Never:** Implement service behavior, change normative GSM, introduce use-case pages, expose the internal audit as customer-facing explanatory copy, rewrite archived content, or automatically advertise all 25 supporting foundations as catalogue additions.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
| --- | --- | --- | --- |
| Feasible future promise | Explicitly planned feature | Visible promise with planned status and bounded scope | Reject missing claim identity |
| Incomplete realization | One available feature; another required part missing | Partial or planned aggregate, never wholly delivered | Explain scope through concise claim content |
| Optional extension | Accepted core; future optional adapter | Preserve core status; show extension planned | Reject ambiguous prerequisite references |
| Alternative realization | Direct authoring accepted; sourcing unfinished | Direct route remains usable in its scope | Reject empty or cyclic prerequisite proofs |
| Historic version | Version exists without backed delivery evidence | Preserve version metadata without inventing a delivered feature | Reject inconsistent milestone data |
| Benefit proposition | Features exist but no measured outcome | Expected benefit, not proven savings/compliance | Reject automatic inheritance of outcome proof |

</frozen-after-approval>

## Code Map

- `src/data/poesis-portfolio.ts`: canonical claims, support relationships, version helpers and module-load gates. `capabilityShipped` currently uses `.some`; `productTimeline` synthesizes shipped entries.
- `src/data/pains.ts`: buyer-problem relationships and reference validation.
- `src/components/SolutionCapabilityCards.astro`, `SolutionValueCards.astro`, `ProductCards.astro`, `PlatformValues.astro`: shared graph presentation; existing planned styling and proof links.
- `src/components/ProductRoadmap.astro`, `ProductRoadmapMini.astro`, `RoadmapNote.astro`: release/timeline presentation.
- `src/pages/index.astro` and the solution/product template owners enumerated in the platform audit: affordances, heroes, features, values, metadata and literal promises.
- `src/data/domains.ts`, `profiles.ts`, `alternatives.ts`, `services.ts`: adjacent claim-bearing copy identified by the audit.
- `scripts/export-roadmap.mjs`: existing export coupling; distinguish semantic changes from release-history changes.
- `src/styles/global.css`: established status styling and responsive layout.

## Tasks & Acceptance

**Execution:**

- [x] Update `src/data/poesis-portfolio.ts` with stable lower-level value IDs, scoped delivery state, target wording and typed relationship semantics. Preserve existing identities and add compatibility anchors where titles change.
- [x] In the same graph, replace any-child delivery inference and synthetic shipped milestones; validate complete reference syntax, uniqueness, prerequisite alternatives and contradictory states.
- [x] Reconcile `src/data/pains.ts` with corrected scope without inventing validated customer problems. Update affected reverse links and allow contributions without forcing every capability into a single causal parent.
- [x] Update the four shared card components above so features, capabilities and affordances show explicit delivery scope; values remain recognizable benefit propositions. Use consistent relation labels that distinguish support from operational realization.
- [x] Update roadmap components and `scripts/export-roadmap.mjs` only where needed to preserve release facts without using them as proof of complete functionality. Synchronize strategy/docs registers if their owned facts change.
- [x] Apply audited claim boundaries to the existing homepage, four solution and twelve product routes and their adjacent data-driven copy. Keep planned ambitions visible; do not replace them with lists of internal implementation gaps.
- [x] Add `scripts/portfolio-claims.test.mjs` using Node's existing test runner; register its command in `package.json`. Cover the edge-case matrix and the complete inventory identity mapping.
- [x] Update `src/styles/global.css` minimally for readable delivered/partial/planned labels, using established typography, colors, icons and breakpoints.
- [x] Reconcile `../strategy/seo.md` for changed public titles/page mappings and annotate the target model with implemented presentation scope, not product delivery.

**Acceptance Criteria:**

- Given the frozen 188-node inventory, when the integration is built, then every node has an explicit retained, corrected or mapped disposition and no feasible planned promise disappears merely because it is unfinished.
- Given any platform/solution/product route, when its claims and support links are inspected, then status and wording agree with the target scope rather than a single child's milestone.
- Given renamed value wording, when a prior value link is followed, then it still resolves to the intended content.
- Given desktop and mobile viewports, when representative routes render, then planned promises remain legible, labels do not overlap and links reach the correct claims.

## Spec Change Log

2026-09-15: Binary commitment presentation verified after owner correction. Public labels are
Implemented (check badge) and Planned (clock); internal partial progress maps to Planned.
Values carry dependency-derived commitment status, not speculative "potential" wording.
Roadmaps synchronized; 22 workspace checks passed. Browser checks on homepage, ITIP solution,
GSM Specifications and Harness passed at 1440px and 390px: no horizontal overflow or retired
public labels. Mobile value icons inspected visually. Jekyll rendering remains unverified
without Ruby; no commits or pushes performed.

2026-09-15: Explicit approved user correction: Planned is a company commitment, not a potential value. Public scope labels are binary Implemented (check badge) and Planned (clock), while internal partial/delivered states remain intact for audit precision. Values derive status from their own referenced features, capabilities or affordances; empty references and vision remain Planned. Apply this mapping across cards, diagrams, product pages, roadmap renderers and generated docs, preserving IDs, aliases, milestone history and intervening edits. Neutral "Realized by" links avoid implying current delivery. No new workflow, product behavior, catalogue additions, installs, commits or pushes. This correction remains in-review pending the parent's desktop/mobile visual acceptance; earlier browser evidence below predates it.

Initial draft translates the approved audit into one site-integration goal. No product implementation or catalogue expansion is implied.

2026-09-15: User approved implementation and explicitly required corresponding roadmap updates for every feature change. Synchronize site timelines, the strategy register and generated documentation roadmap; retain existing version history and do not invent release dates.

2026-09-15: Browser-review wording refinement: preserve implementable planned promises alongside available scope using direct, affirmative benefit copy. Give all twelve products distinct outcome taglines and explanatory descriptions; replace repetitive hedging and internal audit narration with concise material scope notes. Preserve all feature names, delivery states, evidence kinds, identities, relations, title aliases and historical milestones. Refresh the homepage digital-twin promise without changing its H1 or SEO title. Synchronize feature wording through the existing roadmap exporter and validate source, workspace and built-route parity. The approved frozen intent remains unchanged; no product implementation, catalogue expansion, styling rewrite, installs or commits are part of this repair.

## Design Notes

Avoid both overclaiming and blanket pessimism. A planned copilot stays a visible copilot promise; it does not become an authorization-backlog card. Partial status belongs to a stated scope, not to an inferred percentage. Source-inspected implementation, publication, operated service and customer benefit are separate facts. The first reversible implementation slice is the readiness helper plus focused tests before changing presentation.

## Verification

**Binary-status correction (2026-09-15):** Roadmap regeneration passed. The complete source,
workspace and built-page suite passed 22 tests with no skips, checking all 65 feature records,
all 65 values, frozen identities/aliases, internal-state parity and separate public binary
labels. Rendered checks verify both icon paths, title/accessible label/text equality, partial
to Planned mapping and dependency-specific value and milestone scope. Astro/Pagefind build,
generated JSON parsing and whitespace checks passed. Parent desktop/mobile visual acceptance
remains pending for this correction; previous screenshots are not its acceptance evidence.
The existing Pagefind redirect warning and pre-existing Markdown diagnostics remain unrelated.

**Commands:**

- `npm run test:portfolio`: standalone core checks; does not read sibling strategy or documentation files. Workspace and built-route checks are skipped by default.
- `npm run test:portfolio:workspace`: comprehensive inventory, deferred-promise, documentation-label and roadmap/register consistency checks; requires the sibling strategy and documentation files and reports missing paths explicitly.
- `npm run build`: Astro and Pagefind succeed with graph validation active, using Node 22 or newer.
- `CHECK_BUILT_PORTFOLIO=1 npm run test:portfolio:workspace`: after the build, also validate retained anchors, semantic service/partnership listings and backlinks, and recorded/planned roadmap labels across all products.
- `git diff --check`: no whitespace errors.

**Browser checks:** Start the local Astro server on a free port. Check homepage, all four solution pages and twelve product routes for rendering and broken anchors; capture desktop/mobile screenshots of the homepage, ITIP solution, Web Application and Harness. Verify explicit status text, preserved planned promises, valid navigation and absence of overflow. Return the local URL for visual review. No production deployment is part of this task.

### Implementation Handoff

- Inventory checksum unchanged; all 188 original identities mapped by the regression suite.
  Corrected public claims retain solution/product/feature routes, 59 lower-value IDs and
  their legacy title aliases, 6 platform values, and original product documentation destinations.
- All 65 feature names, claim states, scope notes and unchanged historical milestone objects
  agree with the bounded strategy register and generated documentation data.
- `npm run sync-roadmap`: passed during initial implementation; not rerun for review-only label fixes.
- `npm run test:portfolio`: standalone source checks passed. Workspace consistency checks now require `npm run test:portfolio:workspace`.
- `npm run build`: Astro and Pagefind passed. Run `CHECK_BUILT_PORTFOLIO=1 npm run test:portfolio:workspace`
  for the complete review suite, including semantic listings and recorded/planned labels, not anchor existence alone.
- `git diff --check`: passed for corporate, touched strategy files and documentation.
  `python3 -m json.tool ../documentation/_data/roadmap.json`: passed (`python` is not installed).
- Pagefind retains the pre-existing warning for `/insights/itip-compliance-proof/`, whose
  output lacks an outer HTML element; 50 other pages indexed. This unrelated article was not changed.
- Browser acceptance completed: all 17 core routes passed at 1440px and 390px widths
  (34 checks), with HTTP 200, one main H1, no horizontal overflow and no missing images.
  Desktop/mobile screenshots inspected for homepage, ITIP solution, Web Application and Harness;
  mobile menu opening/closing passed. Documentation Jekyll rendering remains unverified because
  Ruby is unavailable. No production checks are claimed.
  The full evidence-vector/predicate system and product acceptance proposed by the design
  target are not implemented by this presentation change. No commits, pushes or installs performed.

Additional touched presentation surfaces: `ArchMap.astro`, `ThinkTherapyDiagram.astro`,
`BaseLayout.astro`, the four comparison pages' shared data/template, services data/template,
profiles/domains, About and the LLM partnership diagram/maturity records. External registers:
`strategy/roadmap.md`, `strategy/seo.md`, `strategy/portfolio-claim-target-model.md`, and
`documentation/{_data/roadmap.json,_data/README.md,_includes/roadmap_timeline.html,milestones.md}`.

## Final Acceptance

- Independent acceptance, edge-case and diff reviews completed. Corrected API/MCP optionality,
  scoped affordance delivery gates, sparse requirement rejection, strict delivery-state typing,
  orphan feature detection, misleading navigation aliases and ambiguous milestone labels.
- Standalone tests no longer require sibling repositories. Workspace validation remains explicit.
- Final `CHECK_BUILT_PORTFOLIO=1 npm run test:portfolio:workspace`: 19 passed, no failures or skips.
- Final build and roadmap export passed after the promise-first wording pass; all 65 feature
  names, states, scope text and historical milestones match the generated roadmaps.
- Customer-facing promises remain visible with planned/partial labels. No new commercial
  products, use cases, release dates or service-operation claims were introduced.
- Local preview: [localhost:4330](http://localhost:4330/). No commits, pushes, installs or product implementation.

## Suggested Review Order

1. Claim scope, status and realization rules: [poesis-portfolio.ts:1](../../src/data/poesis-portfolio.ts#L1).
2. Capability-to-feature and affordance presentation: [SolutionCapabilityCards.astro:1](../../src/components/SolutionCapabilityCards.astro#L1).
3. Platform promises and navigation: [index.astro:1](../../src/pages/index.astro#L1).
4. Release history versus planned scope: [ProductRoadmap.astro:1](../../src/components/ProductRoadmap.astro#L1).
5. Single-source roadmap export: [export-roadmap.mjs:1](../../scripts/export-roadmap.mjs#L1).
6. Regression and workspace parity checks: [portfolio-claims.test.mjs:1](../../scripts/portfolio-claims.test.mjs#L1).

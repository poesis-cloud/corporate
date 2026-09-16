---
title: Explicit Platform Usage Model
type: feature
created: 2026-09-15
status: done
baseline_commit: 2dcdda976291f5b87d8d3a3ec9ac17ffbfe2060a
context: []
---

<!-- markdownlint-disable-next-line MD033 -- Required workflow intent-lock marker. -->
<frozen-after-approval reason="User explicitly approved this structure and implementation in the supplied intent">

## Intent

Make the existing website explain meaningful human and system activities through a separate usage object beside the platform object. Preserve the existing commercial platform inventory and expose explicit feature compositions, selected capability and affordance contexts, affected pains and committed values. This is one user-facing goal spanning data, validation, browse/detail pages and existing views.

## Boundaries & Constraints

Always preserve the 65 feature identities and milestones, 25 capabilities, six affordances, existing values, five human profile IDs and 11 pain IDs. Canonical usage entities are actor types, pains and use cases only. Realizations are nested records, not another ontology. System actor types describe genuine participants. Pains describe contextual problems independently of any product or solution, including manual work with no modeled case. Optional occursIn links may identify real cases only. Human profile content and route anchors survive through compatibility adapters.

Every use case names actors, goals, contextual workflow, preconditions, outcomes and exceptions. Every realization selects actual features and explains their composition within explicit capability/affordance contexts. Product ownership may be derived; semantic sufficiency must never be inferred from ancestor traversal or feature intersection. AND/OR alternatives and optional support are represented where meaningful. A route is Implemented only after its named prerequisites and full route acceptance pass, never merely because component features exist. Public labels are Implemented and Planned, using the existing delivery badge. Values are existing commitments, not potential outcomes. Content reading/modeling and research are genuine activities, not runtime enforcement claims.

Never invent features or versions for coverage, mutate the platform after definition, duplicate canonical pain/profile records, edit archives, modify product runtime or normative artifacts, commit or push. Preserve the dirty worktree. Scope is corporate website, strategy and generated documentation roadmap. Parent review and browser verification remain separate from this implementation pass. No background delegates.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Behavior | Error Handling |
| --- | --- | --- | --- |
| Manual pain | Context and actor types, no case/product | Valid independent pain | None |
| Composition | Features selected with explained contexts | Named outcome and value links | Reject dangling/unsupported references |
| Status | Implemented components, unaccepted route | Planned | Never promote from children alone |
| Alternatives | Complete API or MCP route | One accepted complete route suffices | Empty/cyclic proofs rejected |
| Content | Available grammar and lifecycle source | Implemented reading/modeling activity | No runtime or publication claim |
| Coverage | Current identity ledger | All 65/25/6 explicitly traced | Missing identities fail checks |

</frozen-after-approval>

## Code Map

- `src/data/poesis-portfolio.ts`: existing feature/claim graph; rename to `poesis-platform.ts`, with one `poesisPlatform` root and a solutions collection.
- `src/data/usage.ts`: canonical actor types, pains, contextual cases, nested realizations and validators.
- `src/data/pains.ts`, `src/data/profiles.ts`: preserve public consumers through adapters to canonical usage ownership.
- `scripts/portfolio-claims.test.mjs`: retain frozen 188-identity and roadmap checks.
- `scripts/usage.test.mjs`: usage identity, composition, acceptance and route tests.
- `src/pages/usage/`, `src/components/UsageCases.astro`: browse/detail surface and shared contextual entry points.
- Existing homepage, solution/product/feature views: add contextual usage links without replacing platform navigation.
- `scripts/export-roadmap.mjs`: platform naming with unchanged feature identities and versions.
- `../strategy/usage-model.md`, SEO and strategy indexes: decision, keyword ownership and completed-model convention.

## Tasks & Acceptance

**Execution:**

- [x] Add test-first usage contract and persist this approved specification.
- [x] Rename platform symbol/file and preserve consumers and inventory.
- [x] Migrate actor types/pains; populate meaningful end-to-end use cases and explicit realizations.
- [x] Validate identities, reference integrity, selected composition, AND/OR, optional support, cycles and non-vacuous acceptance.
- [x] Add browse/detail pages and contextual usage sections, actor/pain navigation and delivery badges.
- [x] Update strategy/SEO, sync roadmap and verify both mirrors.
- [x] Run focused tests, full existing checks and site build; record implementation trace and pending independent review.

**Acceptance Criteria:**

- Given the stable platform inventory, when coverage is computed, then each original feature, capability and affordance has an explicit usage trace, without manufactured entities.
- Given an actor type or pain, when browsing usage, then the reader reaches matching actual cases and their complete realization details.
- Given a product or feature page, when opening related usage, then the selected feature composition and its committed values are inspectable.
- Given an incomplete prerequisite or route acceptance, when displaying status, then the entire outcome is Planned even if some features exist.
- Given existing profile and pain URLs, when following them, then the IDs and original content remain available.
- Given a roadmap export, when compared with strategy and documentation mirrors, then all 65 original features and versions remain unchanged.

## Design Notes

Revision-pinned code candidates plus sealed contribution intake, client reconciliation and lifecycle-bound authoring produce a reviewable inventory revision. Neither intake alone nor feature overlap proves the outcome. Scoped appraisal combines bound obligations, identified inputs and pure verdicts, then produces findings for review; it is not automatic legal compliance. Local artifact delivery combines method content, supported host controls, artifact contracts and a working tree, with manual setup as an alternative to an installer. Reading current specification grammar is a complete content activity independent of processor acceptance and future grammar extensions.

## Spec Change Log

- 2026-09-16: Implemented the approved independent-review corrections in the current model, pages, tests and strategy records. No new workflow, delegates, product/feature changes, installations, commits or pushes. Added three distinct outcome cases while retaining all existing case and realization IDs.

## Verification

Final acceptance: independent semantic review corrections verified; 22 platform and 20 usage
checks passed. The usage index, manual modeling, code reconciliation and recurring appraisal
pages passed live browser checks at 1440px and 390px: HTTP 200, one main H1, no horizontal
overflow and no page errors. Desktop/mobile screenshots inspected. System actor filtering,
manual-pain empty state and filter reset worked in the rendered browser. The index is left
open at [localhost:4331/usage](http://localhost:4331/usage). No commits or pushes.

- `node --experimental-strip-types --test scripts/usage.test.mjs`: focused usage contract.
- `npm run test:portfolio`: existing standalone inventory and claims checks remain green.
- `npm run sync-roadmap && npm run build`: generated data and all public routes build.
- `CHECK_BUILT_PORTFOLIO=1 npm run test:portfolio:workspace`: frozen inventory, route and both roadmap mirror checks.
- JSON syntax, editor diagnostics and `git diff --check`: focused integrity checks.

## Implementation Trace

Initial route: current graph has `poesisPortfolio` solutions plus a `poesisPlatform` wrapper. Pains own feature edges, and profiles are independent. Hypothesis: replacing this with canonical usage plus compatibility projections can preserve all consumers while adding explicit acceptance-bound use cases. First discriminating check is the usage test, expected red before the new module exists. Workflow resolver is absent; base customization has no extra activation steps, and the supplied approval authorizes this implementation without another checkpoint.

Final implementation: `poesisPlatform` remains the sole platform root; `platformSolutions` names its collection. Semantic rename handled TypeScript references; a Git move and mechanical rename completed Astro/export imports. Canonical actor and pain records moved to usage-owned files; compatibility adapters preserve the original five human profiles, 11 pain IDs and 23 historical hypotheses without copying their prose into another registry.

The corrected census is 10 actor types (seven human, three system), 13 pains, 22 cases and 23 realizations. All 65 original features appear in required compositions, and all 25 capabilities/six affordances have explicit justified context links. Four cases are implemented content activities; eighteen are planned. API/MCP alternatives preserve scoped acceptance without mandatory sourcing or hosting. Current grammar reading and proposal review exclude future extension delivery; accepted incorporation requires it. No product features, milestones or normative/runtime artifacts were changed.

Initial implementation verification:

- Initial focused test failed at the expected missing module, then passed after implementation.
- `npm run test:portfolio`: 14 standalone checks passed; eight workspace checks intentionally skipped.
- `CHECK_BUILT_PORTFOLIO=1 npm run test:portfolio:workspace`: all 22 checks passed, zero skipped; frozen 188 identities and both roadmap mirrors retained.
- `CHECK_WORKSPACE_PORTFOLIO=1 CHECK_BUILT_USAGE=1 npm run test:usage`: all nine checks passed, zero skipped; coverage, acceptance, SEO, page/feature links and legacy anchors verified.
- `npm run sync-roadmap` and `npm run build`: succeeded; 70 pages built/indexed.
- JSON parsing, editor diagnostics and corporate/strategy/documentation whitespace checks passed.
- Existing Pagefind warning: the `/insights/itip-compliance-proof/` redirect has no outer HTML element and is not indexed. Unrelated to usage and left unchanged.

Preview: `http://localhost:4331/usage`. No installation, commit or push was performed. The parent explicitly owns independent content/browser review, so the spec remains `in-review`; no review agents were spawned. Website assertions are not product runtime acceptance. The new manual handoff and modeling-evidence pains are grounded scenarios, not customer-research claims.

### Independent Review Corrections, 2026-09-16

- Split the six-protocol design into a GraphQL-to-gRPC payment submission with WebSocket status notification and a JDBC transactional outbox to Kafka to AMQP settlement handoff. Each package is required by its actual boundary; modeled systems are not participants in these manual reviews.
- Bounded the six-framework shortlist to an EU hospital patient-results portal with adopted architecture/quality criteria, GDPR personal-data scope, confirmed national NIS2 applicability and SCAP configuration subjects. Bounded DORA/SAFe/ITIL upgrade to an EU bank supplier change crossing three already-adopted processes, distinguishing legal from voluntary method obligations.
- Split supplied-instance appraisal from recurring deployment appraisal. Only the recurring case requires observation ingestion, scheduling and recovery and contributes to continuous evaluation. Both remain Planned.
- Split completed proposal review, including rejection, from accepted-extension incorporation. Only incorporation requires the extension feature and serves its specification-extension value. Both remain Planned.
- Validated shared AND/OR leaves as a unique reference set while preserving record and relationship uniqueness. The full-graph regression covers `(API AND retention) OR (MCP AND API AND retention)`.
- Enforced every selected feature/capability and capability/affordance pair against direct typed platform support, including optional support and `informs`/`consumes` contexts. This establishes compatibility, not semantic sufficiency or automatic ancestor proof.
- Replaced bare value links with authored `{ ref, rationale, supports, outcome }` contributions. Every support must match a direct value edge and be selected in every alternative; one overlap cannot excuse an unrelated support. The page links the rationale to an actual outcome and retains the value's independent status.
- Replaced bare case-pain links with `{ ref, contribution }`, rendered under **Pain points**. Canonical pain experience, occurrence and legacy compatibility hypotheses remain independent and unchanged. Updated the pain helper and filter data.
- Removed system actors that only described modeled systems or historical producers; every retained system actor now performs a named workflow interaction. No role registry was added.

### Structural Inversion Refactor, 2026-09-16

This pass changes the shape of the model approved above. The frozen intent block is left intact as the record of what was approved then; this section records what the model is now.

**Reference direction inverted.** Values moved from the platform side to the usage side as one `Value` type in `src/data/usage-values.ts` (`slug`, `originalTitle`, `title`, `body`), replacing the `Value`/`SolutionValue`/`PlatformValue` split. Every feature, capability and affordance now declares `values`, `pains` and `useCases` as plain slug arrays. `poesis-platform.ts` imports nothing from usage; `usage.ts` resolves and validates every reference and enforces value-ownership depth (product values may only be claimed by features, solution values by capabilities, platform values by affordances). All 65 value slugs, `originalTitle` values, prose and legacy anchors were preserved.

**Use case reduced to identity.** `UsageRealization`, the `realizations` array and the `context`, `preconditions`, `workflow`, `outcomes`, `exceptions`, `pains` and `values` attributes were deleted. `UseCase` is now `slug`, `name`, `goal`, `actorTypes`. All 22 slugs, names and goals are unchanged. Case pains, values, features, capabilities and affordances are derived from the platform items that reference the case. This removes authored operational narrative that no test could falsify; it does not remove any checkable claim.

**Attributes dropped:** `vision`/`emergent` on values (an unclaimed value already resolves to Planned), `Solution.zone`, stored `Solution.href` (derived by `solutionHref()`), `ActorType.cta`, `UsagePain.remedy` and `UsagePain.domainSlug`, and `Domain.href`/`subitems`/`solutions` with the `DomainSubitem` interface. `UsagePain.phase` is retained because the homepage bottleneck diagram depends on it.

**Renames:** `ProductDef` → `Product`; every record-identity `id` → `slug` (values, pains, actor types, use cases, realization contracts); every singular `tag` → `tags: string[]` on `ActorType`, `UsagePain`, `Domain` and `Solution`. Composed edge identities (`SemanticEdge.id`, `painRelations[].id`) keep `id` because they are composed references, not record identities.

**Census after the refactor:** 4 solutions, 12 products, 65 features, 25 capabilities, 6 affordances, 65 values, 13 pains, 10 actor types (seven human, three system), 22 use cases. 96 structural platform edges plus 137 derived value edges; 23 historical pain hypotheses rebuilt by inversion. 8 of 65 values and 4 of 22 use cases are Implemented; `value:gsm/specifications/04` is the one value no item currently claims and is reported Planned rather than hidden.

Refactor verification:

- `CHECK_BUILT_PORTFOLIO=1 npm run test:portfolio:workspace`: 22 tests passed, zero skipped; frozen 188-identity inventory (sha256 unchanged), 65-value ledger, both roadmap mirrors and the binary badge contract retained.
- `CHECK_WORKSPACE_PORTFOLIO=1 CHECK_BUILT_USAGE=1 npm run test:usage`: 12 tests passed, zero skipped, covering reference resolution, ownership depth, duplicate/dangling/unreachable rejection, derived statuses, adapters, anchors and built routes.
- `npx tsc --noEmit`: clean. `npm run sync-roadmap` and `npm run build`: succeeded, 73 pages indexed; the generated roadmap mirror is byte-identical to the pre-refactor output.
- No product runtime, normative or archive artifact was changed. No commits, pushes or installations.

Correction verification:

- Test-first shared-leaf regression failed with `Duplicate required feature`, then passed after the unique-leaf fix. Context and scenario regressions also failed before their implementations.
- `CHECK_WORKSPACE_PORTFOLIO=1 CHECK_BUILT_USAGE=1 npm run test:usage`: 20 tests passed, zero skipped, including contribution rendering, statuses, links, filters and SEO ownership.
- `CHECK_BUILT_PORTFOLIO=1 npm run test:portfolio:workspace`: all 22 original platform tests passed, zero skipped; frozen 188 identities and both roadmap mirrors retained.
- `npm run sync-roadmap` and `npm run build`: passed under Node 22.22.1; 73 pages indexed. Platform source was not edited by this correction pass.
- Parent browser checks at the existing preview: all 22 live case routes returned HTTP 200 with 23 expected route badges and contribution sections. Combined integration-client/tool-silos filtering returned only the committed-change consumer; reset restored all 22 cases. Index and value-contribution layouts had no horizontal overflow at checked 390px/1440px widths; screenshots were inspected.
- No editor diagnostics in touched TypeScript, Astro or tests. Runtime service acceptance and observed customer benefits remain outside this website verification.

## Suggested Review Order

1. Ownership, scope and concrete emergence decisions: [usage-model.md](../../../strategy/usage-model.md#L1).
2. Three-entity contract, authored cases and independent route acceptance: [usage.ts](../../src/data/usage.ts#L1).
3. Preserved human content and genuine system participants: [usage-actors.ts](../../src/data/usage-actors.ts#L1).
4. Independent pains and compatibility edges: [usage-pains.ts](../../src/data/usage-pains.ts#L1), [pains.ts](../../src/data/pains.ts#L1), [profiles.ts](../../src/data/profiles.ts#L1).
5. Workflow, selected composition and acceptance presentation: [usage detail](../../src/pages/usage/[slug].astro#L1).
6. Actor/pain filters and independent directories: [usage index](../../src/pages/usage/index.astro#L1).
7. Shared case entries and feature backlinks: [UsageCases.astro](../../src/components/UsageCases.astro#L1), [product view](../../src/pages/solutions/[solution]/products/[product].astro#L1).
8. Platform identity preservation and roadmap export: [poesis-platform.ts](../../src/data/poesis-platform.ts#L1), [export-roadmap.mjs](../../scripts/export-roadmap.mjs#L1).
9. Semantic, rendered-route and SEO gates: [usage.test.mjs](../../scripts/usage.test.mjs#L1), [portfolio-claims.test.mjs](../../scripts/portfolio-claims.test.mjs#L1), [seo.md](../../../strategy/seo.md#L1).

Additional presentation changes are the homepage, four solution pages and navigation. Import-only platform filename updates cover the existing architecture/value/capability/roadmap components and tests. Current strategy conventions were updated in README, brand-and-marketing, gtm-domain-sales-profiles, portfolio-claim-target-model and roadmap; frozen audit records remain unchanged. The generated roadmap was refreshed and its source note updated in documentation.

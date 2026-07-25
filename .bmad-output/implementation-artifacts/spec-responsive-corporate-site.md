---
title: 'Make the corporate site responsive'
type: 'bugfix'
created: '2026-07-25'
status: 'done'
baseline_commit: '5cc2a88ecdcb60a2f4a2c687cd66f5e00e1f7695'
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The corporate site uses desktop navigation and several fixed or wide layout assumptions that become crowded, overflow, or lose information on phone and tablet viewports. The shared menu bar and the LLM partnership value-flow map are the clearest failures, but the correction must cover every current route.

**Approach:** Add a compact, keyboard-accessible navigation and narrow-screen layout fixes only below the desktop boundary, and give the partnership value map a readable mobile flow representation. Preserve the rendered desktop site at 1024px and above without visual, spacing, content, or interaction changes.

## Boundaries & Constraints

**Always:** Preserve the existing Deep Field visual language, route structure, wording, and progressive enhancement. Keep controls keyboard operable with accurate ARIA state. Support content widths from 320px through wide desktop without page-level horizontal scrolling. Apply visual and layout changes only below 1024px; at 1024px and above, preserve the current desktop navigation, spacing, sizing, value-map rendering, and interactions. Respect reduced-motion preferences.

**Ask First:** Any removal or substantive rewriting of page content, route changes, dependency additions, or replacement of the current desktop value-map interaction.

**Never:** Hide primary navigation links on mobile, make the mobile menu hover-dependent, solve overflow with page-wide clipping, remove value-flow meaning from the partnership page at narrow widths, or alter the rendered desktop viewport.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|---------------|----------------------------|----------------|
| Mobile navigation | Viewport below the compact-navigation breakpoint | Brand and menu control remain on one row; control opens all navigation links in a stable panel and exposes expanded state | Menu closes on Escape, outside activation, and link activation; resize to desktop resets stale mobile state |
| Narrow content | Any current route at 320px or 375px | Text, buttons, cards, chips, footer groups, and menus fit without horizontal page scrolling | Long labels wrap within their own component rather than forcing viewport overflow |
| Partnership map | Viewport below the diagram breakpoint | Both systems and all five named exchanges remain readable and selectable in a coherent stacked flow | SVG wires may be suppressed only when an equivalent mobile relationship cue is visible |
| Desktop preservation | Viewport at 1024px or wider | Existing navigation, dimensions, wrapping, spacing, content, and interactive wired value map render and behave as before | Mobile-only controls and relationship cues have no layout or visual effect |

</frozen-after-approval>

## Code Map

- `src/components/Nav.astro` -- shared primary navigation markup and dropdown/mobile interaction.
- `src/styles/global.css` -- shared container, navigation, grid, typography, footer, and responsive rules used by every route.
- `src/pages/partnerships/llm-provider-value-proposal.astro` -- five value cards, interactive two-sided value map, page-local styles, and flow-selection script.
- `src/components/Footer.astro` -- shared footer structure validated against narrow layouts.
- `src/pages/**/*.astro` and `src/pages/insights/*.md` -- complete route set to inspect for regressions and horizontal overflow.

## Tasks & Acceptance

**Execution:**
- [x] `src/components/Nav.astro` -- add a semantic compact-menu control and robust open/close behavior while retaining desktop dropdown behavior.
- [x] `src/styles/global.css` -- introduce header/menu, narrow container/section/button/card/footer rules, and safe text wrapping exclusively inside sub-1024px media queries.
- [x] `src/pages/partnerships/llm-provider-value-proposal.astro` -- adapt the value cards and map into a meaningful stacked mobile flow with touch-friendly controls and no fixed-width overflow.
- [x] All generated routes -- inspect representative 320px, 375px, 768px, 1024px, and 1440px viewports for horizontal overflow, overlap, clipped controls, and unreadable text.

**Acceptance Criteria:**
- Given any generated route at 320px through 1440px, when the page is loaded and interactive sections are exercised, then no document-level horizontal scrollbar, incoherent overlap, or inaccessible primary action is present.
- Given keyboard-only navigation, when the compact menu and dropdowns are opened and dismissed, then focusable controls remain reachable and `aria-expanded` reflects visible state.
- Given the partnership page on mobile, when a visitor explores the value map, then partner components, Poesis components, and all five exchanges can be understood and selected without relying on desktop SVG wires.
- Given any viewport at 1024px or wider, when the site is loaded after the change, then its navigation, layout, spacing, typography, content wrapping, and wired map are visually and behaviorally unchanged from the baseline.

## Spec Change Log

## Design Notes

Prefer a header-contained disclosure panel over an off-canvas drawer: the navigation set is modest, this avoids scroll locking and focus-trap complexity, and it preserves the existing header as the clear orientation point. New controls must be inert and take no space at 1024px and above. On mobile, relationship labels should sit in the content flow near the corresponding component groups; the desktop SVG and all existing desktop CSS remain untouched.

## Verification

**Commands:**
- `npm run build` -- expected: all Astro routes build without errors.

**Manual checks:**
- Inspect every route at 320px and 375px, plus representative pages at 768px, 1024px, and 1440px.
- Exercise menu disclosure, nested dropdowns, Escape dismissal, outside dismissal, flow cards, component cards, and fold controls with pointer and keyboard input.
- Confirm `document.documentElement.scrollWidth === document.documentElement.clientWidth` on every route at phone widths.
- Compare before/after captures at 1024px and 1440px and confirm no desktop visual or layout differences.

## Suggested Review Order

**Compact Navigation**

- Introduces the mobile disclosure without changing the existing desktop navigation tree.
	[`Nav.astro:17`](../../src/components/Nav.astro#L17)

- Centralizes menu state, focus restoration, dismissal, and breakpoint resets.
	[`Nav.astro:76`](../../src/components/Nav.astro#L76)

- Activates responsive presentation strictly below the preserved desktop boundary.
	[`global.css:760`](../../src/styles/global.css#L760)

- Keeps navigation readable without JavaScript, then collapses it after initialization.
	[`global.css:851`](../../src/styles/global.css#L851)

**Partnership Value Map**

- Adds five directional, selectable relationships for narrow screens.
	[`llm-provider-value-proposal.astro:191`](../../src/pages/partnerships/llm-provider-value-proposal.astro#L191)

- Reveals mobile relationships only inside the existing map breakpoint.
	[`llm-provider-value-proposal.astro:340`](../../src/pages/partnerships/llm-provider-value-proposal.astro#L340)

- Reuses the existing flow detail model with synchronized accessible state.
	[`llm-provider-value-proposal.astro:496`](../../src/pages/partnerships/llm-provider-value-proposal.astro#L496)

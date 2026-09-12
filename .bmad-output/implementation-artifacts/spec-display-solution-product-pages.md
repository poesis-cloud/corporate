---
title: 'Display solution product pages'
type: 'bugfix'
created: '2026-09-12'
status: 'done'
route: 'one-shot'
---

# Display solution product pages

## Intent

**Problem:** The Platform menu rendered solution product links through ambiguous disclosure controls and an accidental CSS cascade, producing an excessively tall single-column menu.

**Approach:** Display all product child pages intentionally, using explicit navigation layout metadata and a responsive desktop mega-menu with bounded scrolling.

## Suggested Review Order

**Navigation intent**

- Declares Platform and solution-list layout independently from presentation labels.
  [`site-navigation.ts:25`](../../src/data/site-navigation.ts#L25)

- Maps layout metadata to stable structural classes without duplicating portfolio data.
  [`Nav.astro:24`](../../src/components/Nav.astro#L24)

**Responsive presentation**

- Keeps every product child page visible under its owning solution.
  [`global.css:380`](../../src/styles/global.css#L380)

- Uses a compact desktop grid with safe wrapping and short-viewport scrolling.
  [`global.css:395`](../../src/styles/global.css#L395)
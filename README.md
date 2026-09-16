# Poesis — corporate site (`poesis.cloud`)

The Poesis **authority & conversion** site: the company / brand / offerings front
end that turns the audience the open **GSM** standard attracts into demand for the
Poesis stack, services, and certification.

It is deliberately distinct from `docs.poesis.cloud` (the GSM standard + product
documentation) and from the GitHub org (the standard, framework, and engine repos).

## Stack

- [Astro](https://astro.build) (static output) — SEO-first, fast, content-driven.
- `@astrojs/sitemap` for sitemap generation.
- No runtime JS framework: plain `.astro` + CSS. Insights posts are Markdown.

## Develop

```bash
npm install
npm run dev      # local dev server (http://localhost:4321)
npm run build    # static build -> dist/
npm run preview  # preview the production build
```

Requires Node 22+ for the TypeScript data checks and roadmap exporter.

## Platform And Usage

[src/data/poesis-platform.ts](src/data/poesis-platform.ts) owns the single `poesisPlatform` root:
solutions, products, features, capabilities, affordances and values. Its 65 feature identities
and milestones feed both the site and the generated documentation roadmap.

[src/data/usage.ts](src/data/usage.ts) owns the sibling `poesisUsage`: 10 actor types, 13 independent
pains and 19 use cases with 20 nested realizations. Feature compositions and capability/affordance
contexts are explicit, with separate prerequisites and complete-route acceptance. Four bounded
content activities are Implemented; integration workflows remain Planned. The original five human
profiles and 11 pain anchors survive through compatibility adapters.

The `/usage` index has actor/pain filters and directories; detail pages show workflows, composition,
acceptance, values and pains. Existing homepage, solution, product and feature views link the same
records. See the [usage decision](../strategy/usage-model.md) and [SEO register](../strategy/seo.md).

```bash
npm run test:usage
npm run test:portfolio
npm run sync-roadmap
npm run build
CHECK_BUILT_USAGE=1 npm run test:usage
CHECK_BUILT_PORTFOLIO=1 npm run test:portfolio:workspace
```

Workspace checks require the sibling strategy and documentation repositories. Standalone checks
do not require those folders. Website checks do not establish product runtime acceptance.

## Structure

```
src/
  layouts/     BaseLayout (SEO/nav/footer) + PostLayout (Insights)
  components/  Nav, Footer
  pages/       index, solutions, services, partnerships, insights, about, contact
    insights/  blog index + Markdown posts
  styles/      global.css (design tokens — typographic brand placeholder)
public/        robots.txt, favicon, CNAME
```

## Brand note

This MVP ships a clean **typographic** brand placeholder. Swap in the commissioned
Poesis logo + visual identity (strategy decision **D9**) via `src/styles/global.css`
and `public/favicon.svg` — no structural changes needed.

## Deploy

The static build (`dist/`) deploys to any static host (GitHub Pages, Netlify,
Vercel, Cloudflare Pages). `public/CNAME` targets `poesis.cloud` for GitHub Pages;
remove it for other hosts.

## License

Proprietary — see [LICENSE](LICENSE). (c) 2026 Poesis · Created by Clément Cazaud.

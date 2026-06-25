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

Requires Node 18+ (developed on Node 22).

## Structure

```
src/
  layouts/     BaseLayout (SEO/nav/footer) + PostLayout (Insights)
  components/  Nav, Footer
  pages/       index, standard, products, framework, services, about, contact
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

#!/usr/bin/env node
/**
 * export-roadmap.mjs — generates documentation/_data/roadmap.json from the
 * single source of truth (src/data/poesis-portfolio.ts). This replaces the
 * old hand-maintained documentation/_data/roadmap.yml mirror: the corporate
 * site and the docs site now render the same derived version timeline
 * instead of two independently hand-authored registers that could drift
 * apart. Run after any change to poesis-portfolio.ts:
 *
 *   npm run sync-roadmap
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { poesisPortfolio, productTimeline } = await import(
  path.join(__dirname, '../src/data/poesis-portfolio.ts')
);

const roadmap = poesisPortfolio.map((solution) => ({
  solution: solution.name,
  products: solution.products.map((product) => ({
    name: product.name,
    current: product.currentVersion,
    milestones: productTimeline(product).map((m) => ({
      version: m.version,
      label: m.label,
      ...(m.shipped ? { shipped: true } : {}),
      ...(m.ga ? { ga: true } : {}),
    })),
  })),
}));

const outPath = path.join(__dirname, '../../documentation/_data/roadmap.json');
const header =
  '// GENERATED FILE — do not hand-edit. Source: corporate/src/data/poesis-portfolio.ts.\n' +
  '// Regenerate with: cd corporate && npm run sync-roadmap\n';
// Jekyll's _data loader expects plain JSON (no comments), so the header stays
// as a sibling note rather than inline — see documentation/_data/README.md.
await writeFile(outPath, JSON.stringify(roadmap, null, 2) + '\n', 'utf8');
console.log(`Wrote ${outPath}`);
console.log(header);

#!/usr/bin/env node
/**
 * export-roadmap.mjs — generates documentation/_data/roadmap.json from the
 * single source of truth (src/data/poesis-platform.ts). This replaces the
 * old hand-maintained documentation/_data/roadmap.yml mirror: the corporate
 * site and the docs site now render the same derived version timeline
 * instead of two independently hand-authored registers that could drift
 * apart. Run after any change to poesis-platform.ts:
 *
 *   npm run sync-roadmap
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { platformSolutions, productTimeline, productStatus, milestoneStatus, commitmentStatus, deliveryLabels } = await import(
  path.join(__dirname, '../src/data/poesis-platform.ts')
);

const roadmap = platformSolutions.map((solution) => ({
  id: solution.slug,
  solution: solution.name,
  products: solution.products.map((product) => ({
    id: `${solution.slug}/${product.slug}`,
    name: product.name,
    current: product.currentVersion,
    state: productStatus(product),
    status: commitmentStatus([productStatus(product)]),
    statusLabel: deliveryLabels[productStatus(product)],
    scope: product.description,
    features: product.features.map((feature) => ({
      id: `${solution.slug}/${product.slug}/${feature.slug}`,
      name: feature.name,
      state: feature.delivery.state,
      status: commitmentStatus([feature.delivery.state]),
      statusLabel: deliveryLabels[feature.delivery.state],
      kind: feature.delivery.kind,
      notes: feature.delivery.scope,
      milestone: feature.milestone,
    })),
    milestones: productTimeline(product).map((m) => ({
      version: m.version,
      label: m.label,
      status: milestoneStatus(product, m),
      statusLabel: deliveryLabels[milestoneStatus(product, m)],
      ...(m.shipped ? { shipped: true } : {}),
      ...(m.ga ? { ga: true } : {}),
    })),
  })),
}));

const outPath = path.join(__dirname, '../../documentation/_data/roadmap.json');
const registerPath = path.join(__dirname, '../../strategy/roadmap.md');
const register = await readFile(registerPath, 'utf8');
const start = '<!-- claim-scopes:start -->';
const end = '<!-- claim-scopes:end -->';
const startIndex = register.indexOf(start);
const endIndex = register.indexOf(end);
if (startIndex < 0 || endIndex <= startIndex) throw new Error('Missing bounded claim-scope register markers');
const cell = (text) => text.replaceAll('|', '&#124;').replaceAll('\n', ' ');
const rows = roadmap.flatMap((solution) => solution.products.flatMap((product) => product.features.map((feature) =>
  `| ${feature.id} | ${cell(feature.name)} | ${feature.statusLabel} | ${feature.kind} | ${feature.milestone.version} | ${cell(feature.notes)} |`
)));
const table = '\n| Feature ID | Public name | Public status | Evidence scope | Historical milestone | Scope / remaining work |\n| --- | --- | --- | --- | --- | --- |\n' + rows.join('\n') + '\n';
await writeFile(registerPath, register.slice(0, startIndex + start.length) + table + register.slice(endIndex), 'utf8');
const header =
  '// GENERATED FILE — do not hand-edit. Source: corporate/src/data/poesis-platform.ts.\n' +
  '// Regenerate with: cd corporate && npm run sync-roadmap\n';
// Jekyll's _data loader expects plain JSON (no comments), so the header stays
// as a sibling note rather than inline — see documentation/_data/README.md.
await writeFile(outPath, JSON.stringify(roadmap, null, 2) + '\n', 'utf8');
console.log(`Wrote ${outPath}`);
console.log(header);

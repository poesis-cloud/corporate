/**
 * Usage-model tests.
 *
 * The model is inverted: platform items (features, capabilities, affordances)
 * declare the values, pains and use cases they serve, and everything a use case
 * shows is derived from those declarations. These tests prove the inventory is
 * complete, the references resolve, the ownership rules hold, and the built
 * pages keep the public identities.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { parse } from 'parse5';
import { poesisPlatform, solutionHref, commitmentStatus } from '../src/data/poesis-platform.ts';
import {
  poesisUsage,
  validateUsage,
  usageCoverage,
  useCaseStatus,
  useCasesForPain,
  useCasesForFeature,
  useCasesForProduct,
  useCasesForSolution,
  usageValues,
  usageFeatures,
  usageCapabilities,
  usageAffordances,
  valueAnchor,
  valueHref,
  valueStatus,
  valueSupports,
  valueEdges,
  platformValues,
  solutionValues,
  productValues,
  featuresForUseCase,
  capabilitiesForUseCase,
  affordancesForUseCase,
  valuesForUseCase,
  painsForUseCase,
} from '../src/data/usage.ts';
import { profiles } from '../src/data/profiles.ts';
import { pains } from '../src/data/pains.ts';
import { catalogViews, siteNavigation } from '../src/data/site-navigation.ts';

test('usage is separate from platform and covers its stable identity ledger', () => {
  assert.deepEqual(Object.keys(poesisUsage).sort(), ['actorTypes', 'pains', 'useCases']);
  assert.equal(poesisPlatform.solutions.length, 4);
  assert.doesNotThrow(() => validateUsage());
  const coverage = usageCoverage();
  assert.deepEqual(coverage, { features: 67, capabilities: 25, affordances: 6 });
  assert.equal(usageFeatures.length, 67);
  assert.equal(usageCapabilities.length, 25);
  assert.equal(usageAffordances.length, 6);
  assert.equal(usageValues.length, 84);
  assert.equal(poesisUsage.pains.length, 32);
  assert.equal(poesisUsage.actorTypes.length, 26);
  assert.equal(poesisUsage.useCases.length, 68);
  assert.equal(poesisUsage.useCases.filter((useCase) => useCaseStatus(useCase) === 'delivered').length, 4);
  assert.equal(poesisUsage.useCases.filter((useCase) => useCaseStatus(useCase) === 'planned').length, 48);
  assert.equal(poesisUsage.useCases.filter((useCase) => useCaseStatus(useCase) === undefined).length, 16);
  assert.equal(usageValues.filter((value) => valueStatus(value.slug) === undefined).length, 10);
});

test('every identity is a unique, stable slug', () => {
  for (const records of [poesisUsage.useCases, poesisUsage.pains, poesisUsage.actorTypes, usageValues]) {
    const slugs = records.map((record) => record.slug);
    assert.equal(new Set(slugs).size, slugs.length);
    for (const slug of slugs) assert.equal(typeof slug, 'string');
  }
  for (const record of [...poesisUsage.useCases, ...poesisUsage.pains, ...poesisUsage.actorTypes]) {
    assert.match(record.slug, /^[a-z0-9-]+$/);
    assert.equal('id' in record, false);
  }
  for (const value of usageValues) assert.match(value.slug, /^value:/);
});

test('platform items own the references and every reference resolves', () => {
  const caseSlugs = new Set(poesisUsage.useCases.map((useCase) => useCase.slug));
  const painSlugs = new Set(poesisUsage.pains.map((pain) => pain.slug));
  const valueSlugs = new Set(usageValues.map((value) => value.slug));
  const items = [
    ...usageFeatures.map((entry) => entry.feature),
    ...usageCapabilities.map((entry) => entry.capability),
    ...usageAffordances.map((entry) => entry.affordance),
  ];
  for (const item of items) {
    for (const slug of item.values) assert.ok(valueSlugs.has(slug), `${item.slug}: ${slug}`);
    for (const slug of item.pains) assert.ok(painSlugs.has(slug), `${item.slug}: ${slug}`);
    for (const slug of item.useCases) assert.ok(caseSlugs.has(slug), `${item.slug}: ${slug}`);
  }
  // Values carry no relation arrays of their own any more.
  for (const value of usageValues) assert.deepEqual(Object.keys(value).sort(), ['body', 'originalTitle', 'slug', 'title']);
  // The use case states itself and nothing else.
  for (const useCase of poesisUsage.useCases) assert.deepEqual(Object.keys(useCase).sort(), ['actorTypes', 'goal', 'name', 'slug']);
});

test('value ownership follows the item that references it', () => {
  assert.equal(platformValues.length, 6);
  assert.equal(usageValues.filter((value) => valueOwnerDepth(value.slug) === 2).length, 17);
  assert.equal(usageValues.filter((value) => valueOwnerDepth(value.slug) === 3).length, 42);
  for (const value of platformValues) {
    for (const support of valueSupports(value.slug)) assert.equal(support.type, 'affordance');
  }
  for (const solution of poesisPlatform.solutions) {
    for (const value of solutionValues(solution.slug)) {
      for (const support of valueSupports(value.slug)) {
        assert.equal(support.type, 'capability');
        assert.equal(support.slug.split('/')[0], solution.slug);
      }
    }
    for (const product of solution.products) {
      for (const value of productValues(solution.slug, product.slug)) {
        for (const support of valueSupports(value.slug)) {
          assert.equal(support.type, 'feature');
          assert.deepEqual(support.slug.split('/').slice(0, 2), [solution.slug, product.slug]);
        }
      }
    }
  }
  const wrong = structuredClone(usageValues);
  wrong[0] = { ...wrong[0], slug: 'value:wrong-owner/00' };
  assert.throws(() => validateUsage(poesisUsage, wrong), /Invalid value identity/);
  const mixedCase = structuredClone(usageValues);
  mixedCase[0] = { ...mixedCase[0], slug: 'value:Itip/01' };
  assert.throws(() => validateUsage(poesisUsage, mixedCase), /Invalid value identity/);
});

function valueOwnerDepth(slug) {
  const owner = slug.slice('value:'.length).split('/');
  return owner[0] === 'platform' ? 1 : owner.length;
}

test('validation rejects dangling references but accepts independent usage records', () => {
  const duplicate = structuredClone(poesisUsage);
  duplicate.pains.push(duplicate.pains[0]);
  assert.throws(() => validateUsage(duplicate), /Duplicate/);
  const duplicateValues = structuredClone(usageValues);
  duplicateValues.push(duplicateValues[0]);
  assert.throws(() => validateUsage(poesisUsage, duplicateValues), /Duplicate/);
  const dangling = structuredClone(poesisUsage);
  dangling.pains[0].actorTypes = ['unknown'];
  assert.throws(() => validateUsage(dangling), /Unknown/);
  const unreachable = structuredClone(poesisUsage);
  unreachable.useCases.push({ slug: 'orphan-case', name: 'Orphan case', goal: 'No platform item serves it.', actorTypes: ['it-architect'] });
  assert.doesNotThrow(() => validateUsage(unreachable));
  assert.equal(useCaseStatus(unreachable.useCases.at(-1)), undefined);
  const independentValue = { slug: 'value:unmapped-test-benefit', originalTitle: 'Service accountability', title: 'Service accountability', body: 'Clear responsibility for service commitments.' };
  assert.doesNotThrow(() => validateUsage(unreachable, [...usageValues, independentValue]));
  assert.equal(valueStatus(independentValue.slug), undefined);
  assert.equal(valueHref(independentValue), `/values#${valueAnchor(independentValue)}`);
  const danglingCase = structuredClone(poesisUsage);
  danglingCase.useCases = danglingCase.useCases.filter((useCase) => useCase.slug !== 'read-governance-model');
  assert.throws(() => validateUsage(danglingCase), /Unknown|Unreachable/);
});

test('derivation preserves declared coverage without fabricating support for independent needs', () => {
  for (const useCase of poesisUsage.useCases) {
    if (useCaseStatus(useCase) === undefined) {
      assert.deepEqual(featuresForUseCase(useCase.slug), []);
      assert.deepEqual(valuesForUseCase(useCase.slug), []);
      assert.ok(painsForUseCase(useCase.slug).length, useCase.slug);
    } else {
      assert.ok(featuresForUseCase(useCase.slug).length || capabilitiesForUseCase(useCase.slug).length || affordancesForUseCase(useCase.slug).length, useCase.slug);
      assert.ok(valuesForUseCase(useCase.slug).length, useCase.slug);
    }
    for (const value of valuesForUseCase(useCase.slug)) assert.ok(usageValues.includes(value));
    for (const pain of painsForUseCase(useCase.slug)) assert.ok(poesisUsage.pains.includes(pain));
    assert.deepEqual(
      capabilitiesForUseCase(useCase.slug).map((entry) => entry.slug),
      usageCapabilities.filter((entry) => entry.capability.useCases.includes(useCase.slug)).map((entry) => entry.slug),
    );
    assert.deepEqual(
      affordancesForUseCase(useCase.slug).map((entry) => entry.slug),
      usageAffordances.filter((entry) => entry.affordance.useCases.includes(useCase.slug)).map((entry) => entry.slug),
    );
  }
  assert.equal(valueEdges.length, new Set(valueEdges.map((edge) => edge.id)).size);
  assert.equal(usageValues.filter((value) => valueStatus(value.slug) === 'delivered').length, 8);
  for (const value of usageValues) {
    const supports = valueSupports(value.slug);
    assert.equal(valueStatus(value.slug), supports.length ? commitmentStatus(supports.map((support) => support.state)) : undefined);
  }
});

test('use case status uses features or explicit higher-level support without assuming implementation', () => {
  for (const useCase of poesisUsage.useCases) {
    const features = featuresForUseCase(useCase.slug);
    const states = features.length ? features.map((entry) => entry.feature.delivery.state) : [
      ...capabilitiesForUseCase(useCase.slug).map((entry) => entry.capability.delivery.state),
      ...affordancesForUseCase(useCase.slug).map((entry) => entry.affordance.delivery.state),
    ];
    assert.equal(useCaseStatus(useCase), states.length ? commitmentStatus(states) : undefined);
  }
  assert.equal(useCaseStatus({ slug: 'read-governance-model' }), 'delivered');
  assert.equal(useCaseStatus({ slug: 'reconcile-code-evidence' }), 'planned');
  assert.equal(useCaseStatus({ slug: 'no-such-case' }), undefined);
  assert.deepEqual(featuresForUseCase('qualify-processor-interchange'), []);
  assert.equal(useCaseStatus({ slug: 'qualify-processor-interchange' }), 'planned');
  assert.equal(useCaseStatus({ slug: 'agree-domain-typing-contract' }), 'planned');
});

test('mockup and platform tasks reuse scope with only two distinct new features', () => {
  const additions = [
    'configure-collection-boundaries', 'recover-incomplete-collection', 'review-evidence-refresh',
    'review-operation-privileges', 'restore-identity-synchronization', 'conduct-governance-session',
    'resolve-blocked-change', 'retrieve-decision-basis', 'reuse-review-lens', 'inspect-subject-perspectives',
    'reuse-governance-selection', 'resolve-competing-obligations', 'inspect-vocabulary-coverage',
    'maintain-artifact-bindings', 'preview-artifact-bindings', 'constrain-generated-narrative',
    'operate-recurring-reports', 'investigate-artifact-failure', 'propose-appraisal-remediation',
    'bind-obligations-to-scope', 'assess-invalidated-dependencies', 'agree-evidence-preservation',
    'qualify-rule-revision', 'agree-domain-typing-contract', 'qualify-processor-interchange',
    'approve-agent-mandate', 'qualify-model-routing', 'qualify-host-instructions',
    'reconcile-parallel-agent-outputs', 'assess-application-retirement',
  ];
  for (const slug of additions) {
    const useCase = poesisUsage.useCases.find((item) => item.slug === slug);
    assert.ok(useCase, slug);
    assert.equal(useCaseStatus(useCase), 'planned', slug);
    assert.ok(capabilitiesForUseCase(slug).length, slug);
    assert.ok(affordancesForUseCase(slug).length, slug);
    assert.ok(painsForUseCase(slug).length, slug);
    assert.ok(valuesForUseCase(slug).length, slug);
    for (const affordance of affordancesForUseCase(slug)) {
      assert.ok(capabilitiesForUseCase(slug).some((entry) => affordance.affordance.relations.capabilities.includes(entry.slug)), slug);
    }
  }
  for (const slug of ['identity-provider-synchronization', 'governance-review-sessions']) {
    const entry = usageFeatures.find((item) => item.slug === `itip/web-application/${slug}`);
    assert.equal(entry.feature.delivery.state, 'planned');
    assert.equal(entry.feature.milestone.version, '1.x');
    assert.equal(entry.feature.milestone.shipped, undefined);
  }
  assert.equal(usageCapabilities.length, 25);
  assert.equal(usageAffordances.length, 6);
});

test('incident response reaches business processes and owners without claiming causality or platform scope', () => {
  const incident = poesisUsage.useCases.find((useCase) => useCase.slug === 'trace-incident-business-impact');
  assert.ok(incident.actorTypes.includes('it-incident-commander'));
  assert.ok(incident.actorTypes.includes('it-business-process-owner'));
  assert.match(incident.goal, /observed software incident.*deployed components.*service dependencies.*business processes and owners/);
  assert.match(incident.goal, /confirmed disruption, possible exposure and missing evidence/);
  assert.equal(useCaseStatus(incident), undefined);
  assert.deepEqual(painsForUseCase(incident.slug).map((pain) => pain.slug), ['it-incident-business-impact-blindness']);
  assert.deepEqual(valuesForUseCase(incident.slug), []);
  assert.equal(valueStatus('value:business-informed-incident-response'), undefined);
  for (const actor of poesisUsage.actorTypes) {
    assert.equal(actor.domainSlug, 'it');
    assert.ok(poesisUsage.useCases.some((useCase) => useCase.actorTypes.includes(actor.slug)), actor.slug);
  }
});

test('lookups stay consistent with the declarations that produced them', () => {
  for (const pain of poesisUsage.pains) {
    assert.deepEqual(useCasesForPain(pain.slug), poesisUsage.useCases.filter((useCase) => painsForUseCase(useCase.slug).includes(pain)));
  }
  assert.deepEqual(useCasesForPain('manual-decision-handoff').map((useCase) => useCase.slug), ['transfer-service-ownership', 'handover-operational-evidence']);
  for (const entry of usageFeatures) {
    assert.deepEqual(useCasesForFeature(entry.slug).map((useCase) => useCase.slug), poesisUsage.useCases.filter((useCase) => entry.feature.useCases.includes(useCase.slug)).map((useCase) => useCase.slug));
  }
  assert.deepEqual(useCasesForFeature('no/such/feature'), []);
  for (const solution of poesisPlatform.solutions) {
    const fromProducts = new Set(solution.products.flatMap((product) => useCasesForProduct(solution.slug, product.slug).map((useCase) => useCase.slug)));
    for (const slug of fromProducts) assert.ok(useCasesForSolution(solution.slug).some((useCase) => useCase.slug === slug));
  }
});

test('legacy adapters retain canonical content and identity without an alternate ontology', () => {
  assert.equal(profiles.length, 5);
  for (const profile of profiles) assert.equal(profile, poesisUsage.actorTypes.find((actor) => actor.slug === profile.slug));
  for (const slug of ['it-cto', 'it-architect', 'it-ciso', 'it-platform', 'it-head-of-ai']) {
    assert.equal(poesisUsage.actorTypes.find((actor) => actor.slug === slug)?.kind, 'human');
  }
  assert.ok(poesisUsage.actorTypes.some((actor) => actor.kind === 'system'));
  assert.equal(poesisUsage.actorTypes.filter((actor) => actor.kind === 'system').length, 3);
  for (const actor of poesisUsage.actorTypes) assert.equal('cta' in actor, false);
  for (const pain of pains) {
    const canonical = poesisUsage.pains.find((candidate) => candidate.slug === pain.slug);
    assert.ok(canonical);
    for (const key of ['pain', 'cost', 'phase']) assert.equal(pain[key], canonical[key]);
    assert.deepEqual(pain.tags, canonical.tags);
    assert.equal('addressedBy' in canonical, false);
    assert.equal('remedy' in canonical, false);
    assert.equal('domainSlug' in canonical, false);
    assert.ok(pain.addressedBy.length);
  }
  // Both phases of the homepage bottleneck diagram still resolve.
  assert.ok(pains.some((pain) => pain.phase === 'legacy'));
  assert.ok(pains.some((pain) => pain.phase === 'genai'));
});

test('anchors and hrefs keep the published shape', () => {
  assert.equal(valueAnchor({ slug: 'value:platform/analysis-power' }), 'value-platform-analysis-power');
  assert.equal(valueAnchor({ slug: 'value:itip/01' }), 'value-itip-01');
  assert.equal(valueAnchor({ slug: 'value:itip/web-application/01' }), 'value-itip-web-application-01');
  assert.equal(valueHref({ slug: 'value:platform/analysis-power' }), '/#value-platform-analysis-power');
  assert.equal(valueHref({ slug: 'value:itip/01' }), '/solutions/itip#value-itip-01');
  assert.equal(valueHref({ slug: 'value:itip/web-application/01' }), '/solutions/itip/products/web-application#value-itip-web-application-01');
  for (const solution of poesisPlatform.solutions) assert.equal(solutionHref(solution), `/solutions/${solution.slug}`);
});

test('every catalog entity type is browsable from one navigation section', () => {
  assert.deepEqual(catalogViews.map((view) => view.href), ['/usage', '/actors', '/pains', '/values', '/affordances', '/capabilities', '/features']);
  const platform = siteNavigation.find((group) => group.label === 'Platform');
  const [needs, comparisons] = platform.sections;
  assert.equal(needs.label, 'By need & coverage');
  assert.equal(comparisons.label, 'By comparison');
  assert.deepEqual(needs.items, catalogViews);
  // The solution shortcuts are reachable once, from the solutions section only.
  const destinations = platform.sections.flatMap((section) => section.items.flatMap((item) => [item.href, ...(item.children ?? []).map((child) => child.href)]));
  assert.equal(destinations.filter((href) => href.startsWith('/solutions')).length, new Set(destinations.filter((href) => href.startsWith('/solutions'))).size);
});

test('workspace SEO retains registered platform-linked tasks and all usage titles stay distinct', { skip: process.env.CHECK_WORKSPACE_PORTFOLIO !== '1' }, () => {
  const seo = readFileSync(new URL('../../strategy/seo.md', import.meta.url), 'utf8');
  const section = seo.split('## Usage Page Keyword Ownership (2026-09-15)')[1].split('\n## ')[0];
  const coveredCases = poesisUsage.useCases.filter((useCase) => useCaseStatus(useCase) !== undefined);
  for (const useCase of coveredCases) assert.ok(section.includes(`| \`/usage/${useCase.slug}\` | ${useCase.name} |`), useCase.slug);
  assert.equal((section.match(/\| `\/usage/g) ?? []).length, coveredCases.length + 1);
  for (const view of catalogViews) assert.ok(section.includes(`| \`${view.href}\` |`), view.href);
  assert.equal(new Set(poesisUsage.useCases.map((useCase) => useCase.name.toLowerCase())).size, poesisUsage.useCases.length);
});

const attr = (node, name) => node.attrs?.find((attribute) => attribute.name === name)?.value;
const elements = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => elements(child, predicate))];
const text = (node) => (node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join(''));
const documents = new Map();
const built = (pathname) => {
  const path = pathname.replace(/\/$/, '') || '';
  if (!documents.has(path)) documents.set(path, parse(readFileSync(new URL(`../dist${path}/index.html`, import.meta.url), 'utf8')));
  return documents.get(path);
};

test('built usage pages retain identity, binary badges, contextual links and SEO title identity', { skip: process.env.CHECK_BUILT_USAGE !== '1' }, () => {
  const index = built('/usage');
  const sitemap = readFileSync(new URL('../dist/sitemap-0.xml', import.meta.url), 'utf8');
  assert.equal(elements(index, (node) => attr(node, 'data-usage-case')).length, poesisUsage.useCases.length);
  for (const useCase of poesisUsage.useCases) {
    const card = elements(index, (node) => attr(node, 'data-usage-case') === useCase.slug)[0];
    assert.equal(attr(card, 'data-pains'), painsForUseCase(useCase.slug).map((pain) => pain.slug).join(' '));
    assert.equal(attr(card, 'data-actors'), useCase.actorTypes.join(' '));
    assert.ok(elements(card, (node) => attr(node, 'href') === `/usage/${useCase.slug}`).length);
    const badges = elements(card, (node) => attr(node, 'data-delivery-status'));
    assert.equal(badges.length, useCaseStatus(useCase) === undefined ? 0 : 1);
    if (badges.length) assert.equal(attr(badges[0], 'data-delivery-status'), useCaseStatus(useCase));
    assert.ok(sitemap.includes(`/usage/${useCase.slug}/</loc>`), `sitemap ${useCase.slug}`);
  }
  for (const entity of [...poesisUsage.actorTypes]) assert.equal(elements(built('/actors'), (node) => attr(node, 'id') === entity.slug).length, 1, entity.slug);
  for (const entity of poesisUsage.pains) assert.equal(elements(built('/pains'), (node) => attr(node, 'id') === entity.slug).length, 1, entity.slug);
  for (const value of usageValues) {
    const item = elements(built('/values'), (node) => attr(node, 'id') === valueAnchor(value));
    assert.equal(item.length, 1, value.slug);
    const badges = elements(item[0], (node) => attr(node, 'data-delivery-status'));
    assert.equal(badges.length, valueStatus(value.slug) === undefined ? 0 : 1, value.slug);
    if (valueStatus(value.slug) === undefined) {
      assert.match(text(item[0]), /No platform coverage declared/);
      assert.equal(elements(item[0], (node) => attr(node, 'href')?.startsWith('/solutions')).length, 0);
    }
  }
  for (const useCase of poesisUsage.useCases) {
    const document = built(`/usage/${useCase.slug}`);
    const heading = elements(document, (node) => node.tagName === 'h1');
    assert.equal(heading.length, 1);
    assert.equal(text(heading[0]), useCase.name);
    if (useCaseStatus(useCase) === undefined) {
      assert.equal(elements(document, (node) => attr(node, 'data-delivery-status')).length, 0);
      assert.match(text(document), /No platform coverage declared/);
      assert.equal(elements(document, (node) => attr(node, 'data-usage-value')).length, 0);
    }
    assert.ok(text(elements(document, (node) => node.tagName === 'title')[0]).startsWith(useCase.name));
    assert.ok(elements(document, (node) => node.tagName === 'h2' && text(node) === 'Pain points').length);
    for (const entry of featuresForUseCase(useCase.slug)) assert.ok(elements(document, (node) => attr(node, 'data-usage-feature') === entry.slug).length, `${useCase.slug}: ${entry.slug}`);
    for (const entry of capabilitiesForUseCase(useCase.slug)) assert.ok(elements(document, (node) => attr(node, 'data-usage-capability') === entry.slug).length, `${useCase.slug}: ${entry.slug}`);
    for (const entry of affordancesForUseCase(useCase.slug)) assert.ok(elements(document, (node) => attr(node, 'data-usage-affordance') === entry.slug).length, `${useCase.slug}: ${entry.slug}`);
    for (const value of valuesForUseCase(useCase.slug)) {
      const item = elements(document, (node) => attr(node, 'data-usage-value') === value.slug)[0];
      assert.ok(item, `${useCase.slug}: ${value.slug}`);
      assert.equal(attr(elements(item, (node) => attr(node, 'data-delivery-status'))[0], 'data-delivery-status'), valueStatus(value.slug));
    }
    for (const pain of painsForUseCase(useCase.slug)) assert.ok(elements(document, (node) => attr(node, 'data-usage-pain') === pain.slug).length, `${useCase.slug}: ${pain.slug}`);
    for (const link of elements(document, (node) => node.tagName === 'a')) {
      const href = attr(link, 'href');
      if (!href || (!href.startsWith('/') && !href.startsWith('#'))) continue;
      const target = new URL(href, `https://poesis.cloud/usage/${useCase.slug}`);
      if (!(target.pathname === '/' || catalogViews.some((view) => target.pathname === view.href) || target.pathname.startsWith('/usage') || target.pathname.startsWith('/solutions'))) continue;
      const destination = built(target.pathname);
      if (target.hash) assert.ok(elements(destination, (node) => attr(node, 'id') === decodeURIComponent(target.hash.slice(1))).length, `${useCase.slug}: ${href}`);
    }
  }
  for (const [page, items, anchor, state] of [
    ['/features', usageFeatures, (entry) => `feature-${entry.slug.replace(/\//g, '-')}`, (entry) => entry.feature.delivery.state],
    ['/capabilities', usageCapabilities, (entry) => `capability-${entry.slug.replace(/\//g, '-')}`, (entry) => entry.capability.delivery.state],
    ['/affordances', usageAffordances, (entry) => `affordance-${entry.slug}`, (entry) => entry.affordance.delivery.state],
  ]) {
    const document = built(page);
    for (const entry of items) {
      const item = elements(document, (node) => attr(node, 'id') === anchor(entry));
      assert.equal(item.length, 1, `${page}: ${entry.slug}`);
      // The published badge is the binary commitment, so a partial state must never surface as delivered.
      assert.equal(attr(elements(item[0], (node) => attr(node, 'data-delivery-status'))[0], 'data-delivery-status'), commitmentStatus([state(entry)]), `${page}: ${entry.slug}`);
    }
  }
  const homepage = built('/');
  for (const entity of [...profiles, ...pains]) assert.ok(elements(homepage, (node) => attr(node, 'id') === entity.slug).length, `legacy ${entity.slug}`);
  for (const solution of poesisPlatform.solutions) {
    assert.ok(elements(built(solutionHref(solution)), (node) => attr(node, 'data-usage-case')).length);
    for (const product of solution.products) {
      const document = built(`${solutionHref(solution)}/products/${product.slug}`);
      for (const feature of product.features) {
        const section = elements(document, (node) => attr(node, 'id') === feature.slug)[0];
        assert.ok(elements(section, (node) => node.tagName === 'a' && attr(node, 'href')?.startsWith('/usage/')).length, `${product.slug}/${feature.slug}`);
      }
    }
  }
});

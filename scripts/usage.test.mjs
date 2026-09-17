/**
 * Usage-model tests.
 *
 * Platform items serve use cases; cases own actors, addressed pains and
 * realized values. These tests cover graph ownership, conservative coverage,
 * static catalog navigation and preservation of public identities.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { parse } from 'parse5';
import { poesisPlatform, solutionHref, commitmentStatus, capabilityStatus, affordanceStatus } from '../src/data/poesis-platform.ts';
import {
  poesisUsage,
  validateUsage,
  usageCoverage,
  useCaseStatus,
  useCasesForPain,
  useCasesForValue,
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
  valueCoverage,
  painsForItem,
  valuesForItem,
} from '../src/data/usage.ts';
import { profiles } from '../src/data/profiles.ts';
import { pains, homepagePainGroups } from '../src/data/pains.ts';
import { catalogSnapshot, catalogRelations, platformRelations, relationRules } from '../src/data/catalog.ts';
import { catalogTypes, catalogPath, catalogHref, filterCatalog } from '../src/data/catalog-query.ts';
import { catalogViews, siteNavigation } from '../src/data/site-navigation.ts';
import { projectPilotCatalog } from '../src/data/pilot-catalog.ts';
import { emailHandoff, filterCases, normalizeSelection, safePilotJson, selectionFromQuery, selectionQuery, serializeBrief } from '../src/data/pilot.ts';

test('pilot projection preserves canonical needs, relationships and delivery states', () => {
  const catalog = projectPilotCatalog();
  assert.equal(catalog.values.length, usageValues.length);
  assert.equal(catalog.pains.length, poesisUsage.pains.length);
  for (const pain of catalog.pains) assert.equal(pain.href, `/catalog/pains#${pain.slug}`);
  for (const useCase of catalog.cases) {
    assert.deepEqual(useCase.values, valuesForUseCase(useCase.slug).map((value) => value.slug));
    assert.deepEqual(useCase.pains, painsForUseCase(useCase.slug).map((pain) => pain.slug));
    assert.equal(useCase.state, useCaseStatus(useCase) ?? null);
    assert.ok(useCase.supports.every((key) => catalog.supports.some((support) => support.key === key)));
  }
  for (const value of catalog.values) {
    assert.deepEqual(value.supports.map((key) => catalog.supports.find((support) => support.key === key).state), valueSupports(value.slug).map((support) => support.state));
  }
});

test('pilot query accepts only deduplicated canonical selections, not personal details', () => {
  const catalog = projectPilotCatalog();
  const slug = catalog.values[0].slug;
  const selection = selectionFromQuery(new URLSearchParams(`value=${encodeURIComponent(slug)}&value=${encodeURIComponent(slug)}&case=unknown&scope=private`), catalog);
  assert.deepEqual(selection, { values: [slug], pains: [], cases: [] });
  assert.equal(selectionQuery(selection, catalog), `value=${encodeURIComponent(slug)}`);
  assert.equal(selectionQuery({ values: ['unknown'], pains: [], cases: [] }, catalog), '');
});

test('pilot suggestions use any explicit need relation, never shared actors', () => {
  const catalog = projectPilotCatalog();
  const selection = { values: [catalog.values[0].slug], pains: [catalog.pains[0].slug], cases: [] };
  const expected = catalog.cases.filter((record) => record.values.includes(selection.values[0]) || record.pains.includes(selection.pains[0]));
  assert.deepEqual(filterCases(catalog, selection), expected);
  const unsupported = catalog.values.find((value) => value.slug === 'value:service-accountability');
  assert.ok(unsupported);
  assert.deepEqual(filterCases(catalog, { values: [unsupported.slug], pains: [], cases: [] }).map((record) => record.slug), ['accept-service-baseline', 'transfer-service-ownership']);
  assert.deepEqual(filterCases(catalog, selection, 'nonexistent exact phrase'), []);
  const withActor = expected.find((record) => record.actors.length);
  assert.ok(withActor);
  assert.deepEqual(filterCases(catalog, selection, '', withActor.actors[0]), expected.filter((record) => record.actors.includes(withActor.actors[0])));
  assert.ok(filterCases(catalog, selection, withActor.description).some((record) => record.slug === withActor.slug));
  assert.deepEqual(selection.cases, []);
});

test('pilot exports support value-only, pain-only, partial and unsupported scope honestly', () => {
  const catalog = projectPilotCatalog();
  const empty = normalizeSelection({}, catalog);
  assert.match(serializeBrief(catalog, empty), /^No registered/);
  const unsupported = catalog.values.find((value) => value.slug === 'value:service-accountability');
  const brief = serializeBrief(catalog, { ...empty, values: [unsupported.slug] }, { criteria: '<script>alert("literal")</script>', timing: 'My own window' });
  assert.match(brief, /Constituent: Accept a service responsibility baseline \| No registered support/);
  assert.match(brief, /Gap: no registered platform support/);
  assert.match(brief, /ITIP \+ SIE SaaS/);
  assert.match(brief, /<script>alert\("literal"\)<\/script>/);
  assert.match(brief, /My own window/);
  assert.match(brief, /commercial terms/);
  assert.match(serializeBrief(catalog, { ...empty, pains: [catalog.pains[0].slug] }), /value\/pain-led brief remains valid/);
  const cases = catalog.cases.filter((record) => record.state === 'partial' || record.state === null);
  const withCases = serializeBrief(catalog, { ...empty, cases: cases.map((record) => record.slug) });
  assert.match(withCases, /Registered support: Partial/);
  assert.match(withCases, /No registered support \(not a planned-delivery claim\)/);
  const lines = withCases.split('\n').filter((line) => line.startsWith('- ') && line.includes(' | '));
  assert.equal(new Set(lines).size, lines.length);
  const longEmail = emailHandoff(brief.repeat(10));
  assert.equal(longEmail.shortened, true);
  assert.ok(longEmail.href.length < 1800);
  assert.equal(emailHandoff('A short brief').shortened, false);
  assert.match(longEmail.href, /^mailto:clement.cazaud@outlook.com/);
  assert.doesNotMatch(safePilotJson({ ...catalog, actors: [{ slug: 'safe', name: '</script>&\u2028' }] }), /<|>|&|\u2028/);
});

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
  assert.equal(poesisUsage.useCases.filter((useCase) => useCaseStatus(useCase) === 'delivered').length, 10);
  assert.equal(poesisUsage.useCases.filter((useCase) => useCaseStatus(useCase) === 'partial').length, 19);
  assert.equal(poesisUsage.useCases.filter((useCase) => useCaseStatus(useCase) === 'planned').length, 23);
  assert.equal(poesisUsage.useCases.filter((useCase) => useCaseStatus(useCase) === undefined).length, 16);
  assert.equal(valueStatus('value:service-accountability'), undefined);
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
    assert.equal('values' in item, false);
    assert.equal('pains' in item, false);
    for (const value of valuesForItem(item)) assert.ok(valueSlugs.has(value.slug));
    for (const pain of painsForItem(item)) assert.ok(painSlugs.has(pain.slug));
    for (const slug of item.useCases) assert.ok(caseSlugs.has(slug), `${item.slug}: ${slug}`);
  }
  for (const value of usageValues) assert.deepEqual(Object.keys(value).sort(), ['body', 'originalTitle', 'slug', 'title']);
  for (const pain of poesisUsage.pains) assert.deepEqual(Object.keys(pain).sort(), ['cost', 'pain', 'slug', 'tags']);
  for (const useCase of poesisUsage.useCases) assert.deepEqual(Object.keys(useCase).sort(), ['actorTypes', 'addressedPains', 'goal', 'name', 'slug', 'values']);
});

test('value ownership preserves placement while support follows constituent use cases', () => {
  assert.equal(platformValues.length, 6);
  assert.equal(usageValues.filter((value) => valueOwnerDepth(value.slug) === 2).length, 17);
  assert.equal(usageValues.filter((value) => valueOwnerDepth(value.slug) === 3).length, 42);
  assert.ok(valueSupports(platformValues[0].slug).some((support) => support.type === 'feature'));
  for (const solution of poesisPlatform.solutions) {
    for (const value of solutionValues(solution.slug)) {
      assert.ok(valueHref(value).startsWith(`/solutions/${solution.slug}#`));
    }
    for (const product of solution.products) {
      for (const value of productValues(solution.slug, product.slug)) {
        assert.ok(valueHref(value).startsWith(`/solutions/${solution.slug}/products/${product.slug}#`));
      }
    }
  }
  const wrong = structuredClone(usageValues);
  const wrongGraph = structuredClone(poesisUsage);
  for (const useCase of wrongGraph.useCases) useCase.values = useCase.values.map((slug) => slug === wrong[0].slug ? 'value:wrong-owner/00' : slug);
  wrong[0] = { ...wrong[0], slug: 'value:wrong-owner/00' };
  assert.throws(() => validateUsage(wrongGraph, wrong), /Invalid value identity/);
  const mixedCase = structuredClone(usageValues);
  const mixedGraph = structuredClone(poesisUsage);
  for (const useCase of mixedGraph.useCases) useCase.values = useCase.values.map((slug) => slug === mixedCase[0].slug ? 'value:Itip/01' : slug);
  mixedCase[0] = { ...mixedCase[0], slug: 'value:Itip/01' };
  assert.throws(() => validateUsage(mixedGraph, mixedCase), /Invalid value identity/);
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
  dangling.useCases[0].actorTypes = ['unknown'];
  assert.throws(() => validateUsage(dangling), /Unknown/);
  const unreachable = structuredClone(poesisUsage);
  unreachable.useCases.push({ slug: 'orphan-case', name: 'Orphan case', goal: 'No platform item serves it.', actorTypes: ['it-architect'], addressedPains: [], values: [] });
  assert.doesNotThrow(() => validateUsage(unreachable));
  assert.equal(useCaseStatus(unreachable.useCases.at(-1)), undefined);
  const independentValue = { slug: 'value:unmapped-test-benefit', originalTitle: 'Service accountability', title: 'Service accountability', body: 'Clear responsibility for service commitments.' };
  assert.doesNotThrow(() => validateUsage(unreachable, [...usageValues, independentValue]));
  assert.equal(valueStatus(independentValue.slug), undefined);
  assert.equal(valueHref(independentValue), `/catalog/values#${valueAnchor(independentValue)}`);
  const danglingCase = structuredClone(poesisUsage);
  danglingCase.useCases = danglingCase.useCases.filter((useCase) => useCase.slug !== 'read-governance-model');
  assert.throws(() => validateUsage(danglingCase), /Unknown|Unreachable/);
});

test('derivation preserves declared coverage without fabricating support for independent needs', () => {
  for (const useCase of poesisUsage.useCases) {
    if (useCaseStatus(useCase) === undefined) {
      assert.deepEqual(featuresForUseCase(useCase.slug), []);
      assert.deepEqual(valuesForUseCase(useCase.slug).map((value) => value.slug), useCase.values);
      assert.ok(painsForUseCase(useCase.slug).length, useCase.slug);
    } else {
      assert.ok(featuresForUseCase(useCase.slug).length || capabilitiesForUseCase(useCase.slug).length || affordancesForUseCase(useCase.slug).length, useCase.slug);
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
  for (const value of usageValues) {
    assert.deepEqual(useCasesForValue(value.slug).map((useCase) => useCase.slug), poesisUsage.useCases.filter((useCase) => useCase.values.includes(value.slug)).map((useCase) => useCase.slug));
    const states = valueCoverage(value.slug).map((entry) => entry.state);
    assert.equal(valueStatus(value.slug), states.some(Boolean) ? commitmentStatus(states.map((state) => state ?? 'planned')) : undefined);
    if (valueStatus(value.slug) === 'delivered') assert.ok(states.every((state) => state === 'delivered'));
  }
});

test('use case status uses features or explicit higher-level support without assuming implementation', () => {
  for (const useCase of poesisUsage.useCases) {
    const features = featuresForUseCase(useCase.slug);
    const states = features.length ? features.map((entry) => entry.feature.delivery.state) : [
      ...capabilitiesForUseCase(useCase.slug).map((entry) => capabilityStatus(entry.solution, entry.capability)),
      ...affordancesForUseCase(useCase.slug).map((entry) => affordanceStatus(entry.affordance)),
    ];
    assert.equal(useCaseStatus(useCase), states.length ? commitmentStatus(states) : undefined);
  }
  assert.equal(useCaseStatus({ slug: 'read-governance-model' }), 'delivered');
  assert.equal(useCaseStatus({ slug: 'reconcile-code-evidence' }), 'partial');
  assert.equal(useCaseStatus({ slug: 'no-such-case' }), undefined);
  assert.deepEqual(featuresForUseCase('qualify-processor-interchange'), []);
  assert.equal(useCaseStatus({ slug: 'qualify-processor-interchange' }), 'partial');
  assert.equal(useCaseStatus({ slug: 'agree-domain-typing-contract' }), 'partial');
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
  // Six of these tasks are already served by shipped milestones the products reached; four are partly served.
  const served = new Set([
    'retrieve-decision-basis', 'assess-invalidated-dependencies', 'agree-evidence-preservation',
    'approve-agent-mandate', 'qualify-model-routing', 'qualify-host-instructions',
  ]);
  const partly = new Set(['review-operation-privileges', 'agree-domain-typing-contract', 'qualify-processor-interchange', 'reconcile-parallel-agent-outputs']);
  for (const slug of additions) {
    const useCase = poesisUsage.useCases.find((item) => item.slug === slug);
    assert.ok(useCase, slug);
    assert.equal(useCaseStatus(useCase), served.has(slug) ? 'delivered' : partly.has(slug) ? 'partial' : 'planned', slug);
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
  assert.deepEqual(valuesForUseCase(incident.slug).map((value) => value.slug), ['value:business-informed-incident-response']);
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
  assert.deepEqual(useCasesForPain('manual-decision-handoff').map((useCase) => useCase.slug), ['retrieve-decision-basis', 'transfer-service-ownership', 'handover-operational-evidence', 'reuse-delivery-evidence']);
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
    for (const key of ['pain', 'cost']) assert.equal(pain[key], canonical[key]);
    assert.equal('phase' in pain, false);
    assert.equal('phase' in canonical, false);
    assert.deepEqual(pain.tags, canonical.tags);
    assert.equal('addressedBy' in canonical, false);
    assert.equal('remedy' in canonical, false);
    assert.equal('domainSlug' in canonical, false);
    assert.deepEqual(pain.addressedBy.map((ref) => `${ref.solution}/${ref.product}/${ref.feature}`), usageFeatures.filter((entry) => painsForItem(entry.feature).some((candidate) => candidate.slug === pain.slug)).map((entry) => entry.slug));
  }
  assert.equal(pains.length, poesisUsage.pains.length);
  assert.ok(pains.some((pain) => !pain.addressedBy.length));
});

test('use cases validate owned value and pain references while independent records own none', () => {
  for (const references of [['unknown'], [usageValues[0].slug, usageValues[0].slug]]) {
    const graph = structuredClone(poesisUsage);
    graph.useCases[0].values = references;
    assert.throws(() => validateUsage(graph), /Unknown realized value|Duplicate realized value/);
  }
  for (const references of [['unknown'], ['it-tool-silos', 'it-tool-silos']]) {
    const graph = structuredClone(poesisUsage);
    graph.useCases[0].addressedPains = references;
    assert.throws(() => validateUsage(graph), /Unknown addressed pain|Duplicate addressed pain/);
  }
  const graph = structuredClone(poesisUsage);
  graph.pains.push({ slug: 'independent-test-pain', pain: 'An independent pain', cost: 'Unaddressed cost', tags: ['Test'] });
  assert.doesNotThrow(() => validateUsage(graph));
});

test('composite status cannot hide missing constituent support behind delivered members', () => {
  const value = { slug: 'value:test-composite', originalTitle: 'Test composition', title: 'Test composition', body: 'Test coverage' };
  const delivered = poesisUsage.useCases.find((useCase) => useCase.slug === 'read-governance-model');
  const unsupported = poesisUsage.useCases.find((useCase) => useCase.slug === 'accept-service-baseline');
  usageValues.push(value);
  try {
    delivered.values.push(value.slug);
    unsupported.values.push(value.slug);
    assert.equal(useCaseStatus(delivered), 'delivered');
    assert.equal(useCaseStatus(unsupported), undefined);
    assert.equal(valueStatus(value.slug), 'partial');
    delivered.values.pop();
    assert.equal(valueStatus(value.slug), undefined);
    delivered.values.push(value.slug);
    unsupported.values.pop();
    assert.equal(valueStatus(value.slug), 'delivered');
  } finally {
    delivered.values = delivered.values.filter((slug) => slug !== value.slug);
    unsupported.values = unsupported.values.filter((slug) => slug !== value.slug);
    usageValues.pop();
  }
});

test('catalog navigation exposes only qualified direct relations in the declared order', () => {
  assert.deepEqual(relationRules, {
    affordance: [
      { qualifier: 'Addresses', targets: ['pains'] }, { qualifier: 'Supports', targets: ['values'] }, { qualifier: 'Serves', targets: ['usage'] },
      { qualifier: 'Used by', targets: ['actors'] }, { qualifier: 'Realized by', targets: ['capabilities'] },
    ],
    capability: [
      { qualifier: 'Addresses', targets: ['pains'] }, { qualifier: 'Supports', targets: ['values'] }, { qualifier: 'Serves', targets: ['usage'] },
      { qualifier: 'Used by', targets: ['actors'] }, { qualifier: 'Realized by', targets: ['features'] },
    ],
    feature: [
      { qualifier: 'Addresses', targets: ['pains'] }, { qualifier: 'Supports', targets: ['values'] },
      { qualifier: 'Serves', targets: ['usage'] }, { qualifier: 'Used by', targets: ['actors'] },
    ],
    platform: [{ qualifier: 'Offers', targets: ['affordances'] }, { qualifier: 'Characterized by', targets: ['qualities'] }, { qualifier: 'Composed of', targets: ['solutions'] }],
    solution: [{ qualifier: 'Provides', targets: ['capabilities'] }, { qualifier: 'Characterized by', targets: ['qualities'] }, { qualifier: 'Contains', targets: ['products'] }],
    product: [{ qualifier: 'Implements', targets: ['features'] }, { qualifier: 'Characterized by', targets: ['qualities'] }],
    actor: [{ qualifier: 'Supported by', targets: ['affordances', 'capabilities', 'features'] }, { qualifier: 'Experiences', targets: ['pains'] }, { qualifier: 'Pursues', targets: ['usage'] }],
    pain: [{ qualifier: 'Addressed by', targets: ['affordances', 'capabilities', 'features'] }, { qualifier: 'Experienced by', targets: ['actors'] }, { qualifier: 'Addressed through', targets: ['usage'] }],
    usage: [{ qualifier: 'Supported by', targets: ['affordances', 'capabilities', 'features'] }, { qualifier: 'Addresses', targets: ['pains'] }, { qualifier: 'Realizes', targets: ['values'] }, { qualifier: 'Performed by', targets: ['actors'] }],
    value: [{ qualifier: 'Supported by', targets: ['affordances', 'capabilities', 'features'] }, { qualifier: 'Realized through', targets: ['usage'] }],
    quality: [],
  });
  for (const [source, record] of Object.entries(catalogSnapshot.sources).filter(([source]) => !source.startsWith('homepage:'))) {
    const type = source === 'platform' ? 'platform' : source.split(':')[0];
    const rules = relationRules[type];
    const allowed = new Set(rules.flatMap((rule) => rule.targets));
    assert.deepEqual(catalogTypes.filter((target) => record.targets[target].length && !allowed.has(target)), [], `${source}: indirect target`);
    const groups = catalogRelations(source);
    const expected = rules.flatMap((rule) => {
      const related = rule.targets.filter((target) => record.targets[target].length);
      return related.length ? [{ qualifier: rule.qualifier, targets: related }] : [];
    });
    assert.deepEqual(groups.map((group) => ({ qualifier: group.qualifier, targets: group.links.map((link) => new URL(link.href, 'https://poesis.cloud').pathname.split('/').at(-1)) })), expected, source);
    for (const group of groups) for (const link of group.links) {
      const url = new URL(link.href, 'https://poesis.cloud');
      const target = url.pathname.split('/').at(-1);
      assert.equal(url.searchParams.get('source'), source);
      assert.equal(link.href, catalogHref(target, source));
      assert.ok(filterCatalog(catalogSnapshot, target, url.searchParams).slugs.length);
    }
  }
  assert.deepEqual(catalogRelations('affordance:norm-evaluation').flatMap((group) => group.links.map((link) => new URL(link.href, 'https://poesis.cloud').pathname.split('/').at(-1))), ['pains', 'values', 'usage', 'actors', 'capabilities']);
  const source = 'capability:itip/automatic-it-truth-sourcing';
  assert.equal(catalogHref('values', source), '/catalog/values?source=capability%3Aitip%2Fautomatic-it-truth-sourcing');
  const capability = usageCapabilities.find((entry) => `capability:${entry.slug}` === source);
  assert.deepEqual(catalogSnapshot.sources[source].targets.features, capability.capability.relations.features.map((reference) => `${capability.solution.slug}/${reference}`));
  for (const feature of catalogSnapshot.sources[source].targets.features) assert.equal(catalogSnapshot.sources[`feature:${feature}`].targets.capabilities.length, 0);
});

test('catalog filters intersect source actor and pain, reject unknowns, and restore from URLs', () => {
  const source = 'capability:itip/automatic-it-truth-sourcing';
  const query = new URLSearchParams({ source, actor: 'it-platform', pain: 'it-acquisition-blind-spots' });
  const expected = ['configure-collection-boundaries', 'recover-incomplete-collection', 'review-evidence-refresh'];
  assert.deepEqual(filterCatalog(catalogSnapshot, 'usage', query).slugs, expected);
  assert.deepEqual(filterCatalog(catalogSnapshot, 'usage', new URLSearchParams(query.toString())).slugs, expected);
  for (const type of catalogTypes) {
    for (const invalid of ['source=__proto__', 'source=constructor', 'source=feature%3Aunknown', 'source=', 'actor=unknown', 'pain=unknown', `source=${encodeURIComponent(source)}&source=unknown`]) {
      const selection = filterCatalog(catalogSnapshot, type, new URLSearchParams(invalid));
      assert.equal(selection.invalid, true, invalid);
      assert.deepEqual(selection.slugs, []);
    }
    assert.equal(filterCatalog(catalogSnapshot, type, new URLSearchParams()).slugs.length, catalogSnapshot.records[type].length);
  }
  const original = query.toString();
  query.delete('source'); query.delete('actor'); query.delete('pain');
  assert.equal(filterCatalog(catalogSnapshot, 'usage', query).active, false);
  assert.deepEqual(filterCatalog(catalogSnapshot, 'usage', new URLSearchParams(original)).slugs, expected);
});

test('homepage groups retain exactly the six editorial child sets without requiring all pains', () => {
  const expected = [
    ['it-blind-change', 'it-framework-collision', 'it-tool-silos', 'it-governance-lockin', 'it-access-assignment-drift', 'it-fragmented-review-context', 'it-assumed-governance-coverage', 'it-unjustified-evidence-retention'],
    ['it-audit-reconstruction', 'it-handcrafted-deliverables', 'it-unactionable-governance-findings'],
    ['it-ea-drift', 'it-truth-drift', 'it-acquisition-blind-spots', 'it-stale-dependent-eligibility', 'it-unexamined-rule-regressions'],
    ['it-ai-blindness'], ['it-unverified-generated-output', 'it-unqualified-agent-runtime', 'it-conflicting-agent-artifacts'], ['it-ungoverned-change', 'it-ungoverned-agents'],
  ];
  assert.deepEqual(homepagePainGroups.map((group) => group.pains), expected);
  for (const group of homepagePainGroups) assert.deepEqual(filterCatalog(catalogSnapshot, 'pains', new URLSearchParams({ source: `homepage:${group.slug}` })).slugs.sort(), [...group.pains].sort());
  assert.ok(poesisUsage.pains.some((pain) => !homepagePainGroups.some((group) => group.pains.includes(pain.slug))));
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
  assert.deepEqual(catalogViews.map((view) => view.href), ['/catalog/usage', '/catalog/actors', '/catalog/pains', '/catalog/values', '/catalog/affordances', '/catalog/capabilities', '/catalog/features', '/catalog/qualities', '/catalog/solutions', '/catalog/products', '/catalog/services']);
  for (const type of catalogTypes) {
    assert.equal(catalogPath(type), `/catalog/${type}`);
    assert.equal(new URL(catalogHref(type, 'test:source'), 'https://poesis.cloud').pathname, `/catalog/${type}`);
  }
  const platform = siteNavigation.find((group) => group.label === 'Platform');
  const [portfolio, needs, coverage, comparisons] = platform.sections;
  // What is packaged comes first; demand and supply follow, comparison last.
  assert.equal(portfolio.label, 'By solution & product');
  assert.equal(needs.label, 'By need');
  assert.equal(coverage.label, 'By coverage');
  assert.equal(comparisons.label, 'By comparison');
  // Need and coverage are disjoint, and together they publish every catalog view.
  assert.deepEqual([...needs.items, ...coverage.items], catalogViews);
  const company = siteNavigation.find((group) => group.label === 'Company');
  assert.ok(company.sections.flatMap((section) => section.items).some((item) => item.href === '/catalog'));
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

const attr = (node, name) => node?.attrs?.find((attribute) => attribute.name === name)?.value;
const elements = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => elements(child, predicate))];
const text = (node) => (node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join(''));
const documents = new Map();
const built = (pathname) => {
  const path = pathname.replace(/\/$/, '') || '';
  if (!documents.has(path)) documents.set(path, parse(readFileSync(new URL(`../dist${path}/index.html`, import.meta.url), 'utf8')));
  return documents.get(path);
};

test('built catalogs publish matching filter payloads and compact platform footers on every surface', { skip: process.env.CHECK_BUILT_USAGE !== '1' }, () => {
  const index = built('/catalog');
  for (const id of ['platform', 'usage', 'services']) {
    assert.equal(elements(index, (node) => node.tagName === 'section' && attr(node, 'id') === id).length, 1, id);
  }
  for (const view of catalogViews) {
    assert.ok(elements(index, (node) => node.tagName === 'a' && attr(node, 'href') === view.href).length, view.href);
  }
  for (const type of catalogTypes) {
    const document = built(`/catalog/${type}`);
    const payload = elements(document, (node) => attr(node, 'id') === 'catalog-filter-data')[0];
    assert.deepEqual(JSON.parse(text(payload)), { type, snapshot: JSON.parse(JSON.stringify(catalogSnapshot)) });
    assert.equal(elements(document, (node) => attr(node, 'id') === 'catalog-active-source').length, 1);
    assert.equal(elements(document, (node) => attr(node, 'id') === 'catalog-clear').length, 1);
    assert.deepEqual(elements(document, (node) => attr(node, 'data-catalog-slug')).map((node) => attr(node, 'data-catalog-slug')), catalogSnapshot.records[type].map((record) => record.slug));
  }
  for (const [type, entries, itemKey] of [['features', usageFeatures, 'feature'], ['capabilities', usageCapabilities, 'capability'], ['affordances', usageAffordances, 'affordance']]) {
    for (const entry of entries) {
      const source = `${itemKey}:${entry.slug}`;
      const expected = platformRelations(entry[itemKey]).flatMap((group) => group.links.map((link) => link.href));
      const catalogCard = elements(built(`/catalog/${type}`), (node) => attr(node, 'data-catalog-slug') === entry.slug)[0];
      const ownerPath = itemKey === 'affordance' ? '/' : itemKey === 'feature' ? `${solutionHref(entry.solution)}/products/${entry.product.slug}` : solutionHref(entry.solution);
      const ownerAnchor = itemKey === 'affordance' ? `affordance-${entry.slug}` : entry[itemKey].slug;
      const ownerCard = elements(built(ownerPath), (node) => attr(node, 'id') === ownerAnchor)[0];
      for (const card of [catalogCard, ownerCard]) {
        assert.ok(card, source);
        const footer = elements(card, (node) => attr(node, 'class')?.split(' ').includes('proof-line'));
        const links = footer.flatMap((line) => elements(line, (node) => node.tagName === 'a').map((node) => attr(node, 'href')));
        assert.deepEqual(links, expected, source);
        assert.ok(links.every((href) => new URL(href, 'https://poesis.cloud').searchParams.get('source') === source));
      }
    }
  }
});

test('built pilot keeps needs first, canonical links, safe projection and useful fallback', { skip: process.env.CHECK_BUILT_USAGE !== '1' }, () => {
  const document = built('/pilot');
  const catalog = projectPilotCatalog();
  const byId = (id) => elements(document, (node) => attr(node, 'id') === id)[0];
  assert.ok(byId('pilot-builder'));
  assert.equal(attr(byId('pilot-builder'), 'hidden'), '');
  assert.ok(elements(byId('pilot-fallback'), (node) => attr(node, 'href') === '/contact').length);
  assert.equal(elements(document, (node) => node.tagName === 'h1').length, 1);
  const headings = elements(document, (node) => node.tagName === 'h2').map(text);
  assert.ok(headings.indexOf('Values & pain points') < headings.indexOf('Contextual use cases'));
  assert.deepEqual(JSON.parse(text(byId('pilot-data'))), catalog);
  assert.doesNotMatch(text(byId('pilot-data')), /<|>/);
  for (const kind of ['values', 'pains', 'cases']) {
    const controls = elements(document, (node) => attr(node, 'data-select-kind') === kind);
    assert.deepEqual(controls.map((node) => attr(node, 'value')), catalog[kind].map((record) => record.slug));
    for (const control of controls) assert.equal(attr(control, 'type'), 'checkbox');
  }
  for (const id of ['pilot-copy', 'pilot-download', 'pilot-email']) assert.equal(attr(byId(id), 'disabled'), '');
  assert.equal(attr(byId('pilot-brief-text'), 'readonly'), '');
  assert.equal(attr(byId('pilot-email'), 'data-demo-cta'), 'pilot-email');
  for (const useCase of catalog.cases) {
    const card = elements(document, (node) => attr(node, 'data-pilot-case') === useCase.slug)[0];
    assert.ok(text(card).includes(useCase.name));
    assert.ok(text(card).includes(useCase.description));
    assert.equal(attr(elements(card, (node) => attr(node, 'data-pilot-state'))[0], 'data-pilot-state'), useCase.state ?? 'unregistered');
    for (const key of useCase.supports) {
      const support = catalog.supports.find((record) => record.key === key);
      assert.ok(text(card).includes(support.owner));
      assert.ok(elements(card, (node) => attr(node, 'href') === support.href).length);
    }
  }
  for (const record of [...catalog.values, ...catalog.pains, ...catalog.cases, ...catalog.supports]) {
    const target = new URL(record.href, 'https://poesis.cloud');
    const destination = built(target.pathname);
    if (target.hash) assert.ok(elements(destination, (node) => attr(node, 'id') === decodeURIComponent(target.hash.slice(1))).length, record.href);
  }
  const homepage = built('/');
  for (const identity of ['homepage-hero-pilot', 'homepage-pilot']) {
    const cta = elements(homepage, (node) => attr(node, 'data-demo-cta') === identity);
    assert.equal(cta.length, 1);
    assert.equal(attr(cta[0], 'href'), '/pilot');
  }
  const section = elements(homepage, (node) => attr(node, 'id') === 'pilot')[0];
  assert.match(text(section), /ITIP \+ SIE SaaS/);
  assert.match(text(section), /success criteria, evidence, timing and constraints/);
  assert.equal(elements(section, (node) => attr(node, 'data-select-kind')).length, 0);
  assert.ok(readFileSync(new URL('../dist/sitemap-0.xml', import.meta.url), 'utf8').includes('/pilot/</loc>'));
});

test('built usage pages retain identity, derived badges, contextual links and SEO title identity', { skip: process.env.CHECK_BUILT_USAGE !== '1' }, () => {
  const index = built('/catalog/usage');
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
  for (const entity of [...poesisUsage.actorTypes]) assert.equal(elements(built('/catalog/actors'), (node) => attr(node, 'id') === entity.slug).length, 1, entity.slug);
  for (const entity of poesisUsage.pains) assert.equal(elements(built('/catalog/pains'), (node) => attr(node, 'id') === entity.slug).length, 1, entity.slug);
  for (const value of usageValues) {
    const item = elements(built('/catalog/values'), (node) => attr(node, 'id') === valueAnchor(value));
    assert.equal(item.length, 1, value.slug);
    const head = elements(item[0], (node) => attr(node, 'class')?.includes('think-consequence__head'))[0];
    const badges = elements(head, (node) => attr(node, 'data-delivery-status'));
    assert.equal(badges.length, valueStatus(value.slug) === undefined ? 0 : 1, value.slug);
    if (valueStatus(value.slug) === undefined) {
      assert.match(text(item[0]), /No platform support declared/);
      assert.equal(elements(item[0], (node) => attr(node, 'href')?.startsWith('/solutions')).length, 0);
    }
  }
  for (const useCase of poesisUsage.useCases) {
    const document = built(`/usage/${useCase.slug}`);
    const heading = elements(document, (node) => node.tagName === 'h1');
    assert.equal(heading.length, 1);
    assert.equal(text(heading[0]), useCase.name);
    if (useCaseStatus(useCase) === undefined) {
      assert.match(text(document), /No platform coverage declared/);
      assert.equal(elements(document, (node) => attr(node, 'data-usage-value')).length, valuesForUseCase(useCase.slug).length);
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
    ['/catalog/features', usageFeatures, (entry) => `feature-${entry.slug.replace(/\//g, '-')}`, (entry) => entry.feature.delivery.state],
    ['/catalog/capabilities', usageCapabilities, (entry) => `capability-${entry.slug.replace(/\//g, '-')}`, (entry) => capabilityStatus(entry.solution, entry.capability)],
    ['/catalog/affordances', usageAffordances, (entry) => `affordance-${entry.slug}`, (entry) => affordanceStatus(entry.affordance)],
  ]) {
    const document = built(page);
    for (const entry of items) {
      const item = elements(document, (node) => attr(node, 'id') === anchor(entry));
      assert.equal(item.length, 1, `${page}: ${entry.slug}`);
      // The published badge is derived from what proves the item, so it can never claim more than its parts.
      assert.equal(attr(elements(item[0], (node) => attr(node, 'data-delivery-status'))[0], 'data-delivery-status'), commitmentStatus([state(entry)]), `${page}: ${entry.slug}`);
    }
  }
  const homepage = built('/');
  assert.equal(elements(homepage, (node) => attr(node, 'class')?.includes('think-phase__subpains')).length, 0);
  for (const group of homepagePainGroups) {
    const links = elements(homepage, (node) => attr(node, 'href') === catalogHref('pains', `homepage:${group.slug}`));
    assert.equal(links.length, 1);
    assert.equal(text(links[0]), group.lead);
  }
  const actorsPage = built('/catalog/actors');
  for (const profile of profiles) assert.ok(elements(actorsPage, (node) => attr(node, 'id') === profile.slug).length, `actor ${profile.slug}`);
  // The homepage keeps actor types as the usage filter rather than a separate section.
  const options = elements(homepage, (node) => node.tagName === 'option' && attr(node, 'value') !== undefined);
  assert.equal(options.length, poesisUsage.actorTypes.length + 1);
  for (const option of options) assert.ok(attr(option, 'value') === '' || poesisUsage.actorTypes.some((actor) => actor.slug === attr(option, 'value')));
  for (const solution of poesisPlatform.solutions) {
    assert.ok(elements(built(solutionHref(solution)), (node) => attr(node, 'data-usage-case')).length);
    for (const product of solution.products) {
      const document = built(`${solutionHref(solution)}/products/${product.slug}`);
      for (const feature of product.features) {
        const section = elements(document, (node) => attr(node, 'id') === feature.slug)[0];
        assert.ok(elements(section, (node) => node.tagName === 'a' && attr(node, 'href') === catalogHref('usage', `feature:${solution.slug}/${product.slug}/${feature.slug}`)).length, `${product.slug}/${feature.slug}`);
      }
    }
  }
});

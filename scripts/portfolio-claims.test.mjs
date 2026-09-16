import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { parse } from 'parse5';
import { services } from '../src/data/services.ts';
import { siteNavigation, footerNavigation } from '../src/data/site-navigation.ts';
import { evaluateRequirement, productTimeline, platformSolutions, affordances, affordanceStatus, validatePortfolio, featureStatus, capabilityShipped, capabilityStatus, realizations, realizationStatus, realizationRequirements, operationalVerdictStatus, semanticEdges, solutionHref } from '../src/data/poesis-platform.ts';
import { pains, painRelations } from '../src/data/pains.ts';
import { commitmentStatus, deliveryLabels, productStatus, milestoneStatus } from '../src/data/poesis-platform.ts';
import { platformValues, solutionValues, productValues, valueAnchor, valueAliases, valueStatus, valueSupports, valueEdges, solutionValueAnchor } from '../src/data/usage.ts';

test('public commitments report implemented, in-progress or planned, never speculative', () => {
  assert.deepEqual(deliveryLabels, { planned: 'Planned', partial: 'In progress', delivered: 'Implemented' });
  assert.equal(commitmentStatus([]), 'planned');
  assert.equal(commitmentStatus(['planned', 'planned']), 'planned');
  assert.equal(commitmentStatus(['delivered']), 'delivered');
  assert.equal(commitmentStatus(['delivered', 'delivered']), 'delivered');
  assert.equal(commitmentStatus(['partial']), 'partial');
  assert.equal(commitmentStatus(['delivered', 'partial']), 'partial');
  assert.equal(commitmentStatus(['delivered', 'planned']), 'partial');
});

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const workspaceTest = (name, run) => test(name, { skip: process.env.CHECK_WORKSPACE_PORTFOLIO !== '1' }, run);
const readWorkspace = (path) => {
  try {
    return read(path);
  } catch (cause) {
    throw new Error(`Portfolio workspace check requires ${new URL(path, import.meta.url).pathname}. Run npm run test:portfolio:workspace in the full Poesis workspace; use npm run test:portfolio for a standalone checkout.`, { cause });
  }
};
const features = platformSolutions.flatMap((solution) => solution.products.flatMap((product) => product.features.map((feature) => ({ id: `${solution.slug}/${product.slug}/${feature.slug}`, ...feature }))));
test('value commitments follow the platform items that reference them, never milestones or unrelated children', () => {
  // Values live usage-side and carry no relations; their status is the
  // commitment of the platform items that declare they realize the value.
  for (const value of platformValues) {
    assert.equal(valueStatus(value.slug), commitmentStatus(valueSupports(value.slug).map((support) => support.state)));
    assert.ok(valueSupports(value.slug).every((support) => support.type === 'affordance'));
  }
  for (const solution of platformSolutions) {
    for (const value of solutionValues(solution.slug)) {
      assert.equal(valueStatus(value.slug), commitmentStatus(solution.capabilities.filter((capability) => capability.values.includes(value.slug)).map((capability) => capabilityStatus(solution, capability))));
    }
    for (const product of solution.products) {
      for (const value of productValues(solution.slug, product.slug)) {
        const supportingFeatures = product.features.filter((feature) => feature.values.includes(value.slug));
        assert.equal(valueStatus(value.slug), supportingFeatures.length ? commitmentStatus(supportingFeatures.map((feature) => feature.delivery.state)) : undefined);
      }
    }
  }
  assert.equal(valueStatus('value:gsm/specifications/04'), undefined);
  assert.equal(valueStatus('value:does-not-exist/01'), undefined);
  assert.equal(milestoneStatus({ features: [] }, { version: '1.0', shipped: true }), 'planned');
  const milestoneFeatures = [
    { delivery: { state: 'delivered' }, milestone: { version: '1.0', shipped: false } },
    { delivery: { state: 'partial' }, milestone: { version: '2.0', shipped: true } },
  ];
  assert.equal(milestoneStatus({ features: milestoneFeatures }, { version: '1.0' }), 'delivered');
  assert.equal(milestoneStatus({ features: milestoneFeatures }, { version: '2.0' }), 'partial');
});

test('a shipped milestone the product already reached cannot be published as planned', () => {
  // Delivery state is a claim about a milestone the product has reached; it may
  // never contradict the shipped flag, which is what actually happened.
  for (const solution of platformSolutions) {
    for (const product of solution.products) {
      for (const feature of product.features) {
        if (!feature.milestone.shipped || product.currentVersion !== feature.milestone.version) continue;
        assert.equal(feature.delivery.state, 'delivered', `${solution.slug}/${product.slug}/${feature.slug} ships in ${product.currentVersion}`);
      }
    }
  }
});
const partnerships = siteNavigation.find((group) => group.label === 'Partnerships').sections.flatMap((section) => section.items);
const attribute = (node, name) => node.attrs?.find((attr) => attr.name === name)?.value;
const text = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');
const elements = (node, predicate) => [ ...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => elements(child, predicate)) ];
const hasClass = (node, name) => attribute(node, 'class')?.split(/\s+/).includes(name) ?? false;

test('service and partnership navigation retains the matching detail destinations', () => {
  const navigation = siteNavigation.flatMap((group) => group.sections.flatMap((section) => section.items));
  const footer = footerNavigation.flatMap((group) => group.items);
  for (const choice of [...services, ...partnerships]) {
    assert.ok(navigation.some((item) => item.href === choice.href), choice.href);
    assert.ok(footer.some((item) => item.href === choice.href), choice.href);
  }
  assert.ok(services.every((service) => service.href === `/services/${service.slug}`));
});

test('AND requires the whole scope while OR preserves accepted alternatives', () => {
  const states = { authoring: 'delivered', sourcing: 'planned', authorization: 'delivered', hosting: 'planned' };
  assert.equal(evaluateRequirement({ all: [{ ref: 'authoring' }, { ref: 'sourcing' }] }, states), 'partial');
  assert.equal(evaluateRequirement({ all: [{ ref: 'authorization' }, { any: [{ ref: 'authoring' }, { ref: 'sourcing' }] }] }, states), 'delivered');
  assert.equal(evaluateRequirement({ ref: 'hosting' }, states), 'planned');
});

test('empty, unknown and cyclic requirement proofs fail', () => {
  assert.throws(() => evaluateRequirement({ all: [] }, {}), /Empty/);
  assert.throws(() => evaluateRequirement({ ref: 'missing' }, {}), /Unknown/);
  assert.throws(() => evaluateRequirement({ ref: 'cycle' }, { cycle: { ref: 'cycle' } }), /Cyclic/);
});

test('current version cannot manufacture a shipped milestone', () => {
  assert.deepEqual(productTimeline({ currentVersion: '9.9', features: [] }), []);
});

workspaceTest('all 188 frozen identities map once, including 65 stable values', () => {
  const source = readWorkspace('../../strategy/portfolio-audit/inventory.json');
  const inventory = JSON.parse(source);
  assert.equal(createHash('sha256').update(source).digest('hex'), '0d27b8389c861d20105a8313f0bb9d6b8f0f0b6c48bc7343a62a9ec640a6a7ab');
  let count = 0;
  let valueCount = 0;
  const ids = new Set();
  const record = (id) => { assert.ok(!ids.has(id), `duplicate ${id}`); ids.add(id); count++; };
  assert.deepEqual(platformSolutions.map((solution) => solution.slug), inventory.solutions.map((solution) => solution.slug));
  for (const [solutionIndex, original] of inventory.solutions.entries()) {
    const solution = platformSolutions.find((solution) => solution.slug === original.slug);
    record(`solution:${solution.slug}`);
    assert.equal(solutionHref(solution), original.href);
    assert.deepEqual(solution.capabilities.map((capability) => capability.slug), original.capabilities.map((capability) => capability.slug));
    for (const capability of solution.capabilities) { record(`capability:${solution.slug}/${capability.slug}`); assert.ok(capability.delivery.scope); }
    for (const [index, value] of solutionValues(solution.slug).entries()) {
      record(value.slug); valueCount++;
      assert.equal(value.slug, `value:${solution.slug}/${String(index + 1).padStart(2, '0')}`);
      assert.equal(value.originalTitle, original.values[index].title);
      assert.ok(valueAliases(value).includes(solutionValueAnchor(original.values[index].title)));
    }
    assert.deepEqual(solution.products.map((product) => product.slug), original.products.map((product) => product.slug));
    for (const [productIndex, product] of solution.products.entries()) {
      const oldProduct = inventory.solutions[solutionIndex].products[productIndex];
      record(`product:${solution.slug}/${product.slug}`);
      assert.equal(product.currentVersion, oldProduct.currentVersion);
      assert.deepEqual(product.docs.map((link) => link.href), oldProduct.docs.map((link) => link.href));
      const originalFeatures = product.features.filter((feature) => oldProduct.features.some((original) => original.slug === feature.slug));
      assert.deepEqual(originalFeatures.map((feature) => feature.slug), oldProduct.features.map((feature) => feature.slug));
      const additionalFeatures = product.features.filter((feature) => !oldProduct.features.some((original) => original.slug === feature.slug));
      assert.deepEqual(additionalFeatures.map((feature) => feature.slug), solution.slug === 'itip' && product.slug === 'web-application' ? ['identity-provider-synchronization', 'governance-review-sessions'] : []);
      for (const [featureIndex, feature] of originalFeatures.entries()) {
        record(`feature:${solution.slug}/${product.slug}/${feature.slug}`);
        assert.deepEqual(feature.milestone, oldProduct.features[featureIndex].milestone);
        assert.ok(feature.delivery.scope);
      }
      const ownValues = productValues(solution.slug, product.slug);
      assert.equal(ownValues.length, oldProduct.values.length);
      for (const [index, value] of ownValues.entries()) {
        record(value.slug); valueCount++;
        assert.equal(value.slug, `value:${solution.slug}/${product.slug}/${String(index + 1).padStart(2, '0')}`);
        assert.equal(value.originalTitle, oldProduct.values[index].title);
      }
    }
  }
  assert.deepEqual(affordances.map((affordance) => affordance.slug), inventory.affordances.map((affordance) => affordance.slug));
  for (const affordance of affordances) record(`affordance:${affordance.slug}`);
  assert.deepEqual(platformValues.map((value) => value.slug.slice('value:platform/'.length)), inventory.platformValues.map((value) => value.slug));
  for (const value of platformValues) { record(value.slug); valueCount++; }
  const originalPains = pains.filter((pain) => inventory.pains.some((original) => original.id === pain.slug));
  assert.deepEqual(originalPains.map((pain) => pain.slug), inventory.pains.map((pain) => pain.id));
  for (const pain of originalPains) record(`pain:${pain.slug}`);
  assert.equal(count, 188);
  assert.equal(valueCount, 65);
  assert.equal(features.length, 67);
});

workspaceTest('deferred promises stay planned', () => {
  const target = readWorkspace('../../strategy/portfolio-claim-target-model.md');
  for (const feature of features) {
    if (target.includes(`| \`${feature.id}\` | defer |`)) assert.equal(feature.delivery.state, 'planned', feature.id);
  }
});

test('shipped flags cannot inflate scope', () => {
  const web = platformSolutions[0].products[0];
  const inventoryFeature = web.features.find((feature) => feature.slug === 'definitions-management');
  assert.equal(inventoryFeature.milestone.shipped, true);
  assert.equal(featureStatus(inventoryFeature).state, 'planned');
  const human = platformSolutions[3].capabilities.find((capability) => capability.slug === 'human-gated-advancement');
  assert.equal(capabilityShipped(platformSolutions[3], human), false);
  const grammar = platformSolutions[2].capabilities.find((capability) => capability.slug === 'governance-grammar-and-lifecycle');
  assert.equal(capabilityStatus(platformSolutions[2], grammar), 'partial');
});

test('scoped alternatives do not require optional future or hosted routes', () => {
  const accepted = Object.fromEntries(Object.keys(realizationRequirements).map((key) => [key, 'delivered']));
  for (const key of ['sourcing', 'mcp', 'installer', 'hosting', 'observations', 'extension']) accepted[key] = 'planned';
  for (const realization of realizations) assert.equal(realizationStatus({ ...realization, acceptance: 'delivered' }, accepted), 'delivered', realization.slug);
  assert.equal(realizationStatus({ ...realizations[0], acceptance: 'delivered' }, { ...accepted, authorization: 'planned' }), 'partial');
  assert.notEqual(realizationStatus({ ...realizations[0], acceptance: 'planned' }, accepted), 'delivered');
  assert.notEqual(operationalVerdictStatus(accepted), 'delivered');
  assert.equal(operationalVerdictStatus(accepted, { ...realizations[1], acceptance: 'delivered' }), 'partial');
  assert.equal(operationalVerdictStatus({ ...accepted, observations: 'delivered' }, { ...realizations[1], acceptance: 'delivered' }), 'delivered');
  assert.equal(evaluateRequirement({ all: [realizations[1].requires, { ref: 'observations' }] }, accepted), 'partial');
});

test('validators reject malformed, duplicate and contradictory graphs; cross-cutting support is allowed', () => {
  const fresh = () => structuredClone(platformSolutions);
  let graph = fresh(); graph[0].products[0].features.push(graph[0].products[0].features[0]);
  assert.throws(() => validatePortfolio(graph), /Duplicate/);
  graph = fresh(); graph[0].capabilities[0].relations.features[0] += '/extra';
  assert.throws(() => validatePortfolio(graph), /Invalid reference/);
  graph = fresh(); graph[0].capabilities[0].delivery.state = 'delivered';
  assert.throws(() => validatePortfolio(graph), /Contradictory/);
  assert.throws(() => evaluateRequirement({ all: [], any: [] }, {}), /Ambiguous/);
  graph = fresh(); graph[0].products[0].features[0].values.push(graph[0].products[0].features[0].values[0]);
  assert.throws(() => validatePortfolio(graph), /Duplicate/);
  graph = fresh(); graph[0].products[0].features[0].useCases.push('');
  assert.throws(() => validatePortfolio(graph), /Invalid useCases reference/);
  graph = fresh(); graph[0].tags = [];
  assert.throws(() => validatePortfolio(graph), /Invalid solution tags/);
  graph = fresh(); graph[0].products[0].currentVersion = 'tomorrow';
  assert.throws(() => validatePortfolio(graph), /Invalid current version/);
  graph = fresh(); graph[0].capabilities[0].delivery.state = 'invented';
  assert.throws(() => validatePortfolio(graph), /Invalid delivery/);
  graph = fresh(); graph[0].capabilities[0].optional.push('unknown/feature');
  assert.throws(() => validatePortfolio(graph), /Unknown optional/);
  const crossCutting = structuredClone(affordances);
  crossCutting[5].relations.capabilities.push('sie/governance-lifecycle-enforcement');
  assert.doesNotThrow(() => validatePortfolio(platformSolutions, crossCutting));
  assert.ok(semanticEdges.some((edge) => edge.source === 'capability:gsm/research-tested-model-evolution' && edge.kind === 'informs'));
  // Structural edges stay platform-side; value edges are derived usage-side.
  assert.ok(!semanticEdges.some((edge) => edge.target.startsWith('value:')));
  assert.ok(valueEdges.length > 0 && valueEdges.every((edge) => edge.kind === 'supports-benefit' && edge.target.startsWith('value:')));
  assert.ok(painRelations.length >= 23);
  assert.equal(new Set(painRelations.map((edge) => edge.id)).size, painRelations.length);
  assert.ok(painRelations.every((edge) => edge.judgment === 'hypothesis'));
});

test('validator accepts direct authoring API without MCP or sourcing but retains mandatory prerequisites', () => {
  const graph = structuredClone(platformSolutions);
  const context = graph[1].capabilities.find((capability) => capability.slug === 'governed-context-for-ai');
  const api = graph[1].products[0].features.find((feature) => feature.slug === 'definitions-management-api');
  context.delivery.state = 'delivered';
  api.delivery.state = 'delivered';
  const previous = { ...realizationRequirements };
  const acceptance = realizations[0].acceptance;
  try {
    for (const key of ['authorization', 'pins', 'lineage', 'selection', 'authoring', 'api']) realizationRequirements[key] = 'delivered';
    realizations[0].acceptance = 'delivered';
    assert.equal(realizationRequirements.sourcing, 'planned');
    assert.equal(realizationRequirements.mcp, 'planned');
    assert.equal(graph[1].products[0].features.find((feature) => feature.slug === 'mcp').delivery.state, 'planned');
    assert.doesNotThrow(() => validatePortfolio(graph));
    api.delivery.state = 'partial';
    assert.throws(() => validatePortfolio(graph), /Contradictory delivered capability/);
    api.delivery.state = 'delivered';
    realizationRequirements.authorization = 'planned';
    assert.throws(() => validatePortfolio(graph), /Unaccepted capability realization/);
    realizationRequirements.authorization = 'delivered';
    realizations[0].acceptance = 'planned';
    assert.throws(() => validatePortfolio(graph), /Unaccepted capability realization/);
  } finally {
    Object.assign(realizationRequirements, previous);
    realizations[0].acceptance = acceptance;
  }
});

test('delivered affordances require an accepted scoped route, not any contributor or every contributor', () => {
  const claims = structuredClone(affordances);
  claims.find((affordance) => affordance.slug === 'norm-evaluation').delivery.state = 'delivered';
  assert.throws(() => validatePortfolio(platformSolutions, claims), /Unaccepted affordance realization/);
  const composite = structuredClone(affordances);
  composite.find((affordance) => affordance.slug === 'governance-fabric').delivery.state = 'delivered';
  assert.throws(() => validatePortfolio(platformSolutions, composite), /Unaccepted affordance realization/);
  const graph = structuredClone(platformSolutions);
  graph[1].capabilities.find((capability) => capability.slug === 'deterministic-norm-evaluation').delivery.state = 'delivered';
  graph[1].products.find((product) => product.slug === 'operator').features.find((feature) => feature.slug === 'norms-evaluation-api').delivery.state = 'delivered';
  const previous = { ...realizationRequirements };
  const acceptance = realizations[1].acceptance;
  try {
    Object.assign(realizationRequirements, { pins: 'delivered', instance: 'delivered', verdict: 'delivered' });
    assert.throws(() => validatePortfolio(graph, claims), /Unaccepted capability realization/);
    realizations[1].acceptance = 'delivered';
    assert.equal(graph[0].capabilities.find((capability) => capability.slug === 'continuous-it-compliance-evaluation').delivery.state, 'planned');
    assert.doesNotThrow(() => validatePortfolio(graph, claims));
    realizationRequirements.pins = 'planned';
    assert.throws(() => validatePortfolio(graph, claims), /Unaccepted capability realization/);
  } finally {
    Object.assign(realizationRequirements, previous);
    realizations[1].acceptance = acceptance;
  }
});

test('requirement bundles reject sparse and null children instead of vacuous delivery', () => {
  for (const operator of ['all', 'any']) {
    for (const children of [new Array(1), [null], [undefined], [{ ref: 'ready' }, null]]) {
      assert.throws(() => evaluateRequirement({ [operator]: children }, { ready: 'delivered' }), /Invalid requirement/);
    }
    const inheritedChild = new Array(1);
    Object.setPrototypeOf(inheritedChild, { 0: { ref: 'ready' } });
    assert.throws(() => evaluateRequirement({ [operator]: inheritedChild }, { ready: 'delivered' }), /Invalid requirement/);
  }
});

test('delivery states and requirement members must be primitive strings and own properties', () => {
  for (const state of [['delivered'], new String('delivered'), { toString: () => 'delivered' }, 'toString']) {
    const graph = structuredClone(platformSolutions);
    graph[0].products[0].features[0].delivery.state = state;
    assert.throws(() => validatePortfolio(graph), /Invalid delivery/);
    assert.throws(() => evaluateRequirement({ ref: 'ready' }, { ready: state }));
  }
  const graph = structuredClone(platformSolutions);
  const claim = graph[0].products[0].features[0].delivery;
  delete claim.state;
  Object.setPrototypeOf(claim, { state: 'delivered' });
  assert.throws(() => validatePortfolio(graph), /Invalid delivery/);
  assert.throws(() => evaluateRequirement({ ref: 'ready' }, Object.create({ ready: 'delivered' })), /Unknown requirement/);
  assert.throws(() => evaluateRequirement({ ref: ['ready'] }, { ready: 'delivered' }), /Invalid requirement reference/);
  assert.throws(() => evaluateRequirement(Object.assign(Object.create({ ref: 'ready' }), { extra: true }), { ready: 'delivered' }));
  const inheritedAll = Object.assign(Object.create({ all: [{ ref: 'missing' }] }), { any: [{ ref: 'ready' }] });
  assert.equal(evaluateRequirement(inheritedAll, { ready: 'delivered' }), 'delivered');
});

test('features need capability support while many-to-many and research informing remain valid', () => {
  const graph = structuredClone(platformSolutions);
  const reference = 'specifications/primitives';
  const supporters = graph[2].capabilities.filter((capability) => capability.relations.features.includes(reference));
  assert.ok(supporters.length > 1);
  supporters[0].relations.features = supporters[0].relations.features.filter((feature) => feature !== reference);
  supporters[0].relations.features.push('specifications/archetyping');
  assert.doesNotThrow(() => validatePortfolio(graph));
  for (const capability of graph[2].capabilities) capability.relations.features = capability.relations.features.filter((feature) => feature !== reference);
  assert.throws(() => validatePortfolio(graph), /Orphan feature: gsm\/specifications\/primitives/);
  assert.ok(semanticEdges.some((edge) => edge.source === 'feature:gsm/research-lab/causal-model' && edge.kind === 'informs'));
  assert.ok(semanticEdges.some((edge) => edge.source === 'capability:gsm/research-tested-model-evolution' && edge.kind === 'informs'));
});

workspaceTest('documentation timeline labels follow shipped metadata, not claim scope', () => {
  const template = readWorkspace('../../documentation/_includes/roadmap_timeline.html');
  assert.match(template, /<span class="roadmap-timeline-label">{% if m\.shipped %}Recorded release{% else %}Planned milestone{% endif %}: {{ m\.label \| escape }}<\/span>/);
  assert.ok(!template.includes('Historical label:'));
  assert.doesNotMatch(template, /Available scope|Partial scope|feature\.state \| capitalize/);
  for (const owner of ['product', 'm', 'feature']) {
    assert.ok(template.includes(`aria-label="{{ ${owner}.statusLabel }}"`));
    assert.ok(template.includes(`title="{{ ${owner}.statusLabel }}"`));
    assert.ok(template.includes(`{% if ${owner}.status == 'delivered' %}{{ implemented_icon }}{% else %}{{ planned_icon }}{% endif %}`));
  }
  assert.match(template, /aria-hidden="true" focusable="false"/);
  assert.ok(template.includes('m9 12 2 2 4-4'));
  assert.ok(template.includes('M12 6v6l4 2'));
});

workspaceTest('generated roadmap and normative scope table agree feature by feature', () => {
  const roadmap = JSON.parse(readWorkspace('../../documentation/_data/roadmap.json'));
  const exported = roadmap.flatMap((solution) => solution.products.flatMap((product) => product.features));
  assert.equal(exported.length, 67);
  const register = readWorkspace('../../strategy/roadmap.md');
  for (const feature of features) {
    const actual = exported.find((item) => item.id === feature.id);
    assert.deepEqual(actual, { id: feature.id, name: feature.name, state: feature.delivery.state, status: commitmentStatus([feature.delivery.state]), statusLabel: deliveryLabels[feature.delivery.state], kind: feature.delivery.kind, notes: feature.blurb, milestone: feature.milestone });
    assert.ok(register.includes(`| ${feature.id} | ${feature.name} | ${deliveryLabels[feature.delivery.state]} | ${feature.delivery.kind} | ${feature.milestone.version} | ${feature.blurb} |`), feature.id);
  }
  for (const solution of roadmap) for (const product of solution.products) {
    const original = platformSolutions.find((item) => item.slug === solution.id).products.find((item) => `${solution.id}/${item.slug}` === product.id);
    assert.equal(product.state, productStatus(original));
    assert.equal(product.status, commitmentStatus([productStatus(original)]));
    assert.equal(product.statusLabel, deliveryLabels[productStatus(original)]);
    assert.deepEqual(product.milestones, productTimeline(original).map((milestone) => ({ ...milestone, status: milestoneStatus(original, milestone), statusLabel: deliveryLabels[milestoneStatus(original, milestone)] })));
  }
});

test('built core routes retain all feature, capability and legacy value anchors', { skip: !process.env.CHECK_BUILT_PORTFOLIO }, () => {
  const page = (route) => read(`../dist${route}/index.html`);
  const anchor = (html, id) => assert.ok(html.includes(`id="${id}"`), `missing anchor ${id}`);
  for (const solution of platformSolutions) {
    const html = page(solutionHref(solution));
    for (const capability of solution.capabilities) anchor(html, capability.slug);
    for (const value of solutionValues(solution.slug)) { anchor(html, valueAnchor(value)); for (const alias of valueAliases(value)) anchor(html, alias); }
    for (const product of solution.products) {
      const productHtml = page(`${solutionHref(solution)}/products/${product.slug}`);
      const document = parse(productHtml);
      assert.notEqual(product.tagline, product.description, `${product.slug} distinct hero copy`);
      assert.equal(text(elements(document, (node) => hasClass(node, 'lead'))[0]), product.tagline);
      assert.equal(text(elements(document, (node) => hasClass(node, 'hero-promise'))[0]).trim(), product.description);
      for (const feature of product.features) {
        anchor(productHtml, feature.slug);
        const item = elements(document, (node) => attribute(node, 'id') === feature.slug)[0];
        assert.equal(text(elements(item, (node) => node.tagName === 'strong')[0]), feature.name);
        assert.equal(text(elements(item, (node) => node.tagName === 'p')[0]), feature.blurb);
        assert.ok(text(item).includes(`Feature · milestone v${feature.milestone.version}`));
        assert.ok(text(item).includes(featureStatus(feature).label));
      }
      for (const value of productValues(solution.slug, product.slug)) { anchor(productHtml, valueAnchor(value)); for (const alias of valueAliases(value)) anchor(productHtml, alias); }
    }
  }
  const home = read('../dist/index.html');
  assert.equal(text(elements(parse(home), (node) => node.tagName === 'h1')[0]), 'The Organizational Intelligence Platform.');
  assert.ok(!home.includes('ambition, not complete live coverage'));
  for (const affordance of affordances) anchor(home, `affordance-${affordance.slug}`);
  for (const value of platformValues) anchor(home, valueAnchor(value));
});

test('all built values and scoped claims carry accessible status icons with dependency-specific status', { skip: !process.env.CHECK_BUILT_PORTFOLIO }, () => {
  const observed = new Set();
  const badges = { planned: { modifier: 'is-planned', path: 'M12 6v6l4 2' }, partial: { modifier: 'is-progress', path: 'M12 3v4' }, delivered: { modifier: 'is-implemented', path: 'm9 12 2 2 4-4' } };
  const assertStatus = (node, state) => {
    assert.ok(node, 'status element exists');
    const expected = commitmentStatus([state]);
    const label = deliveryLabels[expected];
    assert.equal(attribute(node, 'data-delivery-status'), expected);
    assert.equal(attribute(node, 'title'), label);
    assert.equal(attribute(node, 'aria-label'), label);
    assert.equal(text(node).trim(), label);
    assert.ok(hasClass(node, badges[expected].modifier));
    const icon = elements(node, (item) => item.tagName === 'svg');
    assert.equal(icon.length, 1);
    assert.equal(attribute(icon[0], 'aria-hidden'), 'true');
    assert.equal(attribute(icon[0], 'focusable'), 'false');
    assert.ok(elements(icon[0], (item) => item.tagName === 'path').some((path) => attribute(path, 'd') === badges[expected].path));
    observed.add(expected);
  };
  const firstStatus = (node) => elements(node, (item) => hasClass(item, 'delivery-status'))[0];
  let values = 0;
  const assertItem = (document, id, state, value = false) => {
    const item = elements(document, (node) => attribute(node, 'id') === id)[0];
    assert.ok(item, id);
    if (state === undefined) {
      assert.equal(firstStatus(item), undefined, id);
      if (value) values++;
      return;
    }
    assertStatus(firstStatus(item), state);
    assert.equal(hasClass(item, 'is-planned'), commitmentStatus([state]) === 'planned', id);
    if (value) {
      const head = elements(item, (node) => hasClass(node, 'think-consequence__head'))[0];
      assert.ok(text(head).trim().startsWith('Value'), id);
      assert.equal(elements(head, (node) => hasClass(node, 'delivery-status')).length, 1, id);
      values++;
    }
  };
  const readPage = (route) => {
    const document = parse(read(`../dist${route}/index.html`));
    const body = elements(document, (node) => node.tagName === 'body')[0];
    assert.doesNotMatch(text(body), /potential (?:value|benefit)|partial scope|available scope|delivered through|contributes-to/i, route);
    for (const node of elements(document, (node) => hasClass(node, 'delivery-status'))) {
      assert.ok(['planned', 'partial', 'delivered'].includes(attribute(node, 'data-delivery-status')));
      assertStatus(node, attribute(node, 'data-delivery-status'));
    }
    return document;
  };
  const home = readPage('');
  for (const value of platformValues) assertItem(home, valueAnchor(value), valueStatus(value.slug), true);
  for (const affordance of affordances) assertItem(home, `affordance-${affordance.slug}`, affordanceStatus(affordance));
  for (const solution of platformSolutions) {
    const document = readPage(solutionHref(solution));
    for (const value of solutionValues(solution.slug)) assertItem(document, valueAnchor(value), valueStatus(value.slug), true);
    for (const capability of solution.capabilities) assertItem(document, capability.slug, capabilityStatus(solution, capability));
    for (const product of solution.products) {
      const detail = readPage(`${solutionHref(solution)}/products/${product.slug}`);
      for (const value of productValues(solution.slug, product.slug)) assertItem(detail, valueAnchor(value), valueStatus(value.slug), true);
      for (const feature of product.features) assertItem(detail, feature.slug, feature.delivery.state);
      const steps = elements(detail, (node) => hasClass(node, 'roadmap-step'));
      for (const [index, milestone] of productTimeline(product).entries()) assertStatus(firstStatus(steps[index]), milestoneStatus(product, milestone));
      const mini = elements(home, (node) => attribute(node, 'aria-label') === `${product.name} roadmap`)[0];
      const miniSteps = elements(mini, (node) => hasClass(node, 'arch-roadmap-mini-step'));
      for (const [index, milestone] of productTimeline(product).entries()) assertStatus(firstStatus(miniSteps[index]), milestoneStatus(product, milestone));
    }
  }
  assert.equal(values, 65);
  assert.deepEqual([...observed].sort(), ['delivered', 'partial', 'planned']);
  const partnership = readPage('/partnerships/llm-vendor-value-proposal');
  for (const card of elements(partnership, (node) => hasClass(node, 'value-card'))) assertStatus(firstStatus(card), 'planned');
});

test('built listing destinations contain the intended choices and detail pages link back', { skip: !process.env.CHECK_BUILT_PORTFOLIO }, () => {
  const home = parse(read('../dist/index.html'));
  for (const [id, choices] of [['services', services], ['partnerships', partnerships]]) {
    const matches = elements(home, (node) => attribute(node, 'id') === id);
    assert.equal(matches.length, 1, `unique ${id} destination`);
    const section = matches[0];
    assert.equal(section.tagName, 'section', `${id} must be a real section, not an alias`);
    assert.notEqual(attribute(section, 'aria-hidden'), 'true');
    assert.equal(text(elements(section, (node) => node.tagName === 'h2')[0]), id === 'services' ? 'Services' : 'Partnerships');
    const links = elements(section, (node) => node.tagName === 'a');
    assert.deepEqual(links.map((link) => attribute(link, 'href')), choices.map((choice) => choice.href));
    for (const choice of choices) {
      const link = links.find((node) => attribute(node, 'href') === choice.href);
      assert.equal(text(link), choice.label);
      const detail = parse(read(`../dist${choice.href}/index.html`));
      assert.ok(elements(detail, (node) => node.tagName === 'a' && attribute(node, 'href') === `/#${id}`).length, `${choice.href} listing backlink`);
      const heading = text(elements(detail, (node) => node.tagName === 'h1')[0]);
      assert.ok(choice.title ? heading === choice.title : heading.startsWith(choice.label), `${choice.href} detail heading`);
      if (choice.availability) {
        const item = elements(section, (node) => node.tagName === 'li' && text(node).includes(choice.label))[0];
        assert.ok(text(item).includes(choice.availability));
        assert.ok(text(item).includes(choice.summary));
      }
    }
  }
});

test('built roadmap labels distinguish shipped releases from planned milestones independently of scope', { skip: !process.env.CHECK_BUILT_PORTFOLIO }, () => {
  const home = parse(read('../dist/index.html'));
  for (const solution of platformSolutions) for (const product of solution.products) {
    const milestones = productTimeline(product);
    const detail = parse(read(`../dist${solutionHref(solution)}/products/${product.slug}/index.html`));
    const labels = elements(detail, (node) => hasClass(node, 'roadmap-label')).map(text);
    assert.deepEqual(labels, milestones.map((milestone) => `${milestone.shipped ? 'Recorded release' : 'Planned milestone'}: ${milestone.label}`));
    const mini = elements(home, (node) => attribute(node, 'aria-label') === `${product.name} roadmap`)[0];
    assert.ok(mini, `${product.slug} mini roadmap`);
    assert.deepEqual(elements(mini, (node) => hasClass(node, 'arch-roadmap-mini-step')).map((node) => attribute(node, 'title')), milestones.map((milestone) => `${milestone.shipped ? 'Recorded release' : 'Planned milestone'} v${milestone.version}: ${milestone.label}; not current claim acceptance`));
  }
});
import { affordanceStatus, capabilityStatus, deliveryLabels } from './poesis-platform.ts';
import { affordanceHref, affordancesForUseCase, capabilitiesForUseCase, capabilityHref, featureHref, featuresForUseCase, painsForUseCase, poesisUsage, usageAffordances, usageCapabilities, usageFeatures, usageValues, useCaseStatus, valueHref, valuesForUseCase } from './usage.ts';
import type { PilotCatalog } from './pilot.ts';
import { painsForItem, valuesForItem } from './usage.ts';

export function projectPilotCatalog(): PilotCatalog {
  const entries = [
    ...usageFeatures.map((entry) => ({ key: `feature:${entry.slug}`, name: entry.feature.name, href: featureHref(entry), state: entry.feature.delivery.state, owner: entry.solution.name, values: valuesForItem(entry.feature).map((value) => value.slug), pains: painsForItem(entry.feature).map((pain) => pain.slug) })),
    ...usageCapabilities.map((entry) => ({ key: `capability:${entry.slug}`, name: entry.capability.name, href: capabilityHref(entry), state: capabilityStatus(entry.solution, entry.capability), owner: entry.solution.name, values: valuesForItem(entry.capability).map((value) => value.slug), pains: painsForItem(entry.capability).map((pain) => pain.slug) })),
    ...usageAffordances.map((entry) => ({ key: `affordance:${entry.slug}`, name: entry.affordance.name, href: affordanceHref(entry), state: affordanceStatus(entry.affordance), owner: 'Cross-solution affordance', values: valuesForItem(entry.affordance).map((value) => value.slug), pains: painsForItem(entry.affordance).map((pain) => pain.slug) })),
  ];
  return {
    values: usageValues.map((value) => ({ slug: value.slug, name: value.title, description: value.body, href: valueHref(value), supports: entries.filter((entry) => entry.values.includes(value.slug)).map((entry) => entry.key) })),
    pains: poesisUsage.pains.map((pain) => ({ slug: pain.slug, name: pain.pain, description: pain.cost, href: `/pains#${pain.slug}`, supports: entries.filter((entry) => entry.pains.includes(pain.slug)).map((entry) => entry.key) })),
    cases: poesisUsage.useCases.map((useCase) => ({
      slug: useCase.slug, name: useCase.name, description: useCase.goal, href: `/usage/${useCase.slug}`, actors: useCase.actorTypes,
      values: valuesForUseCase(useCase.slug).map((value) => value.slug), pains: painsForUseCase(useCase.slug).map((pain) => pain.slug),
      state: useCaseStatus(useCase) ?? null,
      stateLabel: useCaseStatus(useCase) ? deliveryLabels[useCaseStatus(useCase)!] : null,
      supports: [...featuresForUseCase(useCase.slug).map((entry) => `feature:${entry.slug}`), ...capabilitiesForUseCase(useCase.slug).map((entry) => `capability:${entry.slug}`), ...affordancesForUseCase(useCase.slug).map((entry) => `affordance:${entry.slug}`)],
    })),
    actors: poesisUsage.actorTypes.map(({ slug, name }) => ({ slug, name })),
    supports: entries.map(({ values, pains, ...support }) => ({ ...support, stateLabel: deliveryLabels[support.state] })),
  };
}
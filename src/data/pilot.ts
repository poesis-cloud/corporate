import type { DeliveryState } from './poesis-platform.ts';

export interface PilotSupport {
  key: string;
  name: string;
  href: string;
  state: DeliveryState;
  stateLabel: string;
  owner: string;
}
export interface PilotNeed {
  slug: string;
  name: string;
  description: string;
  href: string;
  supports: string[];
}
export interface PilotCase extends PilotNeed {
  values: string[];
  pains: string[];
  actors: string[];
  state: DeliveryState | null;
  stateLabel: string | null;
}
export interface PilotCatalog {
  values: PilotNeed[];
  pains: PilotNeed[];
  cases: PilotCase[];
  actors: { slug: string; name: string }[];
  supports: PilotSupport[];
}
export interface PilotSelection { values: string[]; pains: string[]; cases: string[] }
export const tailoringFields = [
  { key: 'scope', label: 'Organizational scope', placeholder: 'Services, repositories, processes or boundaries to include' },
  { key: 'baseline', label: 'Current baseline', placeholder: 'What happens today? What is known or missing?' },
  { key: 'criteria', label: 'Proposed success criteria', placeholder: 'What observation would make this evaluation worthwhile?' },
  { key: 'evidence', label: 'Evidence and evaluation method', placeholder: 'Sources, comparison method and who will review the results' },
  { key: 'participants', label: 'Participants and responsibilities', placeholder: 'Roles needed for decisions, access and evaluation' },
  { key: 'timing', label: 'Timing and checkpoints', placeholder: 'Your preferred window, dependencies and review points' },
  { key: 'constraints', label: 'Access, security and other constraints', placeholder: 'Data boundaries, access conditions and operating requirements' },
  { key: 'exclusions', label: 'Exclusions and exit expectations', placeholder: 'Out-of-scope work, retained evidence and exit arrangements' },
] as const;
export type PilotDetails = Partial<Record<typeof tailoringFields[number]['key'], string>>;
export const pilotEmail = 'clement.cazaud@outlook.com';

export function normalizeSelection(input: Partial<PilotSelection>, catalog: PilotCatalog): PilotSelection {
  const valid = (slugs: string[] = [], records: { slug: string }[]) => [...new Set(slugs)].filter((slug) => records.some((record) => record.slug === slug));
  return { values: valid(input.values, catalog.values), pains: valid(input.pains, catalog.pains), cases: valid(input.cases, catalog.cases) };
}
export function selectionFromQuery(query: URLSearchParams, catalog: PilotCatalog): PilotSelection {
  return normalizeSelection({ values: query.getAll('value'), pains: query.getAll('pain'), cases: query.getAll('case') }, catalog);
}
export function selectionQuery(selection: PilotSelection, catalog: PilotCatalog): string {
  const valid = normalizeSelection(selection, catalog);
  const query = new URLSearchParams();
  for (const [kind, parameter] of [['values', 'value'], ['pains', 'pain'], ['cases', 'case']] as const) {
    for (const slug of valid[kind]) query.append(parameter, slug);
  }
  return query.toString();
}
export function matchesNeeds(useCase: PilotCase, selection: PilotSelection): boolean {
  return useCase.values.some((slug) => selection.values.includes(slug)) || useCase.pains.some((slug) => selection.pains.includes(slug));
}
export function filterCases(catalog: PilotCatalog, selection: PilotSelection, search = '', actor = ''): PilotCase[] {
  const hasNeeds = selection.values.length + selection.pains.length > 0;
  const text = search.trim().toLowerCase();
  return catalog.cases.filter((useCase) => (!hasNeeds || matchesNeeds(useCase, selection))
    && (!actor || useCase.actors.includes(actor))
    && `${useCase.name} ${useCase.description}`.toLowerCase().includes(text));
}
export function hasSelection(selection: PilotSelection): boolean {
  return selection.values.length + selection.pains.length + selection.cases.length > 0;
}
export function serializeBrief(catalog: PilotCatalog, input: PilotSelection, details: PilotDetails = {}): string {
  const selection = normalizeSelection(input, catalog);
  if (!hasSelection(selection)) return 'No registered values, pain points or use cases selected yet.';
  const selectedValues = catalog.values.filter((record) => selection.values.includes(record.slug));
  const selectedPains = catalog.pains.filter((record) => selection.pains.includes(record.slug));
  const selectedCases = catalog.cases.filter((record) => selection.cases.includes(record.slug));
  const absolute = (href: string) => new URL(href, 'https://poesis.cloud').href;
  const lines = [
    '# Poesis pilot discussion brief', '',
    'Evaluation environment assumed: ITIP + SIE SaaS. Selected scope and operating readiness require confirmation before kickoff.',
    'This draft does not book a pilot, provision SaaS or confirm scope, acceptance or commercial terms.', '',
  ];
  for (const [heading, records] of [['Desired values', selectedValues], ['Pain points', selectedPains]] as const) {
    lines.push(`## ${heading}`);
    if (!records.length) lines.push('None selected.');
    for (const record of records) {
      lines.push(`- ${record.name}`, `  ${record.description}`, `  ${absolute(record.href)}`);
      if (heading === 'Desired values') {
        for (const useCase of catalog.cases.filter((useCase) => useCase.values.includes(record.slug))) {
          lines.push(`  Constituent: ${useCase.name} | ${useCase.stateLabel ?? 'No registered support (not a planned-delivery claim)'}`);
        }
      }
      if (!catalog.cases.some((useCase) => (heading === 'Desired values' ? useCase.values : useCase.pains).includes(record.slug))) {
        lines.push('  Gap: no linked use case is registered for this need.');
      }
      if (!record.supports.length) lines.push('  Gap: no registered platform support for this need; this is not a planned-delivery claim.');
    }
    lines.push('');
  }
  lines.push('## Optional use cases');
  if (!selectedCases.length) lines.push('None selected. This value/pain-led brief remains valid; use-case scope is still to agree.');
  for (const useCase of selectedCases) {
    lines.push(`- ${useCase.name}`, `  Goal: ${useCase.description}`, `  Registered support: ${useCase.stateLabel ?? 'No registered support (not a planned-delivery claim)'}`, `  ${absolute(useCase.href)}`);
    if ((selection.values.length || selection.pains.length) && !matchesNeeds(useCase, selection)) lines.push('  Independently selected: no registered link to the currently selected needs.');
  }
  lines.push('', '## Registered supporting scope - confirmation required', 'These items may belong to other solutions. Their catalog states do not establish ITIP/SIE SaaS availability or implementation of the whole pilot.');
  const supportKeys = new Set([...selectedValues, ...selectedPains, ...selectedCases].flatMap((record) => record.supports));
  const supports = catalog.supports.filter((support) => supportKeys.has(support.key));
  if (!supports.length) lines.push('No registered platform support for the selected scope. This is a gap, not an implied delivery plan.');
  for (const support of supports) lines.push(`- ${support.name} | ${support.owner} | ${support.stateLabel} | ${absolute(support.href)}`);
  lines.push('', '## Visitor-proposed evaluation details');
  for (const field of tailoringFields) lines.push(`${field.label}: ${details[field.key]?.trim() || 'To agree'}`);
  lines.push('', '## Still to agree', 'Scope feasibility; operating readiness; SaaS hosting and data handling; access and responsibilities; evidence and acceptance criteria; timing; commercial terms; exit and evidence retention.', '', 'Canonical selections: ' + absolute('/pilot?' + selectionQuery(selection, catalog)));
  return lines.join('\n');
}
export function emailHandoff(brief: string): { href: string; shortened: boolean } {
  const subject = 'Poesis pilot scope discussion';
  const prefix = `mailto:${pilotEmail}?subject=${encodeURIComponent(subject)}&body=`;
  const full = prefix + encodeURIComponent(brief);
  const shortened = full.length > 1800;
  return { href: shortened ? prefix + encodeURIComponent('I would like to discuss an ITIP + SIE SaaS pilot. I will attach or paste my downloaded pilot brief before sending. Scope and terms remain to agree.') : full, shortened };
}
export function safePilotJson(catalog: PilotCatalog): string {
  return JSON.stringify(catalog).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}
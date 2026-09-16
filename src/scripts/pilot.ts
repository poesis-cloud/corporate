import { emailHandoff, filterCases, hasSelection, selectionFromQuery, selectionQuery, serializeBrief, tailoringFields, type PilotCatalog, type PilotDetails, type PilotSelection } from '../data/pilot';

const builder = document.querySelector<HTMLElement>('#pilot-builder');
const data = document.querySelector<HTMLScriptElement>('#pilot-data');
if (builder && data) {
  const catalog: PilotCatalog = JSON.parse(data.textContent ?? '{}');
  const element = <ElementType extends HTMLElement>(id: string) => document.getElementById(id) as ElementType;
  let selection = selectionFromQuery(new URLSearchParams(location.search), catalog);
  const details: PilotDetails = {};
  const caseSearch = element<HTMLInputElement>('pilot-case-search');
  const actor = element<HTMLSelectElement>('pilot-actor');
  const briefText = element<HTMLTextAreaElement>('pilot-brief-text');
  const actionStatus = element<HTMLElement>('pilot-action-status');
  const selectedList = element<HTMLUListElement>('pilot-selected-list');
  const checkboxes = [...builder.querySelectorAll<HTMLInputElement>('[data-select-kind]')];
  const caseElements = [...builder.querySelectorAll<HTMLElement>('[data-pilot-case]')];
  const actions = ['pilot-copy', 'pilot-download', 'pilot-email'].map((id) => element<HTMLButtonElement>(id));
  const names = { values: 'Value', pains: 'Pain point', cases: 'Use case' };
  let revision = 0;

  function renderCases() {
    const visible = new Set(filterCases(catalog, selection, caseSearch.value, actor.value).map((record) => record.slug));
    const needsSelected = selection.values.length + selection.pains.length > 0;
    for (const card of caseElements) {
      const useCase = catalog.cases.find((record) => record.slug === card.dataset.pilotCase)!;
      card.hidden = !visible.has(useCase.slug);
      const matches = [
        ...catalog.values.filter((need) => selection.values.includes(need.slug) && useCase.values.includes(need.slug)),
        ...catalog.pains.filter((need) => selection.pains.includes(need.slug) && useCase.pains.includes(need.slug)),
      ];
      card.querySelector<HTMLElement>('[data-match-reason]')!.textContent = matches.length ? `Linked to: ${matches.map((need) => need.name).join('; ')}` : 'Independent use-case scope';
    }
    element<HTMLElement>('pilot-case-count').textContent = visible.size
      ? `${visible.size} ${needsSelected ? 'linked' : 'registered'} use cases${needsSelected ? ' matching at least one selected need' : ''}`
      : 'No use cases match the selected needs and filters. Your selected needs remain a valid brief.';
  }
  function renderNeedFilter(kind: 'values' | 'pains') {
    const search = element<HTMLInputElement>(`pilot-${kind}-search`).value.trim().toLowerCase();
    let count = 0;
    for (const row of builder!.querySelectorAll<HTMLElement>(`[data-need-kind="${kind}"]`)) {
      const need = catalog[kind].find((record) => record.slug === row.dataset.needSlug)!;
      row.hidden = !`${need.name} ${need.description}`.toLowerCase().includes(search);
      if (!row.hidden) count++;
    }
    element<HTMLElement>(`pilot-${kind}-count`).textContent = count ? `${count} available / ${selection[kind].length} selected` : 'No matches. Clear search to see all entries.';
  }
  function renderBrief() {
    revision++;
    const ready = hasSelection(selection);
    briefText.value = serializeBrief(catalog, selection, details);
    actions.forEach((button) => { button.disabled = !ready; });
    actionStatus.textContent = ready ? 'Draft ready for review. Nothing has been sent.' : 'Select a value, pain point or use case to prepare a brief.';
  }
  function renderSelection(writeUrl = true) {
    const ready = hasSelection(selection);
    for (const checkbox of checkboxes) checkbox.checked = selection[checkbox.dataset.selectKind as keyof PilotSelection].includes(checkbox.value);
    selectedList.replaceChildren();
    for (const kind of ['values', 'pains', 'cases'] as const) {
      for (const slug of selection[kind]) {
        const record = catalog[kind].find((entry) => entry.slug === slug)!;
        const row = document.createElement('li');
        const label = document.createElement('span');
        label.textContent = `${names[kind]}: ${record.name}`;
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = '\u00d7';
        remove.setAttribute('aria-label', `Remove ${record.name}`);
        remove.title = `Remove ${record.name}`;
        remove.addEventListener('click', () => {
          const index = [...selectedList.children].indexOf(row);
          selection[kind] = selection[kind].filter((selected) => selected !== slug);
          renderSelection();
          const next = selectedList.children[Math.min(index, selectedList.children.length - 1)];
          (next?.querySelector('button') ?? element<HTMLInputElement>('pilot-values-search')).focus();
        });
        row.append(label, remove);
        selectedList.append(row);
      }
    }
    element<HTMLElement>('pilot-selection-empty').hidden = ready;
    element<HTMLButtonElement>('pilot-clear-selection').disabled = !ready;
    element<HTMLElement>('pilot-count').textContent = `${selection.values.length} values / ${selection.pains.length} pain points / ${selection.cases.length} use cases selected`;
    const gaps = [...catalog.values.filter((need) => selection.values.includes(need.slug) && !catalog.cases.some((useCase) => useCase.values.includes(need.slug))), ...catalog.pains.filter((need) => selection.pains.includes(need.slug) && !catalog.cases.some((useCase) => useCase.pains.includes(need.slug)))];
    element<HTMLElement>('pilot-gaps').textContent = gaps.length ? `${gaps.length} selected need${gaps.length === 1 ? ' has' : 's have'} no registered use-case link. This gap remains in your brief.` : '';
    renderNeedFilter('values');
    renderNeedFilter('pains');
    renderCases();
    renderBrief();
    if (writeUrl) {
      const query = selectionQuery(selection, catalog);
      try { history.replaceState(null, '', location.pathname + (query ? `?${query}` : '') + location.hash); }
      catch { actionStatus.textContent = 'Draft updated. The selection link could not be updated; copy or download the brief to keep it.'; }
    }
  }
  for (const checkbox of checkboxes) checkbox.addEventListener('change', () => {
    const kind = checkbox.dataset.selectKind as keyof PilotSelection;
    selection[kind] = checkbox.checked ? [...new Set([...selection[kind], checkbox.value])] : selection[kind].filter((slug) => slug !== checkbox.value);
    renderSelection();
  });
  for (const kind of ['values', 'pains'] as const) {
    element<HTMLInputElement>(`pilot-${kind}-search`).addEventListener('input', () => renderNeedFilter(kind));
    builder.querySelector<HTMLButtonElement>(`[data-clear-search="${kind}"]`)!.addEventListener('click', () => {
      element<HTMLInputElement>(`pilot-${kind}-search`).value = '';
      renderNeedFilter(kind);
    });
  }
  caseSearch.addEventListener('input', renderCases);
  actor.addEventListener('change', renderCases);
  element<HTMLButtonElement>('pilot-reset-case-filters').addEventListener('click', () => { caseSearch.value = ''; actor.value = ''; renderCases(); });
  element<HTMLButtonElement>('pilot-clear-selection').addEventListener('click', () => {
    selection = { values: [], pains: [], cases: [] };
    renderSelection();
    element<HTMLInputElement>('pilot-values-search').focus();
  });
  for (const field of tailoringFields) element<HTMLTextAreaElement>(`pilot-${field.key}`).addEventListener('input', (event) => {
    details[field.key] = (event.target as HTMLTextAreaElement).value;
    renderBrief();
  });
  element<HTMLButtonElement>('pilot-copy').addEventListener('click', async () => {
    const copiedRevision = revision;
    try {
      await navigator.clipboard.writeText(briefText.value);
      actionStatus.textContent = copiedRevision === revision ? 'Brief copied. Nothing has been sent.' : 'An earlier draft was copied. Copy again for your latest changes.';
    } catch {
      briefText.focus();
      briefText.select();
      actionStatus.textContent = 'Clipboard unavailable. The brief is selected for manual copying; download is also available.';
    }
  });
  element<HTMLButtonElement>('pilot-download').addEventListener('click', () => {
    let href: string | undefined;
    try {
      href = URL.createObjectURL(new Blob([briefText.value], { type: 'text/markdown;charset=utf-8' }));
      const link = document.createElement('a');
      link.href = href;
      link.download = 'poesis-pilot-brief.md';
      document.body.append(link);
      link.click();
      link.remove();
      actionStatus.textContent = 'Download requested. Nothing has been sent.';
    } catch {
      actionStatus.textContent = 'Download could not be prepared. Copy the brief or select its text instead.';
    } finally {
      if (href) { const objectUrl = href; setTimeout(() => URL.revokeObjectURL(objectUrl), 1000); }
    }
  });
  element<HTMLButtonElement>('pilot-email').addEventListener('click', () => {
    const handoff = emailHandoff(briefText.value);
    actionStatus.textContent = handoff.shortened
      ? 'Email handoff requested with a short message. Download and attach the brief, or paste it before sending. Nothing was sent by this page.'
      : 'Email handoff requested. Review the draft in your mail application before sending. Nothing was sent by this page.';
    const link = document.createElement('a');
    link.href = handoff.href;
    link.rel = 'noreferrer';
    link.click();
  });
  addEventListener('popstate', () => { selection = selectionFromQuery(new URLSearchParams(location.search), catalog); renderSelection(); });
  renderSelection();
  builder.hidden = false;
  element<HTMLElement>('pilot-fallback').hidden = true;
}
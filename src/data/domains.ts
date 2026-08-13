/** Poesis domains — the buyer-facing axis (who Poesis is for), sibling of the Solutions axis (what Poesis ships). */

export interface Domain {
  slug: string;
  href: string;
  name: string;
  label: string;
  tag: string;
  blurb: string;
}

export const domains: Domain[] = [
  {
    slug: 'it',
    href: '/it/',
    name: 'IT',
    label: 'Poesis for IT',
    tag: 'First domain — shipping',
    blurb:
      'Define, govern, and prove your IT landscape — enterprise architecture, continuous compliance, impact simulation — through one governed source of truth, delivered by ITIP.',
  },
  {
    slug: 'research',
    href: '/research/',
    name: 'Research',
    label: 'Poesis for Research',
    tag: 'Emerging domain',
    blurb:
      'Constitute open-ended and agentic research as a governed institution — hypotheses with identity and lifecycle, evidence with provenance, obligations with owners, verdicts that are deterministic.',
  },
];

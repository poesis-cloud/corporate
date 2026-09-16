/** Poesis domains — the buyer-facing axis (who Poesis is for), sibling of the Solutions axis (what Poesis ships). */

/**
 * A domain is pure classification. It carries no link of its own: everything a
 * reader can open lives on a solution, product or usage route, and a domain
 * landing page would only duplicate the homepage.
 */
export interface Domain {
  slug: string;
  name: string;
  label: string;
  tags: string[];
  blurb: string;
}

export const domains: Domain[] = [
  {
    slug: 'it',
    name: 'IT',
    label: 'Poesis for IT',
    tags: ['First domain — foundations and planned workflows'],
    blurb:
      'Planned IT definition, evidence review, appraisal and analysis workflows, over existing authentication, specification and engine foundations.',
  },
];

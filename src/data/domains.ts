/** Poesis domains — the buyer-facing axis (who Poesis is for), sibling of the Solutions axis (what Poesis ships). */
import catalog from './catalog/poesis-usage.json' with { type: 'json' };

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

export const domains: Domain[] = catalog.domains;

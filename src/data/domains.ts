/** Poesis domains — the buyer-facing axis (who Poesis is for), sibling of the Solutions axis (what Poesis ships). */
import { alternatives } from './alternatives.ts';

export interface DomainSubitem {
  href: string;
  label: string;
}

export interface Domain {
  slug: string;
  href: string;
  name: string;
  label: string;
  tag: string;
  blurb: string;
  /** Solutions whose products deliver in this domain (validated against the pain graph). */
  solutions?: string[];
  /** Sub-pages/sections shown as a nav submenu, like Solutions → Products. */
  subitems?: DomainSubitem[];
}

export const domains: Domain[] = [
  {
    slug: 'it',
    href: '/',
    name: 'IT',
    label: 'Poesis for IT',
    tag: 'First domain — shipping',
    blurb:
      'Define, govern, and prove your IT landscape — enterprise architecture, continuous compliance, impact simulation — through one governed source of truth, delivered by ITIP.',
    solutions: ['itip', 'sie', 'gsm', 'saf'],
    subitems: [
      { href: '/#integration', label: 'Integrations — works with your stack' },
      ...alternatives.map((a) => ({
        href: `/it/alternatives/${a.slug}/`,
        label: `Compared to ${a.name}`,
      })),
    ],
  },
];

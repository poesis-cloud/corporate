import { platformSolutions, solutionHref } from './poesis-platform.ts';
import { alternatives } from './alternatives.ts';

export interface SiteNavigationItem {
  href: string;
  label: string;
  external?: boolean;
  children?: SiteNavigationItem[];
}

export interface SiteNavigationSection {
  label?: string;
  items: SiteNavigationItem[];
  layout?: 'solutions';
}

export interface SiteNavigationGroup {
  label: string;
  sections: SiteNavigationSection[];
  layout?: 'platform';
}

/** What someone arrives with: the demand side of the catalog. */
export const needViews: SiteNavigationItem[] = [
  { href: '/catalog/usage', label: 'Use Cases' },
  { href: '/catalog/actors', label: 'Actors' },
  { href: '/catalog/pains', label: 'Pain Points' },
  { href: '/catalog/values', label: 'Values' },
];

/** What answers it: the supply side, from the broadest promise down to the shipped unit. */
export const coverageViews: SiteNavigationItem[] = [
  { href: '/catalog/affordances', label: 'Affordances' },
  { href: '/catalog/capabilities', label: 'Capabilities' },
  { href: '/catalog/features', label: 'Features' },
  { href: '/catalog/qualities', label: 'Qualities' },
];

/** What is packaged and sold. */
export const portfolioViews: SiteNavigationItem[] = [
  { href: '/catalog/solutions', label: 'Solutions' },
  { href: '/catalog/products', label: 'Products' },
  { href: '/catalog/services', label: 'Services' },
];

/** Every catalog view, and the in-page nav of every catalog page. */
export const catalogViews: SiteNavigationItem[] = [...needViews, ...coverageViews, ...portfolioViews];

export const siteNavigation: SiteNavigationGroup[] = [
  {
    label: 'Platform',
    layout: 'platform',
    sections: [
      {
        label: 'By solution & product',
        layout: 'solutions',
        items: [
          { href: '/#portfolio', label: 'Platform Overview' },
          ...platformSolutions.map((solution) => ({
            href: solutionHref(solution),
            label: solution.fullName,
            children: solution.products.map((product) => ({
              href: `${solutionHref(solution)}/products/${product.slug}`,
              label: product.name,
            })),
          })),
        ],
      },
      {
        label: 'By need',
        items: needViews,
      },
      {
        label: 'By coverage',
        items: [...coverageViews, ...portfolioViews],
      },
      {
        label: 'By comparison',
        items: alternatives.map((a) => ({
          href: `/it/alternatives/${a.slug}/`,
          label: `Compared to ${a.name}`,
        })),
      },
    ],
  },
  {
    label: 'Services',
    sections: [
      {
        label: 'Engagements',
        items: [
          { href: '/services/consulting', label: 'Agentic Use Case Discovery' },
          { href: '/#pilot', label: 'Poesis Pilot' },
          { href: '/services/on-prem-integration-administration', label: 'Enterprise Implementation' },
        ],
      },
      {
        label: 'Delivery',
        items: [
          { href: '/services/consulting', label: 'Consulting' },
          { href: '/services/saas', label: 'SaaS' },
          { href: '/services/on-prem-integration-administration', label: 'On-prem' },
          { href: '/services/certification', label: 'Certification' },
        ],
      },
    ],
  },
  {
    label: 'Partnerships',
    sections: [
      {
        items: [
          { href: '/partnerships/llm-vendor-value-proposal', label: 'LLM Vendor Partnership' },
        ],
      },
    ],
  },
  {
    label: 'Developers',
    sections: [
      {
        items: [
          { href: 'https://docs.poesis.cloud', label: 'Documentation', external: true },
          { href: 'https://github.community/', label: 'Community', external: true },
          { href: 'https://github.com/orgs/poesis-cloud/repositories', label: 'Repositories', external: true },
          { href: 'https://github.com/orgs/poesis-cloud/projects', label: 'Projects', external: true },
          { href: 'https://github.com/poesis-cloud', label: 'Organization', external: true },
        ],
      },
    ],
  },
  {
    label: 'Insights',
    sections: [
      {
        items: [
          { href: '/insights/research', label: 'Articles' },
        ],
      },
    ],
  },
  {
    label: 'Company',
    sections: [
      {
        items: [
          { href: '/catalog', label: 'Catalog' },
          { href: '/about', label: 'About' },
          { href: '/contact', label: 'Contact' },
          { href: 'https://www.linkedin.com/company/poesis-cloud', label: 'LinkedIn', external: true },
        ],
      },
    ],
  },
];

const footerLabels: Record<string, string[]> = {
  Platform: ['Platform Overview', 'Use Cases', 'IT Intelligence Platform', 'Systemic Intelligence Engine', 'Generative System Model', 'Systemic Agentic Framework'],
  Services: ['Poesis Pilot', 'Consulting', 'SaaS', 'On-prem', 'Certification'],
  Partnerships: ['LLM Vendor Partnership'],
  Developers: ['Documentation', 'Community', 'Repositories', 'Projects', 'Organization'],
  Insights: ['Articles', 'Research'],
  Company: ['Catalog', 'About', 'Contact', 'LinkedIn'],
};

export const footerNavigation = siteNavigation.map((group) => {
  const groupItems = group.sections.flatMap((section) => section.items);

  return {
    label: group.label,
    items: footerLabels[group.label].flatMap((label) => {
      const item = groupItems.find((candidate) => candidate.label === label);
      return item ? [item] : [];
    }),
  };
});
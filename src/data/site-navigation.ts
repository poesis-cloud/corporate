import { poesisPortfolio } from './poesis-portfolio.ts';

export interface SiteNavigationItem {
  href: string;
  label: string;
  external?: boolean;
  children?: SiteNavigationItem[];
}

export interface SiteNavigationSection {
  label?: string;
  items: SiteNavigationItem[];
}

export interface SiteNavigationGroup {
  label: string;
  sections: SiteNavigationSection[];
}

export const siteNavigation: SiteNavigationGroup[] = [
  {
    label: 'Platform',
    sections: [
      {
        label: 'By challenge',
        items: [
          { href: '/solutions/saf/products/agentic-harness', label: 'Govern AI Agents' },
          { href: '/solutions/saf', label: 'Govern Agentic Software Delivery' },
          { href: '/solutions/itip', label: 'Automate IT Governance' },
          { href: '/solutions/sie', label: 'Build Agent-Ready Enterprise Systems' },
        ],
      },
      {
        label: 'By domain',
        items: [
          { href: '/it/', label: 'Poesis for IT' },
          { href: '/research/', label: 'Poesis for Research' },
        ],
      },
      {
        label: 'By solutions',
        items: [
          { href: '/#portfolio', label: 'Platform Overview' },
          ...poesisPortfolio.map((solution) => ({
            href: solution.href,
            label: solution.fullName,
            children: solution.products.map((product) => ({
              href: `${solution.href}/products/${product.slug}`,
              label: product.name,
            })),
          })),
        ],
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
          { href: '/research/', label: 'Research' },
        ],
      },
    ],
  },
  {
    label: 'Company',
    sections: [
      {
        items: [
          { href: '/about', label: 'About' },
          { href: '/contact', label: 'Contact' },
          { href: 'https://www.linkedin.com/company/poesis-cloud', label: 'LinkedIn', external: true },
        ],
      },
    ],
  },
];

const footerLabels: Record<string, string[]> = {
  Platform: ['Platform Overview', 'IT Intelligence Platform', 'Systemic Intelligence Engine', 'Generative System Model', 'Systemic Agentic Framework'],
  Services: ['Poesis Pilot', 'Consulting', 'SaaS', 'On-prem', 'Certification'],
  Partnerships: ['LLM Vendor Partnership'],
  Developers: ['Documentation', 'Community', 'Repositories', 'Projects', 'Organization'],
  Insights: ['Articles', 'Research'],
  Company: ['About', 'Contact', 'LinkedIn'],
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
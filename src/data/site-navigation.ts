export interface SiteNavigationItem {
  href: string;
  label: string;
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
    label: 'Solutions',
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
        label: 'Technology',
        items: [
          { href: '/solutions/saf/products/agentic-harness', label: 'Agentic Harness' },
          { href: '/solutions/saf', label: 'SAF' },
          { href: '/solutions/itip', label: 'ITIP' },
          { href: '/solutions/sie', label: 'SIE' },
        ],
      },
    ],
  },
  {
    label: 'Platform',
    sections: [
      {
        items: [
          { href: '/#portfolio', label: 'Platform Overview' },
          { href: '/solutions/gsm', label: 'GSM' },
          { href: '/solutions/sie', label: 'SIE' },
          { href: '/solutions/itip', label: 'ITIP' },
          { href: '/solutions/saf', label: 'SAF' },
          { href: '/solutions/saf/products/agentic-harness', label: 'Agentic Harness' },
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
    label: 'Developers',
    sections: [
      {
        items: [
          { href: 'https://docs.poesis.cloud/saf/quickstart/', label: 'Quickstart' },
          { href: 'https://docs.poesis.cloud', label: 'Documentation' },
          { href: '/solutions/saf/products/agentic-harness', label: 'Agentic Harness' },
          { href: 'https://docs.poesis.cloud/gsm/', label: 'GSM Overview' },
          { href: 'https://github.com/poesis-cloud', label: 'GitHub' },
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
          { href: '/partnerships/llm-vendor-value-proposal', label: 'LLM Vendor Partnership' },
          { href: '/contact', label: 'Contact' },
        ],
      },
      {
        label: 'Community',
        items: [
          { href: 'https://www.linkedin.com/company/poesis-cloud', label: 'LinkedIn' },
        ],
      },
    ],
  },
];

const footerLabels: Record<string, string[]> = {
  Solutions: ['Poesis for IT', 'Poesis for Research'],
  Platform: ['Platform Overview', 'GSM', 'SIE', 'ITIP', 'SAF', 'Agentic Harness'],
  Services: ['Poesis Pilot', 'Consulting', 'SaaS', 'On-prem', 'Certification'],
  Developers: ['Quickstart', 'Documentation', 'GitHub'],
  Insights: ['Articles', 'Research'],
  Company: ['About', 'LLM Vendor Partnership', 'Contact', 'LinkedIn'],
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
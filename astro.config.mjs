// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://poesis.cloud',
  integrations: [sitemap()],
  redirects: {
    '/insights/itip-compliance-proof': '/insights/continuous-regulatory-compliance',
    '/actors': '/catalog/actors',
    '/affordances': '/catalog/affordances',
    '/capabilities': '/catalog/capabilities',
    '/features': '/catalog/features',
    '/pains': '/catalog/pains',
    '/products': '/catalog/products',
    '/qualities': '/catalog/qualities',
    '/services': '/catalog/services',
    '/services/consulting': '/services/agentic-transformation',
    '/services/saas': '/catalog/services',
    '/services/on-prem-integration-administration': '/catalog/services',
    '/services/certification': '/services/gsm-certification',
    '/solutions': '/catalog/solutions',
    '/usage': '/catalog/usage',
    '/values': '/catalog/values',
  },
});

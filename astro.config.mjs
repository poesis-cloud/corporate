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
    '/solutions': '/catalog/solutions',
    '/usage': '/catalog/usage',
    '/values': '/catalog/values',
  },
});

// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://poesis.cloud',
  integrations: [sitemap()],
  redirects: {
    '/insights/itip-compliance-proof': '/insights/continuous-regulatory-compliance',
  },
});

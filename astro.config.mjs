// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://poesis.cloud',
  integrations: [sitemap()],
  redirects: {
    '/products': '/solutions',
    '/partnerships/llm-providers': '/partnerships/llm-vendor-value-proposal',
    '/partnerships/llm-provider-value-proposal': '/partnerships/llm-vendor-value-proposal',
  },
});

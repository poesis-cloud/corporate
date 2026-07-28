// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://poesis.cloud',
  integrations: [sitemap()],
  redirects: {
    '/products': '/#portfolio',
    '/solutions': '/#portfolio',
    '/gsm': '/solutions/gsm',
    '/sie': '/solutions/sie',
    '/itip': '/solutions/itip',
    '/framework': '/solutions/framework',
    '/partnerships/llm-providers': '/partnerships/llm-vendor-value-proposal',
    '/partnerships/llm-provider-value-proposal': '/partnerships/llm-vendor-value-proposal',
  },
});

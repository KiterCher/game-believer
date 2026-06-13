import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import UnoCSS from 'unocss/astro';

export default defineConfig({
  site: 'https://gamebeliever.com',
  integrations: [
    sitemap(),
    UnoCSS(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});

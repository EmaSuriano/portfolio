import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { astroImageTools } from 'astro-imagetools';
import mdx from '@astrojs/mdx';
import remarkPlugins from './remark-plugins';

export default defineConfig({
  site: 'https://emasuriano.com',
  integrations: [
    tailwind(),
    sitemap(),
    astroImageTools,
    compress(),
    mdx({ remarkPlugins, syntaxHighlight: 'prism' }),
  ],
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins,
  },
});

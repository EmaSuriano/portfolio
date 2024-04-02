import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { astroImageTools } from 'astro-imagetools';
import mdx from '@astrojs/mdx';
import remarkPlugins from './remark-plugins';
import icon from "astro-icon";


export default defineConfig({
  site: 'https://emasuriano.com/',
  integrations: [
    tailwind(),
    sitemap(),
    astroImageTools,
    compress(),
    icon(),
    mdx({ remarkPlugins, syntaxHighlight: 'prism' }),
  ],
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins,
  },
  redirects: {
    '/resume': 'https://resume.emasuriano.com',
  }
});

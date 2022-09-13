import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './remark-reading-time.js';

import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import compress from 'astro-compress';

export default defineConfig({
  site: 'https://emasuriano.com',
  integrations: [
    tailwind(),
    sitemap(),
    image(),
    mdx({
      remarkPlugins: [remarkReadingTime],
    }),
    compress(),
  ],
  markdown: {
    syntaxHighlight: 'prism',
  },
});

import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './remark-reading-time.mjs';

import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import compress from 'astro-compress';

export default defineConfig({
  site: 'https://astro.mineev.me',
  integrations: [
    tailwind({ config: { applyBaseStyles: false } }),
    sitemap(),
    image(),
    mdx(),
    compress({ img: false }),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      'rehype-slug',
      'rehype-autolink-headings',
      'rehype-code-titles',
      'rehype-prism',
    ],
  },
  vite: {
    server: {
      proxy: {
        '/api': 'http://localhost:8787',
      },
    },
  },
});

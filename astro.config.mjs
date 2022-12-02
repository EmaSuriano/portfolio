import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './remark-reading-time.js';

import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import remarkFigureCaption from '@microflash/remark-figure-caption';
import remarkSlug from 'remark-slug';
import remarkAutolinkHeadings from 'remark-autolink-headings';

export default defineConfig({
  site: 'https://emasuriano.com',
  integrations: [
    tailwind(),
    sitemap(),
    image(),
    mdx({
      remarkPlugins: [
        remarkReadingTime,
        remarkFigureCaption,
        remarkSlug,
        remarkAutolinkHeadings,
      ],
    }),
  ],
  markdown: {
    syntaxHighlight: 'prism',
  },
});

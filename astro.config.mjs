import { defineConfig } from 'astro/config';
// import pkg from './remark-reading-time.js';
import compress from 'astro-compress';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { astroImageTools } from 'astro-imagetools';
import mdx from '@astrojs/mdx';
import remarkFigureCaption from '@microflash/remark-figure-caption';
import remarkSlug from 'remark-slug';
import remarkAutolinkHeadings from 'remark-autolink-headings';

export default defineConfig({
  site: 'https://emasuriano.com',
  integrations: [
    tailwind(),
    sitemap(),
    astroImageTools,
    compress(),
    mdx({
      remarkPlugins: [remarkFigureCaption, remarkSlug, remarkAutolinkHeadings],
    }),
  ],
  markdown: {
    syntaxHighlight: 'prism',
  },
});

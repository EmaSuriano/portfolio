import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './remark-reading-time';
import { remarkAstroLocalImages } from './remark-astro-markdown-local-images';
import compress from 'astro-compress';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { astroImageTools } from 'astro-imagetools';
import mdx from '@astrojs/mdx';
import remarkFigureCaption from '@microflash/remark-figure-caption';
import remarkSlug from 'remark-slug';
import remarkAutolinkHeadings from 'remark-autolink-headings';

const remarkPlugins = [
  remarkFigureCaption,
  remarkSlug,
  remarkAutolinkHeadings,
  remarkReadingTime,
  remarkAstroLocalImages(),
];

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

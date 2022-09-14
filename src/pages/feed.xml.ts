import rss from '@astrojs/rss';
import { parseISO } from 'date-fns';
import { sortPostByDate } from 'helpers';
import type { Post } from 'types';

const postImportResult = import.meta.globEager<Post>('./blog/**/*.{md,mdx}');
const posts = Object.values(postImportResult);

export function get() {
  return rss({
    title: `Ema Suriano's Blog`,
    description:
      'Passionate Engineer driven by all the Javascript ecosystem. On my spare time I like to write and speak publicly',
    site: import.meta.env.SITE,
    items: posts.sort(sortPostByDate).map((post) => ({
      link: post.url,
      title: post.frontmatter.title,
      pubDate: parseISO(post.frontmatter.publishedAt),
      description: post.frontmatter.summary,
    })),
  });
}

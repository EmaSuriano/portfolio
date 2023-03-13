import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import about from '../author.json';

import { sortPostByDate } from 'helpers';

const BASE_URL = import.meta.env.DEV
  ? 'http://localhost:3000'
  : import.meta.env.SITE;

const allBlogPosts = await getCollection('blog');
const allExternalPosts = await getCollection('external');

const posts = [...allBlogPosts, ...allExternalPosts];

export function get() {
  const site = import.meta.env.SITE;

  return rss({
    title: `${about.name}'s Blog`,
    description: about.bio,
    site,
    items: posts.sort(sortPostByDate).map((post) => {
      return {
        link:
          post.collection === 'external'
            ? post.data.external
            : BASE_URL.concat(post.slug),
        title: post.data.title,
        pubDate: post.data.publishedAt,
        description: post.data.summary,
      };
    }),
  });
}

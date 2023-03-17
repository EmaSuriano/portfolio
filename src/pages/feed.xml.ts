import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import about from '../author.json';

import { BLOG_PATH, getPostLink, sortPostByDate } from 'helpers';

const allBlogPosts = await getCollection('blog');
const allExternalPosts = await getCollection('external');

const posts = [...allBlogPosts, ...allExternalPosts].sort(sortPostByDate);

export function get() {
  const site = import.meta.env.SITE;

  return rss({
    title: `${about.name}'s Blog`,
    description: about.bio,
    site,
    items: posts.map((post) => {
      return {
        link: getPostLink(post, BLOG_PATH),
        title: post.data.title,
        pubDate: post.data.publishedAt,
        description: post.data.summary,
      };
    }),
  });
}

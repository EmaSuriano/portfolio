import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import about from '../author.json';

import { getPostLink, sortPostByDate } from 'helpers';

const BLOG_PATH = '/blog';
const LOCAL_DEV = 'http://localhost:3000';
const BASE_URL = new URL(
  BLOG_PATH,
  import.meta.env.DEV ? LOCAL_DEV : import.meta.env.SITE,
);

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
        link: getPostLink(post, BASE_URL),
        title: post.data.title,
        pubDate: post.data.publishedAt,
        description: post.data.summary,
      };
    }),
  });
}

import about from 'author.json';
import { BLOG_PATH, getPostLink, humanize, sortPostByDate } from 'helpers';
import { getCollection } from 'astro:content';

type Link = {
  title: string;
  url: string;
};

const { name, bio, website, projects, talks } = about;

const allBlogPosts = await getCollection('blog');
const allExternalPosts = await getCollection('external');

const posts = [...allBlogPosts, ...allExternalPosts].sort(sortPostByDate);

const summary = {
  name,
  bio,
  website,
  projects: projects.map(
    (url): Link => ({
      title: humanize(url.split('/').pop()),
      url,
    }),
  ),
  posts: posts.map(
    (post): Link => ({
      title: post.data.title,
      url: getPostLink(post, BLOG_PATH),
    }),
  ),
  talks: talks.map((talk): Link => ({ title: talk.title, url: talk.url })),
};

export function GET() {
  return new Response(JSON.stringify(summary), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

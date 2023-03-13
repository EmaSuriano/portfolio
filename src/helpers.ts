import { differenceInDays } from 'date-fns';
import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'blog'> | CollectionEntry<'external'>;

type Group = { year: number; posts: Post[] };

export const humanize = (text = '') => {
  return text
    .split('-')
    .map((word) => word[0]!.toUpperCase() + word.slice(1 - word.length))
    .join(' ');
};

export const sortPostByDate = (a: Post, b: Post) =>
  differenceInDays(b.data.publishedAt, a.data.publishedAt);

export const groupPostsByDate = (posts: Post[]): Group[] => {
  const grouped = posts.reduce((acc, curr) => {
    const year = curr.data.publishedAt.getFullYear();

    return { ...acc, [year]: acc[year] ? acc[year]!.concat(curr) : [curr] };
  }, {} as Record<string, Post[]>);

  return Object.entries(grouped)
    .map(([year, posts]) => ({
      year: Number(year),
      posts: posts.sort(sortPostByDate),
    }))
    .sort((a, b) => b.year - a.year);
};

export const getPostLink = (post: Post, baseUrl: string) => {
  switch (post.collection) {
    case 'blog':
      return [baseUrl, post.slug].join('/');

    case 'external':
      return post.data.external;

    /* istanbul ignore next */
    default:
      throw new Error('Collection not find');
  }
};

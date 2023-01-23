import type { Post } from 'types';
import { differenceInDays, parseISO } from 'date-fns';

export const humanize = (text = '') => {
  return text
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1 - word.length))
    .join(' ');
};

export const sortPostByDate = (a: Post, b: Post) =>
  differenceInDays(
    parseISO(b.frontmatter.publishedAt),
    parseISO(a.frontmatter.publishedAt),
  );

type Group = { year: number; posts: Post[] };

export const groupPostsByDate = (posts: Post[]): Group[] => {
  const grouped = posts.reduce((acc, curr) => {
    const year = parseISO(curr.frontmatter.publishedAt).getFullYear();
    return { ...acc, [year]: acc[year] ? acc[year].concat(curr) : [curr] };
  }, {} as Record<string, Post[]>);

  return Object.entries(grouped)
    .map(([year, posts]) => ({
      year: Number(year),
      posts: posts.sort(sortPostByDate),
    }))
    .sort((a, b) => b.year - a.year);
};

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

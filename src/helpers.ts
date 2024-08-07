import { differenceInDays } from "date-fns";
import type { CollectionEntry } from "astro:content";

type Post =
  | CollectionEntry<"blog">
  | CollectionEntry<"external">
  | CollectionEntry<"til">;

type Group = { year: number; posts: Post[] };

type Link = {
  title: string;
  url: string;
};

export type Summary = {
  name: string;
  bio: string;
  website: string;
  projects: Link[];
  talks: Link[];
  posts: (Post & { url: string })[];
};

export const humanize = (text = "") => {
  return text
    .split("-")
    .map((word) => word[0]!.toUpperCase() + word.slice(1 - word.length))
    .join(" ");
};

export const sortPostByDate = (a: Post, b: Post) =>
  differenceInDays(b.data.publishedAt, a.data.publishedAt);

export const groupPostsByDate = (posts: Post[]): Group[] => {
  const grouped = posts.reduce(
    (acc, curr) => {
      const year = curr.data.publishedAt.getFullYear();

      return { ...acc, [year]: acc[year] ? acc[year]!.concat(curr) : [curr] };
    },
    {} as Record<string, Post[]>,
  );

  return Object.entries(grouped)
    .map(([year, posts]) => ({
      year: Number(year),
      posts: posts.sort(sortPostByDate),
    }))
    .sort((a, b) => b.year - a.year);
};

export const getPostLink = (post: Post) => {
  const { SITE, DEV } = import.meta.env;
  const base = new URL(DEV ? "http://localhost:4321" : SITE);

  switch (post.collection) {
    case "blog":
      return new URL(`blog/${post.slug}`, base).toString();

    case "til":
      return new URL(`til/${post.slug}`, base).toString();

    case "external":
      return post.data.external;

    /* istanbul ignore next */
    default:
      throw new Error("Collection not find");
  }
};

export const hasCommonItem = (arr1: string[], arr2: string[]) =>
  arr1.some((item1) =>
    arr2.map((item2) => item2.toLowerCase()).includes(item1.toLowerCase()),
  );

type Title = {
  level: number;
  title: string;
};

export const extractMarkdownTitles = (markdown: string): Title[] => {
  const titles: Title[] = [];

  const lines = markdown.split("\n");
  let inCodeBlock = false;

  lines.forEach((line) => {
    // Check for code block delimiters
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      return;
    }

    // If we're not in a code block, check for titles
    if (!inCodeBlock) {
      const titleMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (titleMatch) {
        titles.push({
          level: titleMatch[1]!.length,
          title: titleMatch[2]!.trim(),
        });
      }
    }
  });

  return titles;
};

export const isDraft = (post: Post): boolean => {
  switch (post.collection) {
    case "blog":
    case "til":
      return Boolean(post.data.draft);

    case "external":
    default:
      return false;
  }
};

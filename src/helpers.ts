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

// @ts-expect-error let me be
import * as config from './author.json';

type SharedFrontmatter = {
  title: string;
  summary: string;
  publishedAt: string;
  minutesRead: string;
};

export type InternalPost = {
  frontmatter: SharedFrontmatter & { cover: string };
  url: string;
};

export type ExternalPost = {
  frontmatter: SharedFrontmatter & { external: string };
  url: string;
};

export type Post = InternalPost | ExternalPost;

export type Config = typeof config;

export type Project = (typeof config.projects)[number];

export type Social = (typeof config.social)[number];

export type Talk = (typeof config.talks)[number];

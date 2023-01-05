// @ts-expect-error let me be
import * as config from './author.json';

export type InternalPost = {
  frontmatter: {
    title: string;
    summary: string;
    publishedAt: string;
    minutesRead: string;
    cover: string;
  };
  url: string;
};

export type ExternalPost = {
  frontmatter: {
    title: string;
    summary: string;
    publishedAt: string;
    external: string;
  };
  url: string;
};

export type Post = {
  frontmatter: InternalPost | ExternalPost;
  url: string;
};

export type Config = typeof config;

export type Project = typeof config.projects[number];

export type Social = typeof config.social[number];

export type Talk = typeof config.talks[number];

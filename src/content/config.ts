import { defineCollection, z } from "astro:content";

const blogSchema = z.object({
  title: z.string(),
  summary: z.string(),
  publishedAt: z.date(),
  cover: z.string(),
  draft: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

const tilSchema = z.object({
  title: z.string(),
  publishedAt: z.date(),
  summary: z.string(),
  draft: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

const externalSchema = z.object({
  title: z.string(),
  summary: z.string(),
  external: z.string().url(),
  publishedAt: z.date(),
});

const podcastSchema = z.object({
  title: z.string(),
  publishedAt: z.date(),
  summary: z.string(),
  src: z.string(),
  length: z.string(),
});

export const collections = {
  blog: defineCollection({ schema: blogSchema }),
  external: defineCollection({ schema: externalSchema }),
  til: defineCollection({ schema: tilSchema }),
  podcast: defineCollection({ schema: podcastSchema }),
};

import { defineCollection, z } from 'astro:content';

const blogSchema = z.object({
  title: z.string(),
  summary: z.string(),
  cover: z.string(),
  publishedAt: z.date(),
  draft: z.boolean().optional(),
});

const externalSchema = z.object({
  title: z.string(),
  summary: z.string(),
  external: z.string().url(),
  publishedAt: z.date(),
});

export const collections = {
  blog: defineCollection({ schema: blogSchema }),
  external: defineCollection({ schema: externalSchema }),
};

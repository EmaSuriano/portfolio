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

const toolsSchema = z.object({
  title: z.string(),
  summary: z.string(),
  url: z.string().url(),
  category: z.string(),
  tags: z.array(z.string()).optional(),
});


export const collections = {
  blog: defineCollection({ schema: blogSchema }),
  external: defineCollection({ schema: externalSchema }),
  til: defineCollection({ schema: tilSchema }),
  tools: defineCollection({ schema: toolsSchema }),
};

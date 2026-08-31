import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blogSchema = z.object({
  title: z.string(),
  summary: z.string(),
  publishedAt: z.coerce.date(),
  cover: z.string(),
  draft: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

const tilSchema = z.object({
  title: z.string(),
  publishedAt: z.coerce.date(),
  summary: z.string(),
  draft: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

const externalSchema = z.object({
  title: z.string(),
  summary: z.string(),
  external: z.url(),
  publishedAt: z.coerce.date(),
});

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: blogSchema,
  }),
  external: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/external" }),
    schema: externalSchema,
  }),
  til: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/til" }),
    schema: tilSchema,
  }),
};

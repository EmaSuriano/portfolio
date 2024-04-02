import { defineConfig } from "astro/config";
import compress from "astro-compress";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import rehypePlugins from "./rehype-plugins";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://emasuriano.com/",
  integrations: [
    tailwind(),
    sitemap(),
    compress(),
    icon(),
    mdx({
      rehypePlugins,
      syntaxHighlight: "prism",
    }),
  ],
  markdown: {
    syntaxHighlight: "prism",
    rehypePlugins,
  },
  redirects: {
    "/resume": "https://resume.emasuriano.com",
  },
});

import { defineConfig } from "astro/config";
import compress from "astro-compress";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import rehypePlugins from "./rehype-plugins";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://emasuriano.com/",
  prefetch: {
    defaultStrategy: 'viewport'
  }
  integrations: [
    tailwind(),
    sitemap(),
    compress(),
    icon(),
  ],
  markdown: {
    syntaxHighlight: "prism",
    rehypePlugins,
  },
  redirects: {
    "/resume": "https://resume.emasuriano.com",
  }
});

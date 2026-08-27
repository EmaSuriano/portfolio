import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import rehypePlugins from "./rehype-plugins";
import icon from "astro-icon";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: "https://emasuriano.com/",
  integrations: [tailwind(), sitemap(), icon(), pagefind()],
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkMath],
    rehypePlugins,
  },
  output: "static",
  redirects: {
    "/resume":
      "https://drive.google.com/file/d/1J5DsseLPW_tdKCd7R5unBx_mcfbesGNj",
    "/life-in-weeks": "https://lifeweeks.app/emasuriano",
  },
});

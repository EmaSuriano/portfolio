---
publishedAt: 2024-06-24
title: Adding support for LaTeX in Astro.js
summary: Enhance your Markdown with LaTeX math thanks to remark-math project
tags:
  - Astro
  - LaTeX
---
[LaTeX](https://en.wikipedia.org/wiki/LaTeX) can be considered the standard language to represent mathematical expression in any possible field, and adding it to your page content is not that complicated. In case you already have an Astro project, and you are generating your pages from Markdown files, then you can easily add support by extending your [Markdown plugins](https://docs.astro.build/en/guides/markdown-content/#markdown-plugins).

The great open source project [remark-math](https://github.com/remarkjs/remark-math/tree/main?tab=readme-ov-file) allows you to extend your markdown and be able to use the classic `$$` or `$` and transform them into LaTeX syntax on the spot. The first step is to install both `remark-math` and one of the math rendering extensions: `rehype-katex` (uses [KaTeX](https://katex.org/)) or `rehype-mathjax`(uses [MathJax](https://www.mathjax.org/)).

I personally prefer `rehype-katex` mostly because the LaTeX text can be selected in the HTML and copied to the clipboard, where `rehype-mathjax` simply generates an `svg` tag that doesn't allow selection.

The next step is to add both extensions to your `astro.config.mjs`:

```json
import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  ...restConfig,
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
```

In case you also decided to use `rehype-katex` you have to add the following `link` tag to the `head` of your page, to load additional styling that KaTeX needs to render properly:

```html
<!-- Katex -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css"
  integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ"
  crossorigin="anonymous"
/>
```

The setup of the extensions is now done and you can represent LaTeX by using the `$` symbol. Some examples are:

```
- Inline expression: $f(x) = x + 1$

- New line + centered expression:
  $$
  f(x) = x + 1
  $$
```

Which looks the following way:

\- Inline expression: $f(x) = x + 1$

\- New line + centered expression:

$$

f(x) = x + 1

$$

That's all for now, thanks for reading.
# EmaSuriano

[![ci](https://github.com/EmaSuriano/portfolio/actions/workflows/master.yml/badge.svg)](https://github.com/EmaSuriano/portfolio/actions/workflows/master.yml)
![Dependabot Status](https://badgen.net/github/dependabot/EmaSuriano/portfolio)
[![Deploy to GitHub Pages](https://github.com/EmaSuriano/portfolio/actions/workflows/deploy-gh.yml/badge.svg)](https://github.com/EmaSuriano/portfolio/actions/workflows/deploy-gh.yml)

> My portfolio where I share who I am, the projects I built, talks I gave, and the centralized place for all the blog post that I wrote in the past years.

## Stack 🚀

- SSG with [Astro](https://astro.build/)
- Support for [Typescript](https://www.typescriptlang.org/)
- Powered by [MDX](https://mdxjs.com/)
- Design system with [Tailwind](https://tailwindcss.com/)
- CI/CD with [Github Pages]([https://netlify.com/](https://github.com/actions/deploy-pages))
- Dependency updates with [Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/about-dependabot-version-updates)

## Features 🎁

- Images visualizer in Blogs with [medium-zoom]](https://github.com/francoischalifour/medium-zoom)
- Improve of Youtube loader with [lite-youtube](https://github.com/justinribeiro/lite-youtube)
- Github integration with [octokit](https://github.com/octokit/core.js/)
- CSS optimizations with [autoprefixer](https://github.com/postcss/autoprefixer) and [cssnano](https://github.com/cssnano/cssnano)
- Blog comments integration with [utterances](https://github.com/utterance/utterances)
- RSS generation using [@astro/rss](https://github.com/withastro/astro/tree/main/packages/astro-rss)
- Automatic sitemap creation using [@astro/sitemap](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap)
- Improvements over MDX:
  - Reading time with [reading-time](https://github.com/ngryman/reading-time)
  - Automatic image caption using [remark-figure-caption](https://github.com/Microflash/remark-figure-caption)

## Dev Tools 👷

- [Prettier](https://prettier.io/) + [Tailwind plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
- Weekly [Dependabot alerts](https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/)
- Auto merge Dependabot on CI pass using [Github Actions](https://github.com/marketplace/actions/dependabot-auto-merge)

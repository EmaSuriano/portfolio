---
publishedAt: 2026-08-31
title: PR previews on GitHub Pages without Netlify
summary: GitHub Pages can host a live preview for every pull request if you deploy from a gh-pages branch, so you don't need Netlify just for that.
tags:
  - Github
  - Github Pages
  - Github Actions
  - Astro
---

One of the reasons I kept using Netlify in the past was the PR preview. You open a pull request, wait a few seconds, and you get a live URL of that branch. Super useful when you want to share a visual change without asking people to pull the code locally.

I recently added the same kind of workflow to [astro-frame-shift](https://github.com/EmaSuriano/astro-frame-shift), my Astro photo gallery, but staying fully on Github Pages. No extra host, no extra secrets, and a lot more flexibility about where the site actually lives.

The action that makes this possible is [rossjrw/pr-preview-action](https://github.com/rossjrw/pr-preview-action). It deploys each PR into a folder on the `gh-pages` branch, leaves a sticky comment with the preview URL (and even a QR code), and removes the folder when the PR is closed.

![PR Preview Action Github](https://opengraph.githubassets.com/EmaSuriano/rossjrw/pr-preview-action)

The catch is that this does **not** work if Github Pages is set to "Deploy from GitHub Actions", which is the official Astro + `actions/deploy-pages` setup. That source can only serve the production site. You have to switch Pages to **Deploy from a branch**, pointing at `gh-pages`, and give Actions read and write permission so the token can commit to that branch.

Then production and previews can live next to each other:

- Production: https://emasuriano.github.io/astro-frame-shift/
- A PR: `https://emasuriano.github.io/astro-frame-shift/pr-preview/pr-{N}/`

Because this is a project site, the preview sits on a **deeper path**, so Astro needs a different `base` for each build. I pass it as an env var:

```js
base: isDev ? '' : process.env.PAGES_BASE || 'astro-frame-shift',
```

The preview workflow sets `PAGES_BASE` to `astro-frame-shift/pr-preview/pr-${{ github.event.number }}`. Without that, all the CSS and JS 404.

The other important bit is that a production deploy must not wipe the preview folders. With `JamesIves/github-pages-deploy-action`:

```yml
clean-exclude: |
  pr-preview/
force: false
```

`force: false` makes it rebase instead of force-pushing, so in-flight previews survive when `main` deploys.

One extra Pages gotcha: add an empty `.nojekyll` file in `public`, otherwise Jekyll ignores the `_astro/` folder because of the underscore.

I wired this up in [#11](https://github.com/EmaSuriano/astro-frame-shift/pull/11), and the first time I actually used it was on [#14](https://github.com/EmaSuriano/astro-frame-shift/pull/14). Having a live URL on the PR felt exactly like Netlify, just without leaving Github.

Thanks for reading.

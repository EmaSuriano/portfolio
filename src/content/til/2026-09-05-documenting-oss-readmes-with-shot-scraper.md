---
publishedAt: 2026-09-05
title: Documenting OSS READMEs with shot-scraper
summary: I started refreshing README screenshots from live demos with shot-scraper and GitHub Actions, so the docs stay in sync without manual captures.
tags:
  - Github
  - Github Actions
  - Documentation
  - Playwright
  - Astro
---

For a long time, README screenshots in my Astro themes were the usual GitHub upload: capture something locally, drag it into an issue, paste the `user-attachments` URL, forget about it until the UI changed again.

That got boring. I recently switched to [shot-scraper](https://github.com/simonw/shot-scraper), Simon Willison’s Playwright CLI, and let Actions refresh the PNGs from the **live demo** whenever `main` (or `master`) moves.

![shot-scraper Github](https://opengraph.githubassets.com/EmaSuriano/simonw/shot-scraper)

## How it works

You describe shots in YAML: URL, output path, viewport, a short wait, optional JS to set light/dark. Then:

```bash
pip install shot-scraper
shot-scraper install
shot-scraper multi shots.yml
```

In CI, a workflow runs on push (with `paths-ignore` for `screenshots/**` and `README.md` so screenshot commits do not loop) and on `workflow_dispatch`. The bot commits updated PNGs with `[skip ci]` when pixels change.

The important bit: we shoot the **deployed** site (Netlify or GitHub Pages), not a local build. That way Notion data, Sheets calendars, and demo content match what visitors actually see.

Light and dark need a site-specific trick. Some themes toggle a class or `data-theme` in JS before the shot. Others use CSS `prefers-color-scheme`, so you pass `--color-scheme dark` on the CLI. Interleaving both themes in one browser session once gave me wrong-theme bleed, so the safer pattern is two YAML files and parallel matrix jobs, then one commit.

## Where I’m using it

| Repo | Demo |
|---|---|
| [astro-art-portfolio](https://github.com/EmaSuriano/astro-art-portfolio) | [Netlify](https://astro-art-portfolio.netlify.app) |
| [astro-frame-shift](https://github.com/EmaSuriano/astro-frame-shift) | [GitHub Pages](https://emasuriano.github.io/astro-frame-shift/) |
| [astro-collaborative-calendar-theme](https://github.com/EmaSuriano/astro-collaborative-calendar-theme) | [GitHub Pages](https://emasuriano.github.io/astro-collaborative-calendar-theme/) |
| [astro-resume](https://github.com/EmaSuriano/astro-resume) | [Netlify](https://astro-resume.netlify.app) |
| [astro-mate](https://github.com/EmaSuriano/astro-mate) | [Netlify](https://astro-mate.netlify.app) |

Each one has something like `shots.yml` (or `shots-light.yml` / `shots-dark.yml`), a `screenshots/` folder with relative paths in the README, and `.github/workflows/screenshots.yml`.

## Why it’s worth it

- Screenshots stay current after theme or UI merges, without another manual capture.
- In-repo PNGs mean visual changes show up as reviewable diffs.
- Adding a page is another YAML entry, not a custom script.
- Selector shots can document a widget (`#projects`, a calendar) better than a full-page hero alone.
- Multi-viewport tables (desktop / tablet / phone × light / dark) stop going stale.

## The cost

Extra CI time: Python deps, Playwright browsers, waiting for the live deploy to answer `200`. That is the main downside. The job is non-blocking and screenshot-only commits use `[skip ci]`, so it has not been a problem in practice.

Other caveats: you document **deployed** main, not the PR under review (unless you wire preview URLs later), and the theme strategy is different per site. Fine for docs that should match production.

Thanks for reading.

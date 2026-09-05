---
publishedAt: 2026-09-05
title: Documenting OSS READMEs with shot-scraper
summary: I started refreshing README screenshots from live demos with shot-scraper and GitHub Actions, so the docs stay in sync without manual captures.
tags:
  - Github
  - Github Actions
  - Documentation
  - Playwright
---

For a long time, README screenshots for my open source projects were the usual GitHub upload: capture something locally, drag it into an issue, paste the `user-attachments` URL, forget about it until the UI changed again.

That works for any OSS project with a website. It also gets boring. I recently switched to [shot-scraper](https://github.com/simonw/shot-scraper), Simon Willison’s Playwright CLI, and let Actions refresh the PNGs from the **live demo** whenever the default branch moves.

![shot-scraper Github](https://opengraph.githubassets.com/EmaSuriano/simonw/shot-scraper)

## Basic setup

Locally:

```bash
pip install shot-scraper
shot-scraper install
shot-scraper multi shots.yml
```

`shots.yml` is just a list of pages. Each entry can run a bit of JavaScript before the capture (theme toggles, scroll, wait for widgets):

```yml
- url: https://example.com/
  output: screenshots/home-light.png
  width: 1440
  height: 900
  wait: 1000
  javascript: |
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');

- url: https://example.com/
  output: screenshots/home-dark.png
  width: 1440
  height: 900
  wait: 1000
  javascript: |
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');

- url: https://example.com/
  output: screenshots/projects.png
  width: 1440
  height: 900
  wait: 1500
  selector: "#projects"
  padding: 16
  javascript: |
    async () => {
      document.querySelector("#projects")?.scrollIntoView({ block: "center" });
      await new Promise((r) => setTimeout(r, 500));
    }
```

Then a GitHub Action installs shot-scraper, waits for the live site, runs `multi`, and commits the PNGs when they change:

```yml
name: Screenshots

on:
  workflow_dispatch:
  push:
    branches: [main]
    paths-ignore:
      - "screenshots/**"
      - "README.md"

permissions:
  contents: write

jobs:
  shot-scraper:
    runs-on: ubuntu-latest
    if: ${{ github.event_name == 'workflow_dispatch' || github.actor != 'github-actions[bot]' }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.13"
      - run: pip install -r requirements.txt
      - run: shot-scraper install
      - name: Wait for deploy
        run: |
          for i in $(seq 1 24); do
            code=$(curl -s -o /dev/null -w '%{http_code}' https://example.com/)
            [ "$code" = "200" ] && sleep 20 && exit 0
            sleep 15
          done
          exit 1
      - run: shot-scraper multi shots.yml
      - name: Commit if changed
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add screenshots/*.png
          git diff --cached --quiet && exit 0
          git commit -m "chore: refresh README screenshots [skip ci]"
          git push
```

`paths-ignore` plus `[skip ci]` on the bot commit keeps the job from looping. Point the URLs at the **deployed** site (Netlify, GitHub Pages, whatever you ship), not a local build, so demo content matches what visitors see.

Light and dark need a site-specific trick. Class or `data-theme` toggles go in the YAML `javascript` block. Sites that only respect CSS `prefers-color-scheme` need `--color-scheme dark` on the CLI instead. If light and dark bleed into each other in one browser session, split into `shots-light.yml` / `shots-dark.yml` and run them as parallel matrix jobs.

## Where I’m using it

I rolled this out across a few of my projects that already have public demos:

| Repo | Demo |
|---|---|
| [astro-art-portfolio](https://github.com/EmaSuriano/astro-art-portfolio) | [Netlify](https://astro-art-portfolio.netlify.app) |
| [astro-frame-shift](https://github.com/EmaSuriano/astro-frame-shift) | [GitHub Pages](https://emasuriano.github.io/astro-frame-shift/) |
| [astro-collaborative-calendar-theme](https://github.com/EmaSuriano/astro-collaborative-calendar-theme) | [GitHub Pages](https://emasuriano.github.io/astro-collaborative-calendar-theme/) |
| [astro-resume](https://github.com/EmaSuriano/astro-resume) | [Netlify](https://astro-resume.netlify.app) |
| [astro-mate](https://github.com/EmaSuriano/astro-mate) | [Netlify](https://astro-mate.netlify.app) |

Each one has a `shots.yml` (or light/dark pair), a `screenshots/` folder with relative paths in the README, and `.github/workflows/screenshots.yml`. Same idea would work for any OSS README that links a live site.

## Why it’s worth it

- Screenshots stay current after UI merges, without another manual capture.
- In-repo PNGs mean visual changes show up as reviewable diffs.
- Adding a page or a widget is another YAML entry, not a custom script.
- Selector shots document a section better than a full-page hero alone.
- Multi-viewport tables (desktop / tablet / phone × light / dark) stop going stale.

## The cost

Extra CI time: Python deps, Playwright browsers, waiting for the live deploy to answer `200`. That is the main downside. The job is non-blocking and screenshot-only commits use `[skip ci]`, so it has not been a problem in practice.

Other caveats: you document **deployed** main, not the PR under review (unless you wire preview URLs later), and the theme strategy is different per site. Fine for docs that should match production.

Thanks for reading.

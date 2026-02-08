# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Astro that showcases blog posts, TIL (Today I Learned) entries, external articles, projects, and talks. The site is deployed to GitHub Pages with automated CI/CD workflows.

## Development Setup

1. Set up Node.js version: `nvm use` (requires Node 25)
2. Install dependencies: `yarn install`
3. Initialize Git submodules: `git submodule update --init`
   - The `src/static` directory is a Git submodule containing static assets
4. Start development server: `yarn dev`
5. Build for production: `yarn build`
6. Preview production build: `yarn serve`

## Common Commands

- `yarn dev` - Start local development server (default: http://localhost:4321)
- `yarn build` - Build the site for production
- `yarn serve` - Preview the production build locally
- `yarn check-types` - Run Astro and TypeScript type checking
- `yarn cli` - Run the interactive CLI to create new articles (blog, TIL, external)
- `yarn test` - Run E2E tests with Playwright
- `yarn test:ui` - Run tests with Playwright UI mode (recommended for development)
- `yarn test:headed` - Run tests in headed mode (see the browser)
- `yarn test:debug` - Run tests in debug mode

## Testing

The project uses Playwright for end-to-end testing. Tests are located in `tests/e2e/`:

- `homepage.spec.ts` - Homepage functionality and display
- `blog.spec.ts` - Blog listing and individual post pages
- `til.spec.ts` - TIL pages functionality
- `about.spec.ts` - About page content
- `search.spec.ts` - Search modal and functionality
- `navigation.spec.ts` - Navigation and routing
- `accessibility.spec.ts` - Accessibility compliance

Tests run automatically in CI on every PR. See `tests/README.md` for detailed documentation.

## Creating Content

Use the interactive CLI to create new content:

```bash
yarn cli
```

This will prompt you to:

1. Choose content type (blog, til, or external)
2. Enter title, summary, and type-specific fields
3. Generate a markdown file in `src/content/{type}/` with the format: `YYYY-MM-DD-{title-slug}.md`

### Content Types

**Blog posts** (`src/content/blog/`):

- Requires: title, summary, cover image, publishedAt
- Optional: tags, draft flag

**TIL entries** (`src/content/til/`):

- Requires: title, summary, publishedAt
- Optional: tags, draft flag

**External articles** (`src/content/external/`):

- Requires: title, summary, external URL, publishedAt
- Displays on the site but links to external URL

## Architecture

### Content Collections

Content is managed using Astro's Content Collections (defined in `src/content/config.ts`):

- `blog/` - Long-form blog posts with cover images
- `til/` - Short Today I Learned entries
- `external/` - Links to articles published elsewhere

Each collection has a Zod schema for type-safe frontmatter validation.

### Directory Structure

- `src/pages/` - File-based routing (Astro pages)
  - `src/pages/api/` - API routes (posts.ts, summary.ts)
  - `src/pages/blog/[slug].astro` - Dynamic blog post pages
  - `src/pages/til/[slug].astro` - Dynamic TIL pages
- `src/components/` - Reusable Astro components
- `src/layouts/` - Page layouts (Layout.astro, Post.astro)
- `src/helpers.ts` - Shared utility functions for post manipulation
- `src/author.json` - Author profile data (projects, talks, social links)
- `src/static/` - Git submodule for static assets (images, files)

### Key Configuration Files

- `astro.config.mjs` - Astro configuration with integrations (Tailwind, sitemap, icons, pagefind)
- `rehype-plugins.js` - Custom rehype plugins for markdown processing (slug, autolink, figures, KaTeX, Mermaid)
- `tailwind.config.cjs` - Tailwind configuration with custom typography styles for dark mode
- `tsconfig.json` - TypeScript config using Astro's strictest preset with base URL set to `./src`

### Markdown Processing Pipeline

The site uses a sophisticated markdown processing setup:

1. **Remark plugins**: `remark-math` for LaTeX math support
2. **Rehype plugins** (in order):
   - `rehype-figure` - Auto-generate figure captions from image alt text
   - `rehype-katex` - Render LaTeX math equations
   - `rehype-slug` - Add IDs to headings
   - `rehype-mermaid` - Render Mermaid diagrams as PNG images (dark mode enabled)
   - `rehype-autolink-headings` - Add anchor links to headings with aria-labels

### Key Features

- **Search**: Pagefind integration for client-side search
- **Comments**: Utterances integration for blog comments
- **Image zoom**: Medium-zoom for blog post images
- **YouTube embeds**: lite-youtube for optimized YouTube embeds
- **RSS feed**: Auto-generated at `/rss.xml`
- **Sitemap**: Auto-generated sitemap
- **Dark mode**: Full dark mode support via Tailwind

### Import Paths

TypeScript is configured with `baseUrl: "./src"`, so you can use absolute imports from the `src` directory:

```typescript
import { sortPostByDate } from "helpers";
import author from "author.json";
```

## CI/CD

GitHub Actions workflows (`.github/workflows/`):

- `ci.yml` - Runs on PRs: type checking and builds
- `deploy.yml` - Deploys to GitHub Pages on main branch
- `auto-merge.yml` - Auto-merges Dependabot PRs when CI passes
- `screenshot.yml` - Generates screenshots (if applicable)

The CI pipeline:

1. Checks out code with submodules
2. Sets up Node.js (version from `.nvmrc`)
3. Installs dependencies
4. Installs Playwright browsers
5. Runs type checking
6. Builds the project
7. Runs E2E tests
8. Uploads test reports as artifacts (on failure)

## Code Style

- Prettier is configured with the Astro plugin (`.prettierrc.mjs`)
- No additional linting commands are available
- Tailwind CSS is used for styling with the typography plugin

---
publishedAt: 2026-08-31
title: Making a personal site readable to LLMs
summary: I watched a talk about getting LLMs to recommend an open source library, then tried the same idea on my portfolio. The homepage did not change. The scores did.
cover: https://images.unsplash.com/photo-1674027326254-88c960d8e561?q=80&w=1400&h=600&fit=crop
tags:
  - llm
  - seo
  - astro
  - cloudflare
  - agents
  - openai
  - robots
  - sitemap
  - openapi
---

I came across this via an AI Engineer talk: [How We Got LLMs to Recommend Our Open Source Library](https://www.youtube.com/watch?v=V_5bn4q-vAI) by Christopher Burns from Inth. The short version is that if you want ChatGPT, Perplexity, or Claude to mention your project, you cannot only optimize for Google. You have to make the site readable to the bots that feed those models.

The talk is about a library. I do not have a library. I have [emasuriano.com](https://emasuriano.com), a small Astro 5 site on Cloudflare Pages: who I am, the open source I ship, and some writing. I wanted to know how far the same idea goes on a personal site, without turning the homepage into a product landing page.

The constraint I set at the start, and kept: **do not change the visible homepage**. The hero stays two lines. "I'm a Software Engineer at Revolut." "I contribute to Open Source, and write about web development." That is the whole pitch. If a scorecard wanted a `/developers` portal, a contact form, or 500 extra characters of HTML, the scorecard would have to live with a C.

## Two scorecards, two personalities

I used two scorecards, and they do not agree on how "product-like" a personal site should be.

[Ora](https://ora.ai/score/emasuriano.com) (orank) treats the site like a SaaS. It wants API keys, MCP, OAuth, SDKs, a developer portal. First scan, 27 Aug: **11/100 (F)**. After `llms.txt`, `robots.txt`, Person JSON-LD, and unique titles went live: **22**. After a real `/sitemap.xml` plus the Cloudflare dashboard allowlist: **52**. Same afternoon, an Ora export with a different layer breakdown: **53**. The scan from 28 Aug at 07:06 UTC, which is what the public Ora page shows now: **66/100 (C)**.

[is-agentic](https://is-agentic.com/scan/emasuriano.com) is not a second crawler. It re-weights the same Ora evidence, and it is kinder to a homepage that is a person. Same timestamp as the 66 scan: **90/100**. The remaining fails were mostly "add more homepage copy", "add a /developers portal", and "add contact + privacy". In other words: become a product.

I treated Ora as a noisy dashboard and is-agentic as a second reading of the same evidence. Neither is the goal. The goal is that an agent can fetch who I am, what I wrote, and which projects are mine, without executing a bundle of JavaScript.

## What actually moved the needle

All of 11 to 52 happened on the afternoon of 27 Aug, in this order.

### 1. Stop blocking the new crawlers

`robots.txt` was the obvious first file. I allow GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, Amazonbot, and ora-agent. I still disallow CCBot and Bytespider. Then a catch-all `User-agent: *` / `Allow: /`.

On top of that I generate [`/llms.txt`](https://emasuriano.com/llms.txt) and [`/llms.md`](https://emasuriano.com/llms.md) from `author.json`. Same content, two content types. That file is the version of the site I wish a model would read: who I am, when the site is useful, pages, API, projects, posts, talks, social.

### 2. Tell machines I am a person, not a blank HTML document

Person + WebSite JSON-LD, unique titles, canonical URLs, and a markdown alternate. Later I added Berlin and LinkedIn on the Person node. I did **not** invent an email or a phone number so Organization.contactPoint would look "complete". If a crawler wants to reach me, the LinkedIn URL is the contact point.

That first bundle took Ora from 11 to 22. Not enough to care.

### 3. Ship a sitemap that is actually a sitemap

`robots.txt` pointed at `/sitemap.xml`. The live file for a while was Astro's `/sitemap-index.xml`. In one of the broken states, a redirect 308'd into HTML. Ora looked at that, shrugged, and decided I had no sitemap.

The fix was a real `/sitemap.xml` urlset, and listing both that and `sitemap-index.xml` in robots. Boring, and it mattered.

### 4. The Cloudflare dashboard, not more files

This was the jump from **22 to 52**, together with the sitemap, and it was not a pull request.

The site is on Cloudflare Pages. Bot Fight Mode and a blanket "block AI bots" rule were eating GPTBot and friends before they ever saw `robots.txt` or `llms.txt`. I allowed AI search/agent bots in the dashboard and turned the fight-mode hammer off.

Files I had already shipped started counting. If your agent-readiness score is stuck after you added `llms.txt`, check whether your WAF is eating the crawler. That was the same afternoon.

### 5. Document the APIs I already had

I already had `GET /api/summary` and `GET /api/posts`. They were not a product API. They were JSON for the site. I added an [OpenAPI](https://emasuriano.com/openapi.json) spec for those two endpoints, plus a short [`/api.md`](https://emasuriano.com/api.md), and listed both in `llms.txt`.

No fake MCP server. No OAuth. No SDK. No CLI. No sandbox. Scorecards love those checkboxes. A personal site does not need them, and adding a toy version would have been lying.

### 6. Serve markdown when the client asks for it

Browsers still get HTML. Clients that send `Accept: text/markdown` on `/` get the same body as `/llms.md`.

Static Astro cannot negotiate that on its own, so a Cloudflare `_worker.js` does it. Same worker later started serving `/.well-known/agent-skills/index.json`. I had put that file under `public/.well-known`, but the dot-directory never reached `dist`, so production 404'd until the worker served it.

That is the one place where crawlers and humans see different bytes, and it is content negotiation, not hidden homepage text. I will come back to that.

### 7. Make the JSON actually JSON

Prerendered extensionless API files were coming out as `application/octet-stream`. 404s were HTML. There was no `/api/v1`, no cursor pagination, no `RateLimit` headers.

The worker now:

- serves `application/json`
- returns JSON 404s (RFC 9457 problem+json)
- exposes `/api/v1/summary` and `/api/v1/posts`
- paginates posts with a cursor
- sends rate-limit headers

### 8. Stop dumping the entire blog into `/api/posts`

This one is embarrassing. `GET /api/posts` used to return full markdown bodies. About **770KB** of JSON to answer "what has this person written".

It now returns a small array of `id`, `collection`, `slug`, `url`, and `data.{title,summary,publishedAt}`. A few kilobytes. If an agent wants the article, it can fetch the article.

## What I refused

Ora still fails, or half-fails, a set of checks that all say the same thing: *pretend you are Stripe*.

I closed the pull requests that would have:

- padded the homepage to 500+ characters of visible HTML
- linked `/api/*` from the homepage
- added a Contact page

I also refused hidden `sr-only` copy so a crawler would see text a human did not. That never became a PR.

The homepage HTML is still about **152 characters** of visible text. is-agentic calls that out. I am fine with it. Hidden text to game a "content without JS" check is cloaking, and I do not want that on a site with my name on it.

Markdown on `Accept: text/markdown` is the legitimate version of "give agents more than the hero". Humans in a browser still get the same two lines.

I also refused to invent an email address for schema.org. Berlin + LinkedIn was as far as I was willing to go.

## Where the scores landed

| Scanner | Last look | Grade |
|---|---|---|
| [Ora](https://ora.ai/score/emasuriano.com) | 66/100 (28 Aug, 07:06 UTC) | C |
| [is-agentic](https://is-agentic.com/scan/emasuriano.com) | 90/100 (same timestamp) | — |

Ora is still mad about the missing developer portal. is-agentic is still mad about the short homepage. Both of those are the constraint working as designed.

The useful outcome is not the letter grade. An agent can now:

1. Read [`robots.txt`](https://emasuriano.com/robots.txt) and not get WAF'd
2. Fetch [`/llms.md`](https://emasuriano.com/llms.md) or `Accept: text/markdown` on `/`
3. Walk a real sitemap
4. Hit [`/api/v1/summary`](https://emasuriano.com/api/v1/summary) and [`/api/v1/posts`](https://emasuriano.com/api/v1/posts) as JSON
5. Discover skills at [`/.well-known/agent-skills/index.json`](https://emasuriano.com/.well-known/agent-skills/index.json)

If Perplexity or ChatGPT ever cite this site, it will be because those files exist, not because I added a fake MCP server.

## What I would skip next time

If I were doing this again on another personal site, I would do the Cloudflare allowlist **first**, then `robots.txt`, then a real sitemap, then `llms.txt`. The OpenAPI and pagination work is nice, and it made the existing APIs less of a footgun, but it is not what took the score from F to something I can live with.

I would still skip the homepage essay. The whole point of this site is that it is small. Teaching a crawler to read a small site is more interesting than making the site bigger so the crawler is less confused.

## The repo

Everything lives in [EmaSuriano/portfolio](https://github.com/EmaSuriano/portfolio). Astro 5, Cloudflare Pages, a worker for the bits static files cannot do. The homepage is still two lines.

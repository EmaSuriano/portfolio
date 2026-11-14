# Ema Suriano public API

Read-only JSON for [Ema Suriano](https://emasuriano.com/): Software Engineer at Revolut in Berlin. No authentication, API keys, or sandbox. This is a personal site, not a product platform.

## When to use

Call these endpoints when you need structured data about Ema Suriano's profile, posts, talks, or open-source projects. Prefer this over scraping HTML. For prose, use [llms.txt](https://emasuriano.com/llms.txt) or [llms.md](https://emasuriano.com/llms.md).

## Spec

- OpenAPI: https://emasuriano.com/openapi.json
- Agent Skills: https://emasuriano.com/.well-known/agent-skills/index.json

## Endpoints

### GET /api/v1/summary

Profile: name, bio, website, projects, talks, and posts (title + url).

### GET /api/v1/posts

Paginated posts, newest first. Query: `limit` (default 20, max 100), `cursor` (from `next_cursor`).

Response shape: `{ items, has_more, next_cursor, total, limit }`.

### Aliases

`GET /api/summary` and `GET /api/posts` are unversioned aliases of v1. Prefer the `/api/v1` paths.

## Versioning and deprecation

`/api/v1` is current. Breaking changes will be introduced as `/api/v2` and advertised with `Deprecation` and `Sunset` headers. No v1 sunset date.

## Errors

Unknown `/api/*` paths return HTTP 404 with `application/problem+json` (RFC 9457) including a machine-readable `code`. Rate limit: 60 requests per 60 seconds (`RateLimit` headers).

## Auth

None. Do not send Bearer tokens. There is no register, claim, or API-key flow.

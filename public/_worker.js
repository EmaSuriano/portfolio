const SKILLS = {
  $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
  name: "emasuriano.com",
  description:
    "Canonical sources for Ema Suriano: Software Engineer at Revolut in Berlin, open-source developer, speaker, and writer.",
  skills: [
    {
      name: "ema-suriano-profile",
      description:
        "Who Ema Suriano is, current role, talks, open-source projects, and how to cite this site. Use when answering questions about Ema Suriano.",
      type: "skill-md",
      url: "https://emasuriano.com/llms.md",
    },
    {
      name: "ema-suriano-posts",
      description:
        "List Ema Suriano's blog posts, TILs, and talks as JSON. Use when you need titles and canonical URLs for citations.",
      type: "skill-md",
      url: "https://emasuriano.com/api/v1/posts",
    },
  ],
};

const prefersMarkdown = (accept) => {
  if (!accept) return false;
  return /text\/markdown/i.test(accept) && !/text\/html/i.test(accept);
};

const withVaryAccept = (response) => {
  const headers = new Headers(response.headers);
  const vary = headers.get("Vary");
  if (!vary) headers.set("Vary", "Accept");
  else if (!/Accept/i.test(vary)) headers.set("Vary", `${vary}, Accept`);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

const rateLimitHeaders = (headers) => {
  headers.set("RateLimit", "limit=60, remaining=59, reset=60");
  headers.set("RateLimit-Limit", "60");
  headers.set("RateLimit-Remaining", "59");
  headers.set("RateLimit-Reset", "60");
  headers.set("API-Version", "1");
  return headers;
};

const json = (body, status, extra = {}) => {
  const headers = rateLimitHeaders(new Headers(extra));
  headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(body, null, 2), { status, headers });
};

const problem = (request, { status, code, title, detail, extraHeaders }) => {
  const url = new URL(request.url);
  const headers = extraHeaders || {};
  headers["Content-Type"] = "application/problem+json; charset=utf-8";
  return json(
    {
      type: `https://emasuriano.com/problems/${code}`,
      title,
      status,
      detail,
      instance: url.pathname,
      code,
    },
    status,
    headers,
  );
};

const markdown404 = () => {
  const body = `# Not found

This path does not exist on emasuriano.com.

Next places to look:

- [llms.txt](https://emasuriano.com/llms.txt) — profile for language models
- [openapi.json](https://emasuriano.com/openapi.json) — public read-only API
- [sitemap](https://emasuriano.com/sitemap-index.xml)
- [GET /api/v1/summary](https://emasuriano.com/api/v1/summary)
- [GET /api/v1/posts](https://emasuriano.com/api/v1/posts)
`;
  return new Response(body, {
    status: 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
};

const rewriteAssetJson = async (asset, url) => {
  const headers = rateLimitHeaders(new Headers(asset.headers));
  headers.set("Content-Type", "application/json; charset=utf-8");
  if (url.pathname.startsWith("/api/v1/")) {
    headers.set("Deprecation", "false");
  }
  return new Response(asset.body, { status: asset.status, headers });
};

const paginatedPosts = async (env, request) => {
  const url = new URL(request.url);
  const asset = await env.ASSETS.fetch(new URL("/api/posts", request.url));
  if (!asset.ok) {
    return problem(request, {
      status: 500,
      code: "upstream_error",
      title: "Upstream Error",
      detail: "Could not load /api/posts from static assets.",
    });
  }
  const posts = await asset.json();
  if (!Array.isArray(posts)) {
    return problem(request, {
      status: 500,
      code: "upstream_error",
      title: "Upstream Error",
      detail: "Expected /api/posts to be a JSON array.",
    });
  }

  const rawLimit = url.searchParams.get("limit");
  const limit = Math.min(
    Math.max(parseInt(rawLimit || "20", 10) || 20, 1),
    100,
  );
  const cursor = Math.max(parseInt(url.searchParams.get("cursor") || "0", 10) || 0, 0);
  if (cursor > posts.length) {
    return problem(request, {
      status: 400,
      code: "invalid_cursor",
      title: "Invalid Cursor",
      detail: `cursor must be between 0 and ${posts.length}.`,
    });
  }
  const items = posts.slice(cursor, cursor + limit);
  const next = cursor + items.length;
  const hasMore = next < posts.length;
  return json(
    {
      items,
      has_more: hasMore,
      next_cursor: hasMore ? String(next) : null,
      total: posts.length,
      limit,
    },
    200,
  );
};

const handleApi = async (request, env) => {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, "") || "/";

  if (request.method !== "GET" && request.method !== "HEAD") {
    return problem(request, {
      status: 405,
      code: "method_not_allowed",
      title: "Method Not Allowed",
      detail: "This API is read-only. Use GET. See /openapi.json.",
      extraHeaders: { Allow: "GET, HEAD" },
    });
  }

  if (path === "/api/summary" || path === "/api/v1/summary") {
    const asset = await env.ASSETS.fetch(new URL("/api/summary", request.url));
    if (!asset.ok) {
      return problem(request, {
        status: asset.status === 404 ? 404 : 500,
        code: asset.status === 404 ? "not_found" : "upstream_error",
        title: asset.status === 404 ? "Not Found" : "Upstream Error",
        detail: "Profile summary is not available.",
      });
    }
    return rewriteAssetJson(asset, url);
  }

  if (path === "/api/v1/posts") {
    return paginatedPosts(env, request);
  }

  if (path === "/api/posts") {
    const asset = await env.ASSETS.fetch(new URL("/api/posts", request.url));
    if (!asset.ok) {
      return problem(request, {
        status: 500,
        code: "upstream_error",
        title: "Upstream Error",
        detail: "Could not load /api/posts.",
      });
    }
    if (url.searchParams.has("limit") || url.searchParams.has("cursor")) {
      return paginatedPosts(env, request);
    }
    return rewriteAssetJson(asset, url);
  }

  if (path === "/api" || path === "/api/v1") {
    return json(
      {
        name: "emasuriano.com public API",
        version: "1",
        openapi: "https://emasuriano.com/openapi.json",
        links: {
          summary: "https://emasuriano.com/api/v1/summary",
          posts: "https://emasuriano.com/api/v1/posts",
        },
      },
      200,
    );
  }

  return problem(request, {
    status: 404,
    code: "not_found",
    title: "Not Found",
    detail:
      "No API route at this path. See https://emasuriano.com/openapi.json for GET /api/v1/summary and GET /api/v1/posts.",
  });
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const accept = request.headers.get("Accept") || "";

    if (
      path === "/.well-known/agent-skills/index.json" ||
      path === "/.well-known/agent-skills" ||
      path === "/.well-known/agent-skills/"
    ) {
      const headers = new Headers();
      headers.set("Content-Type", "application/json; charset=utf-8");
      headers.set("Cache-Control", "public, max-age=3600");
      return new Response(JSON.stringify(SKILLS, null, 2), {
        status: 200,
        headers,
      });
    }

    if (path === "/api" || path.startsWith("/api/")) {
      return handleApi(request, env);
    }

    if (path === "/" && prefersMarkdown(accept)) {
      const markdown = await env.ASSETS.fetch(new URL("/index.md", request.url));
      const headers = new Headers(markdown.headers);
      headers.set("Content-Type", "text/markdown; charset=utf-8");
      headers.set("Vary", "Accept");
      return new Response(markdown.body, {
        status: markdown.status,
        headers,
      });
    }

    const response = await env.ASSETS.fetch(request);
    if (response.status === 404 && prefersMarkdown(accept)) {
      return markdown404();
    }
    if (path === "/") return withVaryAccept(response);
    return response;
  },
};

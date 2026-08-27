const spec = {
  openapi: "3.1.0",
  info: {
    title: "emasuriano.com public API",
    version: "1.0.0",
    description:
      "Read-only JSON for Ema Suriano's profile, posts, talks, and projects. No authentication. Not a SaaS product API.",
  },
  servers: [{ url: "https://emasuriano.com", description: "Production" }],
  paths: {
    "/api/summary": {
      get: {
        operationId: "getProfileSummary",
        summary: "Profile summary",
        description:
          "Canonical machine-readable profile: name, bio, website, projects, talks, and posts.",
        tags: ["profile"],
        responses: {
          "200": {
            description: "Profile summary",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Summary" },
              },
            },
          },
        },
      },
    },
    "/api/posts": {
      get: {
        operationId: "listPosts",
        summary: "List posts",
        description:
          "All published blog, TIL, and external posts, newest first, each with a canonical url.",
        tags: ["profile"],
        responses: {
          "200": {
            description: "Array of posts",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Post" },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Link: {
        type: "object",
        required: ["title", "url"],
        properties: {
          title: { type: "string" },
          url: { type: "string", format: "uri" },
        },
      },
      Summary: {
        type: "object",
        required: ["name", "bio", "website", "projects", "talks", "posts"],
        properties: {
          name: { type: "string", examples: ["Ema Suriano"] },
          bio: { type: "string" },
          website: { type: "string", format: "uri" },
          projects: {
            type: "array",
            items: { $ref: "#/components/schemas/Link" },
          },
          talks: { type: "array", items: { $ref: "#/components/schemas/Link" } },
          posts: { type: "array", items: { $ref: "#/components/schemas/Link" } },
        },
      },
      Post: {
        type: "object",
        required: ["url"],
        properties: {
          url: { type: "string", format: "uri" },
          collection: { type: "string", enum: ["blog", "til", "external"] },
          slug: { type: "string" },
          data: {
            type: "object",
            properties: {
              title: { type: "string" },
              summary: { type: "string" },
              publishedAt: { type: "string", format: "date-time" },
            },
          },
        },
      },
    },
  },
};

export async function GET() {
  return new Response(JSON.stringify(spec, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

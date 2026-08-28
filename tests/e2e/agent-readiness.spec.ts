import { test, expect } from "@playwright/test";

test.describe("Agent-readable surfaces", () => {
  test("llms.txt lists OpenAPI, API docs, and when-to-use", async ({
    request,
  }) => {
    const res = await request.get("/llms.txt");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toMatch(/text\/plain|text\/markdown/);
    const text = await res.text();
    expect(text).toContain("When to use this site");
    expect(text).toContain("/openapi.json");
    expect(text).toContain("/api.md");
    expect(text).toContain("/api/v1/summary");
    expect(text).toContain("Deprecation");
    expect(text).toContain("Ema Suriano");
  });

  test("api.md is markdown API docs and is not in the nav", async ({
    request,
    page,
  }) => {
    const res = await request.get("/api.md");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toMatch(/text\/markdown/);
    const text = await res.text();
    expect(text).toContain("Ema Suriano public API");
    expect(text).toContain("/openapi.json");
    expect(text).toContain("No authentication");

    await page.goto("/");
    await expect(page.locator('nav a[href="/api.md"]')).toHaveCount(0);
    await expect(page.locator('nav a[href="/developers"]')).toHaveCount(0);
  });
});

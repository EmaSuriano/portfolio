import { test, expect } from "@playwright/test";

test.describe("Blog", () => {
  test("should load blog listing page", async ({ page }) => {
    await page.goto("/blog");

    // Check page title
    await expect(page.locator("h1")).toContainText("Blog");

    // Should have at least one blog post listed
    const posts = page.locator('article, [href*="/blog/"]');
    await expect(posts.first()).toBeVisible();
  });

  test("should display blog posts with dates", async ({ page }) => {
    await page.goto("/blog");

    // Blog posts should have dates
    const dates = page.locator("time");
    await expect(dates.first()).toBeVisible();
  });

  test("should navigate to a blog post", async ({ page }) => {
    await page.goto("/blog");

    // Click on the first blog post link
    const firstPostLink = page.locator('a[href*="/blog/"]').first();
    await firstPostLink.click();

    // Should navigate to post page
    await expect(page).toHaveURL(/\/blog\/.+/);

    // Post should have title, author, and content
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("article")).toBeVisible();
  });

  test("blog post should have proper structure", async ({ page }) => {
    await page.goto("/blog");

    // Navigate to first post
    const firstPostLink = page.locator('a[href*="/blog/"]').first();
    await firstPostLink.click();

    await page.waitForLoadState("networkidle");

    // Check for essential elements
    const article = page.locator("article");
    await expect(article.locator("h1")).toBeVisible();
    await expect(article.locator("text=Ema Suriano")).toBeVisible();
    await expect(article.locator("time")).toBeVisible();
  });

  test("should have navigation back to blog list", async ({ page }) => {
    await page.goto("/blog");

    const firstPostLink = page.locator('a[href*="/blog/"]').first();
    await firstPostLink.click();

    // Should be able to navigate back via header nav
    await page.locator('nav a[href="/blog"]').click();
    await expect(page).toHaveURL("/blog");
  });

  test("should display cover images on posts", async ({ page }) => {
    await page.goto("/blog");

    // Click on first post
    const firstPostLink = page.locator('a[href*="/blog/"]').first();
    await firstPostLink.click();

    await page.waitForLoadState("networkidle");

    // Many blog posts have cover images
    const coverImage = page.locator('[aria-label="cover"] img');

    // If cover exists, it should be visible
    const count = await coverImage.count();
    if (count > 0) {
      await expect(coverImage).toBeVisible();
    }
  });
});

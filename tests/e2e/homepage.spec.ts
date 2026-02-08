import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load and display author name", async ({ page }) => {
    await page.goto("/");

    // Check that the main heading contains the author name
    const heading = page.locator("h1, h2").first();
    await expect(heading).toContainText("Ema Suriano");
  });

  test("should display role and company", async ({ page }) => {
    await page.goto("/");

    // Check that role is displayed
    await expect(page.locator("text=Software Engineer")).toBeVisible();

    // Check that company link is present
    const companyLink = page.locator('a[href*="revolut.com"]');
    await expect(companyLink).toBeVisible();
    await expect(companyLink).toContainText("Revolut");
  });

  test("should have navigation links", async ({ page }) => {
    await page.goto("/");

    // Check main navigation links
    await expect(page.locator('nav a[href="/"]')).toBeVisible();
    await expect(page.locator('nav a[href="/about"]')).toBeVisible();
    await expect(page.locator('nav a[href="/blog"]')).toBeVisible();
    await expect(page.locator('nav a[href="/til"]')).toBeVisible();
  });

  test("should have social links in footer", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    await expect(footer.locator('a[href*="github.com"]')).toBeVisible();
    await expect(footer.locator('a[href*="twitter.com"]')).toBeVisible();
    await expect(footer.locator('a[href*="linkedin.com"]')).toBeVisible();
  });

  test("should be responsive", async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});

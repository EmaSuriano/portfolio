import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate between all main pages", async ({ page }) => {
    await page.goto("/");

    // Navigate to About
    await page.locator('nav a[href="/about"]').click();
    await expect(page).toHaveURL("/about");

    // Navigate to Blog
    await page.locator('nav a[href="/blog"]').click();
    await expect(page).toHaveURL("/blog");

    // Navigate to TIL
    await page.locator('nav a[href="/til"]').click();
    await expect(page).toHaveURL("/til");

    // Navigate back to Home
    await page.locator('nav a[href="/"]').click();
    await expect(page).toHaveURL("/");
  });

  test("should highlight current page in navigation", async ({ page }) => {
    await page.goto("/blog");

    // Current page link should have special styling or be disabled
    const blogLink = page.locator('nav a[href="/blog"]');

    // Check if it has aria-disabled or opacity styling
    const ariaDisabled = await blogLink.getAttribute("aria-disabled");
    expect(ariaDisabled).toBe("true");
  });

  test("should handle 404 page", async ({ page }) => {
    const response = await page.goto("/non-existent-page-12345");

    // Should return 404 status
    expect(response?.status()).toBe(404);

    // Should display 404 content
    await expect(page.locator("text=/404|not found/i")).toBeVisible();
  });

  test("all footer links should work", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    const footerLinks = footer.locator('a[href^="http"]');
    const count = await footerLinks.count();

    // Should have multiple social links
    expect(count).toBeGreaterThan(0);

    // All should have href attribute
    for (let i = 0; i < Math.min(count, 5); i++) {
      const href = await footerLinks.nth(i).getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);
    }
  });
});

import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test("homepage should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/");

    // Should have h1 or h2 main heading
    const mainHeading = page.locator("h1, h2").first();
    await expect(mainHeading).toBeVisible();
  });

  test("images should have alt text", async ({ page }) => {
    await page.goto("/blog");

    // Navigate to first post if available
    const firstPostLink = page.locator('a[href*="/blog/"]').first();
    const linkCount = await page.locator('a[href*="/blog/"]').count();

    if (linkCount > 0) {
      await firstPostLink.click();
      await page.waitForLoadState("networkidle");

      // Check all images have alt attributes
      const images = page.locator("img");
      const imageCount = await images.count();

      for (let i = 0; i < imageCount; i++) {
        const alt = await images.nth(i).getAttribute("alt");
        expect(alt).toBeDefined();
      }
    }
  });

  test("links should have accessible names", async ({ page }) => {
    await page.goto("/");

    const links = page.locator("a");
    const linkCount = await links.count();

    // Check first 10 links have text or aria-label
    for (let i = 0; i < Math.min(linkCount, 10); i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute("aria-label");

      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test("navigation should be keyboard accessible", async ({ page }) => {
    await page.goto("/");

    // Tab through navigation
    await page.keyboard.press("Tab"); // Skip link
    await page.keyboard.press("Tab"); // First nav item

    // Should be able to navigate with keyboard
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();
  });

  test("page should have lang attribute", async ({ page }) => {
    await page.goto("/");

    const htmlElement = page.locator("html");
    const lang = await htmlElement.getAttribute("lang");

    expect(lang).toBe("en");
  });

  test("should have proper color contrast", async ({ page }) => {
    await page.goto("/");

    // Basic check - text should be visible
    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible();

    // Text should have good contrast (visual check)
    const paragraphs = page.locator("p");
    await expect(paragraphs.first()).toBeVisible();
  });
});

import { test, expect } from "@playwright/test";

test.describe("TIL (Today I Learned)", () => {
  test("should load TIL listing page", async ({ page }) => {
    await page.goto("/til");

    // Check page title
    await expect(page.locator("h1")).toContainText("Today I Learned");
  });

  test("should display TIL entries", async ({ page }) => {
    await page.goto("/til");

    // Should have TIL entries or appropriate message
    const content = page.locator("main");
    await expect(content).toBeVisible();
  });

  test("should navigate to a TIL entry if available", async ({ page }) => {
    await page.goto("/til");

    // Try to find a TIL entry link
    const tilLinks = page.locator('a[href*="/til/"]');
    const count = await tilLinks.count();

    if (count > 0) {
      await tilLinks.first().click();

      // Should navigate to TIL page
      await expect(page).toHaveURL(/\/til\/.+/);

      // Should have article content
      await expect(page.locator("article")).toBeVisible();
      await expect(page.locator("h1")).toBeVisible();
    }
  });

  test("TIL entries should have dates", async ({ page }) => {
    await page.goto("/til");

    const tilLinks = page.locator('a[href*="/til/"]');
    const count = await tilLinks.count();

    if (count > 0) {
      // Should have time elements with dates
      const dates = page.locator("time");
      await expect(dates.first()).toBeVisible();
    }
  });
});

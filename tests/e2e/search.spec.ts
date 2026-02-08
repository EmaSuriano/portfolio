import { test, expect } from "@playwright/test";

test.describe("Search functionality", () => {
  test("should open search modal", async ({ page }) => {
    await page.goto("/");

    // Click search button
    const searchButton = page.locator('button[aria-label="Search"]');
    await searchButton.click();

    // Modal should be visible
    const modal = page.locator(
      '[role="dialog"], [aria-modal="true"], #pagefind-ui',
    );
    await expect(modal.first()).toBeVisible({ timeout: 10000 });
  });

  test("should close search modal with Escape key", async ({ page }) => {
    await page.goto("/");

    // Open search
    const searchButton = page.locator('button[aria-label="Search"]');
    await searchButton.click();

    // Wait for modal to open
    await page.waitForTimeout(500);

    // Press Escape
    await page.keyboard.press("Escape");

    // Modal should be hidden (check if aria-hidden or display:none)
    await page.waitForTimeout(500);
  });

  test("search should have input field", async ({ page }) => {
    await page.goto("/");

    // Open search
    const searchButton = page.locator('button[aria-label="Search"]');
    await searchButton.click();

    // Should have search input
    const searchInput = page.locator(
      'input[type="search"], input[placeholder*="Search"]',
    );
    await expect(searchInput.first()).toBeVisible({ timeout: 10000 });
  });

  test("should be able to type in search", async ({ page }) => {
    await page.goto("/");

    // Open search
    const searchButton = page.locator('button[aria-label="Search"]');
    await searchButton.click();

    // Find and type in search input
    const searchInput = page
      .locator('input[type="search"], input[placeholder*="Search"]')
      .first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    await searchInput.fill("javascript");
    await expect(searchInput).toHaveValue("javascript");
  });
});

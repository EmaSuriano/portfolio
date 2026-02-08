import { test, expect } from '@playwright/test';

test.describe('About page', () => {
  test('should load about page', async ({ page }) => {
    await page.goto('/about');

    // Check that about content is visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have projects section', async ({ page }) => {
    await page.goto('/about');

    // Should have projects heading or section
    const projectsHeading = page.locator('text=/projects/i').first();
    await expect(projectsHeading).toBeVisible();
  });

  test('should have talks section', async ({ page }) => {
    await page.goto('/about');

    // Should have talks heading or section
    const talksHeading = page.locator('text=/talks/i').first();
    await expect(talksHeading).toBeVisible();
  });

  test('should display project links', async ({ page }) => {
    await page.goto('/about');

    // Should have GitHub project links
    const projectLinks = page.locator('a[href*="github.com"]');
    const count = await projectLinks.count();

    expect(count).toBeGreaterThan(0);
  });

  test('should be accessible via navigation', async ({ page }) => {
    await page.goto('/');

    // Click about link in navigation
    await page.locator('nav a[href="/about"]').click();

    await expect(page).toHaveURL('/about');
  });
});

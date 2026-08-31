import { test, expect } from "@playwright/test";

test.describe("Tools", () => {
  test("should load Tools listing page", async ({ page }) => {
    await page.goto("/tools");

    await expect(page.locator("h1")).toContainText("Tools");
  });

  test("should display the tools markdown", async ({ page }) => {
    await page.goto("/tools");

    const content = page.locator("main");
    await expect(content).toBeVisible();
    await expect(page.getByRole("heading", { name: "Github" })).toBeVisible();
  });

  test("should list the four starter tools", async ({ page }) => {
    await page.goto("/tools");

    await expect(
      page.locator('a[href="https://reporemover.xyz/"]'),
    ).toContainText("Repo Remover");
    await expect(
      page.locator('a[href="https://metatags.io/"]'),
    ).toContainText("Meta Tags");
    await expect(
      page.locator('a[href="https://shrinkme.app/"]'),
    ).toContainText("Shrink Me");
    await expect(
      page.locator('a[href="https://colorhunt.co/"]'),
    ).toContainText("Color Hunt");
  });
});

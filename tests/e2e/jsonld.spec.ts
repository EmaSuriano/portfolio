import { test, expect } from "@playwright/test";

test.describe("JSON-LD", () => {
  test("Person and Organization include Berlin address and author contactPoint", async ({
    page,
  }) => {
    await page.goto("/");
    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();
    expect(jsonLd).toBeTruthy();
    const data = JSON.parse(jsonLd!);
    const nodes = data["@graph"] ?? [data];
    const person = nodes.find((n: { "@type"?: string }) => n["@type"] === "Person");
    const org = nodes.find(
      (n: { "@type"?: string; name?: string }) =>
        n["@type"] === "Organization" && n.name === "Ema Suriano",
    );
    expect(person.address.addressLocality).toBe("Berlin");
    expect(person.address.addressCountry).toBe("DE");
    expect(person.contactPoint.contactType).toBe("author");
    expect(person.contactPoint.url).toContain("linkedin.com");
    expect(org.address.addressLocality).toBe("Berlin");
    expect(org.contactPoint.url).toContain("linkedin.com");
  });

  test("homepage layout is unchanged: no extra nav items", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('nav a[href="/contact"]')).toHaveCount(0);
    await expect(page.locator('nav a[href="/developers"]')).toHaveCount(0);
    await expect(page.locator("h1, h2").first()).toContainText("Ema Suriano");
  });
});

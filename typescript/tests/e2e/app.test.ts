import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("shows the branding and link to pieces", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText("Kintsugi");
    await expect(page.locator(".subtitle")).toBeVisible();
    await expect(page.locator("a.action-link")).toHaveAttribute("href", "/pieces");
  });
});

test.describe("Pieces page", () => {
  test("shows empty state when no pieces exist", async ({ page }) => {
    await page.goto("/pieces");
    await expect(page.locator("h1")).toHaveText("Pieces");
    await expect(page.locator(".empty-state")).toHaveText(
      "No pieces yet. Register one above.",
    );
  });

  test("adds a piece via the registration form", async ({ page }) => {
    await page.goto("/pieces");
    const input = page.locator("input[name='title']");
    await input.fill("Cracked tea bowl");

    await page.locator("button[type='submit']").click();

    await expect(page.locator(".piece-title").last()).toHaveText("Cracked tea bowl");
  });

  test("removes a piece", async ({ page }) => {
    await page.goto("/pieces");
    const input = page.locator("input[name='title']");
    await input.fill("Broken plate");
    await page.locator("button[type='submit']").click();
    await expect(page.locator(".piece-title").last()).toHaveText("Broken plate");

    await page.locator(".piece-item:has-text('Broken plate') button.danger").click();

    await expect(page.locator(".piece-item:has-text('Broken plate')")).toHaveCount(0);
  });

  test("adds multiple pieces", async ({ page }) => {
    await page.goto("/pieces");
    const input = page.locator("input[name='title']");

    await input.fill("Alpha piece");
    await page.locator("button[type='submit']").click();
    await expect(page.locator(".piece-item:has-text('Alpha piece')")).toHaveCount(1);

    await input.fill("Beta piece");
    await page.locator("button[type='submit']").click();
    await expect(page.locator(".piece-item:has-text('Alpha piece')")).toHaveCount(1);
    await expect(page.locator(".piece-item:has-text('Beta piece')")).toHaveCount(1);
  });
});

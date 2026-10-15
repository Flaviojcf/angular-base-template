import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { APP_TITLE } from "../src/app/app.constants";

test.describe("home page", () => {
  test("shows the application shell", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(APP_TITLE);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Sua base Angular");
    await expect(page.getByRole("link", { name: APP_TITLE })).toHaveAttribute("href", "/");
  });

  test("falls back to the home page for unknown routes", async ({ page }) => {
    await page.goto("/unknown/route");

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("has no detectable accessibility violations", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();

    expect(results.violations).toEqual([]);
  });
});

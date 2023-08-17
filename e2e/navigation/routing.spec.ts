import { expect, test } from "@playwright/test";

// FIXME see why importing RoutePaths throws error
export enum RoutePaths {
  Dashboard = "/dashboard",
  Composer = "/composer",
  Authors = "/authors",
  Articles = "/articles",
  Messages = "/messages",
  Settings = "/settings",
  Login = "/login",
  Inactive = "/inactive",
}

test("has correct title and lands on dashboard", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Blog Management/);

  const pageTitle = page.locator('[data-testid="page-title"]');
  await expect(pageTitle).toHaveText("Dashboard");
});

test("routes correctly to different pages", async ({ page }) => {
  await page.goto(RoutePaths.Composer);

  await page.waitForURL(`**${RoutePaths.Composer}`);
  const pageTitle = page.locator('[data-testid="page-title"]');
  await expect(pageTitle).toHaveText("Composer");

  await page.goto(RoutePaths.Authors);
  await page.waitForURL(`**${RoutePaths.Authors}`);
  await expect(pageTitle).toHaveText("Authors");

  await page.goto(RoutePaths.Articles);
  await page.waitForURL(`**${RoutePaths.Articles}`);
  await expect(pageTitle).toHaveText("Articles");

  await page.goto(RoutePaths.Authors);
  await page.waitForURL(`**${RoutePaths.Authors}`);
  await expect(pageTitle).toHaveText("Authors");

  await page.goto(RoutePaths.Settings);
  await page.waitForURL(`**${RoutePaths.Settings}`);
  await expect(pageTitle).toHaveText("Settings");
});

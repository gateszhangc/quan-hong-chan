import { expect, test } from "@playwright/test";

test("root path resolves to the localized homepage", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveURL(/\/zh$/);
  await expect(
    page.getByRole("heading", {
      name: /把全红婵的最新新闻、比赛节点与人物线索放到同一张桌面上/i,
    })
  ).toBeVisible();
});

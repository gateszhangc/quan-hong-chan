import { expect, test } from "@playwright/test";

test("root path resolves to the localized homepage", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveURL(/\/zh$/);
  await expect(
    page.getByRole("heading", {
      name: /把霍尔木兹海峡的新闻、航运风险与能源冲击放到同一张桌面上/i,
    })
  ).toBeVisible();
});

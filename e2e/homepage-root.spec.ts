import { expect, test } from "@playwright/test";

test("root path resolves to the localized homepage", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveURL(/\/en$/);
  await expect(
    page.getByRole("heading", {
      name: /Put Hormuz headlines, shipping risk, and energy-market spillovers on one screen/i,
    })
  ).toBeVisible();
});

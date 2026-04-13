import { expect, test } from "@playwright/test";

test("root path resolves to the localized homepage", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveURL(/\/en$/);
  await expect(
    page.getByRole("heading", { name: /Strait of Hormuz live desk/i })
  ).toBeVisible();
  await expect(
    page.getByText(/One clear frame for ceasefire shifts/i)
  ).toBeVisible();
});

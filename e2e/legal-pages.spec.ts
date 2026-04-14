import { expect, test } from "@playwright/test";

test("legal pages use Hormuz site policies instead of legacy product copy", async ({
  page,
}) => {
  await page.goto("/en/privacy-policy");

  await expect(
    page.getByRole("heading", {
      name: /Privacy Policy for Hormuz Strait News/i,
    })
  ).toBeVisible();
  await expect(page.getByText(/EasyClaw/i)).toHaveCount(0);

  await page.goto("/en/terms-of-service");

  await expect(
    page.getByRole("heading", {
      name: /Terms of Service for Hormuz Strait News/i,
    })
  ).toBeVisible();
  await expect(page.getByText(/EasyClaw/i)).toHaveCount(0);

  await page.goto("/en/refund-policy");

  await expect(
    page.getByRole("heading", {
      name: /Refund Policy for Hormuz Strait News/i,
    })
  ).toBeVisible();
  await expect(page.getByText(/EasyClaw/i)).toHaveCount(0);
});

import { expect, test } from "@playwright/test";

test("legal pages use Quan Hongchan site policies instead of legacy product copy", async ({
  page,
}) => {
  await page.goto("/en/privacy-policy");

  await expect(
    page.getByRole("heading", {
      name: /Privacy Policy for Quan Hongchan Watch/i,
    })
  ).toBeVisible();
  await expect(page.getByText(/EasyClaw/i)).toHaveCount(0);
  await expect(page.getByText(/Hormuz/i)).toHaveCount(0);

  await page.goto("/en/terms-of-service");

  await expect(
    page.getByRole("heading", {
      name: /Terms of Service for Quan Hongchan Watch/i,
    })
  ).toBeVisible();
  await expect(page.getByText(/EasyClaw/i)).toHaveCount(0);
  await expect(page.getByText(/Hormuz/i)).toHaveCount(0);

  await page.goto("/en/refund-policy");

  await expect(
    page.getByRole("heading", {
      name: /Refund Policy for Quan Hongchan Watch/i,
    })
  ).toBeVisible();
  await expect(page.getByText(/EasyClaw/i)).toHaveCount(0);
  await expect(page.getByText(/Hormuz/i)).toHaveCount(0);
});

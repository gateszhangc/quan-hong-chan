import { expect, test } from "@playwright/test";

test("homepage exposes the latest briefing cards and source links", async ({ page }) => {
  const response = await page.goto("/en");

  expect(response?.ok()).toBeTruthy();
  await expect(
    page.getByRole("heading", { name: /Strait of Hormuz live desk/i })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: /Washington shifts from ceasefire monitoring to blockade logic/i,
    })
  ).toBeVisible();
  await expect(page.getByText(/Selective closure remains the core risk/i)).toBeVisible();

  const sourceLink = page.getByRole("link", { name: /Primary source/i }).first();
  await expect(sourceLink).toHaveAttribute("href", /axios\.com|imo\.org|eia\.gov/);
});

test("archive and detail pages render a connected reading flow", async ({ page }) => {
  await page.goto("/en/posts");

  await expect(
    page.getByRole("heading", {
      name: /Browse the latest Strait of Hormuz briefings/i,
    })
  ).toBeVisible();

  const articleLink = page.locator('a[href="/en/posts/us-blockade-logic-apr-13-2026"]');
  await expect(articleLink).toHaveCount(1);
  await expect(articleLink).toContainText(/Read briefing/i);

  await page.goto("/en/posts/us-blockade-logic-apr-13-2026");
  await expect(page).toHaveURL(/\/en\/posts\/.+/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText(/Key points/i)).toBeVisible();
});

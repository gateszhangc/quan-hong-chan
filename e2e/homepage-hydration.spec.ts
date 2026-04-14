import { expect, test } from "@playwright/test";

test("homepage hydrates without missing next chunks", async ({ page }) => {
  const missingChunkRequests: string[] = [];

  page.on("response", (response) => {
    if (
      response.status() === 404 &&
      response.url().includes("/_next/static/chunks/")
    ) {
      missingChunkRequests.push(response.url());
    }
  });

  const response = await page.goto("/en", { waitUntil: "domcontentloaded" });

  expect(response?.ok()).toBeTruthy();

  await expect(
    page.getByRole("heading", {
      name: /Latest headlines/i,
    })
  ).toBeVisible();
  await page.goto("/en/posts", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/en\/posts$/);
  await expect(
    page.getByRole("heading", {
      name: /Rolling updates and deeper context/i,
    })
  ).toBeVisible();

  expect(missingChunkRequests).toEqual([]);
});

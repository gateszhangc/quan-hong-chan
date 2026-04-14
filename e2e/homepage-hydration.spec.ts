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

  const response = await page.goto("/zh", { waitUntil: "domcontentloaded" });

  expect(response?.ok()).toBeTruthy();

  await expect(
    page.getByRole("heading", {
      name: /最新消息/i,
    })
  ).toBeVisible();
  await page.goto("/zh/posts", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/zh\/posts$/);
  await expect(
    page.getByRole("heading", {
      name: /最新新闻与背景观察/i,
    })
  ).toBeVisible();

  expect(missingChunkRequests).toEqual([]);
});

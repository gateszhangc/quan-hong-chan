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

  const response = await page.goto("/en", { waitUntil: "networkidle" });

  expect(response?.ok()).toBeTruthy();

  await expect(
    page.getByRole("heading", { name: /Strait of Hormuz live desk/i })
  ).toBeVisible();
  await expect(
    page.getByText(/Average oil flow through Hormuz in 2023/i).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /View full archive/i })).toBeVisible();

  expect(missingChunkRequests).toEqual([]);
});

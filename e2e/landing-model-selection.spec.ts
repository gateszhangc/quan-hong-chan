import { expect, test } from "@playwright/test";

test("homepage renders the Hormuz news watch hero and fallback newsroom cards", async ({
  page,
}) => {
  await page.goto("/en");

  await expect(
    page.getByRole("heading", {
      name: /Put Hormuz headlines, shipping risk, and energy-market spillovers on one screen/i,
    })
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: /See latest headlines/i }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: /Where Is the Strait of Hormuz and Why Does Geography Matter So Much\?/i,
    }).first()
  ).toBeVisible();
  await expect(page.getByText(/Desk briefing/i).first()).toBeVisible();
});

test("briefings hub links into article pages with markdown content", async ({
  page,
}) => {
  await page.goto("/en/posts");

  await expect(
    page.getByRole("heading", {
      name: /Rolling updates and deeper context/i,
    })
  ).toBeVisible();

  await page.goto("/en/posts/why-hormuz-moves-oil-and-lng-markets");

  await expect(page).toHaveURL(/\/en\/posts\/why-hormuz-moves-oil-and-lng-markets$/);
  await expect(
    page.getByRole("heading", {
      name: /Why the Strait of Hormuz Moves Oil and LNG Markets/i,
    })
  ).toBeVisible();
  await expect(
    page.getByText(/The market question is rarely “Is the strait closed right now\?”/i)
  ).toBeVisible();
});

test("zh homepage serves the Chinese newsroom copy", async ({ page }) => {
  await page.goto("/zh", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", {
      name: /把霍尔木兹海峡的新闻、航运风险与能源冲击放到同一张桌面上/i,
    })
  ).toBeVisible();

  await expect(page.getByRole("link", { name: /查看最新头条/i }).first()).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: /霍尔木兹海峡在哪里，为什么它的地理位置如此关键？/i,
    }).first()
  ).toBeVisible();
});

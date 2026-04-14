import { expect, test } from "@playwright/test";

test("homepage and auth entry no longer expose legacy branding or old SEO signals", async ({
  page,
}) => {
  await page.goto("/en");

  const html = await page.content();
  expect(html).not.toMatch(/EasyClaw/i);
  expect(html).not.toMatch(/OpenClaw/i);
  expect(html).not.toMatch(/huo-er-mu-ci-hai-xia\.homes/i);

  await expect(page.getByRole("heading", { name: /Quan Hongchan Watch/i })).toHaveCount(0);
  await expect(page.getByText(/Hormuz Strait News/i)).toHaveCount(0);

  await page.goto("/en/auth/signin").catch(() => null);
  await page.waitForURL(/\/en(?:\/auth\/signin)?$/);

  const authHtml = await page.content();
  expect(authHtml).not.toMatch(/EasyClaw/i);
  expect(authHtml).not.toMatch(/OpenClaw/i);
  expect(authHtml).not.toMatch(/huo-er-mu-ci-hai-xia\.homes/i);
  await expect(page.getByText(/Hormuz Strait News/i)).toHaveCount(0);
});

test("legacy product routes redirect back to the Hormuz homepage", async ({
  page,
}) => {
  const legacyRoutes = [
    "/en/price",
    "/en/pricing",
    "/en/showcase",
    "/en/image-flip",
    "/en/ai-image-expander",
    "/en/nano-banana-pro",
    "/en/qwen-image-layered",
    "/en/styles/storybook",
  ];

  for (const route of legacyRoutes) {
    const response = await page.request.get(route, { maxRedirects: 0 });

    expect(response.status()).toBe(307);
    expect(response.headers().location).toBe("/en");
  }
});

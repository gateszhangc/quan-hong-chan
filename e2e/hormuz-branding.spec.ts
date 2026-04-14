import { expect, test } from "@playwright/test";

test("homepage and auth entry no longer expose legacy branding", async ({
  page,
}) => {
  await page.goto("/en");

  const html = await page.content();
  expect(html).not.toMatch(/EasyClaw/i);
  expect(html).not.toMatch(/OpenClaw/i);

  await page.goto("/en/auth/signin").catch(() => null);
  await page.waitForURL(/\/en(?:\/auth\/signin)?$/);

  const authHtml = await page.content();
  expect(authHtml).not.toMatch(/EasyClaw/i);
  expect(authHtml).not.toMatch(/OpenClaw/i);
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

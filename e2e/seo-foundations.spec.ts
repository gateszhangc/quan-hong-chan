import { expect, test } from "@playwright/test";

test("homepage metadata, robots, and sitemap stay on the current site origin", async ({
  page,
}) => {
  await page.goto("/zh");
  const canonicalLocator = page.locator('link[rel="canonical"]');
  const ogUrlLocator = page.locator('meta[property="og:url"]');

  await expect(page).toHaveTitle(/全红婵/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /全红婵/
  );
  const canonicalHref = await canonicalLocator.getAttribute("href");
  const ogUrl = await ogUrlLocator.getAttribute("content");

  expect(canonicalHref).toBeTruthy();
  expect(canonicalHref).toMatch(/\/zh$/);
  expect(canonicalHref).not.toContain("huo-er-mu-ci-hai-xia.homes");
  expect(ogUrl).toBe(canonicalHref);

  const pageHtml = await page.content();
  expect(pageHtml).not.toMatch(/huo-er-mu-ci-hai-xia\.homes/i);

  const robotsResponse = await page.request.get("/robots.txt");
  expect(robotsResponse.ok()).toBeTruthy();
  const robots = await robotsResponse.text();
  expect(robots).toContain("Sitemap:");
  expect(robots).toContain("/sitemap.xml");
  expect(robots).not.toContain("huo-er-mu-ci-hai-xia.homes");

  const sitemapResponse = await page.request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBeTruthy();
  const sitemap = await sitemapResponse.text();
  expect(sitemap).toContain("/zh/posts/who-is-quan-hongchan");
  expect(sitemap).not.toContain("/pricing");
  expect(sitemap).not.toContain("/showcase");
  expect(sitemap).not.toContain("huo-er-mu-ci-hai-xia.homes");
});

import { expect, test } from "@playwright/test";

test("openclaw dashboard proxy route does not redirect into locale paths", async ({
  request,
}) => {
  const response = await request.get(
    "/_openclaw-dashboard/test-deployment/control-ui",
    {
      maxRedirects: 0,
      failOnStatusCode: false,
    }
  );

  expect([301, 302, 303, 307, 308]).not.toContain(response.status());
  expect(response.url()).toContain(
    "/_openclaw-dashboard/test-deployment/control-ui"
  );
  expect(response.headers()["location"]).toBeUndefined();
});

import { describe, expect, it } from "vitest";
import { shouldBypassIntlMiddleware } from "./middleware-routing";

describe("shouldBypassIntlMiddleware", () => {
  it("bypasses locale handling for openclaw dashboard proxy routes", () => {
    expect(
      shouldBypassIntlMiddleware("/_openclaw-dashboard/deployment-1/control-ui")
    ).toBe(true);
  });

  it("keeps regular localized pages on the intl path", () => {
    expect(shouldBypassIntlMiddleware("/en")).toBe(false);
    expect(shouldBypassIntlMiddleware("/deployments")).toBe(false);
  });
});

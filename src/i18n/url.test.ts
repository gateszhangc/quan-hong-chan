import { describe, expect, it } from "vitest";
import { buildAlternateLanguageUrls, localizePathname } from "./url";

describe("localizePathname", () => {
  it("keeps the default locale prefixed because app routes live under [locale]", () => {
    expect(localizePathname("zh", "/")).toBe("/zh");
    expect(localizePathname("zh", "/posts")).toBe("/zh/posts");
  });

  it("prefixes non-default locales as usual", () => {
    expect(localizePathname("en", "/")).toBe("/en");
    expect(localizePathname("ja", "/posts")).toBe("/ja/posts");
  });
});

describe("buildAlternateLanguageUrls", () => {
  it("builds alternate URLs from the prefixed locale paths", () => {
    const languages = buildAlternateLanguageUrls("https://quan-hong-chan.lol", "/");

    expect(languages.zh).toBe("https://quan-hong-chan.lol/zh");
    expect(languages.en).toBe("https://quan-hong-chan.lol/en");
    expect(languages["x-default"]).toBe("https://quan-hong-chan.lol/zh");
  });
});

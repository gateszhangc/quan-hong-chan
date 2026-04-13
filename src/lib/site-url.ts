const DEFAULT_SITE_URL = "https://quan-hong-chan.lol";

const stripTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const normalizeSiteUrl = (value: string) => {
  const normalized = value.startsWith("http") ? value : `https://${value}`;
  const url = new URL(normalized);

  if (url.hostname === "www.quan-hong-chan.lol") {
    url.hostname = "quan-hong-chan.lol";
  }

  return stripTrailingSlash(url.toString());
};

export const getSiteUrl = () => {
  const envUrl =
    process.env.NEXT_PUBLIC_WEB_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.VERCEL_URL ||
    DEFAULT_SITE_URL;

  return normalizeSiteUrl(envUrl);
};

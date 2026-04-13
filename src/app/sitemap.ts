import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { getHormuzSitemapEntries } from "@/data/hormuz-news";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return getHormuzSitemapEntries(siteUrl);
}

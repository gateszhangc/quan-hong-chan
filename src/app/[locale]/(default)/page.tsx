import HormuzHomepage from "@/components/hormuz/hormuz-homepage";
import { getSiteUrl } from "@/lib/site-url";
import { getHormuzSiteCopy } from "@/lib/hormuz-content";
import {
  buildAlternateLanguageUrls,
  getAbsoluteLocalizedUrl,
} from "@/i18n/url";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const siteUrl = getSiteUrl();
  const canonicalUrl = getAbsoluteLocalizedUrl(siteUrl, locale, "/");
  const languages = buildAlternateLanguageUrls(siteUrl, "/");
  const copy = getHormuzSiteCopy(locale);

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    keywords: copy.metadataKeywords,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: copy.metadataTitle,
      description: copy.metadataDescription,
      url: canonicalUrl,
      siteName: copy.brand,
      images: [`${siteUrl}/brand/quan-hong-chan-og.png`],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metadataTitle,
      description: copy.metadataDescription,
      images: [`${siteUrl}/brand/quan-hong-chan-og.png`],
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <HormuzHomepage locale={locale} />;
}

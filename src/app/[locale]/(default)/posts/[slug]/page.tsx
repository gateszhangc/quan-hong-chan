import { notFound } from "next/navigation";
import HormuzBriefingPage from "@/components/hormuz/hormuz-briefing-page";
import { getSiteUrl } from "@/lib/site-url";
import {
  getAllHormuzBriefingSlugs,
  getHormuzBriefingBySlug,
} from "@/lib/hormuz-content";
import {
  buildAlternateLanguageUrls,
  getAbsoluteLocalizedUrl,
} from "@/i18n/url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const briefing = getHormuzBriefingBySlug(locale, slug);

  const siteUrl = getSiteUrl();
  const pathname = `/posts/${slug}`;
  const canonicalUrl = getAbsoluteLocalizedUrl(siteUrl, locale, pathname);
  const languages = buildAlternateLanguageUrls(siteUrl, pathname);

  return {
    title: briefing?.title,
    description: briefing?.description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: briefing?.title,
      description: briefing?.description,
      url: canonicalUrl,
      images: [`${siteUrl}/brand/quan-hong-chan-og.png`],
    },
  };
}

export function generateStaticParams() {
  return getAllHormuzBriefingSlugs().map((slug) => ({ slug }));
}

export default async function ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const briefing = getHormuzBriefingBySlug(locale, slug);

  if (!briefing) {
    notFound();
  }

  return <HormuzBriefingPage locale={locale} briefing={briefing} />;
}

import HormuzPostsHub from "@/components/hormuz/hormuz-posts-hub";
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
  const copy = getHormuzSiteCopy(locale);

  const siteUrl = getSiteUrl();
  const canonicalUrl = getAbsoluteLocalizedUrl(siteUrl, locale, "/posts");
  const languages = buildAlternateLanguageUrls(siteUrl, "/posts");

  return {
    title: copy.newsroomTitle,
    description: copy.newsroomDescription,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: copy.newsroomTitle,
      description: copy.newsroomDescription,
      url: canonicalUrl,
      images: [`${siteUrl}/brand/hormuz-og.png`],
    },
  };
}

export default async function PostsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <HormuzPostsHub locale={locale} />;
}

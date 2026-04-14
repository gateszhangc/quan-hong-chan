import TermsOfServiceContent from "@/app/(legal)/terms-of-service/page.mdx";
import { getSiteUrl } from "@/lib/site-url";
import { getHormuzSiteCopy } from "@/lib/hormuz-content";
import {
  buildAlternateLanguageUrls,
  getAbsoluteLocalizedUrl,
} from "@/i18n/url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const siteUrl = getSiteUrl();
  const pathname = "/terms-of-service";
  const copy = getHormuzSiteCopy(locale);

  return {
    title: `Terms of Service | ${copy.brand}`,
    description:
      locale.startsWith("zh")
        ? "阅读全红婵观察站的使用条款、信息披露与免责声明。"
        : "Read the usage terms, informational disclosures, and disclaimers for Quan Hongchan Watch.",
    alternates: {
      canonical: getAbsoluteLocalizedUrl(siteUrl, locale, pathname),
      languages: buildAlternateLanguageUrls(siteUrl, pathname),
    },
  };
}

export default function TermsOfServicePage() {
  return <TermsOfServiceContent />;
}

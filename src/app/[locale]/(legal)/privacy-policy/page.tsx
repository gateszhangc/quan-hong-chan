import PrivacyPolicyContent from "@/app/(legal)/privacy-policy/page.mdx";
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
  const pathname = "/privacy-policy";
  const copy = getHormuzSiteCopy(locale);

  return {
    title: `Privacy Policy | ${copy.brand}`,
    description:
      locale.startsWith("zh")
        ? "了解霍尔木兹海峡资讯站如何处理网站访问数据、分析数据与联系信息。"
        : "Learn how Hormuz Strait News handles site analytics, technical data, and contact information.",
    alternates: {
      canonical: getAbsoluteLocalizedUrl(siteUrl, locale, pathname),
      languages: buildAlternateLanguageUrls(siteUrl, pathname),
    },
  };
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}

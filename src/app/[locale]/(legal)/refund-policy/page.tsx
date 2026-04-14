import RefundPolicyContent from "@/app/(legal)/refund-policy/page.mdx";
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
  const pathname = "/refund-policy";
  const copy = getHormuzSiteCopy(locale);

  return {
    title: `Refund Policy | ${copy.brand}`,
    description:
      locale.startsWith("zh")
        ? "查看全红婵观察站当前不提供标准付费产品退款计划的说明。"
        : "Review the current refund position for Quan Hongchan Watch and how future paid offerings would be disclosed.",
    alternates: {
      canonical: getAbsoluteLocalizedUrl(siteUrl, locale, pathname),
      languages: buildAlternateLanguageUrls(siteUrl, pathname),
    },
  };
}

export default function RefundPolicyPage() {
  return <RefundPolicyContent />;
}

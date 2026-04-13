import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { getSiteUrl } from "@/lib/site-url";
import {
  getHormuzAlternateLanguages,
  getHormuzArticles,
  getHormuzCanonicalUrl,
  getHormuzSiteCopy,
} from "@/data/hormuz-news";
import {
  getHormuzTypography,
  hormuzTypographyClassName,
} from "@/components/hormuz/theme";

const formatDate = (locale: string, value: string) =>
  new Intl.DateTimeFormat(locale.startsWith("zh") ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00.000Z`));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getHormuzSiteCopy(locale);
  const siteUrl = getSiteUrl();

  return {
    title:
      copy.locale === "zh"
        ? `${copy.archiveLabel} | ${copy.siteName}`
        : `${copy.archiveLabel} | ${copy.siteName}`,
    description:
      copy.locale === "zh"
        ? "按时间查看围绕霍尔木兹海峡的最新快照、官方声明与航运影响。"
        : "Browse the latest Strait of Hormuz snapshots, official statements, and shipping impacts in one archive.",
    alternates: {
      canonical: getHormuzCanonicalUrl(siteUrl, locale, "/posts"),
      languages: getHormuzAlternateLanguages(siteUrl, "/posts"),
    },
  };
}

export default async function PostsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getHormuzSiteCopy(locale);
  const articles = getHormuzArticles(locale);
  const { bodyStyle, serifStyle } = getHormuzTypography(locale);

  return (
    <div className={`mx-auto max-w-7xl px-4 py-14 md:px-8 lg:py-20 ${hormuzTypographyClassName}`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#79c7d2]" style={bodyStyle}>
            {copy.archiveLabel}
          </p>
          <h1 className="mt-3 text-5xl text-white md:text-6xl" style={serifStyle}>
            {copy.locale === "zh"
              ? "按时间查看霍尔木兹海峡新闻脉络"
              : "Browse the latest Strait of Hormuz briefings"}
          </h1>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[#a2bbc1]" style={bodyStyle}>
          {copy.locale === "zh"
            ? "每一页都把标题、影响、来源和后续跟踪点放在一起，适合快速建立判断框架。"
            : "Each page keeps the headline, impact, original source, and follow-up signal together so the story stays actionable."}
        </p>
      </div>

      <div className="mt-10 grid gap-5 xl:grid-cols-2">
        {articles.map((article, index) => (
          <article
            key={article.slug}
            className={`rounded-[2rem] border border-white/8 p-6 ${
              index === 0 ? "bg-[#0d2430]" : "bg-[#091b23]/80"
            }`}
          >
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.26em] text-[#79c7d2]" style={bodyStyle}>
              <span>{article.category}</span>
              <span>{formatDate(locale, article.publishedAt)}</span>
              <span>{article.sourceName}</span>
            </div>
            <h2 className="mt-5 text-3xl text-white" style={serifStyle}>
              {article.headline}
            </h2>
            <p className="mt-3 text-base leading-8 text-[#c9d9dc]" style={bodyStyle}>
              {article.summary}
            </p>
            <p
              className="mt-5 rounded-[1.4rem] border border-[#b88a44]/24 bg-[#b88a44]/10 px-4 py-4 text-sm leading-7 text-[#f2e6ce]"
              style={bodyStyle}
            >
              {article.impact}
            </p>
            <div className="mt-6 flex flex-wrap gap-3" style={bodyStyle}>
              <Link
                href={`/${locale}/posts/${article.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                {copy.readMore}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={article.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#79c7d2]/28 px-5 py-3 text-sm font-medium text-[#c8edf2] transition hover:bg-[#79c7d2]/10"
              >
                {copy.sourceLabel}
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { getSiteUrl } from "@/lib/site-url";
import {
  getHormuzAlternateLanguages,
  getHormuzArticle,
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
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getHormuzArticle(locale, slug);

  if (!article) {
    return {};
  }

  const siteUrl = getSiteUrl();

  return {
    title: `${article.headline} | ${getHormuzSiteCopy(locale).siteName}`,
    description: article.summary,
    alternates: {
      canonical: getHormuzCanonicalUrl(siteUrl, locale, `/posts/${slug}`),
      languages: getHormuzAlternateLanguages(siteUrl, `/posts/${slug}`),
    },
    openGraph: {
      title: article.headline,
      description: article.summary,
      type: "article",
      publishedTime: `${article.publishedAt}T00:00:00.000Z`,
      url: getHormuzCanonicalUrl(siteUrl, locale, `/posts/${slug}`),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getHormuzArticle(locale, slug);

  if (!article) {
    notFound();
  }

  const copy = getHormuzSiteCopy(locale);
  const relatedArticles = getHormuzArticles(locale)
    .filter((item) => item.slug !== slug)
    .slice(0, 3);
  const siteUrl = getSiteUrl();
  const { bodyStyle, serifStyle } = getHormuzTypography(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.headline,
    datePublished: `${article.publishedAt}T00:00:00.000Z`,
    dateModified: `${article.publishedAt}T00:00:00.000Z`,
    description: article.summary,
    mainEntityOfPage: getHormuzCanonicalUrl(siteUrl, locale, `/posts/${slug}`),
    publisher: {
      "@type": "NewsMediaOrganization",
      name: copy.siteName,
    },
  };

  return (
    <article className={`mx-auto max-w-6xl px-4 py-14 md:px-8 lg:py-20 ${hormuzTypographyClassName}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href={`/${locale}/posts`}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#dceef2] transition hover:bg-white/10"
        style={bodyStyle}
      >
        <ArrowLeft className="h-4 w-4" />
        {copy.backArchive}
      </Link>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_320px]">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-[#79c7d2]" style={bodyStyle}>
            <span>{article.category}</span>
            <span>{formatDate(locale, article.publishedAt)}</span>
            <span>{article.sourceName}</span>
          </div>
          <h1 className="mt-5 text-5xl leading-[0.95] text-white md:text-6xl" style={serifStyle}>
            {article.headline}
          </h1>
          <p className="mt-6 text-xl leading-8 text-[#d3e1e4]" style={bodyStyle}>
            {article.dek}
          </p>
          <p className="mt-8 text-base leading-8 text-[#b8cdd1]" style={bodyStyle}>
            {article.summary}
          </p>

          <div className="mt-8 rounded-[2rem] border border-[#b88a44]/24 bg-[#b88a44]/10 p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[#f0d9ae]" style={bodyStyle}>
              {copy.locale === "zh" ? "影响判断" : "Impact"}
            </p>
            <p className="mt-3 text-lg leading-8 text-[#fff4de]" style={bodyStyle}>
              {article.impact}
            </p>
          </div>

          <section className="mt-8 rounded-[2rem] border border-white/8 bg-white/4 p-6">
            <h2 className="text-3xl text-white" style={serifStyle}>
              {copy.locale === "zh" ? "关键点" : "Key points"}
            </h2>
            <ul className="mt-5 space-y-4" style={bodyStyle}>
              {article.keyPoints.map((point) => (
                <li key={point} className="flex gap-3 text-base leading-8 text-[#bad0d5]">
                  <span className="mt-3 h-2 w-2 rounded-full bg-[#79c7d2]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8 rounded-[2rem] border border-white/8 bg-white/4 p-6">
            <h2 className="text-3xl text-white" style={serifStyle}>
              {copy.locale === "zh" ? "为什么继续跟踪" : "Why keep tracking this"}
            </h2>
            <ul className="mt-5 space-y-4" style={bodyStyle}>
              {article.whyItMatters.map((point) => (
                <li key={point} className="flex gap-3 text-base leading-8 text-[#bad0d5]">
                  <span className="mt-3 h-2 w-2 rounded-full bg-[#b88a44]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-5">
          <div className="rounded-[2rem] border border-white/8 bg-[#0b1e27]/84 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[#79c7d2]" style={bodyStyle}>
              {copy.sourceLabel}
            </p>
            <p className="mt-3 text-sm leading-7 text-[#a9c0c6]" style={bodyStyle}>
              {copy.locale === "zh"
                ? "阅读原始报道或官方声明，以便核对措辞与最新补充信息。"
                : "Open the original reporting or official statement to verify language and later updates."}
            </p>
            <Link
              href={article.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#79c7d2]/28 px-4 py-3 text-sm font-medium text-[#d5eff3] transition hover:bg-[#79c7d2]/10"
              style={bodyStyle}
            >
              {article.sourceName}
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-[2rem] border border-white/8 bg-white/4 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[#79c7d2]" style={bodyStyle}>
              {copy.locale === "zh" ? "继续阅读" : "Continue reading"}
            </p>
            <div className="mt-4 space-y-4">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/${locale}/posts/${related.slug}`}
                  className="block rounded-[1.4rem] border border-white/8 bg-[#091922] px-4 py-4 transition hover:border-[#79c7d2]/35 hover:bg-[#0d2430]"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-[#79c7d2]" style={bodyStyle}>
                    {formatDate(locale, related.publishedAt)}
                  </p>
                  <h3 className="mt-2 text-2xl text-white" style={serifStyle}>
                    {related.headline}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#a6bcc2]" style={bodyStyle}>
                    {related.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm text-[#e1f1f4]" style={bodyStyle}>
                    {copy.readMore}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

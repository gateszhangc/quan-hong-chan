import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { getSiteUrl } from "@/lib/site-url";
import {
  HORMUZ_LAST_UPDATED,
  getHormuzAlternateLanguages,
  getHormuzArticles,
  getHormuzCanonicalUrl,
  getHormuzJsonLd,
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
  const siteUrl = getSiteUrl();
  const copy = getHormuzSiteCopy(locale);

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    keywords: copy.metadataKeywords,
    alternates: {
      canonical: getHormuzCanonicalUrl(siteUrl, locale, "/"),
      languages: getHormuzAlternateLanguages(siteUrl, "/"),
    },
    openGraph: {
      title: copy.metadataTitle,
      description: copy.metadataDescription,
      type: "website",
      url: getHormuzCanonicalUrl(siteUrl, locale, "/"),
      siteName: copy.siteName,
      images: [
        {
          url: `${siteUrl}/brand/hormuz-mark.png`,
          width: 512,
          height: 512,
          alt: copy.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metadataTitle,
      description: copy.metadataDescription,
      images: [`${siteUrl}/brand/hormuz-mark.png`],
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getHormuzSiteCopy(locale);
  const articles = getHormuzArticles(locale);
  const leadStory = articles[0];
  const siteUrl = getSiteUrl();
  const jsonLd = getHormuzJsonLd(siteUrl, locale);
  const { bodyStyle, serifStyle } = getHormuzTypography(locale);

  return (
    <div className={`relative ${hormuzTypographyClassName}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-[-15%] h-[24rem] w-[24rem] rounded-full bg-[#79c7d2]/14 blur-3xl" />
          <div className="absolute right-[-5%] top-[4rem] h-[20rem] w-[20rem] rounded-full bg-[#b88a44]/18 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)] lg:py-20">
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3" style={bodyStyle}>
              {copy.heroBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-[#79c7d2]/30 bg-[#79c7d2]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-[#bce6ee]"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="space-y-5">
              <h1
                className="max-w-4xl text-5xl leading-[0.92] text-white md:text-7xl"
                style={serifStyle}
              >
                {copy.pageTitle}
              </h1>
              <p
                className="max-w-2xl text-lg leading-8 text-[#b7ccd1] md:text-xl"
                style={bodyStyle}
              >
                {copy.pageDescription}
              </p>
            </div>

            <div
              className="grid gap-3 rounded-[2rem] border border-white/10 bg-[#081d27]/82 p-5 shadow-[0_30px_80px_rgba(3,13,18,0.35)] md:grid-cols-3"
              style={bodyStyle}
            >
              {copy.metrics.slice(0, 3).map((metric) => (
                <div
                  key={metric.value}
                  className="rounded-[1.4rem] border border-white/8 bg-white/4 px-4 py-4"
                >
                  <div className="text-2xl font-semibold text-white md:text-3xl">
                    {metric.value}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#a3bbc1]">{metric.label}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[#79c7d2]">
                    {metric.source}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4" style={bodyStyle}>
              <Link
                href={`/${locale}/posts`}
                className="landing-hero-button inline-flex items-center gap-2 rounded-full border border-[#b88a44]/55 bg-[#b88a44]/16 px-6 py-3 text-sm font-medium text-[#fff5de] transition hover:bg-[#b88a44]/24"
              >
                {copy.viewAll}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={leadStory.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="landing-hero-button inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-6 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
              >
                {copy.sourceLabel}
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <aside className="relative">
            <div className="absolute inset-x-6 top-6 h-24 rounded-full bg-[#79c7d2]/14 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-[#0a202b]/88 p-6 shadow-[0_35px_100px_rgba(0,0,0,0.35)]">
              <p
                className="text-xs uppercase tracking-[0.34em] text-[#79c7d2]"
                style={bodyStyle}
              >
                {copy.snapshotLabel}
              </p>
              <div className="mt-5 space-y-4" style={bodyStyle}>
                {copy.watchlist.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.4rem] border border-white/8 bg-white/4 p-4"
                  >
                    <h2 className="text-base font-semibold text-white">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[#a9c0c6]">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-[1.5rem] border border-dashed border-[#79c7d2]/28 bg-[#06151c] p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[#79c7d2]" style={bodyStyle}>
                  {copy.locale === "zh" ? "更新时间" : "Last updated"}
                </p>
                <p className="mt-2 text-lg text-white" style={serifStyle}>
                  {formatDate(locale, HORMUZ_LAST_UPDATED)}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="latest" className="scroll-mt-24 border-b border-white/8">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 lg:py-20">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p
                className="text-sm uppercase tracking-[0.3em] text-[#79c7d2]"
                style={bodyStyle}
              >
                {copy.latestLabel}
              </p>
              <h2 className="mt-3 text-4xl text-white md:text-5xl" style={serifStyle}>
                {leadStory.headline}
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-[#a3bbc1]" style={bodyStyle}>
              {leadStory.dek}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <article className="rounded-[2rem] border border-white/10 bg-[#0b202b]/88 p-6 shadow-[0_30px_90px_rgba(2,14,20,0.35)]">
              <div className="flex flex-wrap items-center gap-3 text-sm text-[#9fc4cc]" style={bodyStyle}>
                <span className="rounded-full border border-[#79c7d2]/30 px-3 py-1">
                  {leadStory.category}
                </span>
                <span>{formatDate(locale, leadStory.publishedAt)}</span>
                <span>{leadStory.sourceName}</span>
              </div>
              <p className="mt-6 text-xl leading-8 text-[#e2edef]" style={bodyStyle}>
                {leadStory.summary}
              </p>
              <p
                className="mt-6 rounded-[1.4rem] border border-[#b88a44]/26 bg-[#b88a44]/10 px-5 py-4 text-base leading-7 text-[#f7ebd3]"
                style={bodyStyle}
              >
                {leadStory.impact}
              </p>
              <ul className="mt-6 space-y-3" style={bodyStyle}>
                {leadStory.keyPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-7 text-[#acc3c9]">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#79c7d2]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4" style={bodyStyle}>
                <Link
                  href={`/${locale}/posts/${leadStory.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  {copy.readMore}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={leadStory.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#79c7d2]/28 px-5 py-3 text-sm font-medium text-[#bfe3ea] transition hover:bg-[#79c7d2]/10"
                >
                  {copy.sourceLabel}
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </article>

            <div className="grid gap-4">
              {copy.metrics.map((metric) => (
                <div
                  key={metric.value + metric.source}
                  className="rounded-[1.6rem] border border-white/8 bg-white/4 px-5 py-5"
                  style={bodyStyle}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-3xl font-semibold text-white">{metric.value}</p>
                    <span className="rounded-full border border-[#b88a44]/35 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[#f0d9ae]">
                      {metric.source}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#a5bec5]">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {articles.slice(1).map((article) => (
              <Link
                key={article.slug}
                href={`/${locale}/posts/${article.slug}`}
                className="group rounded-[1.8rem] border border-white/8 bg-[#0b1c24]/76 p-5 transition hover:border-[#79c7d2]/35 hover:bg-[#102631]"
              >
                <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.26em] text-[#79c7d2]" style={bodyStyle}>
                  <span>{article.category}</span>
                  <span>{formatDate(locale, article.publishedAt)}</span>
                </div>
                <h3 className="mt-4 text-2xl leading-tight text-white" style={serifStyle}>
                  {article.headline}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#a7bec5]" style={bodyStyle}>
                  {article.summary}
                </p>
                <div
                  className="mt-5 flex items-center gap-2 text-sm text-[#dbeef1]"
                  style={bodyStyle}
                >
                  <span>{copy.readMore}</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="why-it-matters" className="scroll-mt-24 border-b border-white/8">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:px-8 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)] lg:py-20">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#081d27]/88 p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(121,199,210,0.18),transparent_35%),radial-gradient(circle_at_80%_24%,rgba(184,138,68,0.2),transparent_28%),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:auto,auto,58px_58px,58px_58px]" />
            <div className="relative h-full min-h-[21rem] overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#06131a]">
              <div className="absolute left-[18%] top-[14%] h-[58%] w-[34%] rounded-[2.4rem] bg-[#173946]/82" />
              <div className="absolute right-[12%] top-[18%] h-[52%] w-[36%] rounded-[2.2rem] bg-[#193845]/82" />
              <div className="absolute left-[46%] top-[10%] h-[68%] w-[8%] rounded-full bg-gradient-to-b from-[#9bd8e2] via-[#79c7d2] to-[#4f9cb1] shadow-[0_0_45px_rgba(121,199,210,0.4)]" />
              <div className="absolute left-[49.5%] top-[18%] h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[#081d27] bg-[#f4dfb5]" />
              <div className="absolute left-[49.5%] top-[50%] h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[#081d27] bg-[#f4dfb5]" />
              <div className="absolute bottom-[15%] left-[14%] rounded-full border border-[#79c7d2]/25 px-3 py-2 text-xs uppercase tracking-[0.26em] text-[#c3eaf1]" style={bodyStyle}>
                Oman
              </div>
              <div className="absolute right-[12%] top-[12%] rounded-full border border-[#b88a44]/30 px-3 py-2 text-xs uppercase tracking-[0.26em] text-[#f4e1bb]" style={bodyStyle}>
                Iran
              </div>
              <div className="absolute bottom-[11%] right-[10%] rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.26em] text-[#b7cdd2]" style={bodyStyle}>
                Arabian Sea
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#79c7d2]" style={bodyStyle}>
              {copy.whyLabel}
            </p>
            <h2 className="mt-3 text-4xl text-white md:text-5xl" style={serifStyle}>
              {copy.locale === "zh"
                ? "同一条水道，为什么同时影响油价、航运和地缘政治"
                : "Why one narrow waterway can move oil, shipping, and geopolitics at once"}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {copy.whyItMatters.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.8rem] border border-white/8 bg-white/4 p-5"
                >
                  <h3 className="text-2xl text-white" style={serifStyle}>
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#aac2c8]" style={bodyStyle}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="timeline" className="scroll-mt-24 border-b border-white/8">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 lg:py-20">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-[#79c7d2]" style={bodyStyle}>
              {copy.timelineLabel}
            </p>
            <h2 className="mt-3 text-4xl text-white md:text-5xl" style={serifStyle}>
              {copy.locale === "zh"
                ? "最近事件如何一步步把海峡推向高压状态"
                : "How the latest events stacked pressure back onto the strait"}
            </h2>
          </div>
          <div className="grid gap-4">
            {copy.timeline.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="group grid gap-4 rounded-[1.8rem] border border-white/8 bg-[#0a1d26]/74 p-5 md:grid-cols-[140px_minmax(0,1fr)_auto]"
              >
                <div className="text-sm uppercase tracking-[0.28em] text-[#79c7d2]" style={bodyStyle}>
                  {formatDate(locale, item.date)}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl text-white" style={serifStyle}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#9eb7bd]" style={bodyStyle}>
                    {item.sourceName}
                  </p>
                </div>
                <div
                  className="inline-flex items-center gap-2 text-sm text-[#dfeef1]"
                  style={bodyStyle}
                >
                  <span>{copy.readMore}</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
                {index < copy.timeline.length - 1 ? (
                  <div className="md:col-span-3 h-px bg-white/6" />
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 lg:py-20">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-[#79c7d2]" style={bodyStyle}>
              {copy.faqLabel}
            </p>
            <h2 className="mt-3 text-4xl text-white md:text-5xl" style={serifStyle}>
              {copy.locale === "zh"
                ? "读这条新闻线，先把三件事想清楚"
                : "Three framing questions worth keeping in view"}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {copy.faq.map((item) => (
              <article
                key={item.question}
                className="rounded-[1.8rem] border border-white/8 bg-white/4 p-5"
              >
                <h3 className="text-2xl text-white" style={serifStyle}>
                  {item.question}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#abc2c8]" style={bodyStyle}>
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

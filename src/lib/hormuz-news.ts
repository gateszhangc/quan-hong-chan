import { toFileLocale } from "@/i18n/locale";
import { getHormuzBriefings } from "@/lib/hormuz-content";

export type HormuzNewsItem = {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  tag: string;
  external: boolean;
};

type FeedSource = {
  name: string;
  url: string;
};

const FEED_SOURCES: FeedSource[] = [
  {
    name: "BBC Middle East",
    url: "https://feeds.bbci.co.uk/news/world/middle_east/rss.xml",
  },
  {
    name: "Al Jazeera",
    url: "https://www.aljazeera.com/xml/rss/all.xml",
  },
  {
    name: "The Guardian World",
    url: "https://www.theguardian.com/world/rss",
  },
];

const DIRECT_PATTERNS = [
  /strait of hormuz/i,
  /\bhormuz\b/i,
  /gulf of oman/i,
];

const CONTEXTUAL_PATTERNS = [
  /\biran\b/i,
  /\btanker\b/i,
  /\bshipping\b/i,
  /\boil\b/i,
  /\blng\b/i,
  /\bnavy\b/i,
  /\bpersian gulf\b/i,
  /\bgulf\b/i,
  /\benergy\b/i,
];

const TAGS = {
  en: {
    security: "Security",
    shipping: "Shipping",
    energy: "Energy",
    diplomacy: "Diplomacy",
    briefing: "Desk briefing",
  },
  zh: {
    security: "安全",
    shipping: "航运",
    energy: "能源",
    diplomacy: "外交",
    briefing: "站内简报",
  },
};

const stripCdata = (value: string) =>
  value
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .trim();

const decodeXml = (value: string) =>
  value
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, "...");

const stripHtml = (value: string) =>
  decodeXml(stripCdata(value)).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const firstMatch = (xml: string, pattern: RegExp) => {
  const match = xml.match(pattern);
  return match?.[1]?.trim() ?? "";
};

const allMatches = (xml: string, pattern: RegExp) =>
  Array.from(xml.matchAll(pattern)).map((match) => match[1]);

const normalizeUrl = (url: string) => url.replace(/^http:\/\//i, "https://");

const createId = (title: string, url: string) =>
  `${title.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}-${url
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")}`.slice(0, 120);

const getScore = (title: string, summary: string) => {
  const haystack = `${title} ${summary}`;
  const direct = DIRECT_PATTERNS.some((pattern) => pattern.test(haystack));
  const contextualHits = CONTEXTUAL_PATTERNS.reduce(
    (total, pattern) => total + (pattern.test(haystack) ? 1 : 0),
    0
  );

  return (direct ? 10 : 0) + contextualHits;
};

const getTag = (locale: string, title: string, summary: string) => {
  const isZh = toFileLocale(locale) === "zh-cn";
  const labels = isZh ? TAGS.zh : TAGS.en;
  const haystack = `${title} ${summary}`.toLowerCase();

  if (haystack.includes("tanker") || haystack.includes("shipping")) {
    return labels.shipping;
  }
  if (
    haystack.includes("oil") ||
    haystack.includes("lng") ||
    haystack.includes("gas")
  ) {
    return labels.energy;
  }
  if (
    haystack.includes("talks") ||
    haystack.includes("sanction") ||
    haystack.includes("summit") ||
    haystack.includes("minister")
  ) {
    return labels.diplomacy;
  }

  return labels.security;
};

const parseRssItems = (xml: string, sourceName: string) => {
  const items = allMatches(xml, /<item>([\s\S]*?)<\/item>/g);

  return items
    .map((item) => {
      const title = stripHtml(firstMatch(item, /<title>([\s\S]*?)<\/title>/i));
      const link = normalizeUrl(firstMatch(item, /<link>([\s\S]*?)<\/link>/i));
      const description = stripHtml(
        firstMatch(item, /<description>([\s\S]*?)<\/description>/i)
      );
      const publishedAt = firstMatch(item, /<pubDate>([\s\S]*?)<\/pubDate>/i);

      if (!title || !link) {
        return null;
      }

      return {
        title,
        url: link,
        summary: description,
        source: sourceName,
        publishedAt: new Date(publishedAt || Date.now()).toISOString(),
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
};

const buildFallbackItems = (locale: string): HormuzNewsItem[] => {
  const labels = toFileLocale(locale) === "zh-cn" ? TAGS.zh : TAGS.en;
  const localePrefix = locale === "en" ? "" : `/${locale}`;

  return getHormuzBriefings(locale).map((briefing) => ({
    id: `briefing-${briefing.slug}`,
    title: briefing.title,
    summary: briefing.description,
    source: labels.briefing,
    url: `${localePrefix}/posts/${briefing.slug}`,
    publishedAt: briefing.updatedAt,
    tag: briefing.category,
    external: false,
  }));
};

export async function getHormuzNewsFeed(
  locale: string,
  limit: number = 10
): Promise<HormuzNewsItem[]> {
  const fallback = buildFallbackItems(locale);

  if (
    process.env.NEXT_RUNTIME_PROFILE === "playwright" ||
    process.env.NEXT_RUNTIME_PROFILE === "build"
  ) {
    return fallback.slice(0, limit);
  }

  try {
    const responses = await Promise.all(
      FEED_SOURCES.map(async (feed) => {
        const response = await fetch(feed.url, {
          next: { revalidate: 900 },
          signal: AbortSignal.timeout(3500),
        });

        if (!response.ok) {
          throw new Error(`${feed.name} returned ${response.status}`);
        }

        const xml = await response.text();
        return parseRssItems(xml, feed.name);
      })
    );

    const items = responses
      .flat()
      .map((item) => ({
        ...item,
        score: getScore(item.title, item.summary),
      }))
      .filter((item) => item.score >= 2)
      .sort((a, b) => {
        const dateDelta =
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        if (dateDelta !== 0) {
          return dateDelta;
        }
        return b.score - a.score;
      });

    const deduped: HormuzNewsItem[] = [];
    const seen = new Set<string>();

    for (const item of items) {
      const normalizedKey = `${item.title.toLowerCase()}|${item.url.toLowerCase()}`;
      if (seen.has(normalizedKey)) {
        continue;
      }
      seen.add(normalizedKey);

      deduped.push({
        id: createId(item.title, item.url),
        title: item.title,
        summary: item.summary,
        source: item.source,
        url: item.url,
        publishedAt: item.publishedAt,
        tag: getTag(locale, item.title, item.summary),
        external: true,
      });
    }

    const merged = [...deduped];
    for (const item of fallback) {
      if (merged.length >= limit) {
        break;
      }

      if (!merged.some((candidate) => candidate.title === item.title)) {
        merged.push(item);
      }
    }

    return merged.slice(0, limit);
  } catch (error) {
    console.warn("[hormuz-news] falling back to local briefings", error);
    return fallback.slice(0, limit);
  }
}

import { toFileLocale } from "../i18n/locale";
import { getHormuzBriefings } from "./hormuz-content";

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

const buildGoogleNewsSearchFeed = (query: string, locale: "zh" | "en") => {
  if (locale === "zh") {
    return `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=zh-CN&gl=CN&ceid=CN:zh-Hans`;
  }

  return `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
};

const FEED_SOURCES: FeedSource[] = [
  {
    name: "Google News CN / 全红婵",
    url: buildGoogleNewsSearchFeed("全红婵", "zh"),
  },
  {
    name: "Google News CN / 全红婵 跳水",
    url: buildGoogleNewsSearchFeed("全红婵 跳水", "zh"),
  },
  {
    name: "Google News EN / Quan Hongchan",
    url: buildGoogleNewsSearchFeed("Quan Hongchan", "en"),
  },
];

const DIRECT_PATTERNS = [/全红婵/u, /\bquan hongchan\b/i, /\bhongchan quan\b/i];

const CONTEXTUAL_PATTERNS = [
  /跳水/u,
  /女子\s*10米台/u,
  /世界杯/u,
  /世锦赛/u,
  /奥运/u,
  /预赛/u,
  /决赛/u,
  /采访/u,
  /训练/u,
  /\bdiving\b/i,
  /\b10m platform\b/i,
  /\bworld cup\b/i,
  /\bchampionships?\b/i,
  /\bfinal\b/i,
  /\binterview\b/i,
  /\btraining\b/i,
  /\bcoach\b/i,
];

const TAGS = {
  en: {
    competition: "Competition",
    interview: "Training / Interview",
    technique: "Technique Talk",
    profile: "Profile Watch",
    briefing: "Desk Briefing",
  },
  zh: {
    competition: "赛事",
    interview: "训练 / 采访",
    technique: "动作讨论",
    profile: "人物观察",
    briefing: "站内文章",
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
  `${title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/giu, "-")}-${url
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")}`.slice(0, 120);

export const scoreQuanHongchanNews = (title: string, summary: string) => {
  const haystack = `${title} ${summary}`;
  const direct = DIRECT_PATTERNS.some((pattern) => pattern.test(haystack));
  const contextualHits = CONTEXTUAL_PATTERNS.reduce(
    (total, pattern) => total + (pattern.test(haystack) ? 1 : 0),
    0
  );

  return (direct ? 12 : 0) + contextualHits * 2;
};

export const classifyQuanHongchanNewsTag = (
  locale: string,
  title: string,
  summary: string
) => {
  const isZh = toFileLocale(locale) === "zh-cn";
  const labels = isZh ? TAGS.zh : TAGS.en;
  const haystack = `${title} ${summary}`.toLowerCase();
  const haystackRaw = `${title} ${summary}`;

  if (
    /采访|训练|备战|教练/u.test(haystackRaw) ||
    /\binterview\b|\btraining\b|\bcoach\b|\bpractice\b/i.test(haystack)
  ) {
    return labels.interview;
  }

  if (
    /入水|动作|难度|技术/u.test(haystackRaw) ||
    /\btechnique\b|\bentry\b|\bsplash\b|\breplay\b/i.test(haystack)
  ) {
    return labels.technique;
  }

  if (
    /比赛|决赛|预赛|冠军|世界杯|世锦赛|奥运/u.test(haystackRaw) ||
    /\bfinal\b|\bprelim\b|\bchampionship\b|\bworld cup\b|\bolympic\b|\bmedal\b/i.test(
      haystack
    )
  ) {
    return labels.competition;
  }

  return labels.profile;
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
  const localePrefix = `/${locale}`;

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
        score: scoreQuanHongchanNews(item.title, item.summary),
      }))
      .filter((item) => item.score >= 12)
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
        tag: classifyQuanHongchanNewsTag(locale, item.title, item.summary),
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

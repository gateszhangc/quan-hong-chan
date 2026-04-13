import { locales } from "@/i18n/locale";

export type HormuzNewsLocale = "en" | "zh";

type LocalizedText<T> = {
  en: T;
  zh: T;
};

export type HormuzArticleRecord = {
  slug: string;
  publishedAt: string;
  category: string;
  sourceName: string;
  sourceUrl: string;
  headline: LocalizedText<string>;
  dek: LocalizedText<string>;
  summary: LocalizedText<string>;
  impact: LocalizedText<string>;
  timelineLabel: LocalizedText<string>;
  keyPoints: LocalizedText<string[]>;
  whyItMatters: LocalizedText<string[]>;
};

export type HormuzArticle = {
  slug: string;
  publishedAt: string;
  category: string;
  sourceName: string;
  sourceUrl: string;
  headline: string;
  dek: string;
  summary: string;
  impact: string;
  timelineLabel: string;
  keyPoints: string[];
  whyItMatters: string[];
};

export const HORMUZ_LAST_UPDATED = "2026-04-14";

export const HORMUZ_SUPPORTED_LOCALES = ["en", "zh", "zh-Hant"] as const;

const NEWSROOM_NAME = {
  en: "Hormuz Brief",
  zh: "霍尔木兹海峡观察",
} as const;

const articles: HormuzArticleRecord[] = [
  {
    slug: "us-blockade-logic-apr-13-2026",
    publishedAt: "2026-04-13",
    category: "Strategy",
    sourceName: "Axios",
    sourceUrl: "https://www.axios.com/2026/04/13/the-logic-behind-the-us-blockade",
    headline: {
      en: "Washington shifts from ceasefire monitoring to blockade logic",
      zh: "华盛顿从停火监督转向“封锁逻辑”",
    },
    dek: {
      en: "A selective closure is still shaping who can move through the strait and on what terms.",
      zh: "海峡仍处于“选择性开放”状态，谁能通过、以什么条件通过，仍在被重新定义。",
    },
    summary: {
      en: "Axios reported on April 13, 2026 that the U.S. blockade strategy is designed to pressure Iran into opening the Strait of Hormuz to all traffic instead of letting Tehran decide transit lane by lane.",
      zh: "Axios 在 2026 年 4 月 13 日报道称，美方的封锁策略目标，是迫使伊朗恢复对所有船只开放霍尔木兹海峡，而不是让德黑兰逐船决定放行。",
    },
    impact: {
      en: "Market risk stays elevated because the chokepoint is not yet functioning like an ordinary commercial route.",
      zh: "市场风险依然高企，因为这个咽喉水道尚未恢复到普通商业航道的状态。",
    },
    timelineLabel: {
      en: "Selective closure remains the core risk",
      zh: "选择性封锁仍是核心风险",
    },
    keyPoints: {
      en: [
        "Selective access still gives Iran leverage over commercial traffic.",
        "A full reopening has not yet been verified by normal tanker throughput.",
        "Shipping, insurance, and oil traders are still pricing political control risk.",
      ],
      zh: [
        "海峡的选择性放行，仍让伊朗掌握商业航行的政治杠杆。",
        "是否真正“完全重开”，仍未从油轮通行量上得到验证。",
        "航运、保险和油市仍在按“政治控制风险”重新定价。",
      ],
    },
    whyItMatters: {
      en: [
        "The story explains why a ceasefire headline alone does not normalize flows.",
        "It reframes the Strait of Hormuz as a political gate, not just a shipping lane.",
      ],
      zh: [
        "这条报道说明，停火标题本身并不等于物流恢复正常。",
        "它提醒读者：霍尔木兹海峡现在更像一个政治闸门，而不只是航道。",
      ],
    },
  },
  {
    slug: "naval-blockade-announced-apr-12-2026",
    publishedAt: "2026-04-12",
    category: "Conflict",
    sourceName: "Axios",
    sourceUrl:
      "https://www.axios.com/2026/04/12/trump-naval-blockade-iran-strait-hormuz-peace-talks",
    headline: {
      en: "Peace talks collapse and blockade language returns",
      zh: "和谈破裂后，海上封锁表述重新回到前台",
    },
    dek: {
      en: "The April 12 escalation reset expectations for shipping, insurance, and energy markets.",
      zh: "4 月 12 日的升级让航运、保险与能源市场重新进入战时预期。",
    },
    summary: {
      en: "After talks in Pakistan failed, Axios reported that the United States announced a naval blockade posture aimed at ships trying to enter or leave the Strait of Hormuz.",
      zh: "在巴基斯坦和谈失败后，Axios 报道称，美国宣布进入海上封锁姿态，目标是管制试图进出霍尔木兹海峡的船只。",
    },
    impact: {
      en: "This is the event that reintroduced immediate disruption risk after a brief diplomatic window.",
      zh: "这次表态重新引爆了中断风险，也基本终结了此前短暂的外交缓和窗口。",
    },
    timelineLabel: {
      en: "Diplomacy breaks and coercion resumes",
      zh: "外交失速，强制博弈回归",
    },
    keyPoints: {
      en: [
        "Shipping markets reacted to the renewed threat of interdiction.",
        "Any blockade posture increases legal, insurance, and rerouting costs.",
        "The event made safe-passage mechanisms more urgent for traders and crews.",
      ],
      zh: [
        "市场重新押注更高的拦截与检查风险。",
        "只要进入“封锁姿态”，法律、保险和绕航成本就会上升。",
        "这也让“安全通行机制”从选项变成刚需。",
      ],
    },
    whyItMatters: {
      en: [
        "It marks the sharpest policy reversal in the current April news cycle.",
        "Oil traders now watch military signaling and diplomacy as one combined signal.",
      ],
      zh: [
        "这是 4 月这轮新闻周期里最剧烈的一次政策反转。",
        "油市开始把军事信号和外交进展视为同一个价格变量。",
      ],
    },
  },
  {
    slug: "us-warships-cross-strait-apr-11-2026",
    publishedAt: "2026-04-11",
    category: "Transit",
    sourceName: "Axios",
    sourceUrl: "https://www.axios.com/2026/04/11/us-iran-navy-strait-of-hormuz",
    headline: {
      en: "U.S. warships test a new passage through Hormuz",
      zh: "美军舰艇穿越海峡，测试新的通行路线",
    },
    dek: {
      en: "The first crossing since the war began signaled mine-clearing and freedom-of-navigation efforts.",
      zh: "这是战事爆发后的首次穿越，背后指向扫雷与恢复航行自由的试探。",
    },
    summary: {
      en: "Axios reported on April 11 that U.S. Navy ships crossed the Strait of Hormuz for the first time since the conflict began, with CENTCOM describing the move as part of efforts to clear sea mines and establish a safer passage.",
      zh: "Axios 在 4 月 11 日报道称，美军舰艇自冲突爆发以来首次穿越霍尔木兹海峡。美军中央司令部将此举描述为扫除海雷、建立更安全通道的一部分。",
    },
    impact: {
      en: "The operation signaled that any commercial reopening would depend on physical route security, not declarations alone.",
      zh: "这次行动释放出一个明确信号：商业航运若要恢复，依赖的是航道安全条件，而不只是政治声明。",
    },
    timelineLabel: {
      en: "Route security moves from rhetoric to operations",
      zh: "航道安全从口头承诺进入实操阶段",
    },
    keyPoints: {
      en: [
        "CENTCOM linked the transit to mine-clearing and safe-passage preparation.",
        "Reports of only a few supertankers crossing show traffic is still far below normal.",
        "Commercial confidence still hinges on repeatable, escorted transit.",
      ],
      zh: [
        "美军把这次穿越与扫雷和安全航道准备直接绑定。",
        "即便有少数超级油轮通过，也远低于正常流量。",
        "商业市场真正需要的是可重复、可保障的安全通行，而不是一次性展示。",
      ],
    },
    whyItMatters: {
      en: [
        "It is the clearest recent signal that reopening requires operational control of the waterway.",
        "The story helps explain why tanker owners still hesitate even after diplomatic announcements.",
      ],
      zh: [
        "它是近期最清晰的信号：海峡重开需要对航道拥有实际控制力。",
        "这也解释了为什么即使有外交表态，船东仍然犹豫。",
      ],
    },
  },
  {
    slug: "strait-mostly-closed-apr-09-2026",
    publishedAt: "2026-04-09",
    category: "Shipping",
    sourceName: "Axios",
    sourceUrl: "https://www.axios.com/2026/04/09/iran-us-strait-of-hormuz-khamenei",
    headline: {
      en: "Hormuz remains effectively closed despite diplomatic messaging",
      zh: "尽管外交口径缓和，海峡事实上仍接近关闭",
    },
    dek: {
      en: "Transit restrictions, toll rhetoric, and waiting tankers kept the market on edge.",
      zh: "通行限制、收费表态和排队油轮，让市场继续处在高压状态。",
    },
    summary: {
      en: "Axios reported on April 9 that the Strait of Hormuz remained all but closed, with hundreds of tankers waiting, toll rhetoric from Tehran, and roughly 20,000 mariners still stranded in the Gulf according to IMO-linked reporting.",
      zh: "Axios 在 4 月 9 日报道称，霍尔木兹海峡依然接近关闭状态：数百艘油轮等待穿越，德黑兰释放收费信号，而根据 IMO 相关信息，大约 2 万名海员仍被困在海湾地区。",
    },
    impact: {
      en: "This was the clearest sign that post-ceasefire friction can still block normal commerce.",
      zh: "这说明即使进入停火阶段，摩擦也足以继续阻断正常商业通行。",
    },
    timelineLabel: {
      en: "Traffic paralysis persists after ceasefire headlines",
      zh: "停火之后，交通瘫痪并未立刻解除",
    },
    keyPoints: {
      en: [
        "Access was still conditioned by political permission rather than open navigation norms.",
        "Tanker backlogs became a real-time indicator of reopening credibility.",
        "Oil markets reacted not only to conflict, but to uncertainty about who governs passage.",
      ],
      zh: [
        "海峡通行仍取决于政治许可，而不是公开航行规则。",
        "油轮积压成为判断“是否真正重开”的实时指标。",
        "油市波动不只是因为冲突本身，更因为没人能确认谁在决定通行规则。",
      ],
    },
    whyItMatters: {
      en: [
        "It bridges geopolitical headlines with operational shipping reality.",
        "The mariner backlog makes the human cost visible, not just the oil-market cost.",
      ],
      zh: [
        "它把地缘政治标题，直接连接到真实的航运运转情况。",
        "被困海员的规模，也让这场危机不再只是“油价故事”，而是人的故事。",
      ],
    },
  },
  {
    slug: "imo-ceasefire-statement-apr-08-2026",
    publishedAt: "2026-04-08",
    category: "Diplomacy",
    sourceName: "IMO",
    sourceUrl: "https://www.imo.org/en/mediacentre/secretarygeneral/pages/statement-on-the-ceasefire.aspx",
    headline: {
      en: "IMO backs the ceasefire but says safe transit still needs a mechanism",
      zh: "IMO 欢迎停火，但强调仍需建立安全通行机制",
    },
    dek: {
      en: "The shipping regulator welcomed the pause in fighting without claiming the route was normalized.",
      zh: "国际海事组织欢迎停火，但并未宣称航道已经恢复正常。",
    },
    summary: {
      en: "In its April 8 statement, IMO said the immediate priority was to implement a mechanism that can ensure safe transit through the Strait of Hormuz and support evacuation and crew safety.",
      zh: "IMO 在 4 月 8 日声明中表示，当前首要任务是落实一套能够保障霍尔木兹海峡安全通行的机制，并支持船员疏散与航行安全。",
    },
    impact: {
      en: "The statement established that a ceasefire is only a precondition; operational guarantees still have to be built.",
      zh: "这份声明等于确认：停火只是前提条件，真正的安全保障还需要另行搭建。",
    },
    timelineLabel: {
      en: "Ceasefire opens a narrow implementation window",
      zh: "停火只打开了一个狭窄的执行窗口",
    },
    keyPoints: {
      en: [
        "IMO focused on transit safety and crew welfare rather than political victory claims.",
        "The statement implies the route remains fragile without coordinated enforcement.",
        "Safe transit depends on procedures, not symbolism.",
      ],
      zh: [
        "IMO 关注的是通行安全和船员福祉，而不是政治胜负。",
        "声明等于默认：没有协调执行机制，航线依然脆弱。",
        "安全通行最终依赖的是程序和执行，不是象征性姿态。",
      ],
    },
    whyItMatters: {
      en: [
        "It is one of the clearest official markers separating diplomacy from shipping normalization.",
        "It gives operators a practical lens: wait for rules, corridors, and guarantees.",
      ],
      zh: [
        "这是区分“外交缓和”与“航运恢复”的官方分界线之一。",
        "对运营方来说，它给出的信号很务实：要等规则、通道和保障，而不是等口号。",
      ],
    },
  },
  {
    slug: "imo-stranded-crews-apr-02-2026",
    publishedAt: "2026-04-02",
    category: "Safety",
    sourceName: "IMO",
    sourceUrl:
      "https://www.imo.org/en/MediaCentre/PressBriefings/pages/Fragmented-responses-are-no-longer-sufficient-IMO-SG-Strait-of-Hormuz.aspx",
    headline: {
      en: "IMO warns 20,000 seafarers remain trapped in the Gulf",
      zh: "IMO 警告：仍有 2 万名海员被困海湾",
    },
    dek: {
      en: "By early April, the shipping crisis was already a humanitarian crisis.",
      zh: "到了 4 月初，这场航运危机已经同时变成了人道危机。",
    },
    summary: {
      en: "On April 2, 2026, IMO said 21 attacks on commercial ships had been confirmed since February 28, with 10 seafarer fatalities and around 20,000 civilian seafarers still stranded aboard vessels in the Persian Gulf.",
      zh: "IMO 在 2026 年 4 月 2 日表示，自 2 月 28 日以来已确认发生 21 起针对商业船舶的袭击，造成 10 名海员死亡，约 2 万名民用海员仍被困在波斯湾船只上。",
    },
    impact: {
      en: "This is the strongest official reminder that Hormuz news is not only about oil but about civilian lives and exhaustion at sea.",
      zh: "这是最有力的官方提醒：霍尔木兹新闻不只是油价问题，更是海上平民生命与长期困顿的问题。",
    },
    timelineLabel: {
      en: "Humanitarian pressure overtakes pure market logic",
      zh: "人道压力已经压过单纯的市场逻辑",
    },
    keyPoints: {
      en: [
        "The confirmed attack count shows a sustained threat, not a one-off event.",
        "Crew fatigue, dwindling supplies, and psychological stress are part of the story.",
        "A maritime evacuation framework became a practical necessity, not diplomatic theater.",
      ],
      zh: [
        "连续袭击次数说明，这不是孤立事件，而是持续性威胁。",
        "船员疲劳、补给下降和心理压力，已经成为新闻核心的一部分。",
        "所谓“海上撤离框架”不再是外交表演，而是现实需求。",
      ],
    },
    whyItMatters: {
      en: [
        "It gives the clearest human baseline for following later military and diplomatic developments.",
        "Any reopening story should be judged against whether trapped crews can actually rotate out safely.",
      ],
      zh: [
        "它给后续所有军事和外交新闻，提供了一个最清晰的人道基线。",
        "之后任何“重开”消息，都应该看船员能否真正安全换班撤离。",
      ],
    },
  },
];

const localized = <T>(locale: string, value: LocalizedText<T>): T =>
  resolveHormuzLocale(locale) === "zh" ? value.zh : value.en;

export function resolveHormuzLocale(locale: string): HormuzNewsLocale {
  return locale.startsWith("zh") ? "zh" : "en";
}

export function getHormuzLocalePath(locale: string, pathname: string = "/"): string {
  const normalizedPath =
    pathname === "/" ? "" : pathname.startsWith("/") ? pathname : `/${pathname}`;

  return `/${locale}${normalizedPath}`;
}

export function getHormuzCanonicalUrl(
  siteUrl: string,
  locale: string,
  pathname: string = "/"
): string {
  const normalizedSiteUrl = siteUrl.replace(/\/+$/, "");
  return `${normalizedSiteUrl}${getHormuzLocalePath(locale, pathname)}`;
}

export function getHormuzAlternateLanguages(
  siteUrl: string,
  pathname: string = "/"
): Record<string, string> {
  return Object.fromEntries(
    HORMUZ_SUPPORTED_LOCALES.map((locale) => [
      locale,
      getHormuzCanonicalUrl(siteUrl, locale, pathname),
    ])
  );
}

export function getHormuzArticles(locale: string): HormuzArticle[] {
  return articles.map((article) => ({
    slug: article.slug,
    publishedAt: article.publishedAt,
    category: article.category,
    sourceName: article.sourceName,
    sourceUrl: article.sourceUrl,
    headline: localized(locale, article.headline),
    dek: localized(locale, article.dek),
    summary: localized(locale, article.summary),
    impact: localized(locale, article.impact),
    timelineLabel: localized(locale, article.timelineLabel),
    keyPoints: localized(locale, article.keyPoints),
    whyItMatters: localized(locale, article.whyItMatters),
  }));
}

export function getHormuzArticle(
  locale: string,
  slug: string
): HormuzArticle | undefined {
  return getHormuzArticles(locale).find((article) => article.slug === slug);
}

export function getHormuzSiteCopy(locale: string) {
  const isZh = resolveHormuzLocale(locale) === "zh";

  return {
    locale: isZh ? "zh" : "en",
    siteName: localized(locale, NEWSROOM_NAME),
    shortName: isZh ? "海峡观察" : "Hormuz Brief",
    brandLine: isZh
      ? "追踪海峡、航运、油市与地区安全"
      : "Tracking the strait, shipping, energy, and regional security",
    metadataTitle: isZh
      ? "霍尔木兹海峡观察 | 最新局势、航运风险与油市联动"
      : "Hormuz Brief | Strait of Hormuz News, Shipping Risk, and Energy Signals",
    metadataDescription: isZh
      ? "围绕霍尔木兹海峡的最新新闻站，聚合停火、封锁、航运、安全与油市影响，并用简洁框架解释为什么重要。"
      : "A focused Strait of Hormuz news site covering blockades, ceasefire shifts, tanker traffic, maritime safety, and why the chokepoint matters to global energy.",
    metadataKeywords: isZh
      ? "霍尔木兹海峡,霍尔木兹海峡最新消息,霍尔木兹海峡新闻,波斯湾航运,油轮通行,中东能源风险"
      : "Strait of Hormuz news, Hormuz shipping, tanker traffic, Gulf energy risk, maritime chokepoint, Middle East oil route",
    pageTitle: isZh ? "霍尔木兹海峡即时观察" : "Strait of Hormuz live desk",
    pageDescription: isZh
      ? "把停火、封锁、油轮、海员与油价放进同一个清晰框架。更新时间：2026 年 4 月 14 日。"
      : "One clear frame for ceasefire shifts, blockades, tankers, mariners, and oil risk. Snapshot updated April 14, 2026.",
    heroBadges: isZh
      ? ["最新快照", "航运风险", "能源链路"]
      : ["Latest snapshot", "Shipping risk", "Energy chain"],
    leadLabel: isZh ? "主线新闻" : "Lead story",
    snapshotLabel: isZh ? "实时局势" : "Live snapshot",
    latestLabel: isZh ? "最新动态" : "Latest coverage",
    archiveLabel: isZh ? "新闻归档" : "News archive",
    whyLabel: isZh ? "为什么重要" : "Why the strait matters",
    timelineLabel: isZh ? "时间线" : "Timeline",
    faqLabel: isZh ? "常见问题" : "FAQ",
    sourceLabel: isZh ? "原始来源" : "Primary source",
    readMore: isZh ? "查看简报" : "Read briefing",
    backHome: isZh ? "返回首页" : "Back to homepage",
    backArchive: isZh ? "返回归档" : "Back to archive",
    viewAll: isZh ? "查看全部新闻" : "View full archive",
    footerNote: isZh
      ? "本站为人工整理的新闻观察页，所有新闻卡片均链接至原始报道或官方声明。"
      : "This site is a curated briefing page. Every story card links back to the original reporting or official statement.",
    nav: [
      {
        label: isZh ? "最新" : "Latest",
        href: `${getHormuzLocalePath(locale)}#latest`,
      },
      {
        label: isZh ? "意义" : "Why it matters",
        href: `${getHormuzLocalePath(locale)}#why-it-matters`,
      },
      {
        label: isZh ? "时间线" : "Timeline",
        href: `${getHormuzLocalePath(locale)}#timeline`,
      },
      {
        label: isZh ? "归档" : "Archive",
        href: getHormuzLocalePath(locale, "/posts"),
      },
    ],
    metrics: [
      {
        value: "20.9M b/d",
        label: isZh ? "2023 年穿越海峡的日均石油流量" : "Average oil flow through Hormuz in 2023",
        source: "EIA",
      },
      {
        value: isZh ? "超过 1/4" : "25%+",
        label: isZh ? "全球海运石油贸易经由此处" : "Share of seaborne oil trade tied to the chokepoint",
        source: "EIA",
      },
      {
        value: "20,000",
        label: isZh ? "仍滞留海湾的海员规模" : "Civilian seafarers still stranded in the Gulf",
        source: "IMO",
      },
      {
        value: "21 / 10",
        label: isZh ? "确认袭击 / 海员死亡" : "Confirmed attacks / seafarer fatalities",
        source: "IMO",
      },
    ],
    watchlist: [
      {
        title: isZh ? "通行机制是否真正落地" : "Whether safe-passage rules actually materialize",
        body: isZh
          ? "看的是可重复执行的航线安排，而不是一次性军事展示。"
          : "What matters is repeatable transit guidance, not a one-off naval demonstration.",
      },
      {
        title: isZh ? "油轮流量有没有恢复到“正常量级”" : "Whether tanker volume returns to a normal range",
        body: isZh
          ? "少数船只通过不代表市场已经恢复信心。"
          : "A few crossings do not yet equal a normalized market.",
      },
      {
        title: isZh ? "海员换班和撤离能否推进" : "Whether stranded crews can rotate out safely",
        body: isZh
          ? "如果人员仍被困，危机就没有真正结束。"
          : "If crews remain trapped, the crisis is not truly over.",
      },
      {
        title: isZh ? "政治控制权是否继续凌驾航行自由" : "Whether political control still overrides open navigation",
        body: isZh
          ? "这是决定风险溢价能否回落的关键变量。"
          : "This is the variable that keeps risk premiums elevated.",
      },
    ],
    whyItMatters: [
      {
        title: isZh ? "能源咽喉" : "Energy chokepoint",
        body: isZh
          ? "EIA 估算 2023 年约 20.9 百万桶/日的石油流量经过这里，且约五分之一 LNG 贸易同样受影响。"
          : "EIA estimates 20.9 million barrels per day of oil moved through the strait in 2023, alongside roughly one-fifth of global LNG trade.",
      },
      {
        title: isZh ? "航运与保险定价器" : "Shipping and insurance price setter",
        body: isZh
          ? "只要海峡不能被视为“常规商业航道”，运费、保险与绕航预期都会同步抬升。"
          : "As long as the route is treated as politically controlled rather than commercially normal, freight, insurance, and rerouting costs stay elevated.",
      },
      {
        title: isZh ? "人道压力" : "Humanitarian pressure",
        body: isZh
          ? "IMO 强调，被困海员的疲劳、补给与心理压力，已经是危机的一部分。"
          : "IMO stresses that trapped crews, dwindling supplies, fatigue, and psychological strain are now part of the crisis itself.",
      },
    ],
    timeline: getHormuzArticles(locale).map((article) => ({
      date: article.publishedAt,
      title: article.timelineLabel,
      sourceName: article.sourceName,
      href: getHormuzLocalePath(locale, `/posts/${article.slug}`),
    })),
    faq: [
      {
        question: isZh ? "为什么不是所有停火消息都会让油价马上回落？" : "Why doesn't a ceasefire headline automatically calm oil prices?",
        answer: isZh
          ? "因为市场看的是通行机制、军方执行、保险条件和油轮流量，而不仅仅是外交措辞。"
          : "Because traders watch transit rules, military enforcement, insurance, and tanker flow data, not diplomacy headlines alone.",
      },
      {
        question: isZh ? "为什么 2 万名海员的数据重要？" : "Why does the 20,000-seafarer figure matter?",
        answer: isZh
          ? "它说明危机不是抽象的能源风险，而是持续压在真实船员与供应链上的人道和运营风险。"
          : "It turns the story from abstract oil risk into a live humanitarian and operational crisis affecting real crews.",
      },
      {
        question: isZh ? "看霍尔木兹海峡，最该盯什么指标？" : "What should readers track most closely right now?",
        answer: isZh
          ? "盯三件事：安全通行规则、实际油轮流量、以及被困海员能否安全换班。"
          : "Track three things: safe-passage rules, real tanker throughput, and whether stranded crews can rotate out safely.",
      },
    ],
    sourceStrip: isZh
      ? "基于 Axios、IMO、EIA 等公开报道与官方资料整理"
      : "Curated from Axios, IMO, EIA, and other public reporting",
  };
}

export function getHormuzSitemapEntries(siteUrl: string) {
  const now = new Date(HORMUZ_LAST_UPDATED);
  const entries: Array<{
    url: string;
    lastModified: Date;
    changeFrequency: "daily" | "weekly" | "monthly";
    priority: number;
  }> = [];

  for (const locale of HORMUZ_SUPPORTED_LOCALES) {
    entries.push({
      url: getHormuzCanonicalUrl(siteUrl, locale, "/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    });
    entries.push({
      url: getHormuzCanonicalUrl(siteUrl, locale, "/posts"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.92,
    });

    for (const article of articles) {
      entries.push({
        url: getHormuzCanonicalUrl(siteUrl, locale, `/posts/${article.slug}`),
        lastModified: new Date(article.publishedAt),
        changeFrequency: "weekly",
        priority: 0.84,
      });
    }
  }

  return entries;
}

export function getHormuzJsonLd(siteUrl: string, locale: string) {
  const site = getHormuzSiteCopy(locale);
  const latest = getHormuzArticles(locale).slice(0, 6);
  const homeUrl = getHormuzCanonicalUrl(siteUrl, locale, "/");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: site.siteName,
        url: homeUrl,
        description: site.metadataDescription,
      },
      {
        "@type": "NewsMediaOrganization",
        name: site.siteName,
        url: homeUrl,
      },
      {
        "@type": "ItemList",
        name: site.latestLabel,
        itemListElement: latest.map((article, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: getHormuzCanonicalUrl(siteUrl, locale, `/posts/${article.slug}`),
          name: article.headline,
        })),
      },
    ],
  };
}

export const HORMUZ_SOURCE_URLS = [
  "https://www.eia.gov/international/content/analysis/special_topics/World_Oil_Transit_Chokepoints/wotc.pdf",
  "https://www.imo.org/en/MediaCentre/PressBriefings/pages/Fragmented-responses-are-no-longer-sufficient-IMO-SG-Strait-of-Hormuz.aspx",
  "https://www.imo.org/en/MediaCentre/PressBriefings/Pages/IMO-calls-for-safe-passage-framework-in-Strait-of-Hormuz.aspx",
  "https://www.imo.org/en/mediacentre/secretarygeneral/pages/statement-on-the-ceasefire.aspx",
  "https://www.axios.com/2026/04/11/us-iran-navy-strait-of-hormuz",
  "https://www.axios.com/2026/04/12/trump-naval-blockade-iran-strait-hormuz-peace-talks",
  "https://www.axios.com/2026/04/13/the-logic-behind-the-us-blockade",
];

export function isHormuzSeoLocale(locale: string) {
  return (HORMUZ_SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

export function getHormuzAlternateLocaleList() {
  return locales.filter((locale) => isHormuzSeoLocale(locale));
}

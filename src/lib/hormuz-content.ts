import { toFileLocale } from "@/i18n/locale";

type LocalizedText = {
  en: string;
  zh: string;
};

type HormuzBriefingRecord = {
  slug: string;
  updatedAt: string;
  readingMinutes: number;
  title: LocalizedText;
  description: LocalizedText;
  kicker: LocalizedText;
  category: LocalizedText;
  bullets: LocalizedText[];
  markdown: LocalizedText;
  references: Array<{
    label: LocalizedText;
    url: string;
  }>;
};

export type HormuzBriefing = {
  slug: string;
  updatedAt: string;
  readingMinutes: number;
  title: string;
  description: string;
  kicker: string;
  category: string;
  bullets: string[];
  markdown: string;
  references: Array<{
    label: string;
    url: string;
  }>;
};

const HORMUZ_BRIEFINGS: HormuzBriefingRecord[] = [
  {
    slug: "where-is-the-strait-of-hormuz",
    updatedAt: "2026-04-14T00:00:00.000Z",
    readingMinutes: 6,
    title: {
      en: "Where Is the Strait of Hormuz and Why Does Geography Matter So Much?",
      zh: "霍尔木兹海峡在哪里，为什么它的地理位置如此关键？",
    },
    description: {
      en: "A compact explainer on the narrow waterway linking the Persian Gulf to the Gulf of Oman, and why a tiny passage can rattle the whole energy market.",
      zh: "用一篇短文讲清楚这条连接波斯湾与阿曼湾的狭窄水道，以及为什么一个小小海峡足以牵动全球能源市场。",
    },
    kicker: {
      en: "Map Room",
      zh: "地理底图",
    },
    category: {
      en: "Geography",
      zh: "地理",
    },
    bullets: [
      {
        en: "The strait is the only sea exit for most Gulf oil exporters.",
        zh: "这条海峡是多数海湾产油国通向外海的唯一海上出口。",
      },
      {
        en: "Inbound and outbound shipping lanes are narrow and highly choreographed.",
        zh: "进出海峡的航道非常狭窄，航行秩序高度依赖规则与协同。",
      },
      {
        en: "Even a temporary disruption forces rerouting, insurance repricing, and tanker hesitation.",
        zh: "即便只是短时扰动，也会迅速推高保险、改变航线并让油轮观望。",
      },
    ],
    markdown: {
      en: `
The **Strait of Hormuz** is the slim maritime corridor between Iran to the north and Oman to the south. It links the **Persian Gulf** with the **Gulf of Oman** and then the **Arabian Sea**.

That sounds simple, but the consequence is enormous: if you want to move crude oil, refined products, or LNG from much of the Gulf to open ocean shipping routes, you almost always pass through this chokepoint.

## Why traders obsess over the map

This is not just a narrow body of water. It is a place where:

- energy flows concentrate into a tiny passage
- civilian tankers share space with naval patrols
- sanctions, diplomacy, and military signaling all collide

Britannica notes that the passage is only **35 to 60 miles wide**, while the actual inbound and outbound shipping lanes are much tighter. That means headlines about threats, inspections, drone incidents, or naval escorts can matter immediately, even before any full closure occurs.

## What the market reads from geography

Markets do not wait for a formal blockade. They react to smaller signals:

1. tanker owners delaying transit
2. insurers raising war-risk premiums
3. buyers demanding wider safety margins
4. officials warning of “monitoring” or “response” operations

That is why the Strait of Hormuz behaves like a compression chamber. It takes regional tension and converts it into globally visible price action.
      `,
      zh: `
**霍尔木兹海峡** 位于伊朗以南、阿曼以北，是连接 **波斯湾** 与 **阿曼湾**、进一步通向 **阿拉伯海** 的狭窄水道。

这一定义看起来很普通，但它的现实意义极大：海湾多数原油、成品油与 LNG 若要进入全球海运主干线，几乎都必须经过这里。

## 为什么市场总是盯着这张地图

它不是一条普通海峡，而是一个高度压缩的地缘节点：

- 能源流量被挤压到极窄通道中
- 民用油轮与海军巡逻长期共处
- 制裁、外交与军事信号在这里重叠

Britannica 提到，这条海峡整体宽度大约只有 **35 到 60 英里**，而真正用于进出航行的通道更窄。这意味着市场并不需要等到“正式封锁”才会反应，任何威胁、检查、无人机事件或护航升级，都可能立即改变预期。

## 地理如何变成价格

市场最先读取的不是声明，而是摩擦信号：

1. 油轮是否延迟过境
2. 战争风险保险是否上调
3. 买家是否要求更高安全折价
4. 官方是否释放“监控”或“应对行动”的措辞

所以，霍尔木兹海峡像一个地缘压力舱。中东局势的微小变化，会被它迅速放大成全球油价与航运情绪的波动。
      `,
    },
    references: [
      {
        label: {
          en: "Britannica: Strait of Hormuz facts",
          zh: "Britannica：霍尔木兹海峡事实页",
        },
        url: "https://www.britannica.com/place/Strait-of-Hormuz",
      },
    ],
  },
  {
    slug: "why-hormuz-moves-oil-and-lng-markets",
    updatedAt: "2026-04-14T00:00:00.000Z",
    readingMinutes: 7,
    title: {
      en: "Why the Strait of Hormuz Moves Oil and LNG Markets",
      zh: "为什么霍尔木兹海峡会牵动原油与 LNG 市场？",
    },
    description: {
      en: "The transmission mechanism from tanker traffic to Brent, freight, insurance, and refinery sentiment.",
      zh: "从油轮流量到布伦特油价、运费、保险与炼厂情绪，这条链条是如何传导的。",
    },
    kicker: {
      en: "Energy Desk",
      zh: "能源观察",
    },
    category: {
      en: "Energy",
      zh: "能源",
    },
    bullets: [
      {
        en: "More than 20% of global oil and LNG exports move through the strait.",
        zh: "全球超过 20% 的石油与 LNG 出口要经过这条海峡。",
      },
      {
        en: "Risk premiums often move before physical supply is fully interrupted.",
        zh: "在实物流真正中断之前，风险溢价通常已经开始上升。",
      },
      {
        en: "Freight and insurance can tighten faster than benchmark crude reacts.",
        zh: "运费与保险成本有时比基准油价反应更快。",
      },
    ],
    markdown: {
      en: `
For energy markets, the Strait of Hormuz is not just a map feature. It is a **pricing node**.

Britannica summarizes the basic fact plainly: **more than 20 percent of global oil and LNG exports** pass through the strait. That makes it one of the world’s highest-consequence maritime chokepoints.

## What actually moves first

When tension rises, markets usually react in layers:

1. **Shipping sentiment** changes first. Owners slow decisions, charterers ask for more detail, and voyage assumptions become conservative.
2. **Insurance premiums** jump next. War-risk coverage can widen even if ships are still moving.
3. **Freight rates and delivery assumptions** begin to wobble.
4. **Oil benchmarks** price in risk, not just lost barrels.

This matters because energy markets price **probability**, not only confirmed disruption.

## Why LNG watches Hormuz too

The global gas market is also exposed. LNG cargoes out of Qatar and the broader Gulf region depend on stable transit. If confidence drops, buyers in Asia and Europe immediately think about replacement cargoes, optionality, and terminal planning.

## The key takeaway

The market question is rarely “Is the strait closed right now?”

The real question is: **How expensive does it become to believe transit remains safe?**

That is why even diplomatic language, convoy announcements, or naval posture changes can move the tape. Hormuz is where physical trade and geopolitical narrative price each other in real time.
      `,
      zh: `
对能源市场来说，霍尔木兹海峡不是一个地理注释，而是一个真正的 **定价节点**。

Britannica 的概括非常直接：**全球超过 20% 的石油与 LNG 出口** 要经过这条海峡。这让它成为全球后果最严重的海上咽喉点之一。

## 市场最先动的是什么

当地缘风险升高时，市场通常按层传导：

1. **航运情绪** 最先变化。船东开始拖延决策，租船方要求更多安全信息。
2. **保险溢价** 紧接着上升。即使船还在走，战争险也可能先抬价。
3. **运费与交付假设** 开始摇摆。
4. **油价基准** 最终为风险而非实际减产定价。

这意味着，能源市场交易的是 **概率**，不是等到供给中断再反应。

## 为什么 LNG 也高度敏感

天然气市场同样暴露在这条海峡之下。来自卡塔尔与更广泛海湾地区的 LNG 货船依赖稳定通行。一旦安全感下降，亚洲与欧洲买家会立即重新计算替代货源、接收站安排与采购节奏。

## 核心结论

市场真正关心的，往往不是“海峡此刻是否已经关闭”，而是：

**继续相信它能安全通行，到底会变得多贵？**

因此，外交措辞、护航通告、海军部署乃至检查动作，都会迅速传导到价格。霍尔木兹海峡就是这样一个让实物流与地缘叙事实时互相定价的地方。
      `,
    },
    references: [
      {
        label: {
          en: "Britannica: Hormuz and global oil exports",
          zh: "Britannica：霍尔木兹与全球油气出口",
        },
        url: "https://www.britannica.com/place/Strait-of-Hormuz",
      },
    ],
  },
  {
    slug: "shipping-risk-signals-to-watch",
    updatedAt: "2026-04-14T00:00:00.000Z",
    readingMinutes: 6,
    title: {
      en: "Shipping Risk Signals to Watch Around Hormuz",
      zh: "围绕霍尔木兹海峡，哪些航运风险信号最值得盯？",
    },
    description: {
      en: "A working checklist for shipowners, traders, analysts, and anyone tracking how maritime stress shows up before a full-scale disruption.",
      zh: "给船东、交易员与分析师的一份实用清单：在全面中断前，海上压力通常会如何先暴露出来。",
    },
    kicker: {
      en: "Shipping",
      zh: "航运",
    },
    category: {
      en: "Maritime Risk",
      zh: "航运风险",
    },
    bullets: [
      {
        en: "Watch for convoy talk, rerouting, and unusual pauses near the Gulf of Oman.",
        zh: "优先盯住护航、绕航和阿曼湾附近的异常停顿。",
      },
      {
        en: "Insurance and charter language often changes before traffic data does.",
        zh: "保险与租船措辞的变化，往往早于流量数据本身。",
      },
      {
        en: "A scare can tighten cost and timing even if barrels still move.",
        zh: "即便油轮仍在通行，恐慌也会先推高成本并扰乱时效。",
      },
    ],
    markdown: {
      en: `
Shipping stress rarely announces itself with one dramatic switch. It usually appears as a sequence of smaller frictions.

## The first layer: language

Pay attention to official wording:

- “monitoring”
- “escort”
- “protection mission”
- “heightened vigilance”
- “temporary routing advice”

These phrases often mean operators are trying to preserve flow while acknowledging a worsening security backdrop.

## The second layer: behavior

Watch for:

- ships slowing before the chokepoint
- clustering outside the Gulf
- repeated delays in departure timing
- sudden interest in alternative export routes

None of these alone proves a closure threat. Together, they show that commercial actors are attaching a cost to uncertainty.

## The third layer: money

Markets often notice stress through:

- higher war-risk insurance
- firmer freight quotations
- wider crude differentials
- talk of “optional” or “flexible” scheduling

This is why Hormuz monitoring is not only about headlines. It is about reading changes in shipping behavior before they become visible in supply statistics.
      `,
      zh: `
航运压力通常不会以“一键切换”的方式出现，而更像一串逐渐叠加的小摩擦。

## 第一层：措辞变化

要特别留意官方和行业常用词是否开始变化：

- “监控中”
- “护航”
- “保护行动”
- “提高警戒”
- “临时绕航建议”

这些词往往意味着，参与者仍想维持流动，但已经承认安全环境在恶化。

## 第二层：行为变化

重点看这些现象：

- 船只在咽喉口外降速
- 海湾外缘出现聚集等待
- 出发时间多次延后
- 市场突然讨论替代出口路线

单个现象不一定代表即将封锁，但如果它们叠加出现，说明商业主体已经在为“不确定性”定价。

## 第三层：资金变化

真正的压力常常先体现在：

- 战争险上涨
- 运费报价走强
- 原油价差扩大
- 合同开始强调“可选”“弹性排期”

因此，监测霍尔木兹海峡并不只是看新闻标题，更是在观察航运行为如何先于供给统计发生变化。
      `,
    },
    references: [
      {
        label: {
          en: "Britannica: Shipping lanes and legal status",
          zh: "Britannica：航道与国际法地位",
        },
        url: "https://www.britannica.com/place/Strait-of-Hormuz",
      },
    ],
  },
  {
    slug: "what-a-closure-scare-means-for-traders",
    updatedAt: "2026-04-14T00:00:00.000Z",
    readingMinutes: 5,
    title: {
      en: "What a Hormuz Closure Scare Actually Means for Traders",
      zh: "一次“霍尔木兹可能关闭”的恐慌，对交易员到底意味着什么？",
    },
    description: {
      en: "Closure scares are usually about repricing risk, not instant zero-flow outcomes. Here is how to read the difference.",
      zh: "所谓“海峡可能关闭”的恐慌，更多是风险重估，而不是立刻归零的通行结果。要读懂两者差别。",
    },
    kicker: {
      en: "Market Structure",
      zh: "市场结构",
    },
    category: {
      en: "Risk Pricing",
      zh: "风险定价",
    },
    bullets: [
      {
        en: "Headline risk can outrun physical disruption by days or weeks.",
        zh: "新闻层面的恐慌，可能提前数天甚至数周跑在实物中断之前。",
      },
      {
        en: "Price action often reflects insurance, timing, and confidence shocks.",
        zh: "价格波动往往反映的是保险、时效与信心冲击。",
      },
      {
        en: "Exact dates matter: June 22, 2025 was one such moment of market fear.",
        zh: "具体日期很重要：2025 年 6 月 22 日就是一次典型的市场恐慌节点。",
      },
    ],
    markdown: {
      en: `
When people say “Hormuz might close,” the market almost never interprets that as a clean binary event.

Instead, traders ask three narrower questions:

1. Will vessels hesitate?
2. Will costs jump?
3. Will policy language force faster repricing than fundamentals justify?

## Why dates matter

Britannica notes that after **U.S. strikes on Iran’s nuclear facilities on June 22, 2025**, Iran’s parliament authorized a closure move that still required approval from the country’s Supreme National Security Council. Even without an executed closure, the fear itself mattered.

That is the point. The market often trades the **credible possibility** of disruption before it trades confirmed interruption.

## What to monitor in a scare

- freight and insurance
- tanker waiting patterns
- official escalation language
- refinery procurement urgency
- emergency statements from consuming countries

The smartest read is not “closed / open.” It is: **how far did the risk premium travel, and which part of the supply chain absorbed it first?**
      `,
      zh: `
当市场说“霍尔木兹可能关闭”时，它几乎不会把这件事理解成一个简单的二元开关。

交易员真正会问的是三个更细的问题：

1. 船会不会开始犹豫？
2. 成本会不会先跳？
3. 政策措辞会不会逼着市场比基本面更快重定价？

## 为什么具体日期要说清楚

Britannica 提到，在 **2025 年 6 月 22 日美国打击伊朗核设施** 之后，伊朗议会曾授权关闭霍尔木兹海峡的动作，但该动作仍需更高层安全机构批准。即便最终没有真正实施，“可能关闭”本身也足以制造市场压力。

这正是关键：市场交易的常常不是已经发生的中断，而是 **足够可信的中断可能性**。

## 遇到这种恐慌，应该看什么

- 运费与保险
- 油轮等待模式
- 官方升级措辞
- 炼厂补货紧迫度
- 消费国是否开始释放应急表态

真正高水平的判断，不是只问“关没关”，而是问：

**风险溢价已经传到了哪一段链条，谁最先为它买单？**
      `,
    },
    references: [
      {
        label: {
          en: "Britannica: June 22, 2025 closure scare context",
          zh: "Britannica：2025 年 6 月 22 日封锁恐慌背景",
        },
        url: "https://www.britannica.com/place/Strait-of-Hormuz",
      },
    ],
  },
];

const localized = (locale: string, value: LocalizedText) =>
  toFileLocale(locale) === "zh-cn" ? value.zh : value.en;

export const getHormuzSiteOrigin = () => "https://huo-er-mu-ci-hai-xia.homes";

export const getHormuzSiteCopy = (locale: string) => {
  const isZh = toFileLocale(locale) === "zh-cn";

  return {
    localeLabel: isZh ? "简体中文" : "English",
    brand: isZh ? "霍尔木兹海峡" : "Hormuz Strait News",
    brandLong: isZh
      ? "霍尔木兹海峡实时新闻与风险观察"
      : "Real-time headlines and risk intelligence around the Strait of Hormuz",
    metadataTitle: isZh
      ? "霍尔木兹海峡实时新闻与风险观察"
      : "Hormuz Strait News, Shipping Risk and Energy Market Watch",
    metadataDescription: isZh
      ? "追踪霍尔木兹海峡的最新新闻、航运风险、油气市场影响与深度解读。"
      : "Track the latest Strait of Hormuz headlines, shipping risk, energy market impact, and deeper briefings in one place.",
    metadataKeywords: isZh
      ? "霍尔木兹海峡, 霍尔木兹海峡新闻, 伊朗海峡, 原油运输, 油轮风险, 海湾能源"
      : "Strait of Hormuz news, Hormuz Strait latest headlines, Gulf shipping risk, oil market chokepoint, Iran tanker news",
    liveBadge: isZh ? "实时监测" : "Live watch",
    heroEyebrow: isZh ? "全球能源咽喉" : "The world's tightest energy chokepoint",
    heroTitle: isZh
      ? "把霍尔木兹海峡的新闻、航运风险与能源冲击放到同一张桌面上。"
      : "Put Hormuz headlines, shipping risk, and energy-market spillovers on one screen.",
    heroDescription: isZh
      ? "这不是泛中东新闻聚合，而是围绕霍尔木兹海峡的专门观察站：你会看到过境风险、外交升级、油轮信号与能源市场反馈如何互相牵动。"
      : "This is not a generic Middle East roundup. It is a focused watchtower for the Strait of Hormuz, where transit risk, diplomacy, tanker signals, and energy-market reactions are read together.",
    latestButton: isZh ? "查看最新头条" : "See latest headlines",
    briefingsButton: isZh ? "阅读深度文章" : "Read briefings",
    statCards: [
      {
        title: isZh ? "观察窗口" : "Coverage window",
        value: isZh ? "过去 72 小时" : "Last 72 hours",
        description: isZh
          ? "优先聚合与海峡直接相关或高度相关的信号。"
          : "Prioritizes direct and high-context signals tied to the strait.",
      },
      {
        title: isZh ? "核心维度" : "Core lenses",
        value: isZh ? "航运 / 能源 / 外交" : "Shipping / Energy / Diplomacy",
        description: isZh
          ? "用一个结构看同一事件的多重传导。"
          : "Reads one event through multiple transmission channels.",
      },
      {
        title: isZh ? "阅读方式" : "Reading mode",
        value: isZh ? "快讯 + 解释" : "Headlines + explainers",
        description: isZh
          ? "既看快讯，也看为什么它重要。"
          : "Not just what happened, but why it matters.",
      },
    ],
    signalTitle: isZh ? "四个最该盯住的信号" : "Four signals worth watching first",
    signalCards: [
      {
        title: isZh ? "航运摩擦" : "Shipping friction",
        description: isZh
          ? "绕航、等待、护航与保险上调往往先出现。"
          : "Rerouting, waiting patterns, escorts, and insurance moves often surface first.",
      },
      {
        title: isZh ? "能源定价" : "Energy pricing",
        description: isZh
          ? "油价不只交易失去的桶数，也交易中断概率。"
          : "Oil prices do not wait for lost barrels; they trade disruption probability.",
      },
      {
        title: isZh ? "外交升级" : "Diplomatic escalation",
        description: isZh
          ? "措辞升级、制裁与报复预期会先改变风险偏好。"
          : "Language shifts, sanctions, and retaliation expectations alter risk appetite early.",
      },
      {
        title: isZh ? "海军姿态" : "Naval posture",
        description: isZh
          ? "任何增援、护航、联合声明都可能放大市场解读。"
          : "Reinforcement, escorts, and coalition statements can rapidly reshape expectations.",
      },
    ],
    latestTitle: isZh ? "最新头条" : "Latest headlines",
    latestDescription: isZh
      ? "聚合公开新闻源里与霍尔木兹海峡最直接相关的报道，并用风险标签重新排序。"
      : "Aggregates public reporting most directly connected to the Strait of Hormuz and reorders it through a risk lens.",
    contextTitle: isZh ? "为什么这条海峡总会放大局势" : "Why this strait amplifies every crisis",
    contextCards: [
      {
        title: isZh ? "它太窄" : "It is narrow",
        description: isZh
          ? "海量能源流量被压进极小通道，任何摩擦都会立刻可见。"
          : "Huge energy flows are compressed into a tiny corridor, so friction becomes visible fast.",
      },
      {
        title: isZh ? "它太关键" : "It is essential",
        description: isZh
          ? "对多数海湾出口国来说，它不是可选路线，而是必经路线。"
          : "For many Gulf exporters, it is not optional routing. It is the route.",
      },
      {
        title: isZh ? "它太敏感" : "It is sensitive",
        description: isZh
          ? "政治措辞、无人机事件与护航安排都能被市场迅速放大。"
          : "Political language, drone incidents, and escort moves are instantly magnified by markets.",
      },
    ],
    briefingsTitle: isZh ? "站内深度文章" : "In-house briefings",
    briefingsDescription: isZh
      ? "用更慢的阅读速度，把地图、航运与能源市场之间的关系讲清楚。"
      : "A slower reading layer that explains how geography, shipping, and energy markets lock together.",
    faqTitle: isZh ? "常见问题" : "Common questions",
    faqItems: [
      {
        question: isZh ? "这是不是在预测封锁？" : "Is this site predicting a closure?",
        answer: isZh
          ? "不是。这里更强调风险信号与市场传导，而不是简单预测“会不会封锁”。"
          : "No. The goal is to track risk signals and market transmission, not make simplistic closure calls.",
      },
      {
        question: isZh ? "为什么会同时看油价和航运？" : "Why track both oil and shipping?",
        answer: isZh
          ? "因为霍尔木兹海峡的风险往往先体现在航运与保险，再传导到能源定价。"
          : "Because Hormuz stress often appears first in shipping and insurance before it fully lands in energy pricing.",
      },
      {
        question: isZh ? "这些深度文章多久更新？" : "How often are the briefings updated?",
        answer: isZh
          ? "它们不会像快讯一样频繁滚动，而是随着区域局势与市场结构变化定期修订。"
          : "They are not rolling headlines. They are revised when regional dynamics or market structure materially change.",
      },
    ],
    footerTitle: isZh ? "霍尔木兹海峡观察站" : "Hormuz Strait Watch",
    footerDescription: isZh
      ? "围绕海峡、航运与能源市场的垂直情报站。"
      : "A focused editorial desk on the strait, shipping stress, and energy-market spillovers.",
    footerNote: isZh
      ? "公开新闻流会有噪音，因此本站把“霍尔木兹海峡直接相关性”放在排序第一位。"
      : "Open-source news is noisy, so this desk ranks direct Hormuz relevance ahead of generic regional volume.",
    navLatest: isZh ? "最新动态" : "Latest",
    navSignals: isZh ? "监测重点" : "Signals",
    navBriefings: isZh ? "深度文章" : "Briefings",
    navAbout: isZh ? "关于" : "About",
    newsroomTitle: isZh ? "滚动快讯与深度背景" : "Rolling updates and deeper context",
    newsroomDescription: isZh
      ? "先看新闻，再顺着同一条事件链看航运、油价与地缘风险。"
      : "Read the headline first, then trace the same event through shipping, oil, and geopolitical risk.",
    readMore: isZh ? "继续阅读" : "Read more",
    externalSourceLabel: isZh ? "外部来源" : "External source",
    updatedLabel: isZh ? "更新于" : "Updated",
    monitoringLabel: isZh ? "监测中" : "Monitoring",
  };
};

export const getHormuzClientMessages = (locale: string) => {
  const isZh = toFileLocale(locale) === "zh-cn";

  return {
    user: {
      sign_in: isZh ? "登录" : "Sign in",
      sign_out: isZh ? "退出" : "Sign out",
      credits: isZh ? "积分" : "Credits",
      api_keys: isZh ? "API 密钥" : "API Keys",
      my_orders: isZh ? "我的账户" : "My Account",
      my_invites: isZh ? "我的邀请" : "My Invites",
      user_center: isZh ? "账户中心" : "Account Center",
      support: isZh ? "支持" : "Support",
      admin_system: isZh ? "管理系统" : "Admin System",
      home: isZh ? "首页" : "Home",
      pricing: isZh ? "首页" : "Home",
      admin_center: isZh ? "管理中心" : "Admin Center",
    },
    sign_modal: {
      sign_in_title: isZh
        ? "登录霍尔木兹海峡观察站"
        : "Sign in to Hormuz Strait News",
      sign_in_description: isZh
        ? "登录后可使用账户相关功能。"
        : "Sign in to access account features.",
      sign_up_title: isZh
        ? "加入霍尔木兹海峡观察站"
        : "Join Hormuz Strait News",
      sign_up_description: isZh ? "创建你的账户" : "Create your account",
      email_title: isZh ? "邮箱" : "Email",
      email_placeholder: isZh ? "输入邮箱地址" : "Enter your email address",
      password_title: isZh ? "密码" : "Password",
      password_placeholder: isZh ? "输入密码" : "Enter your password",
      forgot_password: isZh ? "忘记密码？" : "Forgot password?",
      or: isZh ? "或" : "Or",
      continue: isZh ? "继续访问站点" : "Continue",
      no_account: isZh ? "第一次来这里？" : "New here?",
      email_sign_in: isZh ? "使用邮箱登录" : "Sign in with Email",
      google_sign_in: isZh ? "使用 Google 继续" : "Continue with Google",
      github_sign_in: isZh ? "使用 GitHub 继续" : "Continue with GitHub",
      close_title: isZh ? "关闭" : "Close",
      cancel_title: isZh ? "取消" : "Cancel",
    },
    feedback: {
      title: isZh ? "反馈" : "Feedback",
      description: isZh
        ? "告诉我们哪些内容有帮助，或哪里还需要改进。"
        : "Tell us what was useful and what should improve next.",
      submit: isZh ? "提交" : "Submit",
      loading: isZh ? "提交中..." : "Submitting...",
      contact_tip: isZh ? "其他联系方式" : "Other ways to contact us",
      rating_tip: isZh
        ? "你觉得这个站点目前有多有用？"
        : "How useful is this site so far?",
      placeholder: isZh ? "在这里写下你的反馈..." : "Leave your feedback here...",
    },
    my_invites: {
      title: isZh ? "我的邀请" : "My Invites",
      description: isZh ? "查看你的邀请记录" : "View your invite records",
      no_invites: isZh ? "暂无邀请记录" : "No invite records found",
      my_invite_link: isZh ? "我的邀请链接" : "My Invite Link",
      edit_invite_link: isZh ? "编辑邀请链接" : "Edit Invite Link",
      copy_invite_link: isZh ? "复制邀请链接" : "Copy Invite Link",
      invite_code: isZh ? "邀请码" : "Invite Code",
      invite_tip: isZh
        ? "邀请同事一起关注霍尔木兹海峡动态。"
        : "Invite colleagues to follow the Hormuz watch desk.",
      invite_balance: isZh ? "邀请奖励余额" : "Invite Reward Balance",
      total_invite_count: isZh ? "邀请总数" : "Total Invite Count",
      total_paid_count: isZh ? "付费总数" : "Total Paid Count",
      total_award_amount: isZh ? "总奖励金额" : "Total Award Amount",
      update_invite_code: isZh ? "设置邀请码" : "Set Invite Code",
      update_invite_code_tip: isZh
        ? "输入你的自定义邀请码"
        : "Enter your custom invite code",
      update_invite_button: isZh ? "保存" : "Save",
      no_orders: isZh
        ? "启用邀请前需要先拥有有效账户。"
        : "You need an active account before inviting others.",
      no_affiliates: isZh
        ? "当前账户还没有邀请权限。"
        : "This account is not allowed to invite others yet.",
      table: {
        invite_time: isZh ? "邀请时间" : "Invite Time",
        invite_user: isZh ? "邀请用户" : "Invite User",
        status: isZh ? "状态" : "Status",
        reward_percent: isZh ? "奖励比例" : "Reward Percent",
        reward_amount: isZh ? "奖励金额" : "Reward Amount",
        pending: isZh ? "待定" : "Pending",
        completed: isZh ? "已完成" : "Completed",
      },
    },
  };
};

export const getAllHormuzBriefingSlugs = () =>
  HORMUZ_BRIEFINGS.map((briefing) => briefing.slug);

export const getHormuzBriefings = (locale: string): HormuzBriefing[] =>
  HORMUZ_BRIEFINGS.map((briefing) => ({
    slug: briefing.slug,
    updatedAt: briefing.updatedAt,
    readingMinutes: briefing.readingMinutes,
    title: localized(locale, briefing.title),
    description: localized(locale, briefing.description),
    kicker: localized(locale, briefing.kicker),
    category: localized(locale, briefing.category),
    bullets: briefing.bullets.map((bullet) => localized(locale, bullet)),
    markdown: localized(locale, briefing.markdown),
    references: briefing.references.map((reference) => ({
      label: localized(locale, reference.label),
      url: reference.url,
    })),
  }));

export const getHormuzBriefingBySlug = (
  locale: string,
  slug: string
): HormuzBriefing | null =>
  getHormuzBriefings(locale).find((briefing) => briefing.slug === slug) ?? null;

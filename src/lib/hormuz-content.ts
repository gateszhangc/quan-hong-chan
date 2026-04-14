import { toFileLocale } from "../i18n/locale";

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

const ATHLETE_BRIEFINGS: HormuzBriefingRecord[] = [
  {
    slug: "who-is-quan-hongchan",
    updatedAt: "2026-04-14T00:00:00.000Z",
    readingMinutes: 5,
    title: {
      en: "Who Is Quan Hongchan and Why Does She Keep Pulling So Much Attention?",
      zh: "全红婵是谁，为什么她总能持续占据公众视线？",
    },
    description: {
      en: "A short profile on why Quan Hongchan sits at the intersection of elite results, rare technique, and mass public attention.",
      zh: "从顶级成绩、罕见技术表现到大众传播势能，这篇短文梳理全红婵为何始终处在跳水话题中心。",
    },
    kicker: {
      en: "Profile",
      zh: "人物速写",
    },
    category: {
      en: "Athlete Watch",
      zh: "人物观察",
    },
    bullets: [
      {
        en: "She is followed not only for medals, but for how instantly her performance reads on screen.",
        zh: "大家关注她，不只是因为成绩，也因为她的动作在镜头里具有极强的即时辨识度。",
      },
      {
        en: "Official reports repeatedly frame her results as part of China diving's headline story.",
        zh: "官方赛事报道经常把她的表现放在中国跳水整体叙事的中心位置。",
      },
      {
        en: "Her news value usually mixes competitive outcome, technical discussion, and personal growth.",
        zh: "她的新闻价值通常同时包含比赛结果、技术讨论和成长叙事三条线。",
      },
    ],
    markdown: {
      en: `
Quan Hongchan is one of the rare athletes whose coverage travels far beyond specialist sport audiences. People follow her because the results are major, but also because the visual experience of watching her dive is unusually immediate: even casual viewers can tell when a performance feels clean, fast, and controlled.

## Why the attention compounds

The attention around her usually stacks from three layers:

1. major-meet performance
2. technique that creates instant replay value
3. a public narrative about growth, pressure, and composure

That combination is why her name often moves from sports pages into broader general-news circulation.

## The dates worth remembering

On **August 5, 2021**, World Aquatics published a feature describing her as a 14-year-old Olympic champion whose rise had already become a national story. On **August 6, 2024**, World Aquatics covered the Paris Olympic women's 10m platform final and again placed Quan Hongchan and Chen Yuxi at the center of the biggest diving headline of the day.

Those dates matter because they show the pattern clearly: Quan Hongchan is covered not as a one-off sensation, but as a repeat headline figure whenever the sport reaches its highest-stakes stage.

## A better way to read the coverage

When her name trends, the useful question is not only "What medal did she win?"

The better question is: **Which of the three layers is driving this cycle of attention: result, technique, or personal narrative?**
      `,
      zh: `
全红婵是少数能同时跨出专业体育圈与大众新闻圈的运动员。大家追她，不只是因为成绩重要，还因为她的动作观感极强，哪怕并不熟悉跳水规则的观众，也往往能立刻感受到她的节奏、控制和入水质量。

## 为什么她的关注度会不断叠加

围绕她的讨论，通常来自三层叠加：

1. 大赛成绩
2. 极具辨识度的技术表现
3. 关于成长、压力与稳定性的公众叙事

正因为这三层同时存在，她的名字经常会从体育版面扩散到更广泛的大众新闻流里。

## 两个值得记住的时间点

**2021 年 8 月 5 日**，World Aquatics 发布专题，描述她以 14 岁奥运冠军身份迅速成为全国关注的焦点。**2024 年 8 月 6 日**，World Aquatics 报道巴黎奥运会女子 10 米台决赛时，再次把全红婵与陈芋汐置于当天跳水报道的核心位置。

这两个时间点说明的不是一次偶然爆发，而是一种稳定模式：只要比赛进入高关注节点，全红婵就会重新成为新闻中心人物。

## 读她的新闻，不能只看奖牌

真正更有用的问题不是“她今天拿了什么牌”，而是：

**这轮关注，究竟是由结果、技术，还是人物叙事在推动？**
      `,
    },
    references: [
      {
        label: {
          en: "World Aquatics: 14-year-old Olympic champion Quan jumps out from hopscotch game",
          zh: "World Aquatics：14 岁奥运冠军全红婵的成名专题",
        },
        url: "https://www.worldaquatics.com/news/2221032/14-year-old-olympic-champion-quan-jumps-out-from-hopscotch-game",
      },
      {
        label: {
          en: "World Aquatics: Quan Hongchan and Chen Yuxi headline Paris 2024 platform final",
          zh: "World Aquatics：巴黎 2024 女子 10 米台决赛官方报道",
        },
        url: "https://www.worldaquatics.com/news/4072052/chen-yuxi-quan-hongchan-fourth-gold-diving-china-paris-2024-olympic-games",
      },
    ],
  },
  {
    slug: "why-her-entry-looks-so-clean",
    updatedAt: "2026-04-14T00:00:00.000Z",
    readingMinutes: 6,
    title: {
      en: "Why Does Quan Hongchan's Entry Look So Clean on Video?",
      zh: "为什么全红婵的入水总能给人“几乎没有水花”的感觉？",
    },
    description: {
      en: "A practical explanation of why her dives create such strong replay value even for people who do not follow diving closely.",
      zh: "这篇文章解释，全红婵的动作为什么会产生极强的回看价值，即使是不常看跳水的人也能马上记住。",
    },
    kicker: {
      en: "Technique",
      zh: "技术观察",
    },
    category: {
      en: "Dive Technique",
      zh: "动作细节",
    },
    bullets: [
      {
        en: "Her public visibility is tied to how easy it is for viewers to perceive control and tightness.",
        zh: "她的公共传播力，和观众很容易直观看到“紧”和“稳”有直接关系。",
      },
      {
        en: "The replay moment matters: slow-motion clips make the difference legible.",
        zh: "慢镜头非常关键，它把技术差异转成了所有人都能看懂的画面差异。",
      },
      {
        en: "Technical discussion is one of the main reasons her coverage stays active between events.",
        zh: "技术讨论是她在非比赛日依然保持热度的重要原因之一。",
      },
    ],
    markdown: {
      en: `
Quan Hongchan's most replayed moments are not random. They sit at the point where elite technique becomes visible to non-specialists.

## What ordinary viewers actually notice

Even without judging knowledge, people can usually spot three things:

- how little the body line wobbles
- how quickly the motion finishes
- how restrained the splash looks after entry

That is why her dives travel well on short clips and social platforms. The quality is not hidden inside a score sheet. It is visible in the image itself.

## Why this matters for news tracking

Coverage around Quan Hongchan is often stronger than the raw competition schedule alone would suggest. Technical clips, coach breakdowns, broadcast replays, and side-by-side comparisons keep the conversation alive between finals.

This means that when her name spikes, the trigger may not be a medal table update. It may be a clip, an explanation, or a renewed conversation about why her entries look different.

## The useful reading habit

When you see her trend, ask:

**Is this a result-driven news spike, or a technique-driven replay cycle?**

That distinction helps explain why some Quan Hongchan stories feel like competition news, while others behave more like culture news.
      `,
      zh: `
全红婵最容易被反复传播的时刻，并不是偶然。她的动作处在一个非常少见的位置上：专业技术已经高到极致，但这种差异又能被非专业观众直接看到。

## 普通观众真正会注意到什么

就算不懂评分规则，很多人也能马上看见三件事：

- 身体线条是否紧
- 动作结束得是否干净利落
- 入水之后水花是否被压得非常克制

这就是为什么她的动作特别适合被短视频、慢镜头和回放反复传播。它的质量并不只藏在分数里，而是直接写在画面里。

## 这对追新闻有什么意义

围绕全红婵的关注，常常比单纯的赛程节奏更长。技术拆解、教练点评、转播回放、对比剪辑，会让讨论在比赛之外继续发酵。

所以，当她的名字突然升温时，触发点不一定是奖牌榜更新，也可能是一个动作片段、一次专业解释，或者一轮关于“为什么她的入水看起来就是不一样”的重新讨论。

## 更有效的阅读习惯

当你看到她上热搜时，可以先问一句：

**这次是成绩型新闻，还是技术型传播？**

分清这一点，才能理解为什么有些全红婵报道更像赛场新闻，而有些更像大众文化事件。
      `,
    },
    references: [
      {
        label: {
          en: "World Aquatics athlete profile",
          zh: "World Aquatics：全红婵运动员资料页",
        },
        url: "https://www.worldaquatics.com/athletes/1528691/quan-hongchan",
      },
      {
        label: {
          en: "World Aquatics: Paris 2024 women's platform final coverage",
          zh: "World Aquatics：巴黎 2024 女子 10 米台决赛报道",
        },
        url: "https://www.worldaquatics.com/news/4072052/chen-yuxi-quan-hongchan-fourth-gold-diving-china-paris-2024-olympic-games",
      },
    ],
  },
  {
    slug: "how-to-read-quan-hongchan-news",
    updatedAt: "2026-04-14T00:00:00.000Z",
    readingMinutes: 6,
    title: {
      en: "How Should You Read the Daily Quan Hongchan News Cycle?",
      zh: "每天追全红婵新闻，真正值得看的信号有哪些？",
    },
    description: {
      en: "A simple framework for separating high-signal updates from generic traffic around Quan Hongchan.",
      zh: "用一个简单框架，把围绕全红婵的高信号更新和泛流量噪音区分开来。",
    },
    kicker: {
      en: "News Framework",
      zh: "新闻框架",
    },
    category: {
      en: "Signal Reading",
      zh: "信号判断",
    },
    bullets: [
      {
        en: "Start with competition schedules and official result pages before reading secondary commentary.",
        zh: "先看赛程和官方成绩页，再看二级评论和转述内容。",
      },
      {
        en: "Interviews and training notes often change the narrative even when no final is taking place.",
        zh: "采访和训练信息，即使不发生在决赛日，也会明显改变这一轮舆论叙事。",
      },
      {
        en: "One strong clip can drive coverage volume, but not every clip changes the competitive picture.",
        zh: "一个高传播片段可以带来大量报道，但不代表竞技状态本身已经发生根本变化。",
      },
    ],
    markdown: {
      en: `
The Quan Hongchan news cycle usually moves faster than the actual competition calendar. That is why a useful reading method matters.

## Read the day in this order

1. official schedule or result
2. coach, teammate, or athlete quote
3. technical clip or replay
4. broader public discussion

If you reverse that order, you end up mistaking noise for change.

## Why official dates matter

On **May 2, 2025**, World Aquatics reported from the Beijing Super Final and placed Quan Hongchan inside a broader story about China's continued strength in diving. On **July 31, 2025**, World Aquatics covered the women's 10m platform final at the Singapore world championships and made clear that the headline belonged elsewhere that day.

Those dates show why official event framing matters: it tells you whether Quan Hongchan is the center of the competitive story, adjacent to it, or absent from the final result altogether.

## The high-signal questions

Before you react to a wave of coverage, ask:

- Did an official result change?
- Did a credible interview change the storyline?
- Is this only a replay cycle with no new competition information?

Those three questions keep the daily news flow readable.
      `,
      zh: `
围绕全红婵的新闻流，往往比真正的比赛日历跑得更快。所以，要想看懂每天的信息，必须先有一个读法。

## 每天最好按这个顺序读

1. 官方赛程或成绩
2. 教练、队友、本人采访
3. 技术片段或转播回放
4. 更大范围的公共讨论

如果顺序反过来，就很容易把热度误读成变化。

## 为什么官方日期必须说清楚

**2025 年 5 月 2 日**，World Aquatics 报道北京 Super Final 时，把全红婵放进了中国跳水整体优势的主线里。**2025 年 7 月 31 日**，World Aquatics 在新加坡世锦赛女子 10 米台决赛报道里，则清楚显示当天的竞争焦点并不完全由她主导。

这两个日期说明，官方赛事报道最重要的价值，不是“热不热”，而是告诉你：全红婵此刻到底是这条竞争主线的中心人物、侧面人物，还是根本没有进入当天的最终结果核心。

## 更高信号的三个问题

当你准备对一轮报道做判断时，先问：

- 官方结果有没有变化？
- 可信采访有没有改变叙事方向？
- 这次是不是只有高传播片段，并没有新增比赛信息？

把这三个问题问清楚，每天追全红婵新闻就会稳定得多。
      `,
    },
    references: [
      {
        label: {
          en: "World Aquatics: Beijing Super Final day-one report",
          zh: "World Aquatics：北京 Super Final 首日报道",
        },
        url: "https://www.worldaquatics.com/news/4257839/diving-world-aquatics-world-cup-2025-beijing-china-five-golds-day-1-super-final",
      },
      {
        label: {
          en: "World Aquatics: Singapore 2025 women's platform final report",
          zh: "World Aquatics：新加坡 2025 女子 10 米台决赛报道",
        },
        url: "https://www.worldaquatics.com/news/4380796/world-aquatics-championships-singapore-2025-diving-day-eight-chen-yuxi-rues-2024-setback-with-world-title",
      },
    ],
  },
  {
    slug: "why-quan-hongchan-stays-a-headline",
    updatedAt: "2026-04-14T00:00:00.000Z",
    readingMinutes: 5,
    title: {
      en: "Why Does Quan Hongchan Stay in the Headlines Even Between Finals?",
      zh: "为什么即使不在决赛日，全红婵也常常还在头条里？",
    },
    description: {
      en: "A look at how major-meet timing, growth narratives, and repeatable visual moments keep her coverage active.",
      zh: "这篇文章解释，大赛节奏、成长叙事和可重复传播的动作画面，为什么会让她在非决赛日也保持话题密度。",
    },
    kicker: {
      en: "Media Logic",
      zh: "传播逻辑",
    },
    category: {
      en: "Headline Dynamics",
      zh: "话题机制",
    },
    bullets: [
      {
        en: "Some athletes trend only on result day. Quan Hongchan often trends before and after the final as well.",
        zh: "有些运动员只在结果当天被讨论，而全红婵往往会在赛前、赛后都持续被关注。",
      },
      {
        en: "Growth and adaptation stories give reporters a second narrative beyond medals.",
        zh: "关于身体成长与状态调整的报道，为媒体提供了奖牌之外的第二条叙事线。",
      },
      {
        en: "That extra narrative layer is one reason her coverage spills into mainstream news feeds.",
        zh: "正是这层额外叙事，让她的报道更容易溢出到大众新闻流。",
      },
    ],
    markdown: {
      en: `
Quan Hongchan often stays visible even when the calendar between finals looks quiet. That is not accidental. It comes from a specific media structure.

## Three forces keep her visible

- big-event timing
- visual replay value
- a continuing growth story

If only one of those existed, the attention would fade much faster. Together, they keep the storyline open.

## Why growth keeps returning to the coverage

On **May 3, 2025**, World Aquatics quoted Quan Hongchan after Beijing Super Final competition speaking about adapting to changes in height and weight. That kind of official post-event remark is important because it extends the conversation beyond the scoreline. It turns one result into a continuing story about adjustment, timing, and self-control.

## The practical takeaway

When her name returns to the top of the feed, it often means the news cycle has found one of two engines:

1. a new result
2. a new interpretation of the same athlete story

Reading that distinction correctly helps explain why some days feel like hard competition coverage, while others feel like a wider public conversation about the athlete herself.
      `,
      zh: `
全红婵经常会在“并没有决赛”的时候，依然保持可见度。这并不偶然，而是一种非常明确的传播结构在起作用。

## 让她持续被看见的三股力量

- 大赛节点
- 动作回放价值
- 持续存在的成长叙事

如果只有其中一项，热度衰减会快得多。正因为三者同时存在，这条叙事线才会一直开着。

## 为什么“成长变化”总会反复进入报道

**2025 年 5 月 3 日**，World Aquatics 在北京 Super Final 赛后报道里引用了全红婵关于身高和体重变化、以及自己仍在适应这些变化的表述。这样的官方赛后表达很重要，因为它把一次比赛结果延长成了一个持续故事：不是只看分数，而是看她如何调整身体、节奏和稳定性。

## 更实用的结论

当她的名字再次回到信息流顶部时，通常意味着新闻引擎来自两种之一：

1. 有了新的比赛结果
2. 媒体又找到了理解这位运动员的新角度

把这两种驱动力分清楚，就能解释为什么有些时候她的报道是纯竞技新闻，而有些时候更像一次更广泛的人物公共讨论。
      `,
    },
    references: [
      {
        label: {
          en: "World Aquatics: Beijing Super Final day-two report",
          zh: "World Aquatics：北京 Super Final 第二日报道",
        },
        url: "https://www.worldaquatics.com/news/4258435/diving-world-aquatics-world-cup-super-final-2025-day-2consistent-excellence-wang-zongyuan-chen-yuxi",
      },
      {
        label: {
          en: "World Aquatics athlete profile",
          zh: "World Aquatics：全红婵运动员资料页",
        },
        url: "https://www.worldaquatics.com/athletes/1528691/quan-hongchan",
      },
    ],
  },
];

const localized = (locale: string, value: LocalizedText) =>
  toFileLocale(locale) === "zh-cn" ? value.zh : value.en;

export const getHormuzSiteOrigin = () => "https://quan-hong-chan.lol";

export const getHormuzSiteCopy = (locale: string) => {
  const isZh = toFileLocale(locale) === "zh-cn";

  return {
    localeLabel: isZh ? "简体中文" : "English",
    brand: isZh ? "全红婵观察" : "Quan Hongchan Watch",
    brandLong: isZh
      ? "全红婵最新新闻、赛事动态与人物观察"
      : "Latest news, competition updates, and profile notes on Quan Hongchan",
    metadataTitle: isZh
      ? "全红婵最新新闻、赛事动态与人物观察"
      : "Quan Hongchan Latest News, Diving Results, and Profile Watch",
    metadataDescription: isZh
      ? "追踪全红婵的最新新闻、跳水赛事动态、采访片段与人物观察。"
      : "Track Quan Hongchan's latest news, diving results, interviews, and profile-driven coverage in one place.",
    metadataKeywords: isZh
      ? "全红婵, 全红婵最新新闻, 全红婵跳水, 全红婵比赛, 跳水新闻"
      : "Quan Hongchan latest news, Quan Hongchan diving, Quan Hongchan results, Chinese diving news, women platform diving",
    liveBadge: isZh ? "实时监测" : "Live watch",
    heroEyebrow: isZh ? "跳水人物观察站" : "Diving profile watch",
    heroTitle: isZh
      ? "把全红婵的最新新闻、比赛节点与人物线索放到同一张桌面上。"
      : "Put Quan Hongchan's latest news, competition milestones, and profile signals on one screen.",
    heroDescription: isZh
      ? "这个站点聚焦全红婵相关的公开报道：先看最新消息，再看比赛、训练、采访和公众关注如何互相推动。"
      : "This site follows public reporting around Quan Hongchan: start with the latest update, then trace how competition, training, interviews, and public attention move together.",
    latestButton: isZh ? "查看最新消息" : "See latest updates",
    briefingsButton: isZh ? "阅读人物文章" : "Read profile briefings",
    statCards: [
      {
        title: isZh ? "观察窗口" : "Coverage window",
        value: isZh ? "过去 7 天" : "Last 7 days",
        description: isZh
          ? "优先聚合与全红婵直接相关的公开报道。"
          : "Prioritizes public coverage directly tied to Quan Hongchan.",
      },
      {
        title: isZh ? "核心维度" : "Core lenses",
        value: isZh ? "赛事 / 训练 / 采访" : "Competition / Training / Interviews",
        description: isZh
          ? "把竞技结果和人物叙事放在同一条时间线上。"
          : "Reads athletic results and athlete narrative on the same timeline.",
      },
      {
        title: isZh ? "阅读方式" : "Reading mode",
        value: isZh ? "快讯 + 背景" : "Updates + context",
        description: isZh
          ? "先看发生了什么，再看为什么会被持续传播。"
          : "Start with what happened, then ask why it keeps circulating.",
      },
    ],
    signalTitle: isZh ? "四个值得持续跟踪的焦点" : "Four angles worth tracking first",
    signalCards: [
      {
        title: isZh ? "赛事节点" : "Competition timing",
        description: isZh
          ? "报名、预赛、决赛和赛后采访，都会改变当天的新闻权重。"
          : "Entries, prelims, finals, and post-event quotes all reshape the day's news weight.",
      },
      {
        title: isZh ? "动作讨论" : "Technique talk",
        description: isZh
          ? "动作回放和技术拆解，是她长期维持热度的重要来源。"
          : "Replays and technical breakdowns are a major reason her coverage stays active.",
      },
      {
        title: isZh ? "训练与采访" : "Training and interviews",
        description: isZh
          ? "没有比赛结果时，训练动态和采访经常会接管叙事。"
          : "When there is no result to react to, training notes and interviews often take over the story.",
      },
      {
        title: isZh ? "公众热度" : "Public attention",
        description: isZh
          ? "她的名字会在体育新闻和大众信息流之间不断来回穿透。"
          : "Her name regularly crosses from sports coverage into the broader public feed.",
      },
    ],
    latestTitle: isZh ? "最新消息" : "Latest updates",
    latestDescription: isZh
      ? "优先聚合与全红婵直接相关的公开报道，中文新闻优先，再补充英文来源。"
      : "Aggregates public coverage directly connected to Quan Hongchan, prioritizing Chinese-language reporting and then filling with English sources.",
    contextTitle: isZh ? "为什么她总能持续占据关注中心" : "Why she keeps drawing repeat attention",
    contextCards: [
      {
        title: isZh ? "动作观赏性" : "Visual clarity",
        description: isZh
          ? "她的动作很容易被普通观众直接识别和记住。"
          : "Even casual viewers can quickly identify and remember the visual quality of her dives.",
      },
      {
        title: isZh ? "大赛牵引" : "Big-meet gravity",
        description: isZh
          ? "只要赛程进入高关注节点，她就会回到报道中心。"
          : "Whenever the calendar reaches a high-stakes point, she moves back to the center of coverage.",
      },
      {
        title: isZh ? "成长叙事" : "Growth story",
        description: isZh
          ? "关于身体变化、适应与稳定性的讨论，会把热度延长到比赛之外。"
          : "Stories about adaptation, growth, and stability extend coverage beyond the result itself.",
      },
    ],
    briefingsTitle: isZh ? "站内背景文章" : "In-house briefings",
    briefingsDescription: isZh
      ? "用更慢的阅读速度，把比赛结果、技术细节和人物讨论拆开看。"
      : "Take a slower pass through the results, technical details, and profile angles behind the daily coverage.",
    faqTitle: isZh ? "常见问题" : "Common questions",
    faqItems: [
      {
        question: isZh ? "这是全红婵的官方站点吗？" : "Is this Quan Hongchan's official site?",
        answer: isZh
          ? "不是。这是一个基于公开报道整理的信息页，用来跟踪全红婵相关新闻与人物观察，不代表官方团队。"
          : "No. This is a public-source editorial watch page for Quan Hongchan coverage and does not represent her official team.",
      },
      {
        question: isZh ? "为什么要同时看比赛和采访？" : "Why track both results and interviews?",
        answer: isZh
          ? "因为围绕她的关注往往既由比赛结果驱动，也由采访和人物叙事持续放大。"
          : "Because her coverage is driven both by competition results and by interviews or profile-driven storylines.",
      },
      {
        question: isZh ? "新闻多久刷新一次？" : "How often does the feed refresh?",
        answer: isZh
          ? "新闻流会随来源更新而变化，站点默认按约 15 分钟节奏重新拉取公开 RSS。"
          : "The feed changes with source updates and the site re-fetches public RSS feeds on roughly a 15-minute cadence.",
      },
    ],
    footerTitle: isZh ? "全红婵观察站" : "Quan Hongchan Watch",
    footerDescription: isZh
      ? "围绕全红婵新闻、跳水赛事与人物讨论的垂直信息页。"
      : "A focused information desk around Quan Hongchan news, diving events, and athlete-profile coverage.",
    footerNote: isZh
      ? "公开新闻会有噪音，因此本站优先排序“与全红婵直接相关”的报道。"
      : "Open news feeds are noisy, so this desk ranks stories by direct relevance to Quan Hongchan first.",
    navLatest: isZh ? "最新动态" : "Latest",
    navSignals: isZh ? "看点" : "Focus",
    navBriefings: isZh ? "人物文章" : "Briefings",
    navAbout: isZh ? "关于" : "About",
    newsroomTitle: isZh ? "最新新闻与背景观察" : "Latest news and deeper context",
    newsroomDescription: isZh
      ? "先看最新报道，再顺着同一条线索看比赛、训练和讨论热度。"
      : "Read the latest headline first, then trace the same storyline through competition, training, and public discussion.",
    readMore: isZh ? "返回文章列表" : "Back to briefings",
    updatedLabel: isZh ? "更新于" : "Updated",
    monitoringLabel: isZh ? "监测中" : "Monitoring",
    spotlightLabel: isZh ? "人物焦点" : "Athlete focus",
    spotlightStatus: isZh ? "赛事观察中" : "Competition watch active",
    footerMonitorLabel: isZh ? "导航" : "Navigate",
    footerNoteLabel: isZh ? "说明" : "Note",
    readTimeLabel: isZh ? "阅读时长" : "Read time",
    focusLabel: isZh ? "聚焦主题" : "Focus",
    keyPointsLabel: isZh ? "核心要点" : "Key points",
    referencesLabel: isZh ? "参考链接" : "References",
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
      sign_in_title: isZh ? "登录全红婵观察站" : "Sign in to Quan Hongchan Watch",
      sign_in_description: isZh
        ? "登录后可使用账户相关功能。"
        : "Sign in to access account-related features.",
      sign_up_title: isZh ? "加入全红婵观察站" : "Join Quan Hongchan Watch",
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
        ? "这个站点对你了解全红婵是否有帮助？"
        : "Is this site helping you follow Quan Hongchan more clearly?",
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
        ? "邀请朋友一起关注全红婵的最新动态。"
        : "Invite friends to follow Quan Hongchan's latest updates.",
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
  ATHLETE_BRIEFINGS.map((briefing) => briefing.slug);

export const getHormuzBriefings = (locale: string): HormuzBriefing[] =>
  ATHLETE_BRIEFINGS.map((briefing) => ({
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

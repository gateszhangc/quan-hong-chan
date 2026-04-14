import { ArrowRight, ArrowUpRight, Clock3, Radar, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  getHormuzBriefings,
  getHormuzSiteCopy,
} from "@/lib/hormuz-content";
import { getHormuzNewsFeed } from "@/lib/hormuz-news";
import { getSiteUrl } from "@/lib/site-url";

const formatDateTime = (locale: string, value: string) => {
  const date = new Date(value);
  const formatter = new Intl.DateTimeFormat(locale.startsWith("zh") ? "zh-CN" : "en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formatter.format(date);
};

const extractHost = (url: string) => {
  try {
    return new URL(url, getSiteUrl()).hostname.replace(/^www\./, "");
  } catch {
    return new URL(getSiteUrl()).hostname.replace(/^www\./, "");
  }
};

export default async function HormuzHomepage({ locale }: { locale: string }) {
  const copy = getHormuzSiteCopy(locale);
  const [news, briefings] = await Promise.all([
    getHormuzNewsFeed(locale, 8),
    Promise.resolve(getHormuzBriefings(locale).slice(0, 3)),
  ]);

  const lead = news[0];
  const rest = news.slice(1);
  const rootHref = "/";
  const postsHref = "/posts";

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-14">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-7 shadow-[0_40px_120px_rgba(0,0,0,0.35)] md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#9bc9df]/25 bg-[#0c2233] px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#9bc9df]">
            <Radar className="h-3.5 w-3.5" />
            {copy.liveBadge}
          </div>

          <div className="mt-7 space-y-6">
            <p className="text-sm uppercase tracking-[0.28em] text-[#f0ddc5]/75">
              {copy.heroEyebrow}
            </p>
            <h1 className="max-w-4xl font-serif text-4xl leading-tight text-[#fff7ea] sm:text-5xl lg:text-6xl">
              {copy.heroTitle}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[#b5c7d3] sm:text-lg">
              {copy.heroDescription}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              className="rounded-full bg-[#d68a63] px-6 text-[#071017] hover:bg-[#eaa47d]"
            >
              <Link href={`${rootHref}#latest` as any}>
                {copy.latestButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/15 bg-transparent text-[#f3efe6] hover:bg-white/10"
            >
              <Link href={postsHref as any}>{copy.briefingsButton}</Link>
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#071624] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(160deg,#102539,#06131f)] p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(117,197,234,0.22),transparent_28%),radial-gradient(circle_at_82%_72%,rgba(214,138,99,0.22),transparent_24%)]" />
            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.28em] text-[#8aabbc]">
                  {copy.monitoringLabel}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1 text-xs text-[#d8e6ee]">
                  <Clock3 className="h-3.5 w-3.5" />
                  {lead ? formatDateTime(locale, lead.publishedAt) : "UTC"}
                </span>
              </div>

              <div className="relative h-[18rem] overflow-hidden rounded-[1.4rem] border border-white/10 bg-[linear-gradient(135deg,#0f2741,#071420)]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />
                <div className="absolute left-[18%] top-[-8%] h-[124%] w-[26%] rounded-[45%] bg-[#183147]" />
                <div className="absolute right-[12%] top-[12%] h-[86%] w-[36%] rounded-[42%] bg-[#0f2234]" />
                <div className="absolute left-[37%] top-0 h-full w-[9%] bg-[linear-gradient(180deg,rgba(121,197,230,0.14),rgba(121,197,230,0.35),rgba(214,138,99,0.12))]" />
                <div className="absolute left-[41%] top-6 h-[78%] w-px bg-[#9cd5ea]/70" />
                <div className="absolute left-[44%] top-12 h-[62%] w-px bg-[#9cd5ea]/55" />
                <div className="absolute bottom-5 left-5 max-w-[15rem] rounded-2xl border border-white/10 bg-black/25 px-4 py-3 backdrop-blur">
                  <p className="text-[0.65rem] uppercase tracking-[0.24em] text-[#8fb0c2]">
                    Transit corridor
                  </p>
                  <p className="mt-2 font-serif text-xl text-[#fff1dc]">{copy.brand}</p>
                </div>
                <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-[#f0ddc5]/20 bg-[#f0ddc5]/10 px-3 py-1 text-xs text-[#f0ddc5]">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  Risk lens active
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {copy.statCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-[0.65rem] uppercase tracking-[0.24em] text-[#7ea0b5]">
                      {card.title}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-[#fff4e6]">{card.value}</p>
                    <p className="mt-2 text-sm leading-6 text-[#9fb4c5]">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="signals" className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {copy.signalCards.map((card) => (
          <div
            key={card.title}
            className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 backdrop-blur"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-[#7ea0b5]">{copy.signalTitle}</p>
            <h2 className="mt-4 font-serif text-2xl text-[#fff1dc]">{card.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#a7bcc9]">{card.description}</p>
          </div>
        ))}
      </section>

      <section id="latest" className="mt-14">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#7ea0b5]">
              {copy.liveBadge}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[#fff3e3] md:text-4xl">
              {copy.latestTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#9fb4c5]">
              {copy.latestDescription}
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/15 bg-transparent text-[#f3efe6] hover:bg-white/10"
          >
            <Link href={postsHref as any}>{copy.newsroomTitle}</Link>
          </Button>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          {lead && (
            <a
              href={lead.url}
              target={lead.external ? "_blank" : undefined}
              rel={lead.external ? "noreferrer" : undefined}
              className="group rounded-[2rem] border border-white/10 bg-[linear-gradient(140deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 transition hover:-translate-y-1 hover:border-[#9bc9df]/30"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-[#8eb1c3]">
                <span>{lead.tag}</span>
                <span className="h-1 w-1 rounded-full bg-[#557086]" />
                <span>{lead.source}</span>
              </div>
              <h3 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-[#fff4e6] group-hover:text-white">
                {lead.title}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#adc0cb]">
                {lead.summary}
              </p>
              <div className="mt-7 flex items-center gap-3 text-sm text-[#d4e4ed]">
                <Clock3 className="h-4 w-4 text-[#9bc9df]" />
                <span>{formatDateTime(locale, lead.publishedAt)}</span>
                <ArrowUpRight className="ml-auto h-4 w-4 text-[#f0ddc5]" />
              </div>
            </a>
          )}

          <div className="space-y-4">
            {rest.slice(0, 3).map((item) => (
              <a
                key={item.id}
                href={item.url}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="block rounded-[1.6rem] border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-[#8eb1c3]">
                  <span>{item.tag}</span>
                  <span className="h-1 w-1 rounded-full bg-[#557086]" />
                  <span>{item.source}</span>
                </div>
                <h3 className="mt-3 font-serif text-2xl leading-tight text-[#fff1dc]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#9fb4c5]">{item.summary}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {rest.slice(3).map((item) => (
            <a
              key={item.id}
              href={item.url}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="rounded-[1.4rem] border border-white/10 bg-[#081826]/90 p-5 transition hover:border-[#9bc9df]/30 hover:bg-[#0d2032]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-[#9bc9df]">
                  {item.tag}
                </span>
                <span className="text-[0.7rem] text-[#7290a1]">{extractHost(item.url)}</span>
              </div>
              <h3 className="mt-4 font-serif text-xl leading-snug text-[#fff3e3]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#9fb4c5]">{item.summary}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-5 lg:grid-cols-3">
        {copy.contextCards.map((card) => (
          <div
            key={card.title}
            className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-[#7ea0b5]">
              {copy.contextTitle}
            </p>
            <h2 className="mt-4 font-serif text-3xl text-[#fff0dc]">{card.title}</h2>
            <p className="mt-4 text-sm leading-7 text-[#9fb4c5]">{card.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#7ea0b5]">
              {copy.briefingsTitle}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[#fff3e3] md:text-4xl">
              {copy.newsroomTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#9fb4c5]">
              {copy.briefingsDescription}
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {briefings.map((briefing) => (
            <Link
              key={briefing.slug}
              href={`/posts/${briefing.slug}` as any}
              className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#d68a63]/35"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-[#8db0c2]">
                {briefing.kicker}
              </p>
              <h3 className="mt-4 font-serif text-3xl leading-tight text-[#fff1dc] group-hover:text-white">
                {briefing.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#9fb4c5]">{briefing.description}</p>
              <div className="mt-6 flex items-center gap-3 text-sm text-[#d7e5ed]">
                <span>{briefing.category}</span>
                <span className="h-1 w-1 rounded-full bg-[#557086]" />
                <span>{briefing.readingMinutes} min</span>
                <ArrowRight className="ml-auto h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="faq" className="mt-16 rounded-[2rem] border border-white/10 bg-white/5 p-7 md:p-10">
        <p className="text-xs uppercase tracking-[0.28em] text-[#7ea0b5]">{copy.faqTitle}</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {copy.faqItems.map((item) => (
            <div key={item.question} className="rounded-[1.4rem] border border-white/10 bg-[#081826]/80 p-5">
              <h3 className="font-serif text-2xl text-[#fff1dc]">{item.question}</h3>
              <p className="mt-3 text-sm leading-7 text-[#a7bcc9]">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

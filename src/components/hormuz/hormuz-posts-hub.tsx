import { ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  getHormuzBriefings,
  getHormuzSiteCopy,
} from "@/lib/hormuz-content";
import { getHormuzNewsFeed } from "@/lib/hormuz-news";

const formatDateTime = (locale: string, value: string) => {
  const date = new Date(value);
  return new Intl.DateTimeFormat(locale.startsWith("zh") ? "zh-CN" : "en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export default async function HormuzPostsHub({ locale }: { locale: string }) {
  const copy = getHormuzSiteCopy(locale);
  const [briefings, news] = await Promise.all([
    Promise.resolve(getHormuzBriefings(locale)),
    getHormuzNewsFeed(locale, 10),
  ]);
  const postsHref = "/posts";

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-14">
      <section className="rounded-[2.1rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.35)] md:p-10">
        <p className="text-xs uppercase tracking-[0.28em] text-[#8eb1c3]">
          {copy.briefingsTitle}
        </p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-[#fff5e7] sm:text-5xl">
          {copy.newsroomTitle}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#a8bcc9]">
          {copy.newsroomDescription}
        </p>
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          {briefings.map((briefing) => (
            <Link
              key={briefing.slug}
              href={`/posts/${briefing.slug}` as any}
              className="group block rounded-[1.8rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#d68a63]/35"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-[#8fb0c2]">
                <span>{briefing.kicker}</span>
                <span className="h-1 w-1 rounded-full bg-[#557086]" />
                <span>{briefing.category}</span>
              </div>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-[#fff1dc] group-hover:text-white">
                {briefing.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#9fb4c5]">
                {briefing.description}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-[#d8e6ee]">
                {briefing.bullets.slice(0, 2).map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#d68a63]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-3 text-sm text-[#d7e5ed]">
                <Clock3 className="h-4 w-4 text-[#9bc9df]" />
                <span>{formatDateTime(locale, briefing.updatedAt)}</span>
                <ArrowRight className="ml-auto h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>

        <div className="rounded-[1.8rem] border border-white/10 bg-[#081826]/90 p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-[#8fb0c2]">
            {copy.latestTitle}
          </p>
          <div className="mt-5 space-y-4">
            {news.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="block rounded-[1.4rem] border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/[0.08]"
              >
                <div className="flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-[#8fb0c2]">
                  <span>{item.tag}</span>
                  <span className="h-1 w-1 rounded-full bg-[#557086]" />
                  <span>{item.source}</span>
                </div>
                <h3 className="mt-3 font-serif text-2xl leading-tight text-[#fff1dc]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#9fb4c5]">{item.summary}</p>
                <div className="mt-4 flex items-center gap-3 text-sm text-[#d7e5ed]">
                  <Clock3 className="h-4 w-4 text-[#9bc9df]" />
                  <span>{formatDateTime(locale, item.publishedAt)}</span>
                  <ArrowUpRight className="ml-auto h-4 w-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

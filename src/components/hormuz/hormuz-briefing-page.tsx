import MarkdownIt from "markdown-it";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { HormuzBriefing, getHormuzSiteCopy } from "@/lib/hormuz-content";

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

const formatDateTime = (locale: string, value: string) => {
  const date = new Date(value);
  return new Intl.DateTimeFormat(locale.startsWith("zh") ? "zh-CN" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export default function HormuzBriefingPage({
  locale,
  briefing,
}: {
  locale: string;
  briefing: HormuzBriefing;
}) {
  const copy = getHormuzSiteCopy(locale);
  const postsHref = "/posts";
  const renderedHtml = markdown.render(briefing.markdown);

  return (
    <article className="mx-auto max-w-5xl px-5 py-10 sm:px-8 md:py-14">
      <Button
        asChild
        variant="ghost"
        className="rounded-full px-0 text-[#d7e5ed] hover:bg-transparent hover:text-white"
      >
        <Link href={postsHref as any}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {copy.readMore}
        </Link>
      </Button>

      <section className="mt-6 rounded-[2.1rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.35)] md:p-10">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.26em] text-[#8eb1c3]">
          <span>{briefing.kicker}</span>
          <span className="h-1 w-1 rounded-full bg-[#557086]" />
          <span>{briefing.category}</span>
        </div>
        <h1 className="mt-5 font-serif text-4xl leading-tight text-[#fff5e7] sm:text-5xl">
          {briefing.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[#a8bcc9]">
          {briefing.description}
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
            <p className="text-[0.65rem] uppercase tracking-[0.24em] text-[#7ea0b5]">
              {copy.updatedLabel}
            </p>
            <p className="mt-3 text-sm text-[#f5ead9]">
              {formatDateTime(locale, briefing.updatedAt)}
            </p>
          </div>
          <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
            <p className="text-[0.65rem] uppercase tracking-[0.24em] text-[#7ea0b5]">
              {copy.readTimeLabel}
            </p>
            <p className="mt-3 text-sm text-[#f5ead9]">{briefing.readingMinutes} min</p>
          </div>
          <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
            <p className="text-[0.65rem] uppercase tracking-[0.24em] text-[#7ea0b5]">
              {copy.focusLabel}
            </p>
            <p className="mt-3 text-sm text-[#f5ead9]">{briefing.category}</p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-[#8fb0c2]">
            {copy.keyPointsLabel}
          </p>
          <ul className="mt-5 space-y-4">
            {briefing.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm leading-7 text-[#d7e5ed]">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#d68a63]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </aside>

        <div className="rounded-[1.8rem] border border-white/10 bg-[#081826]/85 p-6 md:p-8">
          <div
            className="prose prose-invert max-w-none prose-headings:font-serif prose-headings:text-[#fff5e7] prose-p:text-[#b6c8d4] prose-li:text-[#d8e6ee] prose-strong:text-white prose-a:text-[#f0ddc5]"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        </div>
      </section>

      <section className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
        <p className="text-xs uppercase tracking-[0.28em] text-[#8fb0c2]">
          {copy.referencesLabel}
        </p>
        <div className="mt-5 space-y-3">
          {briefing.references.map((reference) => (
            <a
              key={reference.url}
              href={reference.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-[#081826]/80 px-4 py-3 text-sm text-[#d7e5ed] transition hover:border-white/20 hover:text-white"
            >
              <span>{reference.label}</span>
              <ArrowUpRight className="ml-auto h-4 w-4" />
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}

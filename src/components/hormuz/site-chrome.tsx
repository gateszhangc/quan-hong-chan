import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { getHormuzSiteCopy } from "@/lib/hormuz-content";

export default function HormuzSiteChrome({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const copy = getHormuzSiteCopy(locale);
  const rootHref = "/";
  const latestHref = "/#latest";
  const signalsHref = "/#signals";
  const aboutHref = "/#faq";
  const postsHref = "/posts";

  return (
    <div className="min-h-screen bg-[#06131f] text-[#f3efe6]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-[-18rem] h-[34rem] bg-[radial-gradient(circle_at_center,rgba(77,154,194,0.34),transparent_60%)]" />
        <div className="absolute right-[-12rem] top-[8rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(211,97,71,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 z-40 border-b border-white/8 bg-[#06131f]/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <Link href={rootHref as any} className="flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-2xl border border-white/12 bg-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
                <Image
                  src="/brand/hormuz-logo.png"
                  alt={copy.brand}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-serif text-lg tracking-[0.18em] text-[#f0ddc5] uppercase">
                  {copy.brand}
                </p>
                <p className="text-xs text-[#9fb4c5]">{copy.brandLong}</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
              {[
                { href: latestHref, label: copy.navLatest },
                { href: signalsHref, label: copy.navSignals },
                { href: postsHref, label: copy.navBriefings },
                { href: aboutHref, label: copy.navAbout },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href as any}
                  className="rounded-full px-4 py-2 text-sm text-[#c9d7e0] transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="outline"
                className="hidden rounded-full border-[#f0ddc5]/35 bg-transparent text-[#f0ddc5] hover:bg-[#f0ddc5]/10 hover:text-white md:inline-flex"
              >
                <Link href={postsHref as any}>{copy.navBriefings}</Link>
              </Button>
              <Button
                asChild
                className="rounded-full bg-[#d68a63] px-5 text-[#071017] hover:bg-[#e7a57f]"
              >
                <Link href={latestHref as any}>{copy.latestButton}</Link>
              </Button>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t border-white/8 bg-[#04101a]/90">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <p className="font-serif text-2xl text-[#f0ddc5]">{copy.footerTitle}</p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[#9fb4c5]">
                {copy.footerDescription}
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[#6f8ea1]">
                Monitor
              </p>
              <div className="mt-4 space-y-3 text-sm text-[#d9e5ec]">
                <Link href={latestHref as any} className="block hover:text-white">
                  {copy.navLatest}
                </Link>
                <Link href={signalsHref as any} className="block hover:text-white">
                  {copy.navSignals}
                </Link>
                <Link href={postsHref as any} className="block hover:text-white">
                  {copy.navBriefings}
                </Link>
              </div>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[#6f8ea1]">
                Note
              </p>
              <p className="mt-4 text-sm leading-7 text-[#9fb4c5]">{copy.footerNote}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

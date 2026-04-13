import Link from "next/link";
import { getHormuzSiteCopy } from "@/data/hormuz-news";
import {
  getHormuzTypography,
  hormuzTypographyClassName,
} from "@/components/hormuz/theme";

export default function HormuzSiteHeader({ locale }: { locale: string }) {
  const copy = getHormuzSiteCopy(locale);
  const { bodyStyle, serifStyle } = getHormuzTypography(locale);

  return (
    <header className={`landing-header ${hormuzTypographyClassName}`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <Link
            href={`/${locale}`}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/6 shadow-[0_15px_40px_rgba(2,12,18,0.28)]"
            aria-label={copy.siteName}
          >
            <img src="/brand/hormuz-mark.svg" alt="" className="h-9 w-9" />
          </Link>
          <div className="space-y-1">
            <Link
              href={`/${locale}`}
              className="text-lg font-semibold tracking-[0.18em] text-white/96 uppercase"
              style={serifStyle}
            >
              {copy.siteName}
            </Link>
            <p className="max-w-xl text-sm text-[#a7c3cb]" style={bodyStyle}>
              {copy.brandLine}
            </p>
          </div>
        </div>

        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-2 text-sm text-[#d6e8eb] md:justify-end"
          style={bodyStyle}
        >
          {copy.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-[#79c7d2]/45 hover:bg-[#79c7d2]/10"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";
import {
  HORMUZ_LAST_UPDATED,
  HORMUZ_SOURCE_URLS,
  getHormuzSiteCopy,
} from "@/data/hormuz-news";
import {
  getHormuzTypography,
  hormuzTypographyClassName,
} from "@/components/hormuz/theme";

export default function HormuzSiteFooter({ locale }: { locale: string }) {
  const copy = getHormuzSiteCopy(locale);
  const { bodyStyle, serifStyle } = getHormuzTypography(locale);

  return (
    <footer className={`landing-footer border-t border-white/10 ${hormuzTypographyClassName}`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 md:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p
              className="text-sm uppercase tracking-[0.28em] text-[#79c7d2]"
              style={bodyStyle}
            >
              {copy.sourceStrip}
            </p>
            <h2 className="text-2xl text-white" style={serifStyle}>
              {copy.siteName}
            </h2>
            <p className="max-w-3xl text-sm text-[#9eb6bd]" style={bodyStyle}>
              {copy.footerNote}
            </p>
          </div>
          <p className="text-sm text-[#9eb6bd]" style={bodyStyle}>
            {copy.locale === "zh"
              ? `快照更新时间：${HORMUZ_LAST_UPDATED}`
              : `Snapshot updated ${HORMUZ_LAST_UPDATED}`}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {HORMUZ_SOURCE_URLS.map((href) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-[#dbe9ec] transition hover:border-[#b88a44]/55 hover:bg-[#b88a44]/10"
              style={bodyStyle}
            >
              {href.replace(/^https?:\/\//, "")}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

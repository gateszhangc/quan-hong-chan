import { Bodoni_Moda, IBM_Plex_Sans } from "next/font/google";

export const hormuzSerif = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-hormuz-serif",
  display: "swap",
});

export const hormuzSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hormuz-sans",
  display: "swap",
});

export const hormuzTypographyClassName = `${hormuzSerif.variable} ${hormuzSans.variable}`;

export function getHormuzTypography(locale: string) {
  const isChinese = locale.startsWith("zh");

  return {
    isChinese,
    bodyStyle: {
      fontFamily: isChinese
        ? '"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif'
        : "var(--font-hormuz-sans)",
    },
    serifStyle: {
      fontFamily: isChinese
        ? '"Songti SC","Noto Serif SC","STSong",serif'
        : "var(--font-hormuz-serif)",
    },
  } as const;
}

import "@/app/globals.css";

import { Cormorant_Garamond, IBM_Plex_Sans } from "next/font/google";
import { getLocale, setRequestLocale } from "next-intl/server";

const editorialSerif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-app-serif",
  weight: ["400", "500", "600", "700"],
});

const reportSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-app-sans",
  weight: ["400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  setRequestLocale(locale);

  const googleAdsenseCode = process.env.NEXT_PUBLIC_GOOGLE_ADCODE || "";

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${editorialSerif.variable} ${reportSans.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#06131f" />
        {googleAdsenseCode && (
          <meta name="google-adsense-account" content={googleAdsenseCode} />
        )}

        {/* Resource hints for faster third-party connections */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://clarity.ms" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link rel="icon" href="/brand/hormuz-favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/brand/hormuz-favicon.png" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

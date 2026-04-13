import {
  getMessages,
  setRequestLocale,
} from "next-intl/server";
import { AppContextProvider } from "@/contexts/app";
import { Metadata } from "next";
import { NextAuthSessionProvider } from "@/auth/session";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/providers/theme";
import { getSiteUrl } from "@/lib/site-url";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import GaRouteTracker from "@/components/analytics/ga-route-tracker";
import ClarityAnalytics from "@/components/analytics/clarity";
import { getHormuzSiteCopy } from "@/data/hormuz-news";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  const siteUrl = getSiteUrl();
  const copy = getHormuzSiteCopy(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      template: `%s`,
      default: copy.siteName,
    },
    description: copy.metadataDescription,
    keywords: copy.metadataKeywords,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <NextAuthSessionProvider>
        <AppContextProvider>
          <ThemeProvider>
            <GoogleAnalytics />
            <ClarityAnalytics />
            <GaRouteTracker />
            {children}
          </ThemeProvider>
        </AppContextProvider>
      </NextAuthSessionProvider>
    </NextIntlClientProvider>
  );
}

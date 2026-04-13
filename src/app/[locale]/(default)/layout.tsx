import { ReactNode } from "react";
import LandingTheme from "@/components/theme/landing-theme";
import HormuzSiteHeader from "@/components/hormuz/site-header";
import HormuzSiteFooter from "@/components/hormuz/site-footer";

export default async function DefaultLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <LandingTheme>
      <HormuzSiteHeader locale={locale} />
      <main className="overflow-x-hidden">{children}</main>
      <HormuzSiteFooter locale={locale} />
    </LandingTheme>
  );
}

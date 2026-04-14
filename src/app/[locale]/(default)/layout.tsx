import { ReactNode } from "react";
import HormuzSiteChrome from "@/components/hormuz/site-chrome";

export default async function DefaultLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <HormuzSiteChrome locale={locale}>{children}</HormuzSiteChrome>
  );
}

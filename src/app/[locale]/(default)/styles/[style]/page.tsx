import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    locale: string;
    style: string;
  }>;
};

export default async function StylePage({ params }: PageProps) {
  const resolvedParams = await params;
  redirect(`/${resolvedParams.locale}`);
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/site/PageShell";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });
  return (
    <PageShell title={t("about")}>
      <p className="max-w-2xl text-sm leading-7 text-black/70">
        Placeholder page. Later we’ll add the editorial bio and atelier story.
      </p>
    </PageShell>
  );
}


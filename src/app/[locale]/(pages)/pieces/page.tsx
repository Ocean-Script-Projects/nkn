import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/site/PageShell";

export default async function PiecesPage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });
  return (
    <PageShell title={t("pieces")}>
      <p className="max-w-2xl text-sm leading-7 text-black/70">
        Placeholder page. Later we’ll add categories and more gallery content.
      </p>
    </PageShell>
  );
}


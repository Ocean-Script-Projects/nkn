import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/site/PageShell";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");
  return (
    <PageShell title={t("events")}>
      <p className="max-w-2xl text-sm leading-7 text-black/70">
        Placeholder page. Later we’ll list upcoming meetings and application
        flows.
      </p>
    </PageShell>
  );
}


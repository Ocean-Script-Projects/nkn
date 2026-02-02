import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/site/PageShell";

export default async function EventsPage() {
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


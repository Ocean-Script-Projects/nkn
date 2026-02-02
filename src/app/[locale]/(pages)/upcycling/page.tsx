import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/site/PageShell";

export default async function UpcyclingPage() {
  const t = await getTranslations("nav");
  return (
    <PageShell title={t("upcycling")}>
      <p className="max-w-2xl text-sm leading-7 text-black/70">
        Placeholder page. Later we’ll add real before/after cases and process.
      </p>
    </PageShell>
  );
}


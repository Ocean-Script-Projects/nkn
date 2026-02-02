import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/site/PageShell";

export default async function ServicesPage() {
  const t = await getTranslations("nav");
  return (
    <PageShell title={t("services")}>
      <p className="max-w-2xl text-sm leading-7 text-black/70">
        Placeholder page. Later we’ll expand this into the editorial “collections”
        layout from the plan.
      </p>
    </PageShell>
  );
}


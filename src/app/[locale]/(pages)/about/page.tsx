import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/site/PageShell";

export default async function AboutPage() {
  const t = await getTranslations("nav");
  return (
    <PageShell title={t("about")}>
      <p className="max-w-2xl text-sm leading-7 text-black/70">
        Placeholder page. Later we’ll add the editorial bio and atelier story.
      </p>
    </PageShell>
  );
}


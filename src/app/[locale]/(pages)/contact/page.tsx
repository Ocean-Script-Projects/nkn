import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/site/PageShell";

export default async function ContactPage() {
  const t = await getTranslations("nav");
  return (
    <PageShell title={t("contact")}>
      <p className="max-w-2xl text-sm leading-7 text-black/70">
        Placeholder page. For now, use the Request button on the homepage to
        contact.
      </p>
    </PageShell>
  );
}


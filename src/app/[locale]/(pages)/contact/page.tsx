import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/site/PageShell";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });
  return (
    <PageShell title={t("contact")}>
      <p className="max-w-2xl text-sm leading-7 text-black/70">
        Placeholder page. For now, use the Request button on the homepage to
        contact.
      </p>
    </PageShell>
  );
}


import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/siteUrl";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  const t = await getTranslations({ locale: safeLocale, namespace: "meta" });
  const base = getSiteUrl();

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: base,
    alternates: {
      canonical: `/${safeLocale}`,
      languages: {
        de: "/de",
        ru: "/ru",
        en: "/en",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/${safeLocale}`,
      siteName: "NKN",
      locale: safeLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Natalia Khreshkova",
          alternateName: "NKN",
          url: new URL(`/${locale}`, getSiteUrl()).toString(),
        }}
      />
      {children}
    </NextIntlClientProvider>
  );
}


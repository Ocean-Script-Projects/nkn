import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/siteUrl";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const pages = ["", "/services", "/pieces", "/upcycling", "/events", "/about", "/contact"];

  const urls: MetadataRoute.Sitemap = [];
  for (const locale of routing.locales) {
    for (const path of pages) {
      const pathname = `/${locale}${path}`;
      urls.push({
        url: new URL(pathname, base).toString(),
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
  }

  return urls;
}


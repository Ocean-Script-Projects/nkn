import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nkn",
  assetPrefix: "/nkn/",
  trailingSlash: true,
  images: { unoptimized: true },
  // Skip API routes during static export (they won't work anyway)
  skipTrailingSlashRedirect: true,
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withNextIntl(nextConfig);

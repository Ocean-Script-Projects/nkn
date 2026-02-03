import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nkn",
  assetPrefix: "/nkn/",
  trailingSlash: true,
  images: { unoptimized: true },
  // Ensure Turbopack resolves the project root correctly even when there are
  // other lockfiles higher up the filesystem (e.g. /Users/.../package-lock.json).
  turbopack: {
    root: process.cwd(),
  },
};
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withNextIntl(nextConfig);

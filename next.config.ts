import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nkn",
  assetPrefix: "/nkn/",
  trailingSlash: true,
  images: { unoptimized: true },
  // Prevent Turbopack from inferring an incorrect workspace root when multiple lockfiles exist
  // (e.g. ~/package-lock.json), which can cause permission errors while scanning parent dirs.
  turbopack: { root: process.cwd() },
};
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withNextIntl(nextConfig);

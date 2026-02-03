import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const repo = 'nkn'; 
const isGithubPages = !!repo; 

const nextConfig: NextConfig = {
  output: "export",

  basePath: isGithubPages ? `/${repo}` : undefined,
  assetPrefix: isGithubPages ? `/${repo}/` : undefined,

  trailingSlash: true,

  images: { unoptimized: true },

  turbopack: {
    root: process.cwd(),
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withNextIntl(nextConfig);

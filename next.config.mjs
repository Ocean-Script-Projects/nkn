import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Убрали output: "export" так как используется middleware и деплой на Heroku
  basePath: "/nkn",
  assetPrefix: "/nkn/",
  trailingSlash: true,
  images: { unoptimized: true },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withNextIntl(nextConfig);

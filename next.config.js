/** @type {import('next').NextConfig} */
const repoName = "aclan-english-coach";
const isProduction = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isProduction ? `/${repoName}` : "",
  assetPrefix: isProduction ? `/${repoName}/` : "",
};

module.exports = nextConfig;

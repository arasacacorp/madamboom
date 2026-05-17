import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Если будет свой домен — уберите basePath
  basePath: "/madamboom",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;

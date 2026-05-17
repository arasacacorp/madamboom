import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
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

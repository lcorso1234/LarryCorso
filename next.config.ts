import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  outputFileTracingRoot: "/Users/lawrencecorso/LarryCorso",
  output: 'standalone',
  trailingSlash: false,
  skipTrailingSlashRedirect: true
};

export default nextConfig;

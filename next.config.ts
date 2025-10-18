import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fail builds on TypeScript errors
  typescript: {
    ignoreBuildErrors: false,
  },
  // Also fail on ESLint errors during build
  eslint: {
    ignoreDuringBuilds: false,
  },
  /* config options here */
};

export default nextConfig;

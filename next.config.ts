import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // your other config options here

  // Disables ESLint errors from failing production builds.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

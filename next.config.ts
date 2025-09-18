import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* other config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.datocms-assets.com",
      },
    ],
  },
};

export default nextConfig;

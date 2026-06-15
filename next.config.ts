import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.higgsfield.ai" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "cdn.higgsfield.ai" },
    ],
  },
};

export default nextConfig;

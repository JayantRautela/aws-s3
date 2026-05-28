import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://d1qs3ublw9b3x4.cloudfront.net/**')],
  },
};

export default nextConfig;

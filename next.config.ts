import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [75, 90] },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;

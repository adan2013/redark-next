import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [],
    // Allow images from the posts directory
    unoptimized: false,
  },
  // Serve static files from posts directory
  async rewrites() {
    return [
      {
        source: "/posts/:year/:path*",
        destination: "/api/images/:year/:path*",
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);

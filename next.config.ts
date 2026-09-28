import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      // Supabase Storage (public "images" bucket)
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // Notion-hosted files, until Writing moves to Supabase
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "s3.us-west-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;

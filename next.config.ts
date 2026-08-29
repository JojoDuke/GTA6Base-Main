import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Featured + inline image uploads. Stay under Vercel's 4.5 MB request cap.
      bodySizeLimit: "4mb",
      allowedOrigins: ["gta6base.io", "www.gta6base.io"],
    },
  },
};

export default nextConfig;

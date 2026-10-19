import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Render static site: build to out/, no image optimizer server
  output: "export",
  images: { unoptimized: true },
  // Allow other devs on the same network to open the dev server via your IP
  allowedDevOrigins: [
    "172.16.*.*",
    "192.168.*.*",
    "10.*.*.*",
  ],
};

export default nextConfig;

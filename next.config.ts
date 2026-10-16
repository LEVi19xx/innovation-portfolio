import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow other devs on the same network to open the dev server via your IP
  allowedDevOrigins: [
    "172.16.*.*",
    "192.168.*.*",
    "10.*.*.*",
  ],
};

export default nextConfig;

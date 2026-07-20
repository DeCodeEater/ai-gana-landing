import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  allowedDevOrigins: ["10.63.53.51", "localhost:3000"],
};

export default nextConfig;

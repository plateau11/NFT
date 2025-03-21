import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ webpack(config) {
    config.externals = config.externals || [];
    config.externals.push("ipfs-http-client");
    return config;
  },
  images: {
    domains: ["gateway.pinata.cloud"],
  },
};

export default nextConfig;

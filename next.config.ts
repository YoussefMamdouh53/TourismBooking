import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  allowedDevOrigins: [
    'ec2-54-146-53-93.compute-1.amazonaws.com'
  ],
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'u20poetryslam.at',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'u20poetryslam.at',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

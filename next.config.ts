import type { NextConfig } from "next";

const nextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  cacheComponents: true,
  poweredByHeader: false,
  skipTrailingSlashRedirect: true,
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  }
} satisfies NextConfig;

export default nextConfig;

import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  skipTrailingSlashRedirect: true,
  trailingSlash: false,
  transpilePackages: ['geist'],
  images: {
    unoptimized: true,
  },
};

export default withMDX(nextConfig);

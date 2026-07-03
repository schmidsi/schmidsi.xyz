import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export so the site can be pinned to IPFS and served via eth.limo
  output: 'export',
  // eth.limo serves plain files: gateways need /posts/foo/index.html, not /posts/foo
  trailingSlash: true,
  // No image optimization server on IPFS
  images: { unoptimized: true },
  transpilePackages: ['ethereum-identity-kit'],
};

export default nextConfig;

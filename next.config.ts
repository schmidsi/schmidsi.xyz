import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export so the site can be pinned to IPFS and served via eth.limo
  output: 'export',
  // eth.limo serves plain files: gateways need /posts/foo/index.html, not /posts/foo
  trailingSlash: true,
  // No image optimization server on IPFS
  images: { unoptimized: true },
  // Next uses a random build id by default, which changes every export and thus
  // the IPFS CID. Pin it so identical content produces an identical CID. Asset
  // chunks are content-hashed, so a constant id is safe across deploys.
  generateBuildId: () => 'ses-box',
  transpilePackages: ['ethereum-identity-kit'],
};

export default nextConfig;

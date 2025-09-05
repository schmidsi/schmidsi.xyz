const withNextra = require("nextra")({
  theme: "./components/Theme",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // any configs you need
  transpilePackages: ['ethereum-identity-kit'],
};

module.exports = withNextra(nextConfig);

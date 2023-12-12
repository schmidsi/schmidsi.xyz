const withNextra = require("nextra")({
  theme: "./components/Theme",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // any configs you need
};

module.exports = withNextra(nextConfig);

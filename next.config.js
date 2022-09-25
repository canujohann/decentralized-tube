/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["test-johann.infura-ipfs.io"],
  },
};

module.exports = nextConfig;

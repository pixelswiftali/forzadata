/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    domains: [],
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};

module.exports = nextConfig;

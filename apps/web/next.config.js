/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@budgetpro/shared'],
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005/api',
  },
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;

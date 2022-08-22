/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['localhost', '*', 'www.mychef.kr', 'www.oasis.co.kr'],
  },
};

module.exports = nextConfig;

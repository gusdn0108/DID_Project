/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['localhost', '*', 'img.hazzys.com'],
  },
};

// const securityHeaders = [
//   {
//     key: 'Referrer-Policy',
//     value: 'origin-when-cross-origin',
//   },
//   {
//     key: 'Access-Control-Allow-Origin',
//     value: '*',
//   },
//   {
//     key: 'Access-Control-Allow-Headers',
//     value: '*',
//   },
// ];

// export const login = {
//   async headers() {
//     return [
//       {
//         source: '/login',
//         headers: securityHeaders,
//       },
//     ];
//   },
// };

module.exports = nextConfig;

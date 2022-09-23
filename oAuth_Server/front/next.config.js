/** @type {import('next').NextConfig} */
// const nextConfig = {
// 	reactStrictMode: true,
// 	swcMinify: true,
// };

const securityHeaders = [
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Access-Control-Allow-Origin',
    value: '*',
  },
  {
    key: 'Access-Control-Allow-Headers',
    value: '*',
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/userAppRegister',
        headers: securityHeaders,
      },
      {
        source: '/authorize',
        headers: securityHeaders,
      },
      {
        source: '/locallogin',
        headers: securityHeaders,
      },
    ];
  },
};

/** @type {import('next').NextConfig} */
// const nextConfig = {
// 	reactStrictMode: true,
// 	swcMinify: true,
// };

// module.exports = nextConfig;

const securityHeaders = [
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Access-Control-Allow-Origin",
    value: "*",
  },
  {
    key: "Access-Control-Allow-Headers",
    value: "*",
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: "/userAppRegister",
        headers: securityHeaders,
      },
    ];
  },
};

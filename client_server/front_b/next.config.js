/** @type {import('next').NextConfig} */
// const nextConfig = {
//   // reactStrictMode: true,
//   //  swcMinify: true,
//   async headers() {
//     return [
//       {
//         source: "/login",
//         headers: [
//           {
//             key: "Access-Contrtol-Allow-Origin",
//             value: "*",
//           },
//         ],
//       },
//     ];
//   },
// };

// module.exports = nextConfig;

// module.exports = {
//   async headers() {
//     return [
//       {
//         source: "/",
//         headers: [
//           {
//             key: "Access-Contrtol-Allow-Origin",
//             value: "*",
//           },
//         ],
//       },
//     ];
//   },
// };

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
        source: "/login",
        headers: securityHeaders,
      },
    ];
  },
};

/** @type {import('next').NextConfig} */

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(self), microphone=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "style-src 'self' 'unsafe-inline' *.gstatic.com *.googleapis.com https://*.icomoon.io; script-src 'self' *.googletagmanager.com *.tradingview.com 'unsafe-eval' 'unsafe-inline' vitals.vercel-insights.com https://hodl-watch.vercel.app/ *.hodl-watch.vercel.app/",
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  images: {
    //TODO: Update this to allow more domains/figure out wildcard strategy
    domains: [
      "www.google.com",
      "lh3.googleusercontent.com",
      "assets.coingecko.com",
      "resources.cryptocompare.com",
      "images.cryptocompare.com",
      "hodl-watch.vercel.app",
      "https://github.com/",
      "github.com",
      "github.githubassets.com",
    ],
  },
};

module.exports = nextConfig;

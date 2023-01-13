/** @type {import('next').NextConfig} */
const nextConfig = {
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

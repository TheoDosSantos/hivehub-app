const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    scope: '/app',
    skipWaiting: true,
    runtimeCaching,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
    // next config
});
module.exports = nextConfig;

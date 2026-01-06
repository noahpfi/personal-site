import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const withPWA = require('next-pwa')({
  dest: 'public', // Destination directory for the service worker files
  register: true, // Automatically register the service worker
  skipWaiting: true, // Install new service worker without waiting
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development
});

export default withPWA(nextConfig);

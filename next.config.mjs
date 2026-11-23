/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // The app has localized root layouts; a global error document is necessary
  // for unknown/unsupported locales without a request-time Next.js server.
  experimental: { globalNotFound: true },
  allowedDevOrigins: ['*.e2b.app'],
  images: {
    unoptimized: true,
    formats: ['image/webp'],
  },
};

export default nextConfig;

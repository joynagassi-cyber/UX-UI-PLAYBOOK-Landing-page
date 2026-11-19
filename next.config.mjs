/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  allowedDevOrigins: ['*.e2b.app'],
  images: {
    unoptimized: true,
    formats: ['image/webp'],
  },
};

export default nextConfig;

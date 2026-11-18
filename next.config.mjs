/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['*.e2b.app'],
  images: {
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/fr.html',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/en.html',
        destination: '/en',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

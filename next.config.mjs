/** @type {import('next').NextConfig} */
const nextConfig = {
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

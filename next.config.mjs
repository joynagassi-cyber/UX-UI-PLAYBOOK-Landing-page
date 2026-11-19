/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export the localized landing pages as static HTML for Cloudflare Pages.
  output: 'export',
  allowedDevOrigins: ['*.e2b.app'],
  images: {
    // Required for static hosting; the site currently uses local public assets.
    unoptimized: true,
    formats: ['image/webp'],
  },
};

export default nextConfig;

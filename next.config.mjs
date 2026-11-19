/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generate HTML/CSS/JS assets that Cloudflare Pages can serve without a Node server.
  output: 'export',
  allowedDevOrigins: ['*.e2b.app'],
  images: {
    // Static hosting cannot use the Next.js image optimization server.
    unoptimized: true,
    formats: ['image/webp'],
  },
};

export default nextConfig;

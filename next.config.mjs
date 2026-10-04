/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Essential for GitHub Pages static hosting
  images: {
    unoptimized: true, // Required for static export with external image assets
  },
};

export default nextConfig;
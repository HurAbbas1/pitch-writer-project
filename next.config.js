/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    appDir: true, // ✅ Required for App Router
  },
}

module.exports = nextConfig

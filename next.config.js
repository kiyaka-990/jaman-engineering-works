/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  // ─── IMAGE CONFIGURATION ───────────────────────────────────────────────
  images: {
    // LOCAL IMAGES: files inside /public are served automatically.
    // Use:   <Image src="/images/hero.jpg" />   (no "public" in path)
    // Use:   <img   src="/images/hero.jpg" />

    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],

    formats: ['image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 604800,
    unoptimized: false,
  },

  // ─── PATH ALIAS ────────────────────────────────────────────────────────
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    return config
  },

  // ─── GENERAL ───────────────────────────────────────────────────────────
  reactStrictMode: true,
  compress: true,
  trailingSlash: false,
  poweredByHeader: false,

  // ─── SECURITY HEADERS ─────────────────────────────────────────────────
  // NOTE: Next.js route `source` uses path-to-regexp syntax — NOT regex.
  // Dots and parentheses are not allowed. Keep patterns simple.
  async headers() {
    return [
      {
        // Apply security headers to every page and API route
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options',  value: 'nosniff' },
          { key: 'X-Frame-Options',          value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection',         value: '1; mode=block' },
          { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',       value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Long-cache everything under /public/images/
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },

  // ─── REDIRECTS ─────────────────────────────────────────────────────────
  async redirects() {
    return [
      // { source: '/old', destination: '/new', permanent: true },
    ]
  },
}

module.exports = nextConfig

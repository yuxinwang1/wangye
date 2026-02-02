/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // 静态化优化
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig

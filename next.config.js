/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'huggingface.co'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig

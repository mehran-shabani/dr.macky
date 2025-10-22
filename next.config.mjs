import { withContentlayer } from 'next-contentlayer2'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
}

export default withContentlayer(nextConfig)

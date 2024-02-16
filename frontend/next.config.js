/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost", "picsum.photos", "loremflickr.com", "www.adobe.com", "images.pexels.com"],
  },
}

module.exports = nextConfig

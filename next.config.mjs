import withSvgr from '@newhighsco/next-plugin-svgr'

const nextConfig = withSvgr({
  swcMinify: true,
  reactStrictMode: false,
  images: {
    domains: ['mcdev.sfo3.digitaloceanspaces.com']
  }
})

export default nextConfig

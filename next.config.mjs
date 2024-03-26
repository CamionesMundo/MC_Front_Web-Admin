import withSvgr from '@newhighsco/next-plugin-svgr'

const nextConfig = withSvgr({
  swcMinify: true,
  reactStrictMode: false
})

export default nextConfig
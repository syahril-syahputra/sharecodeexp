module.exports = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
    }
  },
  images: {
    unoptimized: true,
  },
}

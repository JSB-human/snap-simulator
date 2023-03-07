/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites(){
    return [
      {
        source : "/snapinven/:path*",
        destination : "https://marvelsnap.inven.co.kr/:path*"
      }
    ]
  },
  images : {
    domains : ['marvelsnapzone.com']
  }
}



module.exports = nextConfig

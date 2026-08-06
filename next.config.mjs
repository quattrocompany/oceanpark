/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'oceanosasco.com.br',
          },
        ],
        destination: 'https://www.oceanosasco.com.br/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'oceanosasco.com.br',
          },
        ],
        destination: 'https://www.oceanosasco.com.br/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
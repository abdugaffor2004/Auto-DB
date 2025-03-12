import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/statistics',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'ns-webcams.its.sfu.ca',
          port: '',
          pathname: '/public/images/**',
        },
      ],
    },
  }

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com'
            },
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
            },
            {
                protocol: 'http',
                hostname: 'example.com',
            },
            {
                protocol: 'https',
                hostname: 'example.com',
            },
        ],
    },
};

export default nextConfig;

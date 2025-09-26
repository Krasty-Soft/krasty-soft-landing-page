import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    //output: 'export',
    allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
    images: {
        // for contentful images
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.ctfassets.net',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'assets.ctfassets.net',
                pathname: '/**',
            },
        ],
    },
    webpack(config) {
        // eslint-disable-next-line
        const fileLoaderRule = config.module.rules.find((rule: any) =>
            rule.test?.test?.('.svg')
        )
        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/,
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: {
                    not: [...fileLoaderRule.resourceQuery.not, /url/],
                },
                use: ['@svgr/webpack'],
            }
        )
        fileLoaderRule.exclude = /\.svg$/i

        return config
    },
}

export default nextConfig

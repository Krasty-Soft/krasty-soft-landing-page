import type { NextConfig } from "next";

import { REDIRECTS } from "./src/constants/redirects";

// Warn at build time if the canonical site URL isn't configured. Without it,
// absolute URLs baked into the HTML (og:image, canonical, sitemap, schema)
// fall back to a hardcoded default that may not serve this deployment — and
// social crawlers do not reliably follow redirects to fetch og:image.
if (
  !process.env.NEXT_PUBLIC_SITE_URL &&
  process.env.NODE_ENV === "production"
) {
  console.warn(
    "⚠️  NEXT_PUBLIC_SITE_URL is not set. Absolute URLs (og:image, canonical, " +
      'sitemap, Schema.org) will fall back to "https://www.krastysoft.com". Set ' +
      "NEXT_PUBLIC_SITE_URL in the Vercel project env to the host that actually " +
      "serves this deployment (e.g. https://krastysoft.com or " +
      "https://www.krastysoft.com). Do NOT use a host that 301-redirects to " +
      "another host — og:image is baked at build time and crawlers will not " +
      "follow the redirect to fetch the image.",
  );
}

const nextConfig: NextConfig = {
  //output: 'export',
  trailingSlash: false,
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  async redirects() {
    return REDIRECTS.map(({ source, destination }) => ({
      source,
      destination,
      statusCode: 301,
    }));
  },
  images: {
    // Image optimization enabled for better Core Web Vitals
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.ctfassets.net",
        pathname: "/**",
      },
    ],
  },
  webpack(config) {
    // eslint-disable-next-line
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg"),
    );
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
        use: ["@svgr/webpack"],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;

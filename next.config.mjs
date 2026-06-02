/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export" — only enable for Netlify-drop / pure static hosts.
  // Disabled for Vercel which serves Next.js natively (handles routing).
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental: { optimizePackageImports: ["framer-motion"] },
  async redirects() {
    return [
      { source: "/szkolenie-ai", destination: "/pomorskie", permanent: true },
    ];
  }
};

export default nextConfig;

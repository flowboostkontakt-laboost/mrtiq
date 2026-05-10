/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental: { optimizePackageImports: ["framer-motion"] }
};

export default nextConfig;

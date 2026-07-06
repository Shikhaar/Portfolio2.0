import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.3.243",
    "192.168.3.243:3000",
    "192.168.0.103",
    "192.168.0.103:3000"
  ],
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    mdxRs: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withMDX(nextConfig);

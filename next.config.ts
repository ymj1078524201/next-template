import type { NextConfig } from "next";
import "./lib/env";
import nextBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
};

export default withBundleAnalyzer(nextConfig);

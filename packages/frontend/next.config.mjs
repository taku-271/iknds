import { ModuleResolutionKind } from "typescript";
import pwa from "next-pwa";

/** @type {import('next').NextConfig} */
const withPWA = pwa({
  dest: "public",
  register: true,
  skipWaiting: true,
});

export default withPWA({
  reactStrictMode: true,
});

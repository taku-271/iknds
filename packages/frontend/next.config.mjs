import { ModuleResolutionKind } from 'typescript';
import pwa from 'next-pwa';

/** @type {import('next').NextConfig} */
const withPWA = pwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  output: 'standalone',
});

export default withPWA({
  reactStrictMode: true,
});

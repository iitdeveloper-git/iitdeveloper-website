/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'iitdeveloper.com' },
      { protocol: 'http', hostname: 'localhost' },
    ],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },
  
  experimental: { optimizePackageImports: ['lucide-react', 'framer-motion'] },
  async redirects() {
    return [
      { source: '/services/ai-agents', destination: '/services/ai-automation', permanent: true },
      { source: '/services/ai-workflows', destination: '/services/ai-automation', permanent: true },
      { source: '/services/devops-cloud', destination: '/services/cloud-devops', permanent: true },
      { source: '/services/website-development', destination: '/services/software-development', permanent: true },
      { source: '/services/app-development', destination: '/services/software-development', permanent: true },
      { source: '/services/seo-smm', destination: '/services/seo-geo-ai-visibility', permanent: true },
      { source: '/case-studies', destination: '/work', permanent: true },
      { source: '/projects', destination: '/work', permanent: true },
    ];
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https://api.resend.com https://*.neon.tech; frame-ancestors 'self'; base-uri 'self'; form-action 'self';" },
      ],
    }];
  },
  
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
      'pdfkit': 'commonjs pdfkit',
      'fontkit': 'commonjs fontkit',
      'iconv-lite': 'commonjs iconv-lite',
    });
    return config;
  },
};

module.exports = nextConfig;

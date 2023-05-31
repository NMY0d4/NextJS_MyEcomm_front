/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  plugins: ['tailwindcss'],
};

module.exports = nextConfig;

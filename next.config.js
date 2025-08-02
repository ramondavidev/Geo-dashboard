/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    NEXT_PUBLIC_OPENWEATHER_API_KEY:
      process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
  },
  images: {
    domains: ["openweathermap.org"],
  },
};

export default nextConfig;

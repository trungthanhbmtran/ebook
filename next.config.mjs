/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Thêm các cấu hình Next.js khác nếu cần
  // allowedDevOrigins: ['113.184.220.5'],
  images: {
    qualities: [60, 75],
  },
};

export default nextConfig;

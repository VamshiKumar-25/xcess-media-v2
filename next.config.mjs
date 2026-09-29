import os from 'node:os'

function getAllowedOrigins() {
  const origins = [
    'localhost',
    'localhost:3000',
    '127.0.0.1',
    '127.0.0.1:3000',
    '0.0.0.0',
    '0.0.0.0:3000',
    '192.168.*',
    '10.*',
    '172.16.*',
    '*.local',
  ]
  try {
    const interfaces = os.networkInterfaces()
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name] || []) {
        if (iface.family === 'IPv4' || iface.family === 4) {
          origins.push(iface.address)
          origins.push(`${iface.address}:3000`)
        }
      }
    }
  } catch (e) {
    // fallback
  }
  return Array.from(new Set(origins))
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: getAllowedOrigins(),
}

export default nextConfig

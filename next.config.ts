import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "3000-firebase-nepal-license-1780579022591.cluster-nulpgqge5rgw6rwqiydysl6ocy.cloudworkstations.dev",
    "*.app.github.dev",
  ],

  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "*.app.github.dev"],
    },
  },

  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
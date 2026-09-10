import type { NextConfig } from "next";

/**
 * Hosts the dev server accepts requests from. Next only reads this in development, so it
 * costs nothing in production — it exists so the site can be worked on from a cloud
 * workstation or a Codespace, where the browser origin is not localhost.
 */
const DEV_ORIGINS = [
  "3000-firebase-nepal-license-1780579022591.cluster-nulpgqge5rgw6rwqiydysl6ocy.cloudworkstations.dev",
  "*.app.github.dev",
];

const nextConfig: NextConfig = {
  allowedDevOrigins: DEV_ORIGINS,

  /**
   * Server Action origins are a CSRF control: a request whose Origin is on this list is
   * allowed to invoke a Server Action. The cloud-workstation hosts have to be here for
   * development to work at all, but `*.app.github.dev` is a domain anyone can get a
   * Codespace on — trusting it in production would let any of them post to our actions.
   *
   * So it is applied in development only. Production keeps Next's default, which is to
   * accept the deployment's own origin and nothing else.
   */
  ...(process.env.NODE_ENV === "development"
    ? {
        experimental: {
          serverActions: {
            allowedOrigins: ["localhost:3000", ...DEV_ORIGINS],
          },
        },
      }
    : {}),

  async headers() {
    return [
      {
        // A stale service worker would keep serving old rules until its cache expired,
        // so this one is always revalidated (Next's PWA guide asks for the same).
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;

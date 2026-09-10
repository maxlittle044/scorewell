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

  experimental: {
    serverActions: {
      /**
       * Next defaults this to 1MB, and a Server Action that exceeds it is rejected with a 413
       * before any of our code runs — so the visitor sees nothing at all. A payment screenshot
       * taken on a phone is routinely 2-5MB, which meant attaching proof of payment, pressing
       * submit, and having the page sit there.
       *
       * Set above the 5MB screenshot cap in lib/input-limits.ts, with room for the boundaries
       * and part headers multipart adds. The real limit is the one in that file, because that
       * is the one that can explain itself to the person uploading.
       */
      bodySizeLimit: "6mb",

      /**
       * Origins allowed to invoke a Server Action — a CSRF control. The cloud-workstation
       * hosts have to be here for development to work at all, but `*.app.github.dev` is a
       * domain anyone can get a Codespace on, and trusting it in production would let any of
       * them post to our actions. Development only; production keeps Next's default of the
       * deployment's own origin and nothing else.
       */
      ...(process.env.NODE_ENV === "development"
        ? { allowedOrigins: ["localhost:3000", ...DEV_ORIGINS] }
        : {}),
    },
  },

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

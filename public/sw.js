/*
 * Offline support for already-visited pages (site-build-prompt.md section 8).
 *
 * Hand-written rather than generated, because the risk here is not writing a cache — it is
 * caching the wrong thing. A service worker outlives a deploy and lives in the user's
 * browser, so the rules below are deliberately narrow:
 *
 *  - **Navigations are network-first.** A logged-in learner must never be shown a stale
 *    page while online. The cache is a fallback for when the network fails, nothing more.
 *  - **Private routes are never cached.** Anything behind auth, anything that mutates, and
 *    every API route is passed straight through, so one person's dashboard can never be
 *    served to the next person on a shared device.
 *  - **Only GET, only same-origin.** POSTs are not cacheable and cross-origin responses
 *    are none of our business.
 *  - **Hashed build assets are cache-first**, since their URL changes when they change.
 *
 * Bump VERSION to invalidate everything; activate deletes any cache that isn't current.
 */

const VERSION = "v1";
const STATIC_CACHE = `scorewell-static-${VERSION}`;
const PAGE_CACHE = `scorewell-pages-${VERSION}`;

const OFFLINE_URL = "/offline";
const PRECACHE = [OFFLINE_URL, "/icon-192.png", "/icon-512.png"];

/** Never cached: authenticated, personal, or mutating. */
const PRIVATE_PATHS = [
  /^\/api\//,
  /^\/dashboard/,
  /^\/admin/,
  /^\/login/,
  /^\/checkout/,
  /^\/learning-path/,
  /^\/simulation/,
  /^\/reviews/,
];

function isPrivate(pathname) {
  return PRIVATE_PATHS.some((pattern) => pattern.test(pathname));
}

/** Content-hashed by the build, so the URL changes whenever the bytes do. */
function isImmutableAsset(pathname) {
  return pathname.startsWith("/_next/static/");
}

function isOwnStaticFile(pathname) {
  return /\.(png|svg|ico|webmanifest|woff2?)$/.test(pathname);
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      // A precache miss must not block installation, or one 404 disables offline entirely.
      .catch(() => undefined)
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== PAGE_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (isPrivate(url.pathname)) return;

  if (isImmutableAsset(url.pathname) || isOwnStaticFile(url.pathname)) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ??
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
            }
            return response;
          }),
      ),
    );
    return;
  }

  // Page navigations: always try the network first, fall back to what we have.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(PAGE_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const offline = await caches.match(OFFLINE_URL);
          return (
            offline ??
            new Response("You are offline.", {
              status: 503,
              headers: { "Content-Type": "text/plain" },
            })
          );
        }),
    );
  }
});

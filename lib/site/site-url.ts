/**
 * The site's canonical origin, used anywhere an absolute URL is required — the XML sitemap,
 * robots.txt, and `metadataBase` for canonical and share tags.
 *
 * Resolution order, most explicit first:
 *
 * 1. `NEXT_PUBLIC_SITE_URL` — set this the day a real domain is bought. It is the only thing
 *    that needs to change; every absolute URL on the site follows from it.
 * 2. `VERCEL_PROJECT_PRODUCTION_URL` — Vercel sets this on every deployment to the project's
 *    *production* domain, so preview deployments still emit production URLs rather than
 *    advertising a throwaway preview host to search engines.
 * 3. localhost, for local development.
 *
 * Kept in one place because a sitemap and a robots.txt that disagree about the site's address
 * are worse than neither: they tell a crawler to fetch URLs that canonicalise elsewhere.
 */

// const FALLBACK = "http://localhost:3000";
const FALLBACK = "https://super-duper-guide-6994rpg67xwrh4qq5-3000.app.github.dev";

function resolve(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  // Vercel supplies a bare host, with no scheme.
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;

  return FALLBACK;
}

export const SITE_URL = resolve();

/** Joins a site-root-relative path onto the canonical origin. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

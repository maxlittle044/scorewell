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

/**
 * Localhost, and it must stay localhost.
 *
 * This is the value used when neither NEXT_PUBLIC_SITE_URL nor Vercel's production URL is
 * available — in other words, only when nobody has said where the site lives. It briefly held
 * a developer's Codespace hostname, which is the kind of thing that works perfectly until the
 * day the environment variable is missing in production and every canonical URL, sitemap
 * entry and share card starts pointing at a stranger's machine.
 *
 * To develop against a tunnelled or cloud host, set NEXT_PUBLIC_SITE_URL in your own .env —
 * that is what the first branch of resolve() is for, and it stays on your machine.
 */
const FALLBACK = "http://localhost:3000";

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

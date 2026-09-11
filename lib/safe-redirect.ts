/**
 * Where a visitor may be sent once they have signed in.
 *
 * A sign-in page that follows a `callbackUrl` wherever it points is a textbook open redirect:
 * a link to our own login page could deliver someone, freshly authenticated and trusting the
 * address bar they just saw, to any site the link's author chose. So the value is treated as
 * hostile until proven to be a path on this site.
 */

/** Where people land when there is no usable destination — the same place they always did. */
const FALLBACK = "/dashboard";

/** A throwaway origin to resolve against; only used to see whether a value escapes it. */
const PROBE_ORIGIN = "https://scorewell.invalid";

export function safeCallbackUrl(value: unknown): string {
  if (typeof value !== "string") return FALLBACK;
  const candidate = value.trim();

  // One leading slash and no more: "//evil.example" is protocol-relative and leaves the site,
  // and browsers read "/\evil.example" the same way.
  if (!candidate.startsWith("/") || candidate.startsWith("//") || candidate.includes("\\")) {
    return FALLBACK;
  }

  try {
    // Resolving it catches whatever the string checks above miss, such as encoded slashes.
    const url = new URL(candidate, PROBE_ORIGIN);
    if (url.origin !== PROBE_ORIGIN) return FALLBACK;
    // Returning someone to the form they just completed would look like sign-in had failed.
    if (url.pathname === "/login") return FALLBACK;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return FALLBACK;
  }
}

/**
 * The login URL for a page that needs a session, so the visitor comes back to that page
 * afterwards instead of being dropped on the dashboard and left to find their way again.
 */
export function loginUrl(returnTo?: string, options: { mode?: "signup" } = {}): string {
  const query = new URLSearchParams();
  if (options.mode) query.set("mode", options.mode);
  if (returnTo && returnTo !== FALLBACK) query.set("callbackUrl", returnTo);
  const qs = query.toString();
  return qs ? `/login?${qs}` : "/login";
}

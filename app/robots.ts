import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site/site-url";

/**
 * `/robots.txt`. Its main job is not blocking anything — it is telling crawlers where the
 * sitemap is, which is how the content gets discovered at all.
 *
 * The disallow list is small on purpose. These are pages that are either behind a session or
 * meaningless to a crawler; blocking anything else would risk hiding content the site exists
 * to surface. Note that `Disallow` is a crawling instruction, not an access control — every
 * one of these routes is protected by `auth()` regardless of what a crawler chooses to do.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin",
        "/dashboard",
        "/checkout",
        "/login",
        // Printable variants of pages that are already indexed in their normal form.
        "/print/",
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}

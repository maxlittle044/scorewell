import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { SECTION_GROUPS } from "@/lib/site/site-sections";

export const metadata: Metadata = {
  title: "Sitemap — ScoreWell",
};

/**
 * The list itself now lives in `lib/site/site-sections.ts`, shared with the XML sitemap at
 * `/sitemap.xml`. This page shows every section, including the few kept out of search results
 * — a person looking for the dashboard should still find it here.
 */
const GROUPS = SECTION_GROUPS;


export default function SitemapPage() {
  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Sitemap" />

        <div data-reveal-group className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((group) => (
            <div key={group.heading}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
                {group.heading}
              </h2>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink-body hover:text-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

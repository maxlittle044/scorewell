import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { cn } from "@/lib/cn";
import { formatAnnouncementDate, listAnnouncements } from "@/lib/content/announcements";

export const metadata: Metadata = {
  title: "What's new — ScoreWell",
  description: "Changes and additions to ScoreWell, newest first.",
};

const KIND_STYLES = {
  New: "bg-pop-50 text-pop-700",
  Improved: "bg-brand-50 text-brand-700",
  Fixed: "bg-accent-100 text-accent-600",
} as const;

/**
 * The announcements feed. Entries are short, so the whole post is shown inline rather than
 * behind a "read more" that would lead to a page with two paragraphs on it — the link on
 * an entry goes to the feature it is about instead.
 */
export default async function AnnouncementsPage() {
  const announcements = await listAnnouncements();

  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="What's new"
          description="Changes and additions to ScoreWell, newest first."
        />

        {announcements.length === 0 ? (
          <p className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center text-sm text-zinc-500">
            Nothing here yet.
          </p>
        ) : (
          <ol className="flex flex-col gap-8">
            {announcements.map((announcement) => (
              <li
                key={announcement.slug}
                className="border-b border-zinc-100 pb-8 last:border-0 last:pb-0"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide",
                      KIND_STYLES[announcement.kind],
                    )}
                  >
                    {announcement.kind}
                  </span>
                  <time
                    dateTime={announcement.date}
                    className="text-xs font-medium text-zinc-500"
                  >
                    {formatAnnouncementDate(announcement.date)}
                  </time>
                </div>

                <h2 className="font-display text-lg font-bold text-zinc-900">
                  {announcement.title}
                </h2>

                <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-zinc-700">
                  {announcement.body.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {announcement.link && (
                  <Link
                    href={announcement.link.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-accent-600"
                  >
                    {announcement.link.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </main>
  );
}

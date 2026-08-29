import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You're offline — ScoreWell",
};

/**
 * Shown by the service worker when a page is requested with no connection and nothing
 * cached for it. Deliberately static and dependency-free: it has to render from cache with
 * no network and no database.
 */
export default function OfflinePage() {
  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-lg px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-ink">You&apos;re offline</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-body">
          This page hasn&apos;t been opened on this device before, so there&apos;s no saved
          copy to show you. Pages you have already visited will still open while you&apos;re
          offline.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-body">
          Anything you submit — a test, a written answer, a sitting — needs a connection to
          be saved, so it&apos;s worth waiting until you&apos;re back online before starting
          one.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Try again
          </Link>
        </div>
      </div>
    </main>
  );
}

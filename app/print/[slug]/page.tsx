import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/content/print-button";
import { PrintableAnswerKey, PrintableDocBody } from "@/components/content/printable-doc";
import { getPrintable } from "@/lib/content/printable";
import { titleFromSlug } from "@/lib/slug";

export async function generateMetadata({
  params,
}: PageProps<"/print/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getPrintable(slug);
  return {
    title: `${doc?.title ?? titleFromSlug(slug)} — print version | ScoreWell`,
    // A print sheet duplicates a test that is already indexed on its own page.
    robots: { index: false, follow: false },
  };
}

export default async function PrintPage({ params }: PageProps<"/print/[slug]">) {
  const { slug } = await params;
  const doc = await getPrintable(slug);

  if (!doc) {
    return (
      <main className="mx-auto w-full max-w-2xl px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-ink">{titleFromSlug(slug)}</h1>
        <p className="mt-4 text-sm text-ink-muted">
          There&apos;s no printable version of that test.{" "}
          <Link href="/exam-library" className="font-medium text-link hover:underline">
            Browse the library
          </Link>
          .
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10 print:max-w-none print:px-0 print:py-0">
      {/* Screen-only controls; the print stylesheet drops them from the sheet. */}
      <div
        data-print-controls
        className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface-muted p-4 print:hidden"
      >
        <p className="text-sm text-ink-body">
          Print this test, or save it as a PDF from your browser&apos;s print dialog.
        </p>
        <PrintButton />
      </div>

      <PrintableDocBody doc={doc} />

      {/* The key starts a new sheet so the test can be attempted before it is seen. */}
      <PrintableAnswerKey doc={doc} />

      <p className="mt-10 text-xs text-ink-muted print:mt-6">
        ScoreWell · scorewell.app — for personal study use.
      </p>
    </main>
  );
}

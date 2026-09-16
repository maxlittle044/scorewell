import type { Metadata } from "next";
import Link from "next/link";
import { FullPaperRunner } from "@/components/exam/full-paper-runner";
import { getFullReadingPaper } from "@/lib/content/full-paper";
import { titleFromSlug } from "@/lib/slug";

export async function generateMetadata({
  params,
}: PageProps<"/ielts/reading/full/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const paper = await getFullReadingPaper(slug);
  return {
    title: `${paper?.title ?? titleFromSlug(slug)} — ScoreWell`,
  };
}

export default async function FullReadingPaperPage({
  params,
}: PageProps<"/ielts/reading/full/[slug]">) {
  const { slug } = await params;
  const paper = await getFullReadingPaper(slug);

  if (!paper) {
    return (
      <main className="flex flex-1 flex-col bg-surface">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-ink">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-ink-muted">
            This full paper isn&apos;t available.{" "}
            <Link href="/ielts/reading" className="font-medium text-link hover:underline">
              Browse reading tests
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display mb-6 text-2xl font-bold text-ink">{paper.title}</h1>
        <FullPaperRunner paper={paper} />
      </div>
    </main>
  );
}

import Link from "next/link";
import { Quiz } from "@/components/content/quiz";
import { TagList } from "@/components/content/tag-list";
import { getQuizContent } from "@/lib/content/quiz-content";
import { titleFromSlug } from "@/lib/slug";

export default async function GrammarTestPage({
  params,
}: PageProps<"/ielts/grammar-tests/[slug]">) {
  const { slug } = await params;
  const test = await getQuizContent(slug, "grammar-test");

  if (!test) {
    return (
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-zinc-900">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-zinc-500">
            This test isn&apos;t available yet.{" "}
            <Link href="/ielts/grammar-tests" className="font-medium text-brand-600 hover:underline">
              Browse all grammar tests
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-xl font-bold text-zinc-900">{test.title}</h1>
        <Quiz questions={test.questions} title={test.title} contentItemId={test.id} />
        <TagList tags={test.tags} />
      </div>
    </main>
  );
}

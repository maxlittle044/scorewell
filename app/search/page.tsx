import type { Metadata } from "next";
import Link from "next/link";
import { SearchIcon } from "@/components/layout/icons";
import { search } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search — ScoreWell",
};

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const results = query ? await search(query) : [];

  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Search tests, articles, and tools
        </h1>

        <form action="/search" className="mt-6">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search tests, tips, tools..."
              autoFocus
              className="w-full rounded-full border border-zinc-300 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </form>

        <div className="mt-10">
          {!query ? (
            <p className="text-sm text-zinc-500">
              Enter a search term to find practice tests, tips, and tools.
            </p>
          ) : results.length === 0 ? (
            <>
              <p className="text-sm text-zinc-500">
                No results for <span className="font-medium text-zinc-800">&ldquo;{query}&rdquo;</span>
              </p>
              <div className="mt-6 rounded-xl border border-dashed border-zinc-300 px-6 py-10 text-center">
                <p className="text-sm text-zinc-500">
                  Try a different term, or browse{" "}
                  <Link href="/ielts/reading" className="font-medium text-brand-600 hover:underline">
                    reading tests
                  </Link>{" "}
                  and{" "}
                  <Link href="/ielts/tips" className="font-medium text-brand-600 hover:underline">
                    tips
                  </Link>
                  .
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-zinc-500">
                {results.length} result{results.length === 1 ? "" : "s"} for{" "}
                <span className="font-medium text-zinc-800">&ldquo;{query}&rdquo;</span>
              </p>
              <ul className="mt-4 flex flex-col divide-y divide-zinc-100 rounded-2xl border border-zinc-200">
                {results.map((result) => (
                  <li key={`${result.kind}-${result.href}`}>
                    <Link
                      href={result.href}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-zinc-50"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-zinc-900">{result.title}</p>
                        {result.excerpt && (
                          <p className="mt-0.5 truncate text-sm text-zinc-500">{result.excerpt}</p>
                        )}
                      </div>
                      <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
                        {result.kind}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

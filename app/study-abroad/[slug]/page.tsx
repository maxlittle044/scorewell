import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { TagList } from "@/components/content/tag-list";
import { getDestination, listDestinations } from "@/lib/content/study-abroad";
import { titleFromSlug } from "@/lib/slug";

export async function generateStaticParams() {
  const destinations = await listDestinations();
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/study-abroad/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestination(slug);
  return {
    title: `${destination?.title ?? titleFromSlug(slug)} — ScoreWell`,
    description: destination?.summary,
  };
}

function List({ heading, items }: { heading: string; items: string[] }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
        {heading}
      </h2>
      <ul className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={i} className="border-l-2 border-brand-200 pl-3 text-sm leading-relaxed text-ink-body">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function DestinationPage({ params }: PageProps<"/study-abroad/[slug]">) {
  const { slug } = await params;
  const destination = await getDestination(slug);

  if (!destination) {
    return (
      <main className="flex flex-1 flex-col bg-surface">
        <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-ink">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-ink-muted">
            There&apos;s no page for that destination.{" "}
            <Link href="/study-abroad" className="font-medium text-link hover:underline">
              See all destinations
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <Link href="/study-abroad" className="text-sm font-medium text-link hover:underline">
          ← All destinations
        </Link>

        <div className="mt-4">
          <PageHeader title={destination.title} description={destination.summary} />
        </div>

        <List heading="What the score is read for" items={destination.usedFor} />
        <List heading="Which test to book" items={destination.whichTest} />
        <List heading="Before you book a date" items={destination.beforeYouBook} />

        <section className="mt-8 rounded-2xl border border-line bg-surface-muted p-5">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
            The official source
          </h2>
          <p className="mb-3 text-sm leading-relaxed text-ink-body">
            We don&apos;t reprint the required score, because it changes and it differs by
            course. These pages hold the current one.
          </p>
          <ul className="flex flex-col gap-2">
            {destination.officialSources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-link hover:underline"
                >
                  {source.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-ink-muted">
            {/* Not "Institutions in {country}": the article some country names need ("in
                the United Kingdom") and others reject would have to be stored per row. */}
            Institutions — {destination.country}
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-ink-body">
            Linked to their own sites. Not a ranking, not a shortlist, and no affiliation with
            ScoreWell — read each one&apos;s English-language requirements yourself.
          </p>

          {destination.institutions.length === 0 ? (
            <p className="text-sm text-ink-muted">No institutions listed here yet.</p>
          ) : (
            <ul className="divide-y divide-line rounded-2xl border border-line">
              {destination.institutions.map((institution) => (
                <li
                  key={institution.url}
                  className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">{institution.name}</p>
                    <p className="text-xs text-ink-muted">{institution.city}</p>
                  </div>
                  <a
                    href={institution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-link hover:underline"
                  >
                    Official site ↗
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-10 rounded-2xl border border-line p-5">
          <h2 className="text-sm font-semibold text-ink">Getting the score itself</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-body">
            Once you know what the university and the immigration service each want, the rest
            is practice.{" "}
            <Link href="/exam-library" className="font-medium text-link hover:underline">
              Practice tests
            </Link>
            ,{" "}
            <Link
              href="/tools/band-calculator/overall"
              className="font-medium text-link hover:underline"
            >
              the band calculator
            </Link>
            , and{" "}
            <Link href="/exam-registration" className="font-medium text-link hover:underline">
              how registration works
            </Link>
            .
          </p>
        </section>

        <TagList tags={destination.tags} />
      </div>
    </main>
  );
}

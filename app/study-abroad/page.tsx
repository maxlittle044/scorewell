import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { collectInstitutions, listDestinations } from "@/lib/content/study-abroad";

export const metadata: Metadata = {
  title: "Study abroad — ScoreWell",
  description:
    "Where an IELTS score is read, what it is read for, and the official page that holds each country's current requirement.",
};

export default async function StudyAbroadPage() {
  const destinations = await listDestinations();
  const institutions = collectInstitutions(destinations);

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Study abroad"
          description="Where your score gets read, who reads it, and the official page that holds the number."
        />

        {destinations.length === 0 ? (
          <p className="text-sm text-ink-muted">No destinations here yet.</p>
        ) : (
          <>
            {/* Stated once, at the top, rather than hedged on every page: the reason there
                are no numbers anywhere in this section. */}
            <div className="mb-10 rounded-2xl border border-line bg-surface-muted p-5">
              <p className="text-sm leading-relaxed text-ink-body">
                <strong className="font-semibold text-ink">
                  You will not find a required band score on these pages.
                </strong>{" "}
                Requirements differ by course, by degree level, and by whether the score is
                being read for admission or for a visa — and governments change them without
                notice. Printing a figure here that you then plan a year around would be
                worse than printing nothing. Each page links the official source that holds
                the current requirement instead.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-body">
                ScoreWell is a practice platform. We are not an agent, not a recruiter, and
                not affiliated with any institution listed here.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {destinations.map((destination) => (
                <Link
                  key={destination.slug}
                  href={`/study-abroad/${destination.slug}`}
                  className="group flex flex-col rounded-2xl border border-line bg-surface p-6 transition-shadow hover:shadow-md"
                >
                  <h2 className="font-semibold text-ink group-hover:text-link">
                    {destination.country}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-body">
                    {destination.summary}
                  </p>
                  <p className="mt-4 text-xs font-medium text-ink-muted">
                    {destination.institutions.length} institutions listed
                  </p>
                </Link>
              ))}
            </div>

            <section className="mt-14">
              <h2 className="text-lg font-bold text-ink">Institutions</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-body">
                Every institution across these destinations, linked to its own site. This is
                not a ranking and not a shortlist — it is a place to start reading an
                admissions page.
              </p>

              <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-line bg-surface-muted text-xs uppercase tracking-wide text-ink-muted">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Institution
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        City
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Country
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {institutions.map((institution) => (
                      <tr key={institution.url}>
                        <td className="px-5 py-3">
                          <a
                            href={institution.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-link hover:underline"
                          >
                            {institution.name}
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-5 py-3 text-ink-body">
                          {institution.city}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3">
                          <Link
                            href={`/study-abroad/${institution.destinationSlug}`}
                            className="text-ink-body hover:text-link hover:underline"
                          >
                            {institution.country}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <p className="mt-10 text-sm text-ink-muted">
              Booking the test itself is a separate thing —{" "}
              <Link href="/exam-registration" className="font-medium text-link hover:underline">
                how registration works
              </Link>
              .
            </p>
          </>
        )}
      </div>
    </main>
  );
}

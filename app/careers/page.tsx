import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { CAREERS_EMAIL, HIRING, HOW_WE_WORK, OPEN_ROLES } from "@/lib/site/careers";

export const metadata: Metadata = {
  title: "Careers — ScoreWell",
  description: HIRING
    ? "Open roles at ScoreWell."
    : "We are not hiring right now. What we would look for when we are, and where to reach us in the meantime.",
  // With no roles posted, this page has nothing a job seeker's search should surface. It stays
  // linked and crawlable so it is ready the day a role opens; it just does not compete for
  // "IELTS jobs" while it is empty.
  robots: HIRING ? undefined : { index: false, follow: true },
};

/** Roles grouped by team, in first-seen order, so the list stays readable as it grows. */
function groupByTeam() {
  const groups = new Map<string, typeof OPEN_ROLES>();
  for (const role of OPEN_ROLES) {
    const existing = groups.get(role.team);
    if (existing) existing.push(role);
    else groups.set(role.team, [role]);
  }
  return [...groups];
}

export default function CareersPage() {
  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Careers"
          description={
            HIRING
              ? "Roles we are hiring for right now."
              : "We are not hiring at the moment — but here is how we work, and how to reach us."
          }
        />

        {HIRING ? (
          <section className="flex flex-col gap-10">
            {groupByTeam().map(([team, roles]) => (
              <div key={team}>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
                  {team}
                </h2>
                <ul className="flex flex-col gap-4">
                  {roles.map((role) => (
                    <li
                      key={role.id}
                      className="rounded-2xl border border-line p-6 transition-colors hover:border-brand-300"
                    >
                      <h3 className="font-display text-lg font-bold text-ink">{role.title}</h3>
                      <p className="mt-1 text-sm text-ink-muted">
                        {role.location} · {role.commitment}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-ink-body">{role.summary}</p>
                      {role.requirements.length > 0 && (
                        <ul className="mt-4 flex flex-col gap-2">
                          {role.requirements.map((requirement, index) => (
                            <li
                              key={index}
                              className="border-l-2 border-brand-200 pl-3 text-sm leading-relaxed text-ink-body"
                            >
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Button
                        href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
                          `Application: ${role.title}`,
                        )}`}
                        size="sm"
                        className="mt-5"
                      >
                        Apply for this role
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ) : (
          /* An empty state that says why it is empty, in the same terms as the rest of the
             site. Posting a role we cannot fill would be an invented opening. */
          <section className="rounded-2xl border border-line bg-surface-muted p-6">
            <h2 className="text-sm font-semibold text-ink">No open roles right now</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-body">
              When there is a job to apply for, it will be listed on this page with what the
              work is, what it pays attention to, and who to send it to. We would rather leave
              this empty than keep a permanent advert up to collect CVs for a role that does
              not exist.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-body">
              If you teach IELTS, write practice material, or build things like this and want
              to be in the inbox when that changes, send a line to{" "}
              <a
                href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
                  "Keeping in touch about future roles",
                )}`}
                className="font-medium text-link hover:underline"
              >
                {CAREERS_EMAIL}
              </a>
              . We read them; we cannot promise a reply while there is nothing to reply about.
            </p>
          </section>
        )}

        <section className="mt-12">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
            How we work
          </h2>
          <ul className="divide-y divide-line rounded-2xl border border-line">
            {HOW_WE_WORK.map((principle) => (
              <li key={principle.title} className="px-5 py-4">
                <p className="text-sm font-semibold text-ink">{principle.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-body">{principle.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            That is the standard the work is held to, and it is the part of the job that is not
            negotiable. The rest —{" "}
            <Link href="/our-story" className="font-medium text-link hover:underline">
              who is behind the site
            </Link>{" "}
            and{" "}
            <Link href="/about" className="font-medium text-link hover:underline">
              what it is for
            </Link>{" "}
            — is worth reading before you write.
          </p>
        </section>

        <section className="mt-10 rounded-2xl border border-line p-6">
          <h2 className="text-sm font-semibold text-ink">Not a job, but still useful</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-body">
            Two other ways people end up working with us: telling us what the site is missing on
            the{" "}
            <Link href="/feature-requests" className="font-medium text-link hover:underline">
              feature request board
            </Link>
            , or earning through the{" "}
            <Link href="/refer" className="font-medium text-link hover:underline">
              referral programme
            </Link>{" "}
            if you already teach a group of learners.
          </p>
        </section>
      </div>
    </main>
  );
}

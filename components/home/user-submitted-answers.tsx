import Link from "next/link";
import { initials, listPublishedSubmissions } from "@/lib/content/submissions";
import { SectionHeading } from "@/components/ui/section-heading";
import { CARD_LINK_CLASS } from "@/components/ui/card";

export async function UserSubmittedAnswers() {
  const submissions = await listPublishedSubmissions();

  // Nothing shared yet — hide the section entirely rather than showing an
  // empty shell or invented activity on the homepage.
  if (submissions.length === 0) return null;

  return (
    <section className="bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title="Community-submitted answers"
          description="Real answers from learners, with feedback from the community."
          viewAllHref="/ielts/submitted-answers"
          viewAllLabel="See all"
        />

        <div data-reveal className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {submissions.slice(0, 6).map((submission) => (
            <Link
              key={submission.id}
              href={`/ielts/submitted-answers/${submission.id}`}
              className={`${CARD_LINK_CLASS} flex flex-col p-5`}
            >
              <h4 className="font-semibold text-ink group-hover:text-link">
                {submission.title}
              </h4>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-brand-500 to-pop-500 text-xs font-semibold text-white">
                    {initials(submission.author)}
                  </span>
                  <span className="text-sm text-ink-muted">{submission.author}</span>
                </div>
                <span className="text-xs font-medium text-ink-muted">
                  {submission.replyCount} {submission.replyCount === 1 ? "reply" : "replies"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

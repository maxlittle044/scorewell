import Link from "next/link";
import { CARD_HOVER_CLASS } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  formatLessonTime,
  getAttendeeCounts,
  LESSON_SKILL_LABELS,
  listLiveLessons,
} from "@/lib/content/live-lessons";

/**
 * Upcoming live sessions on the homepage (site-build-prompt.md section 3, item 9).
 *
 * **Only real sessions are carouselled here.** Every seeded session currently carries
 * `placeholder: true` — an example listing with no teacher assigned and no joining link.
 * The /live-lessons page shows those behind an explicit "these are example listings"
 * notice, which is honest in context, but the homepage is the marketing surface: a
 * timetable of bookable-looking sessions nobody can attend is exactly the claim section 7a
 * forbids. So placeholders are filtered out, and when nothing real is scheduled the
 * section says so and links to the timetable instead of inventing a schedule.
 *
 * Attendee counts come from real registrations and are hidden at zero, the same rule the
 * library uses for attempt counts.
 */
export async function LiveLessonsCarousel() {
  const { upcoming } = await listLiveLessons(null);
  const real = upcoming.filter((lesson) => !lesson.placeholder);
  const attendees = await getAttendeeCounts(real.map((lesson) => lesson.id));

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title="Live lessons"
          description="Scheduled sessions taught live, with the recording archived afterwards so nothing is lost if you can't attend."
          viewAllHref="/live-lessons"
          viewAllLabel="View the timetable"
        />

        {real.length === 0 ? (
          <div className="rounded-2xl border border-line bg-surface-muted p-6 text-center">
            <p className="text-sm text-ink-body">
              No live sessions are scheduled at the moment.
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              The{" "}
              <Link
                href="/live-lessons"
                className="font-medium text-link hover:underline"
              >
                timetable
              </Link>{" "}
              shows what a week of sessions will look like, and archived recordings appear
              there once sessions have run.
            </p>
          </div>
        ) : (
          <div
            data-reveal
            className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
          >
            {real.map((lesson) => {
              const registered = attendees.get(lesson.id) ?? 0;
              return (
                <Link
                  key={lesson.slug}
                  href={`/live-lessons/${lesson.slug}`}
                  className={`flex w-72 shrink-0 snap-start flex-col rounded-2xl border border-line bg-surface p-5 ${CARD_HOVER_CLASS}`}
                >
                  <span className="mb-2 inline-flex w-fit items-center rounded-full bg-pop-50 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-pop-700">
                    {LESSON_SKILL_LABELS[lesson.skillFocus]}
                  </span>

                  <h3 className="text-sm font-semibold text-ink">{lesson.title}</h3>
                  <p className="mt-1 text-xs text-ink-muted">
                    {formatLessonTime(lesson.startsAt, lesson.durationMinutes)}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm text-ink-body">{lesson.summary}</p>

                  <div className="mt-auto pt-4 text-xs text-ink-muted">
                    <span className="font-medium text-ink-body">{lesson.instructor.name}</span>
                    {" · "}
                    {lesson.instructor.role}
                    {/* Real registrations only — a session nobody has joined shows nothing. */}
                    {registered > 0 && (
                      <>
                        {" · "}
                        {registered.toLocaleString("en-US")}{" "}
                        {registered === 1 ? "learner" : "learners"}
                      </>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

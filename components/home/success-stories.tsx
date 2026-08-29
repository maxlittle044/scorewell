import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { listSuccessStories } from "@/lib/content/success-stories";

/**
 * Homepage teaser for learner success stories (spec section 3, item 18).
 *
 * Renders **nothing** until a real story exists — the same choice testimonials.tsx makes.
 * An empty-state box is right on the dedicated page, where someone arrived wanting stories
 * and deserves an explanation; on the homepage it would just be a band of apology between
 * two working sections.
 */
export async function SuccessStories() {
  const stories = await listSuccessStories(3);
  if (stories.length === 0) return null;

  return (
    <section className="bg-zinc-50/70">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          kicker="Success stories"
          title={
            <>
              Learners who <span className="text-pop-600">got there</span>
            </>
          }
          description="Real results, in their own words."
        />

        <div data-reveal className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.slug}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <span className="mb-3 inline-flex w-fit rounded-full bg-pop-50 px-2.5 py-0.5 text-xs font-semibold text-pop-700">
                {story.startingBand !== undefined
                  ? `Band ${story.startingBand} → ${story.achievedBand}`
                  : `Band ${story.achievedBand}`}
              </span>
              <h3 className="text-sm font-semibold text-zinc-900">{story.title}</h3>
              <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-zinc-600">
                {story.quote[0]}
              </p>
              <p className="mt-auto pt-4 text-xs text-zinc-500">
                {story.name} · {story.goal}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/success-stories"
            className="text-sm font-semibold text-brand-600 hover:text-accent-600"
          >
            Read all success stories →
          </Link>
        </div>
      </div>
    </section>
  );
}

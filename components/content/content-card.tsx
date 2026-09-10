import Link from "next/link";

export function ContentCard({
  tag,
  title,
  meta,
  href,
  headingLevel = 3,
}: {
  tag: string;
  title: string;
  meta: string;
  href: string;
  /**
   * 3 by default, which is right under a section's h2 on the home page. A listing page puts
   * these directly under its own h1, where 3 skips a level and leaves a gap in the outline
   * for anyone moving through the page by headings — those pass 2.
   */
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-line bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <span className="inline-block w-fit rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-link">
        {tag}
      </span>
      <Heading className="mt-2.5 font-semibold text-ink group-hover:text-link">
        {title}
      </Heading>
      <p className="mt-1.5 text-sm text-ink-muted">{meta}</p>
    </Link>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
};

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  viewAllHref,
  viewAllLabel = "View all",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "mb-10 flex gap-6",
        isCenter ? "flex-col items-center text-center" : "items-end justify-between",
        className,
      )}
    >
      <div className={isCenter ? "max-w-2xl" : undefined}>
        {kicker && (
          <span className="mb-3 inline-flex items-center rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-600">
            {kicker}
          </span>
        )}

        <h2 className="font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl">
          {title}
        </h2>

        {/* Thin rules flanking the subheading — the section-divider treatment the reference
            IELTS platforms use to separate a section from the cards beneath it. */}
        {description &&
          (isCenter ? (
            <div className="mt-3 flex items-center justify-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-pop-300" />
              <p className="text-ink-body">{description}</p>
              <span aria-hidden="true" className="h-px w-10 bg-pop-300" />
            </div>
          ) : (
            <p className="mt-2 text-ink-body">{description}</p>
          ))}
      </div>

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-link hover:text-accent-600 sm:inline-flex"
        >
          {viewAllLabel}
          <span
            aria-hidden="true"
            className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-[11px] text-link"
          >
            →
          </span>
        </Link>
      )}
    </div>
  );
}

import Link from "next/link";

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.75 7V5.25a2.25 2.25 0 0 1 4.5 0V7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** The "Premium" badge used wherever a paid feature is surfaced (spec §113). */
export function PremiumBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-link ${className}`}
    >
      <LockIcon />
      Premium
    </span>
  );
}

/**
 * Shown in place of a Premium feature for free users. States plainly what the
 * feature does rather than teasing it, so the upgrade decision is informed.
 */
export function PremiumLock({
  title,
  children,
  cta = "See plans",
}: {
  title: string;
  children: React.ReactNode;
  cta?: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/40 p-6 text-center">
      <div className="mb-2 flex justify-center">
        <PremiumBadge />
      </div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-ink-body">{children}</p>
      <Link
        href="/pricing"
        className="mt-4 inline-block rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
      >
        {cta}
      </Link>
    </div>
  );
}

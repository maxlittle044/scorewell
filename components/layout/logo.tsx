import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2"
      aria-label="ScoreWell home"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--color-brand-600)" />
            <stop offset="1" stopColor="var(--color-pop-500)" />
          </linearGradient>
        </defs>
        <rect width="28" height="28" rx="9" fill="url(#logo-gradient)" />
        <path
          d="M8 17.5L11.5 14L14.5 16.5L20 10"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-lg font-bold tracking-tight text-ink">
        Score<span className="text-gradient">Well</span>
      </span>
    </Link>
  );
}

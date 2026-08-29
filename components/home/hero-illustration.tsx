const SKILLS = [
  { label: "Listening", score: 8, width: "88%" },
  { label: "Reading", score: 7.5, width: "78%" },
  { label: "Writing", score: 7, width: "70%" },
  { label: "Speaking", score: 7.5, width: "78%" },
];

export function HeroIllustration() {
  return (
    <div className="animate-float-slow relative mx-auto w-full max-w-sm">
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-linear-to-br from-pop-400/40 via-brand-300/30 to-accent-400/30 blur-2xl"
      />

      <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-2xl shadow-brand-900/15">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm font-semibold text-zinc-900">Your band report</p>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-brand-500 to-pop-500 text-sm font-bold text-white shadow-glow-sm">
            7.5
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {SKILLS.map((skill) => (
            <div key={skill.label}>
              <div className="mb-1 flex items-center justify-between text-xs text-zinc-500">
                <span>{skill.label}</span>
                <span className="font-medium text-zinc-700">{skill.score}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-zinc-100">
                <div
                  className="h-1.5 rounded-full bg-linear-to-r from-brand-500 to-pop-500"
                  style={{ width: skill.width }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-xl bg-linear-to-r from-accent-100 to-pop-100 px-3 py-2 text-xs font-medium text-accent-600">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M2 7.5L5.5 11L12 3"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          AI feedback ready in seconds
        </div>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="white" aria-hidden="true">
      <path d="M5 3l8 5-8 5V3z" />
    </svg>
  );
}

export function AudioPlaceholder({ label = "Listening audio" }: { label?: string }) {
  return (
    <div className="mb-6 flex items-center gap-3 rounded-xl border border-dashed border-line-strong bg-surface-muted px-4 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-line-strong">
        <PlayIcon />
      </span>
      <div className="flex-1">
        <p className="text-sm font-medium text-ink-body">{label}</p>
        <p className="text-xs text-ink-muted">
          Audio playback isn&apos;t wired up in this preview — read the transcript below instead.
        </p>
      </div>
    </div>
  );
}

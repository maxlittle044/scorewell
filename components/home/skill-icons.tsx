type IconProps = { className?: string };

export function BookIcon({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4 5.5C4 4.67 4.67 4 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5v-13z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M20 5.5c0-.83-.67-1.5-1.5-1.5H12v16h6.5a1.5 1.5 0 0 0 1.5-1.5v-13z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeadphonesIcon({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4 14v-2a8 8 0 0 1 16 0v2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect x="3" y="14" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function PencilIcon({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M14.5 4.5l5 5L8 21H3v-5L14.5 4.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12.5 6.5l5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function MicIcon({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5 11v1a7 7 0 0 0 14 0v-1M12 19v2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

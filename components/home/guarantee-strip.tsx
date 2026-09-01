import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { HUMAN_REVIEW_ENABLED, REVIEW_TURNAROUND_HOURS } from "@/lib/review";

/**
 * The trust & guarantee strip (site-build-prompt.md section 3, item 19, and section 7a).
 * It applies because we do offer a paid human-reviewed tier, which is the condition the
 * spec attaches to this section.
 *
 * Every badge restates a promise that is already written down somewhere on the site, and
 * links to the page it is written on — so nothing here is a new claim, and a visitor can
 * check the fine print in one click. Section 7a's "don't overpromise" is the whole design
 * constraint: no satisfaction guarantee, no support SLA, and no uptime number, because we
 * have not committed to any of those anywhere else.
 *
 * The examiner turnaround is deliberately gated on HUMAN_REVIEW_ENABLED. Advertising
 * "feedback within 48 hours" on the homepage while the queue is closed would be exactly
 * the false claim to a paying customer that lib/review.ts exists to prevent. It appears on
 * its own once a reviewer is behind the queue.
 */

type Guarantee = {
  title: string;
  body: string;
  /** Omitted where the badge has no fine print to link to and the body says all of it. */
  href?: string;
  linkLabel?: string;
  icon: "shield" | "clock" | "infinity" | "qr";
};

const GUARANTEES: Guarantee[] = [
  {
    title: "7-day refund window",
    body:
      "A new Premium subscription is refundable in full within 7 days of purchase, as long as you have used fewer than 10 AI tool runs in that window.",
    href: "/refund-policy",
    linkLabel: "Read the refund policy",
    icon: "shield",
  },
  {
    title: "Answered in 2 business days",
    body:
      "Send a refund request through the contact form with your account email and we aim to reply within two business days.",
    href: "/contact",
    linkLabel: "Contact us",
    icon: "clock",
  },
  {
    title: "Credits never expire",
    body:
      "Pay-per-use credits are held in a ledger with no expiry date. Unused credits stay on your account for as long as it exists.",
    href: "/pricing",
    linkLabel: "See credit packs",
    icon: "infinity",
  },
  {
    title: "No card details, ever",
    body:
      "Payment is by eSewa, Khalti, or bank transfer QR, approved by hand. We do not run a card processor, so there is no card number to store.",
    icon: "qr",
  },
];

const EXAMINER_GUARANTEE: Guarantee = {
  title: `Examiner reply in ${REVIEW_TURNAROUND_HOURS} hours`,
  body: `A submission sent for human review comes back within ${REVIEW_TURNAROUND_HOURS} hours of a reviewer picking it up. The turnaround is stored on your request, so it cannot change after you have paid.`,
  href: "/reviews",
  linkLabel: "About examiner reviews",
  icon: "clock",
};

function GuaranteeIcon({ name }: { name: Guarantee["icon"] }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "shield":
      return (
        <svg {...common}>
          <path d="M9 2l5 2v4.5c0 3-2.1 5.8-5 7.5-2.9-1.7-5-4.5-5-7.5V4l5-2z" />
          <path d="M6.6 8.8l1.7 1.7 3.1-3.4" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="6.5" />
          <path d="M9 5.2V9l2.6 1.6" />
        </svg>
      );
    case "infinity":
      return (
        <svg {...common}>
          <path d="M9 9s-1.2-2.4-3-2.4S3 7.7 3 9s1.2 2.4 3 2.4S9 9 9 9s1.2-2.4 3-2.4S15 7.7 15 9s-1.2 2.4-3 2.4S9 9 9 9z" />
        </svg>
      );
    case "qr":
      return (
        <svg {...common}>
          <rect x="2.5" y="2.5" width="5" height="5" rx="1" />
          <rect x="10.5" y="2.5" width="5" height="5" rx="1" />
          <rect x="2.5" y="10.5" width="5" height="5" rx="1" />
          <path d="M10.5 10.5h2m3 0h0m-5 3v2m3-2h2v2" />
        </svg>
      );
  }
}

export function GuaranteeStrip() {
  const guarantees = HUMAN_REVIEW_ENABLED
    ? [...GUARANTEES, EXAMINER_GUARANTEE]
    : GUARANTEES;

  return (
    <section className="bg-surface-muted/70">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          kicker="Our guarantees"
          title={
            <>
              What we <span className="text-pop-600">commit to</span> before you pay
            </>
          }
          description="Only the promises we have actually written down. Each one links to the page it is stated on."
        />

        {/* Wrapping flex rather than a grid: the examiner badge appears once human review
            opens, and a trailing fifth item centres here instead of stranding itself in
            the left column of a four-up grid. */}
        <ul data-reveal className="flex flex-wrap justify-center gap-4">
          {guarantees.map((guarantee) => (
            <li
              key={guarantee.title}
              className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
            >
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <span className="mb-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pop-100 text-pop-600">
                  <GuaranteeIcon name={guarantee.icon} />
                </span>
                <h3 className="font-semibold text-heading">{guarantee.title}</h3>
                <p className="mt-2 grow text-sm leading-relaxed text-ink-body">
                  {guarantee.body}
                </p>
                {guarantee.href && (
                  <Link
                    href={guarantee.href}
                    className="mt-4 text-sm font-semibold text-link hover:underline"
                  >
                    {guarantee.linkLabel} →
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

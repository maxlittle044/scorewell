import Link from "next/link";
import { InstallHint } from "./install-hint";
import { getTranslator } from "@/lib/i18n-server";
import type { Translate } from "@/lib/i18n";

const RESOURCES = [
  { label: "Reading tests", href: "/ielts/reading" },
  { label: "Listening tests", href: "/ielts/listening" },
  { label: "Writing tests", href: "/ielts/writing" },
  { label: "Speaking tests", href: "/ielts/speaking" },
  { label: "Band-9 samples", href: "/ielts/band-9-samples" },
  { label: "Tips", href: "/ielts/tips" },
  { label: "Daily challenge & leaderboard", href: "/ielts/daily-challenge" },
  { label: "Browse by topic", href: "/tags" },
  { label: "Study abroad", href: "/study-abroad" },
];

const COMPANY = [
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
  { label: "FAQs", href: "/faq" },
  { label: "Refer & earn", href: "/refer" },
  { label: "Feature requests", href: "/feature-requests" },
  { label: "What's new", href: "/announcements" },
  { label: "Success stories", href: "/success-stories" },
];

const LEGAL = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms & conditions", href: "/terms" },
  { label: "Disclaimers", href: "/disclaimers" },
  { label: "Refund policy", href: "/refund-policy" },
  { label: "Copyright & DMCA", href: "/copyright" },
];

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
      <path d="M14 3h2.2l-4.8 5.5L17 15h-4.4l-3.4-4.5L5.2 15H3l5.1-5.9L3.2 3h4.5l3.1 4.1L14 3zm-.8 10.7h1.2L6.9 4.2H5.6l7.6 9.5z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="13" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12.8" cy="5.2" r="0.8" fill="currentColor" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1.5" y="4" width="15" height="10" rx="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7.5 6.8v4.4l4-2.2-4-2.2z" fill="currentColor" />
    </svg>
  );
}

function FooterColumn({
  heading,
  links,
  t,
}: {
  heading: string;
  links: { label: string; href: string }[];
  t: Translate;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-white">{t(heading)}</p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-zinc-400 hover:text-white">
              {t(link.label)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Footer() {
  const { locale, t } = await getTranslator();

  return (
    <footer
      lang={locale === "en" ? undefined : locale}
      className="relative overflow-hidden bg-zinc-900"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-pop-500 to-transparent"
      />
      <div
        aria-hidden="true"
        className="animate-float-slow pointer-events-none absolute -top-40 left-1/2 h-80 w-xl -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-brand-500 to-pop-500 text-sm font-bold text-white">
                S
              </span>
              <span className="text-base font-semibold text-white">
                Score<span className="text-gradient">Well</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-zinc-400">
              {t(
                "Prep smarter. Score well. Free IELTS practice and AI-powered tools for learners everywhere.",
              )}
            </p>
            <div className="mt-5 flex items-center gap-3 text-zinc-400">
              <a
                href="#"
                aria-label="ScoreWell on Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10 hover:text-white"
              >
                <TwitterIcon />
              </a>
              <a
                href="#"
                aria-label="ScoreWell on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10 hover:text-white"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="ScoreWell on YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10 hover:text-white"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          <FooterColumn heading="Resources" links={RESOURCES} t={t} />
          <FooterColumn heading="Company" links={COMPANY} t={t} />
          <FooterColumn heading="Legal" links={LEGAL} t={t} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-6 sm:flex-row">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} ScoreWell. {t("All rights reserved.")}
          </p>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
            <InstallHint />
            <Link href="/sitemap" className="text-sm text-zinc-500 hover:text-white">
              {t("Sitemap")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

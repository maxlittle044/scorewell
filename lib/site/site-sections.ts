import { HIRING } from "@/lib/site/careers";
import { PLACEHOLDER as FOUNDER_PLACEHOLDER } from "@/lib/site/founder";

/**
 * Every hand-written section page on the site, in one list.
 *
 * Two things read this: the human sitemap at `/sitemap`, and the XML sitemap crawlers fetch.
 * They were separate lists before, which is the kind of duplication that goes stale quietly —
 * a page added to one and forgotten in the other is invisible in exactly the place it matters.
 *
 * `indexable: false` means "real page, deliberately kept out of search". It still appears in
 * the human sitemap, because a signed-in visitor looking for their dashboard should find it.
 * The reasons differ per page and are noted inline; where a page already sets `robots` in its
 * own metadata, the flag here reads from the same constant rather than restating the rule.
 */

export type SectionLink = {
  label: string;
  href: string;
  /** Omitted means indexable. */
  indexable?: false;
};

export type SectionGroup = {
  heading: string;
  links: SectionLink[];
};

export const SECTION_GROUPS: SectionGroup[] = [
  {
    heading: "IELTS",
    links: [
      { label: "Learning Path", href: "/learning-path" },
      { label: "Placement diagnostic", href: "/learning-path/assessment" },
      { label: "Full simulation sittings", href: "/simulation" },
      { label: "Downloadable practice packs", href: "/practice-packs" },
      { label: "Reading tests", href: "/ielts/reading" },
      { label: "Listening tests", href: "/ielts/listening" },
      { label: "Writing tests", href: "/ielts/writing" },
      { label: "Speaking tests", href: "/ielts/speaking" },
      { label: "Recurring exam topics", href: "/ielts/forecasts" },
      { label: "Daily challenge & leaderboard", href: "/ielts/daily-challenge" },
      { label: "Mini exercises", href: "/ielts/mini-exercises" },
      { label: "Grammar library", href: "/ielts/grammar" },
      { label: "Grammar tests", href: "/ielts/grammar-tests" },
      { label: "Band-9 sample answers", href: "/ielts/band-9-samples" },
      { label: "User-submitted answers", href: "/ielts/submitted-answers" },
      { label: "Answer keys", href: "/ielts/answer-keys" },
      { label: "Tips", href: "/ielts/tips" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "Courses", href: "/courses" },
      { label: "AI Conversations", href: "/ai-conversations" },
      { label: "Writing Exercises", href: "/writing-exercises" },
      { label: "Pronunciation", href: "/pronunciation" },
      { label: "Dictation/Shadowing", href: "/dictation-shadowing" },
      { label: "Flashcards", href: "/flashcards" },
      { label: "Video Lessons", href: "/video-lessons" },
      { label: "Topic banks", href: "/topics" },
      { label: "Speaking Part 1 topics", href: "/topics/speaking/part-1" },
      { label: "Speaking Part 2 cue cards", href: "/topics/speaking/part-2" },
      { label: "Speaking Part 3 topics", href: "/topics/speaking/part-3" },
      { label: "Task 2 essay questions", href: "/topics/essay-questions" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { label: "Writing Task 1 Academic checker", href: "/tools/writing-task1-academic-checker" },
      { label: "Writing Task 1 General checker", href: "/tools/writing-task1-general-checker" },
      { label: "Writing Task 2 checker", href: "/tools/writing-task2-checker" },
      { label: "Speaking checker", href: "/tools/speaking-part1-checker" },
      { label: "Band calculators", href: "/tools/band-calculator/overall" },
      { label: "Paraphraser", href: "/tools/paraphraser" },
      { label: "Sentence explainer", href: "/tools/sentence-explainer" },
      { label: "Summarizer", href: "/tools/summarizer" },
      { label: "Translator", href: "/tools/translator" },
      { label: "Grammar checker", href: "/tools/grammar-checker" },
      { label: "Text improver", href: "/tools/text-improver" },
      { label: "Text-to-speech", href: "/tools/text-to-speech" },
    ],
  },
  {
    heading: "Account",
    links: [
      // A sign-in form is not a search result anyone wants, and an empty signed-out
      // dashboard is worse — both are useful links for a person, not for a crawler.
      { label: "Log in / Sign up", href: "/login", indexable: false },
      { label: "Dashboard", href: "/dashboard", indexable: false },
      { label: "Pricing", href: "/pricing" },
      { label: "Leaderboard", href: "/leaderboard" },
      { label: "Search", href: "/search" },
      { label: "Exam registration", href: "/exam-registration" },
      { label: "Study abroad", href: "/study-abroad" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      // Matches the page's own metadata: unfinished placeholder copy stays out of search.
      ...(FOUNDER_PLACEHOLDER
        ? ([{ label: "Our story", href: "/our-story", indexable: false }] as SectionLink[])
        : ([{ label: "Our story", href: "/our-story" }] as SectionLink[])),
      { label: "Contact us", href: "/contact" },
      { label: "FAQs", href: "/faq" },
      // Redirects signed-out visitors to /login, so a crawler would only ever see the
      // sign-in form. Verified by fetching it against a production build.
      { label: "Refer & earn", href: "/refer", indexable: false },
      { label: "Feature requests", href: "/feature-requests" },
      { label: "What's new", href: "/announcements" },
      { label: "Success stories", href: "/success-stories" },
      // Same rule the careers page applies to itself: no open roles, no index.
      ...(HIRING
        ? ([{ label: "Careers", href: "/careers" }] as SectionLink[])
        : ([{ label: "Careers", href: "/careers", indexable: false }] as SectionLink[])),
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Disclaimers", href: "/disclaimers" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Copyright & DMCA", href: "/copyright" },
    ],
  },
];

/**
 * Section paths a crawler should be offered, plus the home page — which belongs in the XML
 * sitemap but not in a list of sections a visitor navigates to.
 */
export function indexableSectionPaths(): string[] {
  const paths = SECTION_GROUPS.flatMap((group) =>
    group.links.filter((link) => link.indexable !== false).map((link) => link.href),
  );
  return ["/", ...paths];
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Sitemap — ScoreWell",
};

const GROUPS = [
  {
    heading: "IELTS",
    links: [
      { label: "Learning Path", href: "/learning-path" },
      { label: "Placement diagnostic", href: "/learning-path/assessment" },
      { label: "Full simulation sittings", href: "/simulation" },
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
      { label: "Log in / Sign up", href: "/login" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Pricing", href: "/pricing" },
      { label: "Leaderboard", href: "/leaderboard" },
      { label: "Search", href: "/search" },
      { label: "Exam registration", href: "/exam-registration" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact us", href: "/contact" },
      { label: "FAQs", href: "/faq" },
      { label: "Refer & earn", href: "/refer" },
      { label: "Feature requests", href: "/feature-requests" },
      { label: "What's new", href: "/announcements" },
      { label: "Success stories", href: "/success-stories" },
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

export default function SitemapPage() {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Sitemap" />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((group) => (
            <div key={group.heading}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                {group.heading}
              </h2>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-zinc-700 hover:text-brand-600">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

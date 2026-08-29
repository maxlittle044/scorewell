import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "FAQs — ScoreWell",
};

const FAQS = [
  {
    question: "Is ScoreWell affiliated with the official IELTS exam?",
    answer:
      "No. ScoreWell is an independent prep platform. The exam itself is administered by the British Council, IDP, and Cambridge Assessment English.",
  },
  {
    question: "How accurate are the AI band score estimates?",
    answer:
      "Our AI tools give a strong estimate based on common examiner criteria, but they don't replace an official exam result. Use them to identify patterns in your mistakes, not as a guaranteed score.",
  },
  {
    question: "What's included in the free plan?",
    answer:
      "Full access to practice tests, Band-9 samples, tips, and courses, plus 5 AI tool uses per month across writing, speaking, and grammar checkers.",
  },
  {
    question: "Can I cancel my Premium subscription anytime?",
    answer:
      "Yes. Cancelling stops future renewals immediately; you keep Premium access until the end of your current billing period.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "See our Refund Policy for details — short-window refunds are available on new subscriptions that haven't been substantially used.",
  },
  {
    question: "How does the referral program work?",
    answer:
      "Share your unique referral link. When a friend subscribes to Premium using it, you both get a reward — see the Refer & Earn page for current terms.",
  },
];

export default function FaqPage() {
  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Frequently asked questions" />

        <div className="flex flex-col divide-y divide-line rounded-2xl border border-line">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-ink">
                {faq.question}
                <span className="shrink-0 text-ink-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2.5 text-sm text-ink-body">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "About us — ScoreWell",
};

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="About ScoreWell" />

        <div className="flex flex-col gap-5 text-ink-body">
          <p>
            ScoreWell started from a simple frustration: good IELTS prep
            material is scattered across dozens of sites, and the feedback
            that actually moves your score — on your writing, your speaking,
            your specific mistakes — is either slow to get or expensive to buy.
          </p>
          <p>
            We built ScoreWell to put full-length practice tests, Band-9
            sample answers, and AI-powered feedback tools in one place, free
            to start. The goal isn&apos;t to replace a good teacher — it&apos;s
            to give you fast, honest feedback every time you sit down to
            practice, so the time you spend actually moves your band score.
          </p>
          <p>
            We&apos;re independent of the British Council, IDP, and Cambridge
            Assessment English — we don&apos;t administer the exam, we help
            you prepare for it.
          </p>
        </div>
      </div>
    </main>
  );
}

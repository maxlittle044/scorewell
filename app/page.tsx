import { Suspense } from "react";
import { AiConversationsCarousel } from "@/components/home/ai-conversations-carousel";
import { CoachingCrossSell } from "@/components/home/coaching-cross-sell";
import { CoursesCarousel } from "@/components/home/courses-carousel";
import { DailyChallenge } from "@/components/home/daily-challenge";
import { DictationCarousel } from "@/components/home/dictation-carousel";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { GuaranteeStrip } from "@/components/home/guarantee-strip";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { LiveLessonsCarousel } from "@/components/home/live-lessons-carousel";
import { LatestSamples } from "@/components/home/latest-samples";
import { NewsletterSignup } from "@/components/home/newsletter-signup";
import { PricingTable } from "@/components/home/pricing-table";
import { SuccessStories } from "@/components/home/success-stories";
import { PronunciationGrid } from "@/components/home/pronunciation-grid";
import { RegistrationBanner } from "@/components/home/registration-banner";
import { Testimonials } from "@/components/home/testimonials";
import { ToolsGrid } from "@/components/home/tools-grid";
import { TrustBar } from "@/components/home/trust-bar";
import { UserSubmittedAnswers } from "@/components/home/user-submitted-answers";
import { VideoLessonsCarousel } from "@/components/home/video-lessons-carousel";
import { WritingExercisesList } from "@/components/home/writing-exercises-list";
import { getCurrency } from "@/lib/currency-server";

/**
 * Every section that reads the database sits behind its own Suspense boundary.
 *
 * Without them the page sent no HTML at all until the slowest of eight queries came back, so
 * first paint and largest contentful paint landed together at about 1.9 seconds — the hero
 * headline was finished and waiting on a carousel three screens below it. Each boundary lets
 * its section arrive on its own.
 *
 * The fallbacks are `null` on purpose: all of these sit below the fold, so nothing visible
 * moves when they arrive, and a skeleton three screens down is animation nobody sees.
 */
export default async function Home() {
  const currency = await getCurrency();

  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <TrustBar />
      <RegistrationBanner />
      <Testimonials />
      <Suspense fallback={null}>
        <FeaturedCategories />
      </Suspense>
      <DailyChallenge />
      {/* Section 7 in the spec's homepage order: after the daily challenge, before the tools grid. */}
      <HowItWorks />
      <ToolsGrid />
      {/* Section 9 in the spec order: live lessons sit between the tools grid and courses. */}
      <Suspense fallback={null}>
        <LiveLessonsCarousel />
      </Suspense>
      <CoursesCarousel />
      <Suspense fallback={null}>
        <AiConversationsCarousel />
      </Suspense>
      <WritingExercisesList />
      <PronunciationGrid />
      <Suspense fallback={null}>
        <DictationCarousel />
      </Suspense>
      <Suspense fallback={null}>
        <VideoLessonsCarousel />
      </Suspense>
      <LatestSamples />
      <Suspense fallback={null}>
        <UserSubmittedAnswers />
      </Suspense>
      {/* Section 18 in the spec order. Renders nothing until a real story exists. */}
      <Suspense fallback={null}>
        <SuccessStories />
      </Suspense>
      {/* Section 19: the guarantee strip, which applies because we offer a paid
          human-reviewed tier. */}
      <GuaranteeStrip />
      {/* Section 20: email capture sits between the stories and the pricing table. */}
      <NewsletterSignup />
      <PricingTable currency={currency} />
      <CoachingCrossSell />
    </main>
  );
}

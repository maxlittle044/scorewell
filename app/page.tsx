import { AiConversationsCarousel } from "@/components/home/ai-conversations-carousel";
import { CoachingCrossSell } from "@/components/home/coaching-cross-sell";
import { CoursesCarousel } from "@/components/home/courses-carousel";
import { DailyChallenge } from "@/components/home/daily-challenge";
import { DictationCarousel } from "@/components/home/dictation-carousel";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { Hero } from "@/components/home/hero";
import { LatestSamples } from "@/components/home/latest-samples";
import { PricingTable } from "@/components/home/pricing-table";
import { PronunciationGrid } from "@/components/home/pronunciation-grid";
import { RegistrationBanner } from "@/components/home/registration-banner";
import { Testimonials } from "@/components/home/testimonials";
import { ToolsGrid } from "@/components/home/tools-grid";
import { TrustBar } from "@/components/home/trust-bar";
import { UserSubmittedAnswers } from "@/components/home/user-submitted-answers";
import { VideoLessonsCarousel } from "@/components/home/video-lessons-carousel";
import { WritingExercisesList } from "@/components/home/writing-exercises-list";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <TrustBar />
      <RegistrationBanner />
      <Testimonials />
      <FeaturedCategories />
      <DailyChallenge />
      <ToolsGrid />
      <CoursesCarousel />
      <AiConversationsCarousel />
      <WritingExercisesList />
      <PronunciationGrid />
      <DictationCarousel />
      <VideoLessonsCarousel />
      <LatestSamples />
      <UserSubmittedAnswers />
      <PricingTable />
      <CoachingCrossSell />
    </main>
  );
}

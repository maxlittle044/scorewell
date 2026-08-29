import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { UtilityRail } from "@/components/layout/utility-rail";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-display-raw",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ScoreWell — Prep smarter. Score well.",
  description:
    "Free IELTS practice tests, sample answers, and AI-powered writing, speaking, and grammar tools.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await auth();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ScrollReveal />
        <AnnouncementBar />
        <Header session={session} />
        {children}
        <UtilityRail />
        <Footer />
      </body>
    </html>
  );
}

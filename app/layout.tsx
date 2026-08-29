import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { UtilityRail } from "@/components/layout/utility-rail";
import { ServiceWorkerRegistrar } from "@/components/layout/service-worker";

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
  // iOS ignores the manifest's icons for the home screen and reads this instead.
  appleWebApp: { capable: true, title: "ScoreWell", statusBarStyle: "default" },
  icons: {
    icon: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

/** Tints the browser and status-bar chrome to the nav band's navy. */
export const viewport: Viewport = {
  themeColor: "#294563",
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
        <ServiceWorkerRegistrar />
        <AnnouncementBar />
        <Header session={session} />
        {children}
        <UtilityRail />
        <Footer />
      </body>
    </html>
  );
}

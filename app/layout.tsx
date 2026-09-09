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
import { DictionaryLookup } from "@/components/content/dictionary-lookup";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { SITE_URL } from "@/lib/site/site-url";
import { getLocale } from "@/lib/i18n-server";

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
  metadataBase: new URL(SITE_URL),

  title: "ScoreWell — Prep smarter. Score well.",

  description:
    "Free IELTS practice tests, sample answers, and AI-powered writing, speaking, and grammar tools.",

  appleWebApp: {
    capable: true,
    title: "ScoreWell",
    statusBarStyle: "default",
  },

  icons: {
    icon: [
      {
        url: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#294563",
};

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const [session, locale] = await Promise.all([
    auth(),
    getLocale(),
  ]);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <LocaleProvider locale={locale}>
          <ScrollReveal />

          <ServiceWorkerRegistrar />

          <AnnouncementBar />

          <Header session={session} />

          {children}

          <DictionaryLookup />

          <UtilityRail />

          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";

import { auth } from "@/auth";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { UtilityRail } from "@/components/layout/utility-rail";
import { AdminChrome } from "@/components/layout/admin-chrome";
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

  /**
   * Share cards. Without these a link pasted into WhatsApp or Facebook rendered as a bare
   * URL — no title, no description, no image — which is the first thing a person sees of
   * the site and, for a site passed between students, often the only thing.
   *
   * **Deliberately no `title` or `description` here.** Child routes inherit this object
   * whole, so pinning a title makes every one of the 170 content pages share as the home
   * page — measured: with a title set, /ielts/tips and /tools/paraphraser both advertised
   * "ScoreWell — Prep smarter. Score well.". Leaving them out lets Next derive og:title and
   * og:description from each page's own metadata, which is what makes a shared link say
   * "Tips — ScoreWell". Add them back and you silently flatten every page into one.
   *
   * The image comes from app/opengraph-image.tsx and applies to every route that does not
   * override it, so a card without its own artwork still gets the brand one.
   */
  openGraph: {
    type: "website",
    siteName: "ScoreWell",
    locale: "en_US",
    url: SITE_URL,
  },

  twitter: {
    // "summary_large_image" is what renders the 1200x630 card rather than a thumbnail.
    card: "summary_large_image",
  },

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
    // `lang` stays "en" whatever the interface language is, because the page's content —
    // passages, questions, sample answers — is English, and that is what a screen reader
    // or a translation tool needs to know. The chrome that is translated carries its own
    // `lang` where it differs.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <head>
        {/* Applies the stored theme before first paint — a deferred script would let a
            dark-mode reader see a white flash on every navigation. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("scorewell-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <LocaleProvider locale={locale}>
          <ScrollReveal />

          <ServiceWorkerRegistrar />

          <AnnouncementBar />

          <AdminChrome>
            <Header session={session} />
          </AdminChrome>

          {children}

          <DictionaryLookup />

          <UtilityRail />

          <AdminChrome>
            <Footer />
          </AdminChrome>
          
        </LocaleProvider>
      </body>
    </html>
  );
}
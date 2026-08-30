/**
 * Interface language (site-build-prompt.md section 6, and the "interface language switcher"
 * row of section 4b).
 *
 * **Chrome only.** Navigation, footer, and the shell controls translate. Lessons, passages,
 * questions, sample answers and AI feedback stay in English, because they are the English
 * the learner is here to practise — translating them would be translating the product away.
 * The switcher says so in as many words.
 *
 * **No i18n routing, and no library.** The usual `next-intl` setup puts a locale segment in
 * front of every path, which would rewrite every URL on a site whose value is its indexed
 * content pages, and section 4a explicitly asks that no URL break. The locale is a cookie
 * instead, and this file is the whole implementation: a dictionary and a lookup. It is
 * smaller than the configuration a library would need for the same no-routing setup.
 *
 * **Keys are the English string itself.** A missing entry therefore renders as English
 * rather than as a bare `nav.examLibrary`, so a half-translated interface degrades into a
 * readable one. The cost is that two English strings needing different translations would
 * collide; none in the chrome do.
 */

export const LOCALES = ["en", "ne"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "scorewell_locale";

/** Each language named in itself — a switcher that says "Nepali" is no use to a Nepali reader. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  ne: "नेपाली",
};

/** Short code for the switcher's buttons, where the full name will not fit. */
export const LOCALE_CODES: Record<Locale, string> = {
  en: "EN",
  ne: "ने",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

// Nepali is the second language because that is the market the payment rails already serve:
// eSewa, Khalti and NPR pricing. IELTS terms that Nepali learners use in English —
// listening, reading, band, task — are transliterated rather than replaced, since a learner
// searching for "लिसनिङ" recognises it and one reading "श्रवण" often does not.
const NE: Record<string, string> = {
  // Header — brand row
  "Search tests, tips, tools...": "टेस्ट, सुझाव, टुल्स खोज्नुहोस्...",
  Upgrade: "अपग्रेड",
  "Open menu": "मेनु खोल्नुहोस्",
  "Close menu": "मेनु बन्द गर्नुहोस्",
  Home: "गृहपृष्ठ",
  "Sign up": "खाता खोल्नुहोस्",
  "Log in": "लग इन",
  "Log out": "लग आउट",

  // Header — nav band
  "Exam Library": "परीक्षा लाइब्रेरी",
  Tips: "सुझाव",
  Practice: "अभ्यास",
  "Learning Path": "सिकाइ योजना",
  "Live Lessons": "लाइभ कक्षा",
  "Topic Banks": "विषय संग्रह",
  Courses: "कोर्स",
  Tools: "टुल्स",

  // Mega-menu column headings
  "Test collection": "टेस्ट संग्रह",
  "By variant": "प्रकार अनुसार",
  "Full test": "पूरा टेस्ट",
  "Tips by skill": "सीप अनुसार सुझाव",
  "Sample answers": "नमुना उत्तर",
  Reference: "सन्दर्भ",
  "Skills practice": "सीप अभ्यास",
  "Quick practice": "छिटो अभ्यास",
  "Writing tools": "लेखन टुल्स",
  "Speaking tools": "बोलाइ टुल्स",
  "Language tools": "भाषा टुल्स",
  "Band calculators": "ब्यान्ड क्याल्कुलेटर",

  // Mega-menu links
  "All tests": "सबै टेस्ट",
  "Listening tests": "लिसनिङ टेस्ट",
  "Reading tests": "रिडिङ टेस्ट",
  "Writing tests": "राइटिङ टेस्ट",
  "Speaking tests": "स्पिकिङ टेस्ट",
  "Academic tests": "एकेडेमिक टेस्ट",
  "General Training tests": "जनरल ट्रेनिङ टेस्ट",
  "Simulation sittings": "पूर्ण परीक्षा सिटिङ",
  "All tips": "सबै सुझाव",
  "Listening tips": "लिसनिङ सुझाव",
  "Reading tips": "रिडिङ सुझाव",
  "Writing tips": "राइटिङ सुझाव",
  "Speaking tips": "स्पिकिङ सुझाव",
  "Band-9 samples": "ब्यान्ड-९ नमुना",
  "User-submitted answers": "प्रयोगकर्ताका उत्तर",
  "Reading & listening answer keys": "रिडिङ र लिसनिङ उत्तर कुञ्जी",
  "Recurring exam topics": "पटक-पटक आउने विषय",
  "Writing exercises": "लेखन अभ्यास",
  "AI conversations": "एआई कुराकानी",
  Pronunciation: "उच्चारण",
  "Dictation & shadowing": "डिक्टेसन र स्याडोइङ",
  "Video lessons": "भिडियो पाठ",
  Flashcards: "फ्ल्यासकार्ड",
  "Mini exercises": "मिनी अभ्यास",
  "Grammar library": "व्याकरण लाइब्रेरी",
  "Grammar tests": "व्याकरण टेस्ट",
  "Daily exam & leaderboard": "दैनिक परीक्षा र लिडरबोर्ड",
  "Task 1 Academic report checker": "टास्क १ एकेडेमिक रिपोर्ट चेकर",
  "Task 1 General letter checker": "टास्क १ जनरल पत्र चेकर",
  "Task 2 essay checker": "टास्क २ निबन्ध चेकर",
  "Text improver": "टेक्स्ट सुधारक",
  "Speaking answer checker": "स्पिकिङ उत्तर चेकर",
  "Text-to-speech generator": "टेक्स्ट-टु-स्पिच जेनेरेटर",
  Paraphraser: "पुनर्लेखक",
  "Sentence explainer": "वाक्य व्याख्याकर्ता",
  Summarizer: "सारांशकर्ता",
  Translator: "अनुवादक",
  "Grammar checker": "व्याकरण चेकर",
  "Overall band calculator": "समग्र ब्यान्ड क्याल्कुलेटर",
  "Listening band calculator": "लिसनिङ ब्यान्ड क्याल्कुलेटर",
  "Reading band calculator": "रिडिङ ब्यान्ड क्याल्कुलेटर",
  "Writing band calculator": "राइटिङ ब्यान्ड क्याल्कुलेटर",
  "Speaking band calculator": "स्पिकिङ ब्यान्ड क्याल्कुलेटर",

  // Announcement bar
  "Limited-time offer: 20% off ScoreWell Premium for new learners.":
    "सीमित समयको अफर: नयाँ सिकारुका लागि ScoreWell प्रिमियममा २०% छुट।",
  "Upgrade now": "अहिले नै अपग्रेड गर्नुहोस्",
  "Dismiss announcement": "सूचना हटाउनुहोस्",

  // Theme toggle
  "Colour theme": "रङ थिम",
  Light: "उज्यालो",
  Dark: "अँध्यारो",
  System: "सिस्टम",

  // Language switcher
  "Interface language": "इन्टरफेस भाषा",
  "Menus and site chrome only — pages and lessons stay in English.":
    "मेनु र साइट चलाउने भाग मात्र — पृष्ठ र पाठहरू अंग्रेजीमै रहन्छन्।",

  // Utility rail
  Library: "लाइब्रेरी",
  Contact: "सम्पर्क",
  "Back to top": "सुरुमा फर्कनुहोस्",

  // Footer
  Resources: "स्रोतहरू",
  Company: "कम्पनी",
  Legal: "कानुनी",
  "Prep smarter. Score well. Free IELTS practice and AI-powered tools for learners everywhere.":
    "स्मार्ट तयारी। राम्रो स्कोर। सबै सिकारुका लागि निःशुल्क IELTS अभ्यास र एआई टुल्स।",
  "Daily challenge & leaderboard": "दैनिक च्यालेन्ज र लिडरबोर्ड",
  "Browse by topic": "विषय अनुसार हेर्नुहोस्",
  "About us": "हाम्रो बारेमा",
  "Contact us": "सम्पर्क गर्नुहोस्",
  FAQs: "बारम्बार सोधिने प्रश्न",
  "Refer & earn": "रेफर गरी कमाउनुहोस्",
  "Feature requests": "सुविधा अनुरोध",
  "What's new": "नयाँ के छ",
  "Success stories": "सफलताका कथा",
  "Privacy policy": "गोपनीयता नीति",
  "Terms & conditions": "नियम तथा सर्त",
  Disclaimers: "अस्वीकरण",
  "Refund policy": "रिफन्ड नीति",
  "Copyright & DMCA": "प्रतिलिपि अधिकार र DMCA",
  "All rights reserved.": "सर्वाधिकार सुरक्षित।",
  Sitemap: "साइटम्याप",
  "Install ScoreWell from your browser menu to open it like an app.":
    "एपजस्तै खोल्न ब्राउजरको मेनुबाट ScoreWell इन्स्टल गर्नुहोस्।",
  "Install ScoreWell: tap Share, then": "ScoreWell इन्स्टल गर्नुहोस्: Share थिच्नुहोस्, अनि",
  // Left in English on purpose: these name buttons the reader has to find in iOS Safari,
  // and iOS has no Nepali interface to match a translation against.
  "Add to Home Screen": "Add to Home Screen",
};

const DICTIONARIES: Record<Locale, Record<string, string>> = { en: {}, ne: NE };

export type Translate = (english: string) => string;

/** Returns the lookup for a locale. English, and any string with no entry, passes through. */
export function translator(locale: Locale): Translate {
  const dictionary = DICTIONARIES[locale] ?? {};
  return (english) => dictionary[english] ?? english;
}

# Build Prompt: English/IELTS Learning Platform

Use this prompt with an AI website/app builder (Claude Code, v0, Lovable, Cursor, etc.) or hand it to a developer.

---

## Prompt

Build a content-and-tools website for English learners preparing for the IELTS exam, similar in structure to large IELTS resource hubs. Use original branding, copy, and images — do not copy any existing site's text, logo, or testimonials.

**v2 note:** this spec now folds in functionality patterns commonly found across several established IELTS prep platforms (free lesson hubs, AI-scored test platforms, and paid coaching sites) — a broader mix of free content, AI-scored practice, structured learning paths, and optional paid human feedback, described generically below rather than tied to any one site.

**v3 note — reference alignment.** The build had drifted toward a generic dark-hero SaaS layout. This revision realigns the site with the dominant layout conventions of large IELTS test-library platforms, captured by screenshotting the reference sites rather than reading their markup. What is adopted is **structure and interaction convention only** — the library-first information architecture, the light centred page shell, and the filter/collection patterns described in §2, §4a and §7. Branding, copy, imagery, instructor photos, and any trust or usage figures remain entirely our own, per §9; nothing in this note authorises reproducing another site's text, art, or numbers.

**v4 note — replica scope and completeness.** The target is now a close replica of the reference platform's *product*, not merely its conventions. Match its information architecture, page inventory, layout, component set, and interactions as closely as they can be matched. Three carve-outs, which are not negotiable because they are already required by §7a and §9:

- **Brand skin stays ours.** Logo, product name, colour tokens, photography, illustrations, and marketing sentences are original. Where the reference uses a stock photo or a book-cover render, we use our own typographic tile or a CC0/CC BY asset with credit.
- **No borrowed numbers or endorsements.** Usage totals, attempt counters, star ratings, review counts, and examination-board affiliations are shown only when we can compute them from our own tables or genuinely hold them. Otherwise the element ships empty or is omitted.
- **Payments stay on the existing rails.** eSewa / Khalti / bank-transfer QR with manual admin approval, exactly as built. No card processor, no Stripe, regardless of what the reference offers.

**Feature parity is the goal**: build the full surface listed in §4b. Where we have capabilities the reference lacks (Locate & Explain evidence highlighting, per-distractor explanations, criterion-level AI scoring), these are *secondary* — they live inside the review screens and on their own pages, and must not reshape the primary navigation or the main task flows.

**Dependencies:** npm packages are acceptable where they save real work (carousels, date handling, calendar views), subject to the standing zero-running-cost rule — the package must be free, self-hosted at build time, and must not introduce a paid or metered service.

### 1. Site Purpose
A freemium platform combining free educational content with paid AI-powered practice tools for IELTS and general English learners.

### 2. Header / Navigation
- Logo (left) linking to home
- Top announcement bar for a promo (dismissible)
- **Navigation sits in its own full-width coloured band directly under the white logo row** — a two-tier header, not a single bar with the links crowded against the logo. Menu labels are short (one or two words); anything longer belongs inside a dropdown, not on the bar.
- Mega-menu navigation with sections, **led by the Exam Library** (the library is the site's primary entry point, not one item among many):
  - Exam Library (dropdown: All tests, then Listening / Reading / Writing / Speaking, each deep-linking into the library pre-filtered by skill — see section 4a)
  - IELTS (dropdown: Exam forecasts, Daily timed exams + leaderboard, Mini exercises, Grammar tests, Band-9 sample essays/answers, User-submitted answers, Reading/Listening answer keys, Tips)
  - Learning Path (personalized, goal-based study plan — see section 4)
  - Courses
  - Live Lessons (scheduled webinars — see section 4)
  - AI Conversations (interactive speaking practice)
  - Writing Exercises
  - Pronunciation
  - Dictation/Shadowing
  - Flashcards
  - Video Lessons
  - Topic Banks (Speaking Part 1/2/3 topics, curated essay-question lists — see section 4)
  - Tools (dropdown of individual AI tools — see section 5)
- Search bar
- Dark mode toggle
- Login button
- "Upgrade/Premium" CTA button

### 3. Homepage Sections (in order)
1. **Hero**: headline + subheadline stating the value prop, primary CTA button ("See Plans" / "Get Started"), hero image, small note about supported browsers
2. **Trust bar**: review-platform badge/rating + 3 stat callouts (e.g., "X+ tools", "X+ practice samples", "X+ learners")
3. **Partnership/credibility banner** (optional): official partner badges, exam registration links
4. **Testimonials**: 3–5 rotating cards with photo, name, star rating, short quote
5. **Featured test categories**: 4 cards (Reading / Listening / Writing / Speaking tests) with image + link
6. **Daily challenge / leaderboard teaser**: short description of a gamified daily exercise + CTA
7. **"How it works" step strip**: 4–6 numbered steps from placement/diagnostic → learning path → practice → AI scoring → (optional) human review, each with a short description
8. **Tools grid**: icon + label cards for each AI tool (see section 5), grouped visually
9. **Live lessons carousel**: upcoming scheduled webinars with instructor name/photo, topic, date/time, attendee count, "Register" CTA
10. **Courses carousel**: 3+ course cards (image, title, link)
11. **AI Conversations carousel**: topic cards (e.g., introductions, hobbies, work, family)
12. **Writing exercises list**: recent prompts with links
13. **Pronunciation exercises**: phoneme grid, each linking to a practice page
14. **Dictation/shadowing carousel**: short-story practice cards with thumbnail
15. **Video lessons carousel**: curated videos with captions
16. **Latest samples sections**: recent Band-9 writing samples, recent Band-9 speaking samples, recent tips articles — each as a card with image, title, excerpt, category/tags
17. **User-submitted answers sections**: community-submitted writing task 1 and task 2 answers
18. **Success stories**: rotating video or written before/after stories (target score reached), separate from the short testimonial cards in section 4
19. **Trust & guarantee strip** (optional, if offering any paid human-reviewed tier): a few short guarantee badges (e.g., satisfaction/refund window, response-time commitment) — see section 7a
20. **Newsletter signup**: email capture block ("get new lessons/tips weekly") with a short incentive line
21. **Pricing table**: Free vs Premium tier comparison, feature checklist, multiple billing durations (1/3/6/12 months) with a "best value" highlight, plus an alternate local payment method section if targeting a specific country
22. **Footer**: logo + tagline, link columns (Resources, Legal, Company), copyright, social icons, app store badges (see section 7a)
23. **Partner/coaching cross-sell** (optional): banner offering 1-on-1 human tutoring via an affiliate partner

### 3a. Secondary / Utility Pages
- Search results page (across tests, articles, tools)
- Learner login / signup page
- Account dashboard (progress history, saved results, subscription status)
- Daily leaderboard page (weekly/monthly/yearly views)
- Learning path / placement assessment page (short diagnostic that generates a personalized study plan)
- Exam registration page(s) — informational + partner booking links, optionally split by region
- Live lessons listing page (filterable by skill), plus one page template per session
- Topic bank pages (e.g., all Speaking Part 2 topics, a curated essay-question list) — browsable independent of full tests
- Instructor/founder "our story" page — bio, credentials, why the site exists
- Success stories page (longer-form, separate from homepage teaser)
- About Us
- Contact Us
- FAQs (organized by category: account/payment, test-taking, technical)
- Careers page (if/when hiring)
- Pricing / Payment plans page (standalone, same content as homepage pricing table)
- Refer & Earn / affiliate program page
- Feature Requests page (public roadmap or voting board)
- Privacy Policy, Terms & Conditions, Disclaimers, Refund Policy, Copyright/DMCA notice
- HTML sitemap page

### 4. Core Content Types (each needs its own template/page)
- IELTS practice tests (Reading, Listening, Writing, Speaking) — timed, scored
- Band-9 sample answers (Writing Task 1 & 2, Speaking Parts 1–3), each tagged by test source and skill
- User-generated submissions with community answers
- Tips/blog articles
- Courses (multi-lesson structured paths)
- AI conversation practice (chat-style interface with feedback)
- Writing improvement exercises (prompt-based, tied to real past exam questions)
- Pronunciation drills (per-phoneme, audio + feedback)
- Dictation/shadowing exercises (audio clip + transcription practice)
- Video lessons with captions
- Daily/weekly/monthly/yearly leaderboard (score + rank per user, tied to daily timed exams)
- Mini exercises (short-form, low-commitment practice separate from full tests)
- Topic banks (browsable lists of Speaking Part 1/2/3 topics and curated essay questions, independent of a full timed test)
- Live lessons/webinars (scheduled sessions with an instructor, registration, and attendee count; recordings archived afterward)
- Full simulation tests (all four skills combined, matching the real exam's format, question count, and timing in one sitting)

### 4a. Exam Library (primary content surface)

Individual per-skill index pages are not enough on their own: the defining surface of a test-library platform is **one library page that holds every test**, filtered down rather than navigated to. Build `/exam-library` as the site's main content page.

- **Grouped into named collections, not a flat list.** Every practice test belongs to a collection (e.g. "Mock Test Set 1", "Academic Practice Volume 2"), and the library renders one block per collection: collection artwork on the left, a grid of its individual tests on the right. The existing `sourceTestSet` column is this grouping key — no schema change.
- **Three stacked filter controls, all client-side and all reflected in the URL** so a filtered view is linkable and indexable:
  1. Tab row for test variant: All / Academic / General Training
  2. Pill row for skill, with an icon per pill: All Skills / Listening / Reading / Writing / Speaking
  3. A search box plus a sort control (newest / most practised / alphabetical)
- **Each test tile** shows its name, its skill, and a completion state for signed-in learners (unattempted / in progress / best band achieved). Where a "times practised" figure is shown it must be a real `Progress` count — if the count is zero, show nothing rather than a seeded or decorative number (§7a).
- Deep links: `/exam-library?skill=reading`, `?variant=academic`, `?q=...` — the per-skill nav items point here rather than at separate pages. Keep the existing `/ielts/<skill>` index pages working as skill-scoped views so no URL breaks.

### 4b. Full surface inventory (parity target)

Every row is in scope. "Have" means built and reachable; "partial" means the capability exists but not in the shape or at the depth the reference has it.

**Test library and practice** — Exam Library with collections + filters (have); per-skill test pages (have); full four-skill simulation sitting with one global clock (missing); daily timed exam + leaderboard (have); mini exercises and grammar tests (have); answer keys (have).

**Guidance content** — tips hub split into one page per skill, not a single mixed index (partial); grammar library organised by point rather than as tests (partial); announcements / platform news feed (missing); topic banks (have); band-9 sample answers (have); user-submitted answers with community replies (have).

**Live and video** — live lessons listing filtered by skill, one page per session, instructor card, registration, attendee count, archived recording afterwards (missing); recorded-lesson packages (missing); self-study course track (missing); video lessons with captions (have); multi-lesson video courses (partial — courses exist, not video-based).

**Scored services** — AI writing evaluation per criterion (have); AI speaking evaluation (have); **human examiner evaluation as a paid add-on with a stated turnaround** (missing); downloadable practice packs as a purchasable product (missing).

**Study abroad** — destination pages per country and an institution list (missing). Lowest priority of the group: it is adjacent to exam prep rather than part of it, and carries no learning functionality.

**Account and commerce** — login/signup (have); dashboard with history and subscription state (have); band-score trend and study-time totals (partial — latest-per-skill only, no time series); mistake analytics by question type (have); referral programme (have); pricing with multiple durations (have); **pay-per-use credits (missing)**; eSewa/Khalti QR checkout with admin approval (have — keep).

**Shell** — two-tier header with the nav in its own band (§2); light centred page shell (§7.1); persistent utility rail; dark-mode toggle (missing); interface language switcher (missing); PWA install (missing).

### 5. AI-Powered Tools (each as its own page/tool)
- Writing Task 1 (Academic report) checker + generator
- Writing Task 1 (General letter) checker + generator
- Writing Task 2 (essay) checker + generator
- Speaking Part 1/2/3 answer checker + generator
- Band score calculators (Listening, Reading, Writing, Speaking, Overall)
- Paraphraser
- Sentence explainer
- Summarizer
- Translator
- Grammar checker / "is this grammatically correct" checker
- Text improver
- Text-to-speech generator
- Built-in dictionary lookup (inline, usable while reading any passage or doing any exercise)
- Flashcards system
- Placement/diagnostic assessment — short adaptive test that scores the learner and generates a Learning Path
- Instant criterion-based scoring for Writing and Speaking submissions: return a per-criterion breakdown (e.g., task achievement, coherence, lexical resource, grammar for writing) rather than a single number, with inline error highlighting and specific fix suggestions
- Answer-review mode for objective tests (Reading/Listening/Grammar): after submission, highlight exactly where in the passage/audio each answer came from, alongside the explanation

**Exam-simulation mode:** for full tests, offer an interface styled to closely match the real computer-delivered IELTS test (similar layout, navigation, and on-screen timer) so the practice experience itself builds familiarity — separate from the simpler practice-mode UI used for individual exercises.

### 6. User Accounts & Monetization
- Free tier: limited monthly uses of AI tools, full access to static practice content
- Premium tier: unlimited AI tool usage, saved progress, mistake analytics by question type, priority support
- Optional add-on tier: paid human-reviewed feedback on a writing/speaking submission (real instructor, turnaround time stated up front) layered on top of the AI scoring — a slower, higher-touch option some learners will pay extra for
- Optional pay-per-use credits as an alternative to subscriptions, for learners who want occasional AI scoring without a recurring plan
- One-time or subscription-style plans across multiple durations, with a discount/urgency banner
- Login/signup flow, account dashboard showing: saved progress and history, average band score trend, total study time, and a breakdown of weakest question types
- Daily study reminder / spaced-repetition prompts for flashcards and past mistakes
- Referral/affiliate program with unique links and payout tracking
- If targeting multiple regions: localized pricing/currency (currency switcher) and a region-specific payment method (e.g., bank transfer + QR code for markets without wide card usage)
- If targeting non-English-speaking markets: interface language switcher for navigation/UI chrome (keep the actual English-learning content in English)

### 6a. Content Organization
- Every practice item (test, sample, article) tagged by: skill (Reading/Listening/Writing/Speaking), band level, source test set, and topic
- Category + tag archive pages (e.g., "all Band-9 samples tagged Writing Task 2")
- Consistent URL structure per content type for SEO

### 7. Design Direction
- Clean, modern, education-friendly UI — plenty of whitespace, rounded cards, soft shadows
- Consistent icon style for the tools grid (flat, colorful, simple)
- Card-based layout throughout (tests, courses, articles, tools)
- Mobile-first responsive design
- Light and dark mode, user-toggleable
- Clear visual hierarchy between free and premium content (e.g., lock icons or "Premium" badges)

**7.1 Page shell (v3 — this supersedes the dark-hero treatment currently built).**
The palette itself is already correct and must not be re-picked: deep navy primary, teal secondary, warm orange for calls to action. What changes is how it is applied.

- **Light surfaces are the default.** Pages sit on white or a very pale tint. Navy is for the nav band, headings, and solid buttons — **not** for full-bleed page backgrounds. The dark hero band goes.
- **Centred, not left-aligned.** The hero and every major section heading centre on the page. Headings run large, in two tones: most of the line in navy with one phrase in teal, rather than a single flat colour.
- **Section heading pattern:** centred title, then a short centred sub-line flanked left and right by thin teal rules.
- **Pill buttons.** Fully rounded. Primary is solid navy, secondary is white with a navy border; the leading CTA carries a circular arrow badge on its right. No gradient fills.
- **Density over emptiness.** These platforms show a lot per screen — cards carry a thumbnail, a title, a metadata row, and their action. Prefer a filled card grid over a large empty band with one sentence in it.
- **Persistent utility rail:** a small fixed right-edge rail with two or three shortcuts (e.g. Library, Contact), visible as the page scrolls, plus a back-to-top control.

**7.2 What not to import.** Do not copy the reference sites' illustrations, photography, book-cover artwork, instructor portraits, or usage figures. Collection artwork is either our own generated cover or a plain typographic tile. Any statistic on the page must come from a live query (§7a).
- The exam-simulation interface (full tests) can visually diverge from the rest of the site — closer to a real test-taking UI than a marketing/content UI — while individual practice exercises stay in the site's normal style

### 7a. Trust & Credibility Signals
- Review count / rating badge in the hero or trust bar, sourced honestly (don't fabricate numbers pre-launch — start this section empty or with a soft "new" framing and let it grow)
- Partner/accreditation logos row, only for partnerships you actually have
- If offering any guarantee (refund window, response-time commitment), state it plainly near the relevant pricing tier — don't overpromise
- Copyright/DMCA notice page, and a clear statement in Terms that site content may not be copied or redistributed — worth having from day one given how commonly this content gets scraped in this niche
- App store badges in the footer once/if a mobile app exists (not required for MVP)

### 8. Recommended Tech Stack

**Framework: Next.js (App Router) + TypeScript + Tailwind CSS**
Good fit here specifically because most of this site's value is in SEO-indexable content pages (thousands of samples/tips/tests) alongside interactive tools — Next.js gives you SSG/ISR for the content pages and API routes/Server Actions for the AI tools in one codebase. Deploy on **Vercel** (built for Next.js, zero-config).

**Database: PostgreSQL**, managed via **Supabase** or **Neon** to start (both have generous free tiers, built-in connection pooling, and Supabase bundles auth + file storage too — fewer services to wire up early on). Use **Prisma** as the ORM.
- Store flexible per-content-type data (questions, samples, MCQ options, etc.) in a `JSONB` column, same shape the generator script above outputs — avoids a rigid schema per content type while keeping common fields (`task_type`, `skill`, `band_level`, `tags`) as real indexed columns for filtering/search.
- Separate tables for `users`, `subscriptions`, `submissions` (user-written answers), and `progress`.

**Auth: NextAuth.js (Auth.js)** or **Clerk** if you want a faster hosted setup with less boilerplate. Supabase Auth is also fine if you're already on Supabase for the DB.

**Payments: Stripe** for card/subscription billing. Add a regional gateway alongside it only if a specific market you're targeting doesn't use cards widely.

**AI features: Anthropic API (Claude)** for the checkers, generators, and AI Conversations chat — the **Vercel AI SDK** makes streaming responses into the UI straightforward.

**File storage** (audio for speaking/dictation, video captions): Cloudflare R2 or AWS S3 (Supabase Storage also works if you're already there).

**Search:** Postgres full-text search is enough at first; move to Meilisearch or Algolia only once the content library is large.

**Transactional email:** Resend or Postmark (signup, password reset, receipts).

**Analytics:** PostHog or Vercel Analytics.

**CI/CD:** GitHub + Vercel preview deployments per PR.

**Internationalization** (only if you're adding the interface-language switcher from section 6): `next-intl` handles UI-chrome translation cleanly in the App Router.

**Progressive Web App:** wrapping the Next.js site as a PWA (installable, works offline for already-visited pages) covers most of the value of a native mobile app without a separate codebase — worth doing before committing to a full iOS/Android build.

### 9. What to make original
- Brand name, logo, color palette, and voice
- All testimonials, sample essays, and blog content
- Marketing copy and CTAs
- Any "success story" or review content — real ones from your own users only, never invented or borrowed

---

**Tip:** Start by scoping an MVP — e.g., 3 AI tools (Writing Task 2 checker, Speaking Part 2 checker, Band calculator) + practice tests + a simple pricing page — before building out the full content library. Live lessons, the paid human-review tier, the mobile app, and multi-currency/language support are all reasonable v2+ additions once the core content-and-tools loop is working.
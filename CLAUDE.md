# Project rules

Stack: Next.js (App Router) + TypeScript + Tailwind v4 + Prisma + Supabase Postgres + NextAuth.js v5
Spec: full site plan is in site-build-prompt.md — read it when relevant, don't restate it back to me
Package manager: npm
Work file-by-file: implement one section/feature, stop, wait for review — never build multiple sections in one pass
Don't add features not in site-build-prompt.md without asking first

## Zero running cost

Every dependency and service must be free at our scale. Check before adding one.
Browser APIs over paid services: `speechSynthesis` for TTS, `SpeechRecognition` for
transcription, `dictionaryapi.dev` (no key) for word lookup. Media must be CC0/CC BY, credited.

The Anthropic API is the **only** paid component. It stays quota-gated and non-blocking —
every core learning feature must work with AI switched off. Nothing outside the AI tool pages
may depend on an API call.

## Honesty rules

No invented testimonials, community activity, review scores, or user counts. No claims of
predicting exam questions. No Pronunciation score from a text transcript. Nothing on the
pricing table that isn't built. Empty states say "nothing here yet."

If a fix would require removing working functionality from existing users, or changing a
claim made to paying customers, ask — that's a business decision, not a code one.

## Content & data

Content lives in `ContentItem.data` (JSONB), Zod-validated per type in `lib/content/*`,
seeded from `prisma/seed-data/*` via `prisma/seed-content.ts` (rerunnable, upserts by slug).
Prefer splitting on an existing field (e.g. `taskType`) over a schema migration.

**Prisma CLI migrations hang on this machine** (`schema-engine` binary — thoroughly diagnosed,
not a network/firewall issue, do not re-investigate). For schema changes use:
`prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script`,
apply the SQL via a one-off `pg` script, then `prisma generate` with the dev server stopped.

**SQL NULL trap:** filtering with `{ not: "x" }` silently drops every row where the column is
NULL. Always add an explicit null branch: `OR: [{ f: null }, { f: { not: "x" } }]`.

`pg` and `playwright` are installed with `--no-save`, so `npm install <x> --no-save` prunes
them — reinstall with `npm install playwright pg --no-save`. Verification scripts run under
`npx tsx` (the generated Prisma client is TypeScript).

## UI

Use the shared primitives in `components/ui/` (`Button`, `Card`, `SectionHeading`,
`ScrollReveal`, `StatCounter`) — don't hand-roll button or card styles. Tailwind v4 canonical
class names (`bg-linear-to-r`, not `bg-gradient-to-r`). Motion respects `prefers-reduced-motion`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

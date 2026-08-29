import { NextResponse } from "next/server";

/**
 * Word lookup for the inline dictionary (site-build-prompt.md section 5).
 *
 * **Source note.** CLAUDE.md names dictionaryapi.dev, which has returned 522 on every
 * request across this work, so this uses Wiktionary's Wikimedia REST endpoint instead —
 * also free, also key-less, and considerably more reliable. Its content is CC BY-SA, so
 * the UI credits and links to Wiktionary; that attribution is not optional decoration.
 *
 * Proxied through our own route rather than fetched from the browser for two reasons:
 * Wikimedia asks API clients to identify themselves with a User-Agent, which a browser
 * will not let us set, and routing it here lets the response be cached so repeated
 * lookups of the same word cost nothing.
 */

const WIKTIONARY = "https://en.wiktionary.org/api/rest_v1/page/definition";
const USER_AGENT = "ScoreWell/1.0 (IELTS practice site; inline dictionary lookup)";

/** A week: definitions do not move, and this keeps repeat lookups off the network. */
const CACHE_SECONDS = 60 * 60 * 24 * 7;

export type DictionarySense = { definition: string; examples: string[] };
export type DictionaryEntry = { partOfSpeech: string; senses: DictionarySense[] };
export type DictionaryResult = { word: string; entries: DictionaryEntry[] };

/**
 * Wiktionary returns definitions as HTML fragments. They are converted to plain text here
 * rather than rendered: injecting third-party HTML into the page would be an XSS hole, and
 * the markup is wiki-internal links that would be broken anyway.
 */
function toPlainText(html: string): string {
  return html
    .replace(/<li\b[^>]*>/gi, " • ")
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const WORD_PATTERN = /^[A-Za-z][A-Za-z'-]{1,31}$/;

export async function GET(request: Request) {
  const word = (new URL(request.url).searchParams.get("word") ?? "").trim().toLowerCase();

  // Validated before it reaches Wikimedia, so this can't be used as a general-purpose proxy.
  if (!WORD_PATTERN.test(word)) {
    return NextResponse.json({ error: "Not a word we can look up." }, { status: 400 });
  }

  try {
    const response = await fetch(`${WIKTIONARY}/${encodeURIComponent(word)}`, {
      headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
      next: { revalidate: CACHE_SECONDS },
    });

    if (response.status === 404) {
      return NextResponse.json({ error: "No definition found." }, { status: 404 });
    }
    if (!response.ok) {
      return NextResponse.json({ error: "The dictionary is unavailable." }, { status: 502 });
    }

    const payload = (await response.json()) as Record<string, unknown>;
    const english = payload.en;
    if (!Array.isArray(english)) {
      return NextResponse.json({ error: "No English definition found." }, { status: 404 });
    }

    const entries: DictionaryEntry[] = [];
    for (const raw of english) {
      const section = raw as {
        partOfSpeech?: string;
        definitions?: { definition?: string; examples?: string[] }[];
      };
      const senses = (section.definitions ?? [])
        .map((sense) => ({
          definition: toPlainText(sense.definition ?? ""),
          examples: (sense.examples ?? []).map(toPlainText).filter(Boolean).slice(0, 1),
        }))
        .filter((sense) => sense.definition.length > 0)
        // Two senses per part of speech is plenty for a reading aid.
        .slice(0, 2);

      if (senses.length) {
        entries.push({ partOfSpeech: section.partOfSpeech ?? "", senses });
      }
      if (entries.length >= 3) break;
    }

    if (entries.length === 0) {
      return NextResponse.json({ error: "No definition found." }, { status: 404 });
    }

    const result: DictionaryResult = { word, entries };
    return NextResponse.json(result, {
      headers: { "Cache-Control": `public, max-age=${CACHE_SECONDS}` },
    });
  } catch {
    // The dictionary is an aid, never a dependency — a failure here must not surface as
    // a broken page, only as "unavailable" inside the popover.
    return NextResponse.json({ error: "The dictionary is unavailable." }, { status: 502 });
  }
}

/**
 * Every evidence quote must appear verbatim in the passage or transcript it claims to come
 * from. A quote that does not match is worse than no quote: review highlights nothing on a
 * reading test, and on a listening test the replay speaks words the recording never said.
 *
 * Run after editing seed content: npx tsx scripts/check-evidence-quotes.ts
 */
import "dotenv/config";
import { prisma } from "@/lib/prisma";

type Q = {
  id: string;
  options?: string[];
  correctIndex?: number;
  accept?: string[];
  evidence?: { quote?: string };
  distractorNotes?: Record<string, string>;
};

async function main() {
  // Mini exercises are included because they are scored the same way and now carry the same
  // explanations; the distractor-key rule below has already caught real errors in both.
  const items = await prisma.contentItem.findMany({
    where: { contentType: { in: ["PRACTICE_TEST", "MINI_EXERCISE"] }, published: true },
    select: { slug: true, skill: true, data: true },
  });

  let checked = 0;
  const bad: string[] = [];
  for (const item of items) {
    const data = item.data as Record<string, unknown>;
    const source = String(data.transcript ?? data.passage ?? "");
    const flat = (data.questions ?? []) as Q[];
    const grouped = ((data.groups ?? []) as { questions: Q[] }[]).flatMap((g) => g.questions ?? []);
    // Grouped questions use the exam schema (matching, true/false, completion), which Zod
    // validates on load and which names its fields differently; speaking "questions" are
    // plain prompt strings with no answer at all. Only the flat Quiz shape is checked for
    // answerability below, so both are compared for quotes but exempt from that rule.
    const flatIds = new Set(flat.filter((q) => q && typeof q === "object" && q.id).map((q) => q.id));

    for (const q of [...flat, ...grouped]) {
      if (!q || typeof q !== "object") continue;
      const quote = q.evidence?.quote;
      if (quote) {
        checked++;
        if (!source) bad.push(`${item.slug} ${q.id}: quote but no passage/transcript to match against`);
        else if (!source.includes(quote)) bad.push(`${item.slug} ${q.id}: quote not found verbatim — "${quote.slice(0, 60)}"`);
      }

      // A question is answerable either by choosing an option or by typing. With neither it
      // renders an empty input nothing can mark, and with a missing correctIndex every
      // attempt is wrong — both are silent until someone sits the exercise.
      const isFlatQuizQuestion = flatIds.has(q.id);
      const choosable = Array.isArray(q.options) && q.options.length > 0;
      const typable = Array.isArray(q.accept) && q.accept.length > 0;
      if (!isFlatQuizQuestion) {
        // not a Quiz-rendered question — nothing to assert about its answer shape
      } else if (!choosable && !typable) {
        bad.push(`${item.slug} ${q.id}: neither options nor accept — nothing to answer`);
      } else if (choosable && typeof q.correctIndex !== "number") {
        bad.push(`${item.slug} ${q.id}: has options but no correctIndex`);
      }

      // A note keyed to the right answer explains why the correct option is wrong, which is
      // worse than silence — and it is invisible until someone happens to pick that option.
      for (const key of Object.keys(q.distractorNotes ?? {})) {
        const index = Number(key);
        if (!Number.isInteger(index) || index < 0 || index >= (q.options?.length ?? 0)) {
          bad.push(`${item.slug} ${q.id}: distractor note keyed "${key}", which is not an option index`);
        } else if (index === q.correctIndex) {
          bad.push(`${item.slug} ${q.id}: distractor note keyed to the CORRECT option (${key})`);
        }
      }
    }
  }

  console.log(`checked ${checked} quotes across ${items.length} tests`);
  if (bad.length === 0) console.log("all quotes match their source exactly");
  else { for (const b of bad) console.log("  MISMATCH", b); process.exitCode = 1; }
}
main().finally(() => prisma.$disconnect());

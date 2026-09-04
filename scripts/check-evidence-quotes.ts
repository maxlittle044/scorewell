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
    for (const q of [...flat, ...grouped]) {
      const quote = q.evidence?.quote;
      if (quote) {
        checked++;
        if (!source) bad.push(`${item.slug} ${q.id}: quote but no passage/transcript to match against`);
        else if (!source.includes(quote)) bad.push(`${item.slug} ${q.id}: quote not found verbatim — "${quote.slice(0, 60)}"`);
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

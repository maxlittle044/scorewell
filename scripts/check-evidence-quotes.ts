/**
 * Every evidence quote must appear verbatim in the passage or transcript it claims to come
 * from. A quote that does not match is worse than no quote: review highlights nothing on a
 * reading test, and on a listening test the replay speaks words the recording never said.
 *
 * Run after editing seed content: npx tsx scripts/check-evidence-quotes.ts
 */
import "dotenv/config";
import { prisma } from "@/lib/prisma";

type Q = { id: string; evidence?: { quote?: string } };

async function main() {
  const items = await prisma.contentItem.findMany({
    where: { contentType: "PRACTICE_TEST", published: true, skill: { in: ["READING", "LISTENING"] } },
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
      if (!quote) continue;
      checked++;
      if (!source) bad.push(`${item.slug} ${q.id}: quote but no passage/transcript to match against`);
      else if (!source.includes(quote)) bad.push(`${item.slug} ${q.id}: quote not found verbatim — "${quote.slice(0, 60)}"`);
    }
  }

  console.log(`checked ${checked} quotes across ${items.length} tests`);
  if (bad.length === 0) console.log("all quotes match their source exactly");
  else { for (const b of bad) console.log("  MISMATCH", b); process.exitCode = 1; }
}
main().finally(() => prisma.$disconnect());

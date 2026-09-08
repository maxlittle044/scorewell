/**
 * Exercises every AI path against the live provider, once each.
 *
 * The provider switch changed the model, the SDK and the structured-output mechanism at the
 * same time, and none of it can be proven by type-checking: prompts written for one model
 * family are not guaranteed to behave on another. This runs the real calls and checks the
 * shapes the app actually depends on — four criteria, bands in range, verbatim quotes.
 *
 *   npx tsx scripts/check-ai.ts
 *
 * Costs nothing on the free tier, but it does consume a handful of rate-limited requests.
 */
import "dotenv/config";
import { checkWritingAnswer, generateSampleAnswer } from "@/lib/ai/writing-checker";
import { checkSpeakingAnswer, generateSpeakingSample } from "@/lib/ai/speaking-checker";
import { runTextTool } from "@/lib/ai/text-tool";

const ESSAY = `Some people believe university education should be free for all students, while others argue that students should contribute to the cost. In my view a mixed model is fairest.

Those who favour free tuition point out that education is a public good. When cost is removed, talented students from poorer households can attend, which widens participation. However, universal free provision is expensive, and the burden falls on taxpayers who may never attend university themself. Since graduates typically earn more, asking them to repay a portion once they are earning is not unreasonable.

In conclusion, I believe the fairest arrangement combines public subsidy with proportionate graduate contributions.`;

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
}

async function main() {
  if (!process.env.GROQ_API_KEY) {
    console.log("GROQ_API_KEY is not set. Add it to .env — free key at console.groq.com/keys");
    process.exitCode = 1;
    return;
  }

  console.log("--- writing check (structured) ---");
  const w = await checkWritingAnswer({ taskType: "task2", essayText: ESSAY });
  check("overall band in range", w.overallBand >= 0 && w.overallBand <= 9, `band ${w.overallBand}`);
  check("exactly four criteria", w.criteria.length === 4, w.criteria.map((c) => `${c.name} ${c.band}`).join(", "));
  check("every criterion band in range", w.criteria.every((c) => c.band >= 0 && c.band <= 9));
  check("strengths and improvements present", w.strengths.length > 0 && w.improvements.length > 0);
  // The inline marking is only useful if the quotes are really in the essay.
  const verbatim = w.errors.filter((e) => ESSAY.includes(e.quote));
  check(
    "error quotes are verbatim",
    w.errors.length === 0 || verbatim.length > 0,
    `${verbatim.length}/${w.errors.length} matched the essay exactly`,
  );
  if (w.errors.length > verbatim.length) {
    console.log("      note: unmatched quotes fall back to the 'couldn't pinpoint' list, by design");
  }

  console.log("\n--- writing sample (text) ---");
  const sample = await generateSampleAnswer({ taskType: "task2", examPrompt: "Some people think museums should be free. Discuss." });
  check("sample returned", sample.length > 200, `${sample.split(/\s+/).length} words`);

  console.log("\n--- speaking check (structured) ---");
  const s = await checkSpeakingAnswer({
    part: "part1",
    prompt: "What kind of music do you enjoy?",
    transcript: "I really like jazz, mainly because it feels improvised and alive. I listen to it when I'm working.",
  });
  check("three criteria (pronunciation excluded)", s.criteria.length === 3, s.criteria.map((c) => c.name).join(", "));
  check("band in range", s.overallBand >= 0 && s.overallBand <= 9, `band ${s.overallBand}`);

  console.log("\n--- speaking sample (text) ---");
  const ss = await generateSpeakingSample({ part: "part2", prompt: "Describe a book that made an impression on you." });
  check("sample returned", ss.length > 100, `${ss.split(/\s+/).length} words`);

  console.log("\n--- text tools ---");
  const para = await runTextTool({ kind: "paraphraser", inputText: "The government should invest more in public transport." });
  check("paraphraser rewrote the text", para.length > 10 && para !== "The government should invest more in public transport.", para.slice(0, 70));
  const tr = await runTextTool({ kind: "translator", inputText: "Good morning", targetLanguage: "French" });
  check("translator produced French", /bonjour|bon matin/i.test(tr), tr.slice(0, 60));
  const gc = await runTextTool({ kind: "grammar-checker", inputText: "She go to school every day." });
  check("grammar checker found the error", /goes/i.test(gc), gc.slice(0, 70));

  console.log(`\n${failures === 0 ? "All AI paths working." : `${failures} check(s) failed.`}`);
  if (failures > 0) process.exitCode = 1;
}

main().catch((e) => {
  console.error("\nAI check threw:", e?.message ?? e);
  process.exitCode = 1;
});

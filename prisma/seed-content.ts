// Rerunnable content seed. Run with: npx tsx prisma/seed-content.ts
// Upserts by slug, so it's safe to re-run after editing anything in seed-data/.
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { READING_TESTS } from "./seed-data/reading";
import { LISTENING_TESTS } from "./seed-data/listening";
import { GRAMMAR_TESTS, MINI_EXERCISES } from "./seed-data/quizzes";
import { BAND_9_SAMPLES } from "./seed-data/samples";
import { TIPS } from "./seed-data/tips";
import { WRITING_ITEMS } from "./seed-data/writing";
import { SPEAKING_TESTS } from "./seed-data/speaking";
import { COURSES } from "./seed-data/courses";
import { PRONUNCIATION_DRILLS } from "./seed-data/pronunciation";
import { DICTATION_EXERCISES } from "./seed-data/dictation";
import { AI_CONVERSATIONS } from "./seed-data/ai-conversations";
import { VIDEO_LESSONS } from "./seed-data/video-lessons";
import { TOPIC_POOLS } from "./seed-data/topic-pools";
import { TOPIC_BANKS } from "./seed-data/topic-banks";
import { LIVE_LESSONS } from "./seed-data/live-lessons";
import { collectionFor } from "./seed-data/mock-sets";
import { PLACEMENT_SEED } from "./seed-data/placement";

// The generated client is engineType "client" (no Rust engine), so it needs a driver
// adapter here exactly as lib/prisma.ts does — a bare `new PrismaClient()` fails with P2038.
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  for (const test of READING_TESTS) {
    const fields = {
      title: test.title,
      // Cross-skill collection, so a collection is a full sitting (see mock-sets.ts).
      // `test.sourceTestSet` stays in the seed type as the variant label it always was.
      sourceTestSet: collectionFor(test.slug),
      topic: test.topic,
      tags: test.tags,
      published: true,
      data: test.data,
    };
    await prisma.contentItem.upsert({
      where: { slug: test.slug },
      create: { slug: test.slug, contentType: "PRACTICE_TEST", skill: "READING", ...fields },
      update: fields,
    });
    console.log("reading      ", test.slug);
  }

  for (const test of LISTENING_TESTS) {
    const fields = {
      title: test.title,
      // Collection name — the Exam Library groups on this (spec section 4a).
      sourceTestSet: collectionFor(test.slug),
      topic: test.topic,
      tags: test.tags,
      published: true,
      data: test.data,
    };
    await prisma.contentItem.upsert({
      where: { slug: test.slug },
      create: { slug: test.slug, contentType: "PRACTICE_TEST", skill: "LISTENING", ...fields },
      update: fields,
    });
    console.log("listening    ", test.slug);
  }

  // Grammar tests and mini exercises share the MINI_EXERCISE content type and
  // are distinguished by taskType, so no schema change is needed for either.
  for (const [items, taskType, label] of [
    [GRAMMAR_TESTS, "grammar-test", "grammar test  "],
    [MINI_EXERCISES, "mini-exercise", "mini exercise "],
  ] as const) {
    for (const item of items) {
      const fields = {
        title: item.title,
        taskType,
        topic: item.topic,
        tags: item.tags,
        published: true,
        data: item.data,
      };
      await prisma.contentItem.upsert({
        where: { slug: item.slug },
        create: { slug: item.slug, contentType: "MINI_EXERCISE" as const, ...fields },
        update: fields,
      });
      console.log(label, item.slug);
    }
  }

  for (const sample of BAND_9_SAMPLES) {
    const fields = {
      title: sample.title,
      skill: sample.skill,
      taskType: sample.taskType,
      bandLevel: "9",
      topic: sample.topic,
      tags: sample.tags,
      published: true,
      data: sample.data,
    };
    await prisma.contentItem.upsert({
      where: { slug: sample.slug },
      create: { slug: sample.slug, contentType: "SAMPLE_ANSWER", ...fields },
      update: fields,
    });
    console.log("band-9 sample", sample.slug);
  }

  for (const tip of TIPS) {
    const fields = {
      title: tip.title,
      topic: tip.topic,
      tags: tip.tags,
      published: true,
      data: tip.data,
    };
    await prisma.contentItem.upsert({
      where: { slug: tip.slug },
      create: { slug: tip.slug, contentType: "ARTICLE", ...fields },
      update: fields,
    });
    console.log("tip article  ", tip.slug);
  }

  for (const item of WRITING_ITEMS) {
    const fields = {
      title: item.title,
      skill: "WRITING" as const,
      sourceTestSet: item.kind === "test" ? collectionFor(item.slug) : null,
      taskType: item.taskType,
      topic: item.topic,
      tags: item.tags,
      published: true,
      data: item.data,
    };
    await prisma.contentItem.upsert({
      where: { slug: item.slug },
      create: {
        slug: item.slug,
        contentType: item.kind === "test" ? "PRACTICE_TEST" : "WRITING_EXERCISE",
        ...fields,
      },
      update: fields,
    });
    console.log(item.kind === "test" ? "writing test " : "writing exer ", item.slug);
  }

  for (const test of SPEAKING_TESTS) {
    const fields = {
      title: test.title,
      skill: "SPEAKING" as const,
      sourceTestSet: collectionFor(test.slug),
      taskType: test.part,
      topic: test.topic,
      tags: test.tags,
      published: true,
      data: test.data,
    };
    await prisma.contentItem.upsert({
      where: { slug: test.slug },
      create: { slug: test.slug, contentType: "PRACTICE_TEST", ...fields },
      update: fields,
    });
    console.log("speaking test", test.slug);
  }

  for (const course of COURSES) {
    const fields = {
      title: course.title,
      topic: course.topic,
      tags: course.tags,
      published: true,
      data: course.data,
    };
    await prisma.contentItem.upsert({
      where: { slug: course.slug },
      create: { slug: course.slug, contentType: "COURSE", ...fields },
      update: fields,
    });
    console.log("course       ", course.slug);
  }

  for (const drill of PRONUNCIATION_DRILLS) {
    const fields = {
      title: drill.title,
      skill: "SPEAKING" as const,
      topic: drill.topic,
      tags: drill.tags,
      published: true,
      data: drill.data,
    };
    await prisma.contentItem.upsert({
      where: { slug: drill.slug },
      create: { slug: drill.slug, contentType: "PRONUNCIATION_DRILL", ...fields },
      update: fields,
    });
    console.log("pronunciation", drill.slug);
  }

  for (const exercise of DICTATION_EXERCISES) {
    const fields = {
      title: exercise.title,
      skill: "LISTENING" as const,
      topic: exercise.topic,
      tags: exercise.tags,
      published: true,
      data: exercise.data,
    };
    await prisma.contentItem.upsert({
      where: { slug: exercise.slug },
      create: { slug: exercise.slug, contentType: "DICTATION_SHADOWING", ...fields },
      update: fields,
    });
    console.log("dictation    ", exercise.slug);
  }

  for (const topic of AI_CONVERSATIONS) {
    const fields = {
      title: topic.title,
      skill: "SPEAKING" as const,
      topic: topic.topic,
      tags: topic.tags,
      published: true,
      data: topic.data,
    };
    await prisma.contentItem.upsert({
      where: { slug: topic.slug },
      create: { slug: topic.slug, contentType: "AI_CONVERSATION", ...fields },
      update: fields,
    });
    console.log("ai conversat ", topic.slug);
  }

  for (const lesson of VIDEO_LESSONS) {
    const fields = {
      title: lesson.title,
      topic: lesson.topic,
      tags: lesson.tags,
      published: true,
      data: lesson.data,
    };
    await prisma.contentItem.upsert({
      where: { slug: lesson.slug },
      create: { slug: lesson.slug, contentType: "VIDEO_LESSON", ...fields },
      update: fields,
    });
    console.log("video lesson ", lesson.slug);
  }

  for (const pool of TOPIC_POOLS) {
    const fields = {
      title: pool.title,
      taskType: "topic-pool",
      topic: pool.topic,
      tags: pool.tags,
      published: true,
      data: pool.data,
    };
    await prisma.contentItem.upsert({
      where: { slug: pool.slug },
      create: { slug: pool.slug, contentType: "ARTICLE" as const, ...fields },
      update: fields,
    });
    console.log("topic pool   ", pool.slug);
  }

  // Topic banks are ARTICLEs too, split from tips and topic pools by taskType.
  for (const bank of TOPIC_BANKS) {
    const fields = {
      title: bank.title,
      taskType: "topic-bank",
      topic: bank.topic,
      tags: bank.tags,
      published: true,
      data: bank.data,
    };
    await prisma.contentItem.upsert({
      where: { slug: bank.slug },
      create: { slug: bank.slug, contentType: "ARTICLE" as const, ...fields },
      update: fields,
    });
    console.log("topic bank   ", bank.slug);
  }

  // Live lessons are scheduled VIDEO_LESSONs, split off by taskType.
  for (const lesson of LIVE_LESSONS) {
    const fields = {
      title: lesson.title,
      taskType: "live-lesson",
      topic: lesson.topic,
      tags: lesson.tags,
      published: true,
      data: lesson.data,
    };
    await prisma.contentItem.upsert({
      where: { slug: lesson.slug },
      create: { slug: lesson.slug, contentType: "VIDEO_LESSON" as const, ...fields },
      update: fields,
    });
    console.log("live lesson  ", lesson.slug);
  }

  // The placement diagnostic — a MINI_EXERCISE split off by taskType, like the others.
  {
    const fields = {
      title: PLACEMENT_SEED.title,
      taskType: "placement",
      topic: PLACEMENT_SEED.topic,
      tags: PLACEMENT_SEED.tags,
      published: true,
      data: PLACEMENT_SEED.data,
    };
    await prisma.contentItem.upsert({
      where: { slug: PLACEMENT_SEED.slug },
      create: { slug: PLACEMENT_SEED.slug, contentType: "MINI_EXERCISE" as const, ...fields },
      update: fields,
    });
    console.log("placement    ", PLACEMENT_SEED.slug);
  }

  const total = await prisma.contentItem.count({ where: { published: true } });
  console.log(`\n${total} published content items.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });

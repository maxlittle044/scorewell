export type VideoLessonSeed = {
  slug: string;
  title: string;
  topic: string;
  tags: string[];
  data: {
    summary: string;
    lessonMinutes: number;
    keyPoints: string[];
    /** The written lesson — real teaching material, independent of the clip. */
    transcript: string[];
    video: {
      /** "mp4" plays in a native <video>; "youtube" embeds a player. */
      kind: "mp4" | "youtube";
      /** MP4 URL, or the YouTube video id for kind "youtube". */
      src: string;
      /** Attribution for the footage. */
      credit: string;
      /**
       * True while the clip is stand-in footage rather than a real recorded
       * lesson. The player says so, so nobody mistakes it for the lesson.
       * Set false (and swap `src`) once real videos are produced.
       */
      placeholder: boolean;
      /** Optional WebVTT captions; none exist for the stand-in clips. */
      captionsUrl?: string;
    };
  };
};

export const VIDEO_LESSONS: VideoLessonSeed[] = [
  {
    slug: "common-grammar-mistakes",
    title: "5 Common Grammar Mistakes to Avoid",
    topic: "Grammar",
    tags: ["video-lesson", "grammar", "writing", "exam-strategy"],
    data: {
      lessonMinutes: 6,
      summary:
        "Five errors that appear in Task 2 essays at every band, and the quick check that catches each one.",
      keyPoints: [
        "“Affect” is the verb, “effect” is the noun — if “the” fits in front, it's effect.",
        "Countable nouns need a determiner: “research shows” but “a study shows”.",
        "“Nowadays” and “in recent years” take the present perfect, not the past simple.",
        "Don't start a sentence with “Because” unless you finish the main clause.",
        "One idea per sentence beats a long sentence held together by commas.",
      ],
      transcript: [
        "The mistakes that cost candidates marks in Grammatical Range and Accuracy are rarely exotic. They are a small set of high-frequency errors that appear again and again, and the good news is that each one has a mechanical check you can run in the two minutes you spend proofreading.",
        "The first is affect versus effect. Affect is almost always a verb — something affects something else. Effect is almost always a noun — the effect of something. If you can put “the” or “an” in front of it, you want effect. The exception, “to effect change”, is rare enough that you can safely ignore it in an exam.",
        "The second is the uncountable noun. Research, advice, information, equipment and knowledge are uncountable in English. You cannot write “a research” or “many researches”. Write “research shows”, or if you need a singular, write “a study shows”. Examiners notice this instantly because it is so common.",
        "The third is tense with time expressions. “Nowadays”, “over the past decade” and “in recent years” describe a period that runs up to now, so they take the present perfect: “In recent years, governments have invested heavily.” Using the past simple there — “governments invested” — is a genuine grammatical error, not a stylistic choice.",
        "The fourth is the stranded subordinate clause. “Because many people work from home.” is not a sentence; it is half of one. Either attach it to a main clause, or rewrite it. This is worth checking specifically, because it tends to appear exactly where you are making your strongest point.",
        "The fifth is not really a single error but a habit: the sentence that keeps going. If a sentence contains three commas and you are not confident about any of them, split it in two. A short accurate sentence scores better than a long one that collapses. Range means variety, not length.",
      ],
      video: {
        kind: "mp4",
        src: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
        credit: "Big Buck Bunny © Blender Foundation, CC BY 3.0 — via test-videos.co.uk",
        placeholder: true,
      },
    },
  },
  {
    slug: "how-examiners-score-speaking",
    title: "How Examiners Score Speaking",
    topic: "Speaking",
    tags: ["video-lesson", "speaking", "band-scores", "exam-strategy"],
    data: {
      lessonMinutes: 8,
      summary:
        "What the examiner is actually marking while you talk — the four criteria, and what moves each one.",
      keyPoints: [
        "Four criteria, each worth 25%: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation.",
        "Fluency is about continuing, not about speed — hesitating to search for words costs more than speaking slowly.",
        "Lexical Resource rewards precision and idiom, not long words used incorrectly.",
        "Pronunciation is marked on how easy you are to understand, not on having a British accent.",
        "The examiner marks the whole performance, so a weak Part 1 can be recovered in Part 3.",
      ],
      transcript: [
        "Candidates often imagine the examiner is listening for mistakes. They are not, exactly. They are placing your performance against four sets of band descriptors, each carrying equal weight, and each rewarding something quite specific.",
        "Fluency and Coherence is first, and it is the one most often misunderstood. It does not mean speaking quickly. It means being able to keep going at a natural pace, organising your ideas so a listener can follow, and using discourse markers to signal where you are heading. A candidate who speaks slowly but continuously will usually outscore one who speaks fast in bursts separated by long searching pauses. Self-correction is normal and is not penalised.",
        "Lexical Resource is your vocabulary — but specifically your ability to use the right word for the meaning you want, including less common items and idiomatic language. This is where candidates hurt themselves by inserting memorised “high-level” words that do not fit. A precisely used common word scores better than an impressive word used wrongly, because the descriptor rewards appropriacy, not rarity.",
        "Grammatical Range and Accuracy looks at both halves of its name. Range means you produce a variety of structures — conditionals, relative clauses, a range of tenses — rather than a string of simple sentences. Accuracy means those structures are correct. You need both: flawless simple sentences cap your range, and ambitious structures that collapse cap your accuracy.",
        "Pronunciation is assessed on intelligibility and on features like word stress, sentence stress and intonation. It is not assessed on having a particular accent. An examiner will not mark you down for sounding Nepali or Brazilian; they will mark you down if word stress falls in unexpected places, because that is what genuinely makes a listener work harder.",
        "One structural point worth knowing: you receive a single score per criterion for the whole test, not per part. So a nervous Part 1 is recoverable. If you feel it went badly, the useful response is to develop your answers more fully in Parts 2 and 3, not to conclude the test is lost.",
      ],
      video: {
        kind: "mp4",
        src: "https://test-videos.co.uk/vids/sintel/mp4/h264/720/Sintel_720_10s_1MB.mp4",
        credit: "Sintel © Blender Foundation, CC BY 3.0 — via test-videos.co.uk",
        placeholder: true,
      },
    },
  },
  {
    slug: "writing-task-2-strong-thesis",
    title: "Writing Task 2: Building a Strong Thesis",
    topic: "Writing",
    tags: ["video-lesson", "writing", "task-2", "exam-strategy"],
    data: {
      lessonMinutes: 6,
      summary:
        "Your thesis is one sentence in the introduction, and it decides how the whole essay is marked.",
      keyPoints: [
        "State your position in the introduction — never save it for the conclusion.",
        "A thesis answers the question asked, in the terms the question used.",
        "“I agree to some extent” is not a position until you say with what.",
        "The thesis should predict your body paragraphs.",
        "Partial agreement is fine, and often easier to argue than a total one.",
      ],
      transcript: [
        "Task Response is one of four criteria in Task 2, and the single fastest way to lose marks on it is to leave the examiner unsure what you actually think. That is a thesis problem, and it is fixable in one sentence.",
        "Your thesis belongs in the introduction, immediately after you paraphrase the question. Not in the conclusion. Examiners are reading for a clear position from the outset, and an essay that withholds its opinion until the final paragraph reads as though the writer worked it out on the way.",
        "A thesis has to answer the question that was asked, using the terms the question used. If the question asks whether governments should fund public transport rather than roads, your thesis must be about that comparison. An essay full of excellent material about traffic congestion that never addresses the funding choice will be capped, no matter how well written it is.",
        "Be careful with partial agreement. “I agree with this statement to some extent” is not a position — it is a delay. It becomes a position the moment you say which extent: “I agree that public funding should prioritise rail, though road maintenance cannot be neglected entirely.” Now the reader knows what is coming.",
        "That is the real test of a thesis: it should predict your body paragraphs. If a reader can look at your thesis and guess what paragraphs two and three will argue, your essay has a structure. If they cannot, you will probably discover halfway through that you are writing about something else.",
        "And partial agreement is genuinely easier to argue than total agreement. A one-sided essay has to dismiss the obvious counterargument. A partial position lets you concede it, deal with it, and move on — which reads as more sophisticated, not less committed.",
      ],
      video: {
        kind: "mp4",
        src: "https://mdn.github.io/shared-assets/videos/flower.mp4",
        credit: "flower.mp4, CC0 — via MDN shared assets",
        placeholder: true,
      },
    },
  },
  {
    slug: "listening-section-4-note-taking",
    title: "Listening Section 4: Note-Taking Strategies",
    topic: "Listening",
    tags: ["video-lesson", "listening", "note-taking", "exam-strategy"],
    data: {
      lessonMinutes: 7,
      summary:
        "Section 4 is one long academic monologue with no break. Here's how to stay with it.",
      keyPoints: [
        "Section 4 plays straight through — there is no pause halfway, unlike Sections 1 to 3.",
        "Use the preparation time to predict the word class of every gap.",
        "Listen for signposts (“turning to”, “the second factor”) — they mark where answers cluster.",
        "Never stop to fix a missed answer; you will lose the next two.",
        "Write what you hear, then correct spelling during transfer time.",
      ],
      transcript: [
        "Section 4 is where scores are most often lost, and the reason is structural rather than linguistic. Sections 1 to 3 give you a pause in the middle to read the next set of questions. Section 4 does not. It is a single academic monologue, played once, straight through, and if you fall behind there is no natural point at which to catch up.",
        "So the preparation time before it starts matters more than anywhere else in the paper. Use it to read all ten questions, and for each gap, decide what kind of word must go in it. Is it a number, a plural noun, an adjective? A gap after “a significant” needs a noun. A gap after “were” needs a participle or an adjective. You are narrowing what you are listening for before you hear anything.",
        "While it plays, listen for signposting language rather than for the answers themselves. Phrases like “turning now to”, “the second factor”, and “what's particularly interesting here” tell you the speaker is moving to a new section, which is where the next answers live. Following the structure keeps you located even when a sentence goes past you.",
        "The single most important rule: if you miss one, let it go. Candidates who stop to reconstruct a missed answer routinely lose the next two as well, because the recording does not wait. Mark the gap, move your eyes to the following question, and rejoin. One blank costs one mark; losing your place costs three.",
        "Write what you actually hear, even if you are unsure of the spelling. A phonetic note you can decode later is worth far more than a blank. You get time at the end to transfer answers to the answer sheet, and that is the moment to fix spelling — not during the recording.",
        "One last thing worth internalising: spelling counts. A correct answer spelled wrongly scores zero, so words you expect to meet in academic contexts — “environment”, “development”, “government”, “separate” — are worth drilling until they are automatic.",
      ],
      video: {
        kind: "mp4",
        src: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4",
        credit: "Jellyfish sample clip — via test-videos.co.uk",
        placeholder: true,
      },
    },
  },
];

export type TipSeed = {
  slug: string;
  title: string;
  topic: string;
  tags: string[];
  data: { excerpt: string; readMinutes: number; body: string[] };
};

export const TIPS: TipSeed[] = [
  {
    slug: "reading-time-management",
    title: "5 time-management tricks for the reading test",
    topic: "Reading",
    tags: ["tips", "reading", "exam-strategy"],
    data: {
      readMinutes: 6,
      excerpt:
        "Most candidates who run out of time in Reading don't lack the language — they lack a pacing plan. Here's one.",
      body: [
        "One of the most common ways learners lose easy marks isn't a lack of knowledge — it's running out of time before finishing every question. The Reading paper gives you 60 minutes for 40 questions across three passages, and there is no extra time to transfer answers. The exam rewards steady pacing far more than it rewards perfectionism on any single item.",
        "First, budget by passage, not by question. Aim for roughly 17 minutes on Passage 1, 20 on Passage 2 and 23 on Passage 3, since difficulty usually increases. Write those three finish-times on your question paper before you start reading. If the clock passes a deadline, move on regardless of how many questions remain — an unfinished Passage 3 costs far more marks than two guessed answers in Passage 1.",
        "Second, read the questions before the passage, not after. You are not reading for pleasure or general understanding; you are hunting for specific information. Knowing what you are looking for turns a slow full read into a fast targeted scan.",
        "Third, accept that some questions are deliberately slow. True/False/Not Given and matching-headings items are designed to take longer than multiple choice. If you have spent more than about 90 seconds on any single question, mark your best guess, circle the number, and move on. You can return if time allows.",
        "Fourth, never leave the answer sheet until the end. Transfer answers passage by passage as you finish each one. Candidates who save all transferring for the final five minutes are the ones who end up with blank rows when time is called.",
        "Finally, spend the last two minutes filling every remaining blank. There is no penalty for a wrong answer in IELTS. An educated guess scores the same as a confident one when it happens to be right, but a blank answer never scores anything at all.",
      ],
    },
  },
  {
    slug: "task-2-essay-structure",
    title: "How to structure a band-9 Task 2 essay",
    topic: "Writing",
    tags: ["tips", "writing", "task-2", "exam-strategy"],
    data: {
      readMinutes: 8,
      excerpt:
        "A reliable four-paragraph shape that works for almost every Task 2 question type — and the one thing that actually separates band 7 from band 9.",
      body: [
        "Task 2 is worth twice as much as Task 1, and it is where most candidates' overall Writing score is decided. The good news is that a small number of structures cover almost every question type you will be given.",
        "For an opinion ('to what extent do you agree?') question, use four paragraphs. Introduction: paraphrase the question in one sentence, then state your position in one more. Do not save your opinion for the conclusion — examiners want a clear position from the outset. Body paragraph 1: your strongest reason, developed. Body paragraph 2: your second reason, or a concession that you then answer. Conclusion: restate the position in different words. That is it.",
        "For a discussion ('discuss both views and give your opinion') question, the shape is the same, but body paragraph 1 covers the first view and body paragraph 2 covers the second, with your own opinion made explicit rather than left implied.",
        "The single biggest difference between a band 7 body paragraph and a band 9 one is development, not vocabulary. A band 7 paragraph states a reason and gives an example. A band 9 paragraph states a reason, explains the mechanism by which it works, and then shows the consequence. Ask yourself 'so what?' after every sentence you write. If you cannot answer it, the idea is not finished.",
        "Be careful with linking words. Examiners explicitly penalise mechanical overuse — an essay that opens every paragraph with 'Firstly', 'Secondly', 'Moreover' reads as memorised. Aim for linking that reflects the actual logical relationship: 'That said' for concession, 'Consequently' for result, 'By contrast' for opposition.",
        "Finally, plan for five minutes before writing. Candidates who plan finish with a coherent argument; candidates who start writing immediately usually discover their best idea in the final paragraph, where it does the least good. Five minutes of planning costs you roughly 60 words of writing and reliably buys back more than that in coherence.",
      ],
    },
  },
  {
    slug: "speaking-part2-mistakes",
    title: "Common mistakes in IELTS Speaking Part 2",
    topic: "Speaking",
    tags: ["tips", "speaking", "part-2", "exam-strategy"],
    data: {
      readMinutes: 5,
      excerpt:
        "The long turn is where prepared answers fall apart. Four mistakes that cost marks, and what to do instead.",
      body: [
        "Part 2 gives you a cue card, one minute to prepare, and one to two minutes to speak alone. It is the only part of the Speaking test where you hold the floor, and it exposes weaknesses that Parts 1 and 3 can hide.",
        "Mistake one: stopping too early. If you finish in 45 seconds, you have not given the examiner enough language to assess. Use your preparation minute to note four or five points, not one. A useful trick is to plan a short story rather than a description — narratives naturally sustain speech in a way lists do not.",
        "Mistake two: treating the bullet points as a checklist. Candidates who say 'Now I will talk about how I found out about it' sound mechanical. The bullets are prompts to help you, not a structure you must announce. Let the answer flow as a single connected account that happens to cover them.",
        "Mistake three: reciting a memorised answer. Examiners are trained to detect this, and it is heavily penalised — a memorised answer typically shows a sudden jump in fluency and vocabulary that does not match the rest of the test. It is far safer to speak imperfectly about something real than fluently about something rehearsed.",
        "Mistake four: choosing an impressive topic instead of a familiar one. If the card asks about a memorable journey, the trip you actually took last year will produce better language than a fictional expedition, because you have genuine detail to draw on. Specific detail is what generates natural vocabulary.",
        "One last point: hesitation is not automatically penalised. Natural thinking pauses and self-correction are normal features of spoken English and appear in the band 9 descriptors. What is penalised is hesitation caused by searching for basic words. Do not aim to be flawless — aim to keep going.",
      ],
    },
  },
  {
    slug: "listening-section-4-mistakes",
    title: "Why you're losing marks in Section 4",
    topic: "Listening",
    tags: ["tips", "listening", "exam-strategy"],
    data: {
      readMinutes: 7,
      excerpt:
        "Section 4 is a single unbroken lecture with no pause in the middle. That structural difference is what catches people out.",
      body: [
        "Section 4 of the Listening test is an academic monologue — typically a lecture — and it is where scores most often fall away. The content is harder, but the bigger issue is structural: unlike Sections 1 to 3, Section 4 plays straight through with no break in the middle.",
        "That single fact has a consequence most candidates underestimate. If you lose your place, there is no pause in which to recover. Everything that follows is at risk, which is why a small slip in Section 4 can cost five or six marks rather than one.",
        "So the first priority is not accuracy, it is position. If you miss an answer, leave it blank immediately and lock onto the next question. Do not spend three seconds wondering what you missed — those three seconds are how a one-mark loss turns into a five-mark loss. Move forward and come back at the end.",
        "Second, use the preparation time to predict word forms rather than content. Look at each gap and ask what kind of word must fill it: a plural noun, a number, a date, an adjective? Knowing you need a plural noun makes it far easier to catch the right word in fast speech, and it prevents grammatically impossible answers.",
        "Third, listen for signposting language rather than keywords. Lecturers announce their structure — 'the first factor', 'turning now to', 'a common misconception is'. These phrases tell you where you are in the talk. Keyword-matching alone is unreliable in Section 4 because the recording usually paraphrases the question rather than repeating it.",
        "Finally, watch your spelling and word limits during the transfer minutes. A correct answer spelled wrongly scores zero, and so does a three-word answer where the instruction said 'no more than two words'. In a section this demanding, it is painful to lose marks you had already earned.",
      ],
    },
  },
  {
    slug: "linking-words-that-raise-score",
    title: "Linking words that actually raise your score",
    topic: "Writing",
    tags: ["tips", "writing", "vocabulary", "exam-strategy"],
    data: {
      readMinutes: 6,
      excerpt:
        "More linking words will not raise your band. Using the right ones, sparingly, will.",
      body: [
        "Many candidates are taught that band scores rise with the number of connectives used. The official descriptors say close to the opposite: the Coherence and Cohesion criterion explicitly penalises cohesion that is 'mechanical' or overused. Adding more linkers to a weak essay usually lowers the score rather than raising it.",
        "What earns marks is linking that reflects a genuine logical relationship. If the second idea genuinely results from the first, 'Consequently' is doing real work. If it does not, the word is decoration, and examiners notice.",
        "Some of the most valuable cohesive devices are not connectives at all. Pronoun reference ('this approach', 'such measures'), controlled repetition of key nouns, and simply ordering sentences so each one follows from the last are all forms of cohesion — and they are what makes writing feel natural rather than assembled.",
        "A few genuinely useful linkers, with what they actually signal: 'That said' introduces a concession you are about to answer. 'By contrast' marks genuine opposition, not just a change of subject. 'In practice' signals you are moving from theory to reality. 'Crucially' flags the most important point in a paragraph. Each says something specific.",
        "Words to use carefully: 'Moreover' and 'Furthermore' are fine occasionally but become mechanical when they open consecutive paragraphs. 'Firstly / Secondly / Finally' turns an argument into a list, which limits development. And 'In a nutshell' or 'Last but not least' are too informal for academic writing.",
        "A practical test: delete every linking word from a paragraph and read it again. If it still makes sense, your cohesion is coming from the ideas themselves — which is exactly where band 9 cohesion comes from. Then put back only the linkers that add something.",
      ],
    },
  },
  {
    slug: "how-band-scores-are-calculated",
    title: "How IELTS band scores are actually calculated",
    topic: "General",
    tags: ["tips", "band-scores", "exam-strategy"],
    data: {
      readMinutes: 9,
      excerpt:
        "Raw marks, band conversion, and the rounding rule that decides more results than people realise.",
      body: [
        "IELTS reports a band score from 0 to 9 for each of the four skills, plus an overall band. Understanding how those numbers are produced makes it much easier to target your effort where it will actually change your result.",
        "Listening and Reading are marked out of 40. Each correct answer is worth one mark, there is no penalty for wrong answers, and the raw score out of 40 is then converted to a band. The conversion is not linear: in Academic Reading, roughly 30 correct answers is about band 7, 35 is about band 8, and 39 or 40 is band 9. Note what this means near the top — the difference between band 8 and band 9 can be as few as four questions.",
        "One important detail: the Academic and General Training Reading papers use different conversion tables. General Training texts are less demanding, so more correct answers are required for the same band. A raw score of 30 is roughly band 7 in Academic but closer to band 6 in General Training.",
        "Writing and Speaking are marked differently. There is no raw score. Each is assessed against four equally weighted criteria — for Writing: Task Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. The four criterion scores are averaged. In Writing, Task 2 carries twice the weight of Task 1.",
        "The overall band is the average of the four skill bands, rounded using a rule specific to IELTS: averages ending in .25 round up to the next half band, and averages ending in .75 round up to the next whole band. So 6.25 becomes 6.5 and 6.75 becomes 7. Rounding is always upward at these points, never down.",
        "That rounding rule has a practical consequence worth planning around. If your bands are 6.5, 6.5, 6.0 and 6.0, your average is 6.25, which rounds to 6.5. Raising just one of those 6.0s to 6.5 gives an average of 6.375 — which still rounds to 6.5, gaining you nothing. But raising it to 7.0 produces 6.625, which rounds to 6.5 as well. Work out exactly which improvements cross a rounding boundary before deciding where to spend your study time; targeting your weakest skill is not always the most efficient route to your target overall band.",
      ],
    },
  },
];

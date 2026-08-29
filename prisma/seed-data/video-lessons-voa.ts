import type { VideoLessonSeed } from "./video-lessons";

/**
 * Video lessons built around real footage from VOA Learning English.
 *
 * **Licence.** VOA Learning English states that its texts, MP3s, photos and videos are in
 * the public domain and may be reprinted for educational *and commercial* purposes with
 * credit to learningenglish.voanews.com. Commercial permission is the part that matters
 * here, because this site has a paid tier — which rules out every CC NonCommercial
 * licence. Only learningenglish.voanews.com material qualifies: the wider VOA site carries
 * agency wire content that is not public domain.
 *
 * Every video id below was verified against YouTube's oEmbed endpoint before being written
 * here — real video, real title, published by the official @voalearningenglish channel.
 * None of these ids is guessed.
 *
 * **The written lesson is ours.** As with the existing entries, `transcript` is this
 * site's own teaching material on the same topic, not a description of what the clip says.
 * That separation is deliberate: it keeps the written lesson useful on its own, and means
 * nothing here claims to summarise footage we did not produce.
 */

const CREDIT =
  "Video: VOA Learning English (public domain) — learningenglish.voanews.com";

export const VOA_VIDEO_LESSONS: VideoLessonSeed[] = [
  {
    slug: "passive-voice-in-reports-and-news",
    title: "The Passive Voice in Reports and News",
    topic: "Grammar",
    tags: ["video-lesson", "grammar", "writing", "task-1", "passive"],
    data: {
      lessonMinutes: 7,
      summary:
        "When the passive earns its place — process descriptions and reporting — and when it just adds words.",
      keyPoints: [
        "Passive = a form of “be” plus the past participle: the data were collected.",
        "Use it when the doer is unknown, obvious, or genuinely beside the point.",
        "Task 1 process diagrams are the clearest legitimate use in IELTS.",
        "Passivising your own opinion adds words and removes clarity.",
        "Overuse costs you on Coherence; it gains nothing on Range.",
      ],
      transcript: [
        "The passive is formed with a part of the verb “be” plus a past participle: the bottles are washed, the data were collected, the decision has been taken. What it does is move the thing affected to the front of the sentence and push the doer to the back — or drop the doer entirely.",
        "That is useful in exactly three situations. When you do not know who did it. When it is obvious who did it. And when the doer simply does not matter to the point you are making. News writing leans on the passive for the first two reasons constantly: “the suspect was arrested” tells you what happened without a sentence about which officer made the arrest.",
        "In IELTS, the clearest legitimate use is a Task 1 process diagram. “The beans are roasted, then ground, then packed” is natural precisely because nobody cares who does the roasting. Writing that description in the active voice would force you to invent an actor for every step.",
        "The mistake is treating the passive as a register marker — as if the more passives you write, the more academic you sound. “It is believed by me that fees should be abolished” is longer and worse than “I believe fees should be abolished.” The examiner is reading for clarity, and a paragraph of passives is harder to follow, which is a Coherence problem rather than a Grammar one.",
        "A practical test: read your sentence and ask who is doing the verb. If the answer matters and you have hidden it, switch to the active. If the answer is nobody in particular, the passive is doing real work and you should keep it.",
      ],
      video: {
        kind: "youtube",
        src: "FzzSzoyp7EI",
        credit: CREDIT,
        placeholder: false,
      },
    },
  },
  {
    slug: "polite-requests-in-formal-letters",
    title: "Making Polite Requests in a Formal Letter",
    topic: "Writing",
    tags: ["video-lesson", "writing", "task-1", "general-training", "register"],
    data: {
      lessonMinutes: 7,
      summary:
        "The request language General Training Task 1 is really testing, and how register changes it.",
      keyPoints: [
        "“Could you” and “Would you be able to” are safe in almost any letter.",
        "“I would be grateful if you could…” is the formal workhorse.",
        "Direct imperatives (“Send me a refund”) read as rude and cost marks.",
        "Match the closing to the opening: Dear Sir/Madam → Yours faithfully.",
        "State what you want in the first paragraph, not the last.",
      ],
      transcript: [
        "General Training Task 1 is a letter, and most letters are a request. The band descriptors talk about tone and register, and in practice that comes down to a small set of request forms and knowing which one fits the reader.",
        "The most flexible is “Could you…” — it works in a semi-formal letter to a landlord and in an informal one to a friend. A step up in formality is “Would you be able to…”, and the standard formal form is “I would be grateful if you could…”. In a complaint you may also want “I would appreciate it if…”, which is firm without being aggressive.",
        "What loses marks is the bare imperative. “Send me a refund” is grammatically correct and socially wrong, and a letter written that way will be marked down on tone even if every sentence is accurate. The same is true of over-softening: three hedges in one sentence — “I was just wondering if you might possibly be able to” — reads as unsure rather than polite.",
        "Register also has to be consistent from the greeting to the sign-off. If you do not know the name, open “Dear Sir or Madam” and close “Yours faithfully”. If you do, open “Dear Ms Rana” and close “Yours sincerely”. Mixing them is a small error that is very visible.",
        "Finally, structure. Say what you want in the first paragraph. Examiners are reading for whether the letter achieves its purpose, and a request buried in the last line makes them hunt for it. Open with the request, use the middle to explain, and close by saying what you would like to happen next.",
      ],
      video: {
        kind: "youtube",
        src: "15EZF5H7IYQ",
        credit: CREDIT,
        placeholder: false,
      },
    },
  },
  {
    slug: "past-perfect-continuous",
    title: "The Past Perfect Continuous",
    topic: "Grammar",
    tags: ["video-lesson", "grammar", "tenses", "writing"],
    data: {
      lessonMinutes: 6,
      summary:
        "A tense worth one correct use in an essay — how it works and where it actually belongs.",
      keyPoints: [
        "Form: had been + -ing. “They had been waiting for an hour.”",
        "It describes an activity running up to a point in the past.",
        "Contrast with past perfect simple, which describes a completed action.",
        "Useful for cause: “Prices had been rising, so the bank acted.”",
        "One accurate use shows range; forcing it into every paragraph does not.",
      ],
      transcript: [
        "The past perfect continuous is “had been” plus an -ing form: they had been waiting, prices had been rising. It describes something that was going on for a period leading up to a moment in the past.",
        "The contrast with the past perfect simple is worth getting right. “By 2019 the company had cut three hundred jobs” presents a finished result. “By 2019 the company had been cutting jobs for a decade” presents an ongoing process. The first counts; the second describes a trend, and that difference is exactly the kind of precision Task 1 and Task 2 both reward.",
        "It is also the natural tense for explaining a cause that had been building. “Prices had been rising steadily, so the central bank raised interest rates.” The rise is not a single completed event; it is the background against which the decision was taken.",
        "The trap is over-reaching for it. Grammatical Range is assessed on whether you use a variety of structures accurately, not on whether you use the rarest one available. A single correct past perfect continuous in an essay does more for your band than four attempts where two are wrong.",
        "A quick check: if you can insert a duration — “for an hour”, “for a decade”, “since March” — and the sentence still sounds natural, the continuous form is probably right. If not, the simple form almost certainly is.",
      ],
      video: {
        kind: "youtube",
        src: "s-hMf0-1N4w",
        credit: CREDIT,
        placeholder: false,
      },
    },
  },
  {
    slug: "pronouncing-ed-endings",
    title: "Pronouncing -ed Endings",
    topic: "Speaking",
    tags: ["video-lesson", "speaking", "pronunciation", "tenses"],
    data: {
      lessonMinutes: 5,
      summary:
        "Three pronunciations, one spelling — and why getting it wrong makes past-tense speech hard to follow.",
      keyPoints: [
        "-ed has three sounds: /t/, /d/ and /ɪd/.",
        "After a voiceless sound it is /t/: worked, watched, hoped.",
        "After a voiced sound it is /d/: played, moved, opened.",
        "Only after /t/ or /d/ does it add a syllable: wanted, decided.",
        "Adding an extra syllable everywhere is the most common learner error.",
      ],
      transcript: [
        "English writes the regular past tense one way and says it three ways. Which one you use is decided entirely by the sound immediately before the ending — not by the spelling, and not by choice.",
        "If the verb ends in a voiceless sound — the kind you make without your vocal cords buzzing, like /k/, /p/, /s/, /f/, /ʃ/ or /tʃ/ — the ending is /t/. Worked, hoped, missed, laughed, washed, watched. None of these gains an extra syllable: “worked” is one syllable, not two.",
        "If the verb ends in a voiced sound — a vowel, or /b/, /g/, /v/, /z/, /m/, /n/, /l/, /r/ — the ending is /d/. Played, moved, opened, called, arrived. Again, no extra syllable.",
        "Only when the verb already ends in a /t/ or /d/ sound does the ending become a full syllable, /ɪd/: wanted, decided, needed, started, ended. This is the one case where the word genuinely gets longer.",
        "The most common error is applying that third pattern everywhere — saying “work-ed” and “play-ed”. It is very audible, it happens on every past-tense verb, and in Speaking Part 2, where you may be narrating something that happened, it can affect a whole answer. Practise with a mixed list and check whether your mouth adds a syllable it should not.",
      ],
      video: {
        kind: "youtube",
        src: "Q-g4o0aZsWc",
        credit: CREDIT,
        placeholder: false,
      },
    },
  },
  {
    slug: "dangling-participles",
    title: "Dangling Participles",
    topic: "Grammar",
    tags: ["video-lesson", "grammar", "accuracy", "writing"],
    data: {
      lessonMinutes: 5,
      summary:
        "The error that appears exactly where you are trying to write a more sophisticated sentence.",
      keyPoints: [
        "A participle phrase attaches to the subject of the main clause.",
        "“Having studied for years, the exam was easy” says the exam studied.",
        "Fix by naming the real subject: “Having studied for years, she found the exam easy.”",
        "Or rewrite as a full clause: “Because she had studied for years…”",
        "It clusters in long sentences — the ones written to show range.",
      ],
      transcript: [
        "A participle phrase is an opener like “Having finished the report” or “Walking home”. English assumes that whoever performed that action is the subject of the clause that follows. When it is not, the participle is left dangling and the sentence says something you did not mean.",
        "“Having studied for years, the exam was easy” literally claims the exam did the studying. “Walking home, the rain started” has the rain walking home. Readers usually work out the intended meaning, but an examiner marking Grammatical Range and Accuracy is reading for exactly this kind of slip.",
        "There are two clean fixes. Either make the real subject the subject of the main clause — “Having studied for years, she found the exam easy” — or abandon the participle and write a full clause: “Because she had studied for years, the exam was easy.” The second is often the better choice under time pressure, because it is harder to get wrong.",
        "What makes this worth a lesson is where it appears. Nobody dangles a participle in a short simple sentence; it happens when you reach for a more complex opener to show range. So the sentences most likely to contain it are the ones you wrote to raise your band.",
        "When you proofread, find every sentence that opens with an -ing or -ed phrase and read only as far as the comma. Ask: who is doing that? Then check the next word is that person.",
      ],
      video: {
        kind: "youtube",
        src: "9yC4qrBj4ak",
        credit: CREDIT,
        placeholder: false,
      },
    },
  },
  {
    slug: "discussing-technology-and-ai",
    title: "Discussing Technology and AI",
    topic: "Speaking",
    tags: ["video-lesson", "speaking", "part-3", "vocabulary", "technology"],
    data: {
      lessonMinutes: 7,
      summary:
        "Language for a topic that now comes up in Part 3 and Task 2 constantly — without sounding rehearsed.",
      keyPoints: [
        "Hedge claims about the future: “is likely to”, “could well”, “may end up”.",
        "Name the trade-off rather than picking a side too fast.",
        "Concrete examples beat abstract nouns: a job, a task, a tool.",
        "Useful pairs: automate/displace, augment/replace, adopt/resist.",
        "Part 3 rewards developing an answer, not delivering a verdict.",
      ],
      transcript: [
        "Technology, and artificial intelligence in particular, has become one of the most common Part 3 and Task 2 topics. That is a problem as well as an opportunity: examiners hear the same memorised opinions repeatedly, and a rehearsed answer is easy to spot.",
        "The first thing to get right is hedging. Claims about the future should not be stated as fact. “AI will destroy millions of jobs” is a prediction dressed as certainty. “AI is likely to displace certain kinds of work, particularly routine tasks” is both more defensible and better English. Useful forms: is likely to, could well, may end up, tends to.",
        "The second is the trade-off. Part 3 asks what you think, but it rewards you for showing you can see more than one side before you land. A structure that works: name the benefit, name the cost, then say which you weigh more heavily and why. That is a developed answer rather than an opinion.",
        "The third is concreteness. Abstract nouns pile up fast on this topic — automation, digitalisation, implementation. One specific example is worth three of them. Talk about a radiologist reading scans, a driver, a translator, a call centre. Specific examples also give you something to say next, which matters when the question is open.",
        "Some vocabulary worth owning: to automate a task, to displace a worker, to augment rather than replace, to adopt a technology, to retrain. Note the pairing of augment and replace — the distinction between a tool that helps someone work and one that removes the job is the heart of most good answers on this topic.",
      ],
      video: {
        kind: "youtube",
        src: "BYDlv5Uosrc",
        credit: CREDIT,
        placeholder: false,
      },
    },
  },
];

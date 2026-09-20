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
  {
    slug: "if-and-whether-in-indirect-questions",
    title: "If and Whether in Indirect Questions",
    topic: "Grammar",
    tags: ["video-lesson", "grammar", "speaking", "writing", "reported-speech"],
    data: {
      lessonMinutes: 6,
      summary:
        "How to turn a yes/no question into a clause with if or whether, and when only whether will do.",
      keyPoints: [
        "After ask, wonder, know and not sure, a yes/no question becomes an if or whether clause.",
        "Use statement word order inside the clause: 'I wonder whether she is ready', not 'is she ready'.",
        "Only whether can follow a preposition or start a clause: 'the question of whether', 'Whether it works is unclear'.",
        "Whether also works before an infinitive: 'I can't decide whether to apply'.",
        "In formal letters, 'I would be grateful if you could tell me whether...' is a safe, polite pattern.",
      ],
      transcript: [
        "A direct question such as 'Is the hall available?' becomes an indirect question when you tuck it inside another sentence: 'Could you tell me whether the hall is available?' Two things change. The question word order disappears, and a linking word, if or whether, is added. You have met this pattern in reported speech, where 'She asked, \"Do you like it?\"' becomes 'She asked if I liked it'.",
        "For most everyday purposes, if and whether are interchangeable after verbs such as ask, wonder, know, find out and be sure. 'I wonder if it will rain' and 'I wonder whether it will rain' mean the same. Whether is slightly more formal, and it is the safer choice in writing.",
        "There are places where only whether works. After a preposition, use whether: 'We talked about whether to move.' At the start of a clause, use whether: 'Whether the plan succeeds depends on funding.' Before an infinitive, use whether: 'She could not decide whether to accept.' In each of these, replacing whether with if produces a sentence that sounds wrong to a native ear.",
        "Word order is the mistake to watch. Inside the clause, the order is the same as in a statement, with no inversion and no 'do'. 'I asked if he had finished' is right; 'I asked if had he finished' and 'I asked if did he finish' are not. This is the same rule as for reported questions, and the same rule that stops you writing 'Please tell me where is the office'.",
        "The pattern earns marks in two places. In a General Training Task 1 letter, indirect questions are the polite way to ask for information: 'I would be grateful if you could tell me whether the course is still available.' In Speaking Part 3, 'I wonder whether' and 'it depends on whether' show that you can handle more complex structures without sounding rehearsed.",
      ],
      video: {
        kind: "youtube",
        src: "CyjLzIF7_L4",
        credit: CREDIT,
        placeholder: false,
      },
    },
  },
  {
    slug: "introducing-verb-tenses",
    title: "Introducing Verb Tenses",
    topic: "Grammar",
    tags: ["video-lesson", "grammar", "tenses", "writing", "speaking"],
    data: {
      lessonMinutes: 7,
      summary:
        "A map of the English tense system, and how to choose a tense by asking two questions instead of memorising twelve forms.",
      keyPoints: [
        "Ask two questions: when is the action (past, present, future) and what shape is it (simple, continuous, perfect)?",
        "Simple describes facts, habits and completed events; continuous describes something in progress or temporary.",
        "Perfect links two times: something earlier that matters now, or continues until now.",
        "Keep the tense consistent within a paragraph, and change it only when the time really changes.",
        "In Task 1, match the tense to the date: past for past years, present perfect only for 'up to now', future forms only for projections.",
      ],
      transcript: [
        "English has twelve common verb forms, and many learners try to memorise them all as separate rules. It is easier to see them as a grid. One axis is time: past, present or future. The other is the shape of the action: simple, continuous, perfect, or perfect continuous. Choosing a tense means answering two questions, when did it happen, and how do I want to describe it?",
        "The simple forms are the workhorses. The present simple states facts and habits ('the population grows slowly'), and the past simple reports completed events ('sales fell in 2015'). The continuous forms describe an action in progress or a temporary situation ('she is studying for the exam', 'I was working when you called').",
        "The perfect forms connect two times. The present perfect looks back from now: 'unemployment has fallen since 2010' means the change began earlier and still matters. The past perfect looks back from a point in the past: 'by the time I arrived, the meeting had finished'. If you cannot say which two times are being connected, the perfect is probably the wrong choice.",
        "Consistency is where most marks are lost. A paragraph that starts in the past and slides into the present without a reason reads as careless. Decide the time frame of each paragraph, and change tense only when the time changes, as when you move from what a graph shows to what you conclude from it.",
        "In IELTS, tense choice is visible everywhere. A Task 1 graph of past years takes the past simple, and 'has risen' is correct only if the period continues to the present. A forecast takes future forms, such as 'is projected to'. In Speaking, matching tense to time helps fluency, because you spend less time stopping to repair sentences half-way through.",
      ],
      video: {
        kind: "youtube",
        src: "QzEwJHnoJlU",
        credit: CREDIT,
        placeholder: false,
      },
    },
  },
  {
    slug: "population-in-task-1-sentences",
    title: "Talking About Population in Task 1",
    topic: "Writing",
    tags: ["video-lesson", "writing", "task-1", "vocabulary", "agreement"],
    data: {
      lessonMinutes: 6,
      summary:
        "How the noun population behaves in a sentence, and the verb agreement and phrasing that Task 1 answers about people depend on.",
      keyPoints: [
        "Population is a singular noun: 'the population is growing', 'the population has doubled'.",
        "Use 'a population of...' to give a size, and 'the population of X' to name the place.",
        "For a share, use 'the proportion or percentage of the population', not 'the population percentage'.",
        "For individuals, use people, residents or inhabitants, not 'populations'.",
        "For more than one place, the plural is fine: 'the populations of the two cities'.",
      ],
      transcript: [
        "In a Task 1 answer about people, the word population appears constantly, and small mistakes with it are easy to spot. The first point is that population is a singular noun, even though it refers to many people. The correct forms are 'the population is growing' and 'the population has doubled', not 'the population are growing'.",
        "Population usually appears in one of two patterns. To name the place, use 'the population of Japan'. To give the size, use 'a population of 125 million'. The two combine naturally: 'Japan has a population of 125 million'. Notice that 'population' here is the whole group, and not a number by itself.",
        "When you want to describe a share, be precise. 'The proportion of the population over 65' or 'the percentage of the population living in cities' is clear. Avoid clumsy compounds such as 'the population percentage'. If you are describing individuals rather than the group, choose a different word. 'Residents', 'inhabitants' and 'people' are all possible, but 'populations' is not a plural for people.",
        "The plural, 'populations', is correct only when you compare groups: 'the populations of the two cities were similar in 1990'. Here, each city has its own population, so the plural is right, and the verb is plural too.",
        "Population also pairs with a set of useful verbs, such as grow, rise, fall, decline, double and stabilise, and with the adverbs of change you have already practised. 'The population rose steadily to 8 million' uses a singular noun, a past verb and an adverb, and it is exactly the kind of sentence that Task 1 rewards for accuracy.",
      ],
      video: {
        kind: "youtube",
        src: "uCKr2IZo-7s",
        credit: CREDIT,
        placeholder: false,
      },
    },
  },
  {
    slug: "you-know-fillers-and-fluency",
    title: "Fillers, 'You Know' and Fluency",
    topic: "Speaking",
    tags: ["video-lesson", "speaking", "fluency", "part-2", "part-3"],
    data: {
      lessonMinutes: 6,
      summary:
        "What fillers such as 'you know' do in speech, when they hurt your Fluency score, and what to say instead of freezing.",
      keyPoints: [
        "Fillers such as 'um', 'like' and 'you know' buy thinking time, and everyone uses some.",
        "The problem is frequency and habit: constant fillers or long silences lower Fluency and Coherence.",
        "Replace a blank pause with a short discourse marker: 'well', 'to be honest', 'let me think'.",
        "'You know' checks that the listener shares your knowledge; it is a casual habit in formal answers.",
        "Practise by recording a one-minute answer and counting your fillers.",
      ],
      transcript: [
        "Every speaker uses fillers. Words and sounds such as 'um', 'er', 'like' and 'you know' fill the space while the brain finds the next idea, and native speakers use them all the time. So the first thing to know about fillers is that they are not, by themselves, a mistake.",
        "The problem for an exam candidate is frequency and habit. The Fluency and Coherence descriptor rewards speech that flows without noticeable effort, and it lowers the band for speakers who hesitate a lot to search for words or who keep repeating themselves. A filler used once or twice in an answer is invisible. A filler after every clause, or a long silence, is heard.",
        "The useful skill is to replace a blank pause with a short phrase that sounds like part of the answer. 'Well,' 'to be honest,' 'that's a good question,' and 'let me think' all give you two or three seconds and sound natural. In Part 2, a phrase such as 'what I remember most is' both buys time and signals structure.",
        "'You know' has a specific job. It checks that the listener shares the background knowledge, or softens a statement. In casual conversation, that is fine. In an exam answer, a repeated 'you know' can sound like a habit, and it also asks the examiner to agree, when your job is to explain. Use it rarely, and try to explain the point instead.",
        "The best way to reduce fillers is to notice them. Record a one-minute answer on a Part 2 topic, listen back, and count. Then answer the same question again, replacing each filler with a pause or a short marker. Most learners find the count drops quickly, and that the pauses sound calmer than they feared.",
      ],
      video: {
        kind: "youtube",
        src: "d6BoxNA4yes",
        credit: CREDIT,
        placeholder: false,
      },
    },
  },
];

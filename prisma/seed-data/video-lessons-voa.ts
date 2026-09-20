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
  {
    slug: "simple-future-will-in-use",
    title: "The Simple Future: Will in Use",
    topic: "Grammar",
    tags: ["video-lesson", "grammar", "tenses", "speaking", "task-2"],
    data: {
      lessonMinutes: 6,
      summary:
        "How will is formed and used for decisions, promises and predictions, and where it does not belong.",
      keyPoints: [
        "Form: will plus the base verb, with 'll in speech and won't in the negative.",
        "Use will for decisions made now, promises, offers and predictions based on opinion.",
        "Will does not follow when, if, before, after or as soon as: use the present simple there.",
        "In Task 2, predictions are safer with may, might or is likely to than with will.",
        "In Speaking Part 3, 'I think it will...' followed by a reason is a strong, simple answer.",
      ],
      transcript: [
        "The simple future is formed with will and the base verb: 'it will rain', 'she will call'. In speech, will is usually shortened to 'll, and the negative is won't. Questions invert the subject and will: 'Will you help me?' The form never changes for person, so there is no -s, no 'wills', and no 'to' after it.",
        "Will has three main jobs. It expresses a decision made at the moment of speaking ('I'll take the blue one'), a promise or offer ('I'll send it tomorrow', 'I'll carry that for you'), and a prediction based on opinion or experience ('prices will rise next year'). That last use is the one candidates meet most often in Speaking Part 3, where you are asked what you think will happen.",
        "The most common error is using will where English wants the present simple. After time words such as when, before, after, until and as soon as, and in an if clause, the present simple carries the future meaning. 'I will call you when I will arrive' is wrong; 'I will call you when I arrive' is right. The future meaning is already in the main clause.",
        "In Task 2, be careful with how sure you sound. 'Technology will solve the problem' is a claim you would struggle to defend, while 'technology may help to solve the problem' is one you can. Modals such as may, might and could, or phrases such as is likely to, keep an argument believable. Save plain 'will' for things that follow logically from your point.",
        "In Speaking Part 3, will gives you a simple, reliable pattern: 'I think it will become more common, because...'. Follow every prediction with a reason, and add a limit with 'although' or 'unless'. That gives you a developed answer using only structures you control.",
      ],
      video: {
        kind: "youtube",
        src: "4dcpxo55m_s",
        credit: CREDIT,
        placeholder: false,
      },
    },
  },
  {
    slug: "goodbyes-and-register",
    title: "Goodbyes and Register: Informal to Formal",
    topic: "Writing",
    tags: ["video-lesson", "writing", "task-1", "general-training", "register", "speaking"],
    data: {
      lessonMinutes: 6,
      summary:
        "How the way you end a conversation or a letter signals register, and matching a closing to the way you began.",
      keyPoints: [
        "Register is how formal or casual your language is, and it should stay consistent from opening to closing.",
        "Informal goodbyes: 'see you', 'take care', 'talk soon'. More formal: 'goodbye', 'have a good day'.",
        "Formal letters: 'Dear Sir or Madam' ends 'Yours faithfully'; 'Dear Mr Smith' ends 'Yours sincerely'.",
        "Friendly letters can end 'Best wishes' or 'See you soon', but not 'Yours faithfully'.",
        "Mixing registers, such as a slangy closing on a complaint letter, costs marks in General Training Task 1.",
      ],
      transcript: [
        "Register is the level of formality in your language. You already use it without thinking: the way you say goodbye to a friend is not the way you say goodbye to a hotel manager. In an exam, the skill is to choose a register deliberately and keep it the same from the first line to the last.",
        "Spoken goodbyes show the range. Between friends, 'see you later', 'take care' and 'talk soon' are natural. In a more formal setting, 'goodbye', 'have a good day' and 'thank you for your time' are safer. Neither set is better; each suits a different situation, and using the wrong one sounds slightly off.",
        "In a General Training Task 1 letter, the closing has to match the opening. If you begin 'Dear Sir or Madam', end with 'Yours faithfully'. If you begin with a name, such as 'Dear Mr Smith', end with 'Yours sincerely'. American usage often prefers 'Sincerely', and the exam accepts either, provided you are consistent.",
        "For a letter to a friend, the closing is warmer: 'Best wishes', 'All the best' or 'See you soon'. Here, 'Yours faithfully' would sound cold and stiff, which is the reverse problem. The rest of the letter needs to match: contractions and friendly phrases are fine, and long, formal sentences are not.",
        "The mistake examiners see most is mixing registers. A complaint letter that begins formally and then ends 'Cheers!' undermines its own tone, and it may cost marks under Task Achievement, which asks whether the tone suits the situation. Decide the reader, decide the register, and check the opening, the middle and the closing against it.",
      ],
      video: {
        kind: "youtube",
        src: "No49Qxer8pY",
        credit: CREDIT,
        placeholder: false,
      },
    },
  },
  {
    slug: "talking-about-mental-health-respectfully",
    title: "Talking About Mental Health Respectfully",
    topic: "Speaking",
    tags: ["video-lesson", "speaking", "part-3", "vocabulary", "health"],
    data: {
      lessonMinutes: 6,
      summary:
        "Careful, current vocabulary for talking about mental health in Speaking Part 3 and Task 2 without sounding blunt or stigmatising.",
      keyPoints: [
        "Mental health topics appear in health, work, education and social-media questions.",
        "Prefer neutral, respectful wording: 'a person with anxiety', 'a mental health condition'.",
        "Avoid casual labels such as 'crazy' or 'mad' when discussing illness.",
        "Useful nouns: stress, anxiety, depression, wellbeing, stigma, support, treatment, counselling.",
        "Useful verbs: seek help, cope with, talk openly about, raise awareness of.",
      ],
      transcript: [
        "Mental health has moved from a private subject to a regular topic in health, work, education and social-media questions, in both Speaking Part 3 and Task 2. Knowing how to talk about it carefully is a practical exam skill, and it is also simply good communication.",
        "The first principle is to choose neutral, respectful wording. It is better to say 'a person with anxiety' or 'people living with depression' than to use labels that reduce a person to a condition. Avoid casual, careless words such as 'crazy' or 'mad' when you mean mental illness. In an exam, they are also imprecise, which is a Lexical Resource problem as well as a tone problem.",
        "There is a useful set of nouns and verbs to own. Nouns: stress, anxiety, depression, wellbeing, stigma, support, treatment, counselling. Verbs and phrases: to seek help, to cope with pressure, to talk openly about, to raise awareness of, to break the stigma around. Collocations are worth learning as chunks, because 'raise awareness of' is more natural than 'make people know about'.",
        "The grammar tools you already have work well here. Hedging suits a sensitive subject: 'more people seem willing to seek help than in the past'. Cause and effect uses dependent prepositions: 'long working hours can contribute to stress', 'pressure at work can lead to anxiety'. Comparisons frame change over time: 'people are increasingly aware of mental health'.",
        "A last point on approach. In Part 3, you are asked for opinions on society, not for your own medical history, and you are never obliged to share anything personal. Answer at the level of society and give examples in general terms. That keeps the answer clear, relevant and comfortable, and it lets your language, not the topic, carry the mark.",
      ],
      video: {
        kind: "youtube",
        src: "h-tAbyandmY",
        credit: CREDIT,
        placeholder: false,
      },
    },
  },
  {
    slug: "using-feedback-on-your-writing",
    title: "Making the Most of Feedback on Your Writing",
    topic: "Writing",
    tags: ["video-lesson", "writing", "task-2", "exam-strategy", "feedback"],
    data: {
      lessonMinutes: 6,
      summary:
        "How to turn corrections on a draft into lasting improvement: spot patterns, log errors and rewrite, not just fix.",
      keyPoints: [
        "Look for patterns in your errors, not one-off slips: the same mistake three times is a habit.",
        "Keep a short error log with the mistake, the correction and a rule in your own words.",
        "Rewrite the paragraph after feedback; correcting single words does not build a new habit.",
        "Sort feedback by criterion (Task Response, Coherence, Lexis, Grammar) and fix the weakest one first.",
        "Retest with a fresh essay on a similar question a few days later to check the fix held.",
      ],
      transcript: [
        "Feedback only helps if it changes what you write next time. Many learners read the corrections, nod, and then make the same mistakes in the next essay. The difference between improving and standing still is what you do with the feedback in the ten minutes after you get it.",
        "Start by looking for patterns. One missing article is a slip, but a missing article in every paragraph is a habit, and habits are what cost marks. Go through the feedback and group errors by type: articles, verb forms, prepositions, word order, linking. The largest group is where your time is best spent.",
        "Then keep an error log. For each pattern, write the mistake, the corrected version and a rule in your own words. A short log of ten to fifteen entries is more useful than a thick notebook of corrections, because you can reread it in five minutes before you write. The act of writing the rule yourself is what makes it stick.",
        "Do not just correct; rewrite. If a paragraph was marked for weak development, write the whole paragraph again using the advice. Changing a single word teaches your eye something, but rewriting teaches your hand a new habit. Where possible, rewrite under a time limit, because that is how you will have to write in the exam.",
        "Finally, tie the feedback to the four criteria: Task Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. Decide which is weakest, and work on that first. Then write a new essay on a similar question a few days later. If the same errors return, the fix has not yet become automatic, and it needs another round.",
      ],
      video: {
        kind: "youtube",
        src: "0q6nFVaJ2MY",
        credit: CREDIT,
        placeholder: false,
      },
    },
  },
];

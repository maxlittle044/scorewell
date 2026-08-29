export type SampleSeed = {
  slug: string;
  title: string;
  skill: "WRITING" | "SPEAKING";
  taskType: string;
  topic: string;
  tags: string[];
  data: {
    prompt: string;
    answer: string;
    /** Why this answer earns band 9, keyed to the official criteria. */
    examinerNotes: { criterion: string; note: string }[];
  };
};

const WRITING_CRITERIA = [
  "Task Response",
  "Coherence & Cohesion",
  "Lexical Resource",
  "Grammatical Range & Accuracy",
];

const SPEAKING_CRITERIA = [
  "Fluency & Coherence",
  "Lexical Resource",
  "Grammatical Range & Accuracy",
  "Pronunciation",
];

export const CRITERIA_BY_SKILL = {
  WRITING: WRITING_CRITERIA,
  SPEAKING: SPEAKING_CRITERIA,
};

export const BAND_9_SAMPLES: SampleSeed[] = [
  {
    slug: "public-transport-vs-roads",
    title: "Governments should invest more in public transport than roads",
    skill: "WRITING",
    taskType: "Task 2",
    topic: "Transport",
    tags: ["band-9", "writing", "task-2", "transport"],
    data: {
      prompt:
        "Some people believe that governments should invest more money in public transport systems than in building new roads. To what extent do you agree or disagree?",
      answer: `In many countries, spending on infrastructure could be directed toward either expanding road networks or improving public transport systems. In my view, the latter deserves greater priority, both for environmental and practical reasons.

To begin with, public transport reduces the number of private vehicles on the road, which in turn lowers carbon emissions and eases traffic congestion. A single bus can replace dozens of cars during peak hours, meaning that investment in reliable, frequent services has an outsized impact on a city's overall emissions compared to building additional lanes, which tend to fill up with new traffic within a few years regardless.

Furthermore, well-funded public transport benefits lower-income residents disproportionately, since not everyone can afford to own and maintain a car. Efficient bus and rail networks give these citizens reliable access to employment, education, and healthcare, narrowing social inequality in a way that road expansion, which mainly benefits car owners, does not.

That said, some road investment remains necessary, particularly for freight and for areas public transport cannot reasonably reach. Governments should therefore not abandon road funding entirely, but the balance of investment should shift firmly toward public transport.

In conclusion, while both forms of infrastructure play a role, the wider social and environmental benefits of public transport make it the stronger long-term investment.`,
      examinerNotes: [
        {
          criterion: "Task Response",
          note: "Takes a clear position in the introduction and holds it throughout. The concession paragraph acknowledges the opposing view without weakening the thesis — a hallmark of a fully developed response.",
        },
        {
          criterion: "Coherence & Cohesion",
          note: "Each paragraph has one central idea signalled by its topic sentence. Linking is varied and purposeful ('To begin with', 'Furthermore', 'That said') rather than mechanically listed.",
        },
        {
          criterion: "Lexical Resource",
          note: "Precise topic vocabulary — 'outsized impact', 'narrowing social inequality', 'freight' — used naturally. Collocations such as 'eases traffic congestion' read as native-like rather than memorised.",
        },
        {
          criterion: "Grammatical Range & Accuracy",
          note: "A wide mix of structures including relative clauses ('which tend to fill up...') and complex subordination, with no errors that impede meaning.",
        },
      ],
    },
  },
  {
    slug: "smartphone-ownership-line-graph",
    title: "Line graph: smartphone ownership, 2000–2020",
    skill: "WRITING",
    taskType: "Task 1 (Academic)",
    topic: "Technology",
    tags: ["band-9", "writing", "task-1-academic", "technology"],
    data: {
      prompt:
        "The line graph below shows the percentage of adults owning a smartphone in three countries between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      answer: `The line graph illustrates the proportion of adults who owned a smartphone in Country A, Country B and Country C over a twenty-year period from 2000 to 2020.

Overall, ownership rose substantially in all three countries, but the pace and timing of growth differed markedly. Country A led throughout the period, whereas Country C started from the lowest base yet ultimately closed much of the gap.

In 2000, smartphone ownership was negligible everywhere, standing at under 5% in all three countries. Country A was the first to see meaningful uptake, climbing steadily to around 40% by 2010 and then accelerating sharply to approximately 85% by 2020. Country B followed a similar trajectory but lagged by roughly five years, reaching just over 20% in 2010 before rising to about 70% at the end of the period.

Country C, by contrast, remained below 10% until 2012. Thereafter its growth was the steepest of the three: ownership more than quadrupled between 2012 and 2020, finishing at approximately 60%. Consequently, although Country C ended the period with the lowest figure, the gap between it and Country A had narrowed considerably compared with a decade earlier.`,
      examinerNotes: [
        {
          criterion: "Task Achievement",
          note: "Opens by paraphrasing the prompt, then gives a genuine overview paragraph identifying the two key features (universal growth, differing pace) before any figures. No opinion is offered, which is correct for Task 1.",
        },
        {
          criterion: "Coherence & Cohesion",
          note: "Logically grouped: the overview, then the two faster adopters, then the outlier. Comparisons are woven in rather than bolted on at the end.",
        },
        {
          criterion: "Lexical Resource",
          note: "Varied language for describing change — 'climbing steadily', 'accelerating sharply', 'more than quadrupled', 'narrowed considerably' — avoiding repetition of 'increased'.",
        },
        {
          criterion: "Grammatical Range & Accuracy",
          note: "Accurate use of approximation ('approximately', 'just over', 'around'), and controlled contrast structures ('whereas', 'by contrast', 'although').",
        },
      ],
    },
  },
  {
    slug: "letter-colleague-delayed-project",
    title: "Letter to a colleague about a delayed project",
    skill: "WRITING",
    taskType: "Task 1 (General)",
    topic: "Work",
    tags: ["band-9", "writing", "task-1-general", "workplace"],
    data: {
      prompt:
        "A project you are working on with a colleague has been delayed. Write a letter to your colleague. In your letter: explain why the project has been delayed, describe what you have done so far, and suggest how you can both meet the new deadline.",
      answer: `Dear Marcus,

I'm writing to update you on the Riverside report, as I'm afraid we've hit a delay that will affect our original timeline.

The hold-up stems from the client's data, which arrived nearly two weeks later than promised and, when it did arrive, was missing the regional breakdowns we had agreed on. I chased this twice last week and have now received a corrected file, but the lost time means we can no longer submit by the fifteenth.

In the meantime, I've tried to keep us moving where I could. The methodology section and the literature review are both complete, and I've drafted the charts using the partial data so that only the figures themselves will need updating. Realistically, that leaves the analysis and the recommendations still to write.

Given where we are, I'd suggest we split the remaining work rather than review each section jointly as we usually do. If you could take the analysis while I handle the recommendations, we could exchange drafts on Thursday and still submit comfortably by the twenty-second. I've spoken to Priya and she's willing to extend us to that date.

Do let me know if this works for you, or if you'd rather divide things differently.

Best wishes,
Elena`,
      examinerNotes: [
        {
          criterion: "Task Achievement",
          note: "All three bullet points are covered and developed, not merely mentioned. The tone is consistently semi-formal — appropriate for a known colleague — and sustained from greeting to sign-off.",
        },
        {
          criterion: "Coherence & Cohesion",
          note: "One bullet point per paragraph, in the order given, with natural transitions ('In the meantime', 'Given where we are') that carry the narrative forward.",
        },
        {
          criterion: "Lexical Resource",
          note: "Natural workplace idiom — 'hit a delay', 'the hold-up stems from', 'chased this twice' — which reads authentically rather than textbook-formal.",
        },
        {
          criterion: "Grammatical Range & Accuracy",
          note: "Confident use of conditional structures for the proposal ('If you could take..., we could exchange...') and a range of tenses handled accurately throughout.",
        },
      ],
    },
  },
  {
    slug: "speaking-part1-hometown",
    title: "Questions about your hometown",
    skill: "SPEAKING",
    taskType: "Part 1",
    topic: "Hometown",
    tags: ["band-9", "speaking", "part-1", "hometown"],
    data: {
      prompt: "Where is your hometown, and what do you like most about it?",
      answer: `I'm originally from Pokhara, which is a lakeside city in central Nepal, about six or seven hours west of Kathmandu by road.

What I like most about it is honestly the setting — you've got Phewa Lake right in the middle of the city and then the Annapurna range rising up straight behind it, so on a clear morning you can be having breakfast and looking at snow peaks. I don't think I appreciated that at all growing up; it was just the view from the window. It's only since I moved away for university that I've realised how unusual it actually is.

The other thing I'd mention is the pace. It's a proper city, but it's nowhere near as hectic as Kathmandu, so you can still get across town in fifteen minutes. That's something I miss quite a lot, actually.`,
      examinerNotes: [
        {
          criterion: "Fluency & Coherence",
          note: "Answers extend naturally beyond the minimum without rambling. Self-correction and reflective asides ('I don't think I appreciated that at all growing up') sound spontaneous, not rehearsed.",
        },
        {
          criterion: "Lexical Resource",
          note: "Flexible, natural phrasing — 'rising up straight behind it', 'nowhere near as hectic', 'a proper city'. Idiomatic without straining for impressive vocabulary.",
        },
        {
          criterion: "Grammatical Range & Accuracy",
          note: "Comfortable shifts between present, past and present perfect ('It's only since I moved away... that I've realised'), all accurate.",
        },
        {
          criterion: "Pronunciation",
          note: "In the live exam this would be judged on natural stress, rhythm and intelligibility. Note how the phrasing invites natural chunking rather than word-by-word delivery.",
        },
      ],
    },
  },
  {
    slug: "speaking-part2-skill-to-learn",
    title: "Describe a skill you would like to learn",
    skill: "SPEAKING",
    taskType: "Part 2",
    topic: "Learning",
    tags: ["band-9", "speaking", "part-2", "learning"],
    data: {
      prompt:
        "Describe a skill you would like to learn. You should say: what the skill is, how you would learn it, how difficult you think it would be, and explain why you want to learn it.",
      answer: `The skill I'd really like to pick up is sign language — Nepali Sign Language specifically, though I'd take any of them.

The reason it's on my mind is that a colleague at my last job was deaf, and we mostly communicated by typing notes back and forth on a phone. It worked, but it was slow, and I always had the feeling that we were only ever having about half a conversation. Anything spontaneous — a joke, an aside in a meeting — just got lost, because by the time you've typed it out the moment's gone.

As for how I'd learn it, I don't think self-study would get me very far with this one. Sign language is visual and interactive, so you really need someone to correct you in real time. There's a deaf association in the city that runs evening classes, and I'd probably start there and then try to actually use it rather than just study it.

I imagine it would be genuinely difficult, but difficult in an unfamiliar way. It's not just vocabulary — the grammar is spatial, so where you place a sign and how your face moves carries meaning. That's a completely different way of thinking about language, and I suspect that's the part I'd struggle with rather than memorising the signs themselves.

But that's exactly why I want to do it. It's not just about being able to talk to more people, although that matters. It's that it would force me to think about communication in a way I never have.`,
      examinerNotes: [
        {
          criterion: "Fluency & Coherence",
          note: "Sustains the full long turn, covering all four cue-card points in order without sounding like a checklist. Ideas connect causally rather than being listed.",
        },
        {
          criterion: "Lexical Resource",
          note: "Precise and varied: 'an aside in a meeting', 'the grammar is spatial', 'difficult in an unfamiliar way'. The concrete anecdote supplies natural vocabulary rather than forced 'high-level' words.",
        },
        {
          criterion: "Grammatical Range & Accuracy",
          note: "Fluent hypothetical language throughout ('I'd probably start there', 'I imagine it would be', 'that's the part I'd struggle with') — exactly what this prompt demands.",
        },
        {
          criterion: "Pronunciation",
          note: "Assessed live on stress and intonation. The contrastive stress this answer invites — 'It's not just vocabulary' — is characteristic of high-band delivery.",
        },
      ],
    },
  },
  {
    slug: "speaking-part3-lifelong-learning",
    title: "Discussion on lifelong learning",
    skill: "SPEAKING",
    taskType: "Part 3",
    topic: "Learning",
    tags: ["band-9", "speaking", "part-3", "learning"],
    data: {
      prompt:
        "Do you think it is more difficult for adults to learn new skills than it is for children?",
      answer: `In some respects yes, but I think the usual explanation for it is wrong.

People tend to say adults learn more slowly because the brain becomes less flexible, and there's probably something to that, particularly with things like accent. But I'd argue the bigger factor is circumstantial rather than biological. A child learning an instrument has hours a day and no competing responsibilities, and crucially they're allowed to be bad at it for years. An adult trying the same thing has maybe twenty minutes in the evening and feels self-conscious about being a beginner in a way a seven-year-old simply doesn't.

So I'd say the constraint is mostly time and ego rather than capacity.

Where adults do have a real advantage is that they can learn strategically. They understand how they learn, they can identify what's actually holding them back, and they can go and address that directly instead of just repeating the whole thing. A child generally can't do that — they improve through sheer volume of exposure.

So on balance I'd say it's not that adults learn worse, it's that they learn under worse conditions. If you gave an adult a child's schedule and a child's freedom to be terrible at something, I suspect the gap would look much smaller than people assume.`,
      examinerNotes: [
        {
          criterion: "Fluency & Coherence",
          note: "Part 3 demands justified, developed answers — this challenges the premise of the question, supports the challenge, concedes a point, then resolves. That argumentative shape is what separates band 9 from band 7 here.",
        },
        {
          criterion: "Lexical Resource",
          note: "Abstract discussion vocabulary handled precisely: 'circumstantial rather than biological', 'learn strategically', 'sheer volume of exposure'.",
        },
        {
          criterion: "Grammatical Range & Accuracy",
          note: "Complex hedging and hypotheticals used accurately — 'I'd argue', 'I suspect', and the closing second conditional — signalling nuance rather than uncertainty.",
        },
        {
          criterion: "Pronunciation",
          note: "Judged live. Note the natural emphasis this answer sets up on contrasts like 'not that adults learn worse, it's that they learn under worse conditions'.",
        },
      ],
    },
  },
];

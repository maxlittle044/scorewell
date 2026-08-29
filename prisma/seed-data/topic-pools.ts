/**
 * Recurring IELTS theme pools.
 *
 * These are NOT predictions of upcoming exam questions — nobody outside the
 * test boards knows those, and content claiming otherwise misleads candidates
 * who are paying for preparation. What is stated here is only what can be
 * honestly supported: which themes recur widely across reported past papers,
 * why the test boards favour that kind of theme, and what to prepare so any
 * question in the area is manageable. Every `examplePrompt` is an illustrative
 * question of that type, written for this site — not a leaked or forecast one.
 */
export type TopicPoolSeed = {
  slug: string;
  title: string;
  topic: string;
  tags: string[];
  data: {
    order: number;
    section: string;
    intro: string;
    themes: {
      title: string;
      examplePrompt: string;
      whyItRecurs: string;
      prepare: string[];
      relatedHref?: string;
      relatedLabel?: string;
    }[];
  };
};

export const TOPIC_POOLS: TopicPoolSeed[] = [
  {
    slug: "recurring-speaking-part-2-themes",
    title: "Speaking Part 2: recurring cue-card themes",
    topic: "Speaking",
    tags: ["topic-pools", "speaking", "part-2"],
    data: {
      order: 1,
      section: "Speaking Part 2",
      intro:
        "Cue cards almost always ask you to describe a person, place, object, event or experience. The wording varies endlessly; the underlying shapes do not.",
      themes: [
        {
          title: "Describe a person who influenced you",
          examplePrompt:
            "Describe a person who has had an important influence on your life. You should say who they are, how you know them, what they did, and explain why they influenced you.",
          whyItRecurs:
            "Every candidate has people in their life, regardless of country, income or education. Themes that need no specialist knowledge are the only ones that can be marked fairly across a global test population.",
          prepare: [
            "Two people you can describe in detail — one family, one outside the family.",
            "Character adjectives beyond 'nice' and 'kind': patient, meticulous, self-effacing, driven.",
            "One concrete anecdote per person; a story fills two minutes far more easily than a list of adjectives.",
          ],
          relatedHref: "/ielts/band-9-samples/speaking-part2-skill-to-learn",
          relatedLabel: "See a band-9 Part 2 answer",
        },
        {
          title: "Describe a place you enjoy visiting",
          examplePrompt:
            "Describe a place you like to go to relax. You should say where it is, how often you go, what you do there, and explain how it makes you feel.",
          whyItRecurs:
            "Place descriptions let the examiner hear a wide range of language in two minutes — location, description, habit, and feeling — which covers several band descriptors at once.",
          prepare: [
            "Prepositions of place used precisely: on the outskirts, overlooking, tucked away behind.",
            "A tense mix: where it is (present), how you found it (past), how often you go (present simple + frequency).",
            "One sensory detail. 'It's quiet' is band 6; 'you can hear the traffic, but only faintly' is not.",
          ],
          relatedHref: "/ielts/speaking/part2-place-to-visit",
          relatedLabel: "Practise this cue card",
        },
        {
          title: "Describe a skill you want to learn",
          examplePrompt:
            "Describe a skill you would like to learn. You should say what it is, how you would learn it, how difficult you think it would be, and explain why you want to learn it.",
          whyItRecurs:
            "The hypothetical framing pushes candidates into conditionals and future forms, which is exactly what Grammatical Range is assessed on. Cue cards that force structure are useful to examiners.",
          prepare: [
            "Conditional and future structures: 'I'd probably start by…', 'Once I got the basics…'.",
            "Language for degrees of difficulty: tricky, demanding, a steep learning curve.",
            "A reason that isn't 'it's useful' — motivation is where interesting vocabulary lives.",
          ],
          relatedHref: "/ielts/speaking/part2-skill-to-learn",
          relatedLabel: "Practise this cue card",
        },
        {
          title: "Describe a memorable event or occasion",
          examplePrompt:
            "Describe an occasion when you celebrated something. You should say what it was, who you were with, what you did, and explain why it was memorable.",
          whyItRecurs:
            "Narrative cue cards let the examiner hear past tenses under pressure — including the past perfect and past continuous, which many candidates avoid unless the task requires them.",
          prepare: [
            "Narrative past tenses, especially past perfect: 'We'd been planning it for months when…'.",
            "Sequencing beyond 'and then': eventually, at that point, by the end of the evening.",
            "One thing that went wrong. Problems make a story, and stories fill the two minutes.",
          ],
        },
      ],
    },
  },
  {
    slug: "recurring-speaking-part-3-areas",
    title: "Speaking Part 3: recurring discussion areas",
    topic: "Speaking",
    tags: ["topic-pools", "speaking", "part-3"],
    data: {
      order: 2,
      section: "Speaking Part 3",
      intro:
        "Part 3 abstracts away from your own life and asks about society. The questions follow your Part 2 topic, so these areas pair with the cue-card themes above.",
      themes: [
        {
          title: "Change over generations",
          examplePrompt:
            "Do you think family relationships have changed compared with your grandparents' generation?",
          whyItRecurs:
            "It works as a follow-up to almost any Part 2 topic, and it reliably produces comparison and contrast language — which is straightforward to assess.",
          prepare: [
            "Comparative structures: 'far more likely to', 'nothing like as common as it used to be'.",
            "Hedging, because you're generalising: 'broadly speaking', 'on the whole', 'there are exceptions'.",
            "Avoid the trap of describing only your own family — Part 3 wants society, not you.",
          ],
          relatedHref: "/ai-conversations/family",
          relatedLabel: "Practise with the AI examiner",
        },
        {
          title: "The role of technology",
          examplePrompt:
            "Some people say technology has made communication shallower. What's your view?",
          whyItRecurs:
            "It's universally accessible and genuinely two-sided, so candidates at every band can find something to say while strong candidates can go much further.",
          prepare: [
            "Concession then counter: 'I can see why people say that, but…'.",
            "Precise nouns instead of 'technology': algorithms, screen time, instant messaging, automation.",
            "One example you can actually develop — a vague claim invites a follow-up you're not ready for.",
          ],
          relatedHref: "/ielts/tips/speaking-part2-mistakes",
          relatedLabel: "Common Speaking mistakes",
        },
        {
          title: "Government versus individual responsibility",
          examplePrompt:
            "Should protecting the environment be the responsibility of individuals or governments?",
          whyItRecurs:
            "The either/or framing invites a balanced answer, which is where band 7+ separates from band 6 — weaker answers pick a side and stop.",
          prepare: [
            "Balanced framing: 'It's really a question of scale — individuals can…, whereas only governments can…'.",
            "Policy vocabulary: regulation, subsidies, incentives, enforcement.",
            "Resist listing. Two developed points beat five undeveloped ones.",
          ],
        },
        {
          title: "Education and opportunity",
          examplePrompt:
            "Do you think everyone should have access to free higher education?",
          whyItRecurs:
            "Education is the one institution every candidate has direct experience of, so it produces genuine opinions rather than memorised ones.",
          prepare: [
            "Cost-and-benefit language: 'the trade-off is', 'it comes at the expense of'.",
            "Abstract nouns: employability, social mobility, funding, accessibility.",
            "A position you can defend against the obvious counterargument.",
          ],
          relatedHref: "/ielts/band-9-samples/speaking-part3-lifelong-learning",
          relatedLabel: "See a band-9 Part 3 answer",
        },
      ],
    },
  },
  {
    slug: "recurring-writing-task-2-themes",
    title: "Writing Task 2: recurring question types and themes",
    topic: "Writing",
    tags: ["topic-pools", "writing", "task-2"],
    data: {
      order: 3,
      section: "Writing Task 2",
      intro:
        "Two things recur in Task 2: a small set of question types, and a small set of subject areas. Knowing the question type matters more — it decides your essay's structure before you've thought about the topic.",
      themes: [
        {
          title: "Opinion (agree / disagree)",
          examplePrompt:
            "Some people believe university education should be free for all students. To what extent do you agree or disagree?",
          whyItRecurs:
            "It's the most common Task 2 type, because it tests the clearest thing: can you state a position and support it consistently for 250 words.",
          prepare: [
            "State your position in the introduction, never only in the conclusion.",
            "Partial agreement is usually easier to argue than total agreement.",
            "Make sure your thesis predicts your body paragraphs.",
          ],
          relatedHref: "/ielts/tips/task-2-essay-structure",
          relatedLabel: "How to structure a band-9 Task 2 essay",
        },
        {
          title: "Discussion (both views)",
          examplePrompt:
            "Some people think automation will create new jobs; others believe it will destroy them. Discuss both views and give your own opinion.",
          whyItRecurs:
            "It catches candidates who only argue one side. The instruction is explicit, and ignoring half of it caps Task Response regardless of language quality.",
          prepare: [
            "Give each view a real paragraph — a token sentence for the side you disagree with is the classic error.",
            "Your own opinion is required. 'Discuss both views' does not mean stay neutral.",
            "Attribution language: 'Proponents of this view argue…', 'Critics counter that…'.",
          ],
          relatedHref: "/ielts/writing/task2-ai-job-market",
          relatedLabel: "Practise this question",
        },
        {
          title: "Problem and solution",
          examplePrompt:
            "Traffic congestion is worsening in many major cities. What problems does this cause, and what measures could reduce it?",
          whyItRecurs:
            "It has two explicit parts, which makes it easy to mark and easy to fail — an essay heavy on problems and light on solutions is unbalanced by definition.",
          prepare: [
            "Balance the halves. Two problems and two solutions, not five and one.",
            "Make solutions specific and match them to the problems you raised.",
            "Modals of proposal: 'could be introduced', 'would need to be funded by'.",
          ],
        },
        {
          title: "Advantages and disadvantages",
          examplePrompt:
            "More people are working from home permanently. Do the advantages outweigh the disadvantages?",
          whyItRecurs:
            "The 'outweigh' phrasing demands a judgement, not a list — so it separates candidates who answer the question from those who describe the topic.",
          prepare: [
            "If asked whether advantages outweigh disadvantages, answer that directly — don't just list both.",
            "Weighing language: 'the decisive factor is', 'this is outweighed by'.",
            "Common subject areas to have ideas ready for: work, environment, technology, education, urban life, health.",
          ],
          relatedHref: "/writing-exercises/technology-made-life-complicated",
          relatedLabel: "Try an untimed exercise",
        },
      ],
    },
  },
  {
    slug: "recurring-writing-task-1-types",
    title: "Writing Task 1: recurring chart and letter types",
    topic: "Writing",
    tags: ["topic-pools", "writing", "task-1"],
    data: {
      order: 4,
      section: "Writing Task 1",
      intro:
        "Academic Task 1 rotates through a fixed set of visual types, and General Training rotates through a fixed set of letter purposes. In both cases the format is far more predictable than the subject matter.",
      themes: [
        {
          title: "Academic: line graph over time",
          examplePrompt:
            "The graph shows smartphone ownership in four countries between 2005 and 2020. Summarise the information by selecting and reporting the main features.",
          whyItRecurs:
            "Change over time is the clearest thing to describe objectively, so it's the most common Academic Task 1 visual.",
          prepare: [
            "Trend verbs and the noun forms: rise/a rise, plateau/a plateau, fluctuate/a fluctuation.",
            "Adverbs of degree: sharply, steadily, marginally.",
            "An overview paragraph is required — it's the single most common reason Task 1 scores are capped.",
          ],
          relatedHref: "/ielts/band-9-samples/smartphone-ownership-line-graph",
          relatedLabel: "See a band-9 Task 1 answer",
        },
        {
          title: "Academic: bar chart or table comparison",
          examplePrompt:
            "The chart shows renewable energy generation by source in five countries in 2022. Summarise the information.",
          whyItRecurs:
            "Comparison without a time axis tests a different skill — selecting what matters from a lot of data rather than following a trend.",
          prepare: [
            "Select, don't transcribe. Reporting every number is a Task Achievement failure.",
            "Comparison structures: 'roughly twice as much as', 'by a considerable margin'.",
            "Group similar categories rather than listing each one separately.",
          ],
          relatedHref: "/ielts/writing/task1-renewable-energy-bar-chart",
          relatedLabel: "Practise this task",
        },
        {
          title: "General Training: complaint or request letter",
          examplePrompt:
            "You recently bought an item that arrived damaged. Write a letter to the company explaining what happened and what you want them to do.",
          whyItRecurs:
            "Transactional letters test register control, which is the core of General Training Task 1 — and complaints require formality under mild emotional pressure.",
          prepare: [
            "Register consistency: 'I am writing to' and 'I would be grateful if' — never 'I want'.",
            "Cover all three bullet points; missing one caps Task Achievement.",
            "Correct sign-off: 'Yours faithfully' for an unnamed recipient, 'Yours sincerely' for a named one.",
          ],
          relatedHref: "/ielts/band-9-samples/letter-colleague-delayed-project",
          relatedLabel: "See a band-9 letter",
        },
      ],
    },
  },
  {
    slug: "recurring-reading-listening-contexts",
    title: "Reading & Listening: recurring contexts",
    topic: "Reading",
    tags: ["topic-pools", "reading", "listening"],
    data: {
      order: 5,
      section: "Reading & Listening",
      intro:
        "You can't prepare the passages, but you can prepare the contexts. Both papers draw on a narrow band of situations, and knowing the vocabulary of those situations removes most of the difficulty.",
      themes: [
        {
          title: "Listening Sections 1–2: everyday transactions",
          examplePrompt:
            "A phone enquiry about renting a flat, joining a gym, or booking a course.",
          whyItRecurs:
            "Sections 1 and 2 are always social or transactional, because they test comprehension of practical detail rather than academic argument.",
          prepare: [
            "Numbers, dates, times and prices spoken naturally — 'a quarter past', 'eight fifty'.",
            "Spelling of names and addresses read aloud letter by letter.",
            "Accommodation, membership and booking vocabulary: deposit, tenancy, off-peak, refundable.",
          ],
          relatedHref: "/dictation-shadowing/moving-to-a-new-city",
          relatedLabel: "Drill numbers and dates",
        },
        {
          title: "Listening Sections 3–4: study and lecture contexts",
          examplePrompt:
            "Two students discussing an assignment, then a single-speaker lecture on an academic topic.",
          whyItRecurs:
            "The paper deliberately escalates from social to academic language, and Section 4 plays straight through with no break — which is where most marks are lost.",
          prepare: [
            "Signposting language that marks where answers cluster: 'turning now to', 'the second factor'.",
            "Never stop to fix a missed answer; you'll lose the next two as well.",
            "Academic spellings worth drilling: environment, development, government, separate.",
          ],
          relatedHref: "/ielts/tips/listening-section-4-mistakes",
          relatedLabel: "Section 4 mistakes to avoid",
        },
        {
          title: "Academic Reading: science, history and social research",
          examplePrompt:
            "A passage on urban beekeeping, vertical farming, or the history of a technology.",
          whyItRecurs:
            "Passages are drawn from general-interest journals and books, so they must be comprehensible to a non-specialist — which rules out genuinely technical material.",
          prepare: [
            "Read the questions before the passage; you're scanning, not studying.",
            "Paraphrase recognition matters more than vocabulary size — the answer is rarely in the question's words.",
            "Budget by passage, not by question: roughly 17, 20 and 23 minutes.",
          ],
          relatedHref: "/ielts/tips/reading-time-management",
          relatedLabel: "Reading time management",
        },
        {
          title: "General Training Reading: workplace and community texts",
          examplePrompt:
            "A staff handbook extract, a council recycling notice, or a training course description.",
          whyItRecurs:
            "General Training tests survival and workplace English, so its sources are the documents adults actually encounter rather than academic journals.",
          prepare: [
            "Notice and instruction register: 'residents are reminded', 'must be presented'.",
            "True/False/Not Given discipline — 'Not Given' means the text is silent, not that it disagrees.",
            "Scan for the specific detail; GT passages reward precision over gist.",
          ],
          relatedHref: "/ielts/reading/gt-test-1",
          relatedLabel: "Try a General Training passage",
        },
      ],
    },
  },
];

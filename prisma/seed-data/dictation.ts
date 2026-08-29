export type DictationSeed = {
  slug: string;
  title: string;
  topic: string;
  tags: string[];
  data: {
    level: "Beginner" | "Intermediate" | "Advanced";
    /** One line of context so the learner knows what they're about to hear. */
    intro: string;
    /** Why this passage is worth dictating, tied to the IELTS Listening paper. */
    listeningFocus: string;
    /** Sentence-sized chunks — the unit a learner transcribes in one pass. */
    segments: string[];
  };
};

export const DICTATION_EXERCISES: DictationSeed[] = [
  {
    slug: "the-lost-umbrella",
    title: "The Lost Umbrella",
    topic: "Everyday life",
    tags: ["dictation", "shadowing", "listening", "everyday-life"],
    data: {
      level: "Beginner",
      intro:
        "A short first-person story about a bad start to a rainy morning, told at natural conversational speed.",
      listeningFocus:
        "Past simple verb endings. In connected speech, -ed endings are easy to lose: “stepped”, “bought” and “hung” all pass by quickly, and Section 1 of the Listening test regularly hinges on whether you heard a past form or a present one.",
      segments: [
        "I left my umbrella on the train this morning.",
        "Of course, it started raining the moment I stepped outside the station.",
        "I ran to the nearest shop and bought a cheap one.",
        "But by the time I got to the office, my shoes were already soaked.",
        "I hung the wet umbrella by the door and made myself a cup of tea before starting work.",
      ],
    },
  },
  {
    slug: "the-coffee-shop-conversation",
    title: "The Coffee Shop Conversation",
    topic: "Everyday life",
    tags: ["dictation", "shadowing", "listening", "everyday-life"],
    data: {
      level: "Beginner",
      intro:
        "Two friends meet by chance and catch up briefly. Short turns, everyday vocabulary, a lot of contractions.",
      listeningFocus:
        "Contractions and weak forms. “I haven't”, “you're”, “it's been” and “I'd love to” are all single beats in real speech. Writing them out in full is the single most common dictation mistake, and it is also what makes candidates mishear short answers in Section 1.",
      segments: [
        "I haven't seen you in ages — how have you been?",
        "Pretty good, thanks, although work has been busier than usual.",
        "I've been meaning to call you, but the weeks just disappear.",
        "Tell me about it. Do you have time for a coffee now?",
        "I'd love to, but I'm meeting my sister at half past four.",
        "No problem at all. Let's find a date next week instead.",
      ],
    },
  },
  {
    slug: "a-job-interview",
    title: "A Job Interview",
    topic: "Work and study",
    tags: ["dictation", "shadowing", "listening", "work-and-study"],
    data: {
      level: "Intermediate",
      intro:
        "An extract from a job interview: a formal register, longer sentences, and careful, hedged answers.",
      listeningFocus:
        "Formal linking and hedging language. Phrases like “I would say that”, “in terms of” and “to some extent” carry very little stress and get compressed heavily. Recognising them is what lets you follow the argument in Section 3, where two speakers negotiate an opinion.",
      segments: [
        "Thank you for coming in today. Could you start by telling us a little about your current role?",
        "Certainly. I've been working as a project coordinator for the past three years.",
        "My main responsibility is managing timelines across four different teams.",
        "In terms of the challenges, I would say that communication is the hardest part.",
        "People are working towards the same goal, but they describe it in very different language.",
        "That's a fair point. How would you handle a deadline that slipped by two weeks?",
        "To some extent it depends on the cause, but I'd raise it early rather than absorb it quietly.",
      ],
    },
  },
  {
    slug: "moving-to-a-new-city",
    title: "Moving to a New City",
    topic: "Accommodation",
    tags: ["dictation", "shadowing", "listening", "accommodation"],
    data: {
      level: "Intermediate",
      intro:
        "Someone describes the practical business of relocating: costs, dates, and the paperwork nobody warns you about.",
      listeningFocus:
        "Numbers, dates and prices. This passage deliberately contains figures spoken the way people actually say them — “the fourteenth”, “eight hundred and fifty”, “a two-bedroom”. Section 1 answers are very often exactly this kind of detail, and the difference between “fifty” and “fifteen” has cost a great many candidates a mark.",
      segments: [
        "I moved to Manchester on the fourteenth of March, which turned out to be the coldest week of the year.",
        "The flat itself was fine — a two-bedroom place about fifteen minutes from the city centre.",
        "The rent was eight hundred and fifty pounds a month, not including bills.",
        "What nobody warns you about is how long the paperwork takes.",
        "I needed proof of address to open a bank account, and a bank account to prove my address.",
        "It took nearly three weeks to sort out, and by then I'd almost stopped noticing the cold.",
      ],
    },
  },
  {
    slug: "planning-a-trip-abroad",
    title: "Planning a Trip Abroad",
    topic: "Travel",
    tags: ["dictation", "shadowing", "listening", "travel"],
    data: {
      level: "Advanced",
      intro:
        "A longer, more discursive passage about planning travel — the closest thing here to the register of a Section 4 lecture.",
      listeningFocus:
        "Signposting and subordinate clauses. Long sentences that turn on “whereas”, “provided that” and “which meant that” are where Section 4 loses people. If you can transcribe the connectors accurately, you can usually reconstruct the meaning even when individual words escape you.",
      segments: [
        "The mistake most people make when planning a trip abroad is booking the flights first.",
        "Flights feel like the decision that matters, whereas in practice they are the easiest part to change.",
        "What genuinely constrains a trip is the visa, which can take anywhere from two weeks to two months.",
        "I learned this the hard way when I booked a flight to Vietnam before checking the requirements.",
        "The application asked for a hotel reservation, which meant that I had to book accommodation I might never use.",
        "Provided that you start with the visa, everything else can be arranged around it fairly comfortably.",
        "It is not a glamorous way to plan a holiday, but it is considerably less stressful than the alternative.",
      ],
    },
  },
];

export type AiConversationSeed = {
  slug: string;
  title: string;
  topic: string;
  tags: string[];
  data: {
    /** Shown on the index card — the question the examiner opens with. */
    blurb: string;
    /** The examiner's first message, stored as turn 1 of every conversation. */
    opener: string;
    /** Sub-topics the examiner should steer through as the conversation develops. */
    followUpAreas: string[];
    /** Language the learner should be trying to use — shown alongside the chat. */
    targetLanguage: string[];
    /** Which part of the Speaking test this topic belongs to. */
    part: "Part 1" | "Part 2" | "Part 3";
  };
};

export const AI_CONVERSATIONS: AiConversationSeed[] = [
  {
    slug: "introductions",
    title: "Introductions",
    topic: "Speaking",
    tags: ["ai-conversation", "speaking", "part-1", "introductions"],
    data: {
      part: "Part 1",
      blurb: "“Tell me about yourself.”",
      opener:
        "Good morning. My name's Alex and I'll be your examiner today. Can you tell me your full name, please — and where you're from?",
      followUpAreas: [
        "where they live now and whether they like it",
        "how long they've lived there",
        "what their home town is known for",
        "whether they'd prefer to live somewhere else in future",
      ],
      targetLanguage: [
        "Present perfect for duration: “I've lived here for about six years.”",
        "Adding a reason without being asked: “…mainly because the transport is so good.”",
        "Softening an opinion: “I'd say it's fairly quiet, actually.”",
      ],
    },
  },
  {
    slug: "hobbies",
    title: "Hobbies & Interests",
    topic: "Speaking",
    tags: ["ai-conversation", "speaking", "part-1", "hobbies"],
    data: {
      part: "Part 1",
      blurb: "“What do you do in your free time?”",
      opener:
        "Let's talk about your free time. What do you usually do when you're not working or studying?",
      followUpAreas: [
        "how they first got interested in it",
        "whether they prefer doing it alone or with other people",
        "whether their interests have changed since childhood",
        "whether people in their country have enough free time",
      ],
      targetLanguage: [
        "Frequency beyond “sometimes”: “every now and then”, “a couple of times a week”.",
        "“Used to” for past habits: “I used to play a lot more than I do now.”",
        "Expressing degree of enthusiasm: “I'm really into…”, “I'm not particularly keen on…”.",
      ],
    },
  },
  {
    slug: "work",
    title: "Work & Career",
    topic: "Speaking",
    tags: ["ai-conversation", "speaking", "part-1", "work-and-study"],
    data: {
      part: "Part 1",
      blurb: "“Describe your current job.”",
      opener:
        "Now let's talk about work. Do you work, or are you a student at the moment? Tell me a little about what you do.",
      followUpAreas: [
        "what a typical day involves",
        "the part of the job they enjoy most, and least",
        "whether they'd like to change jobs in future",
        "how work in their field has changed in recent years",
      ],
      targetLanguage: [
        "Describing responsibility: “I'm responsible for…”, “My role mainly involves…”.",
        "Contrasting within an answer: “…whereas the admin side is much less interesting.”",
        "Future plans with varying certainty: “I'm hoping to…”, “I might well…”.",
      ],
    },
  },
  {
    slug: "family",
    title: "Family & Home",
    topic: "Speaking",
    tags: ["ai-conversation", "speaking", "part-1", "family"],
    data: {
      part: "Part 1",
      blurb: "“Tell me about your family.”",
      opener: "Let's move on to talk about your family. Who do you live with at the moment?",
      followUpAreas: [
        "who they're closest to and why",
        "how often the family spends time together",
        "how family life differs between generations in their country",
        "what makes a home feel comfortable to them",
      ],
      targetLanguage: [
        "Relationship vocabulary beyond the basics: “we're very close”, “we get on well”.",
        "Describing typical behaviour: “She'll often call me just to chat.”",
        "Comparing generations: “My parents' generation tended to…”.",
      ],
    },
  },
  {
    slug: "travel",
    title: "Travel",
    topic: "Speaking",
    tags: ["ai-conversation", "speaking", "part-1", "travel"],
    data: {
      part: "Part 1",
      blurb: "“Describe a memorable trip.”",
      opener:
        "I'd like to talk about travel. Do you enjoy travelling? Tell me about a trip you've taken that stayed with you.",
      followUpAreas: [
        "who they travelled with and how that affected the trip",
        "what they'd do differently next time",
        "whether they prefer familiar places or new ones",
        "how tourism affects the places people visit",
      ],
      targetLanguage: [
        "Narrative past tenses: “We'd been walking for hours when it started to rain.”",
        "Vivid description instead of “nice”: “breathtaking”, “chaotic”, “surprisingly peaceful”.",
        "Hypothetical regret: “I wish we'd stayed a bit longer.”",
      ],
    },
  },
  {
    slug: "study",
    title: "Study & Education",
    topic: "Speaking",
    tags: ["ai-conversation", "speaking", "part-1", "work-and-study"],
    data: {
      part: "Part 1",
      blurb: "“Why did you choose your field of study?”",
      opener:
        "Let's talk about studying. What subject are you studying, or what did you study — and why did you choose it?",
      followUpAreas: [
        "whether the choice was theirs or influenced by others",
        "which part of the subject they find hardest",
        "how they prefer to study — alone, in groups, online",
        "whether university education should be free",
      ],
      targetLanguage: [
        "Explaining motivation: “What appealed to me was…”, “I was drawn to it because…”.",
        "Concession before disagreement: “I can see the argument, but…”.",
        "Abstract nouns for the Part 3 shift: “opportunity”, “funding”, “employability”.",
      ],
    },
  },
];

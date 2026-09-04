import type { QuizQuestion } from "./reading";

export type QuizSeed = {
  slug: string;
  title: string;
  topic: string;
  tags: string[];
  data: { questions: QuizQuestion[] };
};

/** Stored as MINI_EXERCISE with taskType "grammar-test". */
export const GRAMMAR_TESTS: QuizSeed[] = [
  {
    slug: "present-perfect-vs-past-simple",
    title: "Present perfect vs. past simple",
    topic: "Tenses",
    tags: ["grammar", "tenses", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: "I ___ in London since 2019.",
          options: ["live", "lived", "have lived", "am living"],
          correctIndex: 2,
          evidence: {
            explanation:
              "“Since 2019” names a starting point for a period that is still running, and that is the present perfect's job: something begun in the past and still true now.",
          },
          distractorNotes: {
            "0": "The present simple states a fact with no span attached, so it cannot host “since 2019”.",
            "1": "The past simple closes the period — “I lived in London” implies you have left.",
            "3": "The present continuous frames something temporary and current, which sits oddly against a six-year stretch.",
          },
        },
        {
          id: "q2",
          question: "She ___ to Japan three times this year.",
          options: ["went", "has been", "goes", "was going"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“This year” is not over, so a tally inside it takes the present perfect. Note “been”, not “gone”: “has been” means she went and came back, while “has gone” would mean she is in Japan now.",
          },
          distractorNotes: {
            "0": "The past simple needs a finished time — “last year”, “in March”. “This year” is still running.",
            "2": "The present simple describes a habit or routine, not a count of completed trips.",
            "3": "The past continuous sets a scene or an interrupted action; it cannot count occurrences.",
          },
        },
        {
          id: "q3",
          question: "We ___ the film last night and really enjoyed it.",
          options: ["have watched", "watched", "have been watching", "watch"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“Last night” is a finished time, and finished times take the past simple. This is the mirror image of question 1 — the time expression decides the tense.",
          },
          distractorNotes: {
            "0": "The present perfect refuses a specific finished time. “I have watched it last night” is the single most common error with this tense.",
            "2": "The continuous form stresses an activity in progress, which contradicts a film watched through to the end.",
            "3": "The present simple would make it a habit — something you do every night.",
          },
        },
        {
          id: "q4",
          question: "___ you ever ___ sushi?",
          options: ["Did / eat", "Have / eaten", "Do / eat", "Are / eating"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“Ever” asks about experience at any point up to now, with no time specified — the classic present perfect question. Treat “ever”, “never” and “yet” as signals for it.",
          },
          distractorNotes: {
            "0": "The past simple would need a moment in mind: “Did you eat sushi at the party?” “Ever” supplies no such moment.",
            "2": "The present simple asks about habit — whether you eat sushi generally, not whether you have tried it.",
            "3": "The present continuous asks what is happening right now.",
          },
        },
        {
          id: "q5",
          question: "He ___ his keys, so he can't get into the flat.",
          options: ["lost", "has lost", "was losing", "loses"],
          correctIndex: 1,
          evidence: {
            explanation:
              "The past action matters because of its present result — he is locked out now. Present perfect is the tense that carries a past event forward into the present.",
          },
          distractorNotes: {
            "0": "The past simple is not wrong English, but it merely reports the event; the sentence's “so he can't” asks for the tense that links it to now.",
            "2": "The past continuous would describe losing them gradually, which is not how keys are lost.",
            "3": "The present simple would make it habitual — a man who loses his keys as a matter of routine.",
          },
        },
      ],
    },
  },
  {
    slug: "first-second-conditionals",
    title: "First and second conditionals",
    topic: "Conditionals",
    tags: ["grammar", "conditionals", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: "If it ___ tomorrow, we'll cancel the picnic.",
          options: ["rains", "will rain", "rained", "would rain"],
          correctIndex: 0,
          evidence: {
            explanation:
              "First conditional: “if” + present simple, then “will”. The future meaning is carried by “we'll” in the other half, so the if-clause stays present even though it is about tomorrow.",
          },
          distractorNotes: {
            "1": "The most common conditional error in writing. English does not put “will” after “if” in this pattern, however future the meaning is.",
            "2": "The past simple would push the sentence into the second conditional, and “we'll” in the other clause would then clash with it.",
            "3": "“Would” belongs in the result clause of a second conditional, never in its if-clause.",
          },
        },
        {
          id: "q2",
          question: "If I ___ rich, I would travel the world.",
          options: ["am", "was being", "were", "will be"],
          correctIndex: 2,
          evidence: {
            explanation:
              "Second conditional, for something imagined rather than expected. “Were” for every person — I were, he were — is the subjunctive that survives in exactly this pattern.",
          },
          distractorNotes: {
            "0": "“Am” makes it a first conditional, but “would” in the result clause has already committed the sentence to the imagined.",
            "1": "“Was being” describes behaviour at a moment — “he was being difficult” — not a hypothetical state.",
            "3": "“Will” cannot follow “if” here, and it points to a future the sentence is not claiming.",
          },
        },
        {
          id: "q3",
          question: "She ___ the job if she applies now.",
          options: ["would get", "will get", "got", "gets"],
          correctIndex: 1,
          evidence: {
            explanation:
              "The if-clause is present simple (“applies”), which sets this up as a real possibility — so the result takes “will”. Read the clause you are given before choosing the one you are not.",
          },
          distractorNotes: {
            "0": "“Would” is the second-conditional result, and would need “if she applied” to match it.",
            "2": "The past simple leaves the two halves in different worlds and different times.",
            "3": "The present simple in both halves states a general truth, not a prediction about this application.",
          },
        },
        {
          id: "q4",
          question: "If you studied harder, you ___ better results.",
          options: ["will get", "get", "would get", "have got"],
          correctIndex: 2,
          evidence: {
            explanation:
              "“Studied” in the if-clause signals the second conditional — hypothetical, and quietly implying you do not study hard now. The result clause therefore takes “would”.",
          },
          distractorNotes: {
            "0": "Mixes a first-conditional result onto a second-conditional if-clause. Match the halves.",
            "1": "The present simple makes it a general rule, losing the “if this were true” framing.",
            "3": "The present perfect looks backwards at results already achieved, which contradicts the hypothetical.",
          },
        },
        {
          id: "q5",
          question: "Which sentence describes a realistic future possibility?",
          options: [
            "If I won the lottery, I'd buy a house.",
            "If I finish early, I'll call you.",
            "If I were you, I'd apologise.",
            "If I had wings, I'd fly.",
          ],
          correctIndex: 1,
          evidence: {
            explanation:
              "The question asks which is realistic, so look for the first-conditional shape — present simple plus “will”. The other three all use past forms with “would”, which is the grammar of the unlikely.",
          },
          distractorNotes: {
            "0": "Grammatically perfect, but a second conditional: winning the lottery is treated as remote.",
            "2": "The standard way of giving advice, and impossible by definition — you cannot become the other person.",
            "3": "Openly impossible, which is exactly what the second conditional is for.",
          },
        },
      ],
    },
  },
  {
    slug: "definite-indefinite-articles",
    title: "Definite and indefinite articles",
    topic: "Articles",
    tags: ["grammar", "articles", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: "She works as ___ engineer at a tech company.",
          options: ["a", "an", "the", "no article"],
          correctIndex: 1,
          evidence: {
            explanation:
              "One of many engineers, so the indefinite article — and “engineer” opens with a vowel sound, which makes it “an”. The choice is governed by sound, not spelling.",
          },
          distractorNotes: {
            "0": "Right article, wrong form. “A engineer” is hard to say, which is exactly why English inserts the n.",
            "2": "“The” would point to one particular engineer both speakers already have in mind.",
            "3": "English requires an article before a singular countable noun; jobs are no exception.",
          },
        },
        {
          id: "q2",
          question: "___ Sun rises in the east.",
          options: ["A", "An", "The", "No article"],
          correctIndex: 2,
          evidence: {
            explanation:
              "There is only one, and uniqueness takes “the” — as with the moon, the sky, the equator. The east in the same sentence works the same way.",
          },
          distractorNotes: {
            "0": "“A sun” would imply one of several, which is true only in astronomy, not in this sentence.",
            "1": "Also indefinite, and wrong before a consonant sound in any case.",
            "3": "Dropping the article leaves the sentence ungrammatical; unique things still need “the”.",
          },
        },
        {
          id: "q3",
          question: "I love ___ music, especially jazz.",
          options: ["a", "an", "the", "no article"],
          correctIndex: 3,
          evidence: {
            explanation:
              "Uncountable nouns take no article when you mean the thing in general. Compare “I love the music in this film”, where “the” narrows it to one particular music.",
          },
          distractorNotes: {
            "0": "“A” and “an” need a countable noun. You cannot have one music.",
            "1": "Same problem, and the wrong form before a consonant sound.",
            "2": "“The music” would refer to specific music already identified, which contradicts the general love the sentence describes.",
          },
        },
        {
          id: "q4",
          question: "We stayed at ___ hotel near the station. ___ hotel was excellent.",
          options: ["the / A", "a / The", "an / A", "the / The"],
          correctIndex: 1,
          evidence: {
            explanation:
              "The pattern that governs most article questions: “a” to introduce something new, “the” once the listener knows which one you mean. Second mention takes “the”.",
          },
          distractorNotes: {
            "0": "The order reversed — definite first, indefinite second — which is the sequence English never uses.",
            "2": "“Hotel” begins with a consonant sound in standard usage, and the second half is indefinite again after the hotel has been identified.",
            "3": "“The hotel” at first mention implies the listener already knows which, and nothing has introduced it.",
          },
        },
        {
          id: "q5",
          question: "He is ___ most experienced candidate we interviewed.",
          options: ["a", "an", "the", "no article"],
          correctIndex: 2,
          evidence: {
            explanation:
              "Superlatives take “the”, because being the most experienced identifies exactly one person. “Most”, “best”, “largest” — all the same rule.",
          },
          distractorNotes: {
            "0": "“A most experienced candidate” exists as an old-fashioned emphatic (“a most unusual day”), but it means “very”, not “more than all the others”.",
            "1": "Wrong form before a consonant sound, and indefinite where the sentence singles one person out.",
            "3": "Superlatives are not left bare in standard English.",
          },
        },
      ],
    },
  },
  {
    slug: "prepositions-time-place",
    title: "Prepositions of time and place",
    topic: "Prepositions",
    tags: ["grammar", "prepositions", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: "The meeting is ___ Monday morning.",
          options: ["in", "on", "at", "by"],
          correctIndex: 1,
          evidence: {
            explanation:
              "Days take “on”, and a named day keeps “on” even when a part of the day is attached. “In the morning” becomes “on Monday morning” as soon as the day is specified.",
          },
          distractorNotes: {
            "0": "“In” belongs with months, years and parts of the day on their own — “in the morning”, which is what makes this the tempting choice here.",
            "2": "“At” is for clock times and a few fixed phrases: at 9pm, at night, at the weekend.",
            "3": "“By Monday” sets a deadline rather than saying when something happens.",
          },
        },
        {
          id: "q2",
          question: "She was born ___ 1998.",
          options: ["on", "at", "in", "since"],
          correctIndex: 2,
          evidence: {
            explanation:
              "Years, months and seasons take “in”. The rule scales by size: “in” for the long ones, “on” for days, “at” for clock times.",
          },
          distractorNotes: {
            "0": "“On” needs a specific date — “on 3 May 1998” — not a bare year.",
            "1": "“At” is for points in time, and a whole year is not a point.",
            "3": "“Since 1998” marks a period running from then to now, which cannot describe a single birth.",
          },
        },
        {
          id: "q3",
          question: "I'll meet you ___ the entrance to the museum.",
          options: ["in", "at", "on", "to"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“At” treats a place as a point on a map — the spot where two people can meet. Entrances, bus stops and corners all work this way.",
          },
          distractorNotes: {
            "0": "“In” treats the place as an enclosure you are inside. You meet at an entrance and stand in a building.",
            "2": "“On” needs a surface or a line — on the table, on the second floor.",
            "3": "“To” indicates movement towards, so it cannot follow “meet you” as a location.",
          },
        },
        {
          id: "q4",
          question: "The report must be submitted ___ Friday at the latest.",
          options: ["until", "by", "since", "during"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“By” means “at or before this point” — a deadline. “At the latest” in the same sentence is the giveaway.",
          },
          distractorNotes: {
            "0": "The classic confusion. “Until Friday” means the action continues up to Friday; “by Friday” means it must be finished by then.",
            "2": "“Since” looks backwards from now to a start point in the past, the opposite direction to a deadline.",
            "3": "“During Friday” spreads the action across the day rather than setting a limit on it.",
          },
        },
        {
          id: "q5",
          question: "There's a supermarket ___ the corner of my street.",
          options: ["in", "at", "on", "by"],
          correctIndex: 2,
          evidence: {
            explanation:
              "A fixed expression worth memorising: “on the corner” for a building that sits at a street corner. Prepositions of place are as often idiom as rule.",
          },
          distractorNotes: {
            "0": "“In the corner” puts something inside a room, against the join of two walls.",
            "1": "“At the corner” describes a meeting point rather than where a building stands — you wait at the corner for the supermarket that is on it.",
            "3": "“By the corner” means near it, which is vaguer than the sentence intends.",
          },
        },
      ],
    },
  },
];

/** Stored as MINI_EXERCISE with taskType "mini-exercise". */
export const MINI_EXERCISES: QuizSeed[] = [
  {
    slug: "formal-vs-informal-register",
    title: "Word choice: formal vs informal register",
    topic: "Vocabulary",
    tags: ["vocabulary", "register", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: 'Choose the more formal option: "I reckon we should postpone the meeting."',
          options: ["I reckon", "I believe", "I'm thinking"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“Believe” is neutral and carries into any register, which is what makes it the formal choice. In Task 2, opinion verbs are where informality most often slips in.",
          },
          distractorNotes: {
            "0": "“Reckon” is conversational British English. Perfectly good speech, out of place in an essay.",
            "2": "“I'm thinking” suggests an opinion still forming, and contractions lower the register further.",
          },
        },
        {
          id: "q2",
          question: "Which sentence is written in a formal register?",
          options: [
            "Gonna need that report by Friday.",
            "We would appreciate receiving the report by Friday.",
            "Send the report, yeah?",
          ],
          correctIndex: 1,
          evidence: {
            explanation:
              "Full forms, a complete subject and verb, and a softened request. Formality is built from grammar as much as from vocabulary.",
          },
          distractorNotes: {
            "0": "“Gonna” is a written spelling of speech, and the missing subject (“I'm”) marks it as a note, not a letter.",
            "2": "A tag like “yeah?” asks for agreement in conversation and has no place in formal writing.",
          },
        },
        {
          id: "q3",
          question: "Choose the informal option.",
          options: [
            "I would like to enquire about...",
            "Just wondering about...",
            "I am writing to enquire about...",
          ],
          correctIndex: 1,
          evidence: {
            explanation:
              "No subject, no auxiliary — “Just wondering” is a spoken fragment. Read the question carefully: this one asks for the informal option, not the formal one.",
          },
          distractorNotes: {
            "0": "A standard polite formula for a formal letter or email.",
            "2": "The most formal of the three, and the conventional opening of a General Training letter.",
          },
        },
      ],
    },
  },
  {
    slug: "articles-practice",
    title: "Articles: a, an, the, or nothing?",
    topic: "Grammar",
    tags: ["grammar", "articles", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: "She bought ___ umbrella because it was raining.",
          options: ["a", "an", "the"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“Umbrella” starts with a vowel sound, so “an”. It is the sound that decides, which is why it is “an hour” but “a university”.",
          },
          distractorNotes: {
            "0": "Right idea, wrong form before a vowel sound.",
            "2": "“The umbrella” would mean a specific one already known to the listener; this is the first mention.",
          },
        },
        {
          id: "q2",
          question: "___ water in this bottle tastes strange.",
          options: ["A", "The", "No article"],
          correctIndex: 1,
          evidence: {
            explanation:
              "Water is uncountable and normally bare, but “in this bottle” pins it down to a particular quantity — and anything specified takes “the”.",
          },
          distractorNotes: {
            "0": "“A water” needs a countable unit behind it, as when ordering a drink.",
            "2": "Bare “water” is right for water in general. The phrase “in this bottle” is what rules it out here.",
          },
        },
        {
          id: "q3",
          question: "I enjoy ___ long walks on the beach.",
          options: ["a", "the", "no article"],
          correctIndex: 2,
          evidence: {
            explanation:
              "A plural noun meaning the thing in general takes no article. Compare question 2: nothing here narrows it to particular walks.",
          },
          distractorNotes: {
            "0": "“A” cannot precede a plural noun at all.",
            "1": "“The long walks” would point to specific walks already mentioned.",
          },
        },
      ],
    },
  },
  {
    slug: "catch-the-number",
    title: "Catch the number: prices and dates",
    topic: "Listening",
    tags: ["listening", "numbers", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: 'You hear: "That comes to fifteen pounds fifty." What is the price?',
          options: ["£15.15", "£15.50", "£50.15"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“Fifteen pounds fifty” is £15.50 — the second figure is pence, and the word “pence” is usually left out. Listen for the stress: FIF-teen ends heavily, five-TY rises.",
          },
          distractorNotes: {
            "0": "Hears “fifty” as “fifteen”. The two are the single most confused pair in IELTS listening.",
            "2": "The halves swapped. Whichever number comes before “pounds” is the pounds.",
          },
        },
        {
          id: "q2",
          question: 'You hear: "The course starts on the thirtieth of April." What is the date?',
          options: ["13 April", "30 April", "3 April"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“Thirtieth” is 30th. The -teen numbers stress the ending, the -ty numbers stress the beginning — THIR-tieth against thir-TEENTH.",
          },
          distractorNotes: {
            "0": "“Thirteenth” misheard as “thirtieth”, or the reverse. Note that 13 April would be “the thirteenth”.",
            "2": "“Third” is a different word again. When a date matters, the ending is what to catch.",
          },
        },
        {
          id: "q3",
          question: 'You hear: "Call me on oh-double-seven-one, four-two-three." What is the number?',
          options: ["07714 23", "0771 423", "0774 123"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“Double seven” means two sevens, so oh-seven-seven-one, then four-two-three: 0771 423. Write digits as you hear them and expand “double” on the spot.",
          },
          distractorNotes: {
            "0": "The right digits grouped wrongly. The pause in the speaker's voice is where the break falls.",
            "2": "Treats “double seven” as one seven and shifts everything along. Missing “double” costs the whole number.",
          },
        },
      ],
    },
  },
  {
    slug: "skimming-main-idea",
    title: "Skimming for the main idea",
    topic: "Reading",
    tags: ["reading", "skimming", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question:
            'A paragraph begins: "Although electric vehicles produce no exhaust emissions, the picture is more complicated than it first appears." What will the paragraph most likely go on to discuss?',
          options: [
            "Reasons electric vehicles are entirely emission-free",
            "Hidden environmental costs of electric vehicles",
            "How to buy an electric vehicle cheaply",
          ],
          correctIndex: 1,
          evidence: {
            explanation:
              "“Although” concedes a point in order to argue against it, and “more complicated than it first appears” promises the complication. Together they announce the paragraph before it arrives.",
          },
          distractorNotes: {
            "0": "Takes the concession as the argument. Everything before the comma is what the writer is about to qualify.",
            "2": "Price is a plausible electric-vehicle topic, but nothing in the sentence points that way. Skimming means predicting from the text, not from the subject.",
          },
        },
        {
          id: "q2",
          question: "When skimming a passage for the main idea, what should you focus on?",
          options: [
            "Every word, in order",
            "Topic sentences and the opening and closing lines of paragraphs",
            "Only the numbers and dates",
          ],
          correctIndex: 1,
          evidence: {
            explanation:
              "A paragraph usually announces its point in the first sentence and resolves it in the last. Reading those two gets you the argument at a fraction of the cost.",
          },
          distractorNotes: {
            "0": "Reading everything is not skimming, and there is not time for it across three passages in an hour.",
            "2": "Numbers and dates are what you scan for when hunting a specific detail — a different technique for a different question type.",
          },
        },
        {
          id: "q3",
          question:
            'A paragraph ends: "The results, however, have proved difficult to replicate." What does this suggest about the findings?',
          options: [
            "They are firmly established",
            "Their reliability is in question",
            "They were never published",
          ],
          correctIndex: 1,
          evidence: {
            explanation:
              "Replication is how science confirms a result, so results that resist it are doubted. “However” signals the reversal — whatever preceded this sentence was positive.",
          },
          distractorNotes: {
            "0": "The opposite. “However” exists to overturn exactly that reading.",
            "2": "Publication is a separate matter, and results cannot be difficult to replicate unless they were published for others to try.",
          },
        },
      ],
    },
  },
];

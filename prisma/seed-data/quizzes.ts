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
  {
    slug: "modal-verbs-practice",
    title: "Modal verbs: can, may, must, should",
    topic: "Grammar",
    tags: ["grammar", "verbs", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: "Governments ___ invest more in public transport.",
          options: ["must to","must","musts","must be"],
          correctIndex: 1,
          evidence: {
            explanation:
              "A modal verb is followed by the bare verb: “must invest”. It never takes “to”, never takes -s, and never changes form.",
          },
          distractorNotes: {
            "0": "A very common error. Modals like must, can and should are never followed by “to”.",
            "2": "Modals have no -s form, even with “governments”. There is no such word as “musts” here.",
            "3": "“Must be” needs a participle or adjective after it (“must be built”), so it cannot lead straight into “invest”.",
          },
        },
        {
          id: "q2",
          question: "This policy ___ reduce crime, but the evidence is not yet clear.",
          options: ["will","may","does","is going to"],
          correctIndex: 1,
          evidence: {
            explanation:
              "The second half of the sentence admits uncertainty, so the first half needs a modal that expresses possibility. “May” makes a claim the writer can defend; “will” would overstate it.",
          },
          distractorNotes: {
            "0": "“Will” states the result as certain, which the “but” clause then contradicts.",
            "2": "“Does reduce” asserts a fact, and again clashes with the admitted uncertainty.",
            "3": "“Is going to” predicts confidently, so it overstates just as “will” does.",
          },
        },
        {
          id: "q3",
          question: "Students ___ bring phones into the exam room. It is strictly forbidden.",
          options: ["don't have to","mustn't","needn't","might not"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“Mustn't” means it is forbidden. “Don't have to” and “needn't” mean only that it is not necessary, which is a completely different message.",
          },
          distractorNotes: {
            "0": "This says phones are optional, not banned. It is the classic must / don't have to mix-up.",
            "2": "“Needn't” also means not necessary, so it reverses the rule.",
            "3": "“Might not” expresses possibility and says nothing about what is allowed.",
          },
        },
        {
          id: "q4",
          question: "You ___ book a table; the restaurant is never full.",
          options: ["mustn't","don't have to","can't","must"],
          correctIndex: 1,
          evidence: {
            explanation:
              "The restaurant is never full, so booking is unnecessary rather than forbidden. “Don't have to” means not necessary.",
          },
          distractorNotes: {
            "0": "“Mustn't” would mean booking is forbidden, and nothing in the sentence suggests that.",
            "2": "“Can't” would mean you are unable or not allowed to book.",
            "3": "“Must” would make booking compulsory, the opposite of the meaning.",
          },
        },
        {
          id: "q5",
          question: "When I was five, I ___ swim.",
          options: ["can","could","must","will"],
          correctIndex: 1,
          evidence: {
            explanation:
              "For a general ability in the past, “could” is the standard modal. “Can” is present tense and does not fit “when I was five”.",
          },
          distractorNotes: {
            "0": "“Can” refers to the present. The past time marker rules it out.",
            "2": "“Must” expresses obligation, not ability.",
            "3": "“Will” looks forward, but the sentence looks back.",
          },
        },
        {
          id: "q6",
          question: "Despite the heavy traffic, I ___ arrive on time for the interview.",
          options: ["could","was able to","can","might"],
          correctIndex: 1,
          evidence: {
            explanation:
              "This describes one specific achievement on one occasion, which takes “was able to”. “Could” would suggest a general possibility rather than something that actually happened.",
          },
          distractorNotes: {
            "0": "“Could” fits general past ability, but for a single completed success it sounds like a possibility only.",
            "2": "“Can” is present tense, but the sentence describes a past event.",
            "3": "“Might” expresses uncertainty, yet the writer clearly did arrive.",
          },
        },
        {
          id: "q7",
          question: "If you feel unwell, you ___ see a doctor.",
          options: ["must","should","will","would"],
          correctIndex: 1,
          evidence: {
            explanation:
              "The sentence gives advice, not an order. “Should” is the modal for recommendations, and it is softer than “must”.",
          },
          distractorNotes: {
            "0": "“Must” sounds like a strict rule or command, which is stronger than the sentence intends.",
            "2": "“Will” predicts what will happen rather than recommending an action.",
            "3": "“Would” is used for hypotheticals and does not give advice on its own here.",
          },
        },
      ],
    },
  },
  {
    slug: "gerunds-and-infinitives-practice",
    title: "Gerunds and infinitives: -ing or to?",
    topic: "Grammar",
    tags: ["grammar", "verbs", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: "I look forward to ___ you next week.",
          options: ["see","seeing","saw","to see"],
          correctIndex: 1,
          evidence: {
            explanation:
              "In the phrase “look forward to”, the word “to” is a preposition, not part of an infinitive. A preposition is followed by a noun form, so the gerund “seeing” is correct.",
          },
          distractorNotes: {
            "0": "This treats “to” as an infinitive marker. In this phrase it is a preposition, so the base verb is wrong.",
            "2": "A past tense verb cannot follow a preposition.",
            "3": "“To see” would mean “to” is followed by an infinitive, but “look forward” needs “to” plus a gerund.",
          },
        },
        {
          id: "q2",
          question: "Many experts suggest ___ a congestion charge in the city centre.",
          options: ["introduce","to introduce","introducing","introduced"],
          correctIndex: 2,
          evidence: {
            explanation:
              "“Suggest” is one of the verbs that take the gerund: “suggest introducing”. It is never followed by “to” plus a verb.",
          },
          distractorNotes: {
            "0": "The bare verb is not possible after “suggest” without “that” or a gerund.",
            "1": "A very common error. “Suggest to do” is wrong, and “suggest doing” is the correct pattern.",
            "3": "A past participle here would make the sentence a passive with a missing subject.",
          },
        },
        {
          id: "q3",
          question: "The government has decided ___ the law.",
          options: ["changing","to change","change","having changed"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“Decide” belongs to the group that takes the infinitive: “decide to change”. Compare “suggest changing” in the previous question.",
          },
          distractorNotes: {
            "0": "“Decide” does not take a gerund, unlike verbs such as “consider” or “suggest”.",
            "2": "The bare verb needs “to” after “decide”.",
            "3": "“Having changed” refers to an earlier action, which is not what “decide” expresses.",
          },
        },
        {
          id: "q4",
          question: "Many students are interested ___ foreign languages.",
          options: ["to learn","in learning","for learning","at learn"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“Interested” takes the preposition “in”, and a preposition is followed by a gerund: “interested in learning”.",
          },
          distractorNotes: {
            "0": "“Interested to learn” is a common mistake. It changes the pattern of the adjective, which needs “in”.",
            "2": "“Interested for” is not used to link an adjective to an activity.",
            "3": "The preposition is wrong, and the base verb after it is also wrong.",
          },
        },
        {
          id: "q5",
          question: "After ten years, he finally stopped ___, and his health improved.",
          options: ["to smoke","smoking","smoke","to smoking"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“Stop” plus a gerund means to end the activity. “Stopped smoking” means he gave up smoking, which fits the improved health.",
          },
          distractorNotes: {
            "0": "“Stopped to smoke” means he paused in order to smoke, the opposite of the intended meaning.",
            "2": "The bare verb cannot follow “stop” in this pattern.",
            "3": "“To smoking” mixes two patterns and is not grammatical here.",
          },
        },
        {
          id: "q6",
          question: "Taxes on fuel were raised ___ traffic.",
          options: ["to reduce","for reducing","reducing","for reduce"],
          correctIndex: 0,
          evidence: {
            explanation:
              "A purpose is expressed with “to” plus the base verb: “raised to reduce traffic”. “For” plus a gerund is for describing what something is used for, not for the purpose of an action.",
          },
          distractorNotes: {
            "1": "“For reducing” sounds like a description of use, and is not the natural way to give a purpose.",
            "2": "A bare gerund cannot introduce a purpose without “to” or “for”.",
            "3": "“For” must be followed by a noun or gerund, not a base verb.",
          },
        },
        {
          id: "q7",
          question: "I have never managed ___ a foreign language fluently.",
          options: ["to speak","speaking","speak","for speaking"],
          correctIndex: 0,
          evidence: {
            explanation:
              "“Manage” takes the infinitive: “manage to speak”. It belongs with decide, hope, plan and afford.",
          },
          distractorNotes: {
            "1": "“Manage speaking” is not idiomatic. “Manage” takes the infinitive.",
            "2": "The bare verb needs “to” after “manage”.",
            "3": "“For” cannot follow “manage” in this pattern.",
          },
        },
      ],
    },
  },
  {
    slug: "reported-speech-practice",
    title: "Reported speech: say, tell, ask",
    topic: "Grammar",
    tags: ["grammar", "verbs", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: "She ___ me that the meeting had been cancelled.",
          options: ["said","told","talked","explained"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“Tell” takes a person straight after it: “told me that...”. This is the key difference between “tell” and “say”.",
          },
          distractorNotes: {
            "0": "“Said me” is wrong. “Say” cannot be followed directly by a person. You would need “said to me”.",
            "2": "“Talked me that” is not an English pattern. “Talk” is followed by “to” or “about”.",
            "3": "“Explained me” is a very common error. “Explain” needs “to me”.",
          },
        },
        {
          id: "q2",
          question: "He asked me where ___.",
          options: ["did I work","I worked","do I work","I do work"],
          correctIndex: 1,
          evidence: {
            explanation:
              "Reported questions use statement word order, with no inversion and no “do/did”. “Where do you work?” becomes “where I worked” after a past reporting verb.",
          },
          distractorNotes: {
            "0": "This keeps the question word order and the auxiliary “did”, which reported questions do not use.",
            "2": "This keeps the question form, and the tense has not moved back after “asked”.",
            "3": "The word order is right, but “I do work” does not move the tense back and adds an unnecessary auxiliary.",
          },
        },
        {
          id: "q3",
          question: "The manager said that he ___ call the next day.",
          options: ["will","would","did","can"],
          correctIndex: 1,
          evidence: {
            explanation:
              "After a past reporting verb, “will” moves back to “would”. “The next day” also confirms that we are reporting from a later point.",
          },
          distractorNotes: {
            "0": "“Will” would only be right if the manager were reporting in the present, and “the next day” tells us he is not.",
            "2": "“Did call” expresses a completed past action, not a future plan.",
            "3": "“Can” would express ability, and it should also move back to “could” after “said”.",
          },
        },
        {
          id: "q4",
          question: "She said, “I have finished.” → She said that she ___ finished.",
          options: ["has","had","have","was"],
          correctIndex: 1,
          evidence: {
            explanation:
              "The present perfect (“have finished”) moves back to the past perfect (“had finished”) after a past reporting verb.",
          },
          distractorNotes: {
            "0": "“Has” keeps the present perfect, which does not shift back in reported speech.",
            "2": "“Have” is the original speaker's form and would also need a pronoun change, since “I” has become “she”.",
            "3": "“Was finished” is a passive and changes the meaning.",
          },
        },
        {
          id: "q5",
          question: "The teacher told ___ to open our books.",
          options: ["to us","us","for us","that we"],
          correctIndex: 1,
          evidence: {
            explanation:
              "After “tell”, the person comes directly: “told us to open”. No preposition is needed.",
          },
          distractorNotes: {
            "0": "“Told to us” is a very common error. “Tell” takes the person without “to”.",
            "2": "“Told for us” is not possible, because “for” does not link “tell” and its object.",
            "3": "“Told us that we” would need a full clause, and “to open” follows the infinitive instruction pattern.",
          },
        },
        {
          id: "q6",
          question: "She asked me ___ I liked the job.",
          options: ["that","if","what","do"],
          correctIndex: 1,
          evidence: {
            explanation:
              "A yes/no question is reported with “if” or “whether”. “Do you like the job?” has no question word, so it needs “if”.",
          },
          distractorNotes: {
            "0": "“That” introduces a statement, not a question.",
            "2": "“What” asks for information, but the original question could be answered with yes or no.",
            "3": "“Do” brings back the question form, which reported questions do not use.",
          },
        },
        {
          id: "q7",
          question: "They told me they would arrive ___.",
          options: ["tomorrow","the next day","yesterday","today"],
          correctIndex: 1,
          evidence: {
            explanation:
              "Because the reporting verb is in the past, “tomorrow” changes to “the next day”. The report is being made from a later point in time.",
          },
          distractorNotes: {
            "0": "“Tomorrow” would fit only if the report was made on the day they spoke.",
            "2": "“Yesterday” points to the past, which contradicts “would arrive”.",
            "3": "“Today” does not match the shift in time that reported speech requires.",
          },
        },
      ],
    },
  },
  {
    slug: "future-forms-practice",
    title: "Future forms: will, going to and more",
    topic: "Grammar",
    tags: ["grammar", "tenses", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: "Look at those black clouds. It ___ rain.",
          options: ["will","is going to","rains","is raining"],
          correctIndex: 1,
          evidence: {
            explanation:
              "The prediction is based on evidence you can see now, the black clouds, so “going to” is the natural choice.",
          },
          distractorNotes: {
            "0": "“Will” suits predictions based on opinion, not on visible evidence.",
            "2": "The present simple would describe a habit or a timetable, not a coming event.",
            "3": "“Is raining” says that it is raining right now, which is not what the clouds suggest.",
          },
        },
        {
          id: "q2",
          question: "A: The phone is ringing.  B: I ___ get it.",
          options: ["am going to","will","get","am getting"],
          correctIndex: 1,
          evidence: {
            explanation:
              "B is making a decision at the moment of speaking, with no earlier plan. That is the job of “will”, as in “I'll get it.”",
          },
          distractorNotes: {
            "0": "“Going to” is for plans made before the moment of speaking, and B has just decided.",
            "2": "The present simple cannot express an instant decision.",
            "3": "The present continuous suggests a fixed arrangement, which does not fit a spontaneous decision.",
          },
        },
        {
          id: "q3",
          question: "I ___ my tutor at three tomorrow; we've already arranged it.",
          options: ["will meet","am meeting","meet","have met"],
          correctIndex: 1,
          evidence: {
            explanation:
              "A fixed arrangement, with a time and a person, takes the present continuous: “I'm meeting my tutor at three.”",
          },
          distractorNotes: {
            "0": "“Will” is used for decisions and predictions, and it does not show that an arrangement is already fixed.",
            "2": "The present simple is used for timetables, not for personal arrangements.",
            "3": "The present perfect looks back from now, and does not refer to a future meeting.",
          },
        },
        {
          id: "q4",
          question: "The train ___ at 8:15 tomorrow morning.",
          options: ["leaves","will leave","left","has left"],
          correctIndex: 0,
          evidence: {
            explanation:
              "A timetable or schedule takes the present simple, even when the event is in the future: “The train leaves at 8:15.”",
          },
          distractorNotes: {
            "1": "“Will leave” is not wrong in casual speech, but timetables and schedules normally take the present simple.",
            "2": "“Left” is a past form, but the time marker “tomorrow” is future.",
            "3": "“Has left” means the train has already gone, which contradicts “tomorrow morning”.",
          },
        },
        {
          id: "q5",
          question: "I'll call you as soon as I ___ at the airport.",
          options: ["will arrive","arrive","am arriving","arrived"],
          correctIndex: 1,
          evidence: {
            explanation:
              "After time words such as “as soon as”, “when” and “before”, the present simple is used for the future. The “will” belongs in the main clause only.",
          },
          distractorNotes: {
            "0": "A very common error. “Will” cannot be used after a time word such as “as soon as”.",
            "2": "The present continuous refers to an arrangement, not to the time clause.",
            "3": "The past simple would place the arrival in the past, but the call has not happened yet.",
          },
        },
        {
          id: "q6",
          question: "If the government ___ taxes, people will spend less.",
          options: ["will raise","raises","raised","is raising"],
          correctIndex: 1,
          evidence: {
            explanation:
              "In a first conditional, the “if” clause takes the present simple and the result clause takes “will”. So “if the government raises taxes, people will spend less”.",
          },
          distractorNotes: {
            "0": "“Will” is used for the result, not in the “if” clause.",
            "2": "“Raised” would create a second conditional, which would need “would spend” in the second clause.",
            "3": "The present continuous suggests something already in progress, and does not fit a general condition.",
          },
        },
        {
          id: "q7",
          question: "The population ___ to reach ten million by 2050.",
          options: ["is projected","will projected","projects","is projecting"],
          correctIndex: 0,
          evidence: {
            explanation:
              "“Is projected to” is a formal, careful way of reporting a forecast, and it is very useful in a Task 1 answer.",
          },
          distractorNotes: {
            "1": "“Will projected” is not grammatical. “Will be projected” would change the meaning.",
            "2": "“Projects to reach” makes the population the doer, and it does not match the meaning.",
            "3": "“Is projecting” would mean the population itself is making the forecast.",
          },
        },
      ],
    },
  },
  {
    slug: "adjectives-and-adverbs-practice",
    title: "Adjectives and adverbs: sharp or sharply?",
    topic: "Grammar",
    tags: ["grammar", "word-forms", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: "The number of visitors increased ___ between 2010 and 2015.",
          options: ["sharp","sharply","sharpen","sharpness"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“Increased” is a verb, so it needs an adverb to describe how the number changed: “sharply”. This is the pattern Task 1 relies on.",
          },
          distractorNotes: {
            "0": "“Sharp” is an adjective. It can describe a noun (“a sharp rise”), but it cannot describe a verb.",
            "2": "“Sharpen” is a verb meaning to make sharp, and it does not fit here.",
            "3": "“Sharpness” is a noun, and it cannot follow the verb “increased” in this way.",
          },
        },
        {
          id: "q2",
          question: "She speaks English very ___.",
          options: ["good","well","goodly","best"],
          correctIndex: 1,
          evidence: {
            explanation:
              "The adverb of “good” is “well”. “Speaks” is a verb, so it needs the adverb “well”.",
          },
          distractorNotes: {
            "0": "“Good” is an adjective, and it cannot describe how someone speaks.",
            "2": "“Goodly” is not the adverb of “good” in modern English.",
            "3": "“Best” is a superlative and does not fit after “very”.",
          },
        },
        {
          id: "q3",
          question: "The proposal seems ___.",
          options: ["reasonably","reasonable","reason","reasoning"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“Seem” is a linking verb, so it is followed by an adjective that describes the subject: “seems reasonable”.",
          },
          distractorNotes: {
            "0": "An adverb would describe how the proposal “seems”, as an action, but it is describing the proposal itself.",
            "2": "“Reason” is a noun and cannot describe the proposal.",
            "3": "“Reasoning” is a noun or participle and does not fit this pattern.",
          },
        },
        {
          id: "q4",
          question: "It is a ___ important issue for young people.",
          options: ["real","really","reality","realism"],
          correctIndex: 1,
          evidence: {
            explanation:
              "An adjective (“important”) is modified by an adverb, so “really important” is correct. “Real important” is a common error.",
          },
          distractorNotes: {
            "0": "“Real” is an adjective. It cannot modify another adjective in careful English.",
            "2": "“Reality” is a noun, and it cannot modify an adjective.",
            "3": "“Realism” is also a noun, and it does not fit.",
          },
        },
        {
          id: "q5",
          question: "He works very ___, so he is always tired.",
          options: ["hardly","hard","hardness","hardy"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“Hard” is both an adjective and an adverb, so “works hard” is correct. “Hardly” is a different word.",
          },
          distractorNotes: {
            "0": "“Hardly” means “almost not”. “He works hardly” would say that he barely works, the opposite of the intended meaning.",
            "2": "“Hardness” is a noun and does not fit after “works very”.",
            "3": "“Hardy” is an adjective meaning tough, and it cannot describe how someone works.",
          },
        },
        {
          id: "q6",
          question: "I could ___ hear the speaker from the back of the hall.",
          options: ["hard","hardly","hardest","harshly"],
          correctIndex: 1,
          evidence: {
            explanation:
              "“Hardly” means “almost not”, so “could hardly hear” means it was very difficult to hear. It is often confused with “hard”.",
          },
          distractorNotes: {
            "0": "“Hard” does not modify “hear” in this way, and it would not give the meaning of difficulty.",
            "2": "“Hardest” is a superlative and does not fit before “hear”.",
            "3": "“Harshly” means in a severe way, and it has nothing to do with hearing.",
          },
        },
        {
          id: "q7",
          question: "She bought a ___ table at the market.",
          options: ["beautiful old wooden","wooden old beautiful","old beautiful wooden","wooden beautiful old"],
          correctIndex: 0,
          evidence: {
            explanation:
              "Adjectives follow a normal order: opinion, size, age, shape, colour, origin, material. So the opinion (beautiful) comes first, then age (old), then material (wooden).",
          },
          distractorNotes: {
            "1": "This puts material first, which reverses the normal order.",
            "2": "Age comes before opinion here, so the sequence sounds unnatural.",
            "3": "Material (wooden) comes before opinion and age, which is not the usual order.",
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
  {
    slug: "verb-forms-gap-fill",
    title: "Verb forms: type the missing word",
    topic: "Grammar",
    tags: ["grammar", "verb-forms", "gap-fill"],
    data: {
      questions: [
        {
          id: "q1",
          type: "Tenses",
          question: "She has ___ in Manchester since she graduated. (live)",
          accept: ["lived"],
          evidence: {
            explanation:
              "After “has”, the verb takes its past participle: lived. Producing the form yourself is the point here — recognising it in a list is easier than recalling it.",
          },
        },
        {
          id: "q2",
          type: "Tenses",
          question: "If I had known about the delay, I ___ have left earlier. (will)",
          accept: ["would"],
          evidence: {
            explanation:
              "A third conditional: “had known” in the if-clause forces “would have” in the result. “Will have” belongs to a real future, which this sentence has already ruled out.",
          },
        },
        {
          id: "q3",
          type: "Word formation",
          question: "The results were highly ___ , which surprised the research team. (significance)",
          accept: ["significant"],
          evidence: {
            explanation:
              "The gap follows “highly” and describes “the results”, so an adjective is needed, not the noun given in brackets. Word formation questions test the ending, not the meaning.",
          },
        },
        {
          id: "q4",
          type: "Passive voice",
          question: "The report ___ published next week. (be)",
          accept: ["will be"],
          evidence: {
            explanation:
              "A future passive: the report receives the action rather than performing it, so “will be” plus the past participle. Both words are needed — “be” alone leaves no tense.",
          },
        },
        {
          id: "q5",
          type: "Word formation",
          question: "Her explanation was much ___ than the one in the textbook. (clear)",
          accept: ["clearer", "more clear"],
          evidence: {
            explanation:
              "“Than” calls for a comparative. Short adjectives usually take -er, so “clearer” is the natural choice — though “more clear” is also accepted here.",
          },
        },
      ],
    },
  },
  {
    slug: "prepositions-gap-fill",
    title: "Prepositions: type the missing word",
    topic: "Grammar",
    tags: ["grammar", "prepositions", "gap-fill"],
    data: {
      questions: [
        {
          id: "q1",
          type: "Prepositions",
          question: "The conference takes place ___ 14 March.",
          accept: ["on"],
          evidence: {
            explanation:
              "Specific dates take “on”. The ladder is by size: “in” for years and months, “on” for days and dates, “at” for clock times.",
          },
        },
        {
          id: "q2",
          type: "Prepositions",
          question: "She has worked here ___ three years.",
          accept: ["for"],
          evidence: {
            explanation:
              "“For” measures a length of time; “since” names its starting point. “For three years” and “since 2023” describe the same span from different ends.",
          },
        },
        {
          id: "q3",
          type: "Prepositions",
          question: "We arrived ___ the airport two hours early.",
          accept: ["at"],
          evidence: {
            explanation:
              "“Arrive at” a place treated as a point — an airport, a station, a meeting. “Arrive in” is for countries and cities, and “arrive to” is never right.",
          },
        },
        {
          id: "q4",
          type: "Prepositions",
          question: "He apologised ___ being late.",
          accept: ["for"],
          evidence: {
            explanation:
              "A verb that always takes the same preposition — apologise for. These are worth learning as whole phrases rather than deducing.",
          },
        },
        {
          id: "q5",
          type: "Prepositions",
          question: "The report is divided ___ four sections.",
          accept: ["into"],
          evidence: {
            explanation:
              "“Divide into” describes splitting one thing across several parts. “In” would place the report inside the sections rather than splitting it among them.",
          },
        },
      ],
    },
  },
  {
    slug: "linking-words-gap-fill",
    title: "Linking words: type the missing connector",
    topic: "Cohesion",
    tags: ["grammar", "linking-words", "gap-fill"],
    data: {
      questions: [
        {
          id: "q1",
          type: "Linking words",
          question: "The scheme was expensive; ___ , it achieved very little.",
          accept: ["however", "nevertheless", "nonetheless"],
          evidence: {
            explanation:
              "The second clause undercuts the first, so the connector must signal contrast. Work out the relationship between the two halves before reaching for a word.",
          },
        },
        {
          id: "q2",
          type: "Linking words",
          question: "___ the rain, the match went ahead as planned.",
          accept: ["despite", "in spite of"],
          evidence: {
            explanation:
              "A concession before a noun (“the rain”) takes “despite” or “in spite of”. “Although” would need a clause after it — “although it rained”.",
          },
        },
        {
          id: "q3",
          type: "Linking words",
          question: "She missed the deadline ___ she had been unwell for a fortnight.",
          accept: ["because", "as", "since"],
          evidence: {
            explanation:
              "The second half gives the reason for the first, and all three of these introduce a reason clause. “Because” is the plainest and never wrong here.",
          },
        },
        {
          id: "q4",
          type: "Linking words",
          question: "The sample was small; ___ , the conclusions remain provisional.",
          accept: ["therefore", "consequently", "thus"],
          evidence: {
            explanation:
              "Result, not contrast: the small sample causes the caution. Compare question 1, where the same punctuation carried the opposite relationship — the words do the work, not the semicolon.",
          },
        },
        {
          id: "q5",
          type: "Linking words",
          question: "___ to reduce costs, the company closed two of its regional offices.",
          accept: ["in order"],
          evidence: {
            explanation:
              "“In order to” states a purpose. The bare infinitive (“To reduce costs, …”) also works, but the gap here is followed by “to”, which fixes the phrase.",
          },
        },
      ],
    },
  },
];

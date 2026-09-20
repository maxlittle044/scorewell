/**
 * The grammar library (site-build-prompt.md section 4b: "grammar library organised by
 * point rather than as tests").
 *
 * Grammar already existed here only as quizzes, which test whether you know a rule but
 * never state it. Each entry below explains one point, shows the mistake it actually
 * causes, and — where a quiz exists for it — links to that quiz as practice.
 *
 * Stored as ARTICLE with taskType "grammar-point", the same split-by-taskType pattern
 * topic pools and topic banks already use, so no schema change is needed.
 *
 * `practiceSlug` must match a slug in GRAMMAR_TESTS; the loader drops it if the quiz has
 * gone, so a renamed test degrades to "no practice link" rather than a dead link.
 */

export type GrammarExample = {
  /** The version a learner typically writes. Omitted where there's no single common error. */
  wrong?: string;
  right: string;
  note?: string;
};

export type GrammarPointSeed = {
  slug: string;
  title: string;
  category: string;
  /** One line, used on the index cards. */
  summary: string;
  explanation: string[];
  examples: GrammarExample[];
  /** Why this costs marks, tied to a real IELTS criterion. */
  ieltsNote: string;
  practiceSlug?: string;
  tags: string[];
};

export const GRAMMAR_POINTS: GrammarPointSeed[] = [
  {
    slug: "present-perfect-and-past-simple",
    title: "Present perfect and past simple",
    category: "Tenses",
    summary: "Finished time takes the past simple; unfinished or unstated time takes the present perfect.",
    explanation: [
      "The past simple places an action inside a finished period of time: yesterday, in 2019, last summer. If the time period is over, the past simple is the only correct choice.",
      "The present perfect connects the past to now. Use it when the time period is still open (this year, since April), when the time is not stated at all, or when the result rather than the event is the point.",
      "The clue is usually the time expression, not the action. 'I lived in Rome' and 'I have lived in Rome' are both correct English — they answer different questions.",
    ],
    examples: [
      {
        wrong: "I have visited Paris last year.",
        right: "I visited Paris last year.",
        note: "'Last year' is finished, so the present perfect cannot be used with it.",
      },
      {
        wrong: "I am living here since 2020.",
        right: "I have lived here since 2020.",
        note: "'Since' marks a period running up to now — present perfect, not present continuous.",
      },
      {
        right: "The government has introduced three reforms this decade.",
        note: "The decade is still running, so the period is open.",
      },
    ],
    ieltsNote:
      "This is the single most common tense error in Task 2 essays. Because it recurs across a whole essay rather than appearing once, it reads as a systematic error and pulls down Grammatical Range and Accuracy.",
    practiceSlug: "present-perfect-vs-past-simple",
    tags: ["grammar", "tenses", "writing"],
  },
  {
    slug: "articles-a-an-the-and-zero",
    title: "Articles: a, an, the, and none at all",
    category: "Articles",
    summary: "Use 'a/an' to introduce, 'the' to refer back or to something unique, and no article for general plurals and uncountables.",
    explanation: [
      "Use 'a' or 'an' the first time you mention a countable singular noun: the reader does not yet know which one you mean.",
      "Use 'the' once it is clear which one you mean — because you have already mentioned it, because there is only one, or because the phrase itself narrows it down ('the cost of housing').",
      "Use no article at all to talk about things in general with plural or uncountable nouns. This is the rule most often missed, because many languages use a definite article here.",
    ],
    examples: [
      {
        wrong: "The children learn faster than the adults.",
        right: "Children learn faster than adults.",
        note: "A general statement about all children takes no article.",
      },
      {
        wrong: "Government should invest in education.",
        right: "The government should invest in education.",
        note: "A specific government, known from context — 'the' is required.",
      },
      {
        right: "A study found that the results were inconclusive.",
        note: "'A study' introduces it; 'the results' refers back to that study's results.",
      },
    ],
    ieltsNote:
      "Article errors rarely stop an examiner understanding you, so they don't hurt Task Response — but a band 7 descriptor asks for frequent error-free sentences, and articles are what usually stop a sentence being error-free.",
    practiceSlug: "definite-indefinite-articles",
    tags: ["grammar", "articles", "writing"],
  },
  {
    slug: "conditionals",
    title: "Conditionals",
    category: "Conditionals",
    summary: "First for real future possibilities, second for hypothetical ones, third for the unchangeable past.",
    explanation: [
      "First conditional — 'if' + present simple, then 'will': a realistic future possibility. 'If governments act now, emissions will fall.'",
      "Second conditional — 'if' + past simple, then 'would': hypothetical or unlikely. 'If governments acted now, emissions would fall.' The past tense signals distance from reality, not past time.",
      "Third conditional — 'if' + past perfect, then 'would have': a past that cannot now be changed. 'If governments had acted, emissions would have fallen.'",
      "The most frequent error is mixing the halves — putting 'will' in the 'if' clause.",
    ],
    examples: [
      {
        wrong: "If the policy will succeed, unemployment will fall.",
        right: "If the policy succeeds, unemployment will fall.",
        note: "The 'if' clause takes the present simple even though it refers to the future.",
      },
      {
        wrong: "If I would have more time, I would study abroad.",
        right: "If I had more time, I would study abroad.",
      },
    ],
    ieltsNote:
      "Conditionals are one of the cheapest ways to show grammatical range in Task 2 and Speaking Part 3, because hypothetical questions invite them naturally. Using one correctly is worth more than using three shakily.",
    practiceSlug: "first-second-conditionals",
    tags: ["grammar", "conditionals", "speaking", "writing"],
  },
  {
    slug: "prepositions-of-time-and-place",
    title: "Prepositions of time and place",
    category: "Prepositions",
    summary: "In for the large and enclosed, on for surfaces and days, at for points.",
    explanation: [
      "Time: 'at' for clock times, 'on' for days and dates, 'in' for months, years, seasons and centuries. The unit gets larger as you move at → on → in.",
      "Place: 'at' for a point or an address, 'on' for a surface or a line, 'in' for an enclosed area or a volume.",
      "Many prepositions in English are fixed by the word before them rather than by logic — 'depend on', 'interested in', 'an increase in'. These have to be learned as pairs.",
    ],
    examples: [
      {
        wrong: "There was a sharp increase of unemployment.",
        right: "There was a sharp increase in unemployment.",
        note: "'Increase' takes 'in' for what rose, and 'of' only for the amount: an increase of 5%.",
      },
      {
        wrong: "I will meet you in Monday morning.",
        right: "I will meet you on Monday morning.",
      },
    ],
    ieltsNote:
      "Task 1 leans heavily on a small set of these: an increase in, a fall of, compared with, between X and Y. Getting that handful right removes most preposition errors from a Task 1 report.",
    practiceSlug: "prepositions-time-place",
    tags: ["grammar", "prepositions", "task1"],
  },
  {
    slug: "relative-clauses",
    title: "Relative clauses",
    category: "Sentence structure",
    summary: "Join two ideas into one sentence with who, which, that, whose or where.",
    explanation: [
      "A defining relative clause identifies which one you mean and takes no commas: 'Students who study abroad often adapt quickly.' Remove it and the sentence changes meaning.",
      "A non-defining clause adds extra information about something already identified, and needs commas: 'My university, which was founded in 1890, is small.' 'That' cannot be used here.",
      "Use 'which' to refer to a whole preceding idea: 'Fees have risen sharply, which has priced out poorer applicants.'",
    ],
    examples: [
      {
        wrong: "The report, that was published in May, criticised the scheme.",
        right: "The report, which was published in May, criticised the scheme.",
        note: "'That' is not used in non-defining clauses.",
      },
      {
        right: "People who cycle to work report lower stress levels.",
        note: "Defining — it specifies which people, so no commas.",
      },
    ],
    ieltsNote:
      "Complex sentences are explicitly named in the band 6+ descriptors for Grammatical Range. A relative clause is the most natural way to produce one without the sentence becoming hard to follow.",
    tags: ["grammar", "sentence-structure", "writing"],
  },
  {
    slug: "the-passive-voice",
    title: "The passive voice",
    category: "Sentence structure",
    summary: "Use it when the action matters more than who performed it.",
    explanation: [
      "Form the passive with 'be' plus the past participle: 'The data were collected in March.'",
      "Use it when the doer is unknown, obvious, or unimportant — which is often the case in academic and process writing.",
      "Do not use it everywhere. A whole essay in the passive becomes vague and harder to read, and examiners notice the padding.",
    ],
    examples: [
      {
        right: "The bottles are then washed and sterilised.",
        note: "Task 1 process diagrams are the clearest legitimate use: nobody cares who washes them.",
      },
      {
        wrong: "It is believed by me that fees should be abolished.",
        right: "I believe fees should be abolished.",
        note: "Passivising your own opinion adds words and removes clarity.",
      },
    ],
    ieltsNote:
      "In Task 1 process questions the passive is close to required. In Task 2 it is a tool, not a style — overusing it costs you on Coherence rather than gaining you anything on Range.",
    tags: ["grammar", "sentence-structure", "task1"],
  },
  {
    slug: "subject-verb-agreement",
    title: "Subject–verb agreement",
    category: "Accuracy",
    summary: "The verb agrees with the real subject, not with the nearest noun.",
    explanation: [
      "When a phrase separates the subject from its verb, the verb still agrees with the subject: 'The number of students has risen', not 'have risen'.",
      "'Each', 'every', 'one of' and 'neither' take a singular verb, however plural the following noun looks.",
      "Uncountable nouns that are plural in many other languages — information, advice, research, equipment — are singular in English.",
    ],
    examples: [
      {
        wrong: "The range of options available to students are limited.",
        right: "The range of options available to students is limited.",
        note: "The subject is 'the range', not 'students'.",
      },
      {
        wrong: "Researches show that sleep affects memory.",
        right: "Research shows that sleep affects memory.",
      },
    ],
    ieltsNote:
      "These errors cluster in exactly the long, complex sentences learners write to show range — so the attempt to reach band 7 is what produces them. Reread long sentences and check the verb against the head noun.",
    tags: ["grammar", "accuracy", "writing"],
  },
  {
    slug: "countable-and-uncountable-nouns",
    title: "Countable and uncountable nouns",
    category: "Nouns",
    summary: "Uncountable nouns take no plural -s and no 'a', and use much/less rather than many/fewer.",
    explanation: [
      "Uncountable nouns name a mass rather than separate items: information, advice, knowledge, traffic, equipment, homework, research, money.",
      "They take a singular verb, never 'a/an', and never a plural -s. To count them, use a unit: 'a piece of advice', 'two items of equipment'.",
      "Use 'much', 'little' and 'less' with uncountables; 'many', 'few' and 'fewer' with countables.",
    ],
    examples: [
      {
        wrong: "He gave me some useful advices.",
        right: "He gave me some useful advice.",
      },
      {
        wrong: "There were less applicants this year.",
        right: "There were fewer applicants this year.",
        note: "'Applicants' is countable, so 'fewer'.",
      },
    ],
    ieltsNote:
      "This is a Lexical Resource issue as much as a grammar one: 'informations' signals a learner reaching for academic vocabulary without control of it, which is precisely what the band 6 descriptor describes.",
    tags: ["grammar", "nouns", "vocabulary"],
  },
  {
    slug: "linking-words-and-cohesion",
    title: "Linking words and cohesion",
    category: "Cohesion",
    summary: "Link ideas because they are related, not to decorate the sentence.",
    explanation: [
      "Linking words signal a relationship: contrast (however, whereas), addition (moreover, in addition), result (therefore, consequently), example (for instance).",
      "'However' and 'although' are not interchangeable. 'However' joins two sentences and takes a comma; 'although' joins two clauses inside one sentence.",
      "Cohesion is not only linking words. Pronouns, synonyms and repeated key nouns hold a paragraph together at least as much, and read far more naturally.",
    ],
    examples: [
      {
        wrong: "Although, the policy was expensive. However it worked.",
        right: "Although the policy was expensive, it worked.",
        note: "'Although' joins two clauses in one sentence and takes no comma after it.",
      },
      {
        wrong: "Firstly, moreover, in addition, finally, the cost is high.",
        right: "The cost is also high.",
        note: "Stacking connectives is a band 5–6 marker, not a band 7 one.",
      },
    ],
    ieltsNote:
      "The Coherence and Cohesion descriptors penalise mechanical overuse explicitly. Fewer, better-chosen links score higher than one at the start of every sentence.",
    tags: ["grammar", "cohesion", "writing"],
  },
  {
    slug: "comparatives-and-superlatives",
    title: "Comparatives and superlatives",
    category: "Comparison",
    summary: "The language Task 1 runs on — bigger than, the largest, twice as many as.",
    explanation: [
      "Short adjectives add -er/-est; longer ones take more/most. Never both: 'more bigger' is a common and very visible error.",
      "Comparatives take 'than'; superlatives take 'the' and usually a group: 'the highest of the four countries'.",
      "For proportions, 'twice as many as' and 'half as many as' are more precise than 'much more', and Task 1 rewards precision.",
    ],
    examples: [
      {
        wrong: "The figure for China was more higher than India.",
        right: "The figure for China was higher than that for India.",
        note: "Two errors: doubled comparative, and comparing a figure to a country.",
      },
      {
        right: "Spain recorded the steepest decline of the five countries.",
      },
    ],
    ieltsNote:
      "Task 1 is comparison from start to finish. Comparing the wrong things — a figure with a country, one year with a category — is a Task Achievement problem, not just a grammar one.",
    tags: ["grammar", "comparison", "task1"],
  },
  {
    slug: "modal-verbs",
    title: "Modal verbs",
    category: "Verbs",
    summary: "Can, may, might, must, should: how to show possibility, obligation and advice without overstating.",
    explanation: [
      "Modal verbs sit before the base form of another verb and never change: 'she can swim', not 'she cans swim' or 'she can to swim'. The same goes for may, might, must, should and would. They have no -s, no -ing form and no 'to' after them.",
      "Use them to show how certain you are. 'Will' states something as a fact, 'may' and 'might' suggest it is possible, and 'could' sits between them. Academic writing depends on this: 'this policy may reduce crime' is a claim you can defend, while 'this policy will reduce crime' is one you probably cannot.",
      "For obligation, 'must' and 'have to' both mean it is necessary, but they differ in the negative. 'You mustn't park here' means it is forbidden; 'you don't have to park here' means it is not necessary. 'Should' gives advice or a recommendation rather than an order.",
      "For past ability, use 'could' for a general skill ('I could swim at five') but 'was able to' for a single achievement ('I was able to finish the paper on time'). 'I could finish the paper' sounds like a general possibility, not something that actually happened.",
    ],
    examples: [
      {
        wrong: "Governments must to invest more in public transport.",
        right: "Governments must invest more in public transport.",
        note: "A modal is followed by the bare verb. 'To' is never added.",
      },
      {
        wrong: "Higher taxes will solve the problem of traffic.",
        right: "Higher taxes may help to reduce traffic.",
        note: "'May help to reduce' is a claim the writer can support; 'will solve' overstates it.",
      },
      {
        wrong: "Students don't have to use their phones in the exam.",
        right: "Students mustn't use their phones in the exam.",
        note: "'Don't have to' means not necessary. Something forbidden needs 'mustn't'.",
      },
      {
        right: "Cars should be banned from the city centre, although some residents might disagree.",
        note: "'Should' gives the writer's recommendation; 'might' acknowledges a possible opposing view.",
      },
    ],
    ieltsNote:
      "In Task 2, the range of modals is a visible part of Grammatical Range and Accuracy, and hedging with may, might and could keeps an argument believable. In Speaking, using 'would', 'could' and 'might' to talk about possibilities and hypotheticals is a common way to show range in Parts 2 and 3.",
    practiceSlug: "modal-verbs-practice",
    tags: ["grammar", "verbs", "task2"],
  },
  {
    slug: "gerunds-and-infinitives",
    title: "Gerunds and infinitives",
    category: "Verbs",
    summary: "Enjoy doing, decide to do: which verbs take -ing, which take to, and why 'look forward to see' is wrong.",
    explanation: [
      "A gerund is the -ing form used as a noun (swimming, reducing); an infinitive is the base verb with 'to' (to swim, to reduce). Which one follows a verb depends on the first verb, and the choice is not always logical, so it is best learned in groups.",
      "Some verbs take the gerund: enjoy, avoid, suggest, consider, finish, keep, admit, deny, practise, mind. Others take the infinitive: decide, want, hope, plan, agree, refuse, manage, afford, promise, fail. So it is 'I enjoy walking' and 'I decided to walk', never the other way round.",
      "After a preposition, always use the gerund, because a preposition needs a noun form after it: 'interested in learning', 'instead of driving', 'by using'. This includes 'to' when it is part of a fixed phrase: 'look forward to seeing you', 'be used to working late', 'in addition to reducing costs'.",
      "A few verbs take both, with a change in meaning. 'Stop doing' means to end an activity ('he stopped smoking'), while 'stop to do' means to pause in order to do something ('he stopped to smoke'). 'Remember to lock the door' is a duty; 'remember locking the door' is a memory of having done it.",
      "To give a purpose, use 'to' plus the base verb: 'The tax was introduced to reduce traffic.' Use 'for' plus a gerund only to describe what something is used for: 'A calculator is used for solving equations.'",
    ],
    examples: [
      {
        wrong: "I look forward to see you next week.",
        right: "I look forward to seeing you next week.",
        note: "'To' is part of the phrase 'look forward to', so a gerund follows.",
      },
      {
        wrong: "Some experts suggest to introduce a congestion charge.",
        right: "Some experts suggest introducing a congestion charge.",
        note: "'Suggest' takes the gerund, never the infinitive.",
      },
      {
        wrong: "Many people are interested to learn a foreign language.",
        right: "Many people are interested in learning a foreign language.",
        note: "After the preposition 'in', use the gerund.",
      },
      {
        wrong: "The government plans introducing new laws.",
        right: "The government plans to introduce new laws.",
        note: "'Plan' takes the infinitive.",
      },
      {
        right: "A calculator is used for solving equations, and taxes are raised to fund public services.",
        note: "'For' plus a gerund describes what something is used for; 'to' plus the base verb gives a purpose.",
      },
    ],
    ieltsNote:
      "Wrong verb patterns, such as 'suggest to do' or 'interested to learn', are among the most frequent errors in Task 2 and in Speaking, and they count against Grammatical Range and Accuracy every time they appear. Learning the verb groups, and always using a gerund after a preposition, removes most of them.",
    practiceSlug: "gerunds-and-infinitives-practice",
    tags: ["grammar", "verbs", "task2"],
  },
  {
    slug: "reported-speech",
    title: "Reported speech",
    category: "Verbs",
    summary: "Say, tell and ask: how the tense, pronouns and word order change when you report what someone said.",
    explanation: [
      "Reported speech tells us what someone said without using their exact words. When the reporting verb is in the past ('she said', 'he told me'), the tense usually moves one step back: present simple becomes past simple, present perfect becomes past perfect, 'will' becomes 'would' and 'can' becomes 'could'. 'I am tired' becomes 'she said she was tired'.",
      "Pronouns and time words change to fit the new point of view. 'I' becomes 'he' or 'she'; 'today' becomes 'that day', 'tomorrow' becomes 'the next day', 'now' becomes 'then' and 'here' becomes 'there'. Say the sentence from the listener's position, not the speaker's.",
      "'Say' and 'tell' are used differently. 'Tell' needs a person straight after it: 'he told me that...'. 'Say' does not: 'he said that...' and never 'he said me'. If you want a person after 'say', use 'to': 'he said to me'.",
      "Questions lose their question word order in reported speech. There is no inversion and no 'do': 'Where do you live?' becomes 'She asked where I lived', not 'She asked where did I live'. Yes/no questions take 'if' or 'whether': 'She asked if I liked the job.'",
      "You do not need to move the tense back when the reporting verb is in the present ('she says she is tired') or when the statement is still true ('the guide told us that the museum closes at five'). Instructions use 'to': 'He told me to sit down.'",
    ],
    examples: [
      {
        wrong: "She said me that she was busy.",
        right: "She told me that she was busy.",
        note: "'Tell' takes a person directly. 'Say' does not, so 'said me' is wrong.",
      },
      {
        wrong: "He asked me where did I work.",
        right: "He asked me where I worked.",
        note: "Reported questions use statement word order, with no 'did' and no inversion.",
      },
      {
        wrong: "The manager said that he will call tomorrow.",
        right: "The manager said that he would call the next day.",
        note: "Move 'will' back to 'would', and change 'tomorrow' to 'the next day' for a past report.",
      },
      {
        wrong: "The teacher told to us to open our books.",
        right: "The teacher told us to open our books.",
        note: "After 'tell' the person comes directly, with no 'to' before it.",
      },
      {
        right: "The report states that unemployment has fallen, and the minister claimed that the figures were reliable.",
        note: "Present-tense reporting needs no backshift; a past reporting verb moves 'were' one step back.",
      },
    ],
    ieltsNote:
      "Reporting is useful in every part of the test. In Speaking Part 2, it lets you retell a conversation ('my teacher told me to...'), and in Task 2 it helps you refer to views without claiming them ('some experts claim that...'). Errors such as 'said me' and 'asked where did I' are very common and are noticed straight away.",
    practiceSlug: "reported-speech-practice",
    tags: ["grammar", "verbs", "speaking"],
  },
  {
    slug: "future-forms",
    title: "Future forms",
    category: "Tenses",
    summary: "Will, going to, the present continuous and the present simple: choosing the right way to talk about the future.",
    explanation: [
      "English has no single future tense. The form you choose shows how you think about the future: a decision, a plan, an arrangement, a timetable or a prediction.",
      "Use 'will' for decisions made at the moment of speaking ('I'll help you with that'), for promises and offers, and for predictions based on opinion rather than evidence ('I think prices will rise'). Use 'going to' for plans made before speaking ('I'm going to study medicine') and for predictions based on evidence you can see now ('Look at those clouds. It's going to rain').",
      "Use the present continuous for fixed arrangements, especially with a time and a person involved: 'I'm meeting my tutor at three.' Use the present simple for timetables and schedules: 'The exam starts at nine tomorrow.'",
      "After time words such as when, before, after, as soon as, until and if, use the present simple, not 'will', even though the meaning is future: 'I'll call you when I arrive', not 'when I will arrive'. This is one of the most common future-tense errors.",
      "Formal writing has its own future language. 'Is expected to', 'is projected to' and 'is likely to' introduce forecasts more carefully than 'will', and they are exactly what you need for a Task 1 graph that ends in the future.",
    ],
    examples: [
      {
        wrong: "When I will finish my degree, I will look for a job.",
        right: "When I finish my degree, I will look for a job.",
        note: "After 'when', use the present simple even for the future.",
      },
      {
        wrong: "I will visit my grandparents next weekend; we already bought the tickets.",
        right: "I'm visiting my grandparents next weekend; we've already bought the tickets.",
        note: "A fixed arrangement with tickets already bought takes the present continuous, or 'going to'.",
      },
      {
        wrong: "Look at the sky! It will rain.",
        right: "Look at the sky! It's going to rain.",
        note: "A prediction from present evidence takes 'going to'.",
      },
      {
        wrong: "If the government will raise taxes, people will spend less.",
        right: "If the government raises taxes, people will spend less.",
        note: "Conditional clauses with 'if' take the present simple, not 'will'.",
      },
      {
        right: "The population is projected to reach ten million by 2050.",
        note: "'Is projected to' is a formal, careful way to report a forecast in Task 1.",
      },
    ],
    ieltsNote:
      "Future forms matter in all four parts of the test. In Task 1, graphs with projections need 'is expected to' or 'is projected to', and in Task 2, predictions are safer with 'is likely to' or 'may' than with 'will'. In Speaking Part 1 and Part 3, using 'going to' for plans and 'will' for predictions in the right places shows control, and 'when I will' is a mistake examiners notice.",
    practiceSlug: "future-forms-practice",
    tags: ["grammar", "tenses", "task1"],
  },
  {
    slug: "adjectives-and-adverbs",
    title: "Adjectives and adverbs",
    category: "Word forms",
    summary: "Good or well, real or really, rose sharply or sharp: choosing the right form, and the adverbs Task 1 runs on.",
    explanation: [
      "An adjective describes a noun ('a sharp rise', 'a reliable source'). An adverb describes a verb, an adjective or another adverb ('rose sharply', 'extremely reliable', 'very quickly'). Most adverbs are formed by adding -ly to the adjective: slow to slowly, careful to carefully.",
      "Some adverbs do not follow the pattern. The adverb of 'good' is 'well', not 'goodly'. 'Fast', 'hard' and 'late' are both adjectives and adverbs. Be careful with 'hardly' and 'lately', which are different words: 'hardly' means 'almost not' ('I could hardly hear'), and 'lately' means 'recently'.",
      "After linking verbs such as be, seem, look, feel, become and sound, use an adjective, not an adverb, because you are describing the subject, not the action: 'the results seem clear', 'I feel bad'. Compare 'she plays well' where the adverb describes how she plays.",
      "To modify an adjective, use an adverb: 'a really important decision' or 'a highly effective policy'. Do not use an adjective in this position: 'a real important decision' is a common error. Some adjectives cannot be modified by 'very', such as 'unique', 'perfect' and 'essential'.",
      "When several adjectives come before a noun, they usually follow a fixed order: opinion, size, age, shape, colour, origin, material, purpose. That is why we say 'a beautiful old wooden table' and not 'a wooden old beautiful table'.",
    ],
    examples: [
      {
        wrong: "The number of students increased sharp between 2010 and 2015.",
        right: "The number of students increased sharply between 2010 and 2015.",
        note: "'Increased' is a verb, so it needs an adverb: 'sharply'.",
      },
      {
        wrong: "She speaks English very good.",
        right: "She speaks English very well.",
        note: "The adverb of 'good' is 'well'.",
      },
      {
        wrong: "The proposal seems reasonably.",
        right: "The proposal seems reasonable.",
        note: "After a linking verb such as 'seem', use an adjective.",
      },
      {
        wrong: "It is a real important issue for our generation.",
        right: "It is a really important issue for our generation.",
        note: "An adjective ('important') is modified by an adverb ('really'), not by another adjective.",
      },
      {
        right: "Sales rose steadily, then fell dramatically after 2018.",
        note: "Two adverbs of change, each modifying a verb, give a Task 1 sentence precision.",
      },
    ],
    ieltsNote:
      "Task 1 depends on adverbs that describe change: sharply, gradually, steadily, slightly, dramatically. Using the adjective by mistake ('rose sharp') is one of the most visible accuracy errors in the whole test. In Task 2 and Speaking, adverbs such as 'highly', 'increasingly' and 'particularly' add range, so long as they are formed and placed correctly.",
    practiceSlug: "adjectives-and-adverbs-practice",
    tags: ["grammar", "word-forms", "task1"],
  },
];

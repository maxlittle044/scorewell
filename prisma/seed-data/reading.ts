import type { QuestionGroup } from "../../lib/exam/schema";

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  /** IELTS sub-skill this question tests, for mistake analytics. */
  type?: string;
};

export type ReadingSeed = {
  slug: string;
  title: string;
  sourceTestSet: string;
  topic: string;
  tags: string[];
  /**
   * `groups` is the v2 shape supporting real IELTS question types; `questions` is the
   * legacy flat multiple-choice shape. Both parse — tests are being migrated to `groups`
   * one at a time, so mixed content is expected and fine.
   */
  data: {
    passage: string;
    durationMinutes?: number;
    questions?: QuizQuestion[];
    groups?: QuestionGroup[];
  };
};

export const READING_TESTS: ReadingSeed[] = [
  {
    slug: "academic-test-1",
    title: "Academic Reading Test 1",
    sourceTestSet: "Academic",
    topic: "Environment",
    tags: ["academic", "environment", "matching-headings", "true-false-not-given", "sentence-completion"],
    data: {
      passage: `The Rise of Urban Beekeeping

Over the past decade, cities from Toronto to Tokyo have seen a quiet but steady increase in the number of beehives kept on rooftops, balconies, and in community gardens. Much of this growth has been driven by growing public concern over declining bee populations, which pollinate roughly a third of the food crops humans rely on. Urban beekeeping associations report that membership has tripled in many major cities since 2015, with hobbyists citing both environmental motivation and a simple curiosity about where honey actually comes from.

Cities present a surprisingly favorable environment for bees. Urban gardens, parks, and even roadside verges offer a longer and more varied flowering season than the monoculture farmland common in rural areas, where a single crop may bloom for only a few weeks. As a result, some studies have found urban hives producing more honey per colony than their rural counterparts.

Urban beekeepers do, however, face distinct challenges. Space is limited, and local regulations vary widely — some cities require hives to be registered, while others restrict how close a hive can be to a property line. Beekeepers must also manage public perception carefully; a single reported sting near a hive can prompt neighbors to demand its removal, regardless of the actual risk involved.`,
      durationMinutes: 20,
      groups: [
        {
          id: "g1",
          instructions:
            "The passage has three paragraphs, A–C. Choose the correct heading for each paragraph from the list below. There are more headings than paragraphs.",
          bank: [
            { key: "i", label: "Obstacles facing city beekeepers" },
            { key: "ii", label: "Why cities suit bees better than expected" },
            { key: "iii", label: "A proposed ban on rural hives" },
            { key: "iv", label: "What is driving the growth in urban hives" },
            { key: "v", label: "The falling price of imported honey" },
          ],
          questions: [
            {
              kind: "matching",
              id: "q1",
              type: "Main idea",
              prompt: "Paragraph A",
              answer: "iv",
              evidence: {
                quote:
                  "Much of this growth has been driven by growing public concern over declining bee populations, which pollinate roughly a third of the food crops humans rely on.",
                explanation:
                  "The paragraph is about causes of the increase — concern over bee decline and curiosity about honey. It never mentions obstacles or prices, so only heading iv covers the whole paragraph.",
              },
            },
            {
              kind: "matching",
              id: "q2",
              type: "Main idea",
              prompt: "Paragraph B",
              answer: "ii",
              evidence: {
                quote: "Cities present a surprisingly favorable environment for bees.",
                explanation:
                  "This is the topic sentence, and the rest of the paragraph explains why: a longer, more varied flowering season than monoculture farmland. 'Surprisingly' matches 'better than expected' in the heading.",
              },
            },
            {
              kind: "matching",
              id: "q3",
              type: "Main idea",
              prompt: "Paragraph C",
              answer: "i",
              evidence: {
                quote: "Urban beekeepers do, however, face distinct challenges.",
                explanation:
                  "'However' signals the shift from advantages to problems — limited space, varying regulations, and public perception. That is heading i.",
              },
            },
          ],
        },
        {
          id: "g2",
          instructions:
            "Do the following statements agree with the information given in the passage? Write TRUE if the statement agrees, FALSE if it contradicts, or NOT GIVEN if there is no information about it.",
          questions: [
            {
              kind: "true-false-not-given",
              id: "q4",
              type: "Numbers & data",
              statement:
                "Membership of urban beekeeping associations has tripled in many major cities since 2015.",
              answer: "TRUE",
              evidence: {
                quote:
                  "Urban beekeeping associations report that membership has tripled in many major cities since 2015, with hobbyists citing both environmental motivation and a simple curiosity about where honey actually comes from.",
                explanation:
                  "The passage states this directly, including the same figure and the same year, so it is TRUE rather than NOT GIVEN.",
              },
            },
            {
              kind: "true-false-not-given",
              id: "q5",
              type: "Specific detail",
              statement: "Every city requires beehives to be registered.",
              answer: "FALSE",
              evidence: {
                quote:
                  "Space is limited, and local regulations vary widely — some cities require hives to be registered, while others restrict how close a hive can be to a property line.",
                explanation:
                  "'Some cities' directly contradicts 'every city'. A statement that conflicts with the passage is FALSE, not NOT GIVEN — the information is there, it just disagrees.",
              },
            },
            {
              kind: "true-false-not-given",
              id: "q6",
              type: "Opinion & attitude",
              statement: "Urban honey sells for a higher price than rural honey.",
              answer: "NOT GIVEN",
              evidence: {
                explanation:
                  "The passage compares urban and rural hives on honey *quantity* per colony, but never mentions price for either. With nothing in the text to agree or disagree with, the answer is NOT GIVEN — a common trap is picking FALSE because the claim feels unsupported.",
              },
            },
          ],
        },
        {
          id: "g3",
          instructions:
            "Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
          wordLimit: 2,
          questions: [
            {
              kind: "completion",
              id: "q7",
              type: "Numbers & data",
              prompt: "Bees pollinate roughly a third of the ________ that humans rely on.",
              accept: ["food crops", "crops"],
              evidence: {
                quote:
                  "Much of this growth has been driven by growing public concern over declining bee populations, which pollinate roughly a third of the food crops humans rely on.",
                explanation:
                  "The sentence in the passage uses the same wording, so 'food crops' lifts directly from the text and fits the two-word limit.",
              },
            },
            {
              kind: "completion",
              id: "q8",
              type: "Specific detail",
              prompt: "On rural monoculture farmland, one crop may flower for only a few ________.",
              accept: ["weeks"],
              evidence: {
                quote:
                  "Urban gardens, parks, and even roadside verges offer a longer and more varied flowering season than the monoculture farmland common in rural areas, where a single crop may bloom for only a few weeks.",
                explanation:
                  "'Bloom' in the passage is paraphrased as 'flower' in the question — the answer word itself, 'weeks', is unchanged.",
              },
            },
          ],
        },
        {
          id: "g4",
          instructions: "Answer the following questions about the passage.",
          questions: [
            {
              kind: "multiple-choice",
              id: "q9",
              type: "Cause & reason",
              question: "Why do some urban hives produce more honey than rural ones?",
              options: [
                "Cities have fewer pests and diseases",
                "Urban beekeepers manage their hives more skilfully",
                "Cities offer a longer and more varied flowering season",
                "Rural farmland has no flowering plants at all",
              ],
              correctIndex: 2,
              distractorNotes: {
                "0": "Pests are never mentioned in the passage — this is outside information.",
                "1": "The passage compares environments, not beekeepers' skill levels.",
                "3": "Too extreme. Rural monoculture blooms briefly; it does not lack flowers entirely.",
              },
              evidence: {
                quote:
                  "As a result, some studies have found urban hives producing more honey per colony than their rural counterparts.",
                explanation:
                  "'As a result' points back to the previous sentence's cause: the longer, more varied urban flowering season.",
              },
            },
            {
              kind: "multiple-select",
              id: "q10",
              type: "Specific detail",
              question: "Which TWO challenges for urban beekeepers are mentioned in the passage?",
              options: [
                "Limited space",
                "The high cost of hives",
                "Regulations that differ between cities",
                "A shortage of bees to buy",
                "Cold winter temperatures",
              ],
              correctIndexes: [0, 2],
              distractorNotes: {
                "1": "Cost is not raised anywhere in the passage.",
                "3": "Availability of bees is never discussed.",
                "4": "Climate is not mentioned as a challenge.",
              },
              evidence: {
                quote:
                  "Space is limited, and local regulations vary widely — some cities require hives to be registered, while others restrict how close a hive can be to a property line.",
                explanation:
                  "Both correct answers come from this one sentence. Public perception is a third challenge, but it is not among the options.",
              },
            },
          ],
        },
      ],
    },
  },
  {
    slug: "academic-test-2",
    title: "Academic Reading Test 2",
    sourceTestSet: "Academic",
    topic: "Technology",
    tags: ["academic", "technology", "agriculture", "multiple-choice"],
    data: {
      passage: `The Rise of Vertical Farming

As global food demand climbs and arable land grows scarcer, a growing number of agricultural technologists have turned their attention upward — quite literally — to vertical farming. Unlike traditional agriculture, which spreads crops horizontally across open fields, vertical farms stack growing trays in tall, climate-controlled buildings, often located within or near the cities they supply. Proponents argue that this approach could dramatically reduce the distance food travels from farm to table, cutting both transport costs and the emissions associated with them.

The technology behind vertical farming has advanced considerably in the last fifteen years. Early prototypes relied heavily on artificial lighting and were prohibitively expensive to run, but improvements in LED efficiency have lowered energy costs substantially. Many facilities now also use hydroponic or aeroponic systems, which deliver nutrients directly to plant roots without soil, using a fraction of the water required by conventional farming.

Despite these advances, vertical farming remains limited in what it can produce economically. Leafy greens and herbs, which grow quickly and command relatively high prices, dominate current output. Staple crops such as wheat and rice, which require far more space and yield lower profit per square metre, are not yet commercially viable to grow this way. Critics also point out that constructing and operating a vertical farm demands significant upfront capital, meaning the model currently suits well-funded urban markets more than regions where food security is most urgent.`,
      questions: [
        {
          id: "q1",
          type: "Main idea",
          question: "How does vertical farming primarily differ from traditional agriculture?",
          options: [
            "It uses no water at all",
            "It stacks crops vertically in climate-controlled buildings rather than spreading them across fields",
            "It only grows crops outdoors",
            "It requires more arable land",
          ],
          correctIndex: 1,
        },
        {
          id: "q2",
          type: "Cause & reason",
          question: "What made early vertical farming prototypes expensive to run?",
          options: [
            "The cost of transporting produce",
            "High costs of artificial lighting",
            "A shortage of hydroponic systems",
            "Import taxes on leafy greens",
          ],
          correctIndex: 1,
        },
        {
          id: "q3",
          type: "Cause & reason",
          question: "Why are staple crops like wheat not commercially grown in vertical farms yet?",
          options: [
            "They cannot grow without soil",
            "They require too much space and yield low profit per square metre",
            "They are banned in urban areas",
            "They grow too quickly for vertical systems",
          ],
          correctIndex: 1,
        },
        {
          id: "q4",
          type: "Opinion & attitude",
          question: "What criticism do some people have about vertical farming?",
          options: [
            "It uses too much land",
            "It pollutes water supplies",
            "High upfront costs mean it suits wealthy urban markets more than areas with urgent food needs",
            "It cannot be located near cities",
          ],
          correctIndex: 2,
        },
      ],
    },
  },
  {
    slug: "academic-test-3",
    title: "Academic Reading Test 3",
    sourceTestSet: "Academic",
    topic: "History",
    tags: ["academic", "history", "archaeology", "multiple-choice"],
    data: {
      passage: `What Shipwrecks Tell Us About Ancient Trade

For historians of the ancient Mediterranean, few sources are as informative as a sunken ship. Unlike settlements, which were occupied, rebuilt and looted over centuries, a wreck captures a single moment: a vessel, its cargo, and its crew's possessions, sealed on the seabed at the instant of disaster. Archaeologists sometimes describe such sites as "time capsules", though the term understates how much interpretive work is required to read them.

The Uluburun wreck, discovered off the southern coast of Turkey in 1982, illustrates the point well. Dated to the late fourteenth century BCE, it carried copper and tin ingots in roughly the ten-to-one ratio needed to produce bronze, alongside glass, ivory, ebony and resin. What made the find remarkable was not any single item but their combined origins: the cargo drew on materials from at least seven distinct regions, from the Baltic to sub-Saharan Africa. A single ship, in other words, was moving goods across a trading network far broader than most historians had previously credited to the period.

Interpretation nonetheless demands caution. A wreck records what was being carried on one voyage, not what was typical. A cargo of luxury goods may represent a royal gift rather than ordinary commerce, and ships carrying cheap bulk staples — grain, or salted fish in perishable containers — leave far less for archaeologists to recover. The archaeological record is therefore biased toward the durable and the valuable, and historians who forget this risk mistaking the exceptional for the everyday.`,
      questions: [
        {
          id: "q1",
          type: "Cause & reason",
          question: "Why does the passage suggest shipwrecks are especially useful to historians?",
          options: [
            "They are easier to reach than land sites",
            "They preserve a single moment, unlike settlements altered over centuries",
            "They always contain written records",
            "They are usually undamaged by seawater",
          ],
          correctIndex: 1,
        },
        {
          id: "q2",
          type: "Specific detail",
          question: "What made the Uluburun cargo remarkable?",
          options: [
            "It contained the largest quantity of gold ever found",
            "Its materials came from at least seven distinct regions",
            "It was the oldest wreck ever discovered",
            "It carried no metal at all",
          ],
          correctIndex: 1,
        },
        {
          id: "q3",
          type: "Cause & reason",
          question:
            "Why does the passage say the archaeological record is biased?",
          options: [
            "Archaeologists only study wealthy societies",
            "Durable and valuable goods survive better than cheap perishable ones",
            "Governments restrict which wrecks may be excavated",
            "Most wrecks have already been looted",
          ],
          correctIndex: 1,
        },
        {
          id: "q4",
          type: "Inference",
          question:
            "What does the writer imply by saying the term \"time capsule\" understates the work involved?",
          options: [
            "Wrecks are actually easy to interpret",
            "The phrase is entirely inaccurate",
            "Reading a wreck requires substantial interpretation, not just recovery",
            "Time capsules are a modern invention",
          ],
          correctIndex: 2,
        },
      ],
    },
  },
  {
    slug: "academic-test-4",
    title: "Academic Reading Test 4",
    sourceTestSet: "Academic",
    topic: "Health",
    tags: ["academic", "health", "science", "multiple-choice"],
    data: {
      passage: `Rethinking the Eight-Hour Sleep

The assumption that humans should sleep eight uninterrupted hours is so widespread that waking in the night is often treated as a disorder. Historical evidence suggests the assumption may be more recent, and more cultural, than it appears. Examining diaries, court records and medical texts from pre-industrial Europe, the historian A. Roger Ekirch documented hundreds of references to "first sleep" and "second sleep" — two distinct blocks separated by an hour or more of wakefulness, during which people prayed, talked, tended fires or simply lay still.

Laboratory work has offered a degree of support. When volunteers were placed in conditions mimicking long winter nights, with fourteen hours of darkness and no artificial light, many gradually settled into a segmented pattern resembling the historical accounts. Researchers proposed that consolidated sleep may be partly a product of artificial lighting and industrial schedules rather than a fixed biological requirement.

The findings should not be overstated. The laboratory conditions were artificial in their own way, involving far more darkness than most people now experience, and the sample sizes were small. Nor does the historical record show segmented sleep everywhere; the evidence is strongest for northern latitudes with long winters. What the research does suggest is more modest but still useful: that brief night waking is not automatically pathological, and that treating it as such may cause more anxiety than the waking itself.`,
      questions: [
        {
          id: "q1",
          type: "Specific detail",
          question: "What did Ekirch find in pre-industrial European sources?",
          options: [
            "That people slept far longer than they do today",
            "References to two distinct sleep blocks separated by wakefulness",
            "That nobody slept during winter",
            "That sleep was rarely mentioned at all",
          ],
          correctIndex: 1,
        },
        {
          id: "q2",
          type: "Specific detail",
          question: "What happened to volunteers in the laboratory study?",
          options: [
            "They slept continuously for fourteen hours",
            "They were unable to sleep at all",
            "Many gradually settled into a segmented sleep pattern",
            "They reported worse health outcomes",
          ],
          correctIndex: 2,
        },
        {
          id: "q3",
          type: "Opinion & attitude",
          question: "Which limitation of the research does the passage mention?",
          options: [
            "The volunteers were all elderly",
            "Small sample sizes and artificial conditions",
            "The study was never published",
            "Historical records were forged",
          ],
          correctIndex: 1,
        },
        {
          id: "q4",
          type: "Main idea",
          question: "What modest conclusion does the passage draw?",
          options: [
            "Everyone should sleep in two blocks",
            "Artificial light should be banned",
            "Brief night waking is not automatically a disorder",
            "Eight hours of sleep is always insufficient",
          ],
          correctIndex: 2,
        },
      ],
    },
  },
  {
    slug: "gt-test-1",
    title: "General Training Reading Test 1",
    sourceTestSet: "General Training",
    topic: "Everyday life",
    tags: ["general-training", "notices", "everyday-life", "multiple-choice"],
    data: {
      passage: `NOTICE TO ALL RESIDENTS — Greenfield Apartments

Recycling Collection Changes, Effective 1 October

Following feedback from residents, the building management has updated the recycling collection schedule. Please read the changes below carefully.

Collection days: Recycling will now be collected every Tuesday and Friday, instead of the previous Monday-only schedule. General waste collection remains unchanged (Wednesday and Saturday).

Bin locations: Recycling bins have been relocated from the basement car park to the ground-floor bin room, next to the main lobby, for easier access. Please use the correct bin for each material — separate bins are provided for paper/cardboard, glass, and plastics/metals.

What can be recycled: Clean paper, cardboard, glass bottles and jars, plastic bottles and containers (rinsed), and aluminium cans. Please flatten cardboard boxes before placing them in the bin to save space.

What cannot be recycled: Food waste, soiled paper products, plastic bags, and polystyrene should be placed in general waste, not the recycling bins. Items placed in the wrong bin may result in the entire bin being rejected by the collection service.

Residents with questions about these changes, or who require a larger recycling bin for their unit, should contact the building office at least 48 hours before the next scheduled collection.`,
      questions: [
        {
          id: "q1",
          type: "Specific detail",
          question: "What has changed about the recycling collection schedule?",
          options: [
            "It has been reduced to once a month",
            "It now happens on Tuesday and Friday instead of Monday only",
            "It has been cancelled",
            "It now only covers glass",
          ],
          correctIndex: 1,
        },
        {
          id: "q2",
          type: "Specific detail",
          question: "Where are the recycling bins now located?",
          options: [
            "In the basement car park",
            "On each individual floor",
            "In the ground-floor bin room next to the main lobby",
            "Outside the building entrance",
          ],
          correctIndex: 2,
        },
        {
          id: "q3",
          type: "Instructions & procedure",
          question: "What should residents do with cardboard boxes before recycling them?",
          options: ["Rinse them", "Flatten them", "Tie them together", "Label them"],
          correctIndex: 1,
        },
        {
          id: "q4",
          type: "Instructions & procedure",
          question: "What should a resident do if they need a larger recycling bin?",
          options: [
            "Take an extra bin from another floor",
            "Contact the building office at least 48 hours before the next collection",
            "Leave a note on the current bin",
            "Wait until the next scheduled inspection",
          ],
          correctIndex: 1,
        },
      ],
    },
  },
  {
    slug: "gt-test-2",
    title: "General Training Reading Test 2",
    sourceTestSet: "General Training",
    topic: "Work",
    tags: ["general-training", "workplace", "everyday-life", "multiple-choice"],
    data: {
      passage: `NEW STAFF HANDBOOK — Section 4: Flexible Working

Riverbank Logistics supports flexible working for all employees who have completed their six-month probation period. This section explains what is available and how to apply.

Options available: Staff may request compressed hours (working the standard weekly hours across four days instead of five), staggered start times (beginning between 07:00 and 10:00), or hybrid working (up to three days per week from home). Warehouse and driving staff are eligible for staggered start times only, as their roles require on-site presence.

How to apply: Submit a flexible working request form to your line manager, not to Human Resources. Your manager must respond in writing within fourteen calendar days. If your request is refused, the written response must state the business reason for the refusal, and you may ask for the decision to be reviewed by a department head.

Trial periods: Most approved arrangements begin with a three-month trial. At the end of the trial, you and your manager will review whether the arrangement is working. If it is not, you will return to your previous pattern — this is not a disciplinary matter and is not recorded on your file.

Please note: A flexible working arrangement changes your working pattern permanently once the trial ends. It does not reduce your contracted hours or salary unless you separately agree a part-time contract with Human Resources.`,
      questions: [
        {
          id: "q1",
          type: "Specific detail",
          question: "Who is eligible to request flexible working?",
          options: [
            "All employees from their first day",
            "Employees who have completed a six-month probation period",
            "Only office-based staff",
            "Only staff who work part-time",
          ],
          correctIndex: 1,
        },
        {
          id: "q2",
          type: "Specific detail",
          question: "Which option is available to warehouse and driving staff?",
          options: [
            "Hybrid working only",
            "Compressed hours only",
            "Staggered start times only",
            "All three options",
          ],
          correctIndex: 2,
        },
        {
          id: "q3",
          type: "Instructions & procedure",
          question: "Where should a flexible working request be submitted?",
          options: [
            "To Human Resources",
            "To your line manager",
            "To a department head",
            "To the company director",
          ],
          correctIndex: 1,
        },
        {
          id: "q4",
          type: "Instructions & procedure",
          question: "What happens if a trial arrangement does not work out?",
          options: [
            "The employee receives a formal warning",
            "The employee returns to their previous pattern, with no disciplinary record",
            "The employee must leave the company",
            "The arrangement continues regardless",
          ],
          correctIndex: 1,
        },
      ],
    },
  },
];

import type { ChartData } from "@/lib/content/writing";

export type WritingTaskType = "task1-academic" | "task1-general" | "task2";

export type WritingSeed = {
  slug: string;
  title: string;
  taskType: WritingTaskType;
  topic: string;
  tags: string[];
  /** Timed exam (PRACTICE_TEST) vs untimed practice (WRITING_EXERCISE). */
  kind: "test" | "exercise";
  data: {
    prompt: string;
    /** Extra rubric line shown above the editor, e.g. chart description. */
    instructions: string;
    minWords: number;
    minutes: number;
    /** The chart/graph/table a Task 1 Academic prompt refers to. */
    chart?: ChartData;
  };
};

export const WRITING_ITEMS: WritingSeed[] = [
  // ---- Timed writing tests (/ielts/writing/[slug]) ----
  {
    slug: "task1-renewable-energy-bar-chart",
    title: "Task 1: Renewable energy bar chart",
    taskType: "task1-academic",
    topic: "Environment",
    tags: ["writing", "task-1-academic", "environment", "bar-chart"],
    kind: "test",
    data: {
      prompt:
        "The bar chart below shows the percentage of electricity generated from renewable sources in four countries in 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "bar",
        unit: "%",
        categories: ["Norway", "Germany", "Brazil", "United States"],
        series: [
          { label: "2010", values: [58, 17, 41, 10] },
          { label: "2020", values: [72, 44, 63, 20] },
        ],
      },
    },
  },
  {
    slug: "task1-letter-refund-request",
    title: "Task 1: Letter requesting a refund",
    taskType: "task1-general",
    topic: "Consumer",
    tags: ["writing", "task-1-general", "letters", "consumer"],
    kind: "test",
    data: {
      prompt:
        "You recently bought a piece of equipment online, but it stopped working within a week. Write a letter to the company. In your letter: explain what you bought and when, describe the problem, and say what you would like the company to do.",
      instructions:
        "Begin your letter 'Dear Sir or Madam,'. Keep the tone formal, and make sure all three bullet points are covered.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "task2-free-university-education",
    title: "Task 2: Should university education be free?",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some people believe that university education should be free for all students, while others argue that students should pay their own tuition fees. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-ai-job-market",
    title: "Task 2: AI and the job market",
    taskType: "task2",
    topic: "Technology",
    tags: ["writing", "task-2", "technology", "work", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Artificial intelligence is increasingly able to perform tasks that were previously done by people. Some think this will create widespread unemployment, while others believe it will create new kinds of work. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },

  // ---- Untimed writing exercises (/writing-exercises/[slug]) ----
  {
    slug: "technology-made-life-complicated",
    title: "Has technology made life more complicated?",
    taskType: "task2",
    topic: "Technology",
    tags: ["writing", "task-2", "technology", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people say that technology has made life more complicated rather than simpler. To what extent do you agree or disagree?",
      instructions:
        "No timer here — take as long as you need. Aim for a clear position stated in the introduction and held throughout.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "internet-usage-by-age-bar-chart",
    title: "Bar chart: internet usage by age group",
    taskType: "task1-academic",
    topic: "Technology",
    tags: ["writing", "task-1-academic", "technology", "bar-chart"],
    kind: "exercise",
    data: {
      prompt:
        "The bar chart below shows the average number of hours per week spent online by four age groups in 2015 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Remember to include an overview paragraph identifying the main trends before you report specific figures.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "bar",
        unit: "hours per week",
        categories: ["13–17", "18–34", "35–54", "55+"],
        series: [
          { label: "2015", values: [22, 19, 11, 4] },
          { label: "2025", values: [31, 27, 18, 9] },
        ],
      },
    },
  },
  {
    slug: "letter-to-landlord-repair-issue",
    title: "Letter to a landlord about a repair issue",
    taskType: "task1-general",
    topic: "Housing",
    tags: ["writing", "task-1-general", "letters", "housing"],
    kind: "exercise",
    data: {
      prompt:
        "The heating in your rented flat has not worked for two weeks. Write a letter to your landlord. In your letter: explain the problem and how it is affecting you, describe what you have already done about it, and say what you want the landlord to do and by when.",
      instructions:
        "Choose your register carefully — a landlord you have an ongoing relationship with usually calls for semi-formal rather than strictly formal language.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "university-education-free",
    title: "Should university education be free?",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people believe that university education should be funded entirely by the government, while others think students should contribute to the cost. Discuss both views and give your own opinion.",
      instructions:
        "Make sure you genuinely discuss both views before giving your opinion — a common way to lose marks here is to argue only one side.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "coffee-consumption-line-graph",
    title: "Line graph: coffee consumption over time",
    taskType: "task1-academic",
    topic: "Food & drink",
    tags: ["writing", "task-1-academic", "line-graph", "food-drink"],
    kind: "exercise",
    data: {
      prompt:
        "The line graph below shows annual coffee consumption per person in three countries between 1990 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Use a range of language for describing change — avoid repeating 'increased' and 'decreased' throughout.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "line",
        unit: "kg per person",
        xLabels: ["1990", "2000", "2010", "2020"],
        series: [
          { label: "Finland", values: [11.5, 11.9, 12.2, 12.0] },
          { label: "Italy", values: [4.8, 5.4, 5.8, 6.1] },
          { label: "United States", values: [4.0, 4.2, 4.5, 4.7] },
        ],
      },
    },
  },

  // ---- More Task 1 General letters (was thin at 2 items across a formal/semi-formal/
  // informal range the real exam covers) ----
  {
    slug: "letter-inviting-friend-farewell-party",
    title: "Letter inviting a friend to a farewell gathering",
    taskType: "task1-general",
    topic: "Friends and family",
    tags: ["writing", "task-1-general", "letters", "informal"],
    kind: "test",
    data: {
      prompt:
        "A close friend of yours is moving to another city. Write a letter to invite them to a small farewell gathering before they leave. In your letter: say when and where the gathering will be, explain who else will be there, and tell them what you are looking forward to about the evening.",
      instructions:
        "This is an informal letter to a close friend — a warm, conversational tone is appropriate. Begin 'Dear [Name],'.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-applying-part-time-job",
    title: "Letter applying for a part-time job",
    taskType: "task1-general",
    topic: "Work",
    tags: ["writing", "task-1-general", "letters", "formal"],
    kind: "test",
    data: {
      prompt:
        "You saw an advertisement for a part-time position at your local library. Write a letter to apply for the job. In your letter: explain which position you are applying for and where you saw it advertised, describe your relevant skills or experience, and say when you would be available for an interview.",
      instructions:
        "Begin your letter 'Dear Sir or Madam,'. Keep the tone formal throughout, since you do not know the reader personally.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-cancelling-gym-membership",
    title: "Letter cancelling a gym membership",
    taskType: "task1-general",
    topic: "Consumer",
    tags: ["writing", "task-1-general", "letters", "semi-formal"],
    kind: "exercise",
    data: {
      prompt:
        "You need to cancel your membership at a gym because you are relocating to another city. Write a letter to the gym manager. In your letter: explain why you are cancelling, ask about the cancellation process and any fees involved, and request confirmation once it is processed.",
      instructions:
        "A semi-formal register suits this best — you have an ongoing relationship with the gym, but it is still a business matter.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-complaint-delayed-delivery",
    title: "Letter of complaint about a delayed delivery",
    taskType: "task1-general",
    topic: "Consumer",
    tags: ["writing", "task-1-general", "letters", "formal", "complaint"],
    kind: "test",
    data: {
      prompt:
        "You ordered an item online two weeks ago, and it still has not arrived. Write a letter to the company. In your letter: give details of your order, explain the problem, and say what you would like the company to do.",
      instructions:
        "Begin your letter 'Dear Sir or Madam,'. State the problem clearly and keep the tone firm but polite.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-advice-friend-moving-city",
    title: "Letter giving advice to a friend moving to your city",
    taskType: "task1-general",
    topic: "Friends and family",
    tags: ["writing", "task-1-general", "letters", "informal"],
    kind: "exercise",
    data: {
      prompt:
        "A friend of yours is planning to move to your city for a new job. Write a letter to them. In your letter: say how you feel about them moving nearby, give some advice about the area they might live in, and offer to help them settle in.",
      instructions:
        "Keep this informal and personal — write as you would to a genuine friend, not a stranger.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-requesting-assignment-extension",
    title: "Letter requesting a coursework extension",
    taskType: "task1-general",
    topic: "Education",
    tags: ["writing", "task-1-general", "letters", "formal"],
    kind: "exercise",
    data: {
      prompt:
        "You are unable to submit a university assignment on time because you have been unwell. Write a letter to your course tutor. In your letter: explain your situation, apologise for the inconvenience, and request a short extension.",
      instructions:
        "Keep this formal and concise — a tutor reading many such requests will appreciate directness over a long explanation.",
      minWords: 150,
      minutes: 0,
    },
  },

  // ---- More Task 2 essays (fresh topics, avoiding overlap with existing prompts) ----
  {
    slug: "task2-social-media-relationships",
    title: "Task 2: Social media and relationships",
    taskType: "task2",
    topic: "Technology",
    tags: ["writing", "task-2", "technology", "society", "discussion"],
    kind: "test",
    data: {
      prompt:
        "Some people believe that social media has strengthened relationships between friends and family, while others believe it has weakened them. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-remote-work-benefits",
    title: "Task 2: The benefits and drawbacks of remote work",
    taskType: "task2",
    topic: "Work",
    tags: ["writing", "task-2", "work", "discussion"],
    kind: "test",
    data: {
      prompt:
        "Some people think that working from home benefits both employees and employers, while others believe it creates more problems than it solves. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-public-transport-investment",
    title: "Task 2: Should governments prioritise public transport over roads?",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Governments should invest more in public transport systems rather than building new roads for private cars. To what extent do you agree or disagree?",
      instructions:
        "Take a clear position and support it throughout — this is an opinion essay, not a discussion of both sides.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-environmental-responsibility",
    title: "Task 2: Who is responsible for protecting the environment?",
    taskType: "task2",
    topic: "Environment",
    tags: ["writing", "task-2", "environment", "discussion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people believe that individuals are primarily responsible for protecting the environment, while others think this responsibility belongs mainly to governments and large corporations. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },

  // ---- Still more Task 1 General letters (was at 8 against Academic's 13 reports;
  // rounds registers out to a formal/semi-formal/informal split matching real GT papers) ----
  {
    slug: "letter-complaint-noisy-business",
    title: "Letter of complaint about noise from a neighbouring business",
    taskType: "task1-general",
    topic: "Community",
    tags: ["writing", "task-1-general", "letters", "formal", "complaint"],
    kind: "test",
    data: {
      prompt:
        "A new business has opened near your home and its noise is disturbing you, especially in the evenings. Write a letter to the local council. In your letter: describe the problem and when it happens, explain how it is affecting you, and say what action you would like the council to take.",
      instructions:
        "Begin your letter 'Dear Sir or Madam,'. State the problem factually and keep the tone firm but polite throughout.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-requesting-reference-former-manager",
    title: "Letter requesting a reference from a former manager",
    taskType: "task1-general",
    topic: "Work",
    tags: ["writing", "task-1-general", "letters", "semi-formal"],
    kind: "exercise",
    data: {
      prompt:
        "You are applying for a new job and need a reference from a previous employer. Write a letter to your former manager. In your letter: remind them of when and where you worked together, explain what the new job involves, and ask if they would be willing to write the reference.",
      instructions:
        "A semi-formal register suits this best — you know the reader, but it remains a professional request.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-request-switch-class-time",
    title: "Letter asking a course coordinator to switch a class time",
    taskType: "task1-general",
    topic: "Education",
    tags: ["writing", "task-1-general", "letters", "semi-formal"],
    kind: "test",
    data: {
      prompt:
        "You are enrolled in an evening course, but a new work schedule now clashes with your class time. Write a letter to the course coordinator. In your letter: explain the situation, ask whether you could move to a different class group, and say what times would suit you better.",
      instructions:
        "A semi-formal register suits this best — you have some ongoing contact with the coordinator, but it is still an institutional request.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-congratulating-family-new-job",
    title: "Letter congratulating a family member on a new job",
    taskType: "task1-general",
    topic: "Family",
    tags: ["writing", "task-1-general", "letters", "informal"],
    kind: "exercise",
    data: {
      prompt:
        "A member of your family has just started a new job. Write a letter to them. In your letter: congratulate them on the new job, ask how the first few days have gone, and offer to celebrate together soon.",
      instructions:
        "Keep this informal and warm — write as you would to someone you are close to.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-asking-friend-look-after-pet",
    title: "Letter asking a friend to look after your pet",
    taskType: "task1-general",
    topic: "Friends and family",
    tags: ["writing", "task-1-general", "letters", "informal"],
    kind: "test",
    data: {
      prompt:
        "You are going away for two weeks and need someone to look after your pet. Write a letter to a friend. In your letter: explain your travel plans, describe what looking after the pet would involve, and say why you thought of asking them.",
      instructions:
        "Keep this informal — a friendly, conversational tone is appropriate throughout.",
      minWords: 150,
      minutes: 0,
    },
  },

  // ---- More Task 2 essays (fresh topics: health, urban planning, government policy,
  // culture, crime, media, tourism, ageing population, space, advertising) ----
  {
    slug: "task2-sugar-tax-public-health",
    title: "Task 2: Should governments tax unhealthy food and drinks?",
    taskType: "task2",
    topic: "Health",
    tags: ["writing", "task-2", "health", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some governments have introduced taxes on sugary drinks and unhealthy food in order to improve public health. To what extent do you agree or disagree with this approach?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-limiting-building-height",
    title: "Task 2: Should cities limit the height of new buildings?",
    taskType: "task2",
    topic: "Urban planning",
    tags: ["writing", "task-2", "urban-planning", "discussion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people think cities should limit the height of new buildings, while others believe tall buildings are necessary to accommodate a growing population. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-compulsory-voting",
    title: "Task 2: The advantages and disadvantages of compulsory voting",
    taskType: "task2",
    topic: "Government",
    tags: ["writing", "task-2", "government", "advantages-disadvantages"],
    kind: "test",
    data: {
      prompt:
        "In some countries, citizens are legally required to vote in national elections. Discuss the advantages and disadvantages of compulsory voting.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-globalisation-culture",
    title: "Task 2: Has globalisation made cultures more similar?",
    taskType: "task2",
    topic: "Culture",
    tags: ["writing", "task-2", "culture", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Globalisation has made the world's cultures more similar to one another rather than more diverse. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-youth-crime-approaches",
    title: "Task 2: How should young offenders be dealt with?",
    taskType: "task2",
    topic: "Crime",
    tags: ["writing", "task-2", "crime", "discussion"],
    kind: "test",
    data: {
      prompt:
        "Some people believe that prison is the most effective way to deal with young offenders, while others think community service and rehabilitation programmes work better. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-fake-news-online",
    title: "Task 2: The problem of false information online",
    taskType: "task2",
    topic: "Media",
    tags: ["writing", "task-2", "media", "problem-solution"],
    kind: "exercise",
    data: {
      prompt:
        "The spread of false information online is a growing problem. What problems does this cause, and what solutions can you suggest?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-tourism-natural-sites",
    title: "Task 2: Protecting popular natural tourist sites",
    taskType: "task2",
    topic: "Tourism",
    tags: ["writing", "task-2", "tourism", "two-part"],
    kind: "test",
    data: {
      prompt:
        "Tourist numbers to popular natural sites have increased rapidly in recent years. Why has this happened, and what can be done to protect these sites from damage?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-elderly-care-responsibility",
    title: "Task 2: Who should care for elderly relatives?",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "ageing-population", "discussion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people believe that caring for elderly relatives should be the responsibility of the family, while others think the government should provide this care. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-space-exploration-spending",
    title: "Task 2: Is space exploration spending justified?",
    taskType: "task2",
    topic: "Science",
    tags: ["writing", "task-2", "science", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Governments spend large sums of money on space exploration programmes. Some people think this money would be better spent solving problems on Earth. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-advertising-to-children",
    title: "Task 2: Advertising aimed at children",
    taskType: "task2",
    topic: "Advertising",
    tags: ["writing", "task-2", "advertising", "advantages-disadvantages"],
    kind: "exercise",
    data: {
      prompt:
        "Advertising aimed specifically at children has become increasingly common in recent years. Discuss the advantages and disadvantages of this trend.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
];

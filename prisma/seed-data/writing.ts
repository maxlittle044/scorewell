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
    },
  },
];

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

  // ---- More Task 1 Academic charts (fresh chart types/topics: bar, table, pie, line) ----
  {
    slug: "task1-domestic-chores-bar-chart",
    title: "Task 1: Time spent on domestic chores by gender (Bar chart)",
    taskType: "task1-academic",
    topic: "Society",
    tags: ["writing", "task-1-academic", "society", "bar-chart"],
    kind: "test",
    data: {
      prompt:
        "The bar chart below shows the average number of hours per week men and women spent on domestic chores in three countries in 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "bar",
        unit: "hours per week",
        categories: ["Sweden", "Japan", "Mexico"],
        series: [
          { label: "Men", values: [18, 10, 8] },
          { label: "Women", values: [22, 28, 34] },
        ],
      },
    },
  },
  {
    slug: "task1-education-spending-table",
    title: "Task 1: Public spending on education (Table)",
    taskType: "task1-academic",
    topic: "Education",
    tags: ["writing", "task-1-academic", "education", "table"],
    kind: "exercise",
    data: {
      prompt:
        "The table below shows public spending on education as a percentage of GDP in four countries in 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Remember to include an overview paragraph identifying the main trends before you report specific figures.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "table",
        columns: ["Country", "2000 (%)", "2020 (%)"],
        rows: [
          { label: "South Korea", values: [4.2, 5.1] },
          { label: "Germany", values: [3.8, 4.5] },
          { label: "Brazil", values: [5.0, 4.7] },
          { label: "Nigeria", values: [2.9, 3.6] },
        ],
      },
    },
  },
  {
    slug: "task1-electricity-sources-pie-chart",
    title: "Task 1: Sources of electricity generation (Pie chart)",
    taskType: "task1-academic",
    topic: "Environment",
    tags: ["writing", "task-1-academic", "environment", "pie-chart"],
    kind: "test",
    data: {
      prompt:
        "The pie chart below shows the sources of electricity generation in one country in 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "pie",
        unit: "%",
        slices: [
          { label: "Coal", value: 35 },
          { label: "Natural gas", value: 25 },
          { label: "Renewables", value: 20 },
          { label: "Nuclear", value: 15 },
          { label: "Other", value: 5 },
        ],
      },
    },
  },
  {
    slug: "task1-international-students-line-graph",
    title: "Task 1: International students studying abroad (Line graph)",
    taskType: "task1-academic",
    topic: "Education",
    tags: ["writing", "task-1-academic", "education", "line-graph"],
    kind: "exercise",
    data: {
      prompt:
        "The line graph below shows the number of international students studying abroad from three countries between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Use a range of language for describing change — avoid repeating 'increased' and 'decreased' throughout.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "line",
        unit: "thousand students",
        xLabels: ["2000", "2005", "2010", "2015", "2020"],
        series: [
          { label: "China", values: [40, 90, 180, 320, 410] },
          { label: "India", values: [25, 55, 100, 190, 260] },
          { label: "South Korea", values: [20, 35, 50, 60, 55] },
        ],
      },
    },
  },
  {
    slug: "task1-teenager-leisure-bar-chart",
    title: "Task 1: Teenagers' weekly leisure activities (Bar chart)",
    taskType: "task1-academic",
    topic: "Society",
    tags: ["writing", "task-1-academic", "society", "bar-chart"],
    kind: "test",
    data: {
      prompt:
        "The bar chart below shows the average number of hours per week teenagers in one country spent on five leisure activities on weekdays and weekends. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "bar",
        unit: "hours per week",
        categories: ["Watching TV", "Social media", "Sport", "Reading", "Gaming"],
        series: [
          { label: "Weekday", values: [5, 9, 3, 2, 6] },
          { label: "Weekend", values: [4, 6, 5, 3, 8] },
        ],
      },
    },
  },

  // ---- More Task 2 essays (sleep and school, payments, animal testing, working week,
  // museums, sport, retirement, online learning, packaging, city traffic) ----
  {
    slug: "task2-later-school-start-times",
    title: "Task 2: Should schools start later in the morning?",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "health", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some people believe that secondary schools should start later in the morning so that teenagers can get more sleep. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-cashless-society",
    title: "Task 2: The move towards a cashless society",
    taskType: "task2",
    topic: "Technology",
    tags: ["writing", "task-2", "technology", "advantages-disadvantages"],
    kind: "exercise",
    data: {
      prompt:
        "In many countries, cash is being replaced by card and mobile payments. Discuss the advantages and disadvantages of moving towards a cashless society.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-animal-testing",
    title: "Task 2: Animal testing for medical research",
    taskType: "task2",
    topic: "Science",
    tags: ["writing", "task-2", "science", "ethics", "discussion"],
    kind: "test",
    data: {
      prompt:
        "Some people believe that testing new medicines on animals is necessary to protect human health, while others think it is morally unacceptable. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-four-day-working-week",
    title: "Task 2: A shorter working week",
    taskType: "task2",
    topic: "Work",
    tags: ["writing", "task-2", "work", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some companies are experimenting with a four-day working week without reducing employees' pay. Do you think this is a positive development? To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-free-museum-entry",
    title: "Task 2: Should museums be free to enter?",
    taskType: "task2",
    topic: "Culture",
    tags: ["writing", "task-2", "culture", "government", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some people think that museums and art galleries should be free for everyone to enter, while others believe visitors should pay an admission fee. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-sport-national-pride",
    title: "Task 2: International sport and national identity",
    taskType: "task2",
    topic: "Sport",
    tags: ["writing", "task-2", "sport", "society", "two-part"],
    kind: "exercise",
    data: {
      prompt:
        "International sporting events often generate great national pride. Why do you think sport has this effect on people, and is it always a positive influence?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-retirement-age",
    title: "Task 2: Raising the retirement age",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "ageing-population", "problem-solution"],
    kind: "test",
    data: {
      prompt:
        "In many countries the population is ageing, which puts pressure on pension systems. Some governments have responded by raising the retirement age. What problems does an ageing population cause, and is raising the retirement age a good solution?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-online-learning-vs-classroom",
    title: "Task 2: Online learning compared with classroom teaching",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "technology", "advantages-disadvantages"],
    kind: "exercise",
    data: {
      prompt:
        "More and more students are choosing to study online rather than attend classes in person. Discuss the advantages and disadvantages of this trend.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-plastic-packaging",
    title: "Task 2: Reducing plastic packaging",
    taskType: "task2",
    topic: "Environment",
    tags: ["writing", "task-2", "environment", "problem-solution"],
    kind: "test",
    data: {
      prompt:
        "Plastic packaging is a major source of waste around the world. What are the causes of this problem, and what measures could reduce it?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-banning-cars-city-centres",
    title: "Task 2: Should cars be banned from city centres?",
    taskType: "task2",
    topic: "Urban planning",
    tags: ["writing", "task-2", "urban-planning", "transport", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people argue that private cars should be banned from city centres altogether. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },

  // ---- More Task 1 Academic charts (walking, household spending, museums, water use,
  // broadband) ----
  {
    slug: "task1-daily-steps-line-graph",
    title: "Task 1: Average daily steps walked by adults (Line graph)",
    taskType: "task1-academic",
    topic: "Health",
    tags: ["writing", "task-1-academic", "health", "line-graph"],
    kind: "test",
    data: {
      prompt:
        "The line graph below shows the average number of steps walked per day by adults in three countries between 2005 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Use a range of language for describing change — avoid repeating 'increased' and 'decreased' throughout.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "line",
        unit: "steps per day",
        xLabels: ["2005", "2010", "2015", "2020", "2025"],
        series: [
          { label: "Switzerland", values: [9200, 9000, 8700, 8900, 9300] },
          { label: "Japan", values: [7100, 7300, 6900, 6400, 6800] },
          { label: "United States", values: [5200, 5000, 4900, 4700, 5100] },
        ],
      },
    },
  },
  {
    slug: "task1-household-spending-table",
    title: "Task 1: Household spending by category (Table)",
    taskType: "task1-academic",
    topic: "Economy",
    tags: ["writing", "task-1-academic", "economy", "table"],
    kind: "exercise",
    data: {
      prompt:
        "The table below shows how the average household in three countries divided its spending between four categories in 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Remember to include an overview paragraph identifying the main trends before you report specific figures.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "table",
        columns: ["Category", "Canada (%)", "Poland (%)", "Egypt (%)"],
        rows: [
          { label: "Housing", values: [29, 22, 18] },
          { label: "Food", values: [12, 24, 38] },
          { label: "Transport", values: [16, 11, 7] },
          { label: "Leisure and culture", values: [10, 8, 4] },
        ],
      },
    },
  },
  {
    slug: "task1-museum-visitors-bar-chart",
    title: "Task 1: Visitors to five museums (Bar chart)",
    taskType: "task1-academic",
    topic: "Culture",
    tags: ["writing", "task-1-academic", "culture", "bar-chart"],
    kind: "test",
    data: {
      prompt:
        "The bar chart below shows the number of visitors to five museums in a European city in 2019 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "bar",
        unit: "thousand visitors",
        categories: ["History", "Science", "Art", "Maritime", "Toy"],
        series: [
          { label: "2019", values: [620, 480, 710, 150, 90] },
          { label: "2023", values: [540, 520, 590, 190, 140] },
        ],
      },
    },
  },
  {
    slug: "task1-household-water-use-pie-chart",
    title: "Task 1: Household water use (Pie chart)",
    taskType: "task1-academic",
    topic: "Environment",
    tags: ["writing", "task-1-academic", "environment", "pie-chart"],
    kind: "exercise",
    data: {
      prompt:
        "The pie chart below shows how water is used in a typical household in one country. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "pie",
        unit: "%",
        slices: [
          { label: "Toilet flushing", value: 27 },
          { label: "Showers and baths", value: 25 },
          { label: "Laundry", value: 16 },
          { label: "Taps and cooking", value: 15 },
          { label: "Dishwashing", value: 8 },
          { label: "Garden and other", value: 9 },
        ],
      },
    },
  },
  {
    slug: "task1-broadband-access-line-graph",
    title: "Task 1: Households with broadband internet (Line graph)",
    taskType: "task1-academic",
    topic: "Technology",
    tags: ["writing", "task-1-academic", "technology", "line-graph"],
    kind: "test",
    data: {
      prompt:
        "The line graph below shows the percentage of households with broadband internet access in four countries between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Use a range of language for describing change — avoid repeating 'increased' and 'decreased' throughout.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "line",
        unit: "% of households",
        xLabels: ["2000", "2005", "2010", "2015", "2020"],
        series: [
          { label: "South Korea", values: [12, 70, 93, 98, 99] },
          { label: "Germany", values: [2, 26, 65, 85, 93] },
          { label: "Mexico", values: [1, 4, 17, 46, 71] },
          { label: "India", values: [0, 1, 3, 12, 34] },
        ],
      },
    },
  },

  // ---- More Task 1 General letters (lost property, enquiry, building work, new city,
  // thank-you) ----
  {
    slug: "letter-hotel-lost-property",
    title: "Letter to a hotel about an item left behind",
    taskType: "task1-general",
    topic: "Travel",
    tags: ["writing", "task-1-general", "letters", "formal"],
    kind: "test",
    data: {
      prompt:
        "You stayed at a hotel last week and think you left a jacket in your room. Write a letter to the hotel manager. In your letter: describe the jacket and where you think you left it, explain why it is important to you, and ask what should be done to get it back.",
      instructions:
        "Begin your letter 'Dear Sir or Madam,'. Keep the tone formal and polite, and include enough detail for the hotel to identify the item.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-enquiry-holiday-cottage",
    title: "Letter enquiring about a holiday cottage",
    taskType: "task1-general",
    topic: "Travel",
    tags: ["writing", "task-1-general", "letters", "formal", "enquiry"],
    kind: "exercise",
    data: {
      prompt:
        "You saw an advertisement for a holiday cottage in the countryside. Write a letter to the owner. In your letter: say when you would like to stay and how many people will be with you, ask about the facilities and the price, and ask how to get there without a car.",
      instructions:
        "Begin your letter 'Dear Sir or Madam,'. A formal, clear enquiry with specific questions works best.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-neighbour-building-work",
    title: "Letter to a neighbour about building work",
    taskType: "task1-general",
    topic: "Housing",
    tags: ["writing", "task-1-general", "letters", "semi-formal"],
    kind: "test",
    data: {
      prompt:
        "You are planning some building work on your house next month. Write a letter to your neighbour. In your letter: explain what work you are planning and when it will happen, apologise for any noise or disruption, and say how you will try to reduce the inconvenience.",
      instructions:
        "A semi-formal, considerate tone suits a neighbour you know a little. Begin 'Dear Mr/Ms [Surname],'.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-describing-new-city",
    title: "Letter to a friend about moving to a new city",
    taskType: "task1-general",
    topic: "Friends and family",
    tags: ["writing", "task-1-general", "letters", "informal"],
    kind: "exercise",
    data: {
      prompt:
        "You have recently moved to a new city. Write a letter to a friend. In your letter: describe what the city is like, say how you are settling in, and invite your friend to visit.",
      instructions:
        "Keep this informal and lively, as you would when writing to a close friend. Begin 'Dear [Name],'.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-thanking-host-after-stay",
    title: "Letter thanking a friend who let you stay",
    taskType: "task1-general",
    topic: "Friends and family",
    tags: ["writing", "task-1-general", "letters", "informal"],
    kind: "test",
    data: {
      prompt:
        "A friend let you stay in their home for a week while you looked for a new flat. Write a letter to thank them. In your letter: thank them for their help, describe what you enjoyed most about the stay, and say how you hope to repay their kindness.",
      instructions:
        "This is an informal, warm letter. Be specific about what you appreciated rather than only saying thank you.",
      minWords: 150,
      minutes: 20,
    },
  },

  // ---- More Task 2 essays (pocket money, reality TV, brain drain, libraries, compulsory
  // volunteering, tourism, junk food advertising, traffic, GM crops, city versus country) ----
  {
    slug: "task2-pocket-money-children",
    title: "Task 2: Should children be given pocket money?",
    taskType: "task2",
    topic: "Family",
    tags: ["writing", "task-2", "family", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some parents give their children regular pocket money, while others believe children should not receive money unless they earn it by helping at home. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-reality-tv-influence",
    title: "Task 2: The influence of reality television",
    taskType: "task2",
    topic: "Media",
    tags: ["writing", "task-2", "media", "discussion"],
    kind: "exercise",
    data: {
      prompt:
        "Reality television programmes have become very popular around the world. Some people think they are harmless entertainment, while others believe they have a negative effect on society. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-brain-drain",
    title: "Task 2: Skilled workers leaving their home countries",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "work", "problem-solution"],
    kind: "test",
    data: {
      prompt:
        "Many highly skilled people, such as doctors and engineers, leave their home countries to work abroad for higher pay. What problems does this cause for the countries they leave, and what can be done to encourage them to stay?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-public-libraries-future",
    title: "Task 2: Do public libraries still have a future?",
    taskType: "task2",
    topic: "Culture",
    tags: ["writing", "task-2", "culture", "technology", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Because so much information is now available online, some people think that public libraries are no longer necessary and that the money spent on them should be used elsewhere. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-compulsory-community-service",
    title: "Task 2: Community service for school students",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "society", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some people think that all secondary school students should be required to do unpaid community service, such as helping in hospitals or cleaning public spaces. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-tourism-local-culture",
    title: "Task 2: The effects of tourism on local communities",
    taskType: "task2",
    topic: "Tourism",
    tags: ["writing", "task-2", "tourism", "culture", "advantages-disadvantages"],
    kind: "exercise",
    data: {
      prompt:
        "In many places, tourism is the main source of income for local people. Discuss the advantages and disadvantages of this for the local community.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-junk-food-advertising-ban",
    title: "Task 2: Banning advertising of unhealthy food",
    taskType: "task2",
    topic: "Health",
    tags: ["writing", "task-2", "health", "advertising", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Rising levels of obesity have led some people to call for a complete ban on advertising for unhealthy food and drink. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-traffic-congestion-solutions",
    title: "Task 2: Traffic congestion in big cities",
    taskType: "task2",
    topic: "Transport",
    tags: ["writing", "task-2", "transport", "urban-planning", "problem-solution"],
    kind: "exercise",
    data: {
      prompt:
        "Traffic congestion is a growing problem in many large cities. What are the main causes of this problem, and what measures could be taken to reduce it?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-genetically-modified-crops",
    title: "Task 2: Genetically modified crops",
    taskType: "task2",
    topic: "Science",
    tags: ["writing", "task-2", "science", "food", "discussion"],
    kind: "test",
    data: {
      prompt:
        "Some people believe that genetically modified crops are the best way to feed a growing world population, while others think they carry unacceptable risks. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-city-versus-countryside-living",
    title: "Task 2: Living in the city or the countryside",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "lifestyle", "discussion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people prefer to live in a big city, while others would rather live in the countryside. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },

  // ---- More Task 1 Academic charts (rent, ageing, working hours, a teenager's day,
  // island tourism) ----
  {
    slug: "task1-city-rents-bar-chart",
    title: "Task 1: Average monthly rent in five cities (Bar chart)",
    taskType: "task1-academic",
    topic: "Housing",
    tags: ["writing", "task-1-academic", "housing", "bar-chart"],
    kind: "test",
    data: {
      prompt:
        "The bar chart below shows the average monthly rent for a one-bedroom flat in five cities in 2015 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "bar",
        unit: "euros per month",
        categories: ["Lisbon", "Madrid", "Berlin", "Warsaw", "Athens"],
        series: [
          { label: "2015", values: [520, 690, 610, 430, 340] },
          { label: "2025", values: [1150, 1120, 1080, 850, 640] },
        ],
      },
    },
  },
  {
    slug: "task1-population-aged-65-line-graph",
    title: "Task 1: Share of the population aged 65 and over (Line graph)",
    taskType: "task1-academic",
    topic: "Society",
    tags: ["writing", "task-1-academic", "society", "line-graph"],
    kind: "exercise",
    data: {
      prompt:
        "The line graph below shows the percentage of the population aged 65 and over in three countries between 1980 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Use a range of language for describing change — avoid repeating 'increased' and 'decreased' throughout.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "line",
        unit: "% of population",
        xLabels: ["1980", "1990", "2000", "2010", "2020"],
        series: [
          { label: "Japan", values: [9, 12, 17, 23, 29] },
          { label: "Italy", values: [13, 15, 18, 20, 23] },
          { label: "Mexico", values: [4, 4, 5, 6, 8] },
        ],
      },
    },
  },
  {
    slug: "task1-annual-working-hours-table",
    title: "Task 1: Average annual working hours (Table)",
    taskType: "task1-academic",
    topic: "Work",
    tags: ["writing", "task-1-academic", "work", "table"],
    kind: "test",
    data: {
      prompt:
        "The table below shows the average number of hours worked per employee per year in four countries in 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Remember to include an overview paragraph identifying the main trends before you report specific figures.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "table",
        columns: ["Country", "2000 (hours)", "2020 (hours)"],
        rows: [
          { label: "South Korea", values: [2500, 1900] },
          { label: "Mexico", values: [2250, 2130] },
          { label: "United Kingdom", values: [1700, 1520] },
          { label: "Germany", values: [1470, 1330] },
        ],
      },
    },
  },
  {
    slug: "task1-teenager-weekday-pie-chart",
    title: "Task 1: How a typical teenager spends a weekday (Pie chart)",
    taskType: "task1-academic",
    topic: "Society",
    tags: ["writing", "task-1-academic", "society", "pie-chart"],
    kind: "exercise",
    data: {
      prompt:
        "The pie chart below shows how a typical teenager in one country spends the 24 hours of a school day. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "pie",
        unit: "hours",
        slices: [
          { label: "Sleep", value: 8 },
          { label: "School", value: 7 },
          { label: "Leisure and screens", value: 4 },
          { label: "Meals and travel", value: 3 },
          { label: "Homework", value: 2 },
        ],
      },
    },
  },
  {
    slug: "task1-island-tourists-bar-chart",
    title: "Task 1: Visitors to three islands by season (Bar chart)",
    taskType: "task1-academic",
    topic: "Tourism",
    tags: ["writing", "task-1-academic", "tourism", "bar-chart"],
    kind: "test",
    data: {
      prompt:
        "The bar chart below shows the number of tourists who visited three islands in each season of 2024. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "bar",
        unit: "thousand visitors",
        categories: ["Spring", "Summer", "Autumn", "Winter"],
        series: [
          { label: "Island A", values: [120, 310, 140, 60] },
          { label: "Island B", values: [90, 180, 160, 130] },
          { label: "Island C", values: [40, 95, 45, 20] },
        ],
      },
    },
  },

  // ---- More Task 1 General letters (newspaper, restaurant complaint, work event, pet
  // permission, recommendation) ----
  {
    slug: "letter-newspaper-park-closure",
    title: "Letter to a newspaper about a proposed park closure",
    taskType: "task1-general",
    topic: "Community",
    tags: ["writing", "task-1-general", "letters", "formal"],
    kind: "exercise",
    data: {
      prompt:
        "You have read that the council plans to close a local park to build offices. Write a letter to the editor of a local newspaper. In your letter: explain why you are writing, describe how the park is used by local people, and say what you think the council should do instead.",
      instructions:
        "Begin your letter 'Dear Sir or Madam,'. A formal, persuasive tone is appropriate.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-restaurant-poor-service",
    title: "Letter of complaint about poor service at a restaurant",
    taskType: "task1-general",
    topic: "Consumer",
    tags: ["writing", "task-1-general", "letters", "formal", "complaint"],
    kind: "test",
    data: {
      prompt:
        "You recently had a meal at a restaurant for a special occasion, but the service was very poor. Write a letter to the restaurant manager. In your letter: describe what went wrong, explain how it affected your evening, and say what you would like the manager to do.",
      instructions:
        "Begin your letter 'Dear Sir or Madam,'. State the facts calmly and keep the tone firm but polite.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-missing-work-event",
    title: "Letter explaining that you cannot attend a work event",
    taskType: "task1-general",
    topic: "Work",
    tags: ["writing", "task-1-general", "letters", "semi-formal"],
    kind: "exercise",
    data: {
      prompt:
        "Your manager has invited you to a company dinner next month, but you will be away on that date. Write a letter to your manager. In your letter: thank them for the invitation, explain why you cannot attend, and suggest another way to meet the team.",
      instructions:
        "A semi-formal, courteous tone suits a manager you know well. Begin 'Dear Mr/Ms [Surname],'.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-landlord-permission-pet",
    title: "Letter asking a landlord for permission to keep a pet",
    taskType: "task1-general",
    topic: "Housing",
    tags: ["writing", "task-1-general", "letters", "semi-formal"],
    kind: "test",
    data: {
      prompt:
        "You would like to keep a small pet in the flat you rent. Write a letter to your landlord. In your letter: describe the pet you would like to keep, explain how you will make sure it does not cause problems, and offer to pay an extra deposit if necessary.",
      instructions:
        "A semi-formal, respectful tone is appropriate. Begin 'Dear Mr/Ms [Surname],'.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-recommending-holiday-destination",
    title: "Letter to a friend recommending a holiday destination",
    taskType: "task1-general",
    topic: "Friends and family",
    tags: ["writing", "task-1-general", "letters", "informal"],
    kind: "test",
    data: {
      prompt:
        "A friend is planning a holiday and has asked for your advice. Write a letter to your friend. In your letter: recommend a place you have visited, describe what there is to see and do there, and give some practical advice about when to go.",
      instructions:
        "Keep this informal and enthusiastic, as you would when writing to a good friend. Begin 'Dear [Name],'.",
      minWords: 150,
      minutes: 20,
    },
  },

  // ---- More Task 2 essays (sports salaries, history, consumerism, data privacy, nuclear
  // power, screen time, foreign aid, student housing, arts in schools, older workers) ----
  {
    slug: "task2-sports-stars-salaries",
    title: "Task 2: The salaries of professional sports stars",
    taskType: "task2",
    topic: "Sport",
    tags: ["writing", "task-2", "sport", "society", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Top professional sports players are paid very high salaries, while workers such as nurses and teachers earn much less. Some people think this is unfair. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-importance-of-history",
    title: "Task 2: Is studying history important?",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people believe that studying history at school is a waste of time because it concerns events that are long past, while others think it is essential. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-consumerism-overbuying",
    title: "Task 2: Buying more than we need",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "consumerism", "problem-solution"],
    kind: "test",
    data: {
      prompt:
        "People today buy far more clothes, gadgets and household goods than they need, and throw many of them away quickly. What problems does this cause, and what can be done to reduce it?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-online-privacy-data",
    title: "Task 2: Sharing personal data online",
    taskType: "task2",
    topic: "Technology",
    tags: ["writing", "task-2", "technology", "privacy", "advantages-disadvantages"],
    kind: "exercise",
    data: {
      prompt:
        "Many websites and apps collect personal information about their users in order to offer personalised services. Discuss the advantages and disadvantages of this practice.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-nuclear-power-energy",
    title: "Task 2: Nuclear power as a future energy source",
    taskType: "task2",
    topic: "Environment",
    tags: ["writing", "task-2", "environment", "energy", "discussion"],
    kind: "test",
    data: {
      prompt:
        "Some people believe that nuclear power is the best way to meet future energy needs while reducing carbon emissions, while others think the risks are too great. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-children-screen-time",
    title: "Task 2: Children and screen time",
    taskType: "task2",
    topic: "Family",
    tags: ["writing", "task-2", "family", "technology", "problem-solution"],
    kind: "exercise",
    data: {
      prompt:
        "Children today spend a large part of their free time looking at screens. What problems can this cause, and what can parents and schools do to address them?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-international-aid-poor-countries",
    title: "Task 2: Aid to poorer countries",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "global-issues", "discussion"],
    kind: "test",
    data: {
      prompt:
        "Some people think that wealthy countries should give large amounts of financial aid to poorer countries, while others believe this is not an effective way to reduce poverty. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-students-living-away-from-home",
    title: "Task 2: Should university students live away from home?",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "family", "discussion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people think that university students should live away from their family home in order to become independent, while others believe it is better for them to stay at home. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-arts-versus-science-in-schools",
    title: "Task 2: The arts and science in schools",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some people believe that schools should give more time to science and technology subjects than to arts subjects such as music and drama. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-employing-older-workers",
    title: "Task 2: Employing older workers",
    taskType: "task2",
    topic: "Work",
    tags: ["writing", "task-2", "work", "ageing-population", "advantages-disadvantages"],
    kind: "exercise",
    data: {
      prompt:
        "In many countries, people are working until an older age than in the past. Discuss the advantages and disadvantages for employers and employees of an older workforce.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },

  // ---- More Task 2 essays (zoos, homework, cooking in schools, celebrities, working abroad,
  // adult learning, dangerous sports, noise, minority languages, old buildings) ----
  {
    slug: "task2-zoos-role-today",
    title: "Task 2: Are zoos still needed?",
    taskType: "task2",
    topic: "Environment",
    tags: ["writing", "task-2", "environment", "animals", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some people believe that zoos are cruel and should be closed, while others argue that they play an important role in protecting animals. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-homework-for-children",
    title: "Task 2: Homework for young children",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "children", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people think that primary school children should not be given homework, because they need time to play and rest. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-cooking-skills-in-schools",
    title: "Task 2: Teaching cooking in schools",
    taskType: "task2",
    topic: "Health",
    tags: ["writing", "task-2", "health", "education", "advantages-disadvantages"],
    kind: "test",
    data: {
      prompt:
        "In some countries, cooking is taught as a compulsory subject in schools. Do the advantages of this outweigh the disadvantages?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-celebrities-role-models",
    title: "Task 2: Celebrities as role models",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "media", "two-part"],
    kind: "exercise",
    data: {
      prompt:
        "Many young people look up to famous singers, actors and sports players as role models. Why do young people admire celebrities, and is this a positive or negative development?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-working-abroad-temporarily",
    title: "Task 2: Working abroad for a few years",
    taskType: "task2",
    topic: "Work",
    tags: ["writing", "task-2", "work", "globalisation", "advantages-disadvantages"],
    kind: "test",
    data: {
      prompt:
        "More and more people go to work in another country for a few years before returning home. What are the advantages and disadvantages of this trend for the individual?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-lifelong-learning-adults",
    title: "Task 2: Learning throughout adult life",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "adults", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people say that education is only important for the young, while others believe that adults should keep learning throughout their lives. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-dangerous-sports-ban",
    title: "Task 2: Should dangerous sports be banned?",
    taskType: "task2",
    topic: "Sport",
    tags: ["writing", "task-2", "sport", "safety", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some people think that dangerous sports such as mountain climbing and motor racing should be banned because they put lives at risk. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-noise-pollution-cities",
    title: "Task 2: Noise in city life",
    taskType: "task2",
    topic: "Environment",
    tags: ["writing", "task-2", "environment", "cities", "problem-solution"],
    kind: "exercise",
    data: {
      prompt:
        "Noise from traffic, building work and crowds is a growing problem in many cities. What are the causes of this problem, and what measures could be taken to reduce it?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-minority-languages-loss",
    title: "Task 2: The loss of minority languages",
    taskType: "task2",
    topic: "Culture",
    tags: ["writing", "task-2", "culture", "language", "problem-solution"],
    kind: "test",
    data: {
      prompt:
        "Many minority languages around the world are disappearing as young people choose to speak more widespread languages. Why is this happening, and what can be done to protect these languages?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-preserving-old-buildings",
    title: "Task 2: Spending money on old buildings",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "heritage", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people believe that governments should spend public money on preserving old buildings, while others think the money should be used for modern housing and services. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },

  // ---- More Task 1 Academic charts (car ownership, newspaper readers, commuting time,
  // university budget, book formats) ----
  {
    slug: "task1-car-ownership-bar-chart",
    title: "Task 1: Cars per 1,000 people in four countries (Bar chart)",
    taskType: "task1-academic",
    topic: "Transport",
    tags: ["writing", "task-1-academic", "transport", "bar-chart"],
    kind: "test",
    data: {
      prompt:
        "The bar chart below shows the number of cars per 1,000 people in four countries in 1990 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "bar",
        unit: "cars per 1,000 people",
        categories: ["Poland", "Japan", "Brazil", "India"],
        series: [
          { label: "1990", values: [190, 450, 90, 10] },
          { label: "2020", values: [640, 610, 220, 40] },
        ],
      },
    },
  },
  {
    slug: "task1-daily-newspaper-readers-line-graph",
    title: "Task 1: Adults who read a newspaper daily (Line graph)",
    taskType: "task1-academic",
    topic: "Media",
    tags: ["writing", "task-1-academic", "media", "line-graph"],
    kind: "exercise",
    data: {
      prompt:
        "The line graph below shows the percentage of adults who read a printed newspaper every day in three countries between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Use a range of language for describing change — avoid repeating 'increased' and 'decreased' throughout.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "line",
        unit: "% of adults",
        xLabels: ["2000", "2005", "2010", "2015", "2020"],
        series: [
          { label: "Norway", values: [78, 72, 64, 52, 40] },
          { label: "Spain", values: [40, 38, 33, 25, 18] },
          { label: "Turkey", values: [30, 33, 34, 28, 20] },
        ],
      },
    },
  },
  {
    slug: "task1-commuting-time-table",
    title: "Task 1: Average daily commuting time in four cities (Table)",
    taskType: "task1-academic",
    topic: "Transport",
    tags: ["writing", "task-1-academic", "transport", "table"],
    kind: "test",
    data: {
      prompt:
        "The table below shows the average time in minutes that workers in four cities spent travelling to and from work each day, by method of transport, in 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Remember to include an overview paragraph identifying the main trends before you report specific figures.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "table",
        columns: ["City", "By car (minutes)", "By public transport (minutes)"],
        rows: [
          { label: "London", values: [75, 95] },
          { label: "Tokyo", values: [60, 90] },
          { label: "Sydney", values: [70, 85] },
          { label: "Toronto", values: [65, 80] },
        ],
      },
    },
  },
  {
    slug: "task1-university-budget-pie-chart",
    title: "Task 1: How a university spends its annual budget (Pie chart)",
    taskType: "task1-academic",
    topic: "Education",
    tags: ["writing", "task-1-academic", "education", "pie-chart"],
    kind: "exercise",
    data: {
      prompt:
        "The pie chart below shows how one university divided its annual budget between five areas of spending. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "pie",
        unit: "% of budget",
        slices: [
          { label: "Teaching", value: 40 },
          { label: "Research", value: 25 },
          { label: "Buildings and equipment", value: 15 },
          { label: "Student services", value: 12 },
          { label: "Administration", value: 8 },
        ],
      },
    },
  },
  {
    slug: "task1-book-sales-formats-bar-chart",
    title: "Task 1: Book sales by format (Bar chart)",
    taskType: "task1-academic",
    topic: "Media",
    tags: ["writing", "task-1-academic", "media", "bar-chart"],
    kind: "test",
    data: {
      prompt:
        "The bar chart below shows the number of printed books, e-books and audiobooks sold in one country in 2018 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "bar",
        unit: "million copies",
        categories: ["Printed books", "E-books", "Audiobooks"],
        series: [
          { label: "2018", values: [220, 70, 15] },
          { label: "2023", values: [190, 80, 45] },
        ],
      },
    },
  },

  // ---- More Task 1 General letters (course enquiry, apology, guest speaker, workplace
  // suggestion, advice to a friend) ----
  {
    slug: "letter-enquiry-evening-course",
    title: "Letter enquiring about an evening course",
    taskType: "task1-general",
    topic: "Education",
    tags: ["writing", "task-1-general", "letters", "formal", "enquiry"],
    kind: "test",
    data: {
      prompt:
        "You are interested in taking an evening course at a local college. Write a letter to the course secretary. In your letter: explain which course you are interested in and why, ask about the timetable and cost, and ask whether you need any previous experience.",
      instructions:
        "A formal, polite tone is appropriate. Begin your letter 'Dear Sir or Madam,'.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-apology-missed-meeting",
    title: "Letter apologising for missing a meeting",
    taskType: "task1-general",
    topic: "Work",
    tags: ["writing", "task-1-general", "letters", "semi-formal", "apology"],
    kind: "exercise",
    data: {
      prompt:
        "You missed an important meeting with a colleague because of an unexpected problem. Write a letter to your colleague. In your letter: apologise for missing the meeting, explain what happened, and suggest a new time to meet.",
      instructions:
        "A semi-formal, sincere tone suits a colleague you know. Begin 'Dear Mr/Ms [Surname],'.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-inviting-speaker-school",
    title: "Letter inviting a guest speaker to a school",
    taskType: "task1-general",
    topic: "Education",
    tags: ["writing", "task-1-general", "letters", "formal", "invitation"],
    kind: "test",
    data: {
      prompt:
        "You are a member of a school committee, and you would like to invite a local business owner to talk to students about their career. Write a letter to the business owner. In your letter: explain why you are writing, say what you would like them to talk about, and give details of when and where the talk would take place.",
      instructions:
        "A formal, courteous tone is appropriate. Begin your letter 'Dear Sir or Madam,'.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-suggesting-workplace-change",
    title: "Letter to a manager suggesting a change at work",
    taskType: "task1-general",
    topic: "Work",
    tags: ["writing", "task-1-general", "letters", "semi-formal", "suggestion"],
    kind: "exercise",
    data: {
      prompt:
        "You think that a change in your workplace would make employees more productive. Write a letter to your manager. In your letter: describe the change you suggest, explain how it would help, and say how it could be introduced.",
      instructions:
        "A semi-formal, constructive tone is appropriate. Begin 'Dear Mr/Ms [Surname],'.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-friend-advice-exam-stress",
    title: "Letter to a friend offering advice about exam stress",
    taskType: "task1-general",
    topic: "Friends and family",
    tags: ["writing", "task-1-general", "letters", "informal", "advice"],
    kind: "test",
    data: {
      prompt:
        "A friend has written to tell you that they are feeling very stressed about their forthcoming exams. Write a letter to your friend. In your letter: say how you feel about their news, suggest ways they could reduce their stress, and offer to help in some way.",
      instructions:
        "Keep this warm and supportive, as you would when writing to a close friend. Begin 'Dear [Name],'.",
      minWords: 150,
      minutes: 20,
    },
  },

  // ---- More Task 2 essays (sports events, degrees, uniforms, subject choice, search engines,
  // living alone, job satisfaction, negative news, parental responsibility, mixed-age housing) ----
  {
    slug: "task2-hosting-major-sports-events",
    title: "Task 2: Hosting major sports events",
    taskType: "task2",
    topic: "Sport",
    tags: ["writing", "task-2", "sport", "economy", "advantages-disadvantages"],
    kind: "test",
    data: {
      prompt:
        "Many cities compete to host major sports events such as the Olympic Games or the World Cup. What are the advantages and disadvantages of hosting such an event for a city and its residents?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-degree-versus-work-experience",
    title: "Task 2: A degree or work experience?",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "work", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people believe that a university degree is the best preparation for a successful career, while others think that practical work experience is more valuable. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-wearing-uniforms-at-work",
    title: "Task 2: Uniforms in the workplace",
    taskType: "task2",
    topic: "Work",
    tags: ["writing", "task-2", "work", "society", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some people think that all employees should wear a uniform at work because it creates a professional image. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-children-choosing-subjects",
    title: "Task 2: Should children choose what they study?",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "children", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people think that children should be allowed to choose the subjects they study at school, while others believe that the school should decide. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-reliance-on-search-engines",
    title: "Task 2: Relying on the internet for answers",
    taskType: "task2",
    topic: "Technology",
    tags: ["writing", "task-2", "technology", "education", "two-part"],
    kind: "test",
    data: {
      prompt:
        "Many people now turn to the internet whenever they need to find an answer, rather than trying to remember or work things out for themselves. Why is this happening, and is it a positive or negative development?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-people-living-alone",
    title: "Task 2: The rise in people living alone",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "family", "problem-solution"],
    kind: "exercise",
    data: {
      prompt:
        "In many countries, an increasing number of people choose to live alone. What problems might this cause for individuals and society, and what could be done to reduce them?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-job-satisfaction-versus-salary",
    title: "Task 2: Job satisfaction or a high salary?",
    taskType: "task2",
    topic: "Work",
    tags: ["writing", "task-2", "work", "society", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some people believe that job satisfaction is more important than a high salary when choosing a career, while others disagree. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-negative-news-coverage",
    title: "Task 2: The focus of the news on bad events",
    taskType: "task2",
    topic: "Media",
    tags: ["writing", "task-2", "media", "society", "problem-solution"],
    kind: "exercise",
    data: {
      prompt:
        "News reports tend to focus on crime, disasters and other bad events rather than on positive stories. Why do you think this is, and what effects might it have on people?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-parents-responsible-for-behaviour",
    title: "Task 2: Who is responsible for children's behaviour?",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "family", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some people believe that parents should be held legally responsible when their children behave badly in public. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-mixed-age-neighbourhoods",
    title: "Task 2: Living among different age groups",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "community", "advantages-disadvantages"],
    kind: "exercise",
    data: {
      prompt:
        "Some housing developments are designed so that people of different ages live close to one another, instead of separating the young from the old. Do the advantages of this outweigh the disadvantages?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },

  // ---- More Task 1 Academic charts (sleep by age, recycling rates, salaries,
  // household spending, electric car sales) ----
  {
    slug: "task1-sleep-hours-age-bar-chart",
    title: "Task 1: Average hours of sleep by age group (Bar chart)",
    taskType: "task1-academic",
    topic: "Health",
    tags: ["writing", "task-1-academic", "health", "bar-chart"],
    kind: "test",
    data: {
      prompt:
        "The bar chart below shows the average number of hours of sleep per night, on weekdays and at weekends, for five age groups in one country. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "bar",
        unit: "hours per night",
        categories: ["13–17", "18–29", "30–49", "50–64", "65+"],
        series: [
          { label: "Weekdays", values: [7.6, 7.1, 6.8, 6.9, 7.2] },
          { label: "Weekends", values: [8.9, 8.4, 7.6, 7.5, 7.6] },
        ],
      },
    },
  },
  {
    slug: "task1-household-recycling-rates-line-graph",
    title: "Task 1: Household waste recycled in three countries (Line graph)",
    taskType: "task1-academic",
    topic: "Environment",
    tags: ["writing", "task-1-academic", "environment", "line-graph"],
    kind: "exercise",
    data: {
      prompt:
        "The line graph below shows the percentage of household waste that was recycled in three countries between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Use a range of language for describing change — avoid repeating 'increased' and 'decreased' throughout.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "line",
        unit: "% of household waste",
        xLabels: ["2000", "2005", "2010", "2015", "2020"],
        series: [
          { label: "Germany", values: [45, 54, 62, 66, 68] },
          { label: "United Kingdom", values: [11, 20, 33, 44, 45] },
          { label: "Turkey", values: [2, 3, 7, 12, 22] },
        ],
      },
    },
  },
  {
    slug: "task1-average-salaries-table",
    title: "Task 1: Average annual salaries in four occupations (Table)",
    taskType: "task1-academic",
    topic: "Work",
    tags: ["writing", "task-1-academic", "work", "table"],
    kind: "test",
    data: {
      prompt:
        "The table below shows the average annual salary in four occupations in one country in 2010 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Remember to include an overview paragraph identifying the main trends before you report specific figures.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "table",
        columns: ["Occupation", "2010 (£)", "2023 (£)"],
        rows: [
          { label: "Nurse", values: [26000, 33000] },
          { label: "Teacher", values: [28000, 36000] },
          { label: "Software developer", values: [38000, 55000] },
          { label: "Farmer", values: [22000, 27000] },
        ],
      },
    },
  },
  {
    slug: "task1-household-income-spending-pie-chart",
    title: "Task 1: How a household spends its monthly income (Pie chart)",
    taskType: "task1-academic",
    topic: "Society",
    tags: ["writing", "task-1-academic", "society", "pie-chart"],
    kind: "exercise",
    data: {
      prompt:
        "The pie chart below shows how a typical household in one country spends its monthly income. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "pie",
        unit: "% of income",
        slices: [
          { label: "Housing", value: 35 },
          { label: "Food", value: 18 },
          { label: "Transport", value: 14 },
          { label: "Leisure", value: 12 },
          { label: "Savings", value: 11 },
          { label: "Other", value: 10 },
        ],
      },
    },
  },
  {
    slug: "task1-electric-car-sales-bar-chart",
    title: "Task 1: Electric car sales in four countries (Bar chart)",
    taskType: "task1-academic",
    topic: "Transport",
    tags: ["writing", "task-1-academic", "transport", "bar-chart"],
    kind: "test",
    data: {
      prompt:
        "The bar chart below shows the number of electric cars sold in four countries in 2019 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "bar",
        unit: "thousand cars sold",
        categories: ["Norway", "Germany", "France", "Italy"],
        series: [
          { label: "2019", values: [60, 110, 70, 20] },
          { label: "2023", values: [125, 520, 330, 100] },
        ],
      },
    },
  },

  // ---- More Task 1 General letters (lost luggage, parking request, volunteering,
  // retiring teacher, book recommendation) ----
  {
    slug: "letter-airline-lost-luggage",
    title: "Letter to an airline about lost luggage",
    taskType: "task1-general",
    topic: "Travel",
    tags: ["writing", "task-1-general", "letters", "formal", "complaint"],
    kind: "test",
    data: {
      prompt:
        "Your luggage was lost when you travelled on a flight last week. Write a letter to the airline's customer service department. In your letter: describe what happened and what the luggage contained, explain how the loss has affected you, and say what you would like the airline to do.",
      instructions:
        "State the facts clearly, and keep the tone firm but polite. Begin your letter 'Dear Sir or Madam,'.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-neighbour-parking-space",
    title: "Letter asking a neighbour to share a parking space",
    taskType: "task1-general",
    topic: "Housing",
    tags: ["writing", "task-1-general", "letters", "semi-formal", "request"],
    kind: "exercise",
    data: {
      prompt:
        "You have a visitor staying with you for a month who needs somewhere to park a car. Write a letter to a neighbour who has an unused parking space. In your letter: introduce yourself and explain the situation, ask whether your visitor may use the space, and offer something in return.",
      instructions:
        "A polite, semi-formal tone suits a neighbour you do not know well. Begin 'Dear Mr/Ms [Surname],'.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-offering-to-volunteer",
    title: "Letter offering to volunteer for a charity",
    taskType: "task1-general",
    topic: "Community",
    tags: ["writing", "task-1-general", "letters", "formal", "application"],
    kind: "test",
    data: {
      prompt:
        "You would like to volunteer for a local charity. Write a letter to the charity's volunteer coordinator. In your letter: explain why you want to volunteer, describe any relevant skills or experience you have, and say when you would be available.",
      instructions:
        "A formal, enthusiastic tone is appropriate. Begin your letter 'Dear Sir or Madam,'.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-farewell-retiring-teacher",
    title: "Letter thanking a teacher who is retiring",
    taskType: "task1-general",
    topic: "Education",
    tags: ["writing", "task-1-general", "letters", "semi-formal", "thanks"],
    kind: "exercise",
    data: {
      prompt:
        "A teacher who taught you for several years is about to retire. Write a letter to your former teacher. In your letter: say what you remember most about their lessons, explain how they influenced you, and wish them well for the future.",
      instructions:
        "A warm, respectful tone is appropriate. Begin 'Dear Mr/Ms [Surname],'.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-friend-recommending-book",
    title: "Letter to a friend recommending a book",
    taskType: "task1-general",
    topic: "Friends and family",
    tags: ["writing", "task-1-general", "letters", "informal", "recommendation"],
    kind: "test",
    data: {
      prompt:
        "A friend has asked you to recommend a book to read on holiday. Write a letter to your friend. In your letter: describe the book you recommend and what it is about, explain why you enjoyed it, and say who else might enjoy it.",
      instructions:
        "Keep this friendly and enthusiastic, as you would when writing to a good friend. Begin 'Dear [Name],'.",
      minWords: 150,
      minutes: 20,
    },
  },

  // ---- More Task 2 essays (wealth gap, gap years, CCTV, stay-at-home parents, small shops,
  // second-hand goods, competition, charity, festivals, moving for work) ----
  {
    slug: "task2-gap-between-rich-and-poor",
    title: "Task 2: The gap between rich and poor",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "economy", "problem-solution"],
    kind: "test",
    data: {
      prompt:
        "In many countries, the gap between the richest and the poorest people is growing. What problems does this cause, and what measures could governments take to reduce the gap?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-taking-a-gap-year",
    title: "Task 2: Taking a year out before university",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "young-people", "advantages-disadvantages"],
    kind: "exercise",
    data: {
      prompt:
        "Some young people take a year out to travel or work before starting university. What are the advantages and disadvantages of taking a gap year?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-cctv-and-public-safety",
    title: "Task 2: Cameras in public places",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "privacy", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some people think that installing security cameras in streets and public buildings is the best way to reduce crime, while others believe it invades people's privacy. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-parent-staying-at-home",
    title: "Task 2: A parent staying at home with children",
    taskType: "task2",
    topic: "Family",
    tags: ["writing", "task-2", "family", "work", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people believe that it is better for children if one parent stays at home to look after them, rather than both parents working. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-small-shops-versus-supermarkets",
    title: "Task 2: Small shops and large supermarkets",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "economy", "problem-solution"],
    kind: "test",
    data: {
      prompt:
        "In many towns, small local shops are closing because people prefer to shop at large supermarkets. What problems does this cause, and what can be done to support small shops?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-buying-second-hand-goods",
    title: "Task 2: Buying second-hand goods",
    taskType: "task2",
    topic: "Environment",
    tags: ["writing", "task-2", "environment", "consumerism", "advantages-disadvantages"],
    kind: "exercise",
    data: {
      prompt:
        "More and more people are choosing to buy second-hand clothes, furniture and electronics instead of new ones. Do the advantages of this trend outweigh the disadvantages?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-competition-in-schools",
    title: "Task 2: Competition among students",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "children", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some people think that competition between students in school helps them to achieve more, while others believe that cooperation is more effective. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-charity-versus-government",
    title: "Task 2: Who should help the needy?",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "welfare", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people believe that the government should be responsible for helping the poor, while others think that individuals and charities should do more. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-commercialisation-of-festivals",
    title: "Task 2: The commercial side of festivals",
    taskType: "task2",
    topic: "Culture",
    tags: ["writing", "task-2", "culture", "consumerism", "two-part"],
    kind: "test",
    data: {
      prompt:
        "Traditional festivals and holidays have become increasingly commercial, with a focus on shopping and spending. Why has this happened, and is it a positive or negative development?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-leaving-hometown-for-work",
    title: "Task 2: Moving away from home for a job",
    taskType: "task2",
    topic: "Work",
    tags: ["writing", "task-2", "work", "family", "advantages-disadvantages"],
    kind: "exercise",
    data: {
      prompt:
        "Many young people move to another city or country to find a job, leaving their families and hometowns behind. What are the advantages and disadvantages of this trend?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },

  // ---- More Task 1 Academic charts (university enrolment, online shopping, life expectancy,
  // home energy use, seasonal rainfall) ----
  {
    slug: "task1-university-enrolment-subjects-bar-chart",
    title: "Task 1: University enrolment by subject (Bar chart)",
    taskType: "task1-academic",
    topic: "Education",
    tags: ["writing", "task-1-academic", "education", "bar-chart"],
    kind: "test",
    data: {
      prompt:
        "The bar chart below shows the number of students enrolled in five subject areas at one university in 2010 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "bar",
        unit: "students (hundreds)",
        categories: ["Business", "Engineering", "Medicine", "Arts", "Computing"],
        series: [
          { label: "2010", values: [42, 30, 18, 25, 12] },
          { label: "2023", values: [48, 36, 24, 15, 40] },
        ],
      },
    },
  },
  {
    slug: "task1-online-shopping-adults-line-graph",
    title: "Task 1: Adults who shop online in three countries (Line graph)",
    taskType: "task1-academic",
    topic: "Technology",
    tags: ["writing", "task-1-academic", "technology", "line-graph"],
    kind: "exercise",
    data: {
      prompt:
        "The line graph below shows the percentage of adults who bought goods online in three countries between 2010 and 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Use a range of language for describing change — avoid repeating 'increased' and 'decreased' throughout.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "line",
        unit: "% of adults",
        xLabels: ["2010", "2013", "2016", "2019", "2022"],
        series: [
          { label: "United Kingdom", values: [55, 66, 77, 84, 90] },
          { label: "Spain", values: [22, 30, 42, 55, 68] },
          { label: "Bulgaria", values: [8, 12, 19, 26, 38] },
        ],
      },
    },
  },
  {
    slug: "task1-life-expectancy-table",
    title: "Task 1: Life expectancy at birth in four countries (Table)",
    taskType: "task1-academic",
    topic: "Health",
    tags: ["writing", "task-1-academic", "health", "table"],
    kind: "test",
    data: {
      prompt:
        "The table below shows the average life expectancy at birth in four countries in 1970 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Remember to include an overview paragraph identifying the main trends before you report specific figures.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "table",
        columns: ["Country", "1970 (years)", "2020 (years)"],
        rows: [
          { label: "Japan", values: [72, 85] },
          { label: "Brazil", values: [59, 76] },
          { label: "India", values: [50, 70] },
          { label: "Nigeria", values: [42, 55] },
        ],
      },
    },
  },
  {
    slug: "task1-home-energy-use-pie-chart",
    title: "Task 1: Energy use in a typical home (Pie chart)",
    taskType: "task1-academic",
    topic: "Environment",
    tags: ["writing", "task-1-academic", "environment", "pie-chart"],
    kind: "exercise",
    data: {
      prompt:
        "The pie chart below shows how a typical household in one country uses energy. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "pie",
        unit: "% of household energy",
        slices: [
          { label: "Heating", value: 50 },
          { label: "Hot water", value: 18 },
          { label: "Appliances", value: 14 },
          { label: "Lighting", value: 8 },
          { label: "Cooking", value: 5 },
          { label: "Other", value: 5 },
        ],
      },
    },
  },
  {
    slug: "task1-city-rainfall-seasons-bar-chart",
    title: "Task 1: Seasonal rainfall in two cities (Bar chart)",
    taskType: "task1-academic",
    topic: "Weather",
    tags: ["writing", "task-1-academic", "weather", "bar-chart"],
    kind: "test",
    data: {
      prompt:
        "The bar chart below shows the average rainfall in each season in two cities. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "bar",
        unit: "millimetres",
        categories: ["Spring", "Summer", "Autumn", "Winter"],
        series: [
          { label: "City A", values: [110, 45, 130, 160] },
          { label: "City B", values: [70, 95, 85, 40] },
        ],
      },
    },
  },

  // ---- More Task 1 General letters (wedding invitation, flexible hours, broken street light,
  // thanking a colleague, describing a new job) ----
  {
    slug: "letter-inviting-relatives-to-wedding",
    title: "Letter inviting relatives to your wedding",
    taskType: "task1-general",
    topic: "Friends and family",
    tags: ["writing", "task-1-general", "letters", "informal", "invitation"],
    kind: "test",
    data: {
      prompt:
        "You are getting married and would like to invite relatives who live abroad. Write a letter to your aunt and uncle. In your letter: share your happy news, give details of the date and place of the wedding, and explain how they could travel to the event and where they could stay.",
      instructions:
        "Keep this warm and personal, as you would when writing to a relative. Begin 'Dear [Name],'.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-request-flexible-working-hours",
    title: "Letter asking your manager for flexible working hours",
    taskType: "task1-general",
    topic: "Work",
    tags: ["writing", "task-1-general", "letters", "semi-formal", "request"],
    kind: "exercise",
    data: {
      prompt:
        "You would like to change your working hours for a few months so that you can take a course. Write a letter to your manager. In your letter: explain why you want to change your hours, describe the changes you are asking for, and say how you will make sure your work is not affected.",
      instructions:
        "A polite, semi-formal tone suits a manager you know well. Begin 'Dear Mr/Ms [Surname],'.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-council-broken-streetlight",
    title: "Letter to the council about a broken street light",
    taskType: "task1-general",
    topic: "Community",
    tags: ["writing", "task-1-general", "letters", "formal", "complaint"],
    kind: "test",
    data: {
      prompt:
        "A street light near your home has not worked for several weeks, and the street is now dark and unsafe at night. Write a letter to the local council. In your letter: describe the problem and where it is, explain why it is a concern for local people, and say what you would like the council to do.",
      instructions:
        "State the problem clearly and keep the tone firm but polite. Begin your letter 'Dear Sir or Madam,'.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-thanking-colleague-for-help",
    title: "Letter thanking a colleague for help",
    taskType: "task1-general",
    topic: "Work",
    tags: ["writing", "task-1-general", "letters", "semi-formal", "thanks"],
    kind: "exercise",
    data: {
      prompt:
        "A colleague helped you to complete an important project on time when you were very busy. Write a letter to your colleague. In your letter: thank them for their help, explain what difference it made, and suggest a way to show your appreciation.",
      instructions:
        "A warm, courteous tone is appropriate. Begin 'Dear Mr/Ms [Surname],'.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-friend-describing-new-job",
    title: "Letter to a friend describing a new job",
    taskType: "task1-general",
    topic: "Friends and family",
    tags: ["writing", "task-1-general", "letters", "informal", "news"],
    kind: "test",
    data: {
      prompt:
        "You have recently started a new job and want to tell a friend about it. Write a letter to your friend. In your letter: describe the job and the place where you work, say what you like and dislike about it so far, and invite your friend to visit.",
      instructions:
        "Keep this friendly and lively, as you would when writing to a good friend. Begin 'Dear [Name],'.",
      minWords: 150,
      minutes: 20,
    },
  },

  // ---- More Task 2 essays (ethical shopping, exams versus coursework, global English, care robots,
  // exercise at work, public art, rehabilitation, leadership, saving water, solo travel) ----
  {
    slug: "task2-ethical-shopping-fair-trade",
    title: "Task 2: Buying ethical products",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "consumerism", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some people believe that consumers should buy only products that are made in an ethical way, even if they cost more. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-exams-versus-coursework",
    title: "Task 2: Exams or continuous assessment?",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "assessment", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people think that final examinations are the fairest way to assess students, while others believe that continuous assessment through coursework is better. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-english-as-global-language",
    title: "Task 2: English as a global language",
    taskType: "task2",
    topic: "Culture",
    tags: ["writing", "task-2", "culture", "language", "advantages-disadvantages"],
    kind: "test",
    data: {
      prompt:
        "English is increasingly used as a common language for business, science and travel around the world. What are the advantages and disadvantages of this trend?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-robots-caring-for-people",
    title: "Task 2: Robots in caring roles",
    taskType: "task2",
    topic: "Technology",
    tags: ["writing", "task-2", "technology", "society", "advantages-disadvantages"],
    kind: "exercise",
    data: {
      prompt:
        "Robots are being developed to care for elderly people and to help in hospitals. Do the advantages of using robots in caring roles outweigh the disadvantages?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-exercise-at-work",
    title: "Task 2: Encouraging exercise at work",
    taskType: "task2",
    topic: "Health",
    tags: ["writing", "task-2", "health", "work", "problem-solution"],
    kind: "test",
    data: {
      prompt:
        "Many people who work in offices spend most of the day sitting down, and this can harm their health. What problems does this cause, and what can employers and employees do to solve them?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-public-art-and-monuments",
    title: "Task 2: Spending public money on art",
    taskType: "task2",
    topic: "Culture",
    tags: ["writing", "task-2", "culture", "government", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people believe that governments should spend public money on art, such as statues and murals, in public places, while others think this money should be used for essential services. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-prison-versus-rehabilitation",
    title: "Task 2: Punishment or rehabilitation?",
    taskType: "task2",
    topic: "Crime",
    tags: ["writing", "task-2", "crime", "society", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some people think that the main purpose of prison should be to punish criminals, while others believe it should be to rehabilitate them so that they can return to society. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-leaders-born-or-made",
    title: "Task 2: Are leaders born or made?",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "work", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people say that great leaders are born with special qualities, while others believe that leadership can be learned. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-saving-water-individuals-industry",
    title: "Task 2: Who should save water?",
    taskType: "task2",
    topic: "Environment",
    tags: ["writing", "task-2", "environment", "responsibility", "two-part"],
    kind: "test",
    data: {
      prompt:
        "Water shortages are becoming a serious problem in many parts of the world. Who should be responsible for saving water, individuals or industry, and what measures can be taken?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-travelling-alone",
    title: "Task 2: Travelling alone or in a group",
    taskType: "task2",
    topic: "Travel",
    tags: ["writing", "task-2", "travel", "lifestyle", "advantages-disadvantages"],
    kind: "exercise",
    data: {
      prompt:
        "More people now choose to travel alone rather than with family, friends or an organised group. What are the advantages and disadvantages of travelling alone?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },

  // ---- More Task 1 Academic charts (screen time, cycling commuters, tourism, waste,
  // language students) ----
  {
    slug: "task1-screen-time-age-bar-chart",
    title: "Task 1: Daily screen time by age group (Bar chart)",
    taskType: "task1-academic",
    topic: "Technology",
    tags: ["writing", "task-1-academic", "technology", "bar-chart"],
    kind: "test",
    data: {
      prompt:
        "The bar chart below shows the average number of hours per day that people in five age groups spent looking at screens in 2015 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "bar",
        unit: "hours per day",
        categories: ["8–12", "13–17", "18–29", "30–49", "50+"],
        series: [
          { label: "2015", values: [2.8, 4.1, 5.0, 4.2, 3.0] },
          { label: "2023", values: [3.6, 6.2, 6.8, 5.5, 4.1] },
        ],
      },
    },
  },
  {
    slug: "task1-cycling-commuters-line-graph",
    title: "Task 1: Commuters who cycle in three cities (Line graph)",
    taskType: "task1-academic",
    topic: "Transport",
    tags: ["writing", "task-1-academic", "transport", "line-graph"],
    kind: "exercise",
    data: {
      prompt:
        "The line graph below shows the percentage of commuters who travelled to work by bicycle in three cities between 2005 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Use a range of language for describing change — avoid repeating 'increased' and 'decreased' throughout.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "line",
        unit: "% of commuters",
        xLabels: ["2005", "2010", "2015", "2020", "2025"],
        series: [
          { label: "Copenhagen", values: [36, 37, 41, 43, 45] },
          { label: "Amsterdam", values: [30, 32, 35, 38, 40] },
          { label: "London", values: [2, 3, 4, 6, 9] },
        ],
      },
    },
  },
  {
    slug: "task1-tourism-arrivals-spending-table",
    title: "Task 1: Tourist arrivals and spending in four countries (Table)",
    taskType: "task1-academic",
    topic: "Tourism",
    tags: ["writing", "task-1-academic", "tourism", "table"],
    kind: "test",
    data: {
      prompt:
        "The table below shows the number of international visitors to four countries in one year and the total amount they spent. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Remember to include an overview paragraph identifying the main trends before you report specific figures.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "table",
        columns: ["Country", "Visitors (millions)", "Spending (billion dollars)"],
        rows: [
          { label: "Spain", values: [83, 92] },
          { label: "Thailand", values: [40, 60] },
          { label: "Mexico", values: [45, 30] },
          { label: "Japan", values: [32, 38] },
        ],
      },
    },
  },
  {
    slug: "task1-city-waste-destinations-pie-chart",
    title: "Task 1: How a city deals with its waste (Pie chart)",
    taskType: "task1-academic",
    topic: "Environment",
    tags: ["writing", "task-1-academic", "environment", "pie-chart"],
    kind: "exercise",
    data: {
      prompt:
        "The pie chart below shows what happens to the household waste collected in one city in a single year. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "pie",
        unit: "% of waste",
        slices: [
          { label: "Landfill", value: 40 },
          { label: "Recycled", value: 34 },
          { label: "Incinerated", value: 20 },
          { label: "Composted", value: 6 },
        ],
      },
    },
  },
  {
    slug: "task1-foreign-language-students-bar-chart",
    title: "Task 1: Students studying foreign languages (Bar chart)",
    taskType: "task1-academic",
    topic: "Education",
    tags: ["writing", "task-1-academic", "education", "bar-chart"],
    kind: "test",
    data: {
      prompt:
        "The bar chart below shows the number of students studying five foreign languages in schools in one country in 2010 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "bar",
        unit: "thousand students",
        categories: ["Spanish", "French", "German", "Chinese", "Japanese"],
        series: [
          { label: "2010", values: [310, 420, 250, 40, 30] },
          { label: "2023", values: [480, 260, 140, 120, 65] },
        ],
      },
    },
  },

  // ---- More Task 1 General letters (hotel complaint, notice of moving out, school reunion,
  // laptop advice, volunteering abroad) ----
  {
    slug: "letter-hotel-room-complaint",
    title: "Letter of complaint about a hotel room",
    taskType: "task1-general",
    topic: "Travel",
    tags: ["writing", "task-1-general", "letters", "formal", "complaint"],
    kind: "test",
    data: {
      prompt:
        "You recently stayed at a hotel, but the room was not as described in the brochure. Write a letter to the hotel manager. In your letter: describe what was wrong with the room, explain how it spoiled your stay, and say what you expect the hotel to do.",
      instructions:
        "State the facts clearly, and keep the tone firm but polite. Begin your letter 'Dear Sir or Madam,'.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-notice-of-moving-out",
    title: "Letter giving notice that you are leaving a rented flat",
    taskType: "task1-general",
    topic: "Housing",
    tags: ["writing", "task-1-general", "letters", "semi-formal", "notice"],
    kind: "exercise",
    data: {
      prompt:
        "You have decided to move out of the flat you rent. Write a letter to your landlord. In your letter: give notice that you are leaving and say when, explain why you are moving, and ask about the return of your deposit.",
      instructions:
        "A polite, businesslike tone is appropriate. Begin 'Dear Mr/Ms [Surname],'.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-invitation-school-reunion",
    title: "Letter inviting an old friend to a school reunion",
    taskType: "task1-general",
    topic: "Friends and family",
    tags: ["writing", "task-1-general", "letters", "informal", "invitation"],
    kind: "test",
    data: {
      prompt:
        "You are organising a reunion for people who went to your school ten years ago. Write a letter to an old friend. In your letter: explain what you are organising, give the date and place, and ask your friend to help you contact other classmates.",
      instructions:
        "Keep this warm and friendly, as you would when writing to an old friend. Begin 'Dear [Name],'.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-friend-advice-buying-laptop",
    title: "Letter advising a friend on buying a laptop",
    taskType: "task1-general",
    topic: "Technology",
    tags: ["writing", "task-1-general", "letters", "informal", "advice"],
    kind: "exercise",
    data: {
      prompt:
        "A friend is planning to buy a new laptop and has asked for your advice. Write a letter to your friend. In your letter: say what features are most important, suggest where to buy it, and recommend how much to spend.",
      instructions:
        "Keep this helpful and friendly, as you would when writing to a good friend. Begin 'Dear [Name],'.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-request-information-volunteering-abroad",
    title: "Letter requesting information about volunteering abroad",
    taskType: "task1-general",
    topic: "Community",
    tags: ["writing", "task-1-general", "letters", "formal", "enquiry"],
    kind: "test",
    data: {
      prompt:
        "You are interested in volunteering abroad for a few months. Write a letter to an organisation that arranges volunteer work. In your letter: explain why you are interested, ask about the type of work available and the length of placements, and ask what training and support are provided.",
      instructions:
        "A formal, polite tone is appropriate. Begin your letter 'Dear Sir or Madam,'.",
      minWords: 150,
      minutes: 20,
    },
  },

  // ---- More Task 2 essays (money education, young entrepreneurs, school sport, returning artefacts,
  // vegetarian diets, teamwork, university entrance, self-driving cars, bilingual education, celebrity ads) ----
  {
    slug: "task2-financial-education-in-schools",
    title: "Task 2: Teaching money management at school",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "finance", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some people believe that schools should teach students how to manage money, including saving, budgeting and borrowing. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-young-entrepreneurs",
    title: "Task 2: Starting a business at a young age",
    taskType: "task2",
    topic: "Work",
    tags: ["writing", "task-2", "work", "young-people", "advantages-disadvantages"],
    kind: "exercise",
    data: {
      prompt:
        "More young people are choosing to start their own businesses instead of taking a job with an established company. What are the advantages and disadvantages of this trend?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-compulsory-school-sport",
    title: "Task 2: Compulsory sport in schools",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "health", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some people think that all children should be required to take part in sport at school, while others believe it should be a choice. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-returning-cultural-artefacts",
    title: "Task 2: Returning artefacts to their country of origin",
    taskType: "task2",
    topic: "Culture",
    tags: ["writing", "task-2", "culture", "museums", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Many museums hold cultural objects that were taken from other countries in the past. Some people believe these objects should be returned to their countries of origin. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-rise-of-vegetarian-diets",
    title: "Task 2: The growth of vegetarian diets",
    taskType: "task2",
    topic: "Health",
    tags: ["writing", "task-2", "health", "environment", "two-part"],
    kind: "test",
    data: {
      prompt:
        "More people are choosing to eat less meat or none at all. Why is this happening, and is it a positive or negative development?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-teamwork-versus-individual-work",
    title: "Task 2: Teamwork or individual work?",
    taskType: "task2",
    topic: "Work",
    tags: ["writing", "task-2", "work", "society", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people think that employees achieve more when they work in a team, while others believe that individuals perform better on their own. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-university-entrance-exams",
    title: "Task 2: How universities should select students",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "assessment", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some people believe that a single national exam is the fairest way to decide who enters university, while others think that other factors, such as interviews and school records, should also be considered. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-self-driving-cars",
    title: "Task 2: Cars that drive themselves",
    taskType: "task2",
    topic: "Technology",
    tags: ["writing", "task-2", "technology", "transport", "advantages-disadvantages"],
    kind: "exercise",
    data: {
      prompt:
        "Vehicles that drive themselves are being developed and tested in many countries. What are the advantages and disadvantages of self-driving cars?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-bilingual-education",
    title: "Task 2: Teaching children in two languages",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "language", "problem-solution"],
    kind: "test",
    data: {
      prompt:
        "In some countries, children are taught in two languages at school, but this can cause difficulties for some students and teachers. What problems can this cause, and what solutions can you suggest?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-celebrity-endorsements",
    title: "Task 2: Celebrities in advertising",
    taskType: "task2",
    topic: "Media",
    tags: ["writing", "task-2", "media", "advertising", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Companies often use famous people to advertise their products. Some people think this is an effective way of selling goods, while others believe it has a negative influence on consumers. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },

  // ---- More Task 1 Academic charts (weekly exercise, internet users, hospital beds,
  // tourist origins, home ownership) ----
  {
    slug: "task1-weekly-exercise-age-gender-bar-chart",
    title: "Task 1: Weekly exercise by age group and gender (Bar chart)",
    taskType: "task1-academic",
    topic: "Health",
    tags: ["writing", "task-1-academic", "health", "bar-chart"],
    kind: "test",
    data: {
      prompt:
        "The bar chart below shows the average number of hours per week that men and women in four age groups spent taking exercise in one country. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "bar",
        unit: "hours per week",
        categories: ["16–24", "25–44", "45–64", "65+"],
        series: [
          { label: "Men", values: [5.2, 3.6, 3.1, 2.8] },
          { label: "Women", values: [4.1, 3.3, 3.4, 2.5] },
        ],
      },
    },
  },
  {
    slug: "task1-internet-users-regions-line-graph",
    title: "Task 1: Internet users in three regions (Line graph)",
    taskType: "task1-academic",
    topic: "Technology",
    tags: ["writing", "task-1-academic", "technology", "line-graph"],
    kind: "exercise",
    data: {
      prompt:
        "The line graph below shows the number of internet users per 100 people in three regions between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Use a range of language for describing change — avoid repeating 'increased' and 'decreased' throughout.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "line",
        unit: "users per 100 people",
        xLabels: ["2000", "2005", "2010", "2015", "2020"],
        series: [
          { label: "Western Europe", values: [30, 55, 74, 84, 91] },
          { label: "East Asia", values: [8, 26, 45, 62, 78] },
          { label: "Central Africa", values: [1, 3, 8, 18, 34] },
        ],
      },
    },
  },
  {
    slug: "task1-hospital-beds-table",
    title: "Task 1: Hospital beds per 1,000 people (Table)",
    taskType: "task1-academic",
    topic: "Health",
    tags: ["writing", "task-1-academic", "health", "table"],
    kind: "test",
    data: {
      prompt:
        "The table below shows the number of hospital beds per 1,000 people in four countries in 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Remember to include an overview paragraph identifying the main trends before you report specific figures.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "table",
        columns: ["Country", "2000", "2020"],
        rows: [
          { label: "Japan", values: [14.7, 12.6] },
          { label: "Germany", values: [9.1, 7.8] },
          { label: "United States", values: [3.6, 2.8] },
          { label: "Sweden", values: [3.6, 2.1] },
        ],
      },
    },
  },
  {
    slug: "task1-tourist-origins-pie-chart",
    title: "Task 1: Where a country's tourists come from (Pie chart)",
    taskType: "task1-academic",
    topic: "Tourism",
    tags: ["writing", "task-1-academic", "tourism", "pie-chart"],
    kind: "exercise",
    data: {
      prompt:
        "The pie chart below shows the regions of origin of the international tourists who visited one country in 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "pie",
        unit: "% of visitors",
        slices: [
          { label: "Europe", value: 45 },
          { label: "Asia", value: 25 },
          { label: "North America", value: 15 },
          { label: "Africa", value: 8 },
          { label: "Other", value: 7 },
        ],
      },
    },
  },
  {
    slug: "task1-home-ownership-age-bar-chart",
    title: "Task 1: Home ownership and renting by age group (Bar chart)",
    taskType: "task1-academic",
    topic: "Housing",
    tags: ["writing", "task-1-academic", "housing", "bar-chart"],
    kind: "test",
    data: {
      prompt:
        "The bar chart below shows the percentage of people in four age groups who owned their homes and who rented them in one country in 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "bar",
        unit: "% of age group",
        categories: ["25–34", "35–44", "45–54", "55+"],
        series: [
          { label: "Owned", values: [35, 58, 72, 82] },
          { label: "Rented", values: [65, 42, 28, 18] },
        ],
      },
    },
  },

  // ---- More Task 1 General letters (street party, cycle lanes, restaurant tip,
  // late-rent apology, scholarship thanks) ----
  {
    slug: "letter-invitation-street-party",
    title: "Letter inviting neighbours to a street party",
    taskType: "task1-general",
    topic: "Community",
    tags: ["writing", "task-1-general", "letters", "semi-formal", "invitation"],
    kind: "test",
    data: {
      prompt:
        "You would like to organise a street party for the people who live on your road. Write a letter to your neighbours. In your letter: explain what you are planning and why, give details of the date, time and place, and ask for help with food and decorations.",
      instructions:
        "A friendly but polite tone suits neighbours you know only slightly. Begin 'Dear Mr/Ms [Surname],'.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-council-cycle-lanes",
    title: "Letter to the council suggesting new cycle lanes",
    taskType: "task1-general",
    topic: "Transport",
    tags: ["writing", "task-1-general", "letters", "formal", "suggestion"],
    kind: "exercise",
    data: {
      prompt:
        "You think your town needs safer routes for cyclists. Write a letter to the local council. In your letter: describe the problem cyclists face, explain how new cycle lanes would benefit the town, and suggest where they should be built.",
      instructions:
        "A formal, persuasive tone is appropriate. Begin your letter 'Dear Sir or Madam,'.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-recommending-restaurant-colleague",
    title: "Letter recommending a restaurant to a colleague",
    taskType: "task1-general",
    topic: "Food",
    tags: ["writing", "task-1-general", "letters", "semi-formal", "recommendation"],
    kind: "test",
    data: {
      prompt:
        "A colleague is planning a dinner for a visiting client and has asked you to recommend a restaurant. Write a letter to your colleague. In your letter: name the restaurant and describe it, explain why it would suit the occasion, and give practical advice about booking and cost.",
      instructions:
        "A friendly, semi-formal tone suits a colleague. Begin 'Dear Mr/Ms [Surname],'.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-apology-late-rent",
    title: "Letter apologising to a landlord for late rent",
    taskType: "task1-general",
    topic: "Housing",
    tags: ["writing", "task-1-general", "letters", "semi-formal", "apology"],
    kind: "exercise",
    data: {
      prompt:
        "You have not been able to pay your rent on time this month. Write a letter to your landlord. In your letter: apologise for the delay, explain what has caused the problem, and say when you will be able to pay.",
      instructions:
        "A sincere, polite tone is appropriate. Begin 'Dear Mr/Ms [Surname],'.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-thanks-scholarship-committee",
    title: "Letter thanking a scholarship committee",
    taskType: "task1-general",
    topic: "Education",
    tags: ["writing", "task-1-general", "letters", "formal", "thanks"],
    kind: "test",
    data: {
      prompt:
        "You have been awarded a scholarship to study at a university. Write a letter to the scholarship committee. In your letter: thank them for the award, explain what it means to you, and describe what you hope to achieve during your studies.",
      instructions:
        "A formal, grateful tone is appropriate. Begin your letter 'Dear Sir or Madam,'.",
      minWords: 150,
      minutes: 20,
    },
  },

  // ---- More Task 2 essays (online doctors, free public wifi, four-day school week, rural healthcare,
  // influencers, national service, endangered languages, work-life balance, online reviews, online voting) ----
  {
    slug: "task2-remote-medical-consultations",
    title: "Task 2: Seeing a doctor online",
    taskType: "task2",
    topic: "Health",
    tags: ["writing", "task-2", "health", "technology", "advantages-disadvantages"],
    kind: "test",
    data: {
      prompt:
        "More people are now able to consult a doctor online rather than visiting a clinic in person. What are the advantages and disadvantages of this development?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-free-public-wifi",
    title: "Task 2: Free wifi in public places",
    taskType: "task2",
    topic: "Technology",
    tags: ["writing", "task-2", "technology", "government", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people believe that local governments should provide free wireless internet access in public places such as parks and libraries. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-four-day-school-week",
    title: "Task 2: A shorter school week",
    taskType: "task2",
    topic: "Education",
    tags: ["writing", "task-2", "education", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Some people think schools should move to a four-day week, with longer school days, rather than the traditional five-day week. To what extent do you agree or disagree?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-urban-versus-rural-healthcare",
    title: "Task 2: Healthcare in cities and in the countryside",
    taskType: "task2",
    topic: "Health",
    tags: ["writing", "task-2", "health", "society", "problem-solution"],
    kind: "exercise",
    data: {
      prompt:
        "In many countries, people living in rural areas have less access to good healthcare than those living in cities. What problems does this cause, and how can it be addressed?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-influence-of-social-media-influencers",
    title: "Task 2: Social media influencers",
    taskType: "task2",
    topic: "Media",
    tags: ["writing", "task-2", "media", "society", "two-part"],
    kind: "test",
    data: {
      prompt:
        "Some young people now see becoming a social media influencer as an attractive career. Why has this happened, and is it a positive or negative development?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-mandatory-national-service",
    title: "Task 2: Compulsory national service",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "government", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some countries require young people to spend a period of time in national service, whether military or civilian, after leaving school. To what extent do you agree with this policy?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-preserving-endangered-languages",
    title: "Task 2: Saving languages that are dying out",
    taskType: "task2",
    topic: "Culture",
    tags: ["writing", "task-2", "culture", "language", "problem-solution"],
    kind: "test",
    data: {
      prompt:
        "Many of the world's languages are at risk of disappearing as fewer people speak them. What problems does this cause, and what can be done to preserve endangered languages?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-work-life-balance",
    title: "Task 2: Balancing work and personal life",
    taskType: "task2",
    topic: "Work",
    tags: ["writing", "task-2", "work", "society", "opinion"],
    kind: "exercise",
    data: {
      prompt:
        "Some people believe that employers should do more to help employees balance their working lives with their personal lives, while others think this is entirely the individual's responsibility. Discuss both views and give your own opinion.",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },
  {
    slug: "task2-online-reviews-and-ratings",
    title: "Task 2: Trusting online reviews",
    taskType: "task2",
    topic: "Consumer",
    tags: ["writing", "task-2", "consumer", "technology", "opinion"],
    kind: "test",
    data: {
      prompt:
        "Many people rely on online reviews and star ratings before buying a product or choosing a restaurant. To what extent do you think online reviews are a reliable guide?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 40,
    },
  },
  {
    slug: "task2-should-voting-be-online",
    title: "Task 2: Voting over the internet",
    taskType: "task2",
    topic: "Society",
    tags: ["writing", "task-2", "society", "technology", "advantages-disadvantages"],
    kind: "exercise",
    data: {
      prompt:
        "Some countries are considering allowing citizens to vote in elections online instead of at a polling station. What are the advantages and disadvantages of online voting?",
      instructions:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      minutes: 0,
    },
  },

  // ---- More Task 1 Academic charts (fast food spending, renewable share, commuting methods,
  // household pets, mobile vs desktop internet) ----
  {
    slug: "task1-fast-food-spending-age-bar-chart",
    title: "Task 1: Spending on fast food by age group (Bar chart)",
    taskType: "task1-academic",
    topic: "Food",
    tags: ["writing", "task-1-academic", "food", "bar-chart"],
    kind: "test",
    data: {
      prompt:
        "The bar chart below shows the average weekly amount spent on fast food by people in four age groups in 2010 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "bar",
        unit: "pounds per week",
        categories: ["18–24", "25–39", "40–59", "60+"],
        series: [
          { label: "2010", values: [18, 15, 9, 4] },
          { label: "2023", values: [27, 22, 14, 7] },
        ],
      },
    },
  },
  {
    slug: "task1-renewable-share-countries-line-graph",
    title: "Task 1: Share of electricity from renewable sources (Line graph)",
    taskType: "task1-academic",
    topic: "Environment",
    tags: ["writing", "task-1-academic", "environment", "line-graph"],
    kind: "exercise",
    data: {
      prompt:
        "The line graph below shows the percentage of electricity generated from renewable sources in three countries between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Use a range of language for describing change — avoid repeating 'increased' and 'decreased' throughout.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "line",
        unit: "% of electricity generated",
        xLabels: ["2000", "2005", "2010", "2015", "2020"],
        series: [
          { label: "Denmark", values: [17, 24, 33, 52, 66] },
          { label: "Germany", values: [7, 10, 17, 30, 45] },
          { label: "Poland", values: [2, 3, 7, 13, 17] },
        ],
      },
    },
  },
  {
    slug: "task1-commuting-methods-table",
    title: "Task 1: Method of travel to work in four cities (Table)",
    taskType: "task1-academic",
    topic: "Transport",
    tags: ["writing", "task-1-academic", "transport", "table"],
    kind: "test",
    data: {
      prompt:
        "The table below shows the percentage of commuters using each method of travel to work in four cities in 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Remember to include an overview paragraph identifying the main trends before you report specific figures.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "table",
        columns: ["City", "Car (%)", "Public transport (%)", "Walking or cycling (%)"],
        rows: [
          { label: "Amsterdam", values: [22, 30, 48] },
          { label: "Houston", values: [78, 12, 10] },
          { label: "Tokyo", values: [12, 65, 23] },
          { label: "Nairobi", values: [30, 40, 30] },
        ],
      },
    },
  },
  {
    slug: "task1-household-pets-pie-chart",
    title: "Task 1: Types of pet kept by households (Pie chart)",
    taskType: "task1-academic",
    topic: "Society",
    tags: ["writing", "task-1-academic", "society", "pie-chart"],
    kind: "exercise",
    data: {
      prompt:
        "The pie chart below shows the types of pet kept by households in one country in 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 0,
      chart: {
        type: "pie",
        unit: "% of pet-owning households",
        slices: [
          { label: "Dogs", value: 38 },
          { label: "Cats", value: 33 },
          { label: "Fish", value: 12 },
          { label: "Birds", value: 9 },
          { label: "Other", value: 8 },
        ],
      },
    },
  },
  {
    slug: "task1-mobile-vs-desktop-internet-bar-chart",
    title: "Task 1: Internet access by device (Bar chart)",
    taskType: "task1-academic",
    topic: "Technology",
    tags: ["writing", "task-1-academic", "technology", "bar-chart"],
    kind: "test",
    data: {
      prompt:
        "The bar chart below shows the percentage of internet users accessing the internet by mobile phone and by desktop computer in four countries in 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions:
        "Describe the chart in your own words. Do not give your opinion, and do not speculate about causes the data does not show.",
      minWords: 150,
      minutes: 20,
      chart: {
        type: "bar",
        unit: "% of internet users",
        categories: ["India", "Brazil", "Germany", "South Korea"],
        series: [
          { label: "Mobile phone", values: [84, 76, 68, 90] },
          { label: "Desktop computer", values: [30, 42, 65, 55] },
        ],
      },
    },
  },

  // ---- More Task 1 General letters (university reference, noisy neighbours, mentor thanks,
  // visa extension, new hobby) ----
  {
    slug: "letter-request-reference-university",
    title: "Letter requesting a reference for a university application",
    taskType: "task1-general",
    topic: "Education",
    tags: ["writing", "task-1-general", "letters", "formal", "request"],
    kind: "test",
    data: {
      prompt:
        "You are applying to a university and need a reference from a former teacher. Write a letter to your former teacher. In your letter: explain what you are applying for, remind them how they know you, and say what you would like them to include in the reference.",
      instructions:
        "A formal, polite tone is appropriate. Begin your letter 'Dear Sir or Madam,'.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-complaint-noisy-neighbours",
    title: "Letter of complaint about noisy neighbours",
    taskType: "task1-general",
    topic: "Housing",
    tags: ["writing", "task-1-general", "letters", "formal", "complaint"],
    kind: "exercise",
    data: {
      prompt:
        "You have been disturbed by noise from the flat next door on several occasions. Write a letter to your neighbour. In your letter: describe the problem, explain how it has affected you, and suggest what you would like them to do.",
      instructions:
        "State the facts calmly and keep the tone firm but polite. Begin your letter 'Dear Sir or Madam,'.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-thanking-mentor-career-advice",
    title: "Letter thanking a mentor for career advice",
    taskType: "task1-general",
    topic: "Work",
    tags: ["writing", "task-1-general", "letters", "semi-formal", "thanks"],
    kind: "test",
    data: {
      prompt:
        "Someone gave you valuable advice that helped you in your career. Write a letter to that person. In your letter: thank them for their advice, explain how it helped you, and tell them about your progress since then.",
      instructions:
        "A warm, grateful tone is appropriate. Begin 'Dear Mr/Ms [Surname],'.",
      minWords: 150,
      minutes: 20,
    },
  },
  {
    slug: "letter-request-extend-visa",
    title: "Letter asking about extending a visa",
    taskType: "task1-general",
    topic: "Travel",
    tags: ["writing", "task-1-general", "letters", "formal", "enquiry"],
    kind: "exercise",
    data: {
      prompt:
        "You are studying in another country and would like to stay longer than your current visa allows. Write a letter to the relevant office. In your letter: explain your situation, say how long you would like to extend your stay, and ask what documents you need to provide.",
      instructions:
        "A formal, polite tone is appropriate. Begin your letter 'Dear Sir or Madam,'.",
      minWords: 150,
      minutes: 0,
    },
  },
  {
    slug: "letter-friend-new-hobby",
    title: "Letter telling a friend about a new hobby",
    taskType: "task1-general",
    topic: "Friends and family",
    tags: ["writing", "task-1-general", "letters", "informal", "news"],
    kind: "test",
    data: {
      prompt:
        "You have recently started a new hobby that you really enjoy. Write a letter to a friend. In your letter: describe the hobby and how you started it, explain what you enjoy about it, and invite your friend to try it with you.",
      instructions:
        "Keep this friendly and enthusiastic, as you would when writing to a good friend. Begin 'Dear [Name],'.",
      minWords: 150,
      minutes: 20,
    },
  },
];

import type { QuizQuestion } from "./reading";

export type ListeningSeed = {
  slug: string;
  title: string;
  topic: string;
  tags: string[];
  data: { audioLabel: string; transcript: string; questions: QuizQuestion[] };
};

export const LISTENING_TESTS: ListeningSeed[] = [
  {
    slug: "practice-set-1",
    title: "Listening Practice Set 1",
    topic: "Accommodation",
    tags: ["section-1", "accommodation", "everyday-life", "multiple-choice"],
    data: {
      audioLabel: "Section 1: University housing call",
      transcript: `Welcome to the university housing office. I'm calling to confirm the details of your accommodation application for next semester. First, I'll need to check — are you applying for a single room or would you prefer to share with another student? ... A single room, understood. Now, single rooms are available in three buildings: Maple Hall, which is closest to the library; Birchwood, which has the newest kitchens; and Cedar House, which is the most affordable option but a fifteen-minute walk from the main campus. Rent for Maple Hall starts at four hundred and twenty dollars a month, Birchwood at three hundred and ninety, and Cedar House at three hundred and fifty. All three include utilities, but only Birchwood includes a weekly cleaning service.`,
      questions: [
        {
          id: "q1",
          type: "Specific detail",
          question: "What type of room is the caller applying for?",
          options: ["A shared room", "A single room", "A studio apartment", "A family room"],
          correctIndex: 1,
        },
        {
          id: "q2",
          type: "Specific detail",
          question: "Which building is closest to the library?",
          options: ["Cedar House", "Birchwood", "Maple Hall", "None of them"],
          correctIndex: 2,
        },
        {
          id: "q3",
          type: "Specific detail",
          question: "Which building includes a weekly cleaning service?",
          options: ["Maple Hall", "Cedar House", "Birchwood", "All three"],
          correctIndex: 2,
        },
        {
          id: "q4",
          type: "Numbers & data",
          question: "What is the monthly rent for Cedar House?",
          options: ["$350", "$390", "$420", "$400"],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    slug: "practice-set-2",
    title: "Listening Practice Set 2",
    topic: "Health & fitness",
    tags: ["section-1", "health-fitness", "everyday-life", "multiple-choice"],
    data: {
      audioLabel: "Section 1: Community gym membership enquiry",
      transcript: `Good morning, Riverside Community Gym, how can I help? ... Sure, I can go through our membership options. We have three plans: the Basic plan, which gives you access to the gym floor and cardio equipment only, for twenty-five dollars a month. The Standard plan adds group fitness classes and pool access, for forty dollars a month. And the Premium plan includes everything in Standard plus unlimited personal training sessions, for seventy-five dollars a month. There's also a one-time joining fee of fifteen dollars for all plans, though that's waived if you sign up before the end of this month. Most new members go with the Standard plan — it tends to offer the best value if you plan on attending classes regularly.`,
      questions: [
        {
          id: "q1",
          type: "Specific detail",
          question: "What does the Basic plan include?",
          options: [
            "Gym floor and cardio equipment only",
            "Group fitness classes",
            "Pool access",
            "Unlimited personal training",
          ],
          correctIndex: 0,
        },
        {
          id: "q2",
          type: "Numbers & data",
          question: "How much does the Standard plan cost per month?",
          options: ["$25", "$40", "$75", "$15"],
          correctIndex: 1,
        },
        {
          id: "q3",
          type: "Specific detail",
          question: "What is included in the Premium plan that Standard does not have?",
          options: [
            "Pool access",
            "Group fitness classes",
            "Unlimited personal training sessions",
            "A free towel",
          ],
          correctIndex: 2,
        },
        {
          id: "q4",
          type: "Specific detail",
          question: "When is the joining fee waived?",
          options: [
            "It is never waived",
            "If you choose the Basic plan",
            "If you sign up before the end of this month",
            "Only for students",
          ],
          correctIndex: 2,
        },
      ],
    },
  },
  {
    slug: "practice-set-3",
    title: "Listening Practice Set 3",
    topic: "Travel",
    tags: ["section-2", "travel", "everyday-life", "multiple-choice"],
    data: {
      audioLabel: "Section 2: Museum visitor information talk",
      transcript: `Good afternoon everyone, and welcome to the Harbour Maritime Museum. Before you begin exploring, let me give you a quick orientation. The museum is arranged over three floors. The ground floor covers shipbuilding and the harbour's industrial history — that's where the large boat models are. The first floor is dedicated to navigation instruments and maps, and it's also where you'll find our temporary exhibition, which this season is about lighthouse keepers. The second floor is the archive and reading room; that's open to the public but only between one and four in the afternoon, and you'll need to leave bags in the lockers downstairs. Guided tours leave from this desk at eleven and again at two, last about fifty minutes, and are included in your ticket — there's no need to book, just turn up. The café is on the ground floor at the rear, and it closes half an hour before the museum does.`,
      questions: [
        {
          id: "q1",
          type: "Specific detail",
          question: "What is on the first floor?",
          options: [
            "Shipbuilding history and boat models",
            "Navigation instruments, maps, and the temporary exhibition",
            "The archive and reading room",
            "The café and gift shop",
          ],
          correctIndex: 1,
        },
        {
          id: "q2",
          type: "Numbers & data",
          question: "When is the archive open to the public?",
          options: [
            "All day",
            "Only in the morning",
            "Between one and four in the afternoon",
            "Only by appointment",
          ],
          correctIndex: 2,
        },
        {
          id: "q3",
          type: "Opinion & attitude",
          question: "What does the speaker say about guided tours?",
          options: [
            "They must be booked in advance",
            "They cost extra",
            "They are included in the ticket and need no booking",
            "They are only available on weekends",
          ],
          correctIndex: 2,
        },
        {
          id: "q4",
          type: "Specific detail",
          question: "What is this season's temporary exhibition about?",
          options: ["Lighthouse keepers", "Shipbuilding", "Harbour trade", "Antique maps"],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    slug: "practice-set-4",
    title: "Listening Practice Set 4",
    topic: "Education",
    tags: ["section-3", "education", "academic", "multiple-choice"],
    data: {
      audioLabel: "Section 3: Tutorial discussion on a research project",
      transcript: `TUTOR: So, how's the research project coming along?
STUDENT: Reasonably well, though I've had to narrow the topic. I originally wanted to look at recycling behaviour across the whole city, but that turned out to be far too broad for the word count.
TUTOR: That's a sensible decision. What did you narrow it to?
STUDENT: Just the two university halls of residence. It means I can actually survey everyone rather than relying on a sample.
TUTOR: Good. And your method — you were considering interviews, weren't you?
STUDENT: I was, but I've switched to a questionnaire. Interviews would have given richer detail, but with three hundred residents I'd never have transcribed them in time. The questionnaire is mostly closed questions, with two open ones at the end.
TUTOR: Sound reasoning. Just be careful — with closed questions, you only find out what you already thought to ask. Make sure those two open questions are doing real work.
STUDENT: That's a good point. I'll expand that section.
TUTOR: And remember the deadline for your ethics form is next Friday, which is a week before the draft itself is due.`,
      questions: [
        {
          id: "q1",
          type: "Cause & reason",
          question: "Why did the student narrow the topic?",
          options: [
            "The tutor insisted on it",
            "The original topic was too broad for the word count",
            "There was no data available",
            "Another student chose the same topic",
          ],
          correctIndex: 1,
        },
        {
          id: "q2",
          type: "Cause & reason",
          question: "Why did the student switch from interviews to a questionnaire?",
          options: [
            "Interviews are less accurate",
            "There would not be time to transcribe interviews with 300 residents",
            "The tutor recommended questionnaires",
            "Interviews were not permitted by the ethics committee",
          ],
          correctIndex: 1,
        },
        {
          id: "q3",
          type: "Opinion & attitude",
          question: "What concern does the tutor raise about closed questions?",
          options: [
            "They take too long to analyse",
            "They are difficult for respondents to understand",
            "You only learn what you already thought to ask",
            "They cannot be used in student projects",
          ],
          correctIndex: 2,
        },
        {
          id: "q4",
          type: "Numbers & data",
          question: "When is the ethics form due?",
          options: [
            "The same day as the draft",
            "Next Friday, a week before the draft",
            "A week after the draft",
            "At the end of term",
          ],
          correctIndex: 1,
        },
      ],
    },
  },
];

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
          evidence: {
            quote: "A single room, understood.",
            explanation:
              "The speaker offers both options, then confirms the choice back. The confirmation is the answer — not the question that precedes it.",
          },
          distractorNotes: {
            "0": "“share with another student” is said aloud, but as the alternative being offered, not the one taken. Section 1 routinely voices the option you did not choose.",
            "2": "Never mentioned. Studio apartments belong to the vocabulary of housing generally, not to this recording.",
            "3": "Never mentioned. Only single and shared rooms are discussed.",
          },
        },
        {
          id: "q2",
          type: "Specific detail",
          question: "Which building is closest to the library?",
          options: ["Cedar House", "Birchwood", "Maple Hall", "None of them"],
          correctIndex: 2,
          evidence: {
            quote: "Maple Hall, which is closest to the library",
            explanation:
              "Three buildings are listed in one breath, each with one distinguishing feature attached. The feature you need is stated immediately after the name.",
          },
          distractorNotes: {
            "0": "Cedar House is described by distance too — “a fifteen-minute walk from the main campus” — but from campus, not the library. Same kind of fact, different landmark.",
            "1": "Birchwood is defined by its kitchens and, later, its cleaning service. Nothing is said about its distance from anything.",
            "3": "One building is named explicitly, so this can be ruled out without recalling which.",
          },
        },
        {
          id: "q3",
          type: "Specific detail",
          question: "Which building includes a weekly cleaning service?",
          options: ["Maple Hall", "Cedar House", "Birchwood", "All three"],
          correctIndex: 2,
          evidence: {
            quote: "All three include utilities, but only Birchwood includes a weekly cleaning service.",
            explanation:
              "The sentence contrasts what every building offers with what one does. “Only” is doing the work — listen for it, because it is what separates the answer from the trap.",
          },
          distractorNotes: {
            "0": "Maple Hall's distinguishing feature is the library, mentioned much earlier. Nothing about cleaning attaches to it.",
            "1": "Cedar House is the cheapest and the furthest out. Its low price makes extra services feel unlikely, and the recording never grants it any.",
            "3": "“All three” is true of utilities in the very same sentence. Answering from the first half of a contrast is the mistake this question is built to catch.",
          },
        },
        {
          id: "q4",
          type: "Numbers & data",
          question: "What is the monthly rent for Cedar House?",
          options: ["$350", "$390", "$420", "$400"],
          correctIndex: 0,
          evidence: {
            quote:
              "Rent for Maple Hall starts at four hundred and twenty dollars a month, Birchwood at three hundred and ninety, and Cedar House at three hundred and fifty.",
            explanation:
              "Three figures arrive in one sentence, in a different order from the options. Note them against the building names as you hear them; there is no second chance to pair them up.",
          },
          distractorNotes: {
            "1": "$390 is Birchwood, named immediately before Cedar House. Slipping one place in a spoken list is the most common way to lose this mark.",
            "2": "$420 is Maple Hall, the first figure given and the easiest to still be holding when the third arrives.",
            "3": "$400 is not said at all. It sits between the real figures and sounds plausible if you remember the shape of the number but not the number.",
          },
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
          evidence: {
            quote:
              "the Basic plan, which gives you access to the gym floor and cardio equipment only",
            explanation:
              "“Only” is the whole answer. The plans are described as a ladder, each adding to the one before, so the first rung is defined by what it stops at.",
          },
          distractorNotes: {
            "1": "Classes come with Standard, the next plan up. Every wrong option here is a real feature of a real plan — just not this one.",
            "2": "Pool access is also Standard. It arrives in the same breath as classes, so mishearing which plan is being described costs both marks.",
            "3": "Personal training is Premium, the top plan. It is the furthest thing from Basic in the list.",
          },
        },
        {
          id: "q2",
          type: "Numbers & data",
          question: "How much does the Standard plan cost per month?",
          options: ["$25", "$40", "$75", "$15"],
          correctIndex: 1,
          evidence: {
            quote: "The Standard plan adds group fitness classes and pool access, for forty dollars a month.",
            explanation:
              "The price comes at the end of the sentence, after two features. Write the figure against the plan name as soon as you hear it — three more numbers follow.",
          },
          distractorNotes: {
            "0": "$25 is Basic, said one sentence earlier. In a rising list of prices, the previous figure is the easiest one to still have in your head.",
            "2": "$75 is Premium, the next figure after this one.",
            "3": "$15 is the joining fee, not a monthly price at all — a one-off charge dropped into the same run of numbers.",
          },
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
          evidence: {
            quote:
              "the Premium plan includes everything in Standard plus unlimited personal training sessions",
            explanation:
              "“Everything in Standard plus” tells you the answer is the part after “plus”. The question asks what Standard lacks, not what Premium contains.",
          },
          distractorNotes: {
            "0": "Pool access is in Premium — but it is in Standard too, so it cannot be the difference. This is the trap the question is built around.",
            "1": "Classes are likewise in both. Anything Standard already has is disqualified by the wording of the question.",
            "3": "Never mentioned. Towels are the sort of gym detail a listener supplies from experience rather than from the recording.",
          },
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
          evidence: {
            quote: "though that's waived if you sign up before the end of this month",
            explanation:
              "The condition arrives after “though”, tacked onto the end of the sentence that introduced the fee. Concessions in Section 1 almost always come as an afterthought like this.",
          },
          distractorNotes: {
            "0": "The fee is introduced as applying to all plans, which is true until the very next clause reverses it. Stopping listening at the comma produces this answer.",
            "1": "The fee is explicitly “for all plans”, so no single plan escapes it.",
            "3": "Students are never mentioned. A plausible-sounding discount that the recording does not offer.",
          },
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
          evidence: {
            quote:
              "The first floor is dedicated to navigation instruments and maps, and it's also where you'll find our temporary exhibition",
            explanation:
              "The talk walks up the building one floor at a time. Track the floors in order as you listen rather than waiting for the one the question names.",
          },
          distractorNotes: {
            "0": "Shipbuilding and the boat models are the ground floor, described immediately before this. Being one floor out is the whole difficulty of an orientation talk.",
            "2": "The archive is the second floor, described immediately after. The other neighbour, and just as easy to slide into.",
            "3": "The café is on the ground floor, and a gift shop is never mentioned at all.",
          },
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
          evidence: {
            quote: "that's open to the public but only between one and four in the afternoon",
            explanation:
              "“Open to the public” and the restriction on it arrive in the same breath, split by “but”. The words after “but” are what the question is testing.",
          },
          distractorNotes: {
            "0": "“Open to the public” is said, and would be the answer if the sentence stopped there. It does not.",
            "1": "One to four is the afternoon. Morning is the plausible opposite for an archive, supplied by expectation rather than by the talk.",
            "3": "No appointment is mentioned — but the bag-locker rule nearby makes the archive sound more restricted than it is.",
          },
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
          evidence: {
            quote:
              "are included in your ticket — there's no need to book, just turn up",
            explanation:
              "Two facts, both stated negatively: nothing more to pay, nothing to arrange. Options phrased as requirements are wrong precisely because the talk removes both.",
          },
          distractorNotes: {
            "0": "The exact reverse of “no need to book”. Hearing the word “book” and not the “no” in front of it is the fastest way to lose this mark.",
            "1": "“Included in your ticket” is the phrase that rules this out — again a negative doing the work.",
            "3": "Times are given (eleven and two) but never days. An option that adds a restriction the talk never mentions.",
          },
        },
        {
          id: "q4",
          type: "Specific detail",
          question: "What is this season's temporary exhibition about?",
          options: ["Lighthouse keepers", "Shipbuilding", "Harbour trade", "Antique maps"],
          correctIndex: 0,
          evidence: {
            quote: "our temporary exhibition, which this season is about lighthouse keepers",
            explanation:
              "The subject is attached to the exhibition in a subordinate clause, well inside a long sentence about the first floor. It is stated once and not returned to.",
          },
          distractorNotes: {
            "1": "Shipbuilding is the ground floor's permanent subject — a real topic in this museum, just not the temporary show.",
            "2": "The harbour's industrial history is mentioned on the ground floor; “harbour trade” is close enough to that to feel like it was said.",
            "3": "Maps are on the first floor, in the very same sentence as the exhibition. The nearest word to the answer, and the wrong one.",
          },
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
          evidence: {
            quote: "but that turned out to be far too broad for the word count",
            explanation:
              "The student gives the reason themselves, before the tutor responds. In Section 3 the reason usually sits in the same turn as the decision, not in the reply to it.",
          },
          distractorNotes: {
            "0": "The tutor calls it “a sensible decision” — approving a choice already made. Agreement after the fact is not instruction beforehand.",
            "2": "Data is never the problem; the student later surveys all three hundred residents, which is the opposite of no data.",
            "3": "No other student is mentioned anywhere in the tutorial.",
          },
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
          evidence: {
            quote: "with three hundred residents I'd never have transcribed them in time",
            explanation:
              "The reason is practical, not academic. Note the concession before it — interviews would have been *better* — because the question asks why they were dropped anyway.",
          },
          distractorNotes: {
            "0": "The student says the opposite: interviews “would have given richer detail”. The concession is there to make this option tempting.",
            "2": "The tutor only asks what the method is, then calls the reasoning sound. Once again, approval after the decision.",
            "3": "Ethics appear at the very end, as a form with a deadline. Nothing is forbidden — the word is simply in the recording.",
          },
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
          evidence: {
            quote: "with closed questions, you only find out what you already thought to ask",
            explanation:
              "The opinion is flagged by “Just be careful”. When a tutor softens into a warning like that, the sentence after it is what the question wants.",
          },
          distractorNotes: {
            "0": "Time pressure is the *student's* worry about interviews, transferred here to the wrong speaker and the wrong method.",
            "1": "Never raised. Closed questions are in fact easier to answer, which is why this sounds wrong on reflection but passes in the moment.",
            "3": "The tutor is advising on how to use them better, not ruling them out.",
          },
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
          evidence: {
            quote:
              "the deadline for your ethics form is next Friday, which is a week before the draft itself is due",
            explanation:
              "Two dates in one sentence, one defined against the other. Fix the named one first, then place the second relative to it.",
          },
          distractorNotes: {
            "0": "Both deadlines are in the sentence, which makes conflating them easy — but they are explicitly a week apart.",
            "2": "The right gap in the wrong direction. The form comes first; that is the point of an ethics form.",
            "3": "Term is never mentioned. A default academic deadline supplied from expectation.",
          },
        },
      ],
    },
  },
];

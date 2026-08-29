/**
 * Browsable Speaking topic lists and the essay-question bank.
 *
 * Every question here was written for this site to illustrate a question type.
 * None is a leaked, forecast or transcribed exam question, and nothing on the
 * pages built from this file claims otherwise — the wording examiners use
 * varies endlessly, but the shapes below are the ones that recur, which is the
 * part that is actually worth practising.
 */
export type TopicBankSeed = {
  slug: string;
  title: string;
  topic: string;
  tags: string[];
  data: {
    order: number;
    intro: string;
    groups: {
      theme: string;
      note?: string;
      questions: { text: string; label?: string }[];
      relatedHref?: string;
      relatedLabel?: string;
    }[];
  };
};

export const TOPIC_BANKS: TopicBankSeed[] = [
  {
    slug: "speaking-topics-part-1",
    title: "Speaking Part 1: topic bank",
    topic: "Speaking",
    tags: ["topic-banks", "speaking", "part-1"],
    data: {
      order: 1,
      intro:
        "Part 1 lasts four to five minutes and stays on familiar ground: where you live, what you do, and what you like. The examiner is checking whether you can speak naturally about ordinary things, so answers of two or three sentences work better than either one word or a memorised speech. Work down a theme aloud and time yourself.",
      groups: [
        {
          theme: "Home and accommodation",
          note: "Almost always asked in the first minute, alongside your name and where you are from.",
          questions: [
            { text: "Do you live in a house or an apartment?" },
            { text: "Which room in your home do you spend the most time in?" },
            { text: "What would you like to change about where you live?" },
            { text: "Is your home close to the shops and services you need?" },
            { text: "Do you prefer living somewhere old or somewhere newly built?" },
            { text: "Who do you live with, and how long have you lived there?" },
          ],
          relatedHref: "/ielts/speaking/part1-everyday-topics",
          relatedLabel: "Practise a full Part 1 set",
        },
        {
          theme: "Work or study",
          note: "You will be asked about one or the other, never both — answer for whichever you actually do.",
          questions: [
            { text: "Do you work, or are you a student?" },
            { text: "Why did you choose that subject or that job?" },
            { text: "What is the most difficult part of what you do?" },
            { text: "Would you like to change what you do in the future?" },
            { text: "Do you prefer working in the morning or later in the day?" },
            { text: "Is your subject or your job popular among people your age?" },
          ],
          relatedHref: "/ielts/band-9-samples/speaking-part1-hometown",
          relatedLabel: "Read a band-9 Part 1 answer",
        },
        {
          theme: "Hometown and neighbourhood",
          questions: [
            { text: "Where is your hometown, and what is it known for?" },
            { text: "Has your hometown changed much since you were a child?" },
            { text: "Would you recommend it to someone visiting your country?" },
            { text: "What do people usually do there at the weekend?" },
            { text: "Do you plan to live there in the future?" },
            { text: "Is it a good place for young children to grow up?" },
          ],
        },
        {
          theme: "Free time and hobbies",
          questions: [
            { text: "How do you usually spend your free time?" },
            { text: "Have your interests changed over the last few years?" },
            { text: "Do you prefer spending free time alone or with other people?" },
            { text: "Is there a hobby you would like to take up?" },
            { text: "Do people in your country have enough free time?" },
            { text: "How often do you get to do the things you enjoy?" },
          ],
        },
        {
          theme: "Food and cooking",
          questions: [
            { text: "Do you enjoy cooking, or do you prefer someone else to cook?" },
            { text: "What kind of food is your area known for?" },
            { text: "Has the way people eat in your country changed recently?" },
            { text: "Do you eat out often?" },
            { text: "Did you learn to cook when you were a child?" },
            { text: "Is there any food you would not eat?" },
          ],
        },
        {
          theme: "Everyday routine and technology",
          questions: [
            { text: "How do you usually travel to work or college?" },
            { text: "What is the first thing you do after you wake up?" },
            { text: "How much do you use your phone during the day?" },
            { text: "Do you prefer to plan your day or decide as you go?" },
            { text: "What do you do when you want to relax after a long day?" },
            { text: "Has the weather where you live affected your plans recently?" },
          ],
        },
      ],
    },
  },
  {
    slug: "speaking-topics-part-2",
    title: "Speaking Part 2: cue-card bank",
    topic: "Speaking",
    tags: ["topic-banks", "speaking", "part-2", "cue-cards"],
    data: {
      order: 2,
      intro:
        "You get one minute to prepare and up to two minutes to speak, with the prompts on the card to steer you. The wording of cue cards changes constantly, but nearly all of them ask you to describe a person, a place, an object, an event, or an experience — so preparing two or three flexible stories covers far more cards than memorising individual answers.",
      groups: [
        {
          theme: "Describe a person",
          note: "One family member and one person outside the family will stretch across most cards in this shape.",
          questions: [
            {
              text: "Describe someone you know who is good at their job. You should say who they are, what they do, how you know them, and explain what makes them good at it.",
            },
            {
              text: "Describe an older person you admire. You should say who they are, how you met them, what they are like, and explain why you admire them.",
            },
            {
              text: "Describe a friend you have known for a long time. You should say who they are, how you met, what you do together, and explain why the friendship has lasted.",
            },
            {
              text: "Describe someone who taught you something useful. You should say who they are, what they taught you, how they taught it, and explain how you have used it since.",
            },
          ],
        },
        {
          theme: "Describe a place",
          questions: [
            {
              text: "Describe a place you go to when you want to be quiet. You should say where it is, how often you go there, what you do there, and explain how it makes you feel.",
            },
            {
              text: "Describe a city you would like to visit. You should say where it is, how you heard about it, what you would do there, and explain why it appeals to you.",
            },
            {
              text: "Describe a building you find interesting. You should say where it is, what it looks like, what it is used for, and explain why you find it interesting.",
            },
            {
              text: "Describe a place where you spent time as a child. You should say where it was, who you went there with, what you did, and explain what you remember most about it.",
            },
          ],
          relatedHref: "/ielts/speaking/part2-place-to-visit",
          relatedLabel: "Practise this cue card",
        },
        {
          theme: "Describe an object",
          questions: [
            {
              text: "Describe something you own that is important to you. You should say what it is, how you got it, how often you use it, and explain why it matters to you.",
            },
            {
              text: "Describe a gift you gave to someone. You should say what it was, who you gave it to, why you chose it, and explain how they reacted.",
            },
            {
              text: "Describe a piece of technology you find useful. You should say what it is, when you started using it, what you use it for, and explain how life would differ without it.",
            },
            {
              text: "Describe something you bought that you were disappointed by. You should say what it was, why you bought it, what went wrong, and explain what you did about it.",
            },
          ],
        },
        {
          theme: "Describe an event or experience",
          questions: [
            {
              text: "Describe a time you had to make a difficult decision. You should say what the decision was, what your options were, what you chose, and explain how it turned out.",
            },
            {
              text: "Describe a celebration you enjoyed. You should say what was being celebrated, who was there, what you did, and explain why you enjoyed it.",
            },
            {
              text: "Describe a journey that did not go as planned. You should say where you were going, what happened, how you dealt with it, and explain what you learned.",
            },
            {
              text: "Describe an occasion when you helped somebody. You should say who you helped, what the situation was, what you did, and explain how you felt afterwards.",
            },
          ],
        },
        {
          theme: "Describe an activity or habit",
          questions: [
            {
              text: "Describe a skill you would like to learn. You should say what it is, why you want to learn it, how you would go about it, and explain what difference it would make.",
            },
            {
              text: "Describe something you do to stay healthy. You should say what it is, how often you do it, how you started, and explain whether it has worked.",
            },
            {
              text: "Describe a subject you enjoyed studying at school. You should say what it was, how long you studied it, what you did in the lessons, and explain why you enjoyed it.",
            },
            {
              text: "Describe something you do that takes a lot of patience. You should say what it is, when you do it, why it takes patience, and explain how you keep at it.",
            },
          ],
          relatedHref: "/ielts/speaking/part2-skill-to-learn",
          relatedLabel: "Practise this cue card",
        },
        {
          theme: "Describe media or something you read or watched",
          questions: [
            {
              text: "Describe a film or programme that stayed with you. You should say what it was, when you watched it, what it was about, and explain why it stayed with you.",
            },
            {
              text: "Describe a book you would recommend. You should say what it is, how you came across it, what it is about, and explain who you would recommend it to.",
            },
            {
              text: "Describe a piece of news you found interesting. You should say what it was about, where you heard it, who you discussed it with, and explain why it interested you.",
            },
            {
              text: "Describe a website or app you use often. You should say what it is, what you use it for, how often you use it, and explain why you prefer it to the alternatives.",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "speaking-topics-part-3",
    title: "Speaking Part 3: discussion topic bank",
    topic: "Speaking",
    tags: ["topic-banks", "speaking", "part-3"],
    data: {
      order: 3,
      intro:
        "Part 3 moves from your own life to the general and abstract, and follows on thematically from your Part 2 card. Answers need a position, a reason and usually an example or a contrast — this is where the examiner can hear whether you can speculate, compare, and concede a point rather than just describe.",
      groups: [
        {
          theme: "Society and change",
          questions: [
            { text: "How has family life changed in your country over the last generation?" },
            { text: "Do you think people are more or less connected to their neighbours than in the past?" },
            { text: "Why do some people find change harder to accept than others?" },
            { text: "What responsibilities do individuals have towards their community?" },
            { text: "Do you think life will be very different for children born today?" },
          ],
        },
        {
          theme: "Education and learning",
          questions: [
            { text: "Should schools focus more on practical skills or academic knowledge?" },
            { text: "Why do some people continue studying throughout their lives?" },
            { text: "Is it better to learn something from a teacher or on your own?" },
            { text: "How useful are exams as a way of measuring ability?" },
            { text: "Should governments pay for adults who want to retrain?" },
          ],
          relatedHref: "/ielts/band-9-samples/speaking-part3-lifelong-learning",
          relatedLabel: "Read a band-9 Part 3 answer",
        },
        {
          theme: "Work and the economy",
          questions: [
            { text: "Do you think people change jobs more often than they used to?" },
            { text: "What makes a job satisfying, apart from the salary?" },
            { text: "Should employers allow people to work from home?" },
            { text: "How might automation change the kind of work available?" },
            { text: "Is it fair that some professions are paid far more than others?" },
          ],
        },
        {
          theme: "Technology and media",
          questions: [
            { text: "Has the internet made people better informed, or just better entertained?" },
            { text: "Do you think children should have limits on their screen time?" },
            { text: "How reliable is the news that people read online?" },
            { text: "What are the drawbacks of being contactable at all times?" },
            { text: "Will printed books disappear in the next fifty years?" },
          ],
        },
        {
          theme: "Environment and cities",
          questions: [
            { text: "Whose responsibility is it to deal with pollution — governments or individuals?" },
            { text: "Why do so many people move from the countryside to cities?" },
            { text: "What makes a city a pleasant place to live?" },
            { text: "Should people be discouraged from driving in city centres?" },
            { text: "Do you think environmental problems can be solved by technology alone?" },
          ],
          relatedHref: "/ielts/speaking/part3-travel-and-tourism",
          relatedLabel: "Practise a full Part 3 discussion",
        },
        {
          theme: "Culture and tradition",
          questions: [
            { text: "Why do people value traditions even when they are inconvenient?" },
            { text: "Is it important for a country to protect its historic buildings?" },
            { text: "How do young people in your country feel about traditional customs?" },
            { text: "Does international travel make cultures more similar to each other?" },
            { text: "Should governments fund the arts?" },
          ],
        },
      ],
    },
  },
  {
    slug: "essay-question-bank",
    title: "Writing Task 2: essay-question bank",
    topic: "Writing",
    tags: ["topic-banks", "writing", "task-2", "essay-questions"],
    data: {
      order: 4,
      intro:
        "Task 2 questions are grouped here by subject, with the essay type marked on each one, because the type decides your structure and the subject only decides your vocabulary. Read the type label before you plan: an opinion essay that answers a discussion question loses marks for task response no matter how well it is written.",
      groups: [
        {
          theme: "Education",
          questions: [
            {
              text: "Some people believe university education should be free for all students, while others argue students should pay their own fees. Discuss both views and give your own opinion.",
              label: "Discuss both views",
            },
            {
              text: "Children today spend too much time on tests and not enough time learning practical skills. To what extent do you agree or disagree?",
              label: "Opinion",
            },
            {
              text: "In many countries, the number of students studying abroad is increasing. What are the advantages and disadvantages of this trend?",
              label: "Advantages and disadvantages",
            },
            {
              text: "Many school leavers are unprepared for working life. What problems does this cause, and what could be done to solve them?",
              label: "Problem and solution",
            },
            {
              text: "Some parents choose to educate their children at home. Why do they make this choice, and is it a positive or negative development?",
              label: "Two-part question",
            },
          ],
          relatedHref: "/writing-exercises/university-education-free",
          relatedLabel: "Write an answer to this one",
        },
        {
          theme: "Technology and work",
          questions: [
            {
              text: "Technology has made everyday life more complicated rather than simpler. To what extent do you agree or disagree?",
              label: "Opinion",
            },
            {
              text: "Automation is expected to replace many jobs over the coming decades. Do the benefits of this outweigh the drawbacks?",
              label: "Advantages and disadvantages",
            },
            {
              text: "Some people think employees should be allowed to work from home permanently, while others believe offices are necessary. Discuss both views and give your own opinion.",
              label: "Discuss both views",
            },
            {
              text: "More people are working long hours and reporting high levels of stress. What are the causes of this, and what measures could reduce it?",
              label: "Problem and solution",
            },
            {
              text: "Many people now rely on social media as their main source of news. Why is this happening, and do you think it is a positive trend?",
              label: "Two-part question",
            },
          ],
          relatedHref: "/writing-exercises/technology-made-life-complicated",
          relatedLabel: "Write an answer to this one",
        },
        {
          theme: "Environment",
          questions: [
            {
              text: "Governments should spend money on protecting the environment rather than on economic growth. To what extent do you agree or disagree?",
              label: "Opinion",
            },
            {
              text: "Some argue that individuals can do little about climate change and that only governments can act. Discuss both views and give your own opinion.",
              label: "Discuss both views",
            },
            {
              text: "Cities around the world are becoming more congested and polluted. What problems does this create, and how could they be addressed?",
              label: "Problem and solution",
            },
            {
              text: "In some countries, people are encouraged to use public transport instead of private cars. What are the advantages and disadvantages of this policy?",
              label: "Advantages and disadvantages",
            },
            {
              text: "Consumers are buying more products than ever before. Why is this the case, and what effect does it have on the environment?",
              label: "Two-part question",
            },
          ],
        },
        {
          theme: "Health and lifestyle",
          questions: [
            {
              text: "Prevention is better than cure, so health budgets should be spent on education rather than treatment. To what extent do you agree or disagree?",
              label: "Opinion",
            },
            {
              text: "Rates of obesity are rising in many countries. What are the causes, and what steps could governments take?",
              label: "Problem and solution",
            },
            {
              text: "Some people think sport should be compulsory in schools, while others believe it should be a personal choice. Discuss both views and give your own opinion.",
              label: "Discuss both views",
            },
            {
              text: "People in many countries live longer than previous generations. What are the benefits and drawbacks of an ageing population?",
              label: "Advantages and disadvantages",
            },
            {
              text: "Fast food is increasingly popular in countries with strong culinary traditions. Why is this happening, and is it a negative development?",
              label: "Two-part question",
            },
          ],
        },
        {
          theme: "Society and government",
          questions: [
            {
              text: "Some people believe wealthy nations should provide more assistance to poorer ones. To what extent do you agree or disagree?",
              label: "Opinion",
            },
            {
              text: "Some argue that longer prison sentences reduce crime, while others believe rehabilitation is more effective. Discuss both views and give your own opinion.",
              label: "Discuss both views",
            },
            {
              text: "In many cities, the cost of housing has risen faster than incomes. What problems does this cause, and what could be done about it?",
              label: "Problem and solution",
            },
            {
              text: "Some governments encourage citizens to volunteer in their communities. What are the advantages and disadvantages of this approach?",
              label: "Advantages and disadvantages",
            },
            {
              text: "Fewer people vote in elections than in the past. Why might this be, and what could be done to change it?",
              label: "Two-part question",
            },
          ],
        },
        {
          theme: "Culture and globalisation",
          questions: [
            {
              text: "The spread of international brands has made cities around the world look the same. To what extent do you agree or disagree?",
              label: "Opinion",
            },
            {
              text: "Some people think museums and historic sites should be free to enter, while others believe visitors should pay. Discuss both views and give your own opinion.",
              label: "Discuss both views",
            },
            {
              text: "Tourism brings money to a region but can damage the places tourists come to see. Do the advantages outweigh the disadvantages?",
              label: "Advantages and disadvantages",
            },
            {
              text: "Many minority languages are disappearing. Why is this happening, and what could be done to preserve them?",
              label: "Two-part question",
            },
            {
              text: "Young people in many countries are losing interest in traditional customs. What problems might this cause, and how could it be addressed?",
              label: "Problem and solution",
            },
          ],
        },
      ],
    },
  },
];

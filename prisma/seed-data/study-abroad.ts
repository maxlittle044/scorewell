/**
 * Study-abroad destinations and their institution lists (site-build-prompt.md section 4b,
 * "destination pages per country and an institution list").
 *
 * **No score numbers anywhere in this file, on purpose.** The obvious way to write these
 * pages is a table of "minimum IELTS" figures per country and per university. That table
 * would be wrong within months and wrong per course on the day it shipped: requirements
 * differ by degree level, by faculty, and by whether the score is being used for admission
 * or for a visa, and governments change them without notice. Printing a number a learner
 * then plans a year around is the kind of confident-sounding invention the honesty rules
 * exist to stop. Every page therefore says what IELTS is *used for* in that country, which
 * version to book, and links the official page that holds the current figure.
 *
 * **The institutions are real and their links are their own official sites** — no rankings,
 * no "top" lists, no partnership implied, and no numbers attached to any of them. Each URL
 * was checked to resolve before being written here. They are a starting point for reading
 * an admissions page, nothing more.
 *
 * Stored as ARTICLEs split off by taskType "study-abroad", the pattern tips, announcements,
 * topic banks and grammar points already use — no schema change.
 */

export type Institution = {
  name: string;
  city: string;
  /** The institution's own site. Its admissions pages move; its domain does not. */
  url: string;
};

export type DestinationSeed = {
  slug: string;
  title: string;
  /** Country name on its own, for cards and the institution table's country column. */
  country: string;
  tags: string[];
  data: {
    summary: string;
    /** Which IELTS version to book, and why that choice exists in this country. */
    whichTest: string[];
    /** What the score is read for here — admission, immigration, or both. */
    usedFor: string[];
    /** Things worth confirming before booking a test date. Ours, not sourced claims. */
    beforeYouBook: string[];
    officialSources: { label: string; href: string }[];
    institutions: Institution[];
  };
};

export const DESTINATIONS: DestinationSeed[] = [
  {
    slug: "study-in-the-uk",
    title: "Studying in the United Kingdom",
    country: "United Kingdom",
    tags: ["study-abroad", "uk", "destination"],
    data: {
      summary:
        "Two separate readers of your score: the university deciding whether to admit you, and the Home Office deciding whether to give you a visa. They do not always want the same test.",
      whichTest: [
        "Universities normally want IELTS Academic for degree-level study.",
        "The Home Office maintains its own list of approved Secure English Language Tests (SELT). IELTS for UKVI is the version taken at a SELT-approved centre, and it is the version to book when a visa route asks for a SELT — an ordinary IELTS Academic sitting is not interchangeable with it.",
        "Which of the two you need depends on your course level and on the university's own status, so confirm with the university's admissions office before booking, not after.",
      ],
      usedFor: [
        "University admission, set course by course.",
        "The Student visa route, where the requirement is set by the Home Office rather than by the university.",
      ],
      beforeYouBook: [
        "Ask the university in writing which test and which version they accept.",
        "Check whether your course sets a per-component minimum as well as an overall one — a strong overall score with one weak component is the most common way an application fails.",
        "Confirm how long the score stays valid for your intake, and work back from the university's deadline, not the visa's.",
      ],
      officialSources: [
        { label: "UK Student visa (GOV.UK)", href: "https://www.gov.uk/student-visa" },
        {
          label: "Approved Secure English Language Tests (GOV.UK)",
          href: "https://www.gov.uk/guidance/prove-your-english-language-abilities-with-a-secure-english-language-test-selt",
        },
      ],
      institutions: [
        { name: "University of Oxford", city: "Oxford", url: "https://www.ox.ac.uk" },
        { name: "University of Edinburgh", city: "Edinburgh", url: "https://www.ed.ac.uk" },
        { name: "University of Manchester", city: "Manchester", url: "https://www.manchester.ac.uk" },
        { name: "King's College London", city: "London", url: "https://www.kcl.ac.uk" },
        { name: "University of Leeds", city: "Leeds", url: "https://www.leeds.ac.uk" },
        { name: "University of Glasgow", city: "Glasgow", url: "https://www.gla.ac.uk" },
      ],
    },
  },
  {
    slug: "study-in-australia",
    title: "Studying in Australia",
    country: "Australia",
    tags: ["study-abroad", "australia", "destination"],
    data: {
      summary:
        "Admission and the Student visa are decided separately, and the visa's English requirement has been changed more than once in recent years — which is exactly why no figure for it appears on this page.",
      whichTest: [
        "IELTS Academic is the usual test for university admission.",
        "The Department of Home Affairs publishes which English tests it accepts for the Student visa and what each route requires; that list, not a coaching site, is the authority.",
        "Packaging an English-language course (ELICOS) before the main degree is a common route, and it changes what you need at the point of applying.",
      ],
      usedFor: [
        "University and vocational admission.",
        "The Student visa (subclass 500), where the requirement is set by the Department of Home Affairs.",
      ],
      beforeYouBook: [
        "Read the Home Affairs page for the visa subclass you are actually applying for, on the day you apply.",
        "Check whether your provider requires a per-component minimum.",
        "Confirm the score's validity period covers both the admission decision and the visa decision, which can be months apart.",
      ],
      officialSources: [
        {
          label: "Student visa subclass 500 (Department of Home Affairs)",
          href: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
        },
      ],
      institutions: [
        { name: "University of Melbourne", city: "Melbourne", url: "https://www.unimelb.edu.au" },
        { name: "University of Sydney", city: "Sydney", url: "https://www.sydney.edu.au" },
        { name: "Monash University", city: "Melbourne", url: "https://www.monash.edu" },
        { name: "University of Queensland", city: "Brisbane", url: "https://www.uq.edu.au" },
        { name: "RMIT University", city: "Melbourne", url: "https://www.rmit.edu.au" },
        {
          name: "University of Western Australia",
          city: "Perth",
          url: "https://www.uwa.edu.au",
        },
      ],
    },
  },
  {
    slug: "study-in-canada",
    title: "Studying in Canada",
    country: "Canada",
    tags: ["study-abroad", "canada", "destination"],
    data: {
      summary:
        "Canadian study-permit policy has moved quickly — caps, attestation letters and stream changes have all landed in recent intakes. Treat anything you read about Canada, here included, as needing a check against the IRCC page before you act on it.",
      whichTest: [
        "IELTS Academic is the usual test for university and college admission.",
        "IELTS General Training appears in some immigration routes rather than academic ones, which is why the two are worth telling apart early.",
        "Institutions set their own English requirement; a study permit is a separate decision by Immigration, Refugees and Citizenship Canada.",
      ],
      usedFor: [
        "University and college admission.",
        "Study permit applications, and later immigration routes that read language scores differently from admissions offices.",
      ],
      beforeYouBook: [
        "Check the IRCC study-permit page for the current process, including anything your province requires of the institution.",
        "Confirm with the institution which test versions they accept and whether a per-component minimum applies.",
        "Leave room in your timeline for processing, which varies by country of application.",
      ],
      officialSources: [
        {
          label: "Study permit (Government of Canada)",
          href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
        },
      ],
      institutions: [
        { name: "University of Toronto", city: "Toronto", url: "https://www.utoronto.ca" },
        { name: "University of British Columbia", city: "Vancouver", url: "https://www.ubc.ca" },
        { name: "McGill University", city: "Montreal", url: "https://www.mcgill.ca" },
        { name: "University of Alberta", city: "Edmonton", url: "https://www.ualberta.ca" },
        { name: "University of Waterloo", city: "Waterloo", url: "https://uwaterloo.ca" },
        { name: "Dalhousie University", city: "Halifax", url: "https://www.dal.ca" },
      ],
    },
  },
  {
    slug: "study-in-the-usa",
    title: "Studying in the United States",
    country: "United States",
    tags: ["study-abroad", "usa", "destination"],
    data: {
      summary:
        "There is no national English score for a US student visa. The requirement is the university's, and it varies more between US institutions than in any other destination on this list.",
      whichTest: [
        "IELTS Academic is accepted by a great many US institutions, but acceptance and the required score are decided department by department, not nationally.",
        "Some programmes accept alternatives, and some waive the test for applicants who studied previously in English. Neither is a rule you can assume.",
      ],
      usedFor: [
        "University and college admission, and sometimes graduate assistantship eligibility.",
        "Not set as a visa threshold: the F-1 process turns on your admission and funding documents rather than on a published English score.",
      ],
      beforeYouBook: [
        "Check the requirement on the specific department's page, not the university's general international page — they disagree more often than you would expect.",
        "Ask whether the score must be sent directly from the test provider, and how long that takes.",
        "Confirm the deadline is for the score arriving, not for you sitting the test.",
      ],
      officialSources: [
        {
          // Study in the States is the Department of Homeland Security's own site for F-1
          // students. The State Department's visa pages are the other official source, but
          // that host refuses automated requests, so it could not be checked from here and
          // is not linked on the strength of memory.
          label: "Study in the States (U.S. Department of Homeland Security)",
          href: "https://studyinthestates.dhs.gov/students",
        },
      ],
      institutions: [
        { name: "Arizona State University", city: "Tempe", url: "https://www.asu.edu" },
        {
          name: "University of Illinois Urbana-Champaign",
          city: "Urbana-Champaign",
          url: "https://illinois.edu",
        },
        { name: "Purdue University", city: "West Lafayette", url: "https://www.purdue.edu" },
        { name: "Michigan State University", city: "East Lansing", url: "https://msu.edu" },
        { name: "Northeastern University", city: "Boston", url: "https://www.northeastern.edu" },
        { name: "University of Washington", city: "Seattle", url: "https://www.washington.edu" },
      ],
    },
  },
  {
    slug: "study-in-new-zealand",
    title: "Studying in New Zealand",
    country: "New Zealand",
    tags: ["study-abroad", "new-zealand", "destination"],
    data: {
      summary:
        "A small system where the eight universities are all public, and where Immigration New Zealand sets its own English evidence rules alongside the institution's.",
      whichTest: [
        "IELTS Academic is the usual test for university admission.",
        "Immigration New Zealand publishes the evidence it accepts for a student visa, which can differ from what the institution asks for.",
      ],
      usedFor: [
        "University and polytechnic admission.",
        "Fee-paying student visa applications, where Immigration New Zealand sets the requirement.",
      ],
      beforeYouBook: [
        "Read both requirements — the institution's and Immigration New Zealand's — before choosing a test date.",
        "Check whether your programme has a per-component minimum.",
        "Confirm how long results take to reach the institution's admissions system.",
      ],
      officialSources: [
        {
          label: "Study in New Zealand (Immigration New Zealand)",
          href: "https://www.immigration.govt.nz/study/",
        },
      ],
      institutions: [
        { name: "University of Auckland", city: "Auckland", url: "https://www.auckland.ac.nz" },
        { name: "University of Otago", city: "Dunedin", url: "https://www.otago.ac.nz" },
        {
          name: "Victoria University of Wellington",
          city: "Wellington",
          url: "https://www.wgtn.ac.nz",
        },
        { name: "University of Waikato", city: "Hamilton", url: "https://www.waikato.ac.nz" },
        { name: "Massey University", city: "Palmerston North", url: "https://www.massey.ac.nz" },
      ],
    },
  },
  {
    slug: "study-in-ireland",
    title: "Studying in Ireland",
    country: "Ireland",
    tags: ["study-abroad", "ireland", "destination"],
    data: {
      summary:
        "An English-speaking EU destination, which makes it a common alternative to the UK — with its own immigration service, its own rules, and no read-across from UK requirements.",
      whichTest: [
        "IELTS Academic is the usual test for higher-education admission.",
        "Irish immigration permission is handled by the Irish Immigration Service, separately from the college's own admission decision.",
      ],
      usedFor: [
        "Higher-education admission.",
        "Study visa and immigration permission, where the Irish Immigration Service sets what evidence is required.",
      ],
      beforeYouBook: [
        "Check the course page for the English requirement and any per-component minimum.",
        "Read the Irish Immigration Service's own guidance rather than assuming UK rules carry over.",
        "Confirm the requirements for the specific intake you are applying to.",
      ],
      officialSources: [
        {
          label: "Coming to study in Ireland (Irish Immigration Service)",
          href: "https://www.irishimmigration.ie/coming-to-study-in-ireland/",
        },
      ],
      institutions: [
        { name: "Trinity College Dublin", city: "Dublin", url: "https://www.tcd.ie" },
        { name: "University College Dublin", city: "Dublin", url: "https://www.ucd.ie" },
        { name: "University of Galway", city: "Galway", url: "https://www.universityofgalway.ie" },
        { name: "University College Cork", city: "Cork", url: "https://www.ucc.ie" },
        { name: "Dublin City University", city: "Dublin", url: "https://www.dcu.ie" },
      ],
    },
  },
];

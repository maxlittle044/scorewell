/**
 * The founder's story and credentials (site-build-prompt.md section 3a, "Instructor/founder
 * 'our story' page — bio, credentials, why the site exists").
 *
 * **This is placeholder copy, and it is written to look like placeholder copy.** Every field
 * a real person would fill in is bracketed, so the page reads as unfinished rather than as a
 * biography of someone who does not exist. Inventing a plausible bio here — "eight years
 * teaching IELTS in Kathmandu, CELTA 2018" — would put a false claim about a real, named
 * person on a live site, which is exactly what the honesty rules forbid, and it would be
 * impossible to spot later precisely because it reads well.
 *
 * To finish the page: replace the bracketed strings, then set PLACEHOLDER to false. That flag
 * is the only thing standing between this file and a published biography, so nothing here
 * ships as fact by accident.
 */

export const PLACEHOLDER = true;

export type Credential = {
  label: string;
  detail: string;
};

export const FOUNDER = {
  name: "[Founder name]",
  role: "[Role — e.g. founder and lead teacher]",
  location: "[City, country]",
  /** Used for the typographic tile that stands in for a portrait. */
  initials: "SW",
  /** One sentence, the answer to "who are you and why should I listen to you". */
  headline: "[One line: who you are and what you teach]",
  intro: [
    "[Two or three sentences introducing yourself: what you do now, who you teach, and how long you have been doing it.]",
    "[What you want a learner landing here to know about you before they trust the material.]",
  ],
  credentials: [
    { label: "[Qualification]", detail: "[Awarding body and year]" },
    { label: "[Teaching experience]", detail: "[Where, and with what kind of learners]" },
    { label: "[Your own IELTS result, if you have sat it]", detail: "[Band and year]" },
  ] satisfies Credential[],
  story: [
    "[Why this site exists. What you kept seeing learners get wrong, or what you could not find anywhere else.]",
    "[What you decided to build instead, and what you deliberately left out.]",
    "[What you want it to be in a year.]",
  ],
  approach: [
    "[A belief about how IELTS is best prepared for.]",
    "[Something you tell every learner in their first lesson.]",
    "[Something common in IELTS prep that you think is a waste of time.]",
  ],
} as const;

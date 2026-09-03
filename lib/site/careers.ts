/**
 * Open roles (site-build-prompt.md section 3a, "Careers page (if/when hiring)").
 *
 * **`OPEN_ROLES` is empty on purpose.** The spec's own parenthesis is the rule here: the page
 * exists so there is somewhere to point a candidate the day there is something to point them
 * at, and until then it says so. Seeding it with a plausible "Content Writer (Remote)" would
 * be a job advert for a job nobody can apply to — the hiring equivalent of an invented
 * testimonial, and the honesty rules do not carve out an exception for recruiting copy.
 *
 * To open a role: add an entry below. `HIRING` and the page flip over on their own, and the
 * empty state disappears. Removing the last entry puts it back.
 */

export type Role = {
  /** URL-ish id; unique per role, used as the React key and the mailto subject. */
  id: string;
  title: string;
  /** e.g. "Content", "Engineering" — grouped under this on the page. */
  team: string;
  /** e.g. "Remote", "Kathmandu", "Remote (UTC+4 to UTC+7)". */
  location: string;
  /** e.g. "Full-time", "Part-time", "Contract". */
  commitment: string;
  /** Two or three sentences: what the person would actually do. */
  summary: string;
  /** What the role needs. Keep these honest — a wish list nobody meets wastes both sides' time. */
  requirements: string[];
};

export const OPEN_ROLES: Role[] = [];

export const HIRING = OPEN_ROLES.length > 0;

/**
 * Where applications and speculative introductions go. A mailto rather than a form: a CV needs
 * an attachment, and an upload endpoint plus its storage is a running cost for something an
 * email client already does.
 */
export const CAREERS_EMAIL = "careers@scorewell.app";

/**
 * How we work. Every line here is a commitment the product already keeps and a reader can go
 * and check — not a culture deck. Anything about team size, funding, or benefits is left out
 * until it is true and someone can stand behind it.
 */
export const HOW_WE_WORK: { title: string; body: string }[] = [
  {
    title: "Nothing on the site is invented",
    body: "No testimonials we did not receive, no user counts we cannot query, no review scores. Where we have nothing yet, the page says so — you will find empty states across the site that we chose not to fill.",
  },
  {
    title: "The free tier has to work on its own",
    body: "Every core learning feature — tests, scoring, answer keys, flashcards — works with the AI switched off. AI feedback is an addition to the product, never the thing holding it up.",
  },
  {
    title: "We are independent of the exam boards",
    body: "No affiliation with the British Council, IDP, or Cambridge Assessment English, and we never imply one. We do not administer the exam and we do not claim to predict its questions.",
  },
];

/**
 * Learner success stories (site-build-prompt.md section 3 item 18, and section 3a).
 *
 * **This list is deliberately empty.** A success story names a real person and claims a
 * real score, which is exactly the content section 9 and the project's honesty rules
 * forbid inventing — the same reason components/home/testimonials.tsx ships with no
 * entries. Section 7a explicitly allows this area to start empty and grow.
 *
 * Add an entry only when a real learner has actually reached the score, has said the
 * words, and has given permission to publish them. Everything the UI needs is in the type
 * below, so adding one is a data change and nothing else.
 *
 * Stored as ARTICLEs split off by taskType "success-story", the pattern tips, grammar
 * points and announcements already use, so no schema change is needed when the first real
 * story arrives.
 */

export type SuccessStorySeed = {
  slug: string;
  /** The learner's name, as they agreed it should appear. */
  name: string;
  /** Short headline, e.g. "Band 6 to 7.5 in eleven weeks". */
  title: string;
  /** Their band before starting, where they have told us. */
  startingBand?: number;
  /** The band they actually achieved — never an estimate or a target. */
  achievedBand: number;
  /** Their goal: a university, a visa, a profession. */
  goal: string;
  /** ISO date the result was achieved or reported. */
  date: string;
  /** Their own account, in their words. */
  quote: string[];
  tags: string[];
};

export const SUCCESS_STORIES: SuccessStorySeed[] = [];

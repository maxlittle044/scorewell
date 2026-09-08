/**
 * What the learner is told about the model behind a score.
 *
 * Separate from `provider.ts` on purpose: that module constructs the Groq client, and
 * importing it from a component would pull the SDK into the browser bundle. This file has no
 * dependencies, so the disclosure and the model it describes can live in one place without
 * dragging the client along with it.
 */

/** Keep in step with `MODEL` in provider.ts. */
export const MODEL_LABEL = "GPT-OSS 120B, an open model";

/**
 * Shown wherever an AI band estimate is displayed.
 *
 * A band is the one output a learner will act on — deciding whether to book the test, or
 * which skill to spend a month on. This model is free to run and good at explaining language,
 * but it is not an examiner and it is not as well calibrated as the paid frontier models this
 * site used previously. Saying so plainly is the difference between a useful practice tool
 * and a misleading one.
 */
export const AI_BAND_DISCLOSURE =
  `This estimate comes from ${MODEL_LABEL}, not a trained examiner. Treat it as a rough guide and a source of specific feedback, not a prediction of your real band.`;

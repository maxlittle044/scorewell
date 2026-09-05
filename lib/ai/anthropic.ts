import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic();

/**
 * Server-side fallbacks: if the model declines a request on safety grounds, the API re-runs it
 * on a fallback model within the same call rather than returning nothing. `"default"` uses the
 * routing the API picks per refusal category, so there is no model list here to go stale.
 *
 * Worth having on a site whose whole input is learner-written prose: an essay about crime,
 * war or medicine is ordinary IELTS material and occasionally reads to a classifier as
 * something else. A decline before any output is not billed; a rescue is billed at the
 * fallback model's own rates, and only when it actually fires.
 */
export const FALLBACK_BETAS = ["server-side-fallback-2026-07-01"] as const;
export const FALLBACKS = "default" as const;

/**
 * Thrown when the model declined the request outright — including after any fallback.
 *
 * A refusal arrives as a perfectly successful HTTP 200 with `stop_reason: "refusal"` and no
 * usable content, so without this check it surfaced as "the AI response could not be parsed":
 * a parsing bug, blamed on us, for something that is neither.
 */
export class AiRefusalError extends Error {
  constructor(readonly category: string | null) {
    super(`The AI declined this request (${category ?? "unspecified"}).`);
    this.name = "AiRefusalError";
  }
}

/** Narrow shape both the stable and beta message types satisfy. */
type MaybeRefusal = {
  stop_reason?: string | null;
  stop_details?: { category?: string | null } | null;
};

/**
 * Call before reading a response's content. `stop_details` is populated only for refusals, so
 * it must be guarded rather than read directly.
 */
export function throwIfRefused(response: MaybeRefusal): void {
  if (response.stop_reason !== "refusal") return;
  throw new AiRefusalError(response.stop_details?.category ?? null);
}

export function describeAiError(error: unknown): string {
  if (error instanceof AiRefusalError) {
    // Says what happened and whose fault it isn't. "Try again" is deliberately absent:
    // the same text will be declined again, so the useful advice is to change it.
    return "The AI wouldn't review this one — its safety filters flagged the text. That is not a judgement on your English. Try rewording the sensitive part, or use a different prompt.";
  }
  if (error instanceof Anthropic.AuthenticationError) {
    return "The AI service isn't configured correctly. Please try again later.";
  }
  if (error instanceof Anthropic.RateLimitError) {
    return "The AI service is busy right now. Please try again in a moment.";
  }
  if (error instanceof Anthropic.APIError) {
    return "Something went wrong talking to the AI service. Please try again.";
  }
  return "Something went wrong. Please try again.";
}

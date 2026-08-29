import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic();

export function describeAiError(error: unknown): string {
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

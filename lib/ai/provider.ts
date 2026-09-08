import Groq, {
  APIConnectionError,
  APIError,
  AuthenticationError,
  RateLimitError,
} from "groq-sdk";
import { z } from "zod";

/**
 * The AI provider for every scored and generated feature on the site.
 *
 * **Groq, on its free tier.** The previous provider was billed per token, which meant the
 * whole AI surface stopped the moment the account ran dry — and it did. A free tier keeps the
 * tools working without a bill, at the cost of a rate limit and a weaker model. That trade is
 * disclosed to learners wherever a band comes back, because a band estimate from an open
 * model is worth less than one from a frontier model and they should be told so rather than
 * find out from their real result.
 *
 * `GROQ_API_KEY` is read from the environment on first use. **Constructed lazily on purpose:**
 * the SDK throws when the key is absent, and doing that at module load broke `next build`
 * outright — a missing key would have taken the whole site down, not just the AI tools, which
 * is the opposite of the rule that every core feature works with AI switched off.
 */
let client: Groq | null = null;

function getClient(): Groq {
  if (!client) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new MissingApiKeyError();
    client = new Groq({ apiKey });
  }
  return client;
}

/** Distinguishable from a real API failure, so the message can say which it was. */
export class MissingApiKeyError extends Error {
  constructor() {
    super("GROQ_API_KEY is not set.");
    this.name = "MissingApiKeyError";
  }
}

/**
 * `openai/gpt-oss-120b` rather than the larger-sounding `llama-3.3-70b-versatile`, for one
 * decisive reason: only the GPT-OSS and Qwen models support Groq's **strict** JSON-schema
 * mode. The checkers need a response that matches their schema exactly — four criteria, bands
 * in range, quotes attached to fixes — and "best effort" JSON that occasionally comes back
 * malformed would surface to a learner as a failed check.
 */
export const MODEL = "openai/gpt-oss-120b";

// The learner-facing label lives in model-info.ts, which components can import without
// pulling the SDK into the browser bundle.
export { MODEL_LABEL } from "./model-info";

export function describeAiError(error: unknown): string {
  if (error instanceof MissingApiKeyError || error instanceof AuthenticationError) {
    return "The AI service isn't configured correctly. Please try again later.";
  }
  if (error instanceof RateLimitError) {
    // Genuinely transient on a free tier with a per-minute cap, so "try again" is real advice.
    return "The AI service is busy right now — this happens when a lot of people are practising at once. Please try again in a minute.";
  }
  if (error instanceof APIConnectionError) {
    return "Couldn't reach the AI service. Check your connection and try again.";
  }
  if (error instanceof APIError) {
    return "Something went wrong talking to the AI service. Please try again.";
  }
  return "Something went wrong. Please try again.";
}

/** Joins the text parts of a completion, which is all these prompts ever ask for. */
function textOf(completion: Groq.Chat.Completions.ChatCompletion): string {
  return (completion.choices[0]?.message?.content ?? "").trim();
}

export async function completeText(params: {
  system: string;
  user: string;
  maxTokens?: number;
  /** Lower is steadier; the default suits explanation and correction rather than invention. */
  temperature?: number;
}): Promise<string> {
  const completion = await getClient().chat.completions.create({
    model: MODEL,
    max_completion_tokens: params.maxTokens ?? 4000,
    temperature: params.temperature ?? 0.4,
    messages: [
      { role: "system", content: params.system },
      { role: "user", content: params.user },
    ],
  });

  return textOf(completion);
}

/**
 * A completion that continues an existing exchange, for the AI Conversations practice where
 * the examiner's next question depends on everything already said.
 */
export async function completeChat(params: {
  system: string;
  messages: { role: "user" | "assistant"; content: string }[];
  maxTokens?: number;
  /** Higher than the default: an examiner who asks the same follow-up every time is no use. */
  temperature?: number;
}): Promise<string> {
  const completion = await getClient().chat.completions.create({
    model: MODEL,
    max_completion_tokens: params.maxTokens ?? 2000,
    temperature: params.temperature ?? 0.7,
    messages: [
      { role: "system", content: params.system },
      ...params.messages.map((m) => ({ role: m.role, content: m.content })),
    ],
  });

  return textOf(completion);
}

/**
 * A completion constrained to a Zod schema.
 *
 * The schema is sent to Groq as JSON Schema *and* used to validate what comes back. Strict
 * mode is meant to guarantee the shape, but it is the model's guarantee, not ours — parsing
 * the result through Zod means a malformed response fails here, loudly, instead of reaching a
 * component that expects four criteria and finds three.
 *
 * Zod 4 already emits `additionalProperties: false` and complete `required` lists, which is
 * exactly what strict mode demands, so no post-processing is needed.
 */
export async function completeStructured<T>(params: {
  schema: z.ZodType<T>;
  /** Identifies the schema to the API; letters, digits and underscores. */
  schemaName: string;
  system: string;
  user: string;
  maxTokens?: number;
}): Promise<T> {
  const completion = await getClient().chat.completions.create({
    model: MODEL,
    max_completion_tokens: params.maxTokens ?? 8000,
    temperature: 0.2,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: params.schemaName,
        strict: true,
        schema: z.toJSONSchema(params.schema) as Record<string, unknown>,
      },
    },
    messages: [
      { role: "system", content: params.system },
      { role: "user", content: params.user },
    ],
  });

  const raw = textOf(completion);
  if (!raw) {
    throw new Error("The AI returned an empty response.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("The AI response could not be parsed.");
  }

  const result = params.schema.safeParse(parsed);
  if (!result.success) {
    // Logged in full because the shape drifting is a provider or prompt problem to fix, not
    // something the learner can act on.
    console.error("AI response failed schema validation:", result.error.issues);
    throw new Error("The AI response did not match the expected format.");
  }

  return result.data;
}

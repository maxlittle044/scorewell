/**
 * Caps on anything a visitor can type or upload.
 *
 * Several actions validated that a field was *present* and nothing else, so the only limit on
 * a shared answer, a reply, or a payment reference was what the browser felt like sending. A
 * `required` attribute and a `maxLength` are conveniences for the person filling the form in;
 * neither survives a request made without the form.
 *
 * The numbers are generous — they exist to stop a field being used as free storage, not to
 * cut anyone's answer short. An IELTS Task 2 answer is around 250 words, so 20,000 characters
 * is roughly twenty times the longest thing anyone would legitimately paste.
 */

/** A shared or reviewed answer. */
export const MAX_ANSWER_LENGTH = 20_000;
/** A title a learner gives their own answer. */
export const MAX_ANSWER_TITLE_LENGTH = 200;
/** Feedback left on someone else's answer. */
export const MAX_REPLY_LENGTH = 4_000;
/** A payment reference: real ones are short codes, not paragraphs. */
export const MAX_TRANSACTION_REF_LENGTH = 120;

/**
 * Text sent to the AI model.
 *
 * The quota counts requests, not tokens, so without this one person pasting a book could
 * spend the shared free-tier allowance that every learner's AI tools depend on for the day.
 * Ten thousand characters is around 1,500 words — roughly four times the longest IELTS
 * answer anyone is asked to write.
 */
export const MAX_AI_INPUT_LENGTH = 10_000;

/** Payment screenshots. */
export const MAX_SCREENSHOT_BYTES = 5 * 1024 * 1024;

/**
 * What a payment screenshot may be. Checked against the browser-declared type *and* the
 * file's own leading bytes, because the declared type is chosen by whoever sends it — the
 * `accept="image/*"` on the input is a file-picker filter and nothing more.
 */
export const ALLOWED_SCREENSHOT_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;

/** The extension actually written to storage, chosen by us rather than taken from a filename. */
export const SCREENSHOT_EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

export function formatBytes(bytes: number): string {
  return bytes >= 1024 * 1024 ? `${Math.round(bytes / (1024 * 1024))}MB` : `${Math.round(bytes / 1024)}KB`;
}

/**
 * Returns an error message, or null when the text is acceptable.
 * `label` is used in the message, so it should read naturally after "Your ".
 */
export function checkLength(value: string, max: number, label: string): string | null {
  if (value.length <= max) return null;
  return `Your ${label} is too long — ${value.length.toLocaleString()} characters, and the limit is ${max.toLocaleString()}.`;
}

/**
 * Whether a screenshot is acceptable. Returns an error message, or null.
 *
 * Lives here, with no server imports, so the browser can run the identical check before
 * uploading. That matters beyond convenience: a request larger than Next's Server Action body
 * limit is rejected in transport, before any server code runs, so an oversized file can only
 * ever be explained by the client. The server runs this too — the browser's copy is a
 * courtesy, not the gate.
 */
export function checkScreenshot(file: { size: number; type: string }): string | null {
  if (file.size === 0) return null; // No file attached — the field is optional.
  if (file.size > MAX_SCREENSHOT_BYTES) {
    return `That screenshot is ${formatBytes(file.size)}. Please upload an image under ${formatBytes(MAX_SCREENSHOT_BYTES)}.`;
  }
  if (!(ALLOWED_SCREENSHOT_TYPES as readonly string[]).includes(file.type)) {
    return "Please upload a PNG, JPEG or WebP image of your payment.";
  }
  return null;
}

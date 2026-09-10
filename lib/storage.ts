import { createClient } from "@supabase/supabase-js";
import {
  SCREENSHOT_EXTENSIONS,
  checkScreenshot,
} from "@/lib/input-limits";

const PAYMENT_PROOFS_BUCKET = "payment-proofs";

function getStorageClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

/** Leading bytes that identify each format we accept, so the file is judged by content. */
const MAGIC: { type: string; bytes: number[] }[] = [
  { type: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47] },
  { type: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
  // WebP is "RIFF....WEBP"; the first four bytes are enough to pair with the declared type.
  { type: "image/webp", bytes: [0x52, 0x49, 0x46, 0x46] },
];

function sniffType(buffer: Buffer): string | null {
  for (const { type, bytes } of MAGIC) {
    if (bytes.every((b, i) => buffer[i] === b)) return type;
  }
  return null;
}

/**
 * Stores a payment screenshot and returns its path (not a public URL — the bucket is private),
 * or null when there is nothing to store or storage is not configured.
 *
 * The file is validated again here, by its own leading bytes rather than the type the browser
 * claimed, because both the declared type and the filename are chosen by whoever sends the
 * request. Before this, the extension came from the filename and the content type came from
 * the upload, so an arbitrary file could be stored under any name the sender liked and handed
 * back to an admin through a signed URL.
 */
export async function uploadPaymentScreenshot(file: File, userId: string): Promise<string | null> {
  if (!file || file.size === 0) return null;
  if (checkScreenshot(file)) return null;

  const supabase = getStorageClient();
  if (!supabase) return null;

  const buffer = Buffer.from(await file.arrayBuffer());

  // The declared type has to agree with what the bytes actually are.
  const sniffed = sniffType(buffer);
  if (!sniffed || sniffed !== file.type) {
    console.error(
      `uploadPaymentScreenshot rejected a file: declared ${file.type || "nothing"}, looks like ${sniffed ?? "no known image format"}.`,
    );
    return null;
  }

  // Extension and content type both come from the verified type, never from the upload.
  const path = `${userId}/${Date.now()}.${SCREENSHOT_EXTENSIONS[sniffed]}`;

  const { error } = await supabase.storage
    .from(PAYMENT_PROOFS_BUCKET)
    .upload(path, buffer, { contentType: sniffed });

  if (error) {
    console.error("uploadPaymentScreenshot failed:", error.message);
    return null;
  }

  return path;
}

export async function getSignedScreenshotUrl(path: string): Promise<string | null> {
  const supabase = getStorageClient();
  if (!supabase) return null;

  const { data, error } = await supabase.storage
    .from(PAYMENT_PROOFS_BUCKET)
    .createSignedUrl(path, 60 * 10);

  if (error) {
    console.error("getSignedScreenshotUrl failed:", error.message);
    return null;
  }

  return data.signedUrl;
}

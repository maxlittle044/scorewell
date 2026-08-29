import { createClient } from "@supabase/supabase-js";

const PAYMENT_PROOFS_BUCKET = "payment-proofs";

function getStorageClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// Returns the storage path (not a public URL — the bucket is private) or
// null if storage isn't configured yet or the file is empty.
export async function uploadPaymentScreenshot(file: File, userId: string): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const supabase = getStorageClient();
  if (!supabase) return null;

  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `${userId}/${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(PAYMENT_PROOFS_BUCKET)
    .upload(path, buffer, { contentType: file.type || "application/octet-stream" });

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

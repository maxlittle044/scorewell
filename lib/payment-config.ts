import type { PaymentMethod } from "@/generated/prisma/enums";

/**
 * Real payment destinations, read from the environment.
 *
 * Checkout is closed until at least one of these is filled in. Before this
 * existed, the checkout page rendered a sample QR code and the words "account
 * details go here", while still accepting a transaction reference — so a real
 * visitor could believe they had paid into an account that does not exist. An
 * unconfigured site must refuse payments rather than collect references for
 * money that went nowhere.
 *
 * Set these in `.env` locally and in the Vercel project settings to open
 * checkout:
 *   PAYMENT_ACCOUNT_NAME   — the name money should be sent to
 *   PAYMENT_ESEWA_ID       — eSewa ID
 *   PAYMENT_KHALTI_ID      — Khalti ID
 *   PAYMENT_BANK_ACCOUNT   — bank name + account number
 *   PAYMENT_ESEWA_QR_URL   — image of the real eSewa QR
 *   PAYMENT_KHALTI_QR_URL  — image of the real Khalti QR
 *   PAYMENT_BANK_QR_URL    — image of the real bank QR, if the bank issues one
 *
 * **A QR belongs to one method.** There used to be a single PAYMENT_QR_URL shown
 * against whichever method was selected, captioned "QR code for paying by
 * Khalti" even when the image was the eSewa one — an instruction to scan the
 * wrong code and send money to the wrong place. Each method now carries its own
 * or shows none.
 */

export type PaymentAccount = {
  method: PaymentMethod;
  label: string;
  /** Null when this particular method has not been configured. */
  accountId: string | null;
  /** This method's own QR image. Null when none has been supplied for it. */
  qrUrl: string | null;
};

function read(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

export function getPaymentAccounts(): PaymentAccount[] {
  return [
    {
      method: "ESEWA",
      label: "eSewa",
      accountId: read("PAYMENT_ESEWA_ID"),
      qrUrl: read("PAYMENT_ESEWA_QR_URL"),
    },
    {
      method: "KHALTI",
      label: "Khalti",
      accountId: read("PAYMENT_KHALTI_ID"),
      qrUrl: read("PAYMENT_KHALTI_QR_URL"),
    },
    {
      method: "BANK_TRANSFER",
      label: "Bank transfer",
      accountId: read("PAYMENT_BANK_ACCOUNT"),
      qrUrl: read("PAYMENT_BANK_QR_URL"),
    },
  ];
}

export function getConfiguredAccounts(): PaymentAccount[] {
  return getPaymentAccounts().filter((account) => account.accountId !== null);
}

/** Checkout only opens once there is somewhere for the money to actually go. */
export function paymentsConfigured(): boolean {
  return getConfiguredAccounts().length > 0;
}

export function getAccountName(): string | null {
  return read("PAYMENT_ACCOUNT_NAME");
}

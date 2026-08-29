-- CreateEnum
CREATE TYPE "PaymentPurpose" AS ENUM ('SUBSCRIPTION', 'CREDITS');

-- AlterTable
ALTER TABLE "PaymentSubmission" ADD COLUMN     "creditsPurchased" INTEGER,
ADD COLUMN     "purpose" "PaymentPurpose" NOT NULL DEFAULT 'SUBSCRIPTION',
ALTER COLUMN "billingInterval" DROP NOT NULL;


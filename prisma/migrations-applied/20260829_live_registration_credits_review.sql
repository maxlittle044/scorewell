-- CreateEnum
CREATE TYPE "ReviewRequestStatus" AS ENUM ('PENDING', 'IN_REVIEW', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "LiveLessonRegistration" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contentItemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LiveLessonRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "delta" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewRequest" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "ReviewRequestStatus" NOT NULL DEFAULT 'PENDING',
    "turnaroundHours" INTEGER NOT NULL,
    "creditsCharged" INTEGER NOT NULL DEFAULT 0,
    "reviewerNotes" TEXT,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LiveLessonRegistration_contentItemId_idx" ON "LiveLessonRegistration"("contentItemId");

-- CreateIndex
CREATE UNIQUE INDEX "LiveLessonRegistration_userId_contentItemId_key" ON "LiveLessonRegistration"("userId", "contentItemId");

-- CreateIndex
CREATE INDEX "CreditTransaction_userId_createdAt_idx" ON "CreditTransaction"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewRequest_submissionId_key" ON "ReviewRequest"("submissionId");

-- CreateIndex
CREATE INDEX "ReviewRequest_userId_idx" ON "ReviewRequest"("userId");

-- CreateIndex
CREATE INDEX "ReviewRequest_status_idx" ON "ReviewRequest"("status");

-- AddForeignKey
ALTER TABLE "LiveLessonRegistration" ADD CONSTRAINT "LiveLessonRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiveLessonRegistration" ADD CONSTRAINT "LiveLessonRegistration_contentItemId_fkey" FOREIGN KEY ("contentItemId") REFERENCES "ContentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditTransaction" ADD CONSTRAINT "CreditTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewRequest" ADD CONSTRAINT "ReviewRequest_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewRequest" ADD CONSTRAINT "ReviewRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


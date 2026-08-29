-- CreateEnum
CREATE TYPE "SimulationStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'ABANDONED');

-- CreateTable
CREATE TABLE "SimulationAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sourceTestSet" TEXT NOT NULL,
    "status" "SimulationStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "listeningBand" DOUBLE PRECISION,
    "readingBand" DOUBLE PRECISION,
    "writingBand" DOUBLE PRECISION,
    "speakingBand" DOUBLE PRECISION,
    "overallBand" DOUBLE PRECISION,
    "listeningDetails" JSONB,
    "readingDetails" JSONB,
    "writingFeedback" JSONB,
    "speakingFeedback" JSONB,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "SimulationAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SimulationAttempt_userId_idx" ON "SimulationAttempt"("userId");

-- CreateIndex
CREATE INDEX "SimulationAttempt_sourceTestSet_idx" ON "SimulationAttempt"("sourceTestSet");

-- CreateIndex
CREATE INDEX "SimulationAttempt_status_idx" ON "SimulationAttempt"("status");

-- AddForeignKey
ALTER TABLE "SimulationAttempt" ADD CONSTRAINT "SimulationAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


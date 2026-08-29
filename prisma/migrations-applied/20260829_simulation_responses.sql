-- Captures what the learner produced in the two legs that carry no automatic band.
-- See the SimulationAttempt comments in prisma/schema.prisma.
ALTER TABLE "SimulationAttempt" ADD COLUMN     "speakingTranscript" TEXT,
ADD COLUMN     "writingResponse" TEXT;

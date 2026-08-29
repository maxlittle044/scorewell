-- Time spent on an attempt, backing the dashboard's total study time.
-- See the Progress.durationSeconds comment in prisma/schema.prisma.
ALTER TABLE "Progress" ADD COLUMN     "durationSeconds" INTEGER;

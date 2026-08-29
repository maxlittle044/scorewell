-- The band a learner is working towards, the goal behind the Learning Path.
-- See the User.targetBand comment in prisma/schema.prisma.
ALTER TABLE "User" ADD COLUMN     "targetBand" DOUBLE PRECISION;

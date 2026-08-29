-- CreateTable
CREATE TABLE "CourseLessonCompletion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseSlug" TEXT NOT NULL,
    "lessonIndex" INTEGER NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseLessonCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CourseLessonCompletion_userId_courseSlug_idx" ON "CourseLessonCompletion"("userId", "courseSlug");

-- CreateIndex
CREATE UNIQUE INDEX "CourseLessonCompletion_userId_courseSlug_lessonIndex_key" ON "CourseLessonCompletion"("userId", "courseSlug", "lessonIndex");

-- AddForeignKey
ALTER TABLE "CourseLessonCompletion" ADD CONSTRAINT "CourseLessonCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


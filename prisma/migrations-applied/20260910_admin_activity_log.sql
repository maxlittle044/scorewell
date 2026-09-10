CREATE TABLE IF NOT EXISTS "AdminActivityLog" (
  "id" TEXT NOT NULL,
  "adminId" TEXT,
  "adminEmail" TEXT NOT NULL,
  "action" TEXT NOT NULL,
  "entityType" TEXT NOT NULL,
  "entityId" TEXT,
  "summary" TEXT NOT NULL,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AdminActivityLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "AdminActivityLog_createdAt_idx"
  ON "AdminActivityLog" ("createdAt");
CREATE INDEX IF NOT EXISTS "AdminActivityLog_adminId_createdAt_idx"
  ON "AdminActivityLog" ("adminId", "createdAt");
CREATE INDEX IF NOT EXISTS "AdminActivityLog_entityType_entityId_idx"
  ON "AdminActivityLog" ("entityType", "entityId");
DO $$
BEGIN
  ALTER TABLE "AdminActivityLog"
    ADD CONSTRAINT "AdminActivityLog_adminId_fkey"
    FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
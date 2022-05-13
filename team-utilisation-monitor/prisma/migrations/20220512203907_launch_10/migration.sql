-- AlterTable
ALTER TABLE "person" ALTER COLUMN "company_id" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "project" ALTER COLUMN "owner_id" DROP NOT NULL;

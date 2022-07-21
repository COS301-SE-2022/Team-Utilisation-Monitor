-- AlterTable
ALTER TABLE "historic_utilisation" ALTER COLUMN "month" DROP NOT NULL;

-- AlterTable
ALTER TABLE "person" ALTER COLUMN "assigned_hours" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "weekly_hours" DROP NOT NULL;

/*
  Warnings:

  - You are about to drop the column `owner_id` on the `project` table. All the data in the column will be lost.
  - Added the required column `status` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Status" ADD VALUE 'ACTIVE';
ALTER TYPE "Status" ADD VALUE 'INACTIVE';

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_owner_id_fkey";

-- DropIndex
DROP INDEX "project_team_id_key";

-- AlterTable
ALTER TABLE "project" DROP COLUMN "owner_id",
ADD COLUMN     "status" "Status" NOT NULL;

-- AlterTable
ALTER TABLE "weeky_utilisation" ALTER COLUMN "week" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "utilisation" SET DEFAULT 0,
ALTER COLUMN "status" SET DEFAULT 'UNDER_UTILISED',
ALTER COLUMN "hours" SET DEFAULT 0;

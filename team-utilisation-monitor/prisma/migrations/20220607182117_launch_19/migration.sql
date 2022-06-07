/*
  Warnings:

  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[team_name]` on the table `team` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_company_id_fkey";

-- DropForeignKey
ALTER TABLE "person" DROP CONSTRAINT "person_admin_id_fkey";

-- AlterTable
ALTER TABLE "invites" ALTER COLUMN "created" DROP NOT NULL,
ALTER COLUMN "created" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "team" ALTER COLUMN "team_name" DROP DEFAULT;

-- DropTable
DROP TABLE "admins";

-- CreateIndex
CREATE UNIQUE INDEX "team_team_name_key" ON "team"("team_name");

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

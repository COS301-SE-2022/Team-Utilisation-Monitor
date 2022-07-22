/*
  Warnings:

  - You are about to drop the column `status` on the `project` table. All the data in the column will be lost.
  - You are about to drop the `company_utilisations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[team_id]` on the table `project` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "company_utilisations" DROP CONSTRAINT "company_utilisations_company_id_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_team_id_fkey";

-- AlterTable
ALTER TABLE "project" DROP COLUMN "status",
ALTER COLUMN "team_id" DROP NOT NULL;

-- DropTable
DROP TABLE "company_utilisations";

-- CreateIndex
CREATE UNIQUE INDEX "project_team_id_key" ON "project"("team_id");

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

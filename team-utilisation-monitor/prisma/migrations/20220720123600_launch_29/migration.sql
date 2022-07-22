/*
  Warnings:

  - Made the column `team_id` on table `project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_team_id_fkey";

-- AlterTable
ALTER TABLE "project" ALTER COLUMN "team_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[team_id]` on the table `project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "team_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "project_team_id_key" ON "project"("team_id");

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

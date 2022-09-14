/*
  Warnings:

  - The `month` column on the `historic_utilisation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Month" AS ENUM ('JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC');

-- AlterTable
ALTER TABLE "historic_utilisation" DROP COLUMN "month",
ADD COLUMN     "month" "Month";

-- AlterTable
ALTER TABLE "person" ADD COLUMN     "Project_Points" DOUBLE PRECISION DEFAULT 0;

-- CreateTable
CREATE TABLE "SkillsOnProjects" (
    "id" SERIAL NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "SkillsOnProjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillsOnTeams" (
    "id" SERIAL NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "team_id" INTEGER NOT NULL,

    CONSTRAINT "SkillsOnTeams_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SkillsOnProjects" ADD CONSTRAINT "SkillsOnProjects_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsOnProjects" ADD CONSTRAINT "SkillsOnProjects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsOnTeams" ADD CONSTRAINT "SkillsOnTeams_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsOnTeams" ADD CONSTRAINT "SkillsOnTeams_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

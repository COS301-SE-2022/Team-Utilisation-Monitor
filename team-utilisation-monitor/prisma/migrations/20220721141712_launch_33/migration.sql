/*
  Warnings:

  - You are about to drop the column `MonthlyAvg` on the `historic_utilisation` table. All the data in the column will be lost.
  - You are about to drop the column `team_id` on the `project` table. All the data in the column will be lost.
  - Made the column `assigned_hours` on table `person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weekly_hours` on table `person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `man_hours` on table `project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PersonOnSkills" DROP CONSTRAINT "PersonOnSkills_person_id_fkey";

-- DropForeignKey
ALTER TABLE "PersonOnSkills" DROP CONSTRAINT "PersonOnSkills_skill_id_fkey";

-- DropForeignKey
ALTER TABLE "invites" DROP CONSTRAINT "invites_company_id_fkey";

-- DropForeignKey
ALTER TABLE "person" DROP CONSTRAINT "person_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "person" DROP CONSTRAINT "person_company_id_fkey";

-- DropForeignKey
ALTER TABLE "person" DROP CONSTRAINT "person_project_id_fkey";

-- DropForeignKey
ALTER TABLE "person" DROP CONSTRAINT "person_team_id_fkey";

-- DropForeignKey
ALTER TABLE "position" DROP CONSTRAINT "position_person_id_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_team_id_fkey";

-- DropForeignKey
ALTER TABLE "team" DROP CONSTRAINT "team_company_id_fkey";

-- DropIndex
DROP INDEX "project_team_id_key";

-- AlterTable
ALTER TABLE "historic_utilisation" DROP COLUMN "MonthlyAvg",
ADD COLUMN     "monthy_avg" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "person" ALTER COLUMN "assigned_hours" SET NOT NULL,
ALTER COLUMN "assigned_hours" SET DEFAULT 0,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'UNDER_UTILISED',
ALTER COLUMN "weekly_hours" SET NOT NULL,
ALTER COLUMN "weekly_hours" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "project" DROP COLUMN "team_id",
ALTER COLUMN "man_hours" SET NOT NULL;

-- CreateTable
CREATE TABLE "TeamsOnProjects" (
    "id" SERIAL NOT NULL,
    "team_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "TeamsOnProjects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonOnSkills" ADD CONSTRAINT "PersonOnSkills_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonOnSkills" ADD CONSTRAINT "PersonOnSkills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position" ADD CONSTRAINT "position_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamsOnProjects" ADD CONSTRAINT "TeamsOnProjects_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamsOnProjects" ADD CONSTRAINT "TeamsOnProjects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

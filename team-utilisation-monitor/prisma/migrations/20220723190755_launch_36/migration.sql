/*
  Warnings:

  - You are about to drop the column `team_id` on the `person` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "person" DROP CONSTRAINT "person_team_id_fkey";

-- AlterTable
ALTER TABLE "person" DROP COLUMN "team_id";

-- CreateTable
CREATE TABLE "PersonOnTeams" (
    "id" SERIAL NOT NULL,
    "team_id" INTEGER NOT NULL,
    "person_id" INTEGER NOT NULL,

    CONSTRAINT "PersonOnTeams_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PersonOnTeams" ADD CONSTRAINT "PersonOnTeams_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonOnTeams" ADD CONSTRAINT "PersonOnTeams_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `person_id` on the `position` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "position" DROP CONSTRAINT "position_person_id_fkey";

-- DropIndex
DROP INDEX "position_person_id_key";

-- AlterTable
ALTER TABLE "position" DROP COLUMN "person_id";

-- CreateTable
CREATE TABLE "PersonsOnPositions" (
    "person_id" INTEGER NOT NULL,
    "position_id" INTEGER NOT NULL,

    CONSTRAINT "PersonsOnPositions_pkey" PRIMARY KEY ("person_id","position_id")
);

-- AddForeignKey
ALTER TABLE "PersonsOnPositions" ADD CONSTRAINT "PersonsOnPositions_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonsOnPositions" ADD CONSTRAINT "PersonsOnPositions_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

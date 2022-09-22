/*
  Warnings:

  - The primary key for the `PersonsOnPositions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[title]` on the table `position` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "PersonsOnPositions" DROP CONSTRAINT "PersonsOnPositions_position_id_fkey";

-- AlterTable
ALTER TABLE "PersonsOnPositions" DROP CONSTRAINT "PersonsOnPositions_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PersonsOnPositions_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "position_title_key" ON "position"("title");

-- AddForeignKey
ALTER TABLE "PersonsOnPositions" ADD CONSTRAINT "PersonsOnPositions_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "position"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `password` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `person_id` on the `skills` table. All the data in the column will be lost.
  - You are about to drop the column `skill_type` on the `skills` table. All the data in the column will be lost.
  - Added the required column `skill` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_person_id_fkey";

-- AlterTable
ALTER TABLE "person" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "skills" DROP COLUMN "person_id",
DROP COLUMN "skill_type",
ADD COLUMN     "skill" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PersonOnSkills" (
    "id" SERIAL NOT NULL,
    "person_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,

    CONSTRAINT "PersonOnSkills_pkey" PRIMARY KEY ("person_id","skill_id")
);

-- AddForeignKey
ALTER TABLE "PersonOnSkills" ADD CONSTRAINT "PersonOnSkills_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonOnSkills" ADD CONSTRAINT "PersonOnSkills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

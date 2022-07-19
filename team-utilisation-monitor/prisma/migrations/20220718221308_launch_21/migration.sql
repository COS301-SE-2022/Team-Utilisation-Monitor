/*
  Warnings:

  - A unique constraint covering the columns `[skill]` on the table `skills` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "skills_skill_key" ON "skills"("skill");

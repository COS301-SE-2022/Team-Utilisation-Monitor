/*
  Warnings:

  - A unique constraint covering the columns `[project_name]` on the table `project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "project_project_name_key" ON "project"("project_name");

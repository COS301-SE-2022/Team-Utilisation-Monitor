/*
  Warnings:

  - Made the column `role` on table `person` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "person" ALTER COLUMN "role" SET NOT NULL;

-- AlterTable
ALTER TABLE "position" ALTER COLUMN "title" SET DEFAULT E'newbie';

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "man_hours" INTEGER DEFAULT 0;

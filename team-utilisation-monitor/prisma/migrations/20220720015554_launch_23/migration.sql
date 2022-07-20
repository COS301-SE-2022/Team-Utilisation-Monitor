/*
  Warnings:

  - Added the required column `hours` to the `weeky_utilisation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "weeky_utilisation" ADD COLUMN     "hours" DOUBLE PRECISION NOT NULL;

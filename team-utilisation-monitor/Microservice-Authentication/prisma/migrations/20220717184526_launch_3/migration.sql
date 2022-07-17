/*
  Warnings:

  - Added the required column `name` to the `user_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `user_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_details" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL;

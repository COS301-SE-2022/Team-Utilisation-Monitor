/*
  Warnings:

  - You are about to drop the column `company_id` on the `project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_company_id_fkey";

-- AlterTable
ALTER TABLE "project" DROP COLUMN "company_id",
ADD COLUMN     "owner_id" INTEGER;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

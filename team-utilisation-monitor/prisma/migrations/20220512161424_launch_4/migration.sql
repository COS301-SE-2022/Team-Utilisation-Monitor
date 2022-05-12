/*
  Warnings:

  - A unique constraint covering the columns `[company_name]` on the table `company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[person_admin_id]` on the table `person` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_admin_id_fkey";

-- AlterTable
ALTER TABLE "person" ADD COLUMN     "person_admin_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "company_company_name_key" ON "company"("company_name");

-- CreateIndex
CREATE UNIQUE INDEX "person_person_admin_id_key" ON "person"("person_admin_id");

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_person_admin_id_fkey" FOREIGN KEY ("person_admin_id") REFERENCES "company"("admin_id") ON DELETE SET NULL ON UPDATE CASCADE;

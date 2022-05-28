/*
  Warnings:

  - You are about to drop the column `admin_id` on the `company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[company_name]` on the table `company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "company" DROP COLUMN "admin_id";

-- AlterTable
ALTER TABLE "person" ADD COLUMN     "admin_id" INTEGER;

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_company_name_key" ON "company"("company_name");

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `company_id` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `person_admin_id` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `position_id` on the `person` table. All the data in the column will be lost.
  - You are about to drop the `company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `position` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "person" DROP CONSTRAINT "person_company_id_fkey";

-- DropForeignKey
ALTER TABLE "person" DROP CONSTRAINT "person_position_id_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_person_id_fkey";

-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_person_id_fkey";

-- DropIndex
DROP INDEX "person_company_id_key";

-- DropIndex
DROP INDEX "person_position_id_key";

-- AlterTable
ALTER TABLE "person" DROP COLUMN "company_id",
DROP COLUMN "person_admin_id",
DROP COLUMN "position_id";

-- DropTable
DROP TABLE "company";

-- DropTable
DROP TABLE "position";

-- DropTable
DROP TABLE "project";

-- DropTable
DROP TABLE "skills";

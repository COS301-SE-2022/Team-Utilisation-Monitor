-- DropForeignKey
ALTER TABLE "person" DROP CONSTRAINT "person_company_id_fkey";

-- DropForeignKey
ALTER TABLE "person" DROP CONSTRAINT "person_project_id_fkey";

-- DropForeignKey
ALTER TABLE "position" DROP CONSTRAINT "position_person_id_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_person_id_fkey";

-- AlterTable
ALTER TABLE "person" ALTER COLUMN "company_id" DROP NOT NULL,
ALTER COLUMN "project_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position" ADD CONSTRAINT "position_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

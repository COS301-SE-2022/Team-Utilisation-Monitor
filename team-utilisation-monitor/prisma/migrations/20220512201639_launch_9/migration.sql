-- DropForeignKey
ALTER TABLE "person" DROP CONSTRAINT "person_company_id_fkey";

-- DropForeignKey
ALTER TABLE "position" DROP CONSTRAINT "position_person_id_fkey";

-- AlterTable
ALTER TABLE "company" ADD COLUMN     "admin_id" INTEGER;

-- AlterTable
ALTER TABLE "person" ADD COLUMN     "project_id" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "company_id" DROP DEFAULT;

-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "project_name" TEXT NOT NULL,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "skill_type" TEXT NOT NULL,
    "person_id" INTEGER NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position" ADD CONSTRAINT "position_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

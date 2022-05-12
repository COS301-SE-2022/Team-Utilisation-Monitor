-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_admin_id_fkey";

-- AlterTable
ALTER TABLE "company" ALTER COLUMN "admin_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "person" DROP CONSTRAINT "person_person_admin_id_fkey";

-- DropIndex
DROP INDEX "person_person_admin_id_key";

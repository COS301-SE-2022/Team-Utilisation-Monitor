-- DropForeignKey
ALTER TABLE "position" DROP CONSTRAINT "position_person_id_fkey";

-- AlterTable
ALTER TABLE "person" ADD COLUMN     "password" TEXT NOT NULL DEFAULT E'password';

-- AlterTable
ALTER TABLE "position" ALTER COLUMN "person_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "position" ADD CONSTRAINT "position_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

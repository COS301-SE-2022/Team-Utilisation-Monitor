-- AlterTable
ALTER TABLE "person" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

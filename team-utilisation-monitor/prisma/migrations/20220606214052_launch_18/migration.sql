-- AlterTable
ALTER TABLE "person" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "company_utilisations" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER,
    "month" TEXT,
    "average_utilisation" DOUBLE PRECISION,

    CONSTRAINT "company_utilisations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "company_utilisations" ADD CONSTRAINT "company_utilisations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

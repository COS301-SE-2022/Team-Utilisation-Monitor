-- AlterTable
ALTER TABLE "person" ADD COLUMN     "team_id" INTEGER;

-- CreateTable
CREATE TABLE "team" (
    "id" SERIAL NOT NULL,
    "team_name" TEXT NOT NULL DEFAULT E'New Team',
    "company_id" INTEGER,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

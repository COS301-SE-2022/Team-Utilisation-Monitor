-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UNDER_UTILISED', 'FAIRLY_UTILISED', 'HEAVILY_UTILISED', 'OVER_UTILISED');

-- CreateTable
CREATE TABLE "weeky_utilisation" (
    "id" SERIAL NOT NULL,
    "week" TIMESTAMP(3) NOT NULL,
    "person_id" INTEGER NOT NULL,
    "utilisation" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "weeky_utilisation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "weeky_utilisation_person_id_key" ON "weeky_utilisation"("person_id");

-- AddForeignKey
ALTER TABLE "weeky_utilisation" ADD CONSTRAINT "weeky_utilisation_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

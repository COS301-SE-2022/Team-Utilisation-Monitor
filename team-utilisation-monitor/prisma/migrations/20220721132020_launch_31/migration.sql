/*
  Warnings:

  - You are about to drop the `weeky_utilisation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assigned_hours` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekly_hours` to the `person` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "weeky_utilisation" DROP CONSTRAINT "weeky_utilisation_person_id_fkey";

-- AlterTable
ALTER TABLE "person" ADD COLUMN     "assigned_hours" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL,
ADD COLUMN     "weekly_hours" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "weeky_utilisation";

-- CreateTable
CREATE TABLE "historic_utilisation" (
    "id" SERIAL NOT NULL,
    "week1" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "week2" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "week3" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "week4" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "MonthlyAvg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "month" TEXT NOT NULL,
    "person_id" INTEGER NOT NULL,

    CONSTRAINT "historic_utilisation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "historic_utilisation" ADD CONSTRAINT "historic_utilisation_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

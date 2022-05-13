-- CreateTable
CREATE TABLE "position" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "person_id" INTEGER NOT NULL,

    CONSTRAINT "position_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "position_person_id_key" ON "position"("person_id");

-- AddForeignKey
ALTER TABLE "position" ADD CONSTRAINT "position_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

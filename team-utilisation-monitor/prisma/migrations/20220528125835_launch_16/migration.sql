-- AlterTable
ALTER TABLE "person" ADD COLUMN     "utilisation" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "invites" (
    "id" SERIAL NOT NULL,
    "invite_code" TEXT,
    "company_id" INTEGER,
    "created" TIMESTAMP(3) NOT NULL,
    "expire" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invites_invite_code_key" ON "invites"("invite_code");

-- CreateIndex
CREATE UNIQUE INDEX "invites_company_id_key" ON "invites"("company_id");

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

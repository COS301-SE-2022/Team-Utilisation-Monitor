/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `user_details` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_details_token_key" ON "user_details"("token");

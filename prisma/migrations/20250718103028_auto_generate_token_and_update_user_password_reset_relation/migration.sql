/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserPasswordReset` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserPasswordReset_userId_key" ON "UserPasswordReset"("userId");

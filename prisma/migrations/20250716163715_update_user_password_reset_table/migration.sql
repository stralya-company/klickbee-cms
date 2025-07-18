/*
  Warnings:

  - You are about to alter the column `token` on the `UserPasswordReset` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropForeignKey
ALTER TABLE "UserPasswordReset" DROP CONSTRAINT "UserPasswordReset_userId_fkey";

-- AlterTable
ALTER TABLE "UserPasswordReset" ADD COLUMN     "usedAt" TIMESTAMP(3),
ALTER COLUMN "token" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE INDEX "UserPasswordReset_userId_idx" ON "UserPasswordReset"("userId");

-- AddForeignKey
ALTER TABLE "UserPasswordReset" ADD CONSTRAINT "UserPasswordReset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

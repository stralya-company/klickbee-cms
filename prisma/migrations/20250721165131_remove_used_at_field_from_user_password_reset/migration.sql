/*
  Warnings:

  - You are about to drop the column `usedAt` on the `UserPasswordReset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserPasswordReset" DROP COLUMN "usedAt";

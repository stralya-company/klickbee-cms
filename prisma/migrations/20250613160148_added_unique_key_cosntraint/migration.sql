/*
  Warnings:

  - The primary key for the `Permission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Permission` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[roleId,action]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Permission_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_roleId_action_key" ON "Permission"("roleId", "action");

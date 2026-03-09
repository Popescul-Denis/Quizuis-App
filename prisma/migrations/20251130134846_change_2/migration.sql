/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "emailVerified",
DROP COLUMN "image",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT;

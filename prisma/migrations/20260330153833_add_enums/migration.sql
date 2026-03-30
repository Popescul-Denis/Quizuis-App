/*
  Warnings:

  - You are about to drop the column `quizCardId` on the `Quiz` table. All the data in the column will be lost.
  - Changed the type of `difficulty` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `difficulty` on the `QuizCard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `difficulty` on the `QuizResult` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('Usor', 'Mediu', 'Greu');

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "quizCardId",
DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL;

-- AlterTable
ALTER TABLE "QuizCard" DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL;

-- AlterTable
ALTER TABLE "QuizResult" DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL;

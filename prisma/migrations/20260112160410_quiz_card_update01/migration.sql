/*
  Warnings:

  - You are about to drop the column `description` on the `QuizCard` table. All the data in the column will be lost.
  - You are about to drop the column `quizCount` on the `QuizCard` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `QuizCard` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[quizPath]` on the table `QuizCard` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "QuizCard" DROP COLUMN "description",
DROP COLUMN "quizCount";

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_title_key" ON "Quiz"("title");

-- CreateIndex
CREATE UNIQUE INDEX "QuizCard_title_key" ON "QuizCard"("title");

-- CreateIndex
CREATE UNIQUE INDEX "QuizCard_quizPath_key" ON "QuizCard"("quizPath");

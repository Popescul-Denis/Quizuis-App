/*
  Warnings:

  - Added the required column `difficulty` to the `QuizResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentage` to the `QuizResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quizName` to the `QuizResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalQuestions` to the `QuizResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuizResult" ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "percentage" INTEGER NOT NULL,
ADD COLUMN     "quizName" TEXT NOT NULL,
ADD COLUMN     "totalQuestions" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "QuizResult_userId_idx" ON "QuizResult"("userId");

-- CreateIndex
CREATE INDEX "QuizResult_createdAt_idx" ON "QuizResult"("createdAt");

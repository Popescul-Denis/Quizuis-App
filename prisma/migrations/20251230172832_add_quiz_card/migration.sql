-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "quizCardId" TEXT;

-- CreateTable
CREATE TABLE "QuizCard" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quizCount" INTEGER NOT NULL,
    "difficulty" TEXT NOT NULL,
    "quizPath" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,

    CONSTRAINT "QuizCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuizCard_quizId_key" ON "QuizCard"("quizId");

-- AddForeignKey
ALTER TABLE "QuizCard" ADD CONSTRAINT "QuizCard_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizCard" ADD CONSTRAINT "QuizCard_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

import {Difficulty, QuestionType} from "@prisma/client";


export type QuizCardType = {
  id: string;
  title: string;
  difficulty: Difficulty;
  hasUserSolved: boolean;
  quizPath: string;
  authorId?: string;
  quizCount? : number;
  description? : string;
}

export type QuestionProps = {
  questionText: string;
  questionType: QuestionType;
  questionImg?: string;
  answer : string;
  options?: string[];
  feedbackCorect?: string;
  feedbackGresit?: string;
  onAnswerSubmit?: (isCorrect: boolean) => void;
  userAnswered?: boolean | null;
}

export type QuizType = {
  questions: QuestionProps[];
  onQuizComplete? : (score : number, total: number) => void;
}


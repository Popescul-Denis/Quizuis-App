import {Difficulty, QuestionType} from "@prisma/client";


export type QuizCardType = {
  id: string;
  title: string;
  difficulty: Difficulty;
  hasUserSolved: boolean;
  quizPagePath: string;
}

export type QuestionProps = {
  questionText: string;
  type: QuestionType;
  imgUrl?: string;
  correctAnswer : string | number;
  options?: string[];
  corectFeedback?: string;
  gresitFeedback?: string;
  onAnswerSubmit?: (isCorrect: boolean) => void;
  userAnswered?: boolean | null;
}

export type QuizType = {
  questions: QuestionProps[];
  onQuizComplete? : (score : number, total: number) => void;
}


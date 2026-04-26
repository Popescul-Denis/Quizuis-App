// Enum-urile pentru client - trebuie să matcheze valorile din Prisma
export type Difficulty = 'Usor' | 'Mediu' | 'Dificil';

export enum QuestionType {
  choice = "choice",
  text = "text"
}

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


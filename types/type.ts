export enum QuestionType {
  choice = "choice",
  text = "text",
}

export type QuizCardType = {
  id: number;
  title: string;
  difficulty: 'Usor' | 'Mediu' | 'Greu';
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


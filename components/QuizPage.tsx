import React, {useState, useEffect} from 'react'
import Quiz from './Quiz';
import { QuestionProps, QuizType, QuizCardType } from '@/types/type';
import {QuestionType, Difficulty} from '@prisma/client';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

type Props = {
  questions : {
    id: string,
    questionText: string,
    questionImg: string | null,
    questionType: QuestionType,
    answer: string,
    options: string[] | null,
    feedbackCorect: string,
    feedbackGresit: string,
  }[] | null | undefined;
  quizCard : {quizPath: string, quiz: {
      id: string, 
      title: string, 
      difficulty: Difficulty,
      questions: {
        id: string,
        questionText: string,
        questionImg: string | null,
        questionType: QuestionType,
        answer: string,
        options: string[] | null,
        feedbackCorect: string,
        feedbackGresit: string,
      }[] | null,
    } } | null | undefined;
}

const QuizPage = ({ questions, quizCard }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [questionsState, setQuestionsState] = useState<QuestionProps[] | null>(null);
  const [quizCardState, setQuizCardState] = useState<QuizCardType | null>(null);

  useEffect(() => {
    if (quizCard) {
      setQuizCardState({
        id: quizCard.quiz.id,
        title: quizCard.quiz.title,
        difficulty: quizCard.quiz.difficulty,
        hasUserSolved: false,
        quizPagePath: quizCard.quizPath,
      });
    }
  }, [quizCard]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/log-in?redirect=/' + quizCardState?.quizPagePath);
    }
  }, [status, router]);

  useEffect(() => {
    if (questions) {
      const formattedQuestions = questions.map(q => ({
        questionText: q.questionText,
        type: q.questionType,
        imgUrl: q.questionImg || undefined,
        correctAnswer: q.answer,
        options: q.options || undefined,
        corectFeedback: q.feedbackCorect,
        gresitFeedback: q.feedbackGresit,
      }));
      setQuestionsState(formattedQuestions);
    }
  }, [questions]);


  const handleQuizComplete = async (score: number, total: number) => {
    console.log(`Quiz completat: ${score}/${total}`);

    /*if (session?.user?.id) {
      try {
        await fetch('/api/quiz/results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: session.user.id,
            quizName: 'Mate 1',
            score,
            total,
            percentage: Math.round((score / total) * 100),
          }),
        });
      } catch (error) {
        console.error('Error saving quiz result:', error);
      }
    }
    */
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Se încarcă quiz-ul...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white"> Quiz - {quizCardState?.title}</h1>
          <p className="text-gray-300 mt-2">{questionsState?.length} întrebări • Fără limită de timp</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <Quiz 
          questions={questionsState ? questionsState : []}
          onQuizComplete={handleQuizComplete}
        />
      </div>

      <div className="mt-8 text-center text-gray-300 text-sm">
        <p>La final vei vedea scorul tău și procentajul de corectitudine.</p>
      </div>
    </div>
  )
}

export default QuizPage
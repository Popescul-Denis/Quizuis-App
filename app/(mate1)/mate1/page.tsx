'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Quiz from '@components/Quiz';
import QuizPage from '@components/QuizPage';
import { QuestionType, QuizCardType } from '@/types/type';

const Mate1Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/log-in?redirect=/mate1');
    }
  }, [status, router]);

  const quizQuestions = [
    {
      questionText: 'Care este rezultatul operației 15 + 27?',
      type: QuestionType.choice,
      correctAnswer: '42',
      options: ['40', '41', '42', '43'],
      corectFeedback: 'Corect! 15 + 27 = 42',
      gresitFeedback: 'Rezultatul corect este 42.',
    },
    {
      questionText: 'Dacă un pătrat are latura de 5 cm, care este aria sa?',
      type: QuestionType.choice,
      correctAnswer: '25 cm²',
      options: ['20 cm²', '25 cm²', '30 cm²', '35 cm²'],
      corectFeedback: 'Excelent! Aria pătratului = latură × latură = 5 × 5 = 25 cm²',
      gresitFeedback: 'Formula ariei pătratului este latură × latură.',
    },
    {
      questionText: 'Rezolvă ecuația: 3x - 7 = 14',
      type: QuestionType.text,
      correctAnswer: '7',
      corectFeedback: 'Perfect! 3x = 14 + 7 = 21, deci x = 21 / 3 = 7',
      gresitFeedback: 'Rezolvare: 3x = 14 + 7 = 21, deci x = 21 ÷ 3 = 7',
    },
    {
      questionText: 'Care este perimetrul unui triunghi cu laturile de 6 cm, 8 cm și 10 cm?',
      type: QuestionType.choice,
      correctAnswer: '24 cm',
      options: ['20 cm', '22 cm', '24 cm', '26 cm'],
      corectFeedback: 'Corect! Perimetrul = 6 + 8 + 10 = 24 cm',
      gresitFeedback: 'Perimetrul este suma tuturor laturilor: 6 + 8 + 10.',
    },
  ];

  const quizCard: QuizCardType = {
    id: 1,
    title: 'Quiz de Matematică',
    difficulty: 'Mediu',
    hasUserSolved: false,
    quizPagePath: 'mate1',
  };

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
      <QuizPage questions={quizQuestions} quizCard={quizCard} />
    </div>
  );
};

export default Mate1Page;
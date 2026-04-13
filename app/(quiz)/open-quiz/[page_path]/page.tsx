'use client'
import React, {useState, useEffect, use} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Quiz from '@components/Quiz';
import QuizPage from '@components/QuizPage';
import { QuizCardType, QuestionProps } from '@/types/type';
import {Difficulty, QuestionType} from '@prisma/client';

type Props = {}

const OpenQuiz = (props: Props) => {

  const {data: session, status} = useSession();
  const router = useRouter();
  const params = useParams();
  const pagePath = params.page_path as string;

  const [quizData, setQuizData] = useState<{quizCard?: QuizCardType, questions?: QuestionProps[], error? : string} | null>(null);

  useEffect(() => {
    if(status === 'unauthenticated'){
      router.push('/log-in');
    }
  }, [status , router]);

  useEffect(() => {
    const fetchQuizData = async () => {
      if (!pagePath) {
        console.error('pagePath is undefined, cannot fetch quiz data');
        setQuizData({ error: 'Path-ul quiz-ului lipsește' });
        return;
      }
      
      try {
        const res = await fetch(`/api/quiz/${encodeURIComponent(pagePath)}`, {
          method: 'GET',
        });
        
        if(!res.ok){
          console.error("Eroare la preluarea datelor quiz-ului:", res.statusText);
          setQuizData({ error: `Eroare HTTP: ${res.status}` });
          return;
        }

        const data = await res.json();
        if(data.error){
          setQuizData({ error: data.error });
          return;
        }
        setQuizData(data);
      } catch (error) {
        console.error("Eroare la preluarea datelor quiz-ului:", error);
        setQuizData({ error: 'Eroare la încărcarea quiz-ului.' });
      }
    };

    fetchQuizData();
  }, [pagePath]);

  if(status === 'loading'){
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Se încarcă quiz-ul...</p>
      </div>
    );
  }

  return (
    <div>
      <QuizPage questions={quizData?.questions} quizCard={quizData?.quizCard}/>
     </div>
  )
}

export default OpenQuiz
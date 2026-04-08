'use client'
import React, {useState} from 'react'
import { QuestionProps, QuizCardType } from '@/types/type';
import QuizPage from '@components/QuizPage'

type Props = {
  questionsSchemes? : [];
  questions: QuestionProps[] | null | undefined;
  quizCard: QuizCardType | null | undefined;
}

const PreviewQuiz = ({questions, quizCard}: Props) => {

  return (
    <div className='preview_quiz_container'>
      <QuizPage questions={questions} quizCard={quizCard}/>
    </div>
  )
}

export default PreviewQuiz
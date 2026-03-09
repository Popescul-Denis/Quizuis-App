'use client'
import React, {useState} from 'react'
import { QuestionProps, QuizCardType } from '@/types/type';
import QuizPage from '@components/QuizPage'

type Props = {
  questionsSchemes? : [];
  questions: QuestionProps[];
  quizCard: QuizCardType;
}

const PreviewQuiz = ({questions, quizCard}: Props) => {

  return (
    <div className='preview_quiz_container'>
      <QuizPage questions={questions} quizCard={quizCard}/>
    </div>
  )
}

export default PreviewQuiz
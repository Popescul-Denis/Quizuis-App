'use client';
import React, {useEffect, useState} from 'react'
import QuizCard from '@components/QuizCard';
import { QuizCardType } from '@/types/type';

type Props = {
  quizzes: QuizCardType[];
}

const QuizCardList = ({quizzes}: Props) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  if(quizzes.length ===0){
    return <div className='quiz_list_empty'>No quizzes available.</div>;
  }

  const handlePrev = () => {
    setCurrentIndex((prev) =>{
      if(prev === 0) return quizzes.length -1;
      return prev -1;
    });
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>{
      if(prev === quizzes.length -1) return 0;
      return prev +1;
    });
  }

  // Care card sa fie afisat

  const getCardClass = (index : number) => {
    if(index === currentIndex) return 'active';
    /*const diff = Math.abs(index - currentIndex);

    if(diff===1){
      return index < currentIndex ? 'prev' : 'next';
    }
    else if(diff===quizzes.length -1){
      return index < currentIndex ? 'next' : 'prev';
    }*/
    return 'hidden';
  }

  return (
    <div className="quiz_card_list_container">
      <div className="quiz_carousel_inner">
        <div className='quiz_carousel_wrapper'>
          <button 
            className="nav_arrow left_arrow"
            onClick={handlePrev}
            aria-label="Înapoi la quiz-ul anterior"
          >
            <svg className="arrow_icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="cards_display_container">
            {quizzes.map((quiz, index) => {

              const cardClass = getCardClass(index);

              if(cardClass === 'hidden') return null;

              return (<div 
                key={quiz.id}
                className={`quiz_card_wrapper ${cardClass}`}
                onClick={() => cardClass === 'active' ? null : setCurrentIndex(index)}
              >
                <QuizCard {...quiz}/>
              </div>)
            })}
          </div>

          <button 
            className="nav_arrow right_arrow"
            onClick={handleNext}
            aria-label="Înainte la următorul quiz"
          >
            <svg className="arrow_icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {quizzes.length > 1 && (
          <div className="dots_indicator">
            {quizzes.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active_dot' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Arată quiz-ul ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizCardList
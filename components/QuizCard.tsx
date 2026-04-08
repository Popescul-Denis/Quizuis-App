'use client';
import React, {useEffect, useState} from 'react'
import {useRouter} from "next/navigation";
import { QuizCardType } from '@/types/type';

const QuizCard = ({
  title,
  difficulty,
  hasUserSolved = false,
  quizPath,
}: QuizCardType) => {

  const [score, setScore] = useState<number | null>(null);
  const router = useRouter();

  /*useEffect(() => {
    const fetchUserScore = async () => {
      try{
        const response = await fetch('/api/quiz/results/score', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quizName: title,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setScore(data.highestScore);
        }
      }catch (error) {
        console.error('Error fetching user score:', error);
      }
    }

    if(hasUserSolved){
      fetchUserScore();
    }
  }, []);
  */


  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Navigate directly to the quiz page
    router.push(`/open-quiz/${quizPath}`);
  };

  return (
    <div className="quiz_card_container">
      <h2 className="nume" onClick={handleClick}>
        {title}
      </h2>
      <div className="tag_score">
        <h4 className="tags">{difficulty}</h4>
        {hasUserSolved &&<p className="score_card">{score !== null ? `Scor: ${score}` : ""}</p>}
      </div>
    </div>
  )
}

export default QuizCard
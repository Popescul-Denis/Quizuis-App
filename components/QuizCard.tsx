'use client';
import React, {useEffect, useState} from 'react'
import {useRouter} from "next/navigation";
import { QuizCardType } from '@/types/type';

const QuizCard = ({
  title,
  difficulty,
  hasUserSolved = false,
  quizPath,
  authorId,
  quizCount,
}: QuizCardType) => {

  const [score, setScore] = useState<number | null>(null);
  const router = useRouter();
  const [authorName, setAuthorName] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchUserNameById = async (id : string) => {
      try{
        const response = await fetch(`/api/user/id/${id}`, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setAuthorName(data.user.username);
          // Do something with the user data, e.g., set it in state
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    }

    if (authorId) {
      fetchUserNameById(authorId);
    }
  }, [authorId])

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
      <div>
        <p className="author">by {authorName ?? "N/A"} - {quizCount} întrebări</p>
      </div>
      <div className="tag_score">
        <h4 className="tags">{difficulty}</h4>
        {hasUserSolved &&<p className="score_card">{score !== null ? `Scor: ${score}` : ""}</p>}
      </div>
    </div>
  )
}

export default QuizCard
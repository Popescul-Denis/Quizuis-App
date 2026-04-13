'use client';
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import { QuizCardType, QuestionProps } from "@/types/type";
import {Difficulty, QuestionType} from "@prisma/client";
import QuizCard from "@components/QuizCard";
import QuizCardList from "@components/QuizCardList";

// import component from "@/components/component";

const Home = () => {

  const [quizzes, setQuizzes] = useState<QuizCardType[]>([]);

  useEffect(() => {
    const fetchQuizCards = async () => {
      try {
        const response = await fetch('/api/quiz-card', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          setQuizzes(data.quizCards);
        } else {
          console.error('Failed to fetch quiz cards');
        }
      } catch (error) {
        console.error('Error fetching quiz cards:', error);
      }
    };

    fetchQuizCards();
  }, []);

  return (
    <div className="min-h-screen">
      <QuizCardList quizzes={quizzes} />
    </div>
  );
}

export default Home;

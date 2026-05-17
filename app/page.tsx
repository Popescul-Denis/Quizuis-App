'use client';
import React, {useState, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import { QuizCardType, QuestionProps, Difficulty, QuestionType } from "@/types/type";
import QuizCard from "@components/QuizCard";
import QuizCardList from "@components/QuizCardList";

// import component from "@/components/component";

const Home = () => {

  const [quizzes, setQuizzes] = useState<QuizCardType[]>([]);
  const router = useRouter();
  const quizListRef = useRef<HTMLDivElement>(null);

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

  const scrollToQuizList = () => {
    if (quizListRef.current) {
      quizListRef.current.scrollIntoView({ behavior: 'smooth' , block: 'start' });
    }
  }

  return (
    <div className="min-h-screen">
      {/*  */}
      <div className="welcome_section">
        <h1 className="welcome_title text-4xl font-bold mb-4">Bine ai venit la Quizuis!</h1>
        <p className="welcome_description text-lg text-gray-600"><span className="font-bold text-2xl text_span" onClick={() => {router.push('/create-quiz')}}>Creaază</span> și <span className="font-bold text-2xl text_span" onClick={scrollToQuizList}>joacă</span> quiz-uri interesante din toată lumea!</p>
      </div>
      <div ref={quizListRef}>
        <QuizCardList quizzes={quizzes} />
      </div>
    </div>
  );
}

export default Home;

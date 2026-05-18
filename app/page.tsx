'use client';
import React, {useState, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import { QuizCardType, QuestionProps, Difficulty, QuestionType } from "@/types/type";
import QuizCard from "@components/QuizCard";
import QuizCardList from "@components/QuizCardList";
import SearchBar from "@components/inputs/SearchBar";
import {useSession} from 'next-auth/react'

// import component from "@/components/component";

const Home = () => {

  const [quizzes, setQuizzes] = useState<QuizCardType[]>([]);
  const router = useRouter();
  const quizListRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState('');
  const {data : session} = useSession();

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

  const filteredQuizzes = quizzes.filter(quiz => quiz.title.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div className="min-h-screen">
      {/*  */}
      <div className="welcome_section">
        <h1 className="welcome_title text-4xl font-bold mb-4">Bine ai venit la Quizuis!</h1>
        <p className="welcome_description text-lg text-gray-600"><span className="font-bold text-2xl text_span" onClick={() => {router.push('/create-quiz')}}>Creaază</span> și <span className="font-bold text-2xl text_span" onClick={scrollToQuizList}>joacă</span> quiz-uri interesante din toată lumea!</p>
      </div>

      {!session?.user && (
        <div className="how_to_start_section">
          <h2 className="how_to_start_title text-3xl font-bold mb-4">Cum sa incepi?</h2>
          <div className="flex flex-row">
            <div className="step_1">
              <p className="step_1_text text-lg text-white mb-2"><span className="font-bold text-xl">Pasul 1:</span> Creeaza un <span className="font-bold cursor-pointer text_span step" onClick={() => {router.push('/sign-up')}}>cont nou</span> sau <span className="font-bold cursor-pointer text_span step" onClick={() => {router.push('/log-in')}}>logheaza-te</span> cu unul existent</p>
            </div>
            <div className="step_2">
              <p className="step_2_text text-lg text-white mb-2"><span className="font-bold text-xl">Pasul 2:</span> Exploreaza multitudinea de quiz-uri disponibile si testeaza-ti cunostintele</p>
            </div>
          </div>
          <div className="step_3">
            <p className="step_3_text text-lg text-white mb-2"><span className="font-bold text-xl">Pasul 3:</span> Creeaza-ti propriile quiz-uri unice și împărtășește-le cu prietenii tăi!</p>
          </div>
          <div className="under_line"></div>
        </div>
      )}

      <div className="quizzes_section mt-10">
        <h2 className="quizzes_section_title text-3xl font-bold mb-4">Exploreaza quiz-urile noastre</h2>
        <div className="search_section">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
        </div>
        <div ref={quizListRef}>
          <QuizCardList quizzes={searchText !== '' ? filteredQuizzes : quizzes} />
        </div>
      </div>
    </div>
  );
}

export default Home;

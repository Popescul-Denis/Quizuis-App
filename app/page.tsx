'use client';
import React from "react";
import {useRouter} from "next/navigation";
import { QuizCardType, QuestionProps } from "@/types/type";
import {Difficulty, QuestionType} from "@prisma/client";
import QuizCard from "@components/QuizCard";
import QuizCardList from "@components/QuizCardList";

// import component from "@/components/component";

const Home = () => {

  const mockQuizzes = [
    {
      id: '1',
      title: 'Matematică - Baza',
      difficulty: Difficulty.Usor,
      hasUserSolved: false,
      quizPath: 'mate1',
    },
    {
      id: '2',
      title: 'Istorie România',
      difficulty: Difficulty.Mediu,
      hasUserSolved: false,
      quizPath: 'istorie',
    },
    {
      id: '3',
      title: 'Geografie Avansată',
      difficulty: Difficulty.Dificil,
      hasUserSolved: false,
      quizPath: 'geografie',
    },
    {
      id: '4',
      title: 'Biologie Ușoară',
      difficulty: Difficulty.Usor,
      hasUserSolved: false,
      quizPath: 'biologie',
    },
    {
      id: '5',
      title: 'Chimie Organică',
      difficulty: Difficulty.Dificil,
      hasUserSolved: false,
      quizPath: 'chimie',
    },
  ];

  return (
    <div className="min-h-screen">
      <QuizCardList quizzes={mockQuizzes} />
    </div>
  );
}

export default Home;

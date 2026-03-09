'use client';
import React from "react";
import {useRouter} from "next/navigation";
import QuizCard from "@components/QuizCard";
import QuizCardList from "@components/QuizCardList";

// import component from "@/components/component";

const Home = () => {

  const mockQuizzes = [
    {
      id: 1,
      title: 'Matematică - Baza',
      description: 'Testează-ți cunoștințele de bază în matematică cu întrebări de aritmetică și geometrie.',
      difficulty: 'Usor' as const,
      quizCount: 10,
      hasUserSolved: true,
      quizPagePath: 'mate1',
    },
    {
      id: 2,
      title: 'Istorie România',
      description: 'Întrebări despre istoria României de la începuturi până în prezent.',
      difficulty: 'Mediu' as const,
      quizCount: 15,
      hasUserSolved: false,
      quizPagePath: 'istorie',
    },
    {
      id: 3,
      title: 'Geografie Avansată',
      description: 'Capitali, râuri, munți și alte informații geografice din întreaga lume.',
      difficulty: 'Greu' as const,
      quizCount: 20,
      hasUserSolved: true,
      quizPagePath: 'geografie',
    },
    {
      id: 4,
      title: 'Biologie Ușoară',
      description: 'Noțiuni de bază de biologie pentru începători.',
      difficulty: 'Usor' as const,
      quizCount: 8,
      hasUserSolved: false,
      quizPagePath: 'biologie',
    },
    {
      id: 5,
      title: 'Chimie Organică',
      description: 'Testează cunoștințele tale de chimie organică.',
      difficulty: 'Greu' as const,
      quizCount: 12,
      hasUserSolved: true,
      quizPagePath: 'chimie',
    },
  ];

  return (
    <div className="min-h-screen">
      <QuizCardList quizzes={mockQuizzes} />
    </div>
  );
}

export default Home;

'use client'
import React, {useState, useEffect, use} from 'react'
import { useSession } from 'next-auth/react'
import {useRouter } from 'next/navigation'
import QuizCard from '@components/QuizCard'

type Props = {
  userName : string;
}

const ProfilePage = ({userName}: Props) => {

  const { data: session , status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<{user?: {id: string, email: string, username: string, quizzes: {id: string, title: string, difficulty: string, quizCard: {quizPath: string} | null}[]}, error?: string} | null>(null);

  //gaseste userul dupa userName

  useEffect(() => {
    if (!userName) return; // Nu face fetch daca nu avem username

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${encodeURIComponent(userName)}`, {
          method: 'GET',
        });

        if (!res.ok) {
          console.error("Eroare la preluarea datelor utilizatorului:", res.statusText);
          setUserData({ error: `Eroare HTTP: ${res.status}` });
          return;
        }

        const data = await res.json();

        if (data.error) {
          setUserData({ error: data.error });
          return;
        }

        setUserData(data);
        console.log("Datele utilizatorului:", data);
      } catch (error) {
        console.error("Eroare la preluarea datelor utilizatorului:", error);
        setUserData({ error: "Eroare de rețea" });
      }
    };

    fetchUser();
  }, [userName]);

  if(status === "loading"){
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Se încarcă pagina de profil...</p>
      </div>
    );
  }

  return (
    <div className='profile_container'>
      <p className='profile_header_text'>Profilul lui <span className='profile_username'>{userName}</span></p>
      {/* Sectiunea cu quiz-urile utilizatorului sub forma de carduri*/}
      <div className='profile_quizzes_section'>
        <p className='profile_quizzes_header'>QUIZ-URI</p>
        {userData ? (
          userData.error ? (
            <p className='error_message'>{userData.error}</p>
          ) : userData.user ? (
            userData.user.quizzes?.length > 0 ? (
              <div className='profile_quizzes_grid'>
                {userData.user.quizzes.map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    id={quiz.id}
                    title={quiz.title}
                    difficulty={quiz.difficulty as any}
                    hasUserSolved={false}
                    quizPath={quiz.quizCard?.quizPath || ''}
                  />
                ))}
              </div>
            ) : (
              <p className='profile_no_quizzes_text'>Acest utilizator nu a creat niciun quiz inca.</p>
            )
          ) : (
            <p>Date invalide primite de la server</p>
          )
        ) : (
          <p>Se încarcă quiz-urile...</p>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
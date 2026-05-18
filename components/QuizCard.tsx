'use client';
import React, {use, useEffect, useState} from 'react'
import {useRouter, usePathname} from "next/navigation";
import { useSession } from 'next-auth/react';
import { QuizCardType, QuestionProps } from '@/types/type';

const ConfirmDeleteModal = ({ onConfirm, onCancel }: { onConfirm: (e : React.MouseEvent<HTMLButtonElement>) => void; onCancel: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirmare ștergere</h2>
        <p className="mb-6">Ești sigur că vrei să ștergi acest quiz? Această acțiune nu poate fi anulată.</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Anulează
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Șterge
          </button>
        </div>
      </div>
    </div>
  );
}

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
  const { data: session } = useSession();
  const [quizData, setQuizData] = useState<{quizCard: QuizCardType | null, questions: QuestionProps[] | null} | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const pathname = usePathname();

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

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`/api/quiz/${quizPath}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          setQuizData(data);
        } else {
          console.error('Error fetching quiz data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, [quizPath]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Navigate directly to the quiz page
    router.push(`/open-quiz/${quizPath}`);
  };

  // when i press K, show quizData?.quizCard?.quizId in console
  /*useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {

      if (e.key === 'k' || e.key === 'K') {
        console.log(quizData?.quizCard?.quizId);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, [quizData]);*/

  const onConfirmDelete = async (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/quiz', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId: quizData?.quizCard?.quizId }),
      });

      if (response.ok) {
        console.log('Quiz deleted successfully');
        setShowDeleteModal(false);
        router.push('/'); // Redirect to home page after deletion
        //refresh the page to update the list of quizzes
        router.refresh();
      } else {
        console.error('Error deleting quiz:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  }

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Show confirmation modal before deleting
    setShowDeleteModal(true);
  };

  return (
    <div className="quiz_card_container">
      <h2 className="nume">
        {title}
      </h2>
      <div>
        <p className="author">by <span className='cursor-pointer' onClick={() => {
          router.push(`/profile/${authorName}`)
        }}>{authorName ?? "N/A"}</span> - {quizCount} întrebări</p>
      </div>
      <div className="tag_score">
        <h4 className="tags">{difficulty}</h4>
        {hasUserSolved &&<p className="score_card">{score !== null ? `Scor: ${score}` : ""}</p>}
      </div>
      <div className="button_container">
        <button className="play_button" onClick={handleClick}>Joacă</button>
        {authorId === session?.user.id && pathname !== '/' && (
          <button className="delete_button" onClick={handleDelete}>
            Sterge
          </button>
        )}
      </div>
      {showDeleteModal && <ConfirmDeleteModal onConfirm={onConfirmDelete} onCancel={() => setShowDeleteModal(false)} />}
    </div>
  )
}

export default QuizCard
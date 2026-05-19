'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const HelpPage = () => {

  const [isDownloading, setIsDownloading] = useState(false);
  const router = useRouter();

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const link = document.createElement('a');
      link.href = '/quiz-creare-tutorial.pdf';
      link.download = 'creare-quiz.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error occurred while downloading the file:', error);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className='help_page_container'>
      <h1 className='help_page_header'>Centru de Ajutor</h1>
      <p className='help_page_text'>Daca ai nevoie de ajutor, contacteaza-ne la adresa de email: <Link href="mailto:quizuis.support@gmail.com" className='text-blue-500'>quizuis.support@gmail.com</Link></p>
      <h2 className='help_page_front'>Tutorial cum sa creezi un quiz</h2>
      <p className='help_page_text'>Descarca ghidul complet in format PDF: <button onClick={handleDownload} disabled={isDownloading} className='text-blue-500 underline'>
        {isDownloading ? 'Se descarca...' : 'Descarca ghidul'}
      </button></p>
      <div className='other_questions'>
        <h2 className='help_page_front'>Alte intrebari intalnite frecvent:</h2>
        <p className='help_page_question'>1. Cum pot sterge un quiz?</p>
        <p className='help_page_answer'>Poti sterge quiz-ul din pagina de profil, fiecare quizCard avand un buton rosu de stergere.</p>
        <p className='help_page_question'>2. Cum pot edita un quiz?</p>
        <p className='help_page_answer'>Momentan nu este posibilă editarea quiz-urilor, dar această funcționalitate va fi adăugată într-o versiune viitoare.</p>
        <p className='help_page_question'>3. Cum pot vedea toti utilizatorii?</p>
        <p className='help_page_answer'>Poti vedea toti utilizatorii din pagina <span className='text-blue-500 cursor-pointer hover:{text-decoration: underline;}' onClick={() => router.push('/users')}>Utilizatori</span> accesibila din bara de navigare.</p>
      </div>
      <p className='help_page_text'>Daca ai alte intrebari, nu ezita sa ne contactezi la adresa de email: <Link href="mailto:quizuis.support@gmail.com" className='text-blue-500'>quizuis.support@gmail.com</Link></p>
    </div>
  )
}

export default HelpPage
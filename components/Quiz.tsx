import React, {useState, useEffect} from 'react'
import Question from './Question'
import { QuizType} from '@/types/type'


const Quiz = ({questions, onQuizComplete} : QuizType) => {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<(string | number | null)[]>(Array(questions.length).fill(null));
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(Array(questions.length).fill(false));

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswers(Array(questions.length).fill(null));
    setAnsweredQuestions(Array(questions.length).fill(false));
  }, [questions]);

  const handleAnswerSubmit = (isCorrect : boolean) => {
    if(isCorrect){
      setScore(prev => prev + 1);
    }

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = isCorrect ? questions[currentQuestionIndex].answer : 'wrong';
    setUserAnswers(newUserAnswers);

    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnsweredQuestions);

    setTimeout(() => {
      if(currentQuestionIndex + 1 < questions.length){
        setCurrentQuestionIndex(prev => prev + 1);
      }
      else{
        setQuizCompleted(true);
        if(onQuizComplete){
          onQuizComplete(score + (isCorrect ? 1 : 0), questions.length);
        }
      }
    }, 2000)
  }

  const handleNextQuestion = () => {
    if(currentQuestionIndex + 1 < questions.length){
      setCurrentQuestionIndex(prev => prev + 1);
    }
    else{
      setQuizCompleted(true);
      if(onQuizComplete){
        onQuizComplete(score, questions.length);
      }
    }
  }

  const handlePreviousQuestion = () => {
    if(currentQuestionIndex > 0){
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }

  const currentQuestion = questions[currentQuestionIndex];

  const canProceed = answeredQuestions[currentQuestionIndex] || false;

  //if there are no questions 
  if(questions.length === 0){
    return (
      <div className='quiz_container text-center justify-center items-center flex'>
        <p className='no_questions'>Nu exista intrebari in acest quiz.</p>
      </div>
    )
  }

  if(quizCompleted){
    return (
      <div className='quiz_completat'>
        <p className='score'>Scorul tau: {score} / {questions.length}</p>
        <p className='procentaj'>{score > 0 ? Math.round((score / questions.length) * 100) : 0}%</p>
        <button className="reia_quiz_button"
        onClick={() => {
          setCurrentQuestionIndex(0);
          setScore(0);
          setQuizCompleted(false);
          setUserAnswers(Array(questions.length).fill(null));
          setAnsweredQuestions(Array(questions.length).fill(false));
        }}>
          Reia Quiz-ul
        </button>
      </div>
    )
  }

  return (
    <div className='quiz_container'>
      {/* Progres bar */}
      <div className='progres_bar'>
        <div className='progres_filler' style={{width: `${((currentQuestionIndex+1) / questions.length) * 100}%`}}>
        </div>
        <p className='progres_text'>{currentQuestionIndex+1} / {questions.length}</p>
      </div>

      <div className='h-[50%]'>
        <Question 
          key={currentQuestionIndex}
          {...currentQuestion}
          userAnswered={userAnswers[currentQuestionIndex] !== null ? (userAnswers[currentQuestionIndex] === 'wrong' ? false : true) : null}
          onAnswerSubmit={handleAnswerSubmit}
        />
      </div>

      <div className='navigare_intrebari h-[20%]'>
        <button className='anterior_button' onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
          {'\u2190'} Intrebarea Anterioara
        </button>
        <button className='sari_peste_button' onClick={handleNextQuestion} disabled={!canProceed}>
          { currentQuestionIndex < questions.length -1 ? "\u2192 Intrebarea Urmatoare" : 'Finalizare Quiz' }
        </button>
      </div>

      <div className='indicatori_intrebari'>
        {questions.map((_, index) => (
          <button
            key={index}
            className={`indicator ${
              index === currentQuestionIndex ? 'activ' : ''
            } ${
              answeredQuestions[index] 
                ? (userAnswers[index] != 'wrong' ? 'corect' : 'gresit') 
                : 'necompletat'
            }`}
            disabled={!answeredQuestions[index]}
            onClick={() => setCurrentQuestionIndex(index)}
            title={`Întrebarea ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

    </div>
  )
}

export default Quiz
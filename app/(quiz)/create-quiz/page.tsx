'use client'
import React, {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter} from 'next/navigation'
import Image from 'next/image'
import { QuestionProps, QuizCardType } from '@/types/type'
import { QuestionType } from '@prisma/client'
import QuestionCreateChoice from '@components/QuestionCreate/QuestionCreateChoice'
import QuestionCreateText from '@components/QuestionCreate/QuestionCreateText'
import PreviewQuiz from '@components/PreviewQuiz/PreviewQuiz'
import Question from '@components/Question'
import { Difficulty } from '@prisma/client'

type Props = {}

type AddQuestionPopupProps = {
  onAddQuestion: (type: "multiple_choice" | "text" | "cancel") => void;
}

const AddQuestionPopup = ({ onAddQuestion }: AddQuestionPopupProps) => {
  return (
    <div className='add_question_popup fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='popup_content bg-gray-800 p-6 rounded shadow-lg'>
        <h2 className='popup_title text-xl font-bold mb-4'>Adauga o intrebare</h2>
        <button className='popup_button bg-blue-500 text-white px-4 py-2 rounded mr-2 cursor-pointer hover:bg-blue-600'
        onClick={() => onAddQuestion("multiple_choice")}>Intrebare cu alegere multipla</button>
        <button className='popup_button bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 mr-2'
        onClick={() => onAddQuestion("text")}>Intrebare cu raspuns text</button>
        <button className="popup_button bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600"
        onClick={() => onAddQuestion("cancel")}>Anuleaza</button>
      </div>
    </div>
  )
}

const CreateQuiz = (props: Props) => {

  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDifficulty, setQuizDifficulty] = useState<Difficulty>(Difficulty.Usor);
  const [questionsPreview, setQuestionsPreview] = useState<QuestionProps[]>([]);

  const [canSubmit, setCanSubmit] = useState(false);

  const quizCard : QuizCardType = {
    id: '1',
    title: quizTitle || "Quiz fara titlu",
    difficulty: quizDifficulty,
    hasUserSolved: false,
    quizPagePath: '/',
  };

  const handleChange = (index : number, e : React.ChangeEvent<HTMLInputElement>[], type : QuestionType) => {
    const adjustedIndex = index - 1; // Convert from 1-based (from UI) to 0-based (for array)
    questionsPreview[adjustedIndex] = {
      questionText: e[0]?.target.value,
      imgUrl: e[1]?.target.value as string | '',
      type: type,
      correctAnswer: type === QuestionType.choice ? e[6]?.target.value : e[2]?.target.value,
      ...(type === QuestionType.choice && {
        options: [
          e[2]?.target.value,
          e[3]?.target.value,
          e[4]?.target.value,
          e[5]?.target.value,
        ],
      }),
      corectFeedback: e[type === QuestionType.choice ? 7 : 3]?.target.value,
      gresitFeedback: e[type === QuestionType.choice ? 8 : 4]?.target.value,
    }
     setQuestionsPreview([...questionsPreview]);
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/log-in");
    }
  }, [status, router]);


  useEffect(() => {
      if(showPopup){
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
  }, [showPopup, questions])

  const addQuestion = (type: "multiple_choice" | "text" | "cancel") => {
    if(type === "cancel"){
      setShowPopup(false);
      return;
    }

    const newQuestion = {
      type: type,
      id: crypto.randomUUID(),
    }

    const emptyQuestionPreview: QuestionProps = {
      questionText: "",
      type: type === "multiple_choice" ? QuestionType.choice : QuestionType.text,
      imgUrl: "",
      correctAnswer: "",
      ...(type === "multiple_choice" && { options: ["", "", "", ""] }),
      corectFeedback: "",
      gresitFeedback: "",
    }

    setQuestions(prev => [...prev, newQuestion]);
    setQuestionsPreview(prev => [...prev, emptyQuestionPreview]);
    setShowPopup(false);
    
  }

  const deleteQuestion = (questionId : any) => {
    const index = questions.findIndex(q => q.id === questionId);
    setQuestions(questions.filter(q => q.id !== questionId));
    setQuestionsPreview(questionsPreview.filter((_, i) => i !== index));
  }

  const indexQuestion = (questionId : any) => {
    const index = questions.findIndex(q => q.id === questionId);
    return index + 1;
  }

  if(status === "loading"){
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Se încarcă pagina de creare quiz...</p>
      </div>
    );
  }

  return (
    <div className='create_quiz-section'>
      <h1 className="create_quiz-title">Creeaza un quiz</h1>
      <h2 className='text-2xl font-bold mb-4 text-center align-center'>Schema Quiz</h2>
      <form className='create_quiz-form'>
        <label className='create_quiz-label'>Titlu Quiz:</label>
        <input type="text" name="title" className="create_quiz-input_title" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)}/>
        <label className='create_quiz-label'>Dificultate:</label>
        <select name="difficulty" className="create_quiz-select" value={quizDifficulty} onChange={(e) => setQuizDifficulty(e.target.value as any)}>
          <option value="easy">Usor</option> 
          <option value="medium">Mediu</option>
          <option value="hard">Dificil</option>
        </select>
        <div className='flex w-full justify-between items-center mt-4'>
          <label className='create_quiz-label'>Intrebari: ( {questions.length} )</label>
          <button className='add_question_btn'
          type='button'
          onClick={() => setShowPopup(true)}>+ Adauga </button>
        </div>
        <div className='questions_container'>
          {questions.map((question) => {
            if(question.type === "multiple_choice"){
              return(<QuestionCreateChoice key={question.id} onDelete={() => deleteQuestion(question.id)} index={indexQuestion(question.id)} change={handleChange}
              questionData={questionsPreview[indexQuestion(question.id)-1]} setCanSubmit={setCanSubmit} />)
            } else {
              return <QuestionCreateText key={question.id} onDelete={() => deleteQuestion(question.id)} index={indexQuestion(question.id)} change={handleChange} 
              questionData={questionsPreview[indexQuestion(question.id) - 1]} setCanSubmit={setCanSubmit} />
            }
          })}
        </div>
        <button type="button" className="bg-blue-500 text-white p-2 rounded mt-20 cursor-pointer"
        onClick={async () => {
          // For now, just log the quiz data to the console. Later, this is where you would send the data to your backend to create the quiz.
          //first verify that all required fields are filled, if not, alert the user to fill them
          if(!canSubmit || quizTitle.trim() === "" || questions.length === 0 || questionsPreview.some(q => !q.questionText || !q.correctAnswer || (q.type === QuestionType.choice && (!q.options || q.options.length !== 4 || q.options.some((option: string) => option.trim() === ''))))){
            alert("Te rugam sa completezi toate campurile obligatorii pentru fiecare intrebare inainte de a crea quiz-ul.");
            return;
          }
          const quizData = {
            quizName: quizTitle,
            difficulty: quizDifficulty,
            questions: questionsPreview,
            authorId: session?.user?.id,
          }
          console.log("Quiz Data:", quizData);

          try {
            const res = await fetch('/api/quiz', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(quizData),
            });

            //alertam si utilizatorul daca exista deja un quiz cu acelasi nume
            if(res.status === 409){
              alert("Exista deja un quiz cu acest nume. Te rugam sa alegi un alt nume pentru quiz.");
              return;
            }
            else if (res.status !== 200) {
              alert("A aparut o eroare la crearea quiz-ului. Te rugam sa incerci din nou.");
              return;
            }
            
            const data = await res.json();
            console.log("Quiz created:", data);
          } catch (error) {
            console.error("Eroare la crearea quiz-ului:", error);
          }
        }}>Creeaza Quiz</button>
      </form>

      <div className='preview_quiz'>
        <h2 className='preview_title text-2xl font-bold mb-4'>Previzualizare Quiz</h2>
        <PreviewQuiz questions={questionsPreview} quizCard={quizCard}/>
      </div>
      {showPopup && <AddQuestionPopup onAddQuestion={addQuestion}/>}
    </div>
  )
}

export default CreateQuiz
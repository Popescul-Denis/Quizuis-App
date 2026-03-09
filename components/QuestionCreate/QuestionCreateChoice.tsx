'use client'
import { useState } from 'react'
import Image from 'next/image'
import { QuestionProps, QuestionType } from '@/types/type'

type QuestionCreateProps = {
  onDelete: () => void;
  index: number;
  change: (index : number, e : (React.ChangeEvent<HTMLInputElement>)[], type : QuestionType) => void;
  questionData?: QuestionProps;
  setCanSubmit: (canSubmit: boolean) => void;
}

const QuestionCreateChoice = ({onDelete, index, change, questionData, setCanSubmit}: QuestionCreateProps) => {

  const [imageUrl, setImageUrl] = useState("");
  const addedImage = imageUrl !== "";

  const [inputElements, setInputElements] = useState<React.ChangeEvent<HTMLInputElement>[]>([]);

  return (
    <div className='question_create-container border-b-2 border-gray-300 pb-4 mb-4 font-bold flex flex-col'>
      <h2 className='question_index'>{index}.</h2>
      <div className='label_input_container mt-2'>
        <label className='question_create-label'>Intrebare:</label>
        <input type="text" className='question_create-input' id='questionText' value={questionData?.questionText || ''} onChange={(e) => {
          inputElements[0] = e;
          setInputElements(inputElements);
          change(index, inputElements, QuestionType.choice);
        }}/>
      </div>
      <div className='label_input_container'>
        <label className='question_create-label'>Adauga imaginea suport intrebarii (* optional)</label>
        {!addedImage && <input type="text" className='question_create-input' accept="image/*"
        id='questionImage' value={questionData?.imgUrl || ''} onChange={(e) => {
          setImageUrl(e.target.value);
          inputElements[1] = e;
          setInputElements(inputElements);
          change(index, inputElements, QuestionType.choice);
        }}/>}
        {/*Preview Imagine */
        addedImage && <div className='image_preview_container mt-2'>
          <Image src={imageUrl || "/example-image.jpg"} width={200} height={150} alt="Example image" className='rounded-lg'/>
          <button className="delete_image_button" onClick={() => {
            setImageUrl("")
            inputElements[1] = {} as React.ChangeEvent<HTMLInputElement>;
            setInputElements(inputElements);
            change(index, inputElements, QuestionType.choice);
          }}>X</button>
        </div>
        }
      </div>
      <div className='label_input_container'>
        <label className='question_create-label'>Raspunsuri:</label>
        <div className='answers_container'>
          <input type="text" className='answer_input' placeholder='Raspuns 1' value={questionData?.options?.[0] ?? ''} onChange={(e) => {
            inputElements[2]=e;
            setInputElements(inputElements);
            change(index, inputElements, QuestionType.choice);
          }}/>
          <input type="text" className='answer_input' placeholder='Raspuns 2' value={questionData?.options?.[1] ?? ''} onChange={(e) => {
            inputElements[3]=e;
            setInputElements(inputElements);
            change(index, inputElements, QuestionType.choice);
          }}/>
          <input type="text" className='answer_input' placeholder='Raspuns 3' value={questionData?.options?.[2] ?? ''} onChange={(e) => {
            inputElements[4]=e;
            setInputElements(inputElements);
            change(index, inputElements, QuestionType.choice);
          }}/>
          <input type="text" className='answer_input' placeholder='Raspuns 4' value={questionData?.options?.[3] ?? ''} onChange={(e) => {
            inputElements[5]=e;
            setInputElements(inputElements);
            change(index, inputElements, QuestionType.choice);
          }}/>
        </div>
      </div>
      <div className="correct_answer_div gap-2 flex items-center">
        <label className='question_create-label'>Raspuns corect:</label>
        <input type='text' className='question_create-input' placeholder='Raspuns corect' value={questionData?.correctAnswer || ''} onChange={(e) => {
          inputElements[6]=e;
          setInputElements(inputElements);
          change(index, inputElements, QuestionType.choice);
        }}/>
      </div>
      <div className='label_input_container mt-2 flex'>
        <label className='question_create-label'>Feedback pentru raspuns corect:</label>
        <input type="text" className='question_create-input' value={questionData?.corectFeedback || ''} onChange={(e) => {
          inputElements[7] = e;
          setInputElements(inputElements);
          change(index, inputElements, QuestionType.choice);
        }}/>
        <label className='question_create-label'>Feedback pentru raspuns gresit:</label>
        <input type="text" className='question_create-input' value={questionData?.gresitFeedback || ''} onChange={(e) => {
          inputElements[8] = e;
          setInputElements(inputElements);
          change(index, inputElements, QuestionType.choice);
        }}/>
      </div>
      <Image src="/trash-bin.png" width={30} height={30} alt="Delete image" className='border-2 border-gray-400 rounded-2xl mt-2 hover:opacity-80 cursor-pointer '
      onClick={onDelete}></Image>
    </div>
  )
}

export default QuestionCreateChoice
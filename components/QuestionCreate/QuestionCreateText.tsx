'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { QuestionProps, QuestionType } from '@/types/type';

type QuestionCreateProps = {
  onDelete: () => void;
  index: number;
  change: (index : number, e : React.ChangeEvent<HTMLInputElement>[], type : QuestionType) => void;
  questionData?: QuestionProps;
  setCanSubmit: (canSubmit: boolean) => void;
}

const QuestionCreateText = ({onDelete, index, change, questionData , setCanSubmit}: QuestionCreateProps) => {

  const [imageUrl, setImageUrl] = useState("");
  const addedImage = imageUrl !== "";

  const [inputElements, setInputElements] = useState<React.ChangeEvent<HTMLInputElement>[]>([]);

  useEffect(() => {
    const hasEmptyRequiredField = !questionData?.questionText || !questionData?.answer;
    setCanSubmit(!hasEmptyRequiredField);
  }, [questionData, setCanSubmit]);

  return (
    <div className='question_create-container border-b-2 border-gray-300 pb-4 mb-4 font-bold flex flex-col'>
      <h2 className='question_index'>{index}.</h2>
      <div className='label_input_container mt-2'>
        <label className='question_create-label'>Intrebare:</label>
        <input type="text" className='question_create-input' id='questionText' value={questionData?.questionText || ""} onChange={(e) => {
          inputElements[0] = e;
          setInputElements(inputElements);
          change(index, inputElements, QuestionType.text);
        }}/>
      </div>
      <div className='label_input_container'>
        <label className='question_create-label'>Adauga imaginea suport intrebarii (* optional)</label>
        {<input type="url" className='question_create-input' id='questionImage'placeholder='Adauga url-ul imaginii dorite' value={questionData?.questionImg || ""} onChange={(e) => {
          setImageUrl(e.target.value);
          inputElements[1] = e;
          setInputElements(inputElements);
          change(index, inputElements, QuestionType.text);
        }}/>}
      </div>
      <div className='label_input_container'>
        <label className='question_create-label'>Raspunsuri:</label>
        <input type="text" className='question_create-input' id='correctAnswer' value={questionData?.answer || ""} onChange={(e) => {
          inputElements[2] = e;
          setInputElements(inputElements);
          change(index, inputElements, QuestionType.text);
        }} placeholder='Raspuns corect'/>
      </div>
      <div className='label_input_container mt-4'>
        <label className='question_create-label'>Feedback pentru raspuns corect:</label>
        <input type="text" className='question_create-input' id='corectFeedback' value={questionData?.feedbackCorect || ""} onChange={(e) => {
          inputElements[3] = e;
          setInputElements(inputElements);
          change(index, inputElements, QuestionType.text);
        }} placeholder='Feedback pentru raspuns corect'/>
        <label className='question_create-label'>Feedback pentru raspuns gresit:</label>
        <input type="text" className='question_create-input' id='gresitFeedback' value={questionData?.feedbackGresit || ""} onChange={(e) => {
          inputElements[4] = e;
          setInputElements(inputElements);
          change(index, inputElements, QuestionType.text);
        }} placeholder='Feedback pentru raspuns gresit'/>
      </div>
      <Image src="/trash-bin.png" width={30} height={30} alt="Delete image" className='border-2 border-gray-400 rounded-2xl mt-2 hover:opacity-80 cursor-pointer '
      onClick={onDelete}></Image>
    </div>
  )
}

export default QuestionCreateText
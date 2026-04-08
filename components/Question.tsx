'use client';
import {useRef, useState, useEffect} from 'react'
import { QuestionProps } from '@/types/type';
import { QuestionType } from '@prisma/client';
import Image from '@node_modules/next/image';


const Question: React.FC<QuestionProps> = (
  {questionText, questionImg, questionType, answer, options, feedbackCorect, feedbackGresit, onAnswerSubmit, userAnswered = null, }
) => {

  const [alegere, setAlegere] = useState<string | number>('');
  const [verificat, setVerificat] = useState<boolean>(false);

  useEffect(() => {
    setAlegere('');
    setVerificat(userAnswered !== null);
  }, [questionText,  userAnswered])

  const verifica = () => {
    if(!alegere || verificat) return;

    //answer poate fi cu litere mari sau mici, dar la verificare se va ignora acest aspect, deci convertim totul la litere mici pentru comparatie

    answer = typeof answer === 'string' ? answer.toLowerCase() : answer;
    const alegereComparare = typeof alegere === 'string' ? alegere.toLowerCase() : alegere;

    const isCorrect = alegereComparare === answer;
    setVerificat(true);

    if (onAnswerSubmit) {
      onAnswerSubmit(isCorrect);
    }
  }

  const setVariante = () => {
    if (questionType === QuestionType.choice && options) {
      return (
        <div className='variante_check'>
          {options.map((option, index) => { 

            let name= 'alegere';
            if(verificat == false){
              if(alegere===option) name+=' selected';
            }
            else{
              if(option===answer) name+=' complet';
              else if(option===alegere && option!==answer) name+=' incomplet';
              else name+=' disabled';
            }

            return (
              <button key={index} className={name}
              onClick={() =>{
                if(!verificat){setAlegere(option)}}
              }
              disabled={verificat}>{option}</button>
            )
          })}
        </div>
      );
    }
    else if (questionType === QuestionType.text) {
      return <input type="text" className="raspuns_input" placeholder="" required autoComplete='off'
      value={alegere as string} 
      onChange={(e)=> { 
        // Raspunsul poate fi si cu litere mari sau mici, dar la verificare se va ignora acest aspect, deci convertim totul la litere mici pentru comparatie
        e.target.value = e.target.value.toLowerCase();
        if(!verificat) setAlegere(e.target.value);
      }}
      disabled={verificat}/>;
    }
    return null;
  }

  const isUrlValid = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  }

  return(
    <div className="question_container">
      <p className="enunt_question">{questionText}</p>
      {questionImg && isUrlValid(questionImg) && <Image src={questionImg} alt="question image" className="imagine_question" width={160} height={160}/>}
      <div className="variante">
        {setVariante()}
        <button className="check" onClick={verifica} disabled={verificat || !alegere}>
          {verificat ? "Raspuns verificat" : "Verifica alegerea"}
        </button>
      </div>
      <div className="feedback_container">
        {userAnswered===true && (<p className="feedback_bun">{'\u2713'}  Corect! {feedbackCorect}</p>)}
        {userAnswered===false && (<p className="feedback_rau">{'\u2717'}  Oops, incorect! {feedbackGresit}</p>)}
      </div>
    </div>
  )
}

export default Question
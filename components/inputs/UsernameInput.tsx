import React from 'react'

type Props = {
  handleChange : (e: React.ChangeEvent<HTMLInputElement>) => void,
  isLoading?: boolean
}

const UsernameInput = ({handleChange, isLoading}: Props) => {
  return (
    <div className='w-[80vh]'>
      <p className='before_text var mb-10'>Adauga un nume de utilizator</p>
      <input type="text" placeholder='' onChange={handleChange} className='username_input' disabled={isLoading}/>
    </div>
  )
}

export default UsernameInput
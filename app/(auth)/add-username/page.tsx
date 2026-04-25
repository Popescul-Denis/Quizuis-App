'use client'
import React, {useState, useEffect} from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import Link from 'next/link';

import UsernameInput from '@components/inputs/UsernameInput';
import { stat } from 'fs';

const AddUsername = () => {

  const [username, setUsername] = useState<string>('');
  const router = useRouter();
  const {data: session, status} = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try{
      const res = await fetch('/api/user/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username}),
      });
      const data = await res.json();
      if(!res.ok){
        throw new Error(data.error || 'Eroare la actualizarea username-ului');
      }
      // Redirect la home dupa setarea username-ului
      router.push('/');
    }catch(error : unknown){
      console.error("Eroare la setarea username-ului:", error);
      setIsLoading(false);
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }

  // User can not leave the page untill he adds a username
  

  // Only allow session users to access this page

  if(status === 'loading'){
    return <p className='loading_text'>Loading...</p>
  }

  if(status !== 'authenticated' || !session?.user){
    return <p className='unauthenticated_text'>You need to be logged in to set a username. <Link href="/log-in" className='text-blue-500'>LOG IN</Link></p>
  }

  return (
    <div>
      <section className='add_username_section'>
        <section className="add_username_container">
          <UsernameInput handleChange={handleUsernameChange} isLoading={false} />
          <button className="add_username_button" onClick={handleSubmit}>Adaugă Username</button>
        </section>
      </section>
    </div>
  )
}

export default AddUsername
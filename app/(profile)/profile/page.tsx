'use client'
import React, {useEffect} from 'react'
import { useSession } from 'next-auth/react'
import {useRouter } from 'next/navigation'

type Props = {}

const Profil = (props: Props) => {

  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(() => {
    if(status !== 'authenticated' || !session?.user){
      router.push('/log-in');
    }
  }, [status, session , router])

  if(status !== 'authenticated'){
    return <p className='unauthenticated_text'>Nu esti autentificat</p>
  }

  return (
    <div>
      <h1 className='text-white'>Profil Page</h1>
      <p className='text-white'>{session?.user?.email}</p>
    </div>
  )
}

export default Profil
'use client'
import React, {useEffect, useState} from 'react'
import { useSession } from 'next-auth/react'
import {useRouter, useParams } from 'next/navigation'
import ProfilePage from '@components/Profile/ProfilePage';

const Profil = () => {
  const params = useParams();
  const  username  = params.username as string;

  const {data: session, status} = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if(status === 'unauthenticated'){
      router.push('/log-in');
    }
  }, [status , router]);

  return (
    <div>
      <ProfilePage userName={username} />
    </div>
  )
}

export default Profil
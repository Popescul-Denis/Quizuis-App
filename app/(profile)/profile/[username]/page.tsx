'use client'
import React, {useEffect, useState} from 'react'
import { useSession } from 'next-auth/react'
import {useRouter } from 'next/navigation'
import ProfilePage from '@components/Profile/ProfilePage';

type Props = {}

const Profil = (props: Props) => {

  const {data: session, status} = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(status === 'unauthenticated'){
      router.push('/log-in');
    }
  }, [status, session , router]);

  return (
    <div>
      <ProfilePage userName={session?.user.username || ""}/>
    </div>
  )
}

export default Profil
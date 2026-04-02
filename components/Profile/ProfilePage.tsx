'use client'
import React, {useState, useEffect, use} from 'react'
import { useSession } from 'next-auth/react'
import {useRouter } from 'next/navigation'

type Props = {
  userName : string;
}

const ProfilePage = ({userName}: Props) => {

  //gaseste userul dupa userName

  useEffect(() => {
    const fetchUser = async () => {
      //fetch user data using userName
      try {
        const res = await fetch('/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userName })
        });

        if (!res.ok) {
          console.error("Eroare la preluarea datelor utilizatorului:", res.statusText);
          return;
        }
        const data = await res.json();
        console.log("User data:", data);
      } catch (error) {
        console.error("Eroare la preluarea datelor utilizatorului:", error);
      }
    };

    fetchUser();
  }, [userName]);

  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage
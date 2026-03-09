'use client'
import React, {useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {signOut} from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'

type Props = {}

const SideBar = (props: Props) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const {data : session} = useSession();

  return (
    <div>
      <div className='sm:flex hidden h-screen'>
        <div className={`side_bar ${isOpen ? 'opened' : 'closed'}`}>
          <div className="toggle_container flex">
            <div className={`toggle_button text-white cursor-pointer`} 
            onClick={() =>{
              setIsOpen(!isOpen);
            }}>{isOpen ? '>' : '<'}
            </div>
          </div>
          {isOpen && <div className="side_bar_links">
            <Link href="/" className='sidebar_row'>
              <Image src="/icons/home.png" alt='Acasa' width={20} height={20}/> Acasa
            </Link>
            {session?.user ? (
              <>
                <Link href="/profile" className='sidebar_row'>
                  <Image src="/icons/account.png" alt='Profil' width={20} height={20}/> Profil
                </Link>
                <button className="sidebar_row"
                  onClick={() =>{ 
                    signOut();
                    router.push('/');
                  }}
                >
                  <Image src="/icons/log-out.png" alt='Log-out' width={20} height={20}/> Deconectare
                </button>
              </>
            ) : (
              <>
                <Link href="/log-in" className='sidebar_row'>
                  <Image src="/icons/log-in.png" alt='Log-in' width={20} height={20}/> Conectare
                </Link>
              </>
            )}
          </div>}
        </div>
      </div>
    </div>
  )
}

export default SideBar
'use client'
import React, {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {signOut} from 'next-auth/react'

const MobileMenu = () => {

  const {data : session} = useSession();
  return (
    <div className='mobile_menu'>
      <Link href="/" className='link_button'>
        Acasa
      </Link>
      <Link href={`/profile/${session?.user?.username}`} className='link_button'>
        Profil
      </Link>
      <Link href="/create-quiz" className='link_button'>
        Creeaza quiz
      </Link>
      <button className='link_button' onClick={() => {
        signOut();
      }}>
        Deconectare
      </button>
     </div>
  )
}

const Navbar : React.FC = () => {

  const {data : session} = useSession();
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className='nav_bar'>
      <div className="logo_title_auth">
        <div className="logo_title">
          <Image src="/LogoQuizuis.png" alt="logo" width={50} height={50} />
          <h2 id="title">Quizuis</h2>
        </div>
      </div>
      <div className="nav_buttons">
        {session?.user ? (
          <div className=''>
            <div className='hidden md:block'>
              <div className='nav_buttons'>
                <Link href="/" className='link_button'>
                  Acasa
                </Link>
                <Link href={`/profile/${session.user.username}`} className='link_button'>
                  Profil
                </Link>
                <Link href="/create-quiz" className='link_button'>
                  Creeaza quiz
                </Link>
                <button className='link_button' onClick={() => {
                  signOut();
                  router.push('/');
                }}>
                  Deconectare
                </button>
              </div>
            </div>
            <div className='block md:hidden show_mobile_menu'>
              <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <Image src="/icons/menu-icon.png" alt="Meniu" width={30} height={30} />
              </button>
              {showMobileMenu && <MobileMenu />}
            </div>
          </div>
        ) : (
          <>
            <Link href="/" className='link_button'>
              Acasa
            </Link>
            <Link href="/log-in" className='link_button'>
              Conectare
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
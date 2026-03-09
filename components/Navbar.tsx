import React from 'react'
import Image from 'next/image'

interface NavbarProps {}

const Navbar : React.FC<NavbarProps> = () => {
  return (
    <div className='nav_bar'>
      <div className="logo_title_auth">
        <div className="logo_title">
          <Image src="/LogoQuizuis.png" alt="logo" width={50} height={50} />
          <h2 id="title">Quizuis</h2>
        </div>
      </div>
    </div>
  )
}

export default Navbar
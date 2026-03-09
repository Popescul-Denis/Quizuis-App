import React from 'react'
import Link from '@node_modules/next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className="footer">
      <p className='right-0'>© 2025 Quizuis. Toate drepturile rezervate.</p>
      <div className="social">
        <Link href="https://www.facebook.com/profile.php?id=61580933716828&sk=about" target="_blank"><Image src="/facebook.png" width={30} height={30} alt="Facebook"/></Link>
        <Link href="https://www.instagram.com/popescu4709/" target="_blank"><Image src="/instagram.png" width={30} height={30} alt='Instagram'/></Link>
        <Link href="https://www.linkedin.com/in/denis-popescu-91b363386/" target="_blank"><Image src="/linkedin.png" width={30} height={30} alt='LinkedIn'/></Link>
      </div>
    </div>
  )
}


export default Footer
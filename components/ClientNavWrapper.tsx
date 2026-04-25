'use client';
import React from 'react'
import Navbar from './Navbar';
import {usePathname} from 'next/navigation';

const ClientNavWrapper = () => {

  const path=usePathname();

  return (
    <Navbar />
  )
}

export default ClientNavWrapper
'use client'
import React, { useState, useEffect, use, ButtonHTMLAttributes } from 'react'
import Image from 'next/image';
import validator from 'validator';

import PasswordInput from '@components/inputs/PasswordInput';
import EmailInput from '@components/inputs/EmailInput';

import {signIn, useSession, getProviders} from 'next-auth/react';
import type { ClientSafeProvider } from 'next-auth/react' // ← adaugă asta
import {useRouter} from 'next/navigation'

const SignIn = () => {
  const router = useRouter();
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const {data: session, status} = useSession();

  useEffect(() => {
    if(status === 'authenticated' && session?.user){
      router.push('/');
    }
  }, [status, session, router]);

  const handleSubmit = async (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if(!canSubmit) return;

    setIsLoading(true);
    setErrorMessage('');

    try{
      const result = await signIn('credentials', {
        email: email,
        password: password,
        callbackUrl: '/api/auth/check-username',
      });

    }catch(error : unknown){
      const message = error instanceof Error ? error.message : 'Eroare necunoscuta';
      setErrorMessage(message);
    }finally{
      setIsLoading(false);
    }


  }

  useEffect(() => {
    setCanSubmit(isEmailValid && password.length > 0);
  }, [isEmailValid, password]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(false);

    if(validator.isEmail(value)){
      // Email is valid
      setIsEmailValid(true);
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setPassword(value);
  }

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    }

    fetchProviders();
    console.log(providers);
  }, []);

  if(status === 'loading'){
    return <p className='loading_text'>Se incarca...</p>;
  }

  if(status === 'authenticated'){
    return <p className='authenticated_text'>Esti deja autentificat</p>;
  }

  return (
    <div>
      <section className="login_section">
        <section className="login_container">
          <p className='subtext'>L o g h e a z a - t e</p>

          {errorMessage && <p className='error_message bg-red-100 text-red-700 p-3 rounded mb-4'>{errorMessage}</p>}

          <form action="" className="login_form">
            <EmailInput handleChange={handleEmailChange} isLoading = {isLoading}/>

            <PasswordInput handleChange={handlePasswordChange} isLoading= {isLoading}/>

            <button 
            type='submit' 
            className={`login_button ${canSubmit ? '' : 'disabled'}`}
            onClick={handleSubmit}>
              Conectare
            </button>
          </form>

          <p className="or_tag">SAU</p>
          {providers?.google && (
            <button className="google_button"
            onClick={() => signIn('google', { callbackUrl: '/api/auth/check-username' })}>
              <Image src="/google-logo.png" alt="Google Logo" width={20} height={20} />
              <span className='google_text'>Logheaza-te cu Google</span>
            </button>
          )}

          <div>
            <p className='go_to_text'>Nu ai cont? 
              <a href="/sign-up" className='go_to_link'> Creeaza un cont nou</a>
            </p>
          </div>
        </section>
      </section>
    </div>
  )
}

export default SignIn
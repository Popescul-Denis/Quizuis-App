'use client'
import React, { useState, useEffect, use } from 'react'
import validator from 'validator';
import Image from 'next/image';

import PasswordInput from '@components/inputs/PasswordInput';
import EmailInput from '@components/inputs/EmailInput';

import {signIn, signOut, useSession, getProviders} from 'next-auth/react'
import {useRouter} from 'next/navigation'

type Props = {}

const PasswordStrengthIndicator = ({password} : {password: string}) => {
  const [strength, setStrength] = useState<number>(0);

  useEffect(() => {
    let tempStrength = 0;
    if(password.length >= 8) tempStrength += 1;
    if(/[A-Z]/.test(password)) tempStrength += 1;
    if(/[0-9]/.test(password)) tempStrength += 1;
    setStrength(tempStrength);
  }, [password]);

  return (
    <>
      <div className="password_indicator">
        <div className={`strength_bar ${strength >= 1 ? 'filled' : ''}`}></div>
        <div className={`strength_bar ${strength >= 2 ? 'filled' : ''}`}></div>
        <div className={`strength_bar ${strength >= 3 ? 'filled' : ''}`}></div>
      </div>
      <p className={`strength_text ${
        strength === 0 ? 'text-red-500' :
        strength === 1 ? 'text-orange-500' :
        strength === 2 ? 'text-yellow-500' :
        'text-green-500'
      }`}>
        {password.length === 0 && ''}
        {strength === 0 && password && 'Parola este foarte slaba'}
        {strength === 1 && 'Parola este slaba'}
        {strength === 2 && 'Parola este medie'}
        {strength === 3 && 'Parola este puternica'}
      </p>
    </>
  )
} 

const SignUP = (props: Props) => {
  const router = useRouter();
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [providers, setProviders] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const {data: session, status} = useSession();

  useEffect(() => {
    if(status === 'authenticated' && session?.user){
      router.push('/');
    }
  }, [status, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!canSubmit) return;

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try{
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      const data = await res.json();

      if(!res.ok){
        setErrorMessage(data.error || 'Eroare la crearea contului');
      }

      setSuccessMessage('Cont creat cu succes! Asteapta sa te autentificam...');

      // Autentificare automata dupa creare cont
      const signInRes = await signIn('credentials', {
        email: email,
        password: password,
        callbackUrl: '/api/auth/check-username',
      });

    }catch(error : any){
      setErrorMessage(error.message || 'Eroare la crearea contului');
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setCanSubmit(isEmailValid && isPasswordValid);
  }, [isEmailValid, isPasswordValid]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    setEmail(value);
    setIsEmailValid(false);

    // Validare email
    if(validator.isEmail(value)){
      setIsEmailValid(true);
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setPassword(value);
    setIsPasswordValid(false);

    if(value.length >= 8 &&
      /[A-Z]/.test(value) &&
      /[0-9]/.test(value))
    {
      setIsPasswordValid(true);
    }
  }

  useEffect(() => {

    // Providers pentru autentificare sociala

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
      <section className="signup_section">
        <section className='signup_container'>
          <p className='subtext'>I n s c r i e - t e</p>

          {successMessage && <p className='success_message bg-green-100 text-green-700 p-3 rounded mb-4'>{successMessage}</p>}

          {errorMessage && <p className='error_message bg-red-100 text-red-700 p-3 rounded mb-4'>{errorMessage}</p>}

          <form className="signup_form">
            <EmailInput handleChange={handleEmailChange} isLoading={isLoading}/>

            <PasswordInput handleChange={handlePasswordChange} isLoading={isLoading}/>

            <PasswordStrengthIndicator password={password} />

            <button type="submit" className={`signup_button ${canSubmit ? '' : ' disabled'}`}
            onClick={handleSubmit}>Continua</button>
          </form>

          <p className='or_tag'>SAU</p>

          {providers?.google && (
            <button className='google_button' onClick={() => {
              signIn('google', { callbackUrl: '/api/auth/check-username'});
            }}>
              <Image src="/google-logo.png" alt="Google Logo" width={20} height={20} />
              <span className='google_text'>Continua cu Google</span>
            </button>
          )}

          <div>
            <p className='go_to_text'>Ai deja un cont?
              <a href="/log-in" className='go_to_link'>Autentificare</a>
            </p>
          </div>
        </section>
      </section>
    </div>
  )

}

export default SignUP
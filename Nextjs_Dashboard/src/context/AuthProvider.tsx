'use server'
 
import { redirect } from 'next/navigation'
import { useUserDataContext } from './UserDataContext';
import { useEffect } from 'react';
 
export async function AuthNavigate({ children }: {children: React.ReactNode}) {
  const {userAttributes, setUserAttributes, userSession, setUserSession} = useUserDataContext();

  useEffect(() => {
      if(userAttributes)
        {
            redirect(`/`)
        }
  }, [])

  return <>
    {children}
  </>

}
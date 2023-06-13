import Center from '@/components/Center';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import MainBtn from '@/components/ui/MainBtn';

export default function AccountPage() {
  const { data: session } = useSession();

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  async function login() {
    await signIn('google', {
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  return (
    <>
      <Center>
        <h1>Account</h1>
        {session && (
          <MainBtn primary onClick={logout}>
            Logout
          </MainBtn>
        )}
        {!session && (
          <MainBtn primary onClick={login}>
            Login
          </MainBtn>
        )}
      </Center>
    </>
  );
}

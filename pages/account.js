import Center from '@/components/Center';
import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import MainBtn from '@/components/ui/MainBtn';
import styled from 'styled-components';
import WhiteBox from '@/components/ui/WhiteBox';
import { RevealWrapper } from 'next-reveal';
import Input from '@/components/ui/Input';
import { CityHolder } from './cart';

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;
`;

const initialState = {
  name: '',
  email: '',
  city: '',
  postalCode: '',
  streetAddress: '',
  country: '',
  cartProducts: '',
};

export default function AccountPage() {
  const { data: session } = useSession();
  const [user, setUser] = useState(initialState);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <h2>Wishlist</h2>
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={200}>
              <WhiteBox>
                <h2>Account details</h2>
                <Input
                  type='text'
                  placeholder='Name'
                  name='name'
                  value={user.name}
                  onChange={handleInputChange}
                />
                <Input
                  type='text'
                  placeholder='Email'
                  name='email'
                  value={user.email}
                  onChange={handleInputChange}
                />
                <CityHolder>
                  <Input
                    type='text'
                    placeholder='City'
                    name='city'
                    value={user.city}
                    onChange={handleInputChange}
                  />
                  <Input
                    type='text'
                    placeholder='Postal Code'
                    name='postalCode'
                    value={user.postalCode}
                    onChange={handleInputChange}
                  />
                </CityHolder>
                <Input
                  type='text'
                  placeholder='Street Address'
                  name='streetAddress'
                  value={user.streetAddress}
                  onChange={handleInputChange}
                />
                <Input
                  type='text'
                  placeholder='Country'
                  name='country'
                  value={user.country}
                  onChange={handleInputChange}
                />

                <MainBtn onClick={() => {}} block primary>
                  Save
                </MainBtn>
                <hr className='my-3' />
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
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColsWrapper>
      </Center>
    </>
  );
}

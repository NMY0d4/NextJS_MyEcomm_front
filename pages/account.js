import Center from '@/components/Center';
import React, { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import MainBtn from '@/components/ui/MainBtn';
import styled from 'styled-components';
import WhiteBox from '@/components/ui/WhiteBox';
import { RevealWrapper } from 'next-reveal';
import Input from '@/components/ui/Input';
import { CityHolder } from './cart';
import axios from 'axios';
import Loading from '@/components/ui/Loading';

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
};

export default function AccountPage() {
  const { data: session } = useSession();
  const [userAddress, setUserAddress] = useState(initialState);
  const [loaded, setLoaded] = useState(false);

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
    setUserAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function saveAddress() {
    await axios.put('/api/address', userAddress);
  }

  useEffect(() => {
    axios.get(`/api/address`).then((res) => {
      setUserAddress(res.data);
      setLoaded(true);
    });
  }, []);

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
                {!loaded && <Loading />}
                {loaded && (
                  <>
                    <h2>Account details</h2>
                    <Input
                      type='text'
                      placeholder='Name'
                      name='name'
                      value={userAddress.name}
                      onChange={handleInputChange}
                    />
                    <Input
                      type='text'
                      placeholder='Email'
                      name='email'
                      value={userAddress.email}
                      onChange={handleInputChange}
                    />
                    <CityHolder>
                      <Input
                        type='text'
                        placeholder='City'
                        name='city'
                        value={userAddress.city}
                        onChange={handleInputChange}
                      />
                      <Input
                        type='text'
                        placeholder='Postal Code'
                        name='postalCode'
                        value={userAddress.postalCode}
                        onChange={handleInputChange}
                      />
                    </CityHolder>
                    <Input
                      type='text'
                      placeholder='Street Address'
                      name='streetAddress'
                      value={userAddress.streetAddress}
                      onChange={handleInputChange}
                    />
                    <Input
                      type='text'
                      placeholder='Country'
                      name='country'
                      value={userAddress.country}
                      onChange={handleInputChange}
                    />

                    <MainBtn onClick={saveAddress} block primary>
                      Save
                    </MainBtn>
                    <hr className='my-3' />
                  </>
                )}
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

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
import ProductBox from '@/components/ProductBox';
import Tabs from '@/components/ui/Tabs';
import SingleOrder from '@/components/SingleOrder';
import { useSpring, animated } from '@react-spring/web';

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 40px 0;
  @media screen and (min-width: 900px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const initialState = {
  name: '',
  email: '',
  city: '',
  postalCode: '',
  streetAddress: '',
  country: '',
};

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  @media screen and (min-width: 520px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [userAddress, setUserAddress] = useState(initialState);
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishlistLoaded, setWishlistLoaded] = useState(true);
  const [orderLoaded, setOrderLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('Orders');
  const [orders, setOrders] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const springProps = useSpring({
    opacity: isSaved ? 0 : 1,
    transform: isSaved ? 'translateY(20px)' : 'translateY(0)',
    config: { duration: 500 },
  });

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  async function login() {
    try {
      await signIn('google', {
        callbackUrl: process.env.NEXT_PUBLIC_URL,
      });
    } catch (error) {
      console.error('Error during sign in:', error);
    }
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
    setIsSaved(true);
  }

  useEffect(() => {
    let timeout;
    if (isSaved) {
      timeout = setTimeout(() => {
        setIsSaved(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [isSaved]);

  useEffect(() => {
    if (!session) return;

    setAddressLoaded(false);
    setWishlistLoaded(false);
    setOrderLoaded(false);

    axios
      .get(`/api/address`)
      .then((res) => {
        res.data && setUserAddress(res.data);
        setAddressLoaded(true);
      })
      .catch((err) => console.error(err));
    axios
      .get('/api/wishlist')
      .then((res) => {
        setWishedProducts(res.data.map((wp) => wp.product));
        setWishlistLoaded(true);
      })
      .catch((err) => console.error(err));
    axios
      .get('/api/orders')
      .then((res) => {
        setOrders(res.data);
        setOrderLoaded(true);
      })
      .catch((err) => console.error(err));
  }, [session]);

  function productRemovedFromWhishlist(idToRemove) {
    setWishedProducts((products) => {
      return [...products.filter((p) => p._id.toString() !== idToRemove)];
    });
  }

  return (
    <>
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <Tabs
                  tabs={['Orders', 'Wishlist']}
                  active={activeTab}
                  onChange={setActiveTab}
                />
                {activeTab === 'Orders' && (
                  <>
                    {!orderLoaded && <Loading />}
                    {orderLoaded && (
                      <div>
                        {orders.length === 0 && <p>Login to see your orders</p>}
                        {orders.length > 0 &&
                          orders.map((o) => <SingleOrder key={o._id} {...o} />)}
                      </div>
                    )}
                  </>
                )}
                {activeTab === 'Wishlist' && (
                  <>
                    {!wishlistLoaded && <Loading />}
                    {wishlistLoaded && (
                      <WishedProductsGrid>
                        {wishedProducts.length > 0 &&
                          wishedProducts.map((wp) => (
                            <ProductBox
                              key={wp._id}
                              {...wp}
                              wished={true}
                              onRemoveFromWishlist={productRemovedFromWhishlist}
                            />
                          ))}
                        {wishedProducts.length === 0 && (
                          <>
                            <p className='col-span-2'>
                              {session
                                ? 'Your wishlist is empty'
                                : 'Login to add products to your wishlist'}
                            </p>
                          </>
                        )}
                      </WishedProductsGrid>
                    )}
                  </>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={200}>
              <WhiteBox>
                {!addressLoaded && <Loading />}
                {addressLoaded && session && (
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

                    <animated.div className='mb-5' style={springProps}>
                      <MainBtn onClick={saveAddress} block primary>
                        Save
                      </MainBtn>
                    </animated.div>

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
                    Login with Google
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

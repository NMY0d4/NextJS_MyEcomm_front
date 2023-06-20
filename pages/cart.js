// import Image from 'next/legacy/image';
import Center from '@/components/Center';
import MainBtn from '@/components/ui/MainBtn';
import Table from '@/components/ui/Table';
import { CartContext } from '@/store/CartContext';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsFillCartDashFill, BsFillCartPlusFill } from 'react-icons/bs';
import Input from '@/components/ui/Input';
import WhiteBox from '@/components/ui/WhiteBox';
import { RevealWrapper } from 'next-reveal';
import { useSession } from 'next-auth/react';

const Columnswrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 40px;

  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2) {
    text-align: right;
  }

  table tbody tr.subtotal td {
    padding: 15px 0;
  }

  table tbody tr.subtotal td:nth-child(2) {
    font-size: 1.3rem;
  }

  tr.total td {
    font-size: 1.3rem;
    font-weight: bold;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;
  }
`;

const ProductInfoCell = styled.td`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  background-color: var(--white);
  width: 70px;
  height: 70px;
  padding: 5px;
  margin-right: 1rem;
  box-shadow: var(--box-shadow);
  border-radius: 10px;
  overflow: hidden;
  @media screen and (min-width: 768px) {
    padding: 15px;
    width: 90px;
    height: 90px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const QuantityLabel = styled.span`
  padding: 3px;
  margin-right: 4px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 3px 0 1px;
  }
`;

export const CityHolder = styled.div`
  display: flex;
  gap: 5px;
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

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState(initialState);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shippingFee, setShippingFee] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios
        .post(`/api/cart`, { ids: cartProducts })
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      setProducts([]);
      localStorage.removeItem('cart');
    }
  }, [cartProducts]);

  useEffect(() => {
    //  ----- IF PAYMENT SUCCESS
    if (window.location.href.includes('success')) {
      setIsSuccess(true);
    }

    axios.get(`/api/settings?name=shippingFee`).then((res) => {
      setShippingFee(res.data.value);
    });
  }, []);

  useEffect(() => {
    if (!session) return;

    axios.get('/api/address').then((res) => {
      setCustomer(res.data);
    });
  }, [session]);

  useEffect(() => {
    if (isSuccess) {
      clearCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  function addOneThisProduct(id) {
    addProduct(id);
  }

  function removeOneThisProduct(id) {
    removeProduct(id);
    if (cartProducts.length === 0) {
      localStorage.removeItem('cart');
    }
  }

  function calculateproductsTotal() {
    let productsTotal = 0;

    products.forEach((product) => {
      const quantity = cartProducts.filter((id) => id === product._id).length;
      productsTotal += quantity * product.price;
    });

    return productsTotal;
  }
  // ------------- PAYMENT FUNCTION -----------------
  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      ...customer,
      cartProducts,
    });
    setCustomer(initialState);
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (isSuccess) {
    return (
      <>
        <Center>
          <Columnswrapper>
            <WhiteBox>
              <h1 className='mb-4'>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </WhiteBox>
          </Columnswrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Center>
        <Columnswrapper>
          <RevealWrapper delay={0}>
            <WhiteBox>
              <h2>Cart</h2>
              {!products?.length ? (
                <div>Your cart is empty</div>
              ) : (
                <>
                  <Table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id}>
                          {/* ---------- INFOS ------------ */}

                          <ProductInfoCell>
                            <ProductImageBox>
                              <ImageWrapper>
                                <img
                                  src={product.images[0]}
                                  alt={product.productName}
                                  className='object-contain'
                                />
                              </ImageWrapper>
                            </ProductImageBox>
                            {product.productName}
                          </ProductInfoCell>

                          {/* ---------- QUANTITY ------------ */}
                          <td className='text-center'>
                            <MainBtn
                              onClick={() => removeOneThisProduct(product._id)}
                            >
                              <BsFillCartDashFill
                                style={{
                                  transform: 'scaleX(-1)',
                                }}
                              />
                            </MainBtn>
                            <QuantityLabel>
                              {
                                cartProducts.filter((id) => id === product._id)
                                  .length
                              }
                            </QuantityLabel>
                            <MainBtn
                              onClick={() => addOneThisProduct(product._id)}
                            >
                              <BsFillCartPlusFill />
                            </MainBtn>
                          </td>
                          {/* ---------- PRICE ------------ */}

                          <td>
                            $
                            {cartProducts.filter((id) => id === product._id)
                              .length * product.price}
                          </td>
                        </tr>
                      ))}
                      <tr className='subtotal'>
                        <td colSpan={2}>Products</td>
                        <td>${calculateproductsTotal()}</td>
                      </tr>
                      <tr className='subtotal'>
                        <td colSpan={2}>Shipping</td>
                        <td>${shippingFee}</td>
                      </tr>
                      <tr className='subtotal total'>
                        <td colSpan={2}>Total</td>
                        <td>
                          ${calculateproductsTotal() + (+shippingFee || 0)}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              )}
            </WhiteBox>
          </RevealWrapper>

          {/* ---------- PAYMENT BOX ------------ */}
          {!!cartProducts?.length && (
            <RevealWrapper delay={200}>
              <WhiteBox>
                <h2>Order information</h2>

                <Input
                  type='text'
                  placeholder='Name'
                  name='name'
                  value={customer.name}
                  onChange={handleInputChange}
                />
                <Input
                  type='text'
                  placeholder='Email'
                  name='email'
                  value={customer.email}
                  onChange={handleInputChange}
                />
                <CityHolder>
                  <Input
                    type='text'
                    placeholder='City'
                    name='city'
                    value={customer.city}
                    onChange={handleInputChange}
                  />
                  <Input
                    type='text'
                    placeholder='Postal Code'
                    name='postalCode'
                    value={customer.postalCode}
                    onChange={handleInputChange}
                  />
                </CityHolder>
                <Input
                  type='text'
                  placeholder='Street Address'
                  name='streetAddress'
                  value={customer.streetAddress}
                  onChange={handleInputChange}
                />
                <Input
                  type='text'
                  placeholder='Country'
                  name='country'
                  value={customer.country}
                  onChange={handleInputChange}
                />

                <MainBtn onClick={goToPayment} block primary>
                  Continue to payment
                </MainBtn>
              </WhiteBox>
            </RevealWrapper>
          )}
        </Columnswrapper>
      </Center>
    </>
  );
}

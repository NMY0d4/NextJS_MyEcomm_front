import Center from '@/components/Center';
import MainBtn from '@/components/ui/MainBtn';
import Table from '@/components/ui/Table';
import { CartContext } from '@/store/CartContext';
import axios from 'axios';
import Image from 'next/legacy/image';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsFillCartDashFill, BsFillCartPlusFill } from 'react-icons/bs';

const Columnswrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: var(--white);
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  background-color: var(--white);
  width: 90px;
  height: 90px;
  padding: 15px;
  margin-right: 1rem;
  box-shadow: var(--box-shadow);
  border-radius: 10px;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const QuantityLAbel = styled.span`
  padding: 0 4px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [products, setProducts] = useState([]);

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
    }
  }, [cartProducts]);

  function addOneThisProduct(id) {
    addProduct(id);
  }

  function removeOneThisProduct(id) {
    removeProduct(id);
  }

  function calculateTotalPrice() {
    let totalPrice = 0;

    products.forEach((product) => {
      const quantity = cartProducts.filter((id) => id === product._id).length;
      totalPrice += quantity * product.price;
    });

    return totalPrice;
  }

  const totalPrice = calculateTotalPrice();

  return (
    <>
      <Center>
        <Columnswrapper>
          <Box>
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
                              <Image
                                src={product.images[0]}
                                alt={product.productName}
                                layout='fill'
                                objectFit='contain'
                                priority
                              />
                            </ImageWrapper>
                          </ProductImageBox>
                          {product.productName}
                        </ProductInfoCell>

                        {/* ---------- QUANTITY ------------ */}
                        <td>
                          <MainBtn
                            onClick={() => removeOneThisProduct(product._id)}
                          >
                            <BsFillCartDashFill
                              style={{
                                transform: 'scaleX(-1)',
                              }}
                            />
                          </MainBtn>
                          <QuantityLAbel>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </QuantityLAbel>
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
                    <tr>
                      <td></td>
                      <td></td>
                      <td>${totalPrice}</td>
                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </Box>
          {/* ---------- PAYMENT BOX ------------ */}
          {!!cartProducts?.length && (
            <Box>
              <h2>Order information</h2>
              <input type='text' placeholder='address' />
              <input type='text' placeholder='address2' />
              <MainBtn block primary>
                Continue to payment
              </MainBtn>
            </Box>
          )}
        </Columnswrapper>
      </Center>
    </>
  );
}

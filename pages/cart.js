import Center from '@/components/Center';
import MainBtn from '@/components/ui/MainBtn';
import Table from '@/components/ui/Table';
import { CartContext } from '@/store/CartContext';
import axios from 'axios';
import Image from 'next/legacy/image';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

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

export default function CartPage() {
  const { cartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post(`/api/cart`, { ids: cartProducts }).then((res) => {
        setProducts(res.data);
      });
    }
  }, [cartProducts]);

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
                        <td>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </td>
                        <td>
                          $
                          {cartProducts.filter((id) => id === product._id)
                            .length * product.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </Box>
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

import Center from '@/components/Center';
import MainBtn from '@/components/ui/MainBtn';
import { CartContext } from '@/store/CartContext';
import axios from 'axios';
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
                <table>
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
                        <td>{product.productName}</td>
                        <td>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </td>
                        <td>Price</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

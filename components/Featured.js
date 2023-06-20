import React, { useContext, useState } from 'react';
import Center from './Center';
import styled from 'styled-components';
// import Image from 'next/legacy/image';
import MainBtn from './ui/MainBtn';
import ButtonLink from './ui/ButtonLink';
import CartIcon from './icons/CartIcon';
import { RevealWrapper } from 'next-reveal';
import { CartContext } from '@/store/CartContext';

const Bg = styled.div`
  background-color: var(--primaryLight);
  padding: 50px 0;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  img {
    max-width: 100%;
  }
  div:nth-child(1) {
    order: 2;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 0.9fr 1.1fr;
    div:nth-child(1) {
      order: 0;
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;

  justify-content: center;
`;

const Desc = styled.p`
  font-size: 0.8rem;
  padding: 0.5rem;
`;

const Column = styled.div`
  min-height: 40vh;
  display: flex;
  align-items: center;
`;

const ContentWrapper = styled.div`
  * {
    text-align: center;
  }
`;

export default function Featured({ product }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addProduct } = useContext(CartContext);

  function addFeaturedToCart() {
    setIsAddingToCart(true);
    addProduct(product._id);
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 800);
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <ContentWrapper>
              <RevealWrapper origin={'left'} delay={300}>
                <h1>{product.productName}</h1>
                <Desc>{product.description}</Desc>
                <ButtonsWrapper>
                  <ButtonLink
                    href={`/products/${product._id}`}
                    white={1}
                    outline={1}
                  >
                    Read More
                  </ButtonLink>
                  <MainBtn
                    primary
                    onClick={addFeaturedToCart}
                    disabled={isAddingToCart}
                    fixedSize
                    style={{
                      backgroundColor: isAddingToCart
                        ? 'var(--grayLight)'
                        : 'var(--primary)',
                      color: isAddingToCart ? 'var(--grayDark)' : 'white',
                    }}
                  >
                    {isAddingToCart ? (
                      'Adding...'
                    ) : (
                      <>
                        <CartIcon /> Add to cart
                      </>
                    )}
                  </MainBtn>
                </ButtonsWrapper>
              </RevealWrapper>
            </ContentWrapper>
          </Column>
          <Column>
            <RevealWrapper
              delay={300}
              className='relative rounded-lg overflow-hidden w-full h-full'
            >
              <img
                src={product.images[0]}
                alt={`photo${product.productName}`}
                className='object-contain'
              />
            </RevealWrapper>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}

import React, { useContext } from 'react';
import Center from './Center';
import styled from 'styled-components';
import Image from 'next/legacy/image';
import MainBtn from './ui/MainBtn';
import ButtonLink from './ui/ButtonLink';
import CartIcon from './icons/CartCart';
import { CartContext } from '@/store/CartContext';

const Bg = styled.div`
  background-color: var(--primaryLight);
  padding: 50px 0;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  min-height: 25vh;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 20px;
  img {
    max-width: 100%;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
`;

const Desc = styled.p`
  font-size: 0.8rem;
  padding: 0.5rem;
`;

const Column = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
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
                <MainBtn primary onClick={addFeaturedToCart}>
                  <CartIcon />
                  Add to cart
                </MainBtn>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column className='relative'>
            <Image
              src={product.images[0]}
              alt='photo Macbook pro'
              layout='fill'
              objectFit='contain'
              priority
            />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}

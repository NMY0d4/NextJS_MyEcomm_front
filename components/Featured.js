import React from 'react';
import Center from './Center';
import styled from 'styled-components';
import Image from 'next/legacy/image';
import MainBtn from './ui/MainBtn';

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

const Desc = styled.p`
  font-size: 0.8rem;
  padding: 0.5rem;
`;

const Column = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export default function Featured() {
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <h1>Pro anywhere</h1>
              <Desc>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas qui sunt recusandae tenetur dolorem perferendis
                repellat repudiandae impedit ratione illum fugiat esse
                aspernatur ad delectus atque neque velit, eligendi debitis!
              </Desc>
              <MainBtn white outline size='l'>
                Read More
              </MainBtn>
              <MainBtn primary size='l'>
                Add to cart
              </MainBtn>
            </div>
          </Column>
          <Column className='relative'>
            <Image
              src='https://nextjs-gmweb-ecommerce.s3.amazonaws.com/1685551271157/3a5a1527-4931-46f3-a960-2b9e8749e7a0.png'
              alt='photo Macbook pro'
              layout='fill'
              objectFit='contain'
            />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}

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
              <ButtonsWrapper>
                <MainBtn white outline>
                  Read More
                </MainBtn>
                <MainBtn primary>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z' />
                  </svg>
                  Add to cart
                </MainBtn>
              </ButtonsWrapper>
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

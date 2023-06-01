import React from 'react';
import Center from './Center';
import styled from 'styled-components';
import Image from 'next/legacy/image';

const Bg = styled.div`
  background-color: var(--primaryLight);
  padding: 50px 0;
`;

const Wrapper = styled.div`
  display: grid;
  min-height: 20vh;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 30px;
  img {
    max-width: 100%;
  }
`;

const Desc = styled.p`
  font-size: 0.8rem;
  padding-top: 0.5rem;
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
        <Wrapper>
          <Column>
            <div>
              <h1>Pro anywhere</h1>
              <Desc>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas qui sunt recusandae tenetur dolorem perferendis
                repellat repudiandae impedit ratione illum fugiat esse
                aspernatur ad delectus atque neque velit, eligendi debitis!
              </Desc>
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
        </Wrapper>
      </Center>
    </Bg>
  );
}

import Center from '@/components/Center';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5rem;
`;

export default function products({ products }) {
  return (
    <>
      <Center>
        <Title className='p-8'>All products</Title>
        <div>{products.length}</div>
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

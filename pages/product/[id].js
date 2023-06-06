import Center from '@/components/Center';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import React from 'react';

export default function ProductPage({ product }) {
  return (
    <>
      <Center>
        <h1>{product.productName}</h1>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;

  const product = await Product.findById({ _id: id });

  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}

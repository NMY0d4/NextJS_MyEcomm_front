import Center from '@/components/Center';
import ProductImages from '@/components/ProductImages';
import WhiteBox from '@/components/ui/WhiteBox';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import React from 'react';
import styled from 'styled-components';

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  margin-top: 40px;
`;

export default function ProductPage({ product }) {
  return (
    <>
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <h1>{product.productName}</h1>
            <p>{product.description}</p>
          </div>
        </ColWrapper>
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

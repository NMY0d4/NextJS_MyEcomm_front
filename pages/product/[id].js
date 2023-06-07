import Center from '@/components/Center';
import ProductImages from '@/components/ProductImages';
import CartIcon from '@/components/icons/CartCart';
import MainBtn from '@/components/ui/MainBtn';
import WhiteBox from '@/components/ui/WhiteBox';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { CartContext } from '@/store/CartContext';
import React, { useContext } from 'react';
import styled from 'styled-components';

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  margin-top: 40px;
`;

const PriceRow = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 2rem;
`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  console.log(product);
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
            <PriceRow>
              <Price>${product.price}</Price>
              <MainBtn primary onClick={() => {addProduct(product._id)}}>
                <CartIcon /> Add to cart
              </MainBtn>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();

  const { id } = context.query;
  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

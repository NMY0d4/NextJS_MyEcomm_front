import React from 'react';
import styled from 'styled-components';
import ProductBox from '../ProductBox';
import { RevealWrapper } from 'next-reveal';

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 30px;
  padding-top: 30px;
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default function ProductsGrid({ products, wishedProducts = [] }) { 
  return (
    <StyledProductsGrid>
      {products?.length > 0 &&
        products.map((product, index) => (
          <RevealWrapper key={product._id} delay={index * 100}>
            <ProductBox
              {...product}
              wished={wishedProducts.includes(product._id)}
            />
          </RevealWrapper>
        ))}
    </StyledProductsGrid>
  );
}

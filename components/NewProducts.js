import styled from 'styled-components';
import ProductBox from './ProductBox';

const ProductsGrid = styled.div`
  display: grid;
  margin: 0 auto;
  max-width: 1000px;
  grid-template-columns: repeat(4, 1fr);

  gap: 30px;
  padding-top: 30px;
`;

export default function NewProducts({ products }) {
  return (
    <ProductsGrid>
      {products.length > 0 &&
        products.map((product) => (
          <ProductBox key={product._id} {...product} />
        ))}
    </ProductsGrid>
  );
}

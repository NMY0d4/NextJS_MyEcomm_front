import styled from 'styled-components';

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export default function NewProducts({ products }) {
  return (
    <ProductsGrid>
      {products.length > 0 &&
        products.map((product) => (
          <div key={product._id}>{product.productName}</div>
        ))}
    </ProductsGrid>
  );
}

import styled from 'styled-components';
import Center from './Center';
import ProductsGrid from './ui/ProductsGrid';

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: 600;
`;

export default function NewProducts({ products, wishedProducts }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products} wishedProducts={wishedProducts} />
    </Center>
  );
}

import Image from 'next/legacy/image';
import styled from 'styled-components';
import MainBtn from './ui/MainBtn';
import CartIcon from './icons/CartCart';
import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '@/store/CartContext';

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: var(--white);
  padding: 20px;
  height: 150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  .img-product {
    position: relative;
    width: 100%;
    min-height: 90px;
  }
`;

const Title = styled(Link)`
  font-size: large.9rem;
  font-weight: 600;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
  text-align: center;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

export default function ProductBox({
  _id: id,
  productName: title,
  description,
  price,
  images,
}) {
  const { addProduct } = useContext(CartContext);
  const uri = `/product/${id}`;
  return (
    <ProductWrapper>
      <WhiteBox href={uri}>
        <div className='img-product'>
          <Image
            src={images[0]}
            alt={`photo ${title}`}
            layout='fill'
            objectFit='contain'
            priority
          />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={uri}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>

          <MainBtn onClick={() => addProduct(id)} primary outline>
            <CartIcon /> Add
          </MainBtn>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}

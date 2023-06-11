import Image from 'next/legacy/image';
import styled from 'styled-components';
import MainBtn from './ui/MainBtn';
import CartIcon from './icons/CartCart';
import Link from 'next/link';
import { useContext, useState } from 'react';
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
  position: relative;
  overflow: hidden;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  &.adding-to-cart {
    background-color: rgba(0, 0, 0, 0.5);
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
  display: block;
  align-items: center;
  justify-content: space-around;
  margin-top: 2px;
  @media screen and (min-width: 768px) {
    display: flex;
  }
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  .overlay-text {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &.show-overlay {
    opacity: 1;

    .overlay-text {
      opacity: 1;
    }
  }
`;

export default function ProductBox({
  _id: id,
  productName: title,
  price,
  images,
}) {
  const { addProduct } = useContext(CartContext);
  const uri = `/product/${id}`;
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addProduct(id);
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 800);
  };

  return (
    <ProductWrapper>
      <WhiteBox href={uri} className={isAddingToCart ? 'adding-to-cart' : ''}>
        <div className='img-product'>
          <Image
            src={images[0]}
            alt={`photo ${title}`}
            layout='fill'
            objectFit='contain'
            priority
          />
          <ImageOverlay
            className={isAddingToCart ? 'show-overlay' : ''}
            onClick={handleAddToCart}
          >
            <div className='overlay-text'>Added to Cart</div>
          </ImageOverlay>
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={uri}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <MainBtn
            onClick={handleAddToCart}
            primary
            outline
            disabled={isAddingToCart}
            style={{
              backgroundColor: isAddingToCart
                ? 'var(--grayLight)'
                : 'var(--primary)',
              color: isAddingToCart ? 'var(--grayDark)' : 'white',
            }}
          >
            {isAddingToCart ? (
              'Adding...'
            ) : (
              <>
                <CartIcon /> Add
              </>
            )}
          </MainBtn>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}

// import Image from 'next/legacy/image';
// import styled from 'styled-components';
// import MainBtn from './ui/MainBtn';
// import CartIcon from './icons/CartCart';
// import Link from 'next/link';
// import { useContext } from 'react';
// import { CartContext } from '@/store/CartContext';

// const ProductWrapper = styled.div``;

// const WhiteBox = styled(Link)`
//   background-color: var(--white);
//   padding: 20px;
//   height: 150px;
//   text-align: center;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 10px;
// `;

// const Title = styled(Link)`
//   font-size: large.9rem;
//   font-weight: 600;
// `;

// const ProductInfoBox = styled.div`
//   margin-top: 5px;
//   text-align: center;
// `;

// const PriceRow = styled.div`
//   display: block;
//   align-items: center;
//   justify-content: space-around;
//   margin-top: 2px;
//   @media screen and (min-width: 768px) {
//     display: flex;
//   }
// `;

// const Price = styled.div`
//   font-size: 1.2rem;
//   font-weight: 600;
//   @media screen and (min-width: 768px) {
//     font-size: 1.5rem;
//   }
// `;

// export default function ProductBox({
//   _id: id,
//   productName: title,
//   description,
//   price,
//   images,
// }) {
//   const { addProduct } = useContext(CartContext);
//   const uri = `/product/${id}`;
//   return (
//     <ProductWrapper>
//       <WhiteBox href={uri}>
//         <div className='img-product'>
//           <Image
//             src={images[0]}
//             alt={`photo ${title}`}
//             layout='fill'
//             objectFit='contain'
//             priority
//           />
//         </div>
//       </WhiteBox>
//       <ProductInfoBox>
//         <Title href={uri}>{title}</Title>
//         <PriceRow>
//           <Price>${price}</Price>
//           <MainBtn onClick={() => addProduct(id)} primary outline>
//             <CartIcon /> Add
//           </MainBtn>
//         </PriceRow>
//       </ProductInfoBox>
//     </ProductWrapper>
//   );
// }

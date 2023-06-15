import Image from 'next/legacy/image';
import styled from 'styled-components';
import MainBtn from './ui/MainBtn';
import CartIcon from './icons/CartIcon';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/store/CartContext';
import HeartOutlineIcon from './icons/HeartOutlineIcon';
import HeartSolidIcon from './icons/HeartSolidIcon';
import axios from 'axios';

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  position: relative;
  background-color: var(--white);
  padding: 20px;
  height: 150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  transition: background-color 0.5s ease;
  z-index: 9;

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

const WishlistButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  border: 0;
  width: 25px;
  height: 25px;
  z-index: 10;
  ${(props) => (props.wished ? `color:red;` : `color:black;`)}
  svg {
    width: 16px;
  }
`;

export default function ProductBox({
  _id: id,
  productName: title,
  price,
  images,
  wished = false,
  onRemoveFromWishlist
}) {
  const { addProduct } = useContext(CartContext);
  const uri = `/product/${id}`;
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWished, setIsWished] = useState(wished); 

  useEffect(() => {
    console.log('wished changed');
  }, [isWished]);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addProduct(id);
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 800);
  };

  function addToWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    const nextValue = !isWished;
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(id);
    }
    axios
      .post('/api/wishlist', {
        product: id,
      })
      .then(() => {});
    setIsWished(nextValue);
  }

  return (
    <ProductWrapper>
      <WhiteBox href={uri} className={isAddingToCart ? 'adding-to-cart' : ''}>
        <WishlistButton wished={isWished} onClick={addToWishlist}>
          {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
        </WishlistButton>
        <div className='img-product'>
          <Image
            src={images[0]}
            alt={`photo ${title}`}
            layout='fill'
            objectFit='contain'
            priority
          />
          <ImageOverlay className={isAddingToCart ? 'show-overlay' : ''}>
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

import Center from '@/components/Center';
import ProductImages from '@/components/ProductImages';
import CartIcon from '@/components/icons/CartCart';
import MainBtn from '@/components/ui/MainBtn';
import WhiteBox from '@/components/ui/WhiteBox';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { CartContext } from '@/store/CartContext';
import { RevealWrapper } from 'next-reveal';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
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

const ImageWrapper = styled.div`
  /* position: relative; */
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

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addProduct(product._id);
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 800);
  };

  return (
    <>
      <Center>
        <ColWrapper>
          <RevealWrapper delay={0}>
            <WhiteBox className='relative overflow-hidden'>
              <ImageWrapper>
                <ProductImages images={product.images} />
                {isAddingToCart && (
                  <ImageOverlay className='show-overlay'>
                    <div className='overlay-text'>Added to Cart</div>
                  </ImageOverlay>
                )}
              </ImageWrapper>
            </WhiteBox>
          </RevealWrapper>
          <RevealWrapper delay={200}>
            <div>
              <h1>{product.productName}</h1>
              <p>{product.description}</p>
              <PriceRow>
                <Price>${product.price}</Price>
                <MainBtn
                  primary
                  onClick={handleAddToCart}
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
                      <CartIcon /> Add to cart
                    </>
                  )}
                </MainBtn>
              </PriceRow>
            </div>
          </RevealWrapper>
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

// import Center from '@/components/Center';
// import ProductImages from '@/components/ProductImages';
// import CartIcon from '@/components/icons/CartCart';
// import MainBtn from '@/components/ui/MainBtn';
// import WhiteBox from '@/components/ui/WhiteBox';
// import { mongooseConnect } from '@/lib/mongoose';
// import { Product } from '@/models/Product';
// import { CartContext } from '@/store/CartContext';
// import React, { useContext } from 'react';
// import styled from 'styled-components';

// const ColWrapper = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 40px;
//   margin-top: 40px;
//   @media screen and (min-width: 768px) {
//     grid-template-columns: 0.8fr 1.2fr;
//   }
// `;

// const PriceRow = styled.div`
//   margin-top: 20px;
//   display: flex;
//   gap: 20px;
//   align-items: center;
// `;

// const Price = styled.span`
//   font-size: 2rem;
// `;

// export default function ProductPage({ product }) {
//   const { addProduct } = useContext(CartContext);
//   console.log(product);
//   return (
//     <>
//       <Center>
//         <ColWrapper>
//           <WhiteBox>
//             <ProductImages images={product.images} />
//           </WhiteBox>
//           <div>
//             <h1>{product.productName}</h1>
//             <p>{product.description}</p>
//             <PriceRow>
//               <Price>${product.price}</Price>
//               <MainBtn
//                 primary
//                 onClick={() => {
//                   addProduct(product._id);
//                 }}
//               >
//                 <CartIcon /> Add to cart
//               </MainBtn>
//             </PriceRow>
//           </div>
//         </ColWrapper>
//       </Center>
//     </>
//   );
// }

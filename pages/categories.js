import Center from '@/components/Center';
import ProductBox from '@/components/ProductBox';
import { Category } from '@/models/Category';
import { Product } from '@/models/Product';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { RevealWrapper } from 'next-reveal';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { WishedProduct } from '@/models/WishedProduct';

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CategoryTitle = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 0px;
  align-items: center;
  h2 {
    margin-bottom: 10px;
  }
  a {
    color: var(--secondaryDark);
    font-size: small;
  }
`;

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ShowallSquare = styled(Link)`
  background-color: var(--primaryLight);
  height: 150px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--secondaryDark);
  font-weight: 600;
`;

export default function CategoriePages({
  mainCategories,
  categoriesProducts,
  wishedProducts,
}) {
  return (
    <>
      <Center>
        {mainCategories &&
          mainCategories.map((cat) => (
            <CategoryWrapper key={cat._id}>
              <CategoryTitle>
                <h2>{cat.name}</h2>
                <div className='pb-2'>
                  <Link href={`/category/${cat._id}`}>Show all</Link>
                </div>
              </CategoryTitle>
              <CategoryGrid>
                {categoriesProducts[cat._id].map((product, i) => (
                  <RevealWrapper key={product._id} delay={i * 50}>
                    <ProductBox
                      {...product}
                      wished={wishedProducts?.includes(product._id)}
                    />
                  </RevealWrapper>
                ))}
                <RevealWrapper>
                  <ShowallSquare href={`/category/${cat._id}`}>
                    Show All &rarr;
                  </ShowallSquare>
                </RevealWrapper>
              </CategoryGrid>
            </CategoryWrapper>
          ))}
      </Center>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const categories = await Category.find();
  const mainCategories = JSON.parse(
    JSON.stringify(categories.filter((c) => !c.parent))
  );
  const categoriesProducts = {};
  const allFetchedProductsId = [];
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter((c) => c?.parent?.toString() === mainCatId)
      .map((c) => c._id.toString());
    const categoriesIds = [mainCatId, ...childCatIds];
    const products = await Product.find({ category: categoriesIds }, null, {
      limit: 3,
      sort: { _id: -1 },
    });
    allFetchedProductsId.push(...products.map((p) => p._id.toString()));
    categoriesProducts[mainCat._id] = products;
  }

  const { user } = await getServerSession(req, res, authOptions);
  const wishedProducts = await WishedProduct.find({
    userEmail: user.email,
    product: allFetchedProductsId,
  });

  return {
    props: {
      mainCategories,
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
      wishedProducts: wishedProducts.map((i) => i.product.toString()),
    },
  };
}

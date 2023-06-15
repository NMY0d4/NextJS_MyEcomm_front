import Center from '@/components/Center';
import Loading from '@/components/ui/Loading';
import ProductsGrid from '@/components/ui/ProductsGrid';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { WishedProduct } from '@/models/WishedProduct';
import { getServerSession } from 'next-auth';
import React, { useEffect, useState } from 'react';
import { authOptions } from './api/auth/[...nextauth]';

export default function ProductsPage({ products, wishedProducts }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []); // Once the component is mounted, we update the isLoading status to false

  return (
    <>
      {isLoading ? (
        // Display a loading indicator here
        <Loading />
      ) : (
        <>
          <Center>
            <h1>All products</h1>
            <ProductsGrid products={products} wishedProducts={wishedProducts} />
          </Center>
        </>
      )}
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });

  const session = await getServerSession(req, res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session.user.email,
        product: products.map((p) => p._id.toString()),
      })
    : [];

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      wishedProducts: wishedProducts.map((i) => i.product.toString()) || [],
    },
  };
}

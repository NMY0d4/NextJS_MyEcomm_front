import Center from '@/components/Center';
import ProductsGrid from '@/components/ui/ProductsGrid';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import React, { useEffect, useState } from 'react';

export default function ProductsPage({ products }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []); // Once the component is mounted, we update the isLoading status to false

  return (
    <>
      {isLoading ? (
        // Display a loading indicator here
        <p>Loading...</p>
      ) : (
        <>
          <Center>
            <h1>All products</h1>
            <ProductsGrid products={products} />
          </Center>
        </>
      )}
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

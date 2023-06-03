import Featured from '@/components/Featured';
import NewProducts from '@/components/NewProducts';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { useState, useEffect } from 'react';

export default function HomePage({ featuredProduct, newProducts }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []); // Une fois que le composant est monté, on met à jour l'état isLoading à false

  return (
    <>
      {isLoading ? (
        // Afficher un indicateur de chargement ici
        <p>Loading...</p>
      ) : (
        <>
          <Featured product={featuredProduct} />
          <NewProducts products={newProducts} />
        </>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '647600560fd315f22ea770a8';
  await mongooseConnect();
  const data1 = await Product.findById(featuredProductId);
  const featuredProduct = JSON.parse(JSON.stringify(data1));
  const data2 = await Product.find({}, null, { sort: { _id: -1 }, limit: 10 });
  const newProducts = JSON.parse(JSON.stringify(data2));
  return {
    props: { featuredProduct, newProducts },
  };
}

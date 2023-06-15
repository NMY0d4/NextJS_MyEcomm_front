import Featured from '@/components/Featured';
import NewProducts from '@/components/NewProducts';
import Loading from '@/components/ui/Loading';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { getServerSession } from 'next-auth';
import { useState, useEffect } from 'react';
import { authOptions } from './api/auth/[...nextauth]';
import { WishedProduct } from '@/models/WishedProduct';

export default function HomePage({
  featuredProduct,
  newProducts,
  wishedNewProducts,
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []); // Once the component is mounted, we update the isLoading status to false
  return (
    <>
      {isLoading ? (
        // Display a loading indicator here
        <div className='mt-20'>
          <Loading />
        </div>
      ) : (
        <>
          <Featured product={featuredProduct} />
          <NewProducts
            products={newProducts}
            wishedProducts={wishedNewProducts}
          />
        </>
      )}
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const featuredProductId = '647600560fd315f22ea770a8';
  await mongooseConnect();
  const data1 = await Product.findById(featuredProductId);
  const featuredProduct = JSON.parse(JSON.stringify(data1));
  const data2 = await Product.find({}, null, { sort: { _id: -1 }, limit: 10 });
  const newProducts = JSON.parse(JSON.stringify(data2));

  // START
  const { user } = await getServerSession(req, res, authOptions);
  const wishedNewProducts = await WishedProduct.find({
    userEmail: user.email,
    product: newProducts.map((p) => p._id.toString()),
  });
  // END

  return {
    props: {
      featuredProduct,
      newProducts,
      wishedNewProducts:
        wishedNewProducts.map((i) => i.product.toString()) || [],
    },
  };
}

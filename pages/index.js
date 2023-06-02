import Featured from '@/components/Featured';
import Header from '@/components/Header';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';

export default function HomePage({ product }) {
  return (
    <>
      <Header />
      <Featured product={product} />
    </>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '647600560fd315f22ea770a8';
  await mongooseConnect();
  const data = await Product.findById(featuredProductId);
  const product = JSON.parse(JSON.stringify(data));

  return {
    props: { product },
  };
}

import Featured from '@/components/Featured';
import NewProducts from '@/components/NewProducts';
import Loading from '@/components/ui/Loading';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { getServerSession } from 'next-auth';
import { useState, useEffect } from 'react';
import { authOptions } from './api/auth/[...nextauth]';
import { WishedProduct } from '@/models/WishedProduct';
import { Setting } from '@/models/Setting';
import { MdNotificationImportant } from 'react-icons/md';
import Modal from '@/components/ui/Modal';

export default function HomePage({
  featuredProduct,
  newProducts,
  wishedNewProducts,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

          <button
            onClick={() => setIsModalOpen(true)}
            className='fixed flex items-center justify-center gap-2 bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
          >
            <MdNotificationImportant size={20} /> Important
          </button>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
          >
            <div className='text-gray-800 font-semibold text-sm'>
              <p className='mb-4'>
                This application is a fictional project developed for portfolio
                purposes, demonstrating various functionalities that can be
                implemented in an e-commerce website.
              </p>
              <p className='mb-4'>
                It&apos;s important to note that certain features typically
                found on a real website, such as cookie consent, terms and
                conditions, and legal notices, have been intentionally excluded
                for simplicity. In a real-world scenario, these elements would
                be essential and require careful consideration and
                implementation, along with other important aspects like SEO
                optimization and validation schemes.
              </p>
              <p className='mb-4'>
                One noteworthy feature is the integration of the Stripe payment
                gateway. In this demonstration, the Stripe validation process is
                set to test mode, allowing users to simulate transactions using
                dummy data. When testing the payment functionality, you can
                enter the card number as &quot;42&quot; along with other
                fictitious details. Please note that this is for demonstration
                purposes only and should not be used for real transactions.
              </p>
              <p className='mb-4'>
                While this application provides a comprehensive overview of
                various features that can be implemented in an e-commerce site,
                it`&apos;s important to remember that in a real-world scenario,
                additional considerations and configurations would be necessary.
                These may include security measures, performance optimization,
                scalability, and compliance with legal requirements.
              </p>
              <p>
                Overall, this application serves as a showcase for the
                capabilities and potential of an e-commerce website, providing
                insights into different functionalities that can be integrated.
                However, it`&apos;s crucial to adapt and tailor these features
                to the specific needs and requirements of a real e-commerce
                project, ensuring the inclusion of essential elements and
                adherence to industry best practices.
              </p>
            </div>
          </Modal>
        </>
      )}
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  await mongooseConnect();
  const featuredProductSetting = await Setting.findOne({
    name: 'featuredProductId',
  });
  const featuredProductId = featuredProductSetting.value;
  const data1 = await Product.findById(featuredProductId);
  const featuredProduct = JSON.parse(JSON.stringify(data1));
  const data2 = await Product.find({}, null, { sort: { _id: -1 }, limit: 10 });
  const newProducts = JSON.parse(JSON.stringify(data2));

  const session = await getServerSession(req, res, authOptions);
  const wishedNewProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session.user.email,
        product: newProducts.map((p) => p._id.toString()),
      })
    : [];

  return {
    props: {
      featuredProduct,
      newProducts,
      wishedNewProducts:
        wishedNewProducts.map((i) => i.product.toString()) || [],
    },
  };
}

import Featured from '@/components/Featured';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <>
      <Header />
      <Featured />
    </>
  );
}

export function getServerSideProps() {
  const featuredProductId = '647600560fd315f22ea770a8'
}
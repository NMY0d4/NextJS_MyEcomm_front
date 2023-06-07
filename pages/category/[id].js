import Center from '@/components/Center';
import ProductsGrid from '@/components/ui/ProductsGrid';
import { Category } from '@/models/Category';
import { Product } from '@/models/Product';
import React from 'react';

export default function CategoryPage({ category, products }) {
  return (
    <>
      <Center>
        <h1>{category.name}</h1>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const category = await Category.findById(context.query.id);
  const subCategories = await Category.find({ parent: category._id });
  const catIds = [category._id, ...subCategories.map((c) => c._id)];
  const products = await Product.find({ category: catIds });

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

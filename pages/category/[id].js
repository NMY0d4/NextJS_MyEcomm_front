import Center from '@/components/Center';
import ProductsGrid from '@/components/ui/ProductsGrid';
import { Category } from '@/models/Category';
import { Product } from '@/models/Product';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 1.8rem;
  }
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const Filter = styled.div`
  background-color: var(--tertiary);
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  color: var(--primaryDark);
  select {
    background-color: transparent;
    border: 0;
    font-size: inherit;
  }
`;

export default function CategoryPage({
  category,
  subCategories,
  products: originalProducts,
}) {
  const [products, setProducts] = useState(originalProducts);
  const [filtersValues, setFiltersValues] = useState(
    category.properties.map((p) => ({ name: p.name, value: 'all' }))
  );

  function handleFilterChange(filterName, filterValue) {
    setFiltersValues((prev) => {
      return prev.map((p) => ({
        name: p.name,
        value: p.name === filterName ? filterValue : p.value,
      }));
    });
  }

  useEffect(() => {
    const catIds = [category._id, ...(subCategories?.map((c) => c._id) || [])];
    const params = new URLSearchParams();
    params.set('categories', catIds.join(','));

    filtersValues.forEach((f) => {
      params.set(f.name, f.value);
    });
    const url = `/api/products?${params.toString()}`;

    axios.get(url).then((res) => {
      console.log(res.data);
    });
  }, [filtersValues]);

  return (
    <>
      <Center>
        <CategoryHeader>
          <h1>{category.name}</h1>
          <FiltersWrapper>
            {category.properties.map((prop) => (
              <Filter key={prop._id}>
                <span>{prop.name} :</span>
                <select
                  onChange={(e) =>
                    handleFilterChange(prop.name, e.target.value)
                  }
                  value={filtersValues.find((f) => f.name === prop.name).value}
                >
                  <option value='all'>all</option>
                  {prop.values.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </Filter>
            ))}
          </FiltersWrapper>
        </CategoryHeader>
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
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

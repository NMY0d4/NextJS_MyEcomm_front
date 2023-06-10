import Center from '@/components/Center';
import Loading from '@/components/ui/Loading';
import ProductsGrid from '@/components/ui/ProductsGrid';
import Spinner from '@/components/ui/Spinner';
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
  const defaultSorting = '_id-desc';
  const defaultFilterValues = category.properties.map((p) => ({
    name: p.name,
    value: 'all',
  }));
  const [products, setProducts] = useState(originalProducts);
  const [filtersValues, setFiltersValues] = useState(defaultFilterValues);
  const [sort, setSort] = useState(defaultSorting);
  const [loadingProducts, setLoadingProducts] = useState(false);

  function handleFilterChange(filterName, filterValue) {
    setFiltersValues((prev) => {
      return prev.map((p) => ({
        name: p.name,
        value: p.name === filterName ? filterValue : p.value,
      }));
    });
  }

  useEffect(() => {
    if (filtersValues === defaultFilterValues && sort === defaultSorting) {
      return;
    }
    setLoadingProducts(true);
    const catIds = [category._id, ...(subCategories?.map((c) => c._id) || [])];

    const params = new URLSearchParams();

    params.set('categories', catIds.join(','));
    params.set('sort', sort);

    filtersValues.forEach((f) => {
      if (f.value !== 'all') {
        params.set(f.name, f.value);
      }
    });
    const url = `/api/products?${params.toString()}`;
    axios.get(url).then((res) => {
      setProducts(res.data);
      setLoadingProducts(false);
    });
  }, [filtersValues, sort]);

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
                  value={
                    filtersValues.find((f) => f.name === prop.name)?.value ||
                    'all'
                  }
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
            <Filter>
              <span>Sorting :</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value='price-asc'>price, lowest first</option>
                <option value='price-desc'>price, highest first</option>
                <option value='_id-desc'>newest first</option>
                <option value='_id-asc'>oldest first</option>
              </select>
            </Filter>
          </FiltersWrapper>
        </CategoryHeader>
        {loadingProducts && <Loading />}
        {!loadingProducts && (
          <div>
            {products.length > 0 ? (
              <ProductsGrid products={products} />
            ) : (
              <div className='mt-4 font-semibold text-primary'>
                Sorry, no products found
              </div>
            )}
          </div>
        )}
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

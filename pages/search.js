import Center from '@/components/Center';
import Input from '@/components/ui/Input';
import ProductsGrid from '@/components/ui/ProductsGrid';
import axios from 'axios';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const SearchInput = styled(Input)`
  padding: 5px 10px;
  margin: 30px 0 30px;
  font-size: 1.5rem;
`;

export default function SearchPage() {
  const [phrase, setPhrase] = useState('');
  const [products, setProducts] = useState([]);
  const debouncedSearch = useCallback(debounce(searchProducts, 500), []);

  useEffect(() => {
    if (phrase.length > 0) {
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase]);

  function searchProducts(phrase) {
    axios
      .get(`/api/products?phrase=${encodeURIComponent(phrase)}`)
      .then((response) => {
        setProducts(response.data);
      });
  }
  return (
    <>
      <Center>
        <SearchInput
          autoFocus
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          placeholder='Search for products...'
        />
        {products.length}
        {phrase !== '' && products.length === 0 && (
          <h2>No products found for query &quot;{phrase}&quot;</h2>
        )}
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

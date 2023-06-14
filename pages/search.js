import Center from '@/components/Center';
import Input from '@/components/ui/Input';
import Loading from '@/components/ui/Loading';
import ProductsGrid from '@/components/ui/ProductsGrid';
import axios from 'axios';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const SearchInput = styled(Input)`
  padding: 5px 10px;
  margin: 30px 0 30px;
  font-size: 1.5rem;
  position: sticky;
  top: 100px;
  z-index: 10;
`;

export default function SearchPage() {
  const [phrase, setPhrase] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(debounce(searchProducts, 500), []);

  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
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
        setIsLoading(false);
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
        {!isLoading && phrase !== '' && products.length === 0 && (
          <h2>No products found for query &quot;{phrase}&quot;</h2>
        )}
        {isLoading && <Loading />}
        {!isLoading && products.length > 0 && (
          <ProductsGrid products={products} />
        )}
      </Center>
    </>
  );
}

/////////////////// exercise to work on the basics

// let myName = 'hi my Name is Grégory';

// function reverse(str) {
//   // check input
//   if (!str || str.length < 2 || typeof str !== 'string') return;
//   const reverseArr = [];
//   for (let i = str.length - 1; i >= 0; i--) {
//     reverseArr.push(str[i]);
//   }
//   return reverseArr.join('');
// }

// myName = reverse(myName);

// console.log(myName);

// function reverse2(str) {
//   return str.split('').reverse.join('');
// }

// const reverse3 = str => [...str].reverse().join('');

// function mergeSortedArrays(arr1, arr2) {
//   const newArr = [...arr1, ...arr2];
//   return newArr.sort((a, b) => a - b);
// }

// console.log(mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]));

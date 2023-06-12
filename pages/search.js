import Center from '@/components/Center';
import Input from '@/components/ui/Input';
import axios from 'axios';
import { set } from 'mongoose';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SearchInput = styled(Input)`
  padding: 5px 10px;
  margin: 30px 0 30px;
  font-size: 1.5rem;
`;

export default function SearchPage() {
  const [phrase, setPhrase] = useState('');
  useEffect(() => {
    if (phrase.length > 0) {
      axios
        .get(`/api/products?search=${encodeURIComponent(phrase)}`)
        .then((response) => {
          console.log(response.data);
        });
    }
  }, [phrase]);
  return (
    <>
      <Center>
        <SearchInput
          autoFocus
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          placeholder='Search for products...'
        />
      </Center>
    </>
  );
}

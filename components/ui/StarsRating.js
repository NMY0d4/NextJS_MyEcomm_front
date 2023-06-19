import React, { useState } from 'react';
import StarOutline from '../icons/StarOutline';
import StarSolid from '../icons/StarSolid';
import styled from 'styled-components';

const StarWrapper = styled.div`
  height: 1.2rem;
  width: 1.2rem;
  height: 1.4rem;
  align-items: center;
  cursor: pointer;
  padding: 0;
  border: 0;
  display: inline-block;
  color: var(--primary);
`;

const StarsWrapper = styled.button`
  display: inline-flex;
  gap: 3px;
`;

export default function StarsRating({ defaultHowMany = 0, onChange=() => {} }) {
  const [howMany, setHowMAny] = useState(defaultHowMany);
  const five = [1, 2, 3, 4, 5];

  function handleStarClick(n) {
    setHowMAny(n);
    onChange(n);
  }

  return (
    <StarsWrapper>
      {five.map((n) => (
        <>
          <StarWrapper
            onClick={() => {
              handleStarClick(n);
            }}
          >
            {howMany >= n ? <StarSolid /> : <StarOutline />}
          </StarWrapper>
        </>
      ))}
    </StarsWrapper>
  );
}

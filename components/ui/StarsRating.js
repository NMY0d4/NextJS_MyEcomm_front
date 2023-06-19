import React, { Fragment, useState } from 'react';
import StarOutline from '../icons/StarOutline';
import StarSolid from '../icons/StarSolid';
import styled from 'styled-components';

const StarWrapper = styled.button`
  ${(props) =>
    props.size === 'md' &&
    `
      height: 1.4rem;
      width: 1.4rem;
  `}
  ${(props) =>
    props.size === 'sm' &&
    `
      height: 1rem;
      width: 1rem;
  `}
${(props) =>
    !props.disabled &&
    `
    cursor: pointer; 
`}
  height: 1.4rem;
  align-items: center;
  padding: 0;
  border: 0;
  display: inline-block;
  color: var(--primary);
`;

const StarsWrapper = styled.div`
  display: inline-flex;
  gap: 3px;
`;

export default function StarsRating({
  size = 'md',
  defaultHowMany = 0,
  disabled,
  onChange,
}) {
  const [howMany, setHowMAny] = useState(defaultHowMany);
  const five = [1, 2, 3, 4, 5];

  function handleStarClick(n) {
    if (disabled) return;
    setHowMAny(n);
    onChange(n);
  }

  return (
    <StarsWrapper>
      {five.map((n) => (
        <Fragment key={n}>
          <StarWrapper
            disabled={disabled}
            size={size}
            onClick={() => {
              handleStarClick(n);
            }}
          >
            {howMany >= n ? <StarSolid /> : <StarOutline />}
          </StarWrapper>
        </Fragment>
      ))}
    </StarsWrapper>
  );
}

import React from 'react';
import styled from 'styled-components';

const StyledOrder = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid var(--secondaryLight);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;

  time {
    font-size: 1rem;
    font-weight: bold;
    color: var(--primary);
  }
`;

const ProductRow = styled.div`
  span {
    color: var(--primary);
  }
`;

const Address = styled.div`
  font-size: 0.8rem;
  line-height: normal.8rem;
  margin-top: 5px;
  color: var(--gray);
`;

export default function SingleOrder({ line_items, createdAt, ...rest }) {
  return (
    <StyledOrder>
      <div>
        <time>{new Date(createdAt).toLocaleString()}</time>
        <Address>
          {rest.name}
          <br />
          {rest.email} <br />
          {rest.streetAddress}
          <br />
          {rest.postalCode} {rest.city}, {rest.country}
        </Address>
      </div>
      <div>
        {line_items.map((item) => (
          <ProductRow key={item.price_data.product_data.name}>
            <span>{item.quantity} x</span> {item.price_data.product_data.name}
          </ProductRow>
        ))}
      </div>
    </StyledOrder>
  );
}
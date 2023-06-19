import styled from 'styled-components';

const Subtitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
`;

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default function ProductReviews({ product }) {
  return (
    <div>
      <h2>Reviews</h2>
      <ColsWrapper>
        <div>
          <Subtitle>Add review</Subtitle>
        </div>
        <div>
          <Subtitle>All reviews</Subtitle>
        </div>
      </ColsWrapper>
    </div>
  );
}

import styled from 'styled-components';
import Input from './ui/Input';
import WhiteBox from './ui/WhiteBox';

const Subtitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
`;

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export default function ProductReviews({ product }) {
  return (
    <div>
      <h2>Reviews</h2>
      <ColsWrapper>
        <WhiteBox>
          <Subtitle>Add review</Subtitle>
          <Input placeholder='Title' />
          Stars:
        </WhiteBox>
        <div>
          <Subtitle>All reviews</Subtitle>
        </div>
      </ColsWrapper>
    </div>
  );
}

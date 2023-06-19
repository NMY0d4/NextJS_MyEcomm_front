import styled from 'styled-components';
import Input from './ui/Input';
import WhiteBox from './ui/WhiteBox';
import StarsRating from './ui/StarsRating';
import Textarea from './ui/Textarea';
import MainBtn from './ui/MainBtn';

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
          <div className='flex flex-row items-center my-2'>
            <StarsRating onChange={() => {}} />
          </div>
          <Input placeholder='Title' />
          <Textarea placeholder='Was it good? Pros? Cons?' />
          <div>
            <MainBtn primary>Submit your review</MainBtn>
          </div>
        </WhiteBox>
        <div>
          <Subtitle>All reviews</Subtitle>
        </div>
      </ColsWrapper>
    </div>
  );
}

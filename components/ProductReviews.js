import styled from 'styled-components';
import Input from './ui/Input';
import WhiteBox from './ui/WhiteBox';
import StarsRating from './ui/StarsRating';
import Textarea from './ui/Textarea';
import MainBtn from './ui/MainBtn';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './ui/Loading';

const Subtitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin-bottom: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
`;

const ReviewWrapper = styled.div`
  margin-bottom: 10px;
  border-top: 1px solid var(--grayLight);
  padding: 10px 0;
  h3 {
    font-size: 1rem;
    font-weight: normal;
    color: var(--grayDark);
  }
  p {
    margin: 0;
    font-size: 0.7rem;
    color: var(--gray);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  time {
    font-size: 12px;
    font-weight: bold;
    color: var(--grayLight);
    font-family: inherit;
  }
`;

export default function ProductReviews({ product }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  function submitReview() {
    const data = {
      title,
      description,
      stars,
      product: product._id,
    };
    axios
      .post('/api/reviews', data)
      .then((res) => {
        setTitle('');
        setDescription('');
        setStars(0);
        loadReviews();
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    loadReviews();
  }, []);

  function loadReviews() {
    setReviewsLoading(true);
    axios.get(`/api/reviews?product=${product._id}`).then((res) => {
      setReviews(res.data);
      setReviewsLoading(false);
    });
  }

  return (
    <div>
      <h2>Reviews</h2>
      <ColsWrapper>
        <div>
          <WhiteBox>
            <Subtitle>Add review</Subtitle>
            <div className='flex flex-row items-center my-2'>
              <StarsRating onChange={setStars} />
            </div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Title'
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Was it good? Pros? Cons?'
            />
            <div>
              <MainBtn primary onClick={submitReview}>
                Submit your review
              </MainBtn>
            </div>
          </WhiteBox>
        </div>
        <div>
          <WhiteBox>
            <Subtitle>All reviews</Subtitle>
            {reviewsLoading && <Loading />}
            {reviews.length === 0 && <p>No reviews 😭</p>}
            {reviews.length > 0 &&
              reviews.map((review) => (
                <ReviewWrapper key={review._id}>
                  <ReviewHeader>
                    <StarsRating
                      size={'sm'}
                      disabled={true}
                      defaultHowMany={review.stars}
                    />

                    <time>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </time>
                  </ReviewHeader>
                  <h3>{review.title}</h3>
                  <p>{review.description}</p>
                </ReviewWrapper>
              ))}
          </WhiteBox>
        </div>
      </ColsWrapper>
    </div>
  );
}

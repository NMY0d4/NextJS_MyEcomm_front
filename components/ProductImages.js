import Image from 'next/legacy/image';
import styled from 'styled-components';

const BlockImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ImageButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const ImageButton = styled.div`
  border: 1px solid var(--grayLight);
  padding: 5px;
  height: 70px;
  cursor: pointer;
  border-radius: 5px;
`;

export default function ProductImages({ images }) {
  return (
    <>
      <BlockImage src={images?.[0]} alt='' />
      <div>
        <ImageButtons>
          {images?.map((image, i) => (
            <div key={i}>
              <ImageButton>
                <BlockImage src={image} alt='' />
              </ImageButton>
            </div>
          ))}
        </ImageButtons>
      </div>
    </>
  );
}

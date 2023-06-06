import { useState } from 'react';
import styled from 'styled-components';

const BlockImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
  margin: 0 auto;
  max-width: 100%;
  max-height: 200px;
  border-radius: 5px;
`;

const ImageButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;

const ImageButton = styled.div`
  border: 2px solid var(--grayLight);
  ${(props) =>
    props.active
      ? `
      border-color: var(--grayLight);`
      : `
      border-color: transparent;
      opacity: .7;
      `}
  padding: 5px;
  height: 70px;
  cursor: pointer;
  border-radius: 5px;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} alt='' />
      </BigImageWrapper>
      <div>
        <ImageButtons>
          {images?.map((image) => (
            <div key={image}>
              <ImageButton
                onClick={() => setActiveImage(image)}
                active={image === activeImage}
              >
                <BlockImage src={image} alt='' />
              </ImageButton>
            </div>
          ))}
        </ImageButtons>
      </div>
    </>
  );
}

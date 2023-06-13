import styled, { css } from 'styled-components';

export const ButtonStyle = css`
  padding: 5px 15px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;

  svg {
    height: 16px;
    margin-right: 5px;
  }

  ${(props) =>
    props.fixedSize &&
    css`
      width: 150px; /* Définissez la largeur fixe souhaitée */
    `}

  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: white;
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      border: 1px solid var(--primaryDark);
      color: var(--primaryDark);
      transition: all 0.3s;
      &:hover {
        background-color: var(--primaryDark);
        color: var(--primaryVeryLight);
      }
    `}

      ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}

    ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: var(--primaryDark);
      color: white;
      border: 1px solid var(--primaryDark);
      transition: all 0.3s;
      &:hover {
        background-color: var(--tertiary);
        color: var(--primaryDark);
      }
    `}

    ${(props) =>
    props.primary &&
    props.outline &&
    css`
      border: 1px solid var(--primaryDark);
      background-color: transparent;
      color: var(--primaryDark);
      transition: all 0.3s;
      &:hover {
        background-color: var(--primaryDark);
        color: var(--primaryVeryLight);
      }
    `}
    ${(props) =>
    props.size === 'l' &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
        margin-right: 5px;
      }
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function MainBtn({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

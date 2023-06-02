import styled, { css } from 'styled-components';

export const ButtonStyle = css`
  padding: 5px 15px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;

  svg {
    height: 16px;
    margin-right: 5px;
  }
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
      border: 1px solid var(--primary);
    `}
    ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: var(--primaryDark);
      border: 1px solid var(--primaryDark);
      color: white;
    `}
    ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      border: 1px solid var(--primaryDark);
      color: var(--primaryDark);
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

import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid var(--secondaryDark);
  border-radius: 5px;
  
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}

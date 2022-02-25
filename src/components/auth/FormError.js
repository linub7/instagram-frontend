import styled from 'styled-components';

const StyledFormError = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  padding: 3px 0;
  margin: 4px 0;
`;

const FormError = ({ message }) => {
  return <StyledFormError>{message}</StyledFormError>;
};

export default FormError;

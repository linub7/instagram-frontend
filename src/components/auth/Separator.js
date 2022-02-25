import styled from 'styled-components';

const SeparatorLine = styled.div`
  margin: 20px 0px 30px 0;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: #8e8e8e;
  }
  span {
    margin: 0px 10px;
    font-weight: 600;
    font-size: 12px;
    color: #8e8e8e;
  }
`;
const Separator = () => {
  return (
    <SeparatorLine>
      <div></div>
      <span>OR</span>
      <div></div>
    </SeparatorLine>
  );
};

export default Separator;

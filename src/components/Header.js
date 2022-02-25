import { BsInstagram } from 'react-icons/bs';
import { FaHome, FaRegCompass } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import styled from 'styled-components';

const SHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
  cursor: pointer;
`;

const Header = () => {
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <BsInstagram size="1.5em" style={{ cursor: 'pointer' }} />
        </Column>
        <Column>
          <Icon>
            <FaHome />
          </Icon>
          <Icon>
            <FaRegCompass />
          </Icon>
          <Icon>
            <FiUser />
          </Icon>
        </Column>
      </Wrapper>
    </SHeader>
  );
};

export default Header;

import { BsInstagram } from 'react-icons/bs';
import { FaHome, FaRegCompass } from 'react-icons/fa';
import styled from 'styled-components';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from '../apollo';
import { Link } from 'react-router-dom';
import routes from '../routes';
import useUser from '../hooks/useUser';
import Avatar from './Avatar';

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

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 3px 15px;
  color: white;
  font-weight: 600;
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();

  return (
    <SHeader>
      <Wrapper>
        <Column>
          <BsInstagram size="1.5em" style={{ cursor: 'pointer' }} />
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
              <Icon>
                <FaHome />
              </Icon>
              <Icon>
                <FaRegCompass />
              </Icon>
              <Icon>
                <Avatar url={data?.me?.avatar} />
              </Icon>
            </IconsContainer>
          ) : (
            <Link to={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
};

export default Header;

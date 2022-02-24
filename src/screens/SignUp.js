import { BsInstagram } from 'react-icons/bs';
import AuthLayout from '../components/auth/AuthLayout';
import Button from '../components/auth/Button';
import Input from '../components/auth/Input';
import FormBox from '../components/auth/FormBox';
import BottomBox from '../components/auth/BottomBox';
import routes from '../routes';
import styled from 'styled-components';
import { FatLink } from '../components/shared';
import PageTitle from '../components/PageTitle';

const SignUp = () => {
  const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  const Subtitle = styled(FatLink)`
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
  `;
  return (
    <AuthLayout>
      <PageTitle title="Sign Up | InstaClone" />
      <FormBox>
        <HeaderContainer>
          <BsInstagram size="3em" />
          <Subtitle>
            Sign up to see photos and videos from Your friends
          </Subtitle>
        </HeaderContainer>
        <form>
          <Input type="text" placeholder="Name" />
          <Input type="text" placeholder="Email" />
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Enter Your Password" />
          <Button type="submit" value="Sign Up" />
        </form>
      </FormBox>
      <BottomBox
        cta="Already have an account?"
        link={routes.home}
        linkText="Log in"
      />
    </AuthLayout>
  );
};

export default SignUp;

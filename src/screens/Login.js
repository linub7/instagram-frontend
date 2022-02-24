import { BsInstagram } from 'react-icons/bs';
import AuthLayout from '../components/auth/AuthLayout';
import Button from '../components/auth/Button';
import Separator from '../components/auth/Separator';
import Input from '../components/auth/Input';
import GoogleLogin from '../components/auth/GoogleLogin';
import FormBox from '../components/auth/FormBox';
import BottomBox from '../components/auth/BottomBox';
import routes from '../routes';
import PageTitle from '../components/PageTitle';

const Login = () => {
  return (
    <AuthLayout>
      <PageTitle title="Log in | InstaClone" />
      <FormBox>
        <div>
          <BsInstagram size="3em" />
        </div>
        <form>
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Enter Your Password" />
          <Button type="submit" value="Log in" />
        </form>
        <Separator />

        <GoogleLogin />
      </FormBox>
      <BottomBox
        cta="Dont have an account?"
        link={routes.signUp}
        linkText="Sign Up"
      />
    </AuthLayout>
  );
};

export default Login;

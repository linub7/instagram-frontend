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
import { useForm } from 'react-hook-form';
import FormError from '../components/auth/FormError';
import { gql, useMutation } from '@apollo/client';

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

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $email: String!
    $username: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
    ) {
      ok
      error
    }
  }
`;
const SignUp = ({ history }) => {
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({ mode: 'onChange' });

  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      setError('result', {
        message: error,
      });
    }
    const { username, password } = getValues();
    history.push(routes.home, {
      message: 'Account created.Please log in.',
      username,
      password,
    });
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const clearSignUpError = () => {
    clearErrors('result');
  };

  const onSubmitValid = (data) => {
    if (loading) return;
    // const { firstName, lastName, email, username, password } = getValues();
    createAccount({
      // variables: { firstName, lastName, email, username, password },
      variables: { ...data },
    });
  };

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
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: 'First Name is required',
              minLength: {
                value: 2,
                message: 'First Name should be at least 2 characters',
              },
            })}
            onChange={clearSignUpError}
            name="firstName"
            type="text"
            placeholder="First Name"
            hasError={Boolean(errors?.firstName?.message)}
          />
          <FormError message={errors?.firstName?.message} />
          <Input
            ref={register()}
            onChange={clearSignUpError}
            name="lastName"
            type="text"
            placeholder="Last Name"
            hasError={Boolean(errors?.lastName?.message)}
          />
          <FormError message={errors?.lastName?.message} />
          <Input
            ref={register({
              required: 'Email is required',
            })}
            onChange={clearSignUpError}
            name="email"
            type="email"
            placeholder="Email"
            hasError={Boolean(errors?.email?.message)}
          />
          <FormError message={errors?.email?.message} />
          <Input
            ref={register({
              required: 'Username is required',
              minLength: {
                value: 2,
                message: 'Username should be longer than 5 chars.',
              },
            })}
            onChange={clearSignUpError}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: 'Password is required.',
            })}
            onChange={clearSignUpError}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? 'Loading...' : 'Sign Up'}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
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

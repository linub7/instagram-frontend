import { FcGoogle } from 'react-icons/fc';
import styled from 'styled-components';

const GoogleLoginPart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;
const GoogleLogin = () => {
  return (
    <GoogleLoginPart>
      <FcGoogle size="1.5em" />
      <span>Log in With Google</span>
    </GoogleLoginPart>
  );
};

export default GoogleLogin;

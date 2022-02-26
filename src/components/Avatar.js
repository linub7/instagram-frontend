import styled from 'styled-components';
import { FiUser } from 'react-icons/fi';

const SAvatar = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 15px;
  /* background-color: #2c2c2c; */
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar = ({ url = '' }) => {
  return (
    <SAvatar>
      {url !== '' ? <Img src={url} alt="avatar" /> : <FiUser />}
    </SAvatar>
  );
};

export default Avatar;

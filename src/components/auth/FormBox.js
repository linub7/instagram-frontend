import React from 'react';
import styled from 'styled-components';
import { BaseBox } from '../shared';

const FormBox = ({ children }) => {
  const TopBox = styled(BaseBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 36px 40px 25px 40px;
    margin-bottom: 10px;
    form {
      margin-top: 35px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  `;

  return <TopBox>{children}</TopBox>;
};

export default FormBox;

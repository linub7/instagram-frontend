import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BaseBox } from '../shared';

const BottomBox = ({ cta, link, linkText }) => {
  const BottomBoxPart = styled(BaseBox)`
    padding: 20px 0px;
    text-align: center;
    a {
      font-weight: 600;
      color: ${(props) => props.theme.accent};
    }
  `;
  return (
    <BottomBoxPart>
      <span>{cta} </span>
      <Link to={link}>{linkText}</Link>
    </BottomBoxPart>
  );
};

export default BottomBox;

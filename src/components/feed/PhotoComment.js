// import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';
import { FatText } from '../shared';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

const Comment = styled.div``;
const Caption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const PhotoComment = ({ author, caption }) => {
  // how to sanitize an input that user entered and clean it
  // const cleanedPayload = sanitizeHtml(
  //   caption.replace(/#[\w]+/g, '<mark>$&</mark>'),
  //   {
  //     allowedTags: ['mark'],
  //   }
  // );
  // and now: how to insert link into hashtags
  const payload = caption.split(' ').map((word, index) =>
    /#[\w]+/.test(word) ? (
      <Fragment key={index}>
        <Link to={`/hashtags/${word.split('#')[1]}`}> {word} </Link>
      </Fragment>
    ) : (
      <Fragment key={index}>{word} </Fragment>
    )
  );

  return (
    <Comment>
      <FatText>{author}</FatText>
      {/* How to set an html into jsx */}
      {/* <Caption
        dangerouslySetInnerHTML={{
          __html: cleanedPayload,
        }}
      /> */}
      <Caption>{payload}</Caption>
    </Comment>
  );
};

PhotoComment.propTypes = {
  author: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

export default PhotoComment;

// import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';
import { FatText } from '../shared';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { gql, useMutation } from '@apollo/client';
import { AiFillDelete } from 'react-icons/ai';

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;

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

const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: Int!) {
    deleteComment(commentId: $commentId) {
      ok
      error
    }
  }
`;

const PhotoComment = ({
  photoId,
  commentId,
  username,
  isMine,
  author,
  caption,
}) => {
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

  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({
        id: `Comment:${commentId}`,
      });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    variables: { commentId },
    update: updateDeleteComment,
  });

  const handleDeleteComment = () => {
    deleteComment();
  };

  return (
    <CommentContainer>
      <>
        <Link to={`/user/${username}`}>
          <FatText>{author}</FatText>
        </Link>
        {/* How to set an html into jsx */}
        {/* <Caption
          dangerouslySetInnerHTML={{
            __html: cleanedPayload,
          }}
        /> */}
        <Caption>{payload}</Caption>
      </>
      {isMine && (
        <AiFillDelete
          size="1.2em"
          style={{ float: 'right', color: 'tomato', cursor: 'pointer' }}
          onClick={handleDeleteComment}
        />
      )}
    </CommentContainer>
  );
};

PhotoComment.propTypes = {
  commentId: PropTypes.number,
  photoId: PropTypes.number,
  username: PropTypes.string.isRequired,
  isMine: PropTypes.bool,
  author: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

export default PhotoComment;

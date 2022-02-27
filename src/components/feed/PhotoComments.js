import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PhotoComment from './PhotoComment';

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  font-size: 12px;
  margin: 10px 0;
  display: block;
  font-weight: 600;
`;

const PhotoComments = ({ user, caption, commentNumber, comments }) => {
  return (
    <CommentsContainer>
      <PhotoComment author={user.username} caption={caption} />
      <CommentCount>
        {commentNumber === 1 ? `1 Comment` : `${commentNumber} Comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <PhotoComment
          key={comment.id}
          author={comment.user.username}
          caption={comment.payload}
        />
      ))}
    </CommentsContainer>
  );
};

PhotoComments.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  caption: PropTypes.string,
  commentNumber: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
      }),
      payload: PropTypes.string.isRequired,
      isMine: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};

export default PhotoComments;

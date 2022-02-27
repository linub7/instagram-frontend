import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PhotoComment from './PhotoComment';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import useUser from '../../hooks/useUser';

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

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

const CREATE_COMMENT = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      id
      error
    }
  }
`;

const PhotoComments = ({ photoId, user, caption, commentNumber, comments }) => {
  const { data: userData } = useUser(); // userData has inside data.me => comes from ../../hooks/useUser:25
  const { register, handleSubmit, setValue, getValues } = useForm();
  const createCommentUpdate = (cache, result) => {
    const { payload } = getValues();
    setValue('payload', ''); // we moved these 2 lines to the top of Fn , because we dont want clean payload. if clean payload in onValid Fn, we will not get payload in newComment
    const {
      data: {
        createComment: { ok, id },
      },
    } = result; // createComment comes from line 22
    if (ok && userData?.me) {
      const newComment = {
        __typename: 'Comment',
        createdAt: Date.now() + '',
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
      });

      cache.modify({
        id: `Photo:${photoId}`, // get PhotoId
        fields: {
          comments(prev) {
            return [...prev, newCacheComment]; //insert new comment to previous comments array
          },
          commentNumber(prev) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    update: createCommentUpdate,
  });
  const onValid = (data) => {
    const { payload } = data;
    if (loading) return;
    createComment({
      variables: {
        photoId,
        payload,
      },
    });
  };
  return (
    <CommentsContainer>
      <PhotoComment
        author={user.username}
        caption={caption}
        username={user.username}
      />
      <CommentCount>
        {commentNumber === 1 ? `1 Comment` : `${commentNumber} Comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <PhotoComment
          key={comment.id}
          commentId={comment.id}
          isMine={comment.isMine}
          username={comment.user.username}
          photoId={photoId}
          author={comment.user.username}
          caption={comment.payload}
        />
      ))}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
            type="text"
            placeholder="Write a comment"
            name="payload"
            ref={register({ required: true })}
          />
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  );
};

PhotoComments.propTypes = {
  photoId: PropTypes.number.isRequired,
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

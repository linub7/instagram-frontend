import { gql } from '@apollo/client';

// fragments are a piece of graphql code that you can reuse it
export const PHOTO_FRAGMENT = gql`
  # PhotoFragment is a non-important name and we choose it but Photo is an important name and must be same with DB
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;

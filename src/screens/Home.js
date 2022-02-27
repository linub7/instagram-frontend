import { gql, useQuery } from '@apollo/client';

import PageTitle from '../components/PageTitle';
import Photo from '../components/feed/Photo';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments';

export const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      <PageTitle title="Home | InstaClone" />
      {data?.seeFeed?.map((photo) => (
        <Photo
          key={photo.id}
          id={photo.id}
          file={photo.file}
          isLiked={photo.isLiked}
          likes={photo.likes}
          user={photo.user}
          caption={photo.caption}
          commentNumber={photo.commentNumber}
          comments={photo.comments}
          // {...photo} : Alternative
        />
      ))}
    </div>
  );
};

export default Home;

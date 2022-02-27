import { gql, useQuery } from '@apollo/client';

import PageTitle from '../components/PageTitle';
import Photo from '../components/feed/Photo';

export const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      commentNumber
      comments {
        id
        user {
          username
          avatar
        }
        payload
        isMine
        createdAt
      }
      createdAt
      isMine
      isLiked
    }
  }
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

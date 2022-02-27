import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FatText } from '../shared';
import Avatar from '../Avatar';
import { FiUser } from 'react-icons/fi';
import { BsBookmark, BsHeart, BsHeartFill as SolidHeart } from 'react-icons/bs';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { gql, useMutation } from '@apollo/client';
import PhotoComments from './PhotoComments';
// import { FEED_QUERY } from '../../screens/Home';

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  margin-bottom: 20px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
  width: 100%;
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }

  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($photoId: Int!) {
    toggleLike(photoId: $photoId) {
      ok
      error
    }
  }
`;

const Photo = ({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}) => {
  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const photoId = `Photo:${id}`;
      // ******** NEW WAY ********
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            if (isLiked) {
              // isLiked comes from props
              return prev - 1;
            } else {
              return prev + 1;
            }
          },
        },
      });

      // ******** OLD WAY ********
      // const fragmentId = `Photo:${id}`;
      // const fragment = gql`
      //   #   BSName is a random name that we entered but Photo comes from CACHE
      //   fragment BSName on Photo {
      //     isLiked
      //     likes
      //   }
      // `;
      // const result = cache.readFragment({
      //   id: fragmentId,
      //   fragment,
      // }); // this allows us to read from cache
      // // if we have not isLiked and likes props we fetch those from cache
      // if ('isLiked' in result && 'likes' in result) {
      //   const { isLiked: cacheIsLiked, likes: cacheLikes } = result;
      //   cache.writeFragment({
      //     id: fragmentId, // comes from CACHE tab in apollo extension in chrome => CACHE tab |___ Photo:2
      //     fragment,
      //     data: {
      //       isLiked: !cacheIsLiked,
      //       likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1,
      //     },
      //   });
      // }
    }
  };
  const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: { photoId: id },
    // refetchQueries: [{ query: FEED_QUERY }], when we have a tiny query it is ok to use refetch operation but here in every toggle Like we would like fetch WHOLE BIG FEED Query. It is not smart way
    update: updateToggleLike,
  });
  return (
    <PhotoContainer>
      <PhotoHeader>
        {user.avatar ? (
          <Avatar lg={true} url={user.avatar} />
        ) : (
          <FiUser
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '15px',
              overflow: 'hidden',
            }}
          />
        )}
        <Username>{user.username}</Username>
      </PhotoHeader>
      <PhotoFile src={file} alt="feed" />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={toggleLike}>
              {isLiked ? (
                <SolidHeart size="1.5em" style={{ color: 'tomato' }} />
              ) : (
                <BsHeart size="1.5em" />
              )}
            </PhotoAction>
            <PhotoAction>
              <IoChatbubbleOutline size="1.5em" />
            </PhotoAction>
          </div>
          <div>
            <PhotoAction>
              <BsBookmark size="1.5em" />
            </PhotoAction>
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? `1 like` : `${likes} Likes`}</Likes>
        <PhotoComments
          user={user}
          caption={caption}
          commentNumber={commentNumber}
          comments={comments}
        />
      </PhotoData>
    </PhotoContainer>
  );
};

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  caption: PropTypes.string,
  commentNumber: PropTypes.number.isRequired,
};

export default Photo;

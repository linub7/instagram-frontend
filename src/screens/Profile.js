import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { PHOTO_FRAGMENT } from '../fragments';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { IoChatbubbleOutline, IoChatbubbleSharp } from 'react-icons/io5';
import styled from 'styled-components';
import { FatText } from '../components/shared';
import PageTitle from '../components/PageTitle';
import { FiUser } from 'react-icons/fi';
import Button from '../components/auth/Button';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import useUser, { ME_QUERY } from '../hooks/useUser';

const SEE_PROFILE = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

const FOLLOW_USER = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
      error
    }
  }
`;
const UN_FOLLOW_USER = gql`
  mutation unFollowUser($username: String!) {
    unFollowUser(username: $username) {
      ok
      error
    }
  }
`;

const Header = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;
const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfileBtn = styled(Button).attrs({
  as: 'span',
})`
  margin-left: 10px;
  margin-top: 0;
`;

const Profile = () => {
  const { username } = useParams();
  const { data: userData } = useUser();
  const client = useApolloClient();
  const { data, loading } = useQuery(SEE_PROFILE, { variables: { username } });

  const followUserCompleted = (data) => {
    const {
      followUser: { ok },
    } = data;
    if (!ok) return;
    const { cache } = client;
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev) {
          return true;
        },
        totalFollowers(prev) {
          return prev + 1;
        },
      },
    });

    const {
      me: { meUsername },
    } = userData;
    cache.modify({
      id: `User:${meUsername}`,
      fields: {
        totalFollowing(prev) {
          return prev + 1;
        },
      },
    });
  };
  const [followUser] = useMutation(FOLLOW_USER, {
    variables: { username },
    onCompleted: followUserCompleted,
  });
  const unFollowUserUpdate = (cache, result) => {
    const {
      data: {
        unFollowUser: { ok },
      },
    } = result;
    if (!ok) return;
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev) {
          return false;
        },
        totalFollowers(prev) {
          return prev - 1;
        },
      },
    });
    const {
      me: { meUsername },
    } = userData;
    cache.modify({
      id: `User:${meUsername}`,
      fields: {
        totalFollowing(prev) {
          return prev - 1;
        },
      },
    });
  };
  const [unFollowUser] = useMutation(UN_FOLLOW_USER, {
    variables: { username },
    update: unFollowUserUpdate,
  });

  const getButton = (seeProfile) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) {
      return <ProfileBtn>Edit Profile</ProfileBtn>;
    }
    if (isFollowing) {
      return (
        <ProfileBtn onClick={unFollowUser}>
          <Fragment>
            <span>UnFollow</span>
            <span>
              <IoShieldCheckmarkOutline />
            </span>
          </Fragment>
        </ProfileBtn>
      );
    } else {
      return <ProfileBtn onClick={followUser}>Follow</ProfileBtn>;
    }
  };

  return (
    <div>
      <PageTitle title={loading ? 'Loading...' : `${username} | Profile`} />
      <Header>
        {data?.seeProfile?.avatar ? (
          <Avatar src={data?.seeProfile?.avatar} />
        ) : (
          <FiUser
            style={{
              marginLeft: '50px',
              height: '160px',
              width: '160px',
              borderRadius: '50%',
              marginRight: '150px',
              //   backgroundColor: '#2c2c2c',
            }}
          />
        )}
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile ? getButton(data?.seeProfile) : null}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>
              {data?.seeProfile?.firstName}
              {'  '}
              {data?.seeProfile?.lastName}
            </Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos.map((photo, index) => (
          <Photo key={index} bg={photo.file}>
            <Icons>
              <Icon>
                {photo.likes.length === 0 ? <BsHeart /> : <BsHeartFill />}
                {photo.likes}
              </Icon>
              <Icon>
                {photo.commentNumber === 0 ? (
                  <IoChatbubbleOutline />
                ) : (
                  <IoChatbubbleSharp />
                )}

                {photo.commentNumber}
              </Icon>
            </Icons>
          </Photo>
        ))}
      </Grid>
    </div>
  );
};

export default Profile;

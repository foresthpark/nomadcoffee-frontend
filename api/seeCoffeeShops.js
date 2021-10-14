import { gql } from "@apollo/client";

export const SEE_COFFEESHOPS = gql`
  mutation seeCoffeeShops(
    $lastId: Int # $photos: [String]
  ) {
    seeCoffeeShops(lastId: $lastId) {
      id
      name
      latitude
      longitude
      user {
        id
        username
        email
        name
        location
        avatarUrl
        githubUsername
        #following
        #followers
        totalFollowers
        totalFollowing
        isFollowing
        isMe
        isFollowingUser
      }
      categories {
        id
        name
        slug
        totalShops
      }
      photos
      createdAt
      updatedAt
    }
  }
`;

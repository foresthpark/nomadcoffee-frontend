import { gql } from "@apollo/client";

export const SEE_COFFEESHOP = gql`
  query seeCoffeeShop($id: Int) {
    seeCoffeeShop(id: $id) {
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

import { gql } from "@apollo/client";

export const CREATE_COFFEESHOP = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: Float
    $longitude: Float
    $categories: [String]
  ) # $photos: [String]
  {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
    ) # photos: $photos
    {
      ok
      error
    }
  }
`;

// export default gql`
//   type Mutation {
//     createCoffeeShop(
//       name: String!
//       latitude: Float
//       longitude: Float
//       photos: [String]
//       categories: [String]
//     ): CoffeeShop
//   }
// `;

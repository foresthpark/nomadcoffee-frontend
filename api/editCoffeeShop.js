import { gql } from "@apollo/client";

export const EDIT_COFFEESHOP = gql`
  mutation editCoffeeShop(
    $id: Int!
    $name: String
    $latitude: Float
    $longitude: Float
    $categories: [String]
  ) {
    editCoffeeShop(
      id: $id
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
    ) {
      ok
      error
    }
  }
`;

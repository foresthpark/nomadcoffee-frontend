import { gql } from "@apollo/client";

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $name: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      username: $username
      name: $name
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

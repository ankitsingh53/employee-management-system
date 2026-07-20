import { gql } from "@apollo/client";

export const GET_ADMIN = gql`
   query GetMe {
   getMe {
      id
      firstName
      lastName
      email
      role
   }
   }
`;
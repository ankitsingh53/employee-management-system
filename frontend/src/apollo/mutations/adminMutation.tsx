import { gql } from "@apollo/client";

export const LOGIN_ADMIN = gql`
  mutation LoginAdmin($input: LoginEmployeeInput!) {
  loginAdmin(input: $input) {
    message
    token
  }
}
`;

export const LOGOUT_ADMIN = gql`
   mutation LogoutAdmin{
    logoutAdmin {
      message
      success
    }
   }
`
import { gql } from "@apollo/client";

export const REGISTER_EMPLOYEE = gql`
   mutation RegisterEmployee($input: RegisterEmployee!) {
      registerEmployee(input: $input){
        id
        firstName
        lastName
        email
        role
      }
   }
`;

export const LOGIN_EMPLOYEE = gql`
  mutation LoginEmployee($input: LoginEmployee!) {
     loginEmployee(input: $input){
        message
     }
  }
`;

export const LOGOUT_EMPLOYEE = gql`
  mutation LogoutEmployee {
  logoutEmployee {
    success
    message
  }
}
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfile!){
    updateProfile(input: $input){
    id
    firstName
    lastName
    email
    phoneNumber
    }
  }
`;

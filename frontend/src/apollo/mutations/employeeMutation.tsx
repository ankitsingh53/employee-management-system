import { gql } from "@apollo/client";

export const REGISTER_EMPLOYEE = gql`
  mutation RegisterEmployee($input: RegisterEmployee!) {
    registerEmployee(input: $input) {
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
    loginEmployee(input: $input) {
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
  mutation UpdateProfile($input: UpdateProfile!) {
    updateProfile(input: $input) {
      id
      firstName
      lastName
      email
      phoneNumber
      designation
      salary
      joiningDate
      role
      department {
        id
        department
      }
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: PasswordInput!) {
     changePassword(input: $input){
       message
     }
  }
`;

export const APPLY_LEAVE = gql`
mutation ApplyLeave($input: ApplyLeaveInput!){
  applyLeave(input:$input){
    message
  }
}
`;

export const CANCEL_LEAVE = gql`
  mutation CancelLeave($id: ID!){
     cancelLeave(id: $id){
       message
     }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($input: ForgotPassword!) {
     forgotPassword(input: $input){
       message
     }
  }
`;

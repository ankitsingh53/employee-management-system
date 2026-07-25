import { gql } from "@apollo/client";
export const GET_USER = gql`
  query GetUser {
    getUser {
        id
        firstName
        lastName
        email
        phoneNumber
        designation
        joiningDate
        salary
        role
        department {
          id
          department
        }
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile($id: ID!) {
    viewProfile(id: $id) {
      firstName
      lastName
      email
      phoneNumber
      salary
      designation
      joiningDate
      department {
        id
        department
      }
    }
  }
`;

export const MY_LEAVES = gql`
query MyLeaves{
  myLeaves{
    id
    leaveType
    startDate
    endDate
    reason
    status
  }
}
`;

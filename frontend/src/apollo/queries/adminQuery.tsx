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

export const GET_EMPLOYEE = gql`
  query GetEmployee {
    getEmployee {
    id
    firstName
    lastName
    email
    phoneNumber
    designation
    salary
    joiningDate
    department{
      department
      id
    }
    }
  }
`;

export const GET_DEPARTMENT = gql`
  query GetDepartment {
    viewDepartment {
      id
      department
    }
  }
`;



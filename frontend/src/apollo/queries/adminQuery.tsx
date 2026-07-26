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
    role
    status
    department{
      department
      id
    }
    }
  }
`;

export const GET_EMP_BY_ID = gql`
  query GetEmployeeById($id: ID!) {
    getEmployeeById(id: $id) {
    id
    firstName
    lastName
    email
    phoneNumber
    designation
    salary
    joiningDate
    role
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

export const ALL_LEAVE_REQUESTS = gql`
query AllLeaveRequests {
  allLeaveRequests {
    id
    leaveType
    startDate
    endDate
    reason
    status
    employee {
      id
      firstName
      lastName
      email
      department {
        id
        department
      }
    }
  }
}
`;



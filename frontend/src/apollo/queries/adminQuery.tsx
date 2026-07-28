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
  query GetEmployee(
  $page: Int!, 
  $limit: Int!, 
  $search: String,
  $searchBy:String
  ) {
    getEmployee(
    page: $page, 
    limit: $limit, 
    search: $search
    searchBy: $searchBy
    ) {
       totalCount 
       employees {
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
query AllLeaveRequests($page: Int!, $limit: Int!) {
  allLeaveRequests(page: $page, limit: $limit){
  leaves{
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
    totalCount
}
}
`;

export const GET_ADMIN_DASHBOARD = gql`
  query AdminDashboard {
    adminDashboard {
      totalEmployees
      activeEmployees
      totalDepartments
      pendingLeaves
    }
  }
`;



import { gql } from "@apollo/client";

export const LOGIN_ADMIN = gql`
  mutation LoginAdmin($input: LoginEmployeeInput!) {
  loginAdmin(input: $input) {
    message
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
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($input:CreateEmployee!){
    createEmployee(input: $input){
    firstName,
    lastName,
    email,
    phoneNumber,
    designation,
    salary,
    joiningDate,
    department {
      id
      department
     }
    }
  }
`;

export const UPDATE_EMP = gql`
  mutation UpdateEmployee($input:UpdateEmployee!){
    updateEmployee(input: $input){
    firstName,
    lastName,
    email,
    phoneNumber,
    designation,
    salary,
    joiningDate,
    department {
      id
      department
     }
    }
  }
`;

export const DELETE_EMP = gql`
  mutation DeleteEmployee($id: ID!){
   deleteEmployee(id: $id){
     message
   }
  }
`


export const ADD_DEPART = gql`
  mutation AddDepartment($input: CreateDepartment!){
    addDepartment(input: $input){
       id
       department
    }
  }
`;

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($input: UpdateDepartment!){
   updateDepartment(input: $input){
    id
    department
   }
  }
`;

export const DELETE_DEPARTMENT = gql`
  mutation DeleteDepartment($id: ID!){
   deleteDepartment(id: $id){
      message
    }
  }
`;
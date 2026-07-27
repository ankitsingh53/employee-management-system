export const employeeSchema = `#graphql

  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    designation: String!
    salary: Float!
    joiningDate: String!
    status: Boolean!
    role: String!
    department: [Department!]!
  }

  type EmployeePagination {
     employees: [Employee!]!
     totalCount: Int!
}

  type Department {
     id: ID!
     department: String!
   }

  type Query {
    getEmployee(
    page: Int!, 
    limit: Int!, 
    search: String,
    status: Boolean,
    sortBy: String
    ): EmployeePagination!
    getEmployeeById(id: ID!): Employee!
  }

  type DeleteResponse {
   message: String!
  }

  input CreateEmployee {
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    designation: String!
    salary: Float!
    joiningDate: String!
    departmentId: Int!
  }

  input UpdateEmployee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    designation: String!
    salary: Float!
    joiningDate: String!
    departmentId: Int
  }

  type Mutation {
   createEmployee(input:CreateEmployee!): Employee!
   updateEmployee(input:UpdateEmployee!): Employee!
   deleteEmployee(id: ID!): DeleteResponse!
 }
`;

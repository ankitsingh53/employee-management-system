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
    isActive: Boolean!
    department: [Department]
  }

  type Department {
     id: ID!
     department: String!
   }

  type Query {
    getEmployee: [Employee!]!
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
    departmentId: Int
  }

  input UpdateEmployee {
    id: ID!
    firstName: String!
    lastName: String!
    phoneNumber: String!
    designation: String!
    salary: Float!
    joiningDate: String!
  }

  type Mutation {
   createEmployee(input:CreateEmployee!): Employee!
   updateEmployee(input:UpdateEmployee!): Employee!
   deleteEmployee(id: ID!): DeleteResponse
 }

`;

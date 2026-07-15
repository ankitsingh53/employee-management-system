export const typeDefs = `#graphql

type Employee {
 id: ID!
 firstName: String!
 lastName: String!
 email: String!
}

type AuthResponse {
  token: String
  message: String
  employee: Employee
}

type Query {
getMe: Employee
}

input RegisterEmployee {
firstName: String!
lastName: String!
email: String!
password: String!
}

input LoginEmployeeInput {
email: String!
password: String!
}
type LogoutResponse {
  success: Boolean!
  message: String!
}

input CreateEmployee {
  firstName: String!
  lastName: String!
  email: String!
  phoneNumber: Int!
  designation: String!
  salary: Float!
  joiningDate: String!
}


type Mutation {
register(input: RegisterEmployee!): AuthResponse!
login (input: LoginEmployeeInput!): AuthResponse!
logout: LogoutResponse!
createEmployee(input: CreateEmployee): Employee
}

`
